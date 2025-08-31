**Question:** “Elaborate on when not to use SWR.”

---

Got it! Here’s a **simple summary** for you:

---

**SWR error handling only applies to client-side `GET` requests made using SWR.**

* SWR is **not meant for server-side rendering (SSR), static generation (SSG), or React Server Components**.
* It’s also **not designed for POST/PUT/DELETE** (writes).
* Think of it as:

  > *“If I’m fetching data on the **client** with a `GET` request using SWR, I get built-in caching, retries, and error handling.”*

For everything else (SSR, RSC, writes), same for errors mechanisim, handle it differently (server-side or custom logic).

---

**Answer:**

SWR (Stale-While-Revalidate) is great for client-side data fetching in React/Next.js apps, but there are scenarios where it’s **not the best choice**. Let’s break it down:

---

### 🔹 1. When You’re Doing Server-Side Rendering (SSR)

* If you’re already using `getServerSideProps` in Next.js, you’re fetching data on the server for every request.
* SWR would **duplicate that fetching on the client**, which wastes resources.
* Example:

  ```javascript
  export async function getServerSideProps() {
    const res = await fetch("https://api.example.com/data");
    const data = await res.json();
    return { props: { data } };
  }
  ```

  In this case, **no SWR needed** because data is fresh and already rendered.

---

### 🔹 2. When You’re Using Static Generation (SSG)

* If you’re using `getStaticProps` to pre-build pages at build time, you already have your data.
* SWR would cause an unnecessary re-fetch.
* Example:

  ```javascript
  export async function getStaticProps() {
    const res = await fetch("https://api.example.com/data");
    const data = await res.json();
    return { props: { data } };
  }
  ```

  Here, SWR doesn’t add value unless you specifically need **revalidation** on the client.

---

### 🔹 3. When Using React Server Components

* React Server Components (RSC) already fetch data **on the server at render time**.
* SWR’s client-side fetching is redundant.
* You should rely on `fetch()` in the server component itself.

---

### 🔹 4. For POST/PUT/DELETE Requests

* SWR is designed for **fetching GET data** and caching results.
* For POST, PUT, DELETE (mutations), use functions like `mutate()` or dedicated mutation handlers.
* Example (with SWR):

  ```javascript
  await mutate("/api/data", async () => {
    await fetch("/api/data", { method: "POST" });
  });
  ```

  If your app is mostly write-heavy, SWR isn’t ideal as a primary tool.

---

### 🔹 5. When the Data Doesn’t Change or Doesn’t Need Revalidation

* If your data is static or changes infrequently (like static blog content), SWR’s revalidation adds unnecessary overhead.
* You can just hardcode or pre-render it.

---

### 🔹 Summary Table

| Scenario                   | Should You Use SWR?               | Reason                                       |
| -------------------------- | --------------------------------- | -------------------------------------------- |
| `getServerSideProps` (SSR) | ❌ No                              | Data already fetched on server.              |
| `getStaticProps` (SSG)     | ❌ No (unless revalidation needed) | Pre-rendered data, no need for client fetch. |
| React Server Components    | ❌ No                              | Server fetch makes SWR redundant.            |
| POST/PUT/DELETE-heavy app  | ❌ Not ideal                       | SWR is optimized for GET and caching.        |
| Rarely changing data       | ❌ Not needed                      | Static data doesn’t benefit from SWR.        |

---

Great point! Let’s dig into that:

---

**Question:**
“In point 1, let’s say if I use SWR, then it would be easy to use caching here?”

---

**Answer:**

Yes, technically you **can** use SWR with `getServerSideProps`, and it would give you client-side caching. But here’s the nuance:

---

🔹 **How It Would Work:**

1. `getServerSideProps` runs on every request → The server sends **fresh data**.
2. SWR on the client can **cache this data** (using its internal cache).
3. When the user navigates between pages or revisits the same component, SWR can show **cached data instantly** and revalidate in the background.

This is beneficial if:

* Your app has **multiple pages/components** consuming the same data.
* You want a **snappy UX** with instant cache rendering when the user navigates.

---

🔹 **The Downside:**

* Using SWR here is **redundant** because SSR already gives you fresh data on each page load.
* If the page is being **fully re-rendered on the server every time**, the benefit of SWR caching diminishes since the user won’t see much of the cached state (it’s overwritten with fresh server data).
* It adds **extra fetch calls** unless you carefully hydrate SWR cache with SSR data (which requires extra setup).

---

🔹 **Best Practice If You Want Both SSR + SWR Cache:**
You can **hydrate SWR with SSR data** so that SWR doesn’t refetch unnecessarily:

```javascript
// pages/index.js
import useSWR from "swr";

export async function getServerSideProps() {
  const data = await fetch("https://api.example.com/data").then(res => res.json());
  return { props: { fallbackData: data } };
}

export default function Home({ fallbackData }) {
  const fetcher = url => fetch(url).then(res => res.json());
  const { data } = useSWR("https://api.example.com/data", fetcher, {
    fallbackData,
    revalidateOnMount: true,
  });

  return <div>{data.title}</div>;
}
```

✅ This way:

* SSR gives fresh data initially.
* SWR caches it, so navigation and re-renders are **super fast**.
* SWR also revalidates in the background.

---

🔹 **Summary:**

* **Using SWR with SSR is valid if you want client-side caching and smoother navigation.**
* Without cache hydration, it’s redundant and adds extra calls.
* It shines when **data is shared across components** and **UX speed** matters.

---

Would you like me to show **a visual flow diagram** of how SSR + SWR caching works together?

