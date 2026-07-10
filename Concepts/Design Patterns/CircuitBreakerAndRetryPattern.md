**Question:** Can you please regenerate this in Markdown and Q&A form?

---

# Circuit Breaker vs Retry – Q&A Notes

## Q1. Are Retry and Circuit Breaker the same thing?

**Answer:**

No.

* **Retry** is about **trying again**.
* **Circuit Breaker** is about **checking whether the service is healthy**.

A request may be retried while the circuit breaker separately decides whether the downstream service has become unhealthy.

---

## Q2. Which failures should Retry handle, and which should Circuit Breaker count?

| Failure                                                             | Retry? | Counts Toward Circuit Breaker? | Reason                            |
| ------------------------------------------------------------------- | ------ | ------------------------------ | --------------------------------- |
| Network/Connection error (Connection refused, DNS failure, timeout) | ✅ Yes  | ✅ Yes                          | Service unavailable               |
| HTTP Request Timeout (408)                                          | ✅ Yes  | ✅ Yes                          | Temporary network/service timeout |
| HTTP Internal Server Error (500)                                    | ❌ No   | ✅ Yes                          | Server-side failure               |
| HTTP Bad Gateway (502)                                              | ❌ No   | ✅ Yes                          | Upstream service unavailable      |
| HTTP Service Unavailable (503)                                      | ❌ No   | ✅ Yes                          | Service down                      |
| HTTP Gateway Timeout (504)                                          | ❌ No   | ✅ Yes                          | Service timeout                   |
| HTTP Bad Request (400)                                              | ❌ No   | ❌ No                           | Client/request issue              |
| HTTP Unauthorized (401)                                             | ❌ No   | ❌ No                           | Authentication issue              |
| HTTP Forbidden (403)                                                | ❌ No   | ❌ No                           | Permission issue                  |
| HTTP Not Found (404)                                                | ❌ No   | ❌ No                           | Client-side error                 |
| HTTP Too Many Requests (429)                                        | ❌ No   | ❌ No                           | Client rate-limited               |
| HTTP 2xx with invalid/malformed body                                | ❌ No   | ✅ Yes                          | Server returned bad response      |
| Valid 2xx response                                                  | ❌ No   | ❌ No                           | Success                           |

---

## Q3. What is the recommended policy?

**Retry only:**

* Network errors
* HTTP 408 (Request Timeout)

**Circuit Breaker counts as failures:**

* Network errors
* HTTP 408
* All **5xx** errors
* Invalid/malformed successful (2xx) responses

**Circuit Breaker ignores:**

* All **4xx** client errors (400, 401, 403, 404, 429, etc.)

---

## Q4. Why shouldn't we retry HTTP 500/503?

**Answer:**

Retrying usually won't help immediately because the server itself is unhealthy.

Instead:

* Fail the request immediately.
* Increment the circuit breaker failure count.
* If failures continue, open the circuit breaker.

---

## Q5. Does this change the retry policy?

**Answer:**

No.

The retry policy remains exactly the same.

Only the **circuit breaker's failure-counting logic** is refined.

---

## Q6. What are the current Circuit Breaker settings?

```text
breaker_consecutive_failures = 5
breaker_reset_timeout_s = 30 seconds
```

---

## Q7. Does reaching 5 failures partially open the breaker?

**Answer:**

No.

Reaching the threshold **fully opens** the circuit breaker.

The breaker transitions through three states.

---

## Q8. What are the three Circuit Breaker states?

### 1. Closed (Normal)

* All requests are allowed.
* A counter tracks **consecutive breaker-worthy failures**.
* Every qualifying failure increments the counter.
* Any successful request resets the counter back to **0**.

---

### 2. Open (Tripped)

When **5 consecutive failures** occur:

* The breaker moves to **Open**.
* For the next **30 seconds**, every request is rejected immediately.
* No call is made to the downstream service (short-circuit).

This prevents hammering an unhealthy service and allows it time to recover.

---

### 3. Half-Open (Recovery Test)

After the 30-second timeout:

* The breaker enters **Half-Open**.
* Exactly **one trial request** is allowed.

If the request succeeds:

* Breaker transitions back to **Closed**.

If the request fails:

* Breaker returns to **Open** for another 30 seconds.

---

## Q9. What does the state transition look like?

```text
Closed
   │
   ├── 5 consecutive failures
   ▼
Open
   │
   ├── Wait 30 seconds
   ▼
Half-Open
   │
   ├── Trial succeeds ─────► Closed
   │
   └── Trial fails ───────► Open
```

---

## Q10. Is "Partially Open" a Circuit Breaker state?

**Answer:**

No.

The correct term is **Half-Open**.

Half-Open allows a limited number of requests (typically one) to test whether the service has recovered.

---

## Q11. Which failures increment the Circuit Breaker counter?

**Answer:**

Only **breaker-worthy failures**:

* ✅ Network errors
* ✅ HTTP 408
* ✅ HTTP 5xx
* ✅ Malformed/invalid 2xx responses

These **do not** increment the counter:

* ❌ HTTP 400
* ❌ HTTP 401
* ❌ HTTP 403
* ❌ HTTP 404
* ❌ HTTP 429
* ❌ Other client-side errors

---

## Key Takeaways

* **Retry = Try Again**
* **Circuit Breaker = Is the service healthy?**
* Retry only **network errors** and **408**.
* Count **network errors + 408 + 5xx + malformed 2xx** toward the Circuit Breaker.
* Ignore **4xx** client errors.
* After **5 consecutive failures**, the breaker **opens** for **30 seconds**.
* After the timeout, it enters **Half-Open** and allows a **single trial request**.
* Success closes the breaker; failure opens it again.
