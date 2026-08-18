# Q: What is the Adapter Pattern?

**Adapter = converts one interface into another interface that the client expects.**

Think about a **mobile charger adapter**:

* Your wall socket provides one type of connection.
* Your phone charger expects another type.
* The **adapter** sits in between and makes them compatible.

In software:

```text
Client
  ↓
Expected Interface
  ↓
Adapter
  ↓
Existing/Legacy Class
```

The important point is:

> **Adapter allows two incompatible classes/interfaces to work together without changing their existing code.**

---

# Q: What problem does it solve?

Suppose our application expects this:

```java
interface PaymentProcessor {
    void pay();
}
```

But we already have an old class:

```java
class OldPaymentSystem {
    void makePayment() {
        System.out.println("Payment done");
    }
}
```

The problem is:

```text
Client expects          Existing class provides

PaymentProcessor        OldPaymentSystem
     ↓                         ↓
   pay()                  makePayment()
```

The names are different, so they cannot directly work together.

---

# Q: How does Adapter solve it?

We create an adapter:

```java
class PaymentAdapter implements PaymentProcessor {

    private OldPaymentSystem oldPaymentSystem;

    PaymentAdapter(OldPaymentSystem oldPaymentSystem) {
        this.oldPaymentSystem = oldPaymentSystem;
    }

    @Override
    public void pay() {
        oldPaymentSystem.makePayment();
    }
}
```

Now the client can use the **new interface**:

```java
public class Main {
    public static void main(String[] args) {

        OldPaymentSystem oldSystem = new OldPaymentSystem();

        PaymentProcessor processor =
                new PaymentAdapter(oldSystem);

        processor.pay();
    }
}
```

### What is happening?

```text
Main
 ↓
PaymentProcessor
 ↓
PaymentAdapter
 ↓
OldPaymentSystem
 ↓
makePayment()
```

The client doesn't care that `OldPaymentSystem` has `makePayment()`.

It simply knows:

```java
processor.pay();
```

The Adapter translates:

```text
pay()
 ↓
makePayment()
```

---

# Q: What are the main components?

There are usually **4 important participants**:

| Component   | Meaning                                       |
| ----------- | --------------------------------------------- |
| **Client**  | Code that wants to use something              |
| **Target**  | Interface expected by the client              |
| **Adaptee** | Existing class with an incompatible interface |
| **Adapter** | Converts Target calls into Adaptee calls      |

In our example:

```text
Client
  ↓
PaymentProcessor     ← Target
  ↓
PaymentAdapter       ← Adapter
  ↓
OldPaymentSystem     ← Adaptee
```

---

# Q: Why not simply modify `OldPaymentSystem`?

Because it might be:

* Legacy code
* Third-party library
* External API
* Already used by many applications
* Difficult or risky to modify

So instead of changing:

```java
OldPaymentSystem
```

we create:

```java
PaymentAdapter
```

This follows an important principle:

> **Make existing code compatible without modifying it.**

---

# Q: What is the simplest way to remember Adapter?

Remember this sentence:

> **Adapter converts an existing interface into the interface the client expects.**

Or even shorter:

```text
Adapter = Interface Translator
```

### Real-world analogy

```text
US plug
   ↓
Travel Adapter
   ↓
Indian socket
```

### Software

```text
Client interface
   ↓
Adapter
   ↓
Legacy/third-party interface
```

---

# Q: Is Adapter a wrapper?

**Yes, usually.**

The Adapter typically **wraps** an existing object:

```java
class PaymentAdapter implements PaymentProcessor {

    private OldPaymentSystem oldSystem;
}
```

So you can think:

> **Adapter is a wrapper whose main purpose is compatibility.**

This is different from some other patterns where wrapping is used mainly for adding behavior.

---

## Q: What is the key difference between Adapter and Decorator?

This is useful because they look very similar.

### Adapter

Changes the **interface**:

```text
Interface A
    ↓
 Adapter
    ↓
Interface B
```

### Decorator

Keeps the **same interface** but adds behavior:

```text
Interface
   ↓
Decorator
   ↓
Original Object
```

So:

> **Adapter → compatibility**

> **Decorator → additional behavior**

---

## Final mental model

```text
        CLIENT
           |
           | expects
           ↓
    PaymentProcessor
           |
           ↓
    PaymentAdapter
           |
           | translates
           ↓
   OldPaymentSystem
```

**Adapter GoF Pattern = "I cannot change the existing class, but I need it to work with my interface."**
