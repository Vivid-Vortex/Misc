# React `useImperativeHandle` Cheat Sheet

## Question

> **Based on my conversation on `useImperativeHandle`, can you give me a Markdown cheat sheet to understand `useImperativeHandle`?**

---

# Table of Contents

- [1. What is `useImperativeHandle`?](#1-what-is-useimperativehandle)
- [2. The simplest definition](#2-the-simplest-definition)
- [3. The main problem it solves](#3-the-main-problem-it-solves)
- [4. `useRef` vs `useImperativeHandle`](#4-useref-vs-useimperativehandle)
- [5. Simple animation-style flow](#5-simple-animation-style-flow)
- [6. Complete example](#6-complete-example)
- [7. Parent and child responsibilities](#7-parent-and-child-responsibilities)
- [8. Can the child use other hooks?](#8-can-the-child-use-other-hooks)
- [9. Is it like a Java interface?](#9-is-it-like-a-java-interface)
- [10. Java comparison](#10-java-comparison)
- [11. `useImperativeHandle` syntax](#11-useimperativehandle-syntax)
- [12. Dependency array](#12-dependency-array)
- [13. What the parent can and cannot access](#13-what-the-parent-can-and-cannot-access)
- [14. When to use it](#14-when-to-use-it)
- [15. When not to use it](#15-when-not-to-use-it)
- [16. Common confusion](#16-common-confusion)
- [17. Final mental model](#17-final-mental-model)
- [18. Quick revision cheat sheet](#18-quick-revision-cheat-sheet)

---

## 1. What is `useImperativeHandle`?

`useImperativeHandle` is a React Hook that allows a child component to control **what the parent can access through a `ref`**.

Simple meaning:

> The child component decides which methods to expose to the parent.

Example:

```jsx
useImperativeHandle(ref, () => ({
  focus() {
    // focus logic
  },
  clear() {
    // clear logic
  }
}));
```

The parent can then do:

```jsx
childRef.current.focus();
childRef.current.clear();
```

---

## 2. The simplest definition

Think of `useImperativeHandle` as:

> **A controlled public API for a React component.**

The child may have many internal methods:

```text
internalMethod()
validate()
calculate()
focus()
clear()
reset()
```

But it can expose only:

```text
Parent can access:
- focus()
- clear()
```

The parent cannot directly access the other internal methods.

---

## 3. The main problem it solves

Normally, a parent communicates with a child using:

```text
props
   ↓
Parent → Child
```

Example:

```jsx
<Child isOpen={true} />
```

But sometimes the parent wants to directly trigger an action in the child:

```text
Parent
   ↓
"Child, focus your input now."
```

Then a `ref` can be used:

```jsx
childRef.current.focus();
```

`useImperativeHandle` decides what `focus()` and other exposed methods are.

---

## 4. `useRef` vs `useImperativeHandle`

### `useRef`

`useRef` commonly creates the reference:

```jsx
const childRef = useRef();
```

### `useImperativeHandle`

`useImperativeHandle` controls what that reference exposes:

```jsx
useImperativeHandle(ref, () => ({
  focus
}));
```

### Together

```text
useRef
  ↓
Creates / holds the reference

useImperativeHandle
  ↓
Controls what is exposed through that reference
```

### Important correction

Do not think:

> "`useImperativeHandle` uses `useRef` internally."

Instead think:

> "`useImperativeHandle` receives a ref and customizes what the parent gets through it."

The ref is commonly created with `useRef` in the parent.

---

## 5. Simple animation-style flow

### Frame 1: Parent creates a ref

```jsx
const childRef = useRef();
```

```text
childRef.current
      ↓
    empty
```

---

### Frame 2: Parent renders the child

```jsx
<Child ref={childRef} />
```

```text
Parent
  │
  │ ref
  ▼
Child
```

---

### Frame 3: Child receives the ref

The child receives the reference passed by the parent.

```text
Parent's ref
     │
     ▼
Child Component
```

---

### Frame 4: Child uses `useImperativeHandle`

```jsx
useImperativeHandle(ref, () => ({
  focus() {
    // do something
  }
}));
```

Now the child decides:

```text
I will expose:

focus()
```

---

### Frame 5: The parent sees the exposed API

```text
childRef.current
      │
      └── focus()
```

The parent can now call:

```jsx
childRef.current.focus();
```

---

## 6. Complete example

### Parent

```jsx
import { useRef } from "react";
import Child from "./Child";

function Parent() {
  const childRef = useRef();

  function handleClick() {
    childRef.current.sayHello();
  }

  return (
    <>
      <Child ref={childRef} />

      <button onClick={handleClick}>
        Say Hello
      </button>
    </>
  );
}
```

### Child

```jsx
import { useImperativeHandle } from "react";

function Child({ ref }) {
  useImperativeHandle(ref, () => ({
    sayHello() {
      alert("Hello!");
    }
  }));

  return <h1>I am the Child</h1>;
}

export default Child;
```

### Flow

```text
Button clicked
      ↓
Parent
      ↓
childRef.current.sayHello()
      ↓
Child's exposed method
      ↓
sayHello()
      ↓
Alert appears
```

---

## 7. Parent and child responsibilities

### Parent's responsibility

The parent commonly:

1. Creates a ref.
2. Passes the ref to the child.
3. Calls exposed methods.

```jsx
const childRef = useRef();

<Child ref={childRef} />

childRef.current.focus();
```

---

### Child's responsibility

The child:

1. Receives the ref.
2. Uses `useImperativeHandle`.
3. Decides which methods to expose.

```jsx
useImperativeHandle(ref, () => ({
  focus,
  clear
}));
```

---

## 8. Can the child use other hooks?

**Yes. Absolutely.**

`useImperativeHandle` does not prevent you from using other hooks.

You can use:

- `useState`
- `useRef`
- `useEffect`
- `useCallback`
- `useMemo`

Example:

```jsx
function Child({ ref }) {
  const [count, setCount] = useState(0);
  const inputRef = useRef();

  useEffect(() => {
    console.log("Count changed");
  }, [count]);

  useImperativeHandle(ref, () => ({
    increment() {
      setCount(c => c + 1);
    },

    focusInput() {
      inputRef.current.focus();
    }
  }));

  return (
    <>
      <input ref={inputRef} />
      <p>{count}</p>
    </>
  );
}
```

### Each hook has a different job

```text
useState
   ↓
Stores state

useRef
   ↓
Stores a persistent reference

useEffect
   ↓
Runs side effects

useImperativeHandle
   ↓
Exposes selected methods to the parent
```

So:

> You can use any other hooks inside the same component when needed.

---

## 9. Is it like a Java interface?

**Not exactly.**

There is one similarity:

> Both can describe which operations are available to another piece of code.

But they serve different purposes.

### Java interface

A Java interface defines a contract:

```java
interface Payment {
    void pay();
}
```

A class implements the contract:

```java
class CreditCardPayment implements Payment {
    public void pay() {
        System.out.println("Payment done");
    }
}
```

### `useImperativeHandle`

A React component exposes selected methods:

```jsx
useImperativeHandle(ref, () => ({
  pay() {
    // implementation
  }
}));
```

### Key difference

```text
Java interface
    ↓
Defines a language-level contract

useImperativeHandle
    ↓
Controls what a component exposes through a ref
```

---

## 10. Java comparison

The closest Java concept is actually closer to a **controlled public API**.

```java
class ChildComponent {

    private void internalMethod() {
        // hidden from outside code
    }

    public void focus() {
        // available publicly
    }

    public void clear() {
        // available publicly
    }
}
```

Similarly:

```jsx
useImperativeHandle(ref, () => ({
  focus,
  clear
}));
```

The parent gets only:

```text
focus()
clear()
```

So remember:

> `useImperativeHandle` is closer to exposing selected public methods than defining a Java interface.

---

## 11. `useImperativeHandle` syntax

Basic syntax:

```jsx
useImperativeHandle(ref, () => ({
  method1() {
    // logic
  },

  method2() {
    // logic
  }
}));
```

General structure:

```text
useImperativeHandle(
    ref,
    function that returns exposed API
)
```

Example:

```jsx
useImperativeHandle(ref, () => ({
  open,
  close,
  reset
}));
```

The parent can then use:

```jsx
ref.current.open();
ref.current.close();
ref.current.reset();
```

---

## 12. Dependency array

`useImperativeHandle` can accept dependencies:

```jsx
useImperativeHandle(
  ref,
  () => ({
    getCount() {
      return count;
    }
  }),
  [count]
);
```

Think of the dependency array similarly to other React Hooks.

If the exposed methods depend on values such as `count`, the dependencies tell React when the exposed handle needs to be recreated.

Simple mental model:

```text
Dependencies changed?
       │
       ▼
React may recreate the exposed handle
```

---

## 13. What the parent can and cannot access

Suppose the child has:

```jsx
function Child({ ref }) {
  function publicMethod() {
    console.log("Public");
  }

  function privateMethod() {
    console.log("Private");
  }

  useImperativeHandle(ref, () => ({
    publicMethod
  }));
}
```

The parent can do:

```jsx
childRef.current.publicMethod();
```

But:

```jsx
childRef.current.privateMethod();
```

is not available because it was not exposed.

### Visual model

```text
Child Internals

publicMethod()   ──────► Exposed
privateMethod()  ──────► Hidden
anotherMethod()  ──────► Hidden


Parent sees only:

childRef.current
      │
      └── publicMethod()
```

---

## 14. When to use it

Use `useImperativeHandle` when a parent genuinely needs to trigger an action in a child.

Common examples:

### Focus an input

```text
Parent
   ↓
Child input should focus
```

### Clear a form

```text
Parent
   ↓
Child form clears itself
```

### Reset a complex component

```text
Parent
   ↓
Child resets internal state
```

### Control third-party UI or DOM APIs

```text
Parent
   ↓
Child exposes a small API
```

---

## 15. When not to use it

Do not use `useImperativeHandle` just because it is available.

For normal UI data flow, prefer:

```text
Parent
   ↓ props
Child
```

Example:

```jsx
<Child isOpen={true} />
```

Instead of:

```jsx
childRef.current.open();
```

when the state can naturally be controlled declaratively.

### Rule of thumb

```text
Normal data/state flow?
      ↓
Use props and state

Parent must directly trigger a child action?
      ↓
Consider ref + useImperativeHandle
```

---

## 16. Common confusion

### Confusion 1: "`useImperativeHandle` creates a ref."

❌ Not exactly.

The ref is commonly created using:

```jsx
const ref = useRef();
```

`useImperativeHandle` customizes what is exposed through the ref.

---

### Confusion 2: "The child must only use `useRef`."

❌ No.

The child can use other hooks:

```jsx
useState();
useEffect();
useRef();
useMemo();
useCallback();
useImperativeHandle();
```

They can all exist in the same component.

---

### Confusion 3: "It is basically a Java interface."

❌ Not technically.

Better comparison:

```text
Java Interface
    = Contract

useImperativeHandle
    = Controlled component API
```

---

### Confusion 4: "The parent can access everything inside the child."

❌ No.

The child decides what to expose.

```jsx
useImperativeHandle(ref, () => ({
  onlyThisMethod
}));
```

The parent sees only:

```text
onlyThisMethod()
```

---

## 17. Final mental model

Remember this complete flow:

```text
1. Parent creates a ref
        ↓
   useRef()

2. Parent passes ref to Child
        ↓
   <Child ref={childRef} />

3. Child uses other hooks if needed
        ↓
   useState()
   useEffect()
   useRef()
   etc.

4. Child uses useImperativeHandle
        ↓
   Decides what to expose

5. Parent calls exposed methods
        ↓
   childRef.current.method()
```

### One-line memory trick

> **`useRef` gives the parent a reference; `useImperativeHandle` lets the child control what the parent can do through that reference.**

---

## 18. Quick revision cheat sheet

```text
What is useImperativeHandle?
→ A Hook for exposing selected methods through a ref.

Does it create a ref?
→ No.

Where is the ref commonly created?
→ In the parent using useRef.

What does the child do?
→ Receives the ref and customizes it.

Can the child use other hooks?
→ Yes.

Can it use useState?
→ Yes.

Can it use useEffect?
→ Yes.

Can it use useRef internally?
→ Yes.

Is it the same as a Java interface?
→ No.

Closest Java concept?
→ Controlled public API / exposing public methods.

Main purpose?
→ Let the parent call selected imperative methods on the child.

Normal React communication?
→ Props and state.

When should useImperativeHandle be considered?
→ When a parent genuinely needs to directly trigger a child action.
```

---

# Final Summary

```text
Parent
  │
  │ useRef()
  ▼
Creates a ref
  │
  │ ref={childRef}
  ▼
Child
  │
  ├── useState()      → optional state
  ├── useEffect()     → optional side effects
  ├── useRef()        → optional internal references
  │
  ▼
useImperativeHandle()
  │
  ▼
Expose selected methods
  │
  ▼
Parent calls:

childRef.current.method()
```

## Best mental model

> **`useRef` creates/holds the connection. `useImperativeHandle` controls what functionality travels through that connection.**
