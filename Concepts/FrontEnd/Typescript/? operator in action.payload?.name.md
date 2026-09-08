In short it's like Java's non-null check on the reference

## Q: Is `action.payload?.name` equivalent to Java's non-null check?

**You're very close, but there's an important difference.**

### 🟨 JavaScript / 🔷 TypeScript

```ts
action.payload?.name
```

is called **optional chaining**.

It means:

> "If `payload` is not `null` or `undefined`, access `name`; otherwise return `undefined`."

Conceptually:

```ts
if (action.payload != null) {
    return action.payload.name;
}

return undefined;
```

### ☕ Java

Java doesn't have an exact equivalent `?.` operator.

You might achieve similar behavior with:

```java
if (action.getPayload() != null) {
    return action.getPayload().getName();
}

return null;
```

Or with `Optional`:

```java
Optional.ofNullable(action.getPayload())
        .map(Payload::getName)
        .orElse(null);
```

But **`Optional` is not exactly the same thing** as optional chaining.

---

### The easiest way to remember

```ts
action.payload?.name
```

Think:

> **"If payload exists → get name. If not → give me undefined."**

Whereas Java:

```java
if (payload != null)
```

means:

> **"Check whether payload exists."**

So your intuition is correct: **`?.` provides the same kind of null-safe access you'd commonly implement with a Java null check**, but the syntax and exact behavior are different.

Also note that `?.` checks specifically for **`null` and `undefined`**, whereas Java's `!= null` is only concerned with Java's `null`.
