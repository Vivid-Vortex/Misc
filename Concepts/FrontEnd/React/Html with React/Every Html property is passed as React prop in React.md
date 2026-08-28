## Q: Is this statement correct: “Every HTML property for that matter is passed as a React prop”?

Your statement is **mostly correct**, but I would reframe it slightly:

> **Most HTML attributes/properties in JSX are passed to React as props.**

Example:

```jsx
<input
  type="text"
  value={name}
  disabled={true}
  placeholder="Enter name"
/>
```

Here, from React's perspective:

```text
type
value
disabled
placeholder
```

are all **props of the React `<input>` element**.

React then uses these props to create/update the underlying browser DOM element.

```text
React Props
    ↓
React
    ↓
Browser DOM properties/attributes
    ↓
Actual HTML element
```

### But be careful with the wording

It is **not always correct to say “every HTML property.”** React has some differences and special handling:

```jsx
className   // instead of HTML class
htmlFor     // instead of HTML for
defaultValue
defaultChecked
```

Also, some React props don't directly correspond to normal HTML attributes:

```jsx
onClick
onChange
key
ref
```

For example:

```jsx
<button onClick={handleClick}>
```

`onClick` is a React prop, but React handles it through its event system.

## Best statement to remember

> **In JSX, values written on an element are generally passed to React as props. For built-in HTML elements, React uses those props to configure and update the underlying DOM element.**

So your mental model is **correct**, just remember that **not every React prop is a direct HTML property/attribute**.

Also, tiny typo: **“React prompt” → “React prop.”**
