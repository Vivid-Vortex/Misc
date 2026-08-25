## Q: `String str = new String("obj");` in Java — how many objects are created?

**Usually, 2 objects can be created.**

```java
String str = new String("obj");
```

### 1. String literal object: `"obj"`

The literal:

```java
"obj"
```

is stored in the **String Pool** if it does not already exist there.

### 2. New String object

This part:

```java
new String("obj")
```

creates a **new String object on the heap**.

### Visual representation

```text
String Pool:
┌─────────┐
│ "obj"   │  ← Object 1
└─────────┘

Heap:
┌─────────┐
│ "obj"   │  ← Object 2
└─────────┘
      ↑
      │
     str
```

So, if `"obj"` is being encountered for the first time:

```java
String str = new String("obj");
```

➡️ **2 String objects**

---

### Important nuance

If `"obj"` already exists in the String Pool:

```java
String str1 = "obj";

String str2 = new String("obj");
```

Then the second line creates only **1 new object**:

```text
String Pool:
"obj" ← reused

Heap:
new String("obj") ← newly created
```

So the precise answer is:

> **`new String("obj")` creates one new String object, while the literal `"obj"` may create another String object in the String Pool if it doesn't already exist. Therefore, depending on whether the literal already exists, the statement can result in 1 or 2 objects being created.**

This is why the common interview answer is **2 objects**, but the technically accurate answer is **1 or 2 depending on whether `"obj"` is already present in the String Pool**.
