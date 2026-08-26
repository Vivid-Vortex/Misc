## Q: Explain `useContext` in React in simple terms

Your question is correct. **You’re right on the spot.**

### Simple explanation

`useContext` lets you **share data between components without passing props manually through every component**.

Think of React components like this:

```text
App
 └── Parent
      └── Child
           └── GrandChild
```

Suppose `App` has the current user:

```js
const user = "Deepak";
```

Without `useContext`, if `GrandChild` needs `user`, you normally pass it through every level:

```text
App
 ↓ user
Parent
 ↓ user
Child
 ↓ user
GrandChild
```

This is called **prop drilling**.

---

# 1. The problem: Prop drilling

```jsx
function App() {
  const user = "Deepak";

  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />;
}

function Child({ user }) {
  return <GrandChild user={user} />;
}

function GrandChild({ user }) {
  return <h1>Hello {user}</h1>;
}
```

### Problem

`Parent` and `Child` don't actually need `user`.

They are only passing it to the next component.

This can become annoying:

```text
App → Parent → Child → Component → Component → GrandChild
```

---

# 2. `useContext` solves this

With `useContext`, you create a **shared data container**.

```text
             Context
                │
                ▼
             user data
                │
        ┌───────┴────────┐
        ▼                ▼
   Component A      Component B
```

A component can directly access the shared value.

---

# 3. Simplest `useContext` example

## Step 1: Create Context

```jsx
import { createContext, useContext } from "react";

const UserContext = createContext();
```

This creates a shared container:

```text
UserContext = [ shared place for data ]
```

---

## Step 2: Provide the data

```jsx
function App() {
  const user = "Deepak";

  return (
    <UserContext.Provider value={user}>
      <Parent />
    </UserContext.Provider>
  );
}
```

Here:

```jsx
value={user}
```

means:

> Put `"Deepak"` into this shared context.

---

## Step 3: Read the data using `useContext`

```jsx
function GrandChild() {
  const user = useContext(UserContext);

  return <h1>Hello {user}</h1>;
}
```

Now `GrandChild` gets the value directly.

It doesn't need props from `Parent` and `Child`.

---

# <mark>Complete example</mark>

```jsx
import { createContext, useContext } from "react";

const UserContext = createContext();

function App() {
  return (
    <UserContext.Provider value="Deepak">
      <Parent />
    </UserContext.Provider>
  );
}

function Parent() {
  return <Child />;
}

function Child() {
  return <GrandChild />;
}

function GrandChild() {
  const user = useContext(UserContext);

  return <h1>Hello {user}</h1>;
}
```

### Data flow

```text
App
 │
 │ UserContext.Provider
 │ value = "Deepak"
 │
 ├── Parent
 │
 │    └── Child
 │
 │         └── GrandChild
 │               │
 │               └── useContext(UserContext)
 │
 └──────────────────────► "Deepak"
```

---

# The most important thing to remember

```jsx
const value = useContext(MyContext);
```

This simply means:

> **"Give me the current value stored in `MyContext`."**

For example:

```jsx
const user = useContext(UserContext);
```

means:

> **"Get the current user from `UserContext`."**

---

# `createContext`, Provider, and `useContext`

These three concepts work together:

### 1. `createContext()`

Creates the shared container.

```jsx
const UserContext = createContext();
```

### 2. `Provider`

Puts data into the shared container.

```jsx
<UserContext.Provider value="Deepak">
```

### 3. `useContext()`

Reads the shared data.

```jsx
const user = useContext(UserContext);
```

### Easy formula

```text
createContext()
       ↓
Create shared container

Provider
       ↓
Put data into container

useContext()
       ↓
Read data from container
```

---

# Modern React 19 syntax

In **React 19**, you can use a simpler provider syntax.

### Older/traditional syntax

```jsx
<UserContext.Provider value={user}>
  <App />
</UserContext.Provider>
```

### Modern React 19 syntax

```jsx
<UserContext value={user}>
  <App />
</UserContext>
```

Both provide context data, but the React 19 syntax is simpler.

You still consume the value using:

```jsx
const user = useContext(UserContext);
```

---

# One-line summary

> **`useContext` allows a component to directly access shared data from a Context, avoiding unnecessary prop drilling.**

The best mental model is:

```text
Props      = Parent gives data directly to Child
Context    = Components can access shared data from a common place
useContext = A component reads that shared data
```

**Practical advice:** Use `useContext` for data that many components need, such as **theme, logged-in user, language, or application settings**. Don't use it for every piece of state—simple props are often easier to understand.

---

## Q: Please give one more example where you are connecting state to context.

You're right on the spot.

The simplest way to understand this is:

> **`useState` creates and manages the data. `Context` shares that data with multiple components.**

Let's use a **logged-in user name** example.

## Complete example — everything in one file

```jsx
import { createContext, useContext, useState } from "react";

// 1. Create context
const UserContext = createContext();

function UserProfile() {
  // 4. Read shared state from context
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <h2>User: {user}</h2>

      <button onClick={() => setUser("Rahul")}>
        Change User
      </button>
    </>
  );
}

function Header() {
  // 4. Another component reads the same shared state
  const { user } = useContext(UserContext);

  return <h1>Welcome, {user}</h1>;
}

export default function App() {
  // 2. Create state
  const [user, setUser] = useState("Deepak");

  return (
    // 3. Put state and state updater into Context
    <UserContext
      value={{
        user,
        setUser
      }}
    >
      <Header />
      <UserProfile />
    </UserContext>
  );
}
```

---

# How the pieces connect

```text
useState
   │
   ▼
user = "Deepak"
setUser = function
   │
   ▼
Context
   │
   ├── Header
   │      │
   │      └── Reads user
   │
   └── UserProfile
          │
          ├── Reads user
          │
          └── Calls setUser("Rahul")
```

## The key line

```jsx
const [user, setUser] = useState("Deepak");
```

Here:

```text
user    → current value
setUser → changes the value
```

Then we share both through Context:

```jsx
<UserContext
  value={{
    user,
    setUser
  }}
>
```

So the context now contains:

```js
{
  user: "Deepak",
  setUser: setUserFunction
}
```

Any child component can access both:

```jsx
const { user, setUser } = useContext(UserContext);
```

---

# What happens when you click the button?

This is a **UI re-rendering case**, so let's see it frame by frame.

### Frame 1: Initial render

```text
App
 │
 ├── user = "Deepak"
 │
 ├── Header
 │     → Welcome, Deepak
 │
 └── UserProfile
       → User: Deepak
```

---

### Frame 2: User clicks button

```jsx
setUser("Rahul");
```

The state update is requested.

---

### Frame 3: React updates state

```text
Before:
user = "Deepak"

After:
user = "Rahul"
```

Since `user` is state inside `App`, React re-renders `App`.

---

### Frame 4: New Context value is provided

The new value becomes:

```js
{
  user: "Rahul",
  setUser: setUserFunction
}
```

---

### Frame 5: Components using the context update

`Header` reads:

```jsx
const { user } = useContext(UserContext);
```

It gets:

```text
Rahul
```

`UserProfile` also gets:

```text
Rahul
```

So the UI becomes:

```text
Welcome, Rahul

User: Rahul
[Change User]
```

---

# The important relationship

```text
useState
    ↓
Manages the state

Context
    ↓
Makes that state available to multiple components

useContext
    ↓
Reads that shared state inside a component
```

## In one sentence

> **`useState` owns the data, and Context distributes that data.**

A common pattern is therefore:

```jsx
const [user, setUser] = useState("Deepak");

<UserContext value={{ user, setUser }}>
  <YourComponents />
</UserContext>
```

Then anywhere below that context:

```jsx
const { user, setUser } = useContext(UserContext);
```

### Practical rule

* Use **`useState`** when state belongs locally to one component.
* Use **Context + `useState`** when the same state needs to be shared across multiple components without prop drilling.

The next natural example would be a **Theme Context using `useState`**, because it makes the sharing and re-rendering behavior even more visually obvious.


