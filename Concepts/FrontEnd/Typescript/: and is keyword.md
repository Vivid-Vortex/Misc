## Question: Why are we using `is` here? Could we use `:` instead?

You're right on spot. The key difference is that **`:` and `is` serve completely different purposes in TypeScript**.

In your example:

```ts
function isChaiOrder(obj: any): obj is ChaiOrder {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.type === "string" &&
        typeof obj.sugar === "number"
    );
}
```

### Q: What does `:` mean?

`:` is used to specify the **return type of a function**.

For example:

```ts
function isChaiOrder(obj: any): boolean {
    return true;
}
```

This simply tells TypeScript:

> "This function returns a boolean."

So this is perfectly valid.

---

### Q: Then what does `is` mean?

This:

```ts
obj is ChaiOrder
```

is called a **type predicate**.

It tells TypeScript:

> "If this function returns `true`, you can treat `obj` as a `ChaiOrder`."

For example:

```ts
function isChaiOrder(obj: any): obj is ChaiOrder {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.type === "string" &&
        typeof obj.sugar === "number"
    );
}
```

Now TypeScript understands this:

```ts
const data: any = getData();

if (isChaiOrder(data)) {
    console.log(data.type);
    console.log(data.sugar);
}
```

Inside the `if`, TypeScript knows:

```text
data → ChaiOrder
```

---

## Q: What happens if I use `:` instead?

You could write:

```ts
function isChaiOrder(obj: any): boolean {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.type === "string" &&
        typeof obj.sugar === "number"
    );
}
```

But now TypeScript only knows:

```text
isChaiOrder() → boolean
```

It **doesn't know that `true` means `obj` is a `ChaiOrder`**.

That's the important difference.

### Compare

**With `:`**

```ts
function isChaiOrder(obj: any): boolean
```

Meaning:

> "I return true or false."

**With `is`**

```ts
function isChaiOrder(obj: any): obj is ChaiOrder
```

Meaning:

> "I return true or false, AND when I return true, `obj` is a `ChaiOrder`."

---

### The easiest way to remember

Think of it like this:

```text
: boolean
    ↓
What does the function return?

is ChaiOrder
    ↓
What does the parameter become if the function returns true?
```

So `is` is **not an alternative syntax for `:`**.

They answer different questions:

```ts
function isChaiOrder(obj: any): boolean
                              ↑
                         return type
```

versus:

```ts
function isChaiOrder(obj: any): obj is ChaiOrder
                                   ↑
                              type predicate
```

### Interview takeaway

> **`:` specifies a function's return type, while `is` creates a TypeScript type predicate that enables type narrowing after the function returns `true`.**

This pattern is particularly useful when creating **custom type guards**.
