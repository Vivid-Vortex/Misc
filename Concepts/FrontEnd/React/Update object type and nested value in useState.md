Your question is understandable. A more precise question that gives the full gist when you copy it into your notes would be:

# Q: How does React update a state object and a nested object using the spread operator without directly replacing the entire state?

## A:

Consider this state:

```js
const [data, setData] = useState({
  name: "Anil",
  address: {
    city: "Delhi",
    country: "India"
  }
});
```

The current state object looks like:

```text
data
│
├── name: "Anil"
│
└── address
    ├── city: "Delhi"
    └── country: "India"
```

---

# 1. Updating a top-level property: `name`

## Your code

```js
const handleName = (val) => {
    data.name = val;

    setData({
        ...data
    });
};
```

Suppose:

```js
val = "Rahul";
```

### Step 1: Direct mutation happens

```js
data.name = val;
```

Now the existing object itself becomes:

```js
{
    name: "Rahul",
    address: {
        city: "Delhi",
        country: "India"
    }
}
```

So you have directly modified the old state object.

### Step 2: Spread creates a new outer object

```js
setData({
    ...data
});
```

This creates a new object:

```js
{
    name: "Rahul",
    address: data.address
}
```

Conceptually:

```text
Old data                     New data
┌───────────────┐           ┌───────────────┐
│ name: Rahul   │           │ name: Rahul   │
│ address ──────┼──────────▶│ address ──────┼────┐
└───────────────┘           └───────────────┘    │
                                                  ▼
                                         Same address object
                                         ┌─────────────────┐
                                         │ city: Delhi     │
                                         │ country: India  │
                                         └─────────────────┘
```

The outer object is new, so React sees:

```js
oldData !== newData
```

Therefore, React can update the state.

---

## But your approach is not recommended

This line:

```js
data.name = val;
```

directly mutates React state.

The better way is:

```js
const handleName = (val) => {
    setData({
        ...data,
        name: val
    });
};
```

### What happens here?

```js
{
    ...data,
    name: val
}
```

The object is copied first, and then `name` is replaced:

```js
{
    name: "Rahul",
    address: {
        city: "Delhi",
        country: "India"
    }
}
```

No direct mutation happens.

---

# 2. Updating a nested property: `address.city`

## Your screenshot code

Conceptually, it is:

```js
const handleCity = (city) => {
    data.address.city = city;

    setData({
        ...data,
        address: {
            ...data.address,
            city
        }
    });
};
```

Suppose:

```js
city = "Mumbai";
```

---

# What does `...data` do?

```js
...data
```

copies the first-level properties:

```js
{
    name: "Anil",
    address: sameAddressObject
}
```

Important:

> The spread operator creates only a shallow copy.

So this:

```js
const newData = {
    ...data
};
```

creates a new `data` object, but `address` still points to the same nested object.

---

# What does `...data.address` do?

```js
address: {
    ...data.address,
    city
}
```

This creates a new `address` object.

The old `address`:

```js
{
    city: "Delhi",
    country: "India"
}
```

becomes a copied object:

```js
{
    city: "Delhi",
    country: "India"
}
```

Then:

```js
city
```

replaces the old city:

```js
{
    city: "Mumbai",
    country: "India"
}
```

---

# Complete object creation

```js
setData({
    ...data,
    address: {
        ...data.address,
        city
    }
});
```

can be understood as:

```js
{
    name: data.name,
    address: {
        city: city,
        country: data.address.country
    }
}
```

So the result is:

```js
{
    name: "Anil",
    address: {
        city: "Mumbai",
        country: "India"
    }
}
```

---

# The important part: Which objects are new?

After the update:

```text
OLD STATE

data
│
├── name: "Anil"
│
└── address ───────────▶ {
                          city: "Delhi",
                          country: "India"
                         }


NEW STATE

newData
│
├── name: "Anil"
│
└── address ───────────▶ {
                          city: "Mumbai",
                          country: "India"
                         }
```

Both of these are new:

```js
newData !== oldData
```

and:

```js
newData.address !== oldData.address
```

But:

```js
newData.name === oldData.name
```

because strings are primitive values.

---

# Correct version of your code

```js
const handleName = (val) => {
    setData({
        ...data,
        name: val
    });
};

const handleCity = (city) => {
    setData({
        ...data,
        address: {
            ...data.address,
            city: city
        }
    });
};
```

You can shorten:

```js
city: city
```

to:

```js
city
```

So:

```js
const handleCity = (city) => {
    setData({
        ...data,
        address: {
            ...data.address,
            city
        }
    });
};
```

---

# Simple rule to remember

## Updating one level

```js
setData({
    ...data,
    propertyToUpdate: newValue
});
```

## Updating a nested object

```js
setData({
    ...data,
    nestedObject: {
        ...data.nestedObject,
        propertyToUpdate: newValue
    }
});
```

### In your example:

```js
data
```

is the outer object, so copy it:

```js
...data
```

Then you want to change:

```js
data.address.city
```

So copy:

```js
...data.address
```

and then replace:

```js
city
```

### Best mental model:

> **Copy every level of the object hierarchy until you reach the property you want to change. Then update only that property.**

That is why a nested update requires:

```js
{
    ...data,
    address: {
        ...data.address,
        city
    }
}
```

The most important correction in your screenshot is: **remove direct mutation like `data.name = val` and `data.address.city = city`**. Use `setData` with new objects directly.

---

## Q: So, is the property written after the spread operator inside `{}` the replacement property in the new object?

Yes, **you are right**. That is exactly the main idea.

Consider:

```js
const newObject = {
    ...oldObject,
    property: newValue
};
```

The object is processed **from top to bottom**.

### Step 1: Spread all properties

```js
...oldObject
```

Suppose:

```js
const oldObject = {
    name: "Anil",
    age: 30
};
```

After spreading:

```js
{
    name: "Anil",
    age: 30
}
```

### Step 2: The property after the spread is added or replaced

```js
{
    ...oldObject,
    name: "Rahul"
}
```

Conceptually:

```js
{
    name: "Anil", // from spread
    age: 30,      // from spread
    name: "Rahul" // written later → replaces previous name
}
```

So the final result is:

```js
{
    name: "Rahul",
    age: 30
}
```

### Rule to remember

> **If the same property exists after the spread operator, the later property value replaces the earlier property value.**

---

## In your React example

```js
setData({
    ...data,
    name: val
});
```

Here:

```js
...data
```

copies:

```js
{
    name: "Anil",
    address: {...}
}
```

Then:

```js
name: val
```

replaces:

```js
name: "Anil"
```

with:

```js
name: val
```

---

## Nested example

```js
setData({
    ...data,
    address: {
        ...data.address,
        city: city
    }
});
```

First:

```js
...data.address
```

copies:

```js
{
    city: "Delhi",
    country: "India"
}
```

Then:

```js
city: city
```

replaces the copied `city`.

Result:

```js
{
    city: "Mumbai",
    country: "India"
}
```

So yes, **the property written after the spread operator is the replacement/override property if that property already exists**. If it does not exist, it simply becomes a **new property**.

```js
{
    ...data,
    phone: "12345" // new property
}
```

### One-line mental model

> **Spread copies existing properties; properties written afterward override matching properties or add new ones.**

