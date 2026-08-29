# Axios and TanStack Query: Concepts & Synergy

## Q1: Is Axios a React library?

**A:** No. **Axios is not a React library.**

Axios is a standalone, open-source JavaScript library used to make HTTP requests from web browsers or Node.js environments.

While it is exceptionally popular in the React ecosystem for handling API communication, it is completely independent of React and can be used with:

* Vanilla JavaScript
* React
* Vue
* Angular
* Node.js

---

### Why Do React Developers Choose Axios Over `fetch()`?

Even though React applications can use the browser's native `fetch()` API, developers often choose Axios because it provides several quality-of-life features.

#### 1. Automatic JSON Parsing

Axios automatically transforms JSON responses into JavaScript objects.

With Axios:

```javascript
const response = await axios.get('/users');

console.log(response.data);
```

With `fetch()`:

```javascript
const response = await fetch('/users');
const data = await response.json();
```

#### 2. Request Interceptors

Axios provides interceptors that allow you to globally intercept requests and responses.

For example, you can:

* Attach authentication tokens
* Log requests
* Handle common errors
* Modify responses

#### 3. Simpler Error Handling

Axios automatically rejects the Promise for HTTP error statuses such as:

* `400`
* `401`
* `404`
* `500`

With `fetch()`, HTTP errors do not automatically reject the Promise.

#### 4. Request Cancellation and Timeouts

Axios supports request cancellation and timeouts, including integration with `AbortController`.

This is useful when requests should be cancelled because they are no longer needed.

---

# Q2: Axios vs TanStack Query — Which One Is Better?

**A:** They are **not direct competitors**.

They solve different problems and are commonly used together.

| Tool               | Main Responsibility                                                   |
| ------------------ | --------------------------------------------------------------------- |
| **Axios**          | Makes HTTP requests                                                   |
| **TanStack Query** | Manages server state, caching, synchronization, and request lifecycle |

---

## The Fundamental Difference

### Axios

Axios is an **HTTP client**.

Its core responsibility is:

```text
Send HTTP request → Receive HTTP response
```

For example:

```javascript
const response = await axios.get('/users');
```

Axios does **not** primarily handle:

* Caching
* Background refetching
* Server-state synchronization
* UI loading state
* Query deduplication

---

### TanStack Query

TanStack Query is a **server-state management library**.

Its responsibility is to manage the data received from the server.

It handles things such as:

* Caching
* Loading states
* Error states
* Background refetching
* Query deduplication
* Stale data
* Server-state synchronization

---

## Why TanStack Query Is Better for UI Management

If you use only Axios, you still need to manually manage the UI state.

For example:

```text
API Call
   ↓
Loading?
   ↓
Success?
   ↓
Error?
   ↓
Store Data
```

You would typically manage these states using `useState` and `useEffect`.

TanStack Query handles much of this automatically and exposes values such as:

```javascript
const {
  data,
  isLoading,
  isError
} = useQuery(...);
```

---

# The Key Point: Axios and TanStack Query Work Together

You don't have to choose between Axios and TanStack Query.

A common architecture is:

```text
React Component
       ↓
TanStack Query
       ↓
Axios
       ↓
Backend API
```

### Responsibilities

```text
TanStack Query → Manages the request lifecycle and server state

Axios          → Actually makes the HTTP request
```

TanStack Query can use either:

* `fetch()`
* Axios
* Another HTTP client

inside its `queryFn`.

---

# Q3: If We Use Both, and Both Provide a Way to Call APIs, Which One Would Developers Prefer?

**A:** When developers use both libraries, they don't really choose between them.

They use them **at the same time for different responsibilities**.

### Axios

Axios physically performs the network request.

It handles things such as:

* URL
* HTTP method
* Headers
* Request body
* Response parsing

### TanStack Query

TanStack Query manages what happens around that request.

It handles:

* When the request should run
* Loading state
* Error state
* Caching
* Refetching
* Deduplication
* Server-state synchronization

---

# What the Code Looks Like in Practice

A common pattern looks like this:

```javascript
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Axios handles the actual network communication
const fetchUserData = async () => {
  const response = await axios.get('https://example.com');

  return response.data;
};

export function UserProfile() {

  // TanStack Query manages UI state and caching
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUserData,
  });

  if (isLoading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Error fetching data!</div>;
  }

  return <h1>Welcome, {data.name}</h1>;
}
```

### What happens here?

```text
UserProfile
    ↓
useQuery()
    ↓
TanStack Query
    ↓
queryFn()
    ↓
fetchUserData()
    ↓
Axios
    ↓
Backend
```

TanStack Query calls the `queryFn`, and the `queryFn` uses Axios to make the actual HTTP request.

---

# Q4: So TanStack Query Takes the Responsibility of Calling Axios?

**A:** Yes, exactly.

A simple way to remember it is:

> **TanStack Query = Manager**
> **Axios = Worker**

Instead of manually calling Axios inside a React `useEffect`, you give TanStack Query a function that knows how to call Axios.

```javascript
useQuery({
  queryKey: ['user'],
  queryFn: fetchUserData
});
```

TanStack Query decides **when** `fetchUserData()` needs to execute.

---

## How TanStack Query Controls Axios

Depending on your configuration, TanStack Query can execute the query when:

### 1. The Component Mounts

When the component needs the data for the first time:

```text
Component
   ↓
TanStack Query
   ↓
queryFn()
   ↓
Axios
   ↓
API
```

### 2. The User Returns to the Tab

If the cached data is considered stale, TanStack Query can refetch the data in the background.

### 3. The Network Reconnects

Depending on configuration, TanStack Query can refetch stale data when the network reconnects.

---

## What TanStack Query Prevents Axios From Doing

### 1. Duplicate API Calls

Suppose three components request exactly the same query:

```text
Component A ──┐
Component B ──┼──> TanStack Query ──> Axios ──> API
Component C ──┘
```

TanStack Query can share the same query result instead of unnecessarily creating separate identical requests.

---

### 2. Unnecessary API Calls When Data Is Cached

Suppose the data is already available and considered fresh:

```text
Component
    ↓
TanStack Query
    ↓
Cache has fresh data?
    ↓
YES
    ↓
Return cached data
```

Axios doesn't need to make another network request.

---

# Q5: Why Is This Combination Good?

> ## ⭐ Key Takeaway
>
> **The combination of Axios and TanStack Query is considered an industry gold standard because they solve two completely different problems perfectly.**

The two libraries complement each other:

```text
Axios
  ↓
HTTP communication

TanStack Query
  ↓
Server-state management
```

Together, they significantly reduce the amount of API-related boilerplate you need to write in a React application.

---

# 1. Automated UI States

### Axios Only

With Axios alone, you generally need to manage:

```text
data
loading
error
```

For example:

```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

Then you need to manually update these states around the API call.

---

### Axios + TanStack Query

TanStack Query provides these states for you:

```javascript
const {
  data,
  isLoading,
  isError
} = useQuery(...);
```

This removes a lot of repetitive code.

---

# 2. Better Error Handling Alignment

TanStack Query determines whether a query succeeded or failed based on the Promise returned by the `queryFn`.

Axios automatically rejects its Promise for HTTP error responses such as:

```text
404
500
401
```

So the two work naturally together.

With `fetch()`, you normally need to check `response.ok` yourself if you want HTTP errors to become rejected Promises.

---

# 3. Centralized Axios Configuration

Axios allows you to create a configured Axios instance.

For example:

```javascript
const api = axios.create({
  baseURL: 'https://example.com/api'
});
```

You can then centralize common configuration such as:

* Base URL
* Authentication headers
* Request interceptors
* Response interceptors
* Timeout configuration

Your application can then use this instance from the TanStack Query functions.

---

# 4. Reduced Network Waste

Axios by itself does not know whether another part of your application already requested the same data.

For example:

```javascript
axios.get('/user');
axios.get('/user');
axios.get('/user');
```

This can result in three network requests.

With TanStack Query:

```text
Component A ──┐
Component B ──┼──> TanStack Query ──> Axios ──> API
Component C ──┘
```

TanStack Query can manage the shared server state and avoid unnecessary duplicate requests.

---

# The Simplest Mental Model

Remember this:

```text
                React
                  │
                  ▼
          TanStack Query
                  │
        ┌─────────┴─────────┐
        │                   │
     Cache              UI State
        │                   │
        └─────────┬─────────┘
                  │
                  ▼
                Axios
                  │
                  ▼
              Backend API
```

### In One Sentence

> **Axios is responsible for communicating with the backend, while TanStack Query is responsible for managing the server data and the lifecycle of that communication in the React application.**

---

# Axios vs TanStack Query — Quick Revision

| Feature                 | Axios |    TanStack Query   |
| ----------------------- | :---: | :-----------------: |
| Make HTTP request       |   ✅   | Uses an HTTP client |
| GET/POST/PUT/DELETE     |   ✅   |      ❌ Directly     |
| Request headers         |   ✅   |          ❌          |
| JSON parsing            |   ✅   |          ❌          |
| Interceptors            |   ✅   |          ❌          |
| Caching                 |   ❌   |          ✅          |
| Background refetching   |   ❌   |          ✅          |
| Query deduplication     |   ❌   |          ✅          |
| Loading state           |   ❌   |          ✅          |
| Error state             |   ❌   |          ✅          |
| Server-state management |   ❌   |          ✅          |

---

# Final Mental Model

```text
Axios = "How do I talk to the server?"

TanStack Query = "When should I talk to the server,
                  should I use cached data,
                  and how should I manage the result?"
```

So in a typical React application:

```text
React
  ↓
TanStack Query
  ↓
Axios
  ↓
Backend
```

This is why **Axios and TanStack Query are complementary rather than competing libraries**.
