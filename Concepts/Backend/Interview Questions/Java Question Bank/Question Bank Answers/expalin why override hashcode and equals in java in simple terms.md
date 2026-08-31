## Q: Explain why we override `hashCode()` and `equals()` in Java in simple terms

You're right on spot. Let's understand this with **one very simple example** and then build up to `HashMap`/`HashSet`.

### 1. First, the simple idea

Suppose we have two `Customer` objects:

```java
Customer c1 = new Customer(101, "Deepak");
Customer c2 = new Customer(101, "Deepak");
```

They contain exactly the same data.

You might think:

> "These are the same customer."

But Java initially thinks:

> "These are two different objects."

Why?

Because the default `equals()` from `Object` essentially compares **object references**.

```java
c1.equals(c2); // false
```

Even though:

```text
c1 → Customer(101, "Deepak")
c2 → Customer(101, "Deepak")
```

They are two different objects in memory.

---

# 2. What does `equals()` do?

`equals()` answers:

> **"Are these two objects logically the same?"**

For example, we may decide that two customers are the same if their `id` is the same.

```java
@Override
public boolean equals(Object obj) {
    Customer other = (Customer) obj;
    return this.id == other.id;
}
```

Now:

```java
c1.equals(c2); // true
```

because both have:

```text
id = 101
```

So:

```text
equals()
   ↓
"Are these objects logically equal?"
```

---

# 3. Then why do we need `hashCode()`?

This is where `HashSet` and `HashMap` come in.

Imagine:

```java
Set<Customer> customers = new HashSet<>();

customers.add(c1);
customers.add(c2);
```

We want:

```text
Customer 101
Customer 101
```

to appear only **once**.

`HashSet` uses **both** `hashCode()` and `equals()` to determine duplicates.

Think of it like this:

```text
             HashSet
                |
                ↓
          hashCode()
                |
        Which bucket?
                |
                ↓
           equals()
                |
        Is it actually
          the same?
```

---

# 4. Very simple analogy

Imagine a hotel has 100 rooms.

`hashCode()` tells you:

> "Which room should I check?"

`equals()` tells you:

> "Is this actually the same person?"

So:

```text
hashCode() → Find the area/bucket quickly
equals()   → Confirm equality
```

---

# 5. Why must we override BOTH?

This is the most important part.

Suppose we override only `equals()`:

```java
@Override
public boolean equals(Object obj) {
    Customer other = (Customer) obj;
    return this.id == other.id;
}
```

But we don't override `hashCode()`.

Java's default `hashCode()` may produce different values:

```text
c1.hashCode() → 12345
c2.hashCode() → 67890
```

Even though:

```java
c1.equals(c2) → true
```

Now `HashSet` may put them into different buckets:

```text
hashCode 12345
     ↓
   Bucket 1
     ↓
     c1


hashCode 67890
     ↓
   Bucket 2
     ↓
     c2
```

So the `HashSet` doesn't even compare them with `equals()` because they landed in different buckets.

You can therefore end up with **duplicates**.

---

# 6. The golden rule

Java has a very important contract:

> **If two objects are equal according to `equals()`, they MUST have the same `hashCode()`.**

Therefore:

```text
equals() == true
       ↓
hashCode() MUST be same
```

But the reverse is **not required**:

```text
hashCode() same
       ↓
does NOT necessarily mean
equals() == true
```

Why?

Because different objects can have the same hash code. That's called a **hash collision**.

---

# 7. Complete simple example

Let's say a customer is identified by `id`.

```java
class Customer {

    private int id;
    private String name;

    public Customer(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {
        Customer other = (Customer) obj;
        return this.id == other.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}
```

Now:

```java
Customer c1 = new Customer(101, "Deepak");
Customer c2 = new Customer(101, "Deepak");

System.out.println(c1.equals(c2));
```

Output:

```text
true
```

And:

```java
System.out.println(c1.hashCode() == c2.hashCode());
```

Output:

```text
true
```

So `HashSet` can correctly identify them as duplicates:

```java
Set<Customer> set = new HashSet<>();

set.add(c1);
set.add(c2);

System.out.println(set.size());
```

Output:

```text
1
```

---

# 8. What happens internally?

When you do:

```java
set.add(c2);
```

Conceptually:

```text
             c2
              |
              ↓
         hashCode()
              |
              ↓
        Find bucket
              |
              ↓
     Is there something
       in this bucket?
              |
          YES ↓
              |
              ↓
          equals()
              |
              ↓
            true
              |
              ↓
        Don't add c2
```

That's why both methods matter.

---

# 9. What about `HashMap`?

Same concept.

Consider:

```java
Map<Customer, String> map = new HashMap<>();

map.put(c1, "Customer Data");
```

Later:

```java
map.get(c2);
```

Even though `c2` is a different object, we want Java to find the value because:

```java
c1.equals(c2) == true
```

`HashMap` uses:

```text
c2.hashCode()
      ↓
find bucket
      ↓
equals()
      ↓
find c1
      ↓
return "Customer Data"
```

Without correctly implementing `hashCode()` and `equals()`, this lookup can fail.

---

# 10. Where do we commonly need this?

Whenever objects are used with hash-based collections:

### `HashSet`

```java
Set<Customer>
```

Used to detect duplicates.

### `HashMap`

```java
Map<Customer, String>
```

Used to find values using an object as a key.

### `HashMap` keys

```java
Map<Customer, Order>
```

`Customer` needs proper `equals()` and `hashCode()` if logical equality is based on customer data.

---

# 11. One important interview question

### Q: If I override `equals()`, should I always override `hashCode()`?

**Yes.**

If:

```java
a.equals(b) == true
```

then:

```java
a.hashCode() == b.hashCode()
```

must also be true.

But:

```java
a.hashCode() == b.hashCode()
```

does **not** guarantee:

```java
a.equals(b) == true
```

---

## Remember this one line

> **`equals()` decides whether two objects are logically equal; `hashCode()` helps `HashMap`/`HashSet` find those objects efficiently.**

And the relationship is:

```text
             equals()
                ↑
                |
       "Are they the same?"
                |
                ↓
        hashCode() must
          also match
```

### The practical rule

```java
@Override
public boolean equals(Object obj) {
    // compare important fields
}

@Override
public int hashCode() {
    // use the same important fields
}
```

**Use the same fields in both methods.** If `id` determines equality, use `id` in both `equals()` and `hashCode()`.
