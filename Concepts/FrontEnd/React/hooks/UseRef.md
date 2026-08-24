## Question: Explain `useRef` Hook in React in simple terms

Your question is **right on spot**. Let's jump in.

### Simple definition

`useRef` is a React Hook that lets you **store a value without causing the component to re-render when that value changes**.

The simplest way to think about it is:

> `useState` = changing the value updates the UI
> `useRef` = changing the value does **not** update the UI

---

## Simplest example

```jsx
import { useRef } from "react";

function App() {
  const countRef = useRef(0);

  function increaseCount() {
    countRef.current++;
    console.log(countRef.current);
  }

  return (
    <button onClick={increaseCount}>
      Click me
    </button>
  );
}
```

### What happens?

### Frame 1: Component is created

```text
countRef.current = 0
```

React renders:

```text
[ Click me ]
```

---

### Frame 2: User clicks the button

This runs:

```jsx
countRef.current++;
```

Now:

```text
countRef.current = 1
```

But the UI stays:

```text
[ Click me ]
```

🚨 **No re-render happens.**

---

### Frame 3: User clicks again

```text
countRef.current = 2
```

Still:

```text
[ Click me ]
```

The value is remembered, but React doesn't refresh the component.

---

# `useState` vs `useRef`

| Feature                         | `useState` | `useRef` |
| ------------------------------- | ---------- | -------- |
| Stores a value                  | Yes        | Yes      |
| Value survives re-render        | Yes        | Yes      |
| Changing value causes re-render | Yes        | No       |
| Used to display changing UI     | Yes        | No       |
| Used for DOM elements           | Usually no | Yes      |

---

# Visual animation

Imagine your component like this:

```text
        COMPONENT
            │
     ┌──────┴──────┐
     │             │
   useState      useRef
     │             │
 UI-related     Internal
    data          data
```

## If you change `useState`

```text
state changes
     ↓
React notices
     ↓
Component function runs again
     ↓
React checks UI
     ↓
UI updates if needed
```

## If you change `useRef`

```text
ref changes
     ↓
React does NOT re-render
     ↓
UI remains the same
```

---

# Most common use of `useRef`: Accessing a DOM element

For example, focusing an input.

```jsx
import { useRef } from "react";

function App() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>
        Focus Input
      </button>
    </>
  );
}
```

## Frame-by-frame animation

### Frame 1: Initial render

```text
inputRef.current = null
```

React creates:

```text
┌──────────────────┐
│                  │  ← Input
└──────────────────┘

[ Focus Input ]
```

---

### Frame 2: React connects the real DOM element

Because of:

```jsx
<input ref={inputRef} />
```

React stores the actual input element:

```text
inputRef.current
        ↓
┌──────────────────┐
│ REAL INPUT       │
└──────────────────┘
```

Now:

```text
inputRef.current = actual HTML input element
```

---

### Frame 3: User clicks button

```jsx
inputRef.current.focus();
```

React does not need to re-render the component.

The browser directly focuses the input:

```text
┌──────────────────┐
│ |                │  ← Cursor appears
└──────────────────┘
```

---

# Why is the property called `.current`?

Because `useRef()` returns an object like this:

```jsx
const inputRef = useRef(null);
```

Conceptually:

```js
{
  current: null
}
```

Later:

```js
{
  current: HTMLInputElement
}
```

You access or modify the stored value using:

```jsx
inputRef.current
```

---

# Very important difference

Consider this:

```jsx
const [count, setCount] = useState(0);
const countRef = useRef(0);
```

### State:

```jsx
setCount(5);
```

Result:

```text
count = 5
↓
React schedules re-render
↓
Component runs again
↓
UI can show 5
```

### Ref:

```jsx
countRef.current = 5;
```

Result:

```text
countRef.current = 5
↓
No re-render
↓
UI does not automatically know it should update
```

---

# Simple rule to remember

Ask yourself:

> **"Do I want this value to update the screen?"**

### Yes → use `useState`

```jsx
const [count, setCount] = useState(0);
```

### No, I just want React to remember the value → use `useRef`

```jsx
const countRef = useRef(0);
```

---

## My practical recommendation for you

When learning React, initially remember **two major uses** of `useRef`:

1. **Getting access to a DOM element**

   ```jsx
   inputRef.current.focus();
   ```

2. **Remembering a value without causing re-render**

   ```jsx
   previousValue.current = value;
   ```

Don't try to use `useRef` as a replacement for `useState`.

### One-line memory trick:

> **State is for the screen. Ref is for remembering things behind the screen.**

Since you're learning React deeply, the next most important concept to understand is **how `useRef` behaves across multiple component re-renders compared with a normal JavaScript variable**. That is where `useRef` usually becomes fully clear.

---

## Question: Show me how `useRef` behaves across multiple component re-renders compared with a normal JavaScript variable.

Your question is **right on spot**. This is probably the **most important concept for truly understanding `useRef`**.

Let's compare three things:

1. Normal JavaScript variable
2. `useRef`
3. `useState`

---

# 1. The example

```jsx
import { useState, useRef } from "react";

function App() {
  let normalVariable = 0;

  const refVariable = useRef(0);

  const [stateVariable, setStateVariable] = useState(0);

  function updateValues() {
    normalVariable++;
    refVariable.current++;
    setStateVariable(stateVariable + 1);
  }

  return (
    <>
      <p>Normal: {normalVariable}</p>
      <p>Ref: {refVariable.current}</p>
      <p>State: {stateVariable}</p>

      <button onClick={updateValues}>
        Update
      </button>
    </>
  );
}
```

Now let's watch this **frame by frame like an animation**.

---

# Frame 1: Initial component render

When React calls the component for the first time:

```text
App()
```

The following code executes:

```jsx
let normalVariable = 0;
```

So:

```text
normalVariable = 0
```

Then:

```jsx
const refVariable = useRef(0);
```

React creates a special persistent object:

```text
refVariable
    ↓
{
  current: 0
}
```

Then:

```jsx
const [stateVariable, setStateVariable] = useState(0);
```

React stores:

```text
stateVariable = 0
```

The UI becomes:

```text
Normal: 0
Ref:    0
State:  0

[ Update ]
```

---

# Frame 2: User clicks `Update`

This function runs:

```jsx
function updateValues() {
  normalVariable++;
  refVariable.current++;
  setStateVariable(stateVariable + 1);
}
```

Let's go line by line.

### Line 1

```jsx
normalVariable++;
```

```text
normalVariable: 0 → 1
```

### Line 2

```jsx
refVariable.current++;
```

```text
refVariable.current: 0 → 1
```

### Line 3

```jsx
setStateVariable(stateVariable + 1);
```

```text
stateVariable: 0 → 1
```

At this moment, React will schedule a **re-render** because of:

```jsx
setStateVariable(...)
```

So now React starts the next frame.

---

# Frame 3: Component re-renders

React calls the component function again:

```text
App()
```

Here is the crucial point:

## The entire component function runs again

This line runs again:

```jsx
let normalVariable = 0;
```

So your previous:

```text
normalVariable = 1
```

is gone.

The variable is created again:

```text
normalVariable = 0
```

---

## What happens to `useRef`?

This runs again:

```jsx
const refVariable = useRef(0);
```

But React does **not** create a completely new ref value.

It remembers the old ref:

```text
{
  current: 1
}
```

So after re-render:

```text
refVariable.current = 1
```

---

## What happens to `useState`?

React also remembers its previous state:

```text
stateVariable = 1
```

So after re-render:

```text
Normal: 0
Ref:    1
State:  1
```

This is the important result.

---

# Visual comparison

## Normal JavaScript variable

```text
RENDER 1

let normalVariable = 0
        ↓
normalVariable = 0
        ↓
normalVariable++
        ↓
normalVariable = 1


RE-RENDER

let normalVariable = 0  ← CREATED AGAIN!
        ↓
normalVariable = 0
```

The old value is lost.

---

## `useRef`

```text
RENDER 1

useRef(0)
   ↓
{
  current: 0
}
   ↓
current++
   ↓
{
  current: 1
}


RE-RENDER

useRef(0)
   ↓
React gives back the SAME stored object
   ↓
{
  current: 1
}
```

The value survives.

---

## `useState`

```text
RENDER 1

useState(0)
   ↓
State = 0
   ↓
setState(1)


RE-RENDER

useState(0)
   ↓
React remembers:
State = 1
```

The value survives.

---

# Animation summary

```text
              RENDER 1
                 │
        ┌────────┼────────┐
        ↓        ↓        ↓
      Normal    Ref      State
        0        0         0
        │        │         │
        ↓        ↓         ↓
      Change   Change    Change
        1        1         1
        │        │         │
        └────────┼─────────┘
                 ↓
              RE-RENDER
                 │
        ┌────────┼────────┐
        ↓        ↓        ↓
      Normal    Ref      State
      RESET     KEEP      KEEP
        0        1         1
```

---

# Why does the normal variable reset?

Because this:

```jsx
function App() {
  let normalVariable = 0;

  // ...
}
```

is just a normal JavaScript function.

When React re-renders:

```text
Render 1
↓
App() runs
↓
normalVariable created


Render 2
↓
App() runs AGAIN
↓
normalVariable created AGAIN


Render 3
↓
App() runs AGAIN
↓
normalVariable created AGAIN
```

Each component render is another execution of the function.

---

# The React mental model

Think of your component function as a **machine that React runs again and again**:

```text
React
  │
  ▼
App() ───► Creates normal variables
  │
  ▼
Returns UI
```

On the next re-render:

```text
React
  │
  ▼
App() AGAIN ───► Creates normal variables AGAIN
  │
  ▼
Returns new UI
```

But `useState` and `useRef` values are stored by React **outside the temporary execution of your component function**.

Conceptually:

```text
                    React Memory
                 ┌─────────────────┐
                 │ State = 1       │
                 │ Ref.current = 1 │
                 └────────▲────────┘
                          │
                          │ survives
                          │
                ┌─────────┴──────────┐
                │     App()          │
                │                    │
                │ normalVariable = 0 │ ← recreated
                └────────────────────┘
```

---

# The biggest difference between `useState` and `useRef`

Both remember values across re-renders.

But:

```text
useState
   ↓
Value changes
   ↓
React re-renders
```

Whereas:

```text
useRef
   ↓
Value changes
   ↓
React does NOT re-render
```

So:

| Feature                         | Normal variable   | `useRef`     | `useState`   |
| ------------------------------- | ----------------- | ------------ | ------------ |
| Survives re-render              | ❌                 | ✅            | ✅            |
| Changing value causes re-render | ❌                 | ❌            | ✅            |
| React remembers value           | ❌                 | ✅            | ✅            |
| Can directly update with `=`    | Normal assignment | `.current =` | ❌ Use setter |

---

# One important observation

Suppose you have:

```jsx
function updateRef() {
  refVariable.current++;
}
```

This changes the value:

```text
0 → 1
```

But because there is **no state update**, the component does not re-render.

So the screen may still show:

```text
Ref: 0
```

Even though internally:

```text
refVariable.current = 1
```

This can feel confusing at first.

The actual situation is:

```text
Browser UI:           Ref memory:
────────────          ───────────
Ref: 0                current: 1
```

The memory changed, but React was not told to redraw the UI.

Later, if something else causes a re-render:

```text
Some state changes
      ↓
Component re-renders
      ↓
React reads refVariable.current
      ↓
UI can now show:
Ref: 1
```

---

# Final mental model

```text
Normal Variable
    ↓
Lives only during one execution of the component function


useRef
    ↓
Lives across component re-renders
    ↓
Changing it does NOT cause re-render


useState
    ↓
Lives across component re-renders
    ↓
Changing it DOES cause re-render
```

## The simplest sentence to remember:

> **A normal variable is recreated on every component render, `useRef` remembers a value without refreshing the UI, and `useState` remembers a value and refreshes the UI.**

---

## Question: So basically because `useState` re-renders the screen, in this case the ref variable's new count also gets rendered. If the component did not refresh, the new ref count would not show on the screen, right?

Your understanding is **correct**. Just one small wording correction:

> **`useState` causes the component to re-render, and during that re-render React reads the latest `ref.current` value. If no re-render happens, the updated ref value will not automatically appear on the screen.**

### Let's use this code again:

```jsx
function App() {
  const [count, setCount] = useState(0);
  const refCount = useRef(0);

  function update() {
    refCount.current++;
    setCount(count + 1);
  }

  return (
    <>
      <p>State: {count}</p>
      <p>Ref: {refCount.current}</p>
      <button onClick={update}>Update</button>
    </>
  );
}
```

## Frame-by-frame

### Frame 1: Initial screen

```text
State: 0
Ref:   0
```

---

### Frame 2: User clicks `Update`

```jsx
refCount.current++;
```

Now internally:

```text
State: 0
Ref:   1
```

But the screen has **not updated yet**.

Then:

```jsx
setCount(count + 1);
```

React sees a state update:

```text
setCount()
   ↓
Component re-renders
   ↓
Component function runs again
   ↓
React reads refCount.current
   ↓
Latest value = 1
   ↓
Screen updates
```

Now the screen shows:

```text
State: 1
Ref:   1
```

## So your understanding is:

```text
ref.current changes
      ↓
React does not re-render automatically
      ↓
useState changes
      ↓
React re-renders
      ↓
During re-render, React reads the latest ref.current
      ↓
Latest ref value appears on screen
```

### The key point

The ref itself **does not trigger the re-render**.

But **once another reason causes a re-render**—such as `useState` changing—React can use the latest ref value while producing the new UI.

> **`useRef` updates the memory. `useState` triggers the refresh. The refresh then reads the latest ref value.**

That is exactly the correct mental model.

