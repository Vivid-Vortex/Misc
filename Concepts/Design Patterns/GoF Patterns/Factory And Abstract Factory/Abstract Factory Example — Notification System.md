# Abstract Factory Example — Notification System

## Q: How can we use Abstract Factory for a Notification System?

The easiest way to understand Abstract Factory is to think about **a family of related objects**.

Suppose our application supports:

- Email notifications
- SMS notifications

For each notification type, we need two related objects:

- `Notification`
- `NotificationFormatter`

So we have:

```text
Email
   ├── EmailNotification
   └── EmailFormatter

SMS
   ├── SmsNotification
   └── SmsFormatter
```

The important point is that the objects in each family are designed to work together.

---

## 1. Product interfaces

First, we create interfaces for the different types of products.

### Notification

```java
interface Notification {
    void send();
}
```

### NotificationFormatter

```java
interface NotificationFormatter {
    void format();
}
```

Now our Abstract Factory will be responsible for creating both products.

---

## 2. Email products

The Email family contains:

- `EmailNotification`
- `EmailFormatter`

### EmailNotification

```java
class EmailNotification implements Notification {

    public void send() {
        System.out.println("Sending Email");
    }
}
```

### EmailFormatter

```java
class EmailFormatter implements NotificationFormatter {

    public void format() {
        System.out.println("Formatting Email");
    }
}
```

So the Email family is:

```text
EmailNotification
EmailFormatter
```

---

## 3. SMS products

The SMS family contains:

- `SmsNotification`
- `SmsFormatter`

### SmsNotification

```java
class SmsNotification implements Notification {

    public void send() {
        System.out.println("Sending SMS");
    }
}
```

### SmsFormatter

```java
class SmsFormatter implements NotificationFormatter {

    public void format() {
        System.out.println("Formatting SMS");
    }
}
```

So the SMS family is:

```text
SmsNotification
SmsFormatter
```

---

# 4. Abstract Factory interface

This is the most important part.

Instead of creating only one product, our factory creates **multiple related products**.

```java
interface NotificationFactory {

    Notification createNotification();

    NotificationFormatter createFormatter();
}
```

Notice that the factory has **two creation methods**.

This is what makes this different from the simple Factory example.

---

# 5. Email Factory

The Email factory creates the complete Email family.

```java
class EmailFactory implements NotificationFactory {

    public Notification createNotification() {
        return new EmailNotification();
    }

    public NotificationFormatter createFormatter() {
        return new EmailFormatter();
    }
}
```

So:

```text
EmailFactory
     |
     +── EmailNotification
     |
     +── EmailFormatter
```

---

# 6. SMS Factory

The SMS factory creates the complete SMS family.

```java
class SmsFactory implements NotificationFactory {

    public Notification createNotification() {
        return new SmsNotification();
    }

    public NotificationFormatter createFormatter() {
        return new SmsFormatter();
    }
}
```

So:

```text
SmsFactory
     |
     +── SmsNotification
     |
     +── SmsFormatter
```

---

# 7. Abstract Factory Provider

Now we need something that can give us the appropriate factory.

```java
class NotificationFactoryProvider {

    public static NotificationFactory getFactory(String type) {

        return switch (type) {
            case "email" -> new EmailFactory();
            case "sms" -> new SmsFactory();
            default -> throw new IllegalArgumentException(
                    "Unknown notification type"
            );
        };
    }
}
```

This is the part that gives us the appropriate concrete factory.

It can be visualized as:

```text
NotificationFactoryProvider
            |
            +------------------+
            |                  |
            v                  v
      EmailFactory         SmsFactory
            |                  |
            v                  v
     Email Products       SMS Products
```

---

# 8. Client

The client doesn't directly create:

```java
new EmailNotification();
new EmailFormatter();
```

Instead, it first asks for the appropriate factory.

```java
public class Main {

    public static void main(String[] args) {

        NotificationFactory factory =
                NotificationFactoryProvider.getFactory("email");

        Notification notification =
                factory.createNotification();

        NotificationFormatter formatter =
                factory.createFormatter();

        formatter.format();
        notification.send();
    }
}
```

Output:

```text
Formatting Email
Sending Email
```

---

## SMS Client

We only need to change:

```java
"email"
```

to:

```java
"sms"
```

```java
public class Main {

    public static void main(String[] args) {

        NotificationFactory factory =
                NotificationFactoryProvider.getFactory("sms");

        Notification notification =
                factory.createNotification();

        NotificationFormatter formatter =
                factory.createFormatter();

        formatter.format();
        notification.send();
    }
}
```

Output:

```text
Formatting SMS
Sending SMS
```

---

# Complete Flow

For Email:

```text
                         Main
                           |
                           | "email"
                           ↓
             NotificationFactoryProvider
                           |
                           ↓
                    EmailFactory
                       /      \
                      /        \
                     ↓          ↓
          EmailNotification   EmailFormatter
                     |          |
                     ↓          ↓
                   send()    format()
```

For SMS:

```text
                         Main
                           |
                           | "sms"
                           ↓
             NotificationFactoryProvider
                           |
                           ↓
                     SmsFactory
                       /     \
                      /       \
                     ↓         ↓
          SmsNotification   SmsFormatter
                     |         |
                     ↓         ↓
                   send()   format()
```

---

# Why is this Abstract Factory?

Because we are not creating just one object.

The factory creates a **family of related objects**.

For Email:

```text
EmailFactory
    |
    +── EmailNotification
    +── EmailFormatter
```

For SMS:

```text
SmsFactory
    |
    +── SmsNotification
    +── SmsFormatter
```

The client can switch the entire family by changing only:

```java
NotificationFactory factory =
        NotificationFactoryProvider.getFactory("email");
```

to:

```java
NotificationFactory factory =
        NotificationFactoryProvider.getFactory("sms");
```

The client doesn't need to know which concrete classes are being created.

---

# Factory vs Abstract Factory — using Notification

### Factory

The original Notification example was:

```java
Notification notification =
        NotificationFactory.create("email");
```

Flow:

```text
Client
   ↓
Factory
   ↓
EmailNotification
```

The Factory creates **one type of product**.

---

### Abstract Factory

With Abstract Factory:

```java
NotificationFactory factory =
        NotificationFactoryProvider.getFactory("email");

Notification notification =
        factory.createNotification();

NotificationFormatter formatter =
        factory.createFormatter();
```

Flow:

```text
Client
   ↓
Abstract Factory Provider
   ↓
EmailFactory
   ↓
+-----------------------+
|                       |
↓                       ↓
EmailNotification   EmailFormatter
```

The Abstract Factory creates a **family of related products**.

---

# The easiest way to remember

```text
Factory
    ↓
Creates a product
```

```text
Abstract Factory
    ↓
Creates a factory
    ↓
Factory creates a family of related products
```

In this Notification example:

```text
NotificationFactoryProvider
            ↓
       EmailFactory
            ↓
   +------------------+
   |                  |
   ↓                  ↓
EmailNotification  EmailFormatter
```

That is why Abstract Factory is often described as a:

> "Factory of factories"

But remember that the **formal GoF definition** is:

> Abstract Factory provides an interface for creating families of related objects.

The "factory of factories" phrase is just an easy way to visualize it.

---

# Real-world interpretation

Imagine an application that supports different notification channels.

```text
                Notification System
                        |
          +-------------+-------------+
          |                           |
        Email                         SMS
          |                           |
    +-----+-----+               +-----+-----+
    |           |               |           |
Notification Formatter      Notification Formatter
```

If the application chooses `Email`, we want **all Email-related objects**.

If the application chooses `SMS`, we want **all SMS-related objects**.

The Abstract Factory guarantees that we get objects belonging to the same family.

This is the real strength of Abstract Factory.