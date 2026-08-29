You're right on spot.

# Q: What is `useParams` in React Router?

In simple terms:

> **`useParams()` is used to get values from the URL path.**

For example, suppose you have this URL:

```text
/products/123
```

Here:

```text
/products/123
         ↑
       product ID
```

If `123` is dynamic, `useParams()` lets you get that `123` inside your component.

---

# Q: How does it work?

First, define a dynamic route:

```jsx
<Route path="/products/:id" element={<Product />} />
```

The `:id` means:

> **"This part of the URL can change."**

So these URLs would all match:

```text
/products/101
/products/102
/products/500
```

Then inside `Product`:

```jsx
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();

  return <h1>Product ID: {id}</h1>;
}
```

If the URL is:

```text
/products/123
```

then:

```js
id
```

will contain:

```text
"123"
```

---

# Q: Why do we need `useParams`?

Imagine an e-commerce application.

You have thousands of products:

```text
/products/101
/products/102
/products/103
...
```

You don't want to create a separate React component for every product.

Instead, you create **one route**:

```jsx
<Route path="/products/:id" element={<Product />} />
```

Then the component gets the ID:

```jsx
const { id } = useParams();
```

You can use that ID to fetch the product:

```jsx
const { id } = useParams();

fetch(`/api/products/${id}`);
```

For:

```text
/products/123
```

it becomes:

```text
/api/products/123
```

For:

```text
/products/500
```

it becomes:

```text
/api/products/500
```

So **one component can handle many products.**

---

# Q: Can I have multiple parameters?

Yes.

For example:

```jsx
<Route
  path="/users/:userId/orders/:orderId"
  element={<Order />}
/>
```

URL:

```text
/users/10/orders/500
```

Then:

```jsx
const { userId, orderId } = useParams();

console.log(userId);  // "10"
console.log(orderId); // "500"
```

So:

```text
/users/:userId/orders/:orderId
       ↓               ↓
       10             500
```

---

# Q: Is `useParams` the same as `useSearchParams`?

No. This is **very important**.

### `useParams`

Works with **dynamic path values**:

```text
/products/123
```

```jsx
const { id } = useParams();
```

Result:

```text
123
```

### `useSearchParams`

Works with **query parameters**:

```text
/products?id=123
```

```jsx
const [searchParams] = useSearchParams();

const id = searchParams.get("id");
```

Result:

```text
123
```

The URL looks similar, but they are different concepts.

---

# Q: What is the easiest way to remember the three hooks?

Think about this URL:

```text
/products/123?category=mobile
```

There are different pieces:

```text
/products/123?category=mobile
│          │  │
│          │  └── search parameter
│          │
│          └───── path parameter
│
└──────────────── pathname
```

### `useParams()`

Gets dynamic values from the **path**:

```text
/products/:id
          ↓
         123
```

### `useSearchParams()`

Gets values after `?`:

```text
?category=mobile
         ↓
       mobile
```

### `useLocation()`

Gives you information about the **current location/URL**.

---

# Q: What is the simplest mental model?

Remember these three sentences:

```text
useNavigate()
     ↓
"Take me somewhere."

useLocation()
     ↓
"Where am I?"

useParams()
     ↓
"What value is inside my URL path?"
```

And:

```text
useSearchParams()
     ↓
"What values are after ? in my URL?"
```

### One-line interview answer

> **`useParams()` is a React Router hook used to access dynamic parameters defined in a route path, such as the `id` in `/products/:id`.**
