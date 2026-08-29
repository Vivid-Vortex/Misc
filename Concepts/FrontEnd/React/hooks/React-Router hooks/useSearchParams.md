You're right on spot.

# Q: What is `useSearchParams` in React Router?

In simple terms:

> **`useSearchParams` is used to read and change the query parameters in the URL.**

For example, if your URL is:

```text
/products?category=mobile&page=2
```

Then:

```text
/products
    ↓
Path

?category=mobile&page=2
    ↓
Search parameters / Query parameters
```

`useSearchParams()` specifically helps you work with this `?category=mobile&page=2` part.

---

# Q: How do I use it?

```jsx
import { useSearchParams } from "react-router-dom";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  return <div>{searchParams.get("category")}</div>;
}
```

If the URL is:

```text
/products?category=mobile
```

then:

```js
searchParams.get("category")
```

returns:

```text
mobile
```

---

# Q: Why are there two values returned?

```js
const [searchParams, setSearchParams] = useSearchParams();
```

Think of it like this:

```text
searchParams
     ↓
READ the URL parameters

setSearchParams
     ↓
CHANGE the URL parameters
```

Very similar to React's `useState`:

```js
const [value, setValue] = useState();
```

So you can remember:

> **`searchParams` = read**
> **`setSearchParams` = update**

---

# Q: How do I read a parameter?

Suppose the URL is:

```text
/products?category=mobile
```

Use:

```js
const category = searchParams.get("category");

console.log(category);
```

Output:

```text
mobile
```

---

# Q: What if there are multiple parameters?

URL:

```text
/products?category=mobile&page=2
```

You can do:

```js
const category = searchParams.get("category");
const page = searchParams.get("page");

console.log(category); // mobile
console.log(page);     // 2
```

Notice that `page` is returned as a **string**:

```js
"2"
```

not:

```js
2
```

If you need a number:

```js
const page = Number(searchParams.get("page"));
```

---

# Q: How do I change the search parameters?

Suppose the current URL is:

```text
/products?category=mobile
```

You can do:

```js
setSearchParams({
  category: "laptop"
});
```

The URL becomes:

```text
/products?category=laptop
```

So:

```text
setSearchParams()
       ↓
changes URL
       ↓
React Router updates the page
```

---

# Q: Can I use it for filtering?

**Yes. This is one of the most common real-world uses.**

Imagine a product page:

```text
Category:
[ Mobile ▼ ]

Products
```

When the user selects Mobile:

```text
/products?category=mobile
```

When they select Laptop:

```text
/products?category=laptop
```

Your application can read:

```js
const category = searchParams.get("category");
```

and fetch/display the appropriate products.

---

# Q: Can I use it for pagination?

Absolutely.

Suppose:

```text
/products?page=1
```

User clicks **Next**:

```js
setSearchParams({
  page: "2"
});
```

URL becomes:

```text
/products?page=2
```

This is useful because the page number is now part of the URL.

If the user copies:

```text
/products?page=2
```

and sends it to someone else, they can open the same page.

---

# Q: What happens if I have multiple parameters?

Suppose:

```text
/products?category=mobile&page=2
```

You can set both:

```js
setSearchParams({
  category: "mobile",
  page: "2"
});
```

Result:

```text
/products?category=mobile&page=2
```

---

# Q: What is the difference between `useLocation` and `useSearchParams`?

This is important because you just learned `useLocation`.

### `useLocation`

Gives you **information about the entire current URL**.

```js
const location = useLocation();

location.pathname
location.search
location.hash
location.state
```

### `useSearchParams`

Specifically helps you **read and modify query parameters**.

```js
const [searchParams, setSearchParams] = useSearchParams();

searchParams.get("category");

setSearchParams({
  category: "mobile"
});
```

Think:

```text
URL
│
├── /products
│       ↑
│   pathname
│
└── ?category=mobile&page=2
        ↑
    search parameters
```

So:

```text
useLocation()
     ↓
"Tell me about the current URL."

useSearchParams()
     ↓
"Help me work with the ?key=value part."
```

---

# Q: How is it different from `useParams`?

This is another important distinction.

Suppose you have:

```text
/products/123
```

Here `123` is a **route parameter**.

You would typically use:

```js
useParams()
```

Example:

```jsx
const { id } = useParams();

console.log(id); // 123
```

But:

```text
/products?category=mobile
```

has a **query/search parameter**.

You would use:

```js
useSearchParams()
```

Example:

```js
const category = searchParams.get("category");
```

### Easy table

| URL                         | Hook                                      |
| --------------------------- | ----------------------------------------- |
| `/products/123`             | `useParams()`                             |
| `/products?category=mobile` | `useSearchParams()`                       |
| `/products`                 | `useLocation()` can tell you the pathname |

---

# Q: What should I remember?

Just remember this:

```jsx
const [searchParams, setSearchParams] = useSearchParams();
```

### Read:

```js
searchParams.get("category");
```

### Change:

```js
setSearchParams({
  category: "mobile"
});
```

### Mental model:

```text
useParams()
     ↓
URL path parameters
/products/123

useSearchParams()
     ↓
URL query parameters
/products?category=mobile

useLocation()
     ↓
Information about the current URL
```

**In one sentence:**

> **`useSearchParams` lets your React component read and update the `?key=value` parameters in the browser URL.**
