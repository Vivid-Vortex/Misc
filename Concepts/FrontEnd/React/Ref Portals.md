# Question: What is Portal in React, in simple terms?

Your question is right on spot. The correct term is **React Portal**.

## Simple definition

A **React Portal** lets you render a React component somewhere else in the HTML DOM, even though it logically belongs to its current React component.

### Think of it like this

Normally:

```text
App
 └── Modal
      └── HTML appears inside App's DOM element
```

With a Portal:

```text
React Component Tree

App
 └── Modal
       │
       └── React Portal
             ↓
HTML appears somewhere else in the DOM
```

For example:

```html
<body>
    <div id="root"></div>

    <div id="portal-root"></div>
</body>
```

A modal component can be logically inside `App`:

```jsx
function App() {
  return (
    <>
      <h1>My App</h1>
      <Modal />
    </>
  );
}
```

But using a Portal, the modal can appear here:

```html
<div id="portal-root">
    <!-- Modal appears here -->
</div>
```

instead of inside:

```html
<div id="root">
    <!-- Normal App content -->
</div>
```

## Simplest example

```jsx
import { createPortal } from "react-dom";

function Modal() {
  return createPortal(
    <div>
      I am a modal!
    </div>,
    document.getElementById("portal-root")
  );
}
```

## Why do we need it?

Imagine this structure:

```text
Parent
 └── Container
      └── Modal
```

The container might have:

```css
overflow: hidden;
```

or other styling restrictions.

Then the modal may get **clipped or appear behind other elements**.

A Portal allows this:

```text
React hierarchy:
App
 └── Container
      └── Modal

Actual HTML position:
<body>
 ├── root
 │    └── Container
 │
 └── portal-root
      └── Modal
```

## Common use cases

* **Modals**
* **Popups**
* **Dialogs**
* **Tooltips**
* **Dropdowns**
* **Notifications**

## One-line comparison

| Normal rendering                              | Portal                                           |
| --------------------------------------------- | ------------------------------------------------ |
| Renders inside the parent DOM element         | Renders in another DOM location                  |
| Can be affected by parent layout restrictions | Can escape those restrictions                    |
| Normal component structure                    | Component stays logically in the same React tree |

### The most important thing to remember

> **React Portal changes where the HTML is placed in the DOM, but the component still belongs to the same React component tree.**

For example, if a `Modal` receives props or uses Context from `App`, that still works normally.

## Java analogy

Think of it somewhat like this:

```text
Java relationship:
Child object belongs to Parent

UI location:
Child's output is displayed somewhere else
```

The **logical ownership remains the same**, but the **rendering location changes**.

### Super-short memory trick

> **Portal = Same React component, different HTML location.**
