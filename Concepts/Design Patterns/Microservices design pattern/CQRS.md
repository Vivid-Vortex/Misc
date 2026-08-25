# CQRS Microservices Pattern

## Table of Contents

* [1. What is CQRS?](#1-what-is-cqrs)
* [2. The Basic Idea](#2-the-basic-idea)
* [3. Command Side vs Query Side](#3-command-side-vs-query-side)
* [4. How Data Sync Happens Between Write and Read Databases](#4-how-data-sync-happens-between-write-and-read-databases)
* [5. How the Event Is Published](#5-how-the-event-is-published)
* [6. Complete CQRS Flow](#6-complete-cqrs-flow)
* [7. Simple Order Example](#7-simple-order-example)
* [8. Eventual Consistency](#8-eventual-consistency)
* [9. Common Technologies](#9-common-technologies)
* [10. Advantages](#10-advantages)
* [11. Disadvantages](#11-disadvantages)
* [12. When to Use CQRS](#12-when-to-use-cqrs)
* [13. My Questions and Answers](#13-my-questions-and-answers)
* [14. One-Minute Summary](#14-one-minute-summary)

---

# 1. What is CQRS?

**CQRS** stands for:

> **Command Query Responsibility Segregation**

In Summary:

In CQRS, <mark>we separate read and write operations.</mark> Read operations are usually more frequent and need to be fast, while write operations focus more on data validation and consistency. The Write Side publishes events through a message broker or event-streaming platform like Kafka, and the Read Side consumes those events to update its own database.
In simple terms:

> **Separate the code responsible for changing data from the code responsible for reading data.**

Instead of using one model for both reading and writing:

```text
Client
   |
   v
Application
   |
   v
Single Database
```

CQRS separates them:

```text
              +----------------+
Write Request |   Write Side   |
------------> |   Commands     |
              +----------------+
                      |
                      v
                   Write DB


              +----------------+
Read Request  |    Read Side   |
------------> |    Queries     |
              +----------------+
                      |
                      v
                   Read DB
```

---

# 2. The Basic Idea

There are two types of operations.

## Command

A **Command changes data**.

Examples:

```text
Create Order
Update User
Delete Product
Change Password
```

Commands usually go to the **Write Side**.

## Query

A **Query reads data**.

Examples:

```text
Get Order
Get User
Get Product List
Search Products
```

Queries usually go to the **Read Side**.

### Simple rule

```text
Command = Change data
Query   = Read data
```

---

# 3. Command Side vs Query Side

| Write Side                        | Read Side                        |
| --------------------------------- | -------------------------------- |
| Handles Commands                  | Handles Queries                  |
| Changes data                      | Reads data                       |
| Write DB                          | Read DB                          |
| Usually optimized for correctness | Usually optimized for fast reads |
| Example: Create Order             | Example: Get Order               |

Example:

```text
User clicks "Place Order"
        |
        v
     Command
        |
        v
   Write Service
        |
        v
     Write DB
```

Later:

```text
User opens Order History
        |
        v
      Query
        |
        v
    Read Service
        |
        v
      Read DB
```

---

# 4. How Data Sync Happens Between Write and Read Databases

This is the most important part of CQRS.

## Simple answer

> **The Write Side publishes an event after data changes. The Read Side consumes that event and updates the Read Database.**

The flow is:

```text
1. User sends a Command
        |
        v
2. Write Service processes it
        |
        v
3. Write DB is updated
        |
        v
4. Event is published
        |
        v
5. Read Service consumes the event
        |
        v
6. Read DB is updated
```

Architecture:

```text
Write Service
     |
     v
  Write DB
     |
     | Data changed
     v
Event Streaming / Message Service
     |
     v
 Read Service
     |
     v
  Read DB
```

### Important

The databases usually do **not directly communicate with each other**.

This is usually **not** the design:

```text
Write DB <------> Read DB
```

Instead:

```text
Write Side
    |
    | Publish Event
    v
Kafka / Event Stream
    |
    | Consume Event
    v
Read Side
```

---

# 5. How the Event Is Published

The Write Side can publish events through an **event-streaming or messaging service**.

Examples:

```text
Apache Kafka
RabbitMQ
AWS SNS/SQS
Google Pub/Sub
Azure Service Bus
```

A common example is:

```text
Write DB updated
       |
       v
OrderCreatedEvent
       |
       v
Kafka Topic
       |
       v
Read Service consumes event
       |
       v
Read DB updated
```

## Example event

```java
public record OrderCreatedEvent(
    Long orderId,
    String customerName
) {
}
```

The Write Side publishes it:

```java
eventPublisher.publish(
    new OrderCreatedEvent(1L, "Deepak")
);
```

The Read Side consumes it:

```java
public void handle(OrderCreatedEvent event) {
    // Update Read Database
}
```

---

# 6. Complete CQRS Flow

```text
                 WRITE SIDE

Client
  |
  | CreateOrderCommand
  v
Order Command Service
  |
  | Validate + Business Logic
  v
Write Database
  |
  | Order successfully created
  v
OrderCreatedEvent
  |
  v
Kafka
  |
  | Event consumed
  v
Order Read Service
  |
  v
Read Database


                  READ SIDE

Client
  |
  | GetOrderQuery
  v
Order Query Service
  |
  v
Read Database
  |
  v
Order Response
```

---

# 7. Simple Order Example

Suppose a user creates an order.

## Step 1: Command arrives

```text
CreateOrderCommand
```

Example:

```text
Create Order:
Customer: Deepak
Product: Laptop
```

## Step 2: Write Side processes it

```text
CreateOrderCommand
        |
        v
Order Command Service
        |
        v
Business Validation
        |
        v
Write DB
```

The order is stored:

```text
Write DB

Order
----------------
ID: 100
Customer: Deepak
Product: Laptop
Status: CREATED
```

## Step 3: Event is created

After successful database update:

```text
OrderCreatedEvent
```

For example:

```text
{
    orderId: 100,
    customer: "Deepak",
    product: "Laptop"
}
```

## Step 4: Event is sent through Kafka

```text
Write Service
     |
     v
OrderCreatedEvent
     |
     v
Kafka Topic
```

## Step 5: Read Side consumes the event

```text
Kafka
   |
   v
Order Read Service
```

## Step 6: Read DB is updated

```text
Read DB

Order Summary
----------------
ID: 100
Customer: Deepak
Product: Laptop
Status: CREATED
```

Now users can query the Read DB:

```text
Get Order 100
      |
      v
Read Service
      |
      v
Read DB
```

---

# 8. Eventual Consistency

The Write DB and Read DB may not update at exactly the same time.

For a short time:

```text
Write DB = New Data
Read DB  = Old Data
```

Then the event is processed:

```text
Write DB = New Data
Read DB  = New Data
```

This is called:

> **Eventual Consistency**

The system accepts that the Read DB may temporarily be slightly behind the Write DB.

---

# 9. Common Technologies

## Event Streaming / Messaging

```text
Apache Kafka
RabbitMQ
AWS SNS/SQS
Google Pub/Sub
Azure Service Bus
```

## Write Database

Usually chosen based on transactional requirements:

```text
PostgreSQL
MySQL
Oracle
MongoDB
```

## Read Database

Can be optimized for specific read requirements:

```text
PostgreSQL
MongoDB
Elasticsearch
Redis
Cassandra
```

An important benefit of CQRS is:

> **The Write DB and Read DB can use different database technologies.**

For example:

```text
Write Side
PostgreSQL
    |
    | Event
    v
Kafka
    |
    v
Read Side
Elasticsearch
```

---

# 10. Advantages

## 1. Better Read Performance

The Read DB can be optimized specifically for queries.

## 2. Independent Scaling

If your application has:

```text
1 million reads
10,000 writes
```

You can scale the Read Side separately.

```text
              +----------------+
              | Write Service  |
              +----------------+
                     |
                     v
                  Write DB


Client ---> 10 Read Service Instances
                     |
                     v
                  Read DB
```

## 3. Better Separation of Responsibilities

```text
Command Side = Business Logic + Data Changes

Query Side   = Reading + Fast Responses
```

## 4. Flexible Read Models

You can create multiple Read Databases from the same event.

```text
                 OrderCreatedEvent
                        |
                        v
                      Kafka
                 /       |       \
                v        v        v
           Search DB  Analytics  Cache
              DB         DB       DB
```

---

# 11. Disadvantages

CQRS is **not always better**.

## 1. More Complexity

You now have:

```text
Write Service
Read Service
Write DB
Read DB
Events
Kafka
Event Consumers
```

## 2. Eventual Consistency

The Read DB may temporarily contain old data.

## 3. Duplicate Event Handling

An event can sometimes be processed more than once.

For example:

```text
OrderCreatedEvent
        |
        v
Processed once
        |
        v
Accidentally processed again
```

Therefore, consumers should usually be **idempotent**.

Simple meaning:

> Processing the same event multiple times should not create incorrect data.

## 4. Event Delivery Problems

What happens if:

```text
Write DB updated successfully
        |
        X
Event publishing fails
```

Now the Write DB contains new data, but the Read DB may never receive the update.

This is one reason patterns like the **Transactional Outbox Pattern** are commonly used with CQRS.

---

# 12. When to Use CQRS

CQRS is useful when:

* Read and write workloads are very different.
* You have very high read traffic.
* Complex read models are required.
* You want independently scalable read and write services.
* You are already using event-driven microservices.
* Multiple services need to react to the same business event.

CQRS may be unnecessary when:

* Your application is simple.
* You have normal read/write traffic.
* A single database works perfectly.
* Eventual consistency creates problems.
* The extra infrastructure is not justified.

## Practical advice

For a simple CRUD application:

```text
Client
   |
   v
Service
   |
   v
Single Database
```

is often enough.

Do not introduce CQRS just because it is a popular architecture pattern.

---

# 13. My Questions and Answers

## Question 1

> **“So in short, does it happen through event passing between the two Read and Write DBs?”**

### Answer

**Almost.**

More accurately:

> **The Write Side updates the Write DB and then publishes an event through an event-streaming or messaging service such as Kafka. The Read Side consumes that event and updates the Read DB.**

```text
Write Side
    |
    v
Write DB
    |
    | Publish Event
    v
Kafka / Event Streaming Service
    |
    | Consume Event
    v
Read Side
    |
    v
Read DB
```

The two databases usually **do not communicate directly**.

---

## Question 2

> **“And this event is published through Kafka or something like that?”**

### Answer

**Yes.**

The event is commonly published through an event-streaming or messaging service such as:

```text
Apache Kafka
RabbitMQ
AWS SNS/SQS
Google Pub/Sub
Azure Service Bus
```

Kafka is a common choice for event-driven microservices.

The flow is:

```text
Write DB changes
       |
       v
Event is published
       |
       v
Kafka
       |
       v
Read Service consumes event
       |
       v
Read DB is updated
```

---

# 14. One-Minute Summary

```text
CQRS = Separate Read and Write responsibilities
```

```text
Command = Change data
Query   = Read data
```

```text
Command
   |
   v
Write Service
   |
   v
Write DB
   |
   v
Business Event
   |
   v
Kafka / Message Broker
   |
   v
Read Service
   |
   v
Read DB
```

## Most important mental model

> **The Write Side is responsible for changing the source of truth.**

> **The event announces that something changed.**

> **The Read Side consumes the event and updates its own optimized Read Model.**

### Final simplified flow

```text
Change Data
    ↓
Write DB
    ↓
Publish Event
    ↓
Kafka
    ↓
Consume Event
    ↓
Update Read DB
    ↓
Read Optimized Data
```

### Architect-level takeaway

**CQRS separates how you change data from how you read data. Event streaming keeps the different sides synchronized, usually with eventual consistency.**
