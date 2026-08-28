# Cheat Sheet: React `<select>` — `value` vs `defaultValue`

## Q: Is `value` in the `<select>` tag a React property or an HTML property?

### Short answer

`value` exists in the **browser/HTML DOM**, but when used in React JSX, it is passed as a **React prop**.

<mark>**Every HTML property for that matter is passed as React prompt**</mark>

```jsx
<select value={subject}>
```

Here:

* `value` → React prop
* React connects it to the underlying `<select>` DOM element

---

# 1. `value` vs `defaultValue`

## `value`

```jsx
<select value={subject}>
```

React controls the **current value continuously**.

```text
React State
    ↓
value={subject}
    ↓
Current value of <select>
```

This makes the component a **controlled component**.

### Example

```jsx
function App() {
  const [subject, setSubject] = useState("Maths");

  return (
    <select
      value={subject}
      onChange={(event) => setSubject(event.target.value)}
    >
      <option value="Maths">Maths</option>
      <option value="Science">Science</option>
    </select>
  );
}
```

Flow:

```text
User selects Science
        ↓
onChange
        ↓
setSubject("Science")
        ↓
React state updates
        ↓
value={subject}
        ↓
<select> displays Science
```

---

## `defaultValue`

```jsx
<select defaultValue="Maths">
```

React uses it to set the **initial value only**.

```text
React
  ↓
Sets initial value
  ↓
Browser/DOM manages future changes
```

This makes the component an **uncontrolled component**.

### Example

```jsx
<select defaultValue="Maths">
  <option value="Maths">Maths</option>
  <option value="Science">Science</option>
</select>
```

Initially:

```text
Maths
```

After the user selects:

```text
Science
```

the browser/DOM manages the new value. React is not continuously controlling it.

---

# 2. The most important difference

| Prop           | What React does                         |
| -------------- | --------------------------------------- |
| `value`        | Controls the current value continuously |
| `defaultValue` | Sets the initial value only             |

### Easy memory trick

```text
value = Current value
defaultValue = Starting value
```

---

# 3. Are both used by React?

**Yes.**

Both are React props when used in JSX.

```jsx
<select value={subject}>
```

React says:

> The current value must always match `subject`.

```jsx
<select defaultValue="Maths">
```

React says:

> Initially set the value to `Maths`.

The key difference is **continuous control vs initial setup**.

---

# 4. What happens without React?

Without React, these concepts map to normal browser/HTML behavior.

## HTML option `value`

```html
<option value="Maths">Maths</option>
```

`value` is the actual value associated with that option.

## HTML initial selection

```html
<select>
  <option value="Maths" selected>Maths</option>
  <option value="Science">Science</option>
</select>
```

Here:

```html
selected
```

sets the initial selected option.

---

# 5. React vs plain HTML

| React                         | Main underlying concept                           |
| ----------------------------- | ------------------------------------------------- |
| `value={subject}`             | Current DOM value                                 |
| `defaultValue="Maths"`        | Initial/default DOM value                         |
| `defaultValue` for `<select>` | Similar purpose to initial HTML `selected` option |

---

# 6. Controlled vs uncontrolled

## Controlled

```jsx
<select
  value={subject}
  onChange={(event) => setSubject(event.target.value)}
>
```

```text
React State → React controls UI
```

Use this when React needs to know and manage the current value.

---

## Uncontrolled

```jsx
<select defaultValue="Maths">
```

```text
Initial value → Browser controls future value
```

Use this when you only need to provide the starting value.

---

# Final Summary

```text
value
→ React controls the current value continuously
→ Controlled component

defaultValue
→ React sets the initial value
→ Browser/DOM controls future changes
→ Uncontrolled component
```

### Best one-line understanding

> **`value` means React owns the current value, while `defaultValue` means React only provides the starting value.**

---

## Q: So `value` and `defaultValue` both are HTML properties only, right?

Your question is understandable. A more natural version is:

> **So, are `value` and `defaultValue` both HTML properties?**

**No. This is the important distinction:**

### `value`

`value` is a **native browser/DOM property** for elements like:

```html
<input>
<textarea>
<select>
<option>
```

Example:

```js
input.value
```

---

### `defaultValue`

`defaultValue` is also a **native DOM property** for certain form elements such as `<input>` and `<textarea>`.

However, in React:

```jsx
<input defaultValue="Deepak" />
```

React uses `defaultValue` as a prop to set the initial/default value of an uncontrolled form element.

---

## The easiest correct mental model

```text
Browser DOM properties
    ↓
value
defaultValue
    ↓
React exposes/uses them as props in JSX
```

So in React:

```jsx
<input value={name} />
```

and:

```jsx
<input defaultValue="Deepak" />
```

both `value` and `defaultValue` are **React props**.

But they are not identical:

```text
value
→ Current value

defaultValue
→ Default/initial value
```

### Final answer

> **Yes, both concepts exist in the browser DOM (or Html), and React exposes them as props in JSX. But in React, `value` is used for the current controlled value, while `defaultValue` is used for the initial/default value of an uncontrolled component.**
