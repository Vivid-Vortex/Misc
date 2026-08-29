# Q: What are Factory and Abstract Factory design patterns in Java?

The easiest way to understand them is:

* **Factory** → creates **one type/family of objects** without exposing the creation logic.
* **Abstract Factory** → creates **multiple related objects that belong together**.

Think of a **car manufacturing company**.

---

# 1. Factory Pattern

### Simple idea

Suppose your application needs different types of notifications:

```text
EmailNotification
SmsNotification
PushNotification
```

Instead of doing this everywhere:

```java
Notification notification;

if (type.equals("email")) {
    notification = new EmailNotification();
} else if (type.equals("sms")) {
    notification = new SmsNotification();
}
```

we move the object-creation logic into a **Factory**.

### Step 1: Common interface

```java
interface Notification {
    void send();
}
```

### Step 2: Implementations

```java
class EmailNotification implements Notification {

    public void send() {
        System.out.println("Sending Email");
    }
}

class SmsNotification implements Notification {

    public void send() {
        System.out.println("Sending SMS");
    }
}

class PushNotification implements Notification {

    public void send() {
        System.out.println("Sending Push Notification");
    }
}
```

### Step 3: Factory

Instead of `if-else`, we can use a **switch**:

```java
class NotificationFactory {

    public static Notification create(String type) {

        return switch (type) {
            case "email" -> new EmailNotification();
            case "sms" -> new SmsNotification();
            case "push" -> new PushNotification();
            default -> throw new IllegalArgumentException("Unknown type");
        };
    }
}
```

### Step 4: Client

```java
Notification notification =
        NotificationFactory.create("email");

notification.send();
```

The client doesn't need to know:

```java
new EmailNotification();
```

It simply says:

> "Factory, give me an Email notification."

---

# Why use Factory?

The main benefit is **centralizing object creation**.

Without Factory:

```text
Client
  |
  +-- new EmailNotification()
  +-- new SmsNotification()
  +-- new PushNotification()
```

With Factory:

```text
Client
  |
  v
Factory
  |
  +-- EmailNotification
  +-- SmsNotification
  +-- PushNotification
```

So if the creation logic becomes complicated, you don't have that logic scattered across your application.

---

> **Abstract Factory = a factory that gives you the appropriate factory.**

More precisely, the GoF definition is **“an interface for creating families of related objects”**, but **“factory of factories”** is a very good way to visualize how it works.

For the Abstract Factory Version of Notification system, please check [Notification System as Abstract Factory](https://github.com/Vivid-Vortex/Misc/blob/2a0d1fff88535aa11d789b26a836c47348b1ed4c/Concepts/Design%20Patterns/GoF%20Patterns/Abstract%20Factory%20Example%20%E2%80%94%20Notification%20System.md)
---

# 2. Abstract Factory

## Q: Is Abstract Factory a Factory of Factory?

**Yes, conceptually.** Let's use a very simple example.

For Factory Pattern example of Db Connection, please check [DB Connection as Factory pattern](https://github.com/Vivid-Vortex/Misc/blob/e83ac68310383055b11e0e20936004b7056ed582/Concepts/Design%20Patterns/GoF%20Patterns/Factory%20And%20Abstract%20Factory/Factory%20Pattern%20Example%20%E2%80%94%20Database%20Connection.md)

Suppose we have two types of databases:

```text
MySQL
PostgreSQL
```

And for each database, we need one thing:

```text
Connection
```

So:

```text
MySQLFactory
   ├── creates MySQLConnection
 

PostgresFactory
   ├── creates PostgresConnection

```

The **Abstract Factory** will decide which factory we need.

---

## 1. Product interfaces

```java
interface Connection {
    void connect();
}
```

---

## 2. MySQL products

- <mark>Simple Rule you remember for naming: Whereever You implement any interface to any concrete class. You append part or subpart of the interface name to that class Name as shwon below.</mark>
  
```java
class MySQLConnection implements Connection {

    public void connect() {
        System.out.println("Connecting to MySQL");
    }
}
```

---

- <mark>Simple Rule you remember for naming: Whereever You implement any interface to any concrete class. You append part or subpart of the interface name to that class Name as shwon below.</mark>

## 3. PostgreSQL products

```java
class PostgresConnection implements Connection {

    public void connect() {
        System.out.println("Connecting to PostgreSQL");
    }
}
```

---

# 4. Factory interface

This is the important part.

We create a **factory interface**:

```java
interface DatabaseFactory {

    Connection createConnection();
}
```

---

# 5. MySQL Factory

- <mark>Simple Rule you remember for naming: Whereever You implement any interface to any concrete class. You append part or subpart of the interface name to that class Name as shwon below.</mark>

```java
class MySQLFactory implements DatabaseFactory {

    public Connection createConnection() {
        return new MySQLConnection();
    }
}
```

---

- <mark>Simple Rule you remember for naming: Whereever You implement any interface to any concrete class. You append part or subpart of the interface name to that class Name as shwon below.</mark>

# 6. PostgreSQL Factory

```java
class PostgresFactory implements DatabaseFactory {

    public Connection createConnection() {
        return new PostgresConnection();
    }
}
```

So now we have:

```text
DatabaseFactory
       |
       +-------------------+
       |                   |
       v                   v
MySQLFactory        PostgresFactory
       |                   |
       v                   v
MySQL objects       Postgres objects
```

---

# 7. Now comes the Abstract Factory

We need something that can **give us the appropriate factory**.

```java
class DatabaseFactoryProvider {

    public static DatabaseFactory getFactory(String database) {

        return switch (database) {
            case "mysql" -> new MySQLFactory();
            case "postgres" -> new PostgresFactory();
            default -> throw new IllegalArgumentException(
                    "Unknown database"
            );
        };
    }
}
```

This is our **factory of factories**.

---

# 8. Client

- The client simply chooses the database and lets the factory chain create the correct `Connection`.

## MySQL client

```java
public class Main {

    public static void main(String[] args) {

        DatabaseFactory factory =
                DatabaseFactoryProvider.getFactory("mysql");

        Connection connection =
                factory.createConnection();

        connection.connect();
    }
}
```

Output:

```text
Connecting to MySQL
```

## PostgreSQL client

Just change `"mysql"` to `"postgres"`:

```java
public class Main {

    public static void main(String[] args) {

        DatabaseFactory factory =
                DatabaseFactoryProvider.getFactory("postgres");

        Connection connection =
                factory.createConnection();

        connection.connect();
    }
}
```

Output:

```text
Connecting to PostgreSQL
```

### Complete flow

```text
                    Main
                     |
                     | "mysql"
                     ↓
          DatabaseFactoryProvider
                     |
                     ↓
              MySQLFactory
                     |
                     ↓
            MySQLConnection
                     |
                     ↓
                  connect()
```

For PostgreSQL:

```text
                    Main
                     |
                     | "postgres"
                     ↓
          DatabaseFactoryProvider
                     |
                     ↓
             PostgresFactory
                     |
                     ↓
           PostgresConnection
                     |
                     ↓
                  connect()
```

So the **client (`Main`) never directly does**:

```java
new MySQLConnection();
```

or

```java
new PostgresConnection();
```

It only knows about the abstractions:

```java
ConnectionFactory
Connection
```

That's the key benefit of the pattern.

That's exactly why people often explain Abstract Factory as:

> **Factory of factories.**

---

## Factory vs Abstract Factory — very simply

### Factory

You directly ask for the **product**:

```java
Notification notification =
        NotificationFactory.create("email");
```

```text
Client
  ↓
Factory
  ↓
Product
```

### Abstract Factory

You first ask for the **factory**, then ask that factory for products:

```java
DatabaseFactory factory =
        DatabaseFactoryProvider.getFactory("mysql");

Connection connection =
        factory.createConnection();

```

```text
Client
  ↓
Abstract Factory
  ↓
MySQL Factory
  ↓
MySQL Products
```

### The easiest interview definition

> **Factory:** Factory creates objects.

> **Abstract Factory:** Abstract Factory gives you a factory, and that factory creates a **family of related objects**.

One small correction to the terminology: **“factory of factories” is an excellent intuition, but not the formal definition of Abstract Factory.** The formal GoF concept is about creating **related product families**.
