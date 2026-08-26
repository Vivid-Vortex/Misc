**Question: “Explain React reducers in simple terms.”**

Your sentence is clear. 👍

## Q: What is a React reducer?

### A:

A **reducer is a function that decides how state should change**.

The simplest mental model is:

> **Current State + Action → New State**

```text
Current State
     +
Action
     ↓
Reducer
     ↓
New State
```

In React, reducers are commonly used with the `useReducer` hook.

---

# 1. Simple real-life example

Imagine a bank account.

You have:

```text
Current balance = 100
```

Then someone performs an action:

```text
DEPOSIT 50
```

The reducer decides:

```text
Current State: 100
Action: DEPOSIT 50

Reducer:
100 + 50 = 150

New State: 150
```

The reducer is simply the **decision maker for changing state**.

---

# 2. The simplest React example: Counter

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  if (action.type === "INCREMENT") {
    return state + 1;
  }

  return state;
}

export default function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        Increase
      </button>
    </>
  );
}
```

---

# 3. Understand the important line

```jsx
const [count, dispatch] = useReducer(reducer, 0);
```

Think of it as:

```text
count      → Current state
dispatch   → Sends an action
reducer    → Decides the new state
0          → Initial state
```

So:

```text
useReducer(reducer, initialState)
```

returns:

```text
[currentState, dispatchFunction]
```

---

# 4. What happens when you click the button?

Let's understand the complete flow.

## Step 1: Initial state

```jsx
const [count, dispatch] = useReducer(reducer, 0);
```

So:

```text
count = 0
```

UI:

```text
0

[ Increase ]
```

---

## Step 2: User clicks the button

```jsx
dispatch({ type: "INCREMENT" });
```

`dispatch()` sends this action to the reducer:

```text
{
  type: "INCREMENT"
}
```

---

## Step 3: React calls the reducer

Conceptually:

```jsx
reducer(0, { type: "INCREMENT" });
```

The reducer receives:

```text
state = 0

action = {
  type: "INCREMENT"
}
```

---

## Step 4: Reducer decides the next state

```jsx
if (action.type === "INCREMENT") {
  return state + 1;
}
```

So:

```text
return 0 + 1
```

Result:

```text
1
```

---

## Step 5: React updates the state

Now:

```text
count = 1
```

React re-renders the component.

The UI becomes:

```text
1

[ Increase ]
```

---

# 5. The complete flow in one picture

```text
User clicks button
        ↓
dispatch({ type: "INCREMENT" })
        ↓
Reducer receives:
(state, action)
        ↓
reducer(0, { type: "INCREMENT" })
        ↓
return 1
        ↓
React updates state
        ↓
count = 1
        ↓
Component re-renders
        ↓
UI shows 1
```

---

# 6. What is an action?

An **action is just an object that describes what happened**.

Example:

```jsx
{
  type: "INCREMENT"
}
```

You can think of `type` as an instruction:

```text
"INCREMENT"
"DECREMENT"
"RESET"
```

A slightly more realistic action:

```jsx
{
  type: "ADD_ITEM",
  payload: "Laptop"
}
```

Here:

```text
type    → What should happen?
payload → Data needed to perform the action
```

---

# 7. Multiple actions example

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;

    case "DECREMENT":
      return state - 1;

    case "RESET":
      return 0;

    default:
      return state;
  }
}
```

And:

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;

    case "DECREMENT":
      return state - 1;

    case "RESET":
      return 0;

    default:
      return state;
  }
}

export default function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        +
      </button>

      <button onClick={() => dispatch({ type: "DECREMENT" })}>
        -
      </button>

      <button onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>
    </>
  );
}
```

---

# 8. Why not just use `useState`?

You can absolutely use `useState` for a counter:

```jsx
const [count, setCount] = useState(0);

setCount(count + 1);
```

For a simple counter, **`useState` is better and simpler**.

The reducer becomes useful when the state logic gets more complex.

For example:

```text
Login form
Shopping cart
Todo application
Multi-step form
Complex API state
Multiple related state values
```

With `useState`, your update logic might become scattered across many functions.

With `useReducer`:

```text
All state-changing logic
        ↓
    Reducer
        ↓
One central place
```

---

# 9. Simple object example

Suppose your state is:

```jsx
const initialState = {
  name: "",
  age: 0
};
```

Reducer:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload
      };

    case "INCREMENT_AGE":
      return {
        ...state,
        age: state.age + 1
      };

    default:
      return state;
  }
}
```

Component:

```jsx
const [user, dispatch] = useReducer(reducer, {
  name: "",
  age: 0
});
```

Dispatch actions:

```jsx
dispatch({
  type: "SET_NAME",
  payload: "Deepak"
});
```

or:

```jsx
dispatch({
  type: "INCREMENT_AGE"
});
```

---

# 10. The biggest rule: Reducer should be pure

A reducer should:

```text
Same input
    ↓
Same output
```

For example:

```jsx
function reducer(state, action) {
  return state + 1;
}
```

Good.

But ideally, avoid doing side effects inside a reducer:

```jsx
fetch(...)
```

```jsx
setTimeout(...)
```

```jsx
localStorage.setItem(...)
```

Reducers should primarily do this:

```text
Input:
state + action

Output:
new state
```

---

# Final summary

Think of `useReducer` like this:

```text
useState
   ↓
Good for simple state
```

```text
useReducer
   ↓
Good when state-changing logic becomes complex
```

The core idea is:

```text
dispatch(action)
       ↓
reducer(currentState, action)
       ↓
newState
       ↓
React updates UI
```

### One-line definition:

> **A React reducer is a function that takes the current state and an action, then returns the new state.**

For you, as you're learning React concepts deeply, I recommend mastering this exact flow first:

```text
useReducer → dispatch → action → reducer → new state → re-render
```

Once this is crystal clear, concepts like **Redux, Redux Toolkit, and complex React state management** become much easier.

---

## Question: “For side effects, we should use `useEffect` rather than `useReducer`, right?”

side effects - Anything extra apart from that particular block is designed for like given above.

You're right on spot. **Yes, generally side effects should be handled with `useEffect`, not inside the reducer.**

## Q: Why?

### A:

Think of their responsibilities like this:

```text
useReducer
   ↓
Purely calculates the next state

useEffect
   ↓
Performs side effects
```

### Reducer:

```jsx
function reducer(state, action) {
  if (action.type === "INCREMENT") {
    return state + 1;
  }

  return state;
}
```

This is pure:

```text
Current State + Action → New State
```

---

### `useEffect`:

```jsx
useEffect(() => {
  console.log("Count changed:", count);
}, [count]);
```

This performs something **because state changed**.

Examples of side effects:

```text
API calls
Timers
Subscriptions
Direct DOM interaction
localStorage operations
WebSocket connections
```

---

## The clean architecture is:

```text
User Action
    ↓
dispatch()
    ↓
Reducer calculates new state
    ↓
React updates state
    ↓
Component re-renders
    ↓
useEffect runs because state changed
    ↓
Perform side effect
```

### Example

```jsx
import { useEffect, useReducer } from "react";

function reducer(state, action) {
  if (action.type === "INCREMENT") {
    return state + 1;
  }

  return state;
}

export default function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);

  // Side effect
  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  return (
    <button onClick={() => dispatch({ type: "INCREMENT" })}>
      Count: {count}
    </button>
  );
}
```

## Simple separation of responsibility

```text
useReducer:
"What should the new state be?"

useEffect:
"Now that the state/UI changed, what external work should happen?"
```

### One important nuance

You don't always need `useEffect` just because you have a side effect. For example, an API call directly triggered by a button click can often be done in the event handler:

```jsx
async function handleSave() {
  const response = await saveUser();

  dispatch({
    type: "SAVE_SUCCESS",
    payload: response
  });
}
```

So the practical rule is:

> **Never put side effects inside a reducer. Use `useEffect` for side effects caused by rendering/state changes, or an event handler for side effects directly caused by a user action.**

That distinction is very important in modern React.

