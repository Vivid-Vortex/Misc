# Retry vs Circuit Breaker – Retry Policy and Circuit Breaker Counting

## Question 1

**Yes – "retry" and breaker use different code sets. Can you give the full HTTP codes? You mean to say that breaker and retry HTTP codes are different?**

### Answer

Yes. That's the key insight.

- **Retry** is about **"try again"**.
- **Circuit Breaker** is about **"Is the service healthy?"**

A **503** shouldn't be retried (it likely won't help immediately), but it **should** count as a health failure.

### Full HTTP behavior with Option B

| Outcome | Retry? | Counts toward breaker? | Reason |
|---------|--------|------------------------|--------|
| Network/connection errors (connection refused, DNS failure, timeout) | ✅ Retry | ✅ Counts | Service unreachable → availability failure |
| HTTP Request Timeout (408) | ✅ Retry | ✅ Counts | Transient server-side timeout |
| HTTP Internal Server Error (500) | ❌ No retry | ✅ Counts | Server broken → availability failure |
| HTTP Bad Gateway (502) | ❌ No retry | ✅ Counts | Server chain broken |
| HTTP Service Unavailable (503) | ❌ No retry | ✅ Counts | Service down |
| HTTP Gateway Timeout (504) | ❌ No retry | ✅ Counts | Service down |
| HTTP Bad Request (400) | ❌ No retry | ❌ Ignored | User/client fault (bad request), not a service outage |
| HTTP Unauthorized (401) | ❌ No retry | ❌ Ignored | Authentication issue, not an outage |
| HTTP Forbidden (403) | ❌ No retry | ❌ Ignored | Permission issue, not an outage |
| HTTP Not Found (404) | ❌ No retry | ❌ Ignored | Client-side, not an outage |
| HTTP Too Many Requests (429) | ❌ No retry | ❌ Ignored | Rate-limit (client-side signal) |
| HTTP 200 OK, but invalid JSON body | ❌ No retry | ✅ Counts | Server returned garbage → malfunction |
| HTTP 200 OK, valid body | ❌ No retry | ❌ Success | Normal |

### Simple rule

- **Retry** only retries:
  - Network errors
  - HTTP **408** (unchanged from the original design)

- **Circuit Breaker counts as failures:**
  - Network errors
  - All **5xx**
  - **408**
  - Bad **200 responses** (for example, malformed JSON)

- **Circuit Breaker ignores:**
  - All **4xx client errors** (400, 401, 403, 404, 429)
  - These are client/application problems, not evidence that the service is unhealthy.

Therefore:

- Retry only touches **network errors + 408**.
- The breaker additionally watches **5xx** and **malformed successful responses**.
- A **500/503** fails immediately (no retry) **and** nudges the breaker toward opening.

This keeps the retry policy exactly as originally designed—nothing new is added to retry behavior. Only the circuit breaker's failure-counting logic is refined.

---

## Question 2

**What is the current breaker count? Does hitting this number mean the breaker will partially open?**

### Answer

Current settings:

```text
breaker_consecutive_failures = 5
breaker_reset_timeout_s = 30
```

(these are the defaults)

A small terminology correction:

Reaching the configured failure count opens the breaker **fully**, not partially.

The Circuit Breaker has three states.

### 1. Closed (Normal)

All requests are allowed through.

The breaker keeps track of **consecutive breaker-worthy failures**.

- Every failure increments the counter by **1**
- Any successful request resets the counter back to **0**

---

### 2. Open (Tripped)

Once the counter reaches **5 consecutive failures**, the breaker moves to the **Open** state.

For the next **30 seconds**:

- Every request is rejected immediately.
- The protected service is not called.
- This avoids repeatedly sending traffic to an already unhealthy service.
- It also prevents unnecessary timeouts and protects overall system stability.

---

### 3. Half-Open (Trial)

After the **30-second timeout**, the breaker transitions to **Half-Open**.

Only **one trial request** is allowed.

- If the trial succeeds:
  - Breaker returns to **Closed**
  - Normal traffic resumes

- If the trial fails:
  - Breaker immediately returns to **Open**
  - Another 30-second wait begins

---

### State Flow

```text
Closed
   │
   │ (5 consecutive failures)
   ▼
Open
   │
   │ wait 30 seconds
   ▼
Half-Open
   │
   ├── Trial succeeds ─────────► Closed
   │
   └── Trial fails ────────────► Open
```

> "Partially open" is not an official breaker state.
>
> The closest concept is **Half-Open**, where exactly one probe request is allowed to test whether the service has recovered.

With **Option B**, only **breaker-worthy failures** increment the failure counter:

- Network failures
- HTTP 408
- HTTP 5xx
- Malformed HTTP 200 responses

Normal client-side **4xx** errors do **not** affect the breaker count.

---

**Current configuration**

- Consecutive failures to trip: **5**
- Reset timeout: **30 seconds**

Once these values are confirmed, the implementation can proceed.
