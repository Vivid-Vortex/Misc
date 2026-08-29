Your question is clear. You're right on spot.

# Q: What is `useLocation` in React Router?

In simple terms:

> **`useLocation()` tells you where the user currently is in your React application.**

When you write:

```jsx
const location = useLocation();
```

`location` becomes an object containing information about the **current URL/route**.

---

## Q: What does `location` contain?

For example, suppose the browser URL is:

```text
https://myapp.com/products/123?category=mobile
```

Then:

```jsx
const location = useLocation();
```

gives you information roughly like:

```js
{
  pathname: "/products/123",
  search: "?category=mobile",
  hash: "",
  state: null
}
```

The most important properties are:

| Property   | Meaning                       |
| ---------- | ----------------------------- |
| `pathname` | Current path                  |
| `search`   | Query parameters              |
| `hash`     | URL hash (`#something`)       |
| `state`    | Data passed during navigation |

---

# Q: Is `useLocation` only used to receive data from `navigate()`?

**No.** That's only **one use case**.

There are actually several important things you should understand.

---

## 1. Get the current route

This is probably the most basic use.

```jsx
const location = useLocation();

console.log(location.pathname);
```

If the URL is:

```text
/products
```

then:

```js
location.pathname
```

returns:

```text
/products
```

You can use this when your UI needs to know **which route the user is currently on**.

For example:

```jsx
const location = useLocation();

if (location.pathname === "/home") {
  // do something
}
```

---

# Q: How is this useful in real applications?

Imagine you have a navigation bar:

```text
Home | Products | Orders | Profile
```

You might want to highlight the current page.

If the user is on:

```text
/products
```

you can check:

```jsx
const location = useLocation();

console.log(location.pathname);
// /products
```

and determine that **Products** is the active section.

> In practice, however, React Router's `NavLink` is usually better for active navigation styling.

---

# 2. Read query parameters

Suppose the URL is:

```text
/products?category=mobile
```

Then:

```jsx
const location = useLocation();

console.log(location.search);
```

gives:

```text
?category=mobile
```

You can then use:

```jsx
const params = new URLSearchParams(location.search);

console.log(params.get("category"));
```

Result:

```text
mobile
```

### Modern React Router alternative

For query parameters, React Router provides `useSearchParams`, which is generally cleaner:

```jsx
const [searchParams] = useSearchParams();

console.log(searchParams.get("category"));
```

So remember:

```text
useLocation()
     ↓
gives information about current URL

useSearchParams()
     ↓
specifically works with query parameters
```

---

# 3. Read data passed through navigation

This connects directly to your previous question about `useNavigate`.

You can do:

```jsx
navigate("/home", {
  state: { username: "Deepak" }
});
```

Then in the `/home` component:

```jsx
const location = useLocation();

console.log(location.state);
```

You get:

```js
{
  username: "Deepak"
}
```

And:

```jsx
console.log(location.state.username);
```

gives:

```text
Deepak
```

So this:

```jsx
const location = useLocation();
```

is how you can access the navigation state.

---

# 4. Detect when the route changes

This is another important use.

You can combine `useLocation()` with `useEffect`.

```jsx
const location = useLocation();

useEffect(() => {
  console.log("Route changed:", location.pathname);
}, [location]);
```

Whenever the route changes, the `location` object changes, causing the effect to run again.

For example:

```text
/home
  ↓
/products
  ↓
/orders
```

You can react to those changes.

This can be useful for things like:

* analytics
* logging
* resetting something when the route changes
* tracking page views
* running route-specific logic

---

# Q: What exactly does this line mean?

```jsx
const location = useLocation();
```

Break it down:

```text
useLocation()
     ↓
React Router looks at the current URL
     ↓
creates/returns location information
     ↓
you store it in `location`
```

So:

```jsx
location.pathname
```

means:

> "What path am I currently on?"

And:

```jsx
location.search
```

means:

> "What query string is currently in the URL?"

And:

```jsx
location.state
```

means:

> "Was any navigation state passed to this route?"

---

# Q: `useNavigate` vs `useLocation` — what's the difference?

This is the easiest way to remember them:

| Hook            | Think of it as   |
| --------------- | ---------------- |
| `useNavigate()` | **Go somewhere** |
| `useLocation()` | **Where am I?**  |

Example:

```jsx
const navigate = useNavigate();
const location = useLocation();

navigate("/products");       // Go to products

location.pathname;          // Where am I?
```

### Simple mental model

```text
                  React Router
                       │
             ┌─────────┴─────────┐
             ↓                   ↓
       useNavigate()       useLocation()
             │                   │
        "Go there"          "Where am I?"
             │                   │
       /products             /home
```

---

## Q: Do I need to learn the entire `location` object?

**Not immediately.**

For now, remember these four:

```jsx
const location = useLocation();

location.pathname  // /products
location.search    // ?category=mobile
location.hash      // #reviews
location.state     // data passed during navigation
```

And one important modern practice:

> **Don't use `useLocation()` for everything.** React Router has specialized hooks such as `useParams()` for URL parameters and `useSearchParams()` for query parameters. Use those when they make the intent clearer.

### The core idea

```text
useNavigate
    ↓
CHANGE where you are

useLocation
    ↓
KNOW where you are
```

That's the fundamental relationship between the two.
