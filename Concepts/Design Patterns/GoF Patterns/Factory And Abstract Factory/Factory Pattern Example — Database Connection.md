# Factory Pattern Example — Database Connection

## Q: How can we use the Factory Pattern to create Database Connections?

Suppose our application supports multiple databases:

```text
MySQL
PostgreSQL
Oracle
```

Without a Factory, the client would need to know which concrete connection class to create:

```java
Connection connection;

if (database.equals("mysql")) {
    connection = new MySQLConnection();
} else if (database.equals("postgres")) {
    connection = new PostgresConnection();
} else if (database.equals("oracle")) {
    connection = new OracleConnection();
}
```

The problem is that the **object creation logic is inside the client**.

We can move this logic into a Factory.

---

## 1. Common Interface

First, create a common interface for all database connections.

```java
interface Connection {

    void connect();
}
```

The client will work with `Connection` instead of knowing the concrete implementation.

---

## 2. Concrete Connection Classes

### MySQL Connection

```java
class MySQLConnection implements Connection {

    public void connect() {
        System.out.println("Connecting to MySQL");
    }
}
```

### PostgreSQL Connection

```java
class PostgresConnection implements Connection {

    public void connect() {
        System.out.println("Connecting to PostgreSQL");
    }
}
```

### Oracle Connection

```java
class OracleConnection implements Connection {

    public void connect() {
        System.out.println("Connecting to Oracle");
    }
}
```

So we have:

```text
                 Connection
                     |
          +----------+----------+
          |          |          |
          ↓          ↓          ↓
      MySQL       Postgres     Oracle
    Connection   Connection   Connection
```

---

## 3. Database Connection Factory

Now we move the object-creation logic into a Factory.

```java
class ConnectionFactory {

    public static Connection create(String database) {

        return switch (database) {
            case "mysql" -> new MySQLConnection();
            case "postgres" -> new PostgresConnection();
            case "oracle" -> new OracleConnection();
            default -> throw new IllegalArgumentException(
                    "Unknown database"
            );
        };
    }
}
```

The Factory is responsible for deciding **which concrete Connection object should be created**.

---

## 4. Client

The client no longer needs to know about:

```java
new MySQLConnection();
new PostgresConnection();
new OracleConnection();
```

It simply asks the Factory for a `Connection`.

```java
public class Main {

    public static void main(String[] args) {

        Connection connection =
                ConnectionFactory.create("mysql");

        connection.connect();
    }
}
```

Output:

```text
Connecting to MySQL
```

---

## PostgreSQL

We only need to change:

```java
"mysql"
```

to:

```java
"postgres"
```

```java
Connection connection =
        ConnectionFactory.create("postgres");

connection.connect();
```

Output:

```text
Connecting to PostgreSQL
```

---

## Oracle

Similarly:

```java
Connection connection =
        ConnectionFactory.create("oracle");

connection.connect();
```

Output:

```text
Connecting to Oracle
```

---

# Complete Flow

For MySQL:

```text
                    Main
                      |
                      | "mysql"
                      ↓
              ConnectionFactory
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
              ConnectionFactory
                      |
                      ↓
             PostgresConnection
                      |
                      ↓
                  connect()
```

For Oracle:

```text
                    Main
                      |
                      | "oracle"
                      ↓
              ConnectionFactory
                      |
                      ↓
              OracleConnection
                      |
                      ↓
                  connect()
```

---

# Why is this Factory Pattern?

The important thing to notice is that there is **only one type of product**:

```text
Connection
```

We have multiple implementations:

```text
MySQLConnection
PostgresConnection
OracleConnection
```

But the Factory directly creates the required product:

```text
Client
   ↓
ConnectionFactory
   ↓
Connection
```

The client does **not** first ask for another factory.

It simply says:

```java
ConnectionFactory.create("mysql");
```

and gets:

```text
MySQLConnection
```

---

# Factory vs Abstract Factory

This example is useful for comparing it with the Database Abstract Factory example later in this document.

### Factory

```text
Client
   ↓
ConnectionFactory
   ↓
MySQLConnection
```

The Factory directly creates the product.

Example:

```java
Connection connection =
        ConnectionFactory.create("mysql");
```

---

### Abstract Factory

In Abstract Factory, the client first gets a factory:

```text
Client
   ↓
DatabaseFactoryProvider
   ↓
MySQLFactory
   ↓
MySQLConnection
```

Example:

```java
DatabaseFactory factory =
        DatabaseFactoryProvider.getFactory("mysql");

Connection connection =
        factory.createConnection();
```

So the key difference is:

```text
Factory
    ↓
creates Product
```

while:

```text
Abstract Factory
    ↓
provides Concrete Factory
    ↓
Concrete Factory creates Product(s)
```

---

# The easiest way to remember

### Factory

> **Give me the product.**

```java
ConnectionFactory.create("mysql");
```

### Abstract Factory

> **Give me the factory that belongs to this family.**

```java
DatabaseFactoryProvider.getFactory("mysql");
```

Then:

```java
factory.createConnection();
```

The Database Factory example therefore makes a good follow-up to this simpler Factory example because you can see the extra level of abstraction clearly.