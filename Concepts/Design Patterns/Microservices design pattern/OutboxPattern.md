# Outbox Pattern

The **Outbox Pattern** is a technique used in microservices to ensure that **database changes and event publishing happen reliably together**.

It solves a common problem:

> "What if I save data in the database, but the message broker (Kafka/RabbitMQ) is down?"

Without the Outbox Pattern, your database and message broker can get out of sync.

---

## The Problem

Suppose you're building an **Order Service**.

When a customer places an order:

1. Save the order in the database.
2. Publish an `OrderCreated` event to Kafka.

### Normal Flow

```text
Create Order
     |
     +--> Save to Database ✅
     |
     +--> Publish Event to Kafka ✅
```

Everything works.

---

## Failure Scenario

What if Kafka is unavailable?

```text
Save Order to Database ✅

Publish Event ❌
```

Now:

- The order exists.
- Inventory Service never receives `OrderCreated`.
- Payment Service never starts.
- Shipping never happens.

Your system is inconsistent.

---

## Another Failure

What if you publish first?

```text
Publish Event ✅

Save Database ❌
```

Now other services think an order exists, but it was never saved.

That's also bad.

---

# The Outbox Pattern Solution

Instead of publishing directly to Kafka:

1. Save the order.
2. Save an event into an **Outbox table**.
3. Commit both in **one database transaction**.
4. A background process reads the Outbox table and publishes events.
5. After publishing successfully, it marks the event as processed or removes it.

```text
Client
   |
   v
Order Service
   |
   +--> Orders Table
   |
   +--> Outbox Table
           |
           | (same DB transaction)
           v
        Commit
```

Later...

```text
Outbox Processor
      |
      v
Reads Outbox
      |
Publishes to Kafka
      |
Marks Event Sent
```

---

# Example

## Step 1

Customer places an order.

**Orders table:**

| OrderId | Customer | Amount |
|---------:|----------|-------:|
| 101 | Alice | 500 |

**Outbox table:**

| Id | Event | Status |
|---:|-------|--------|
| 1 | OrderCreated | Pending |

Both rows are written in the **same transaction**.

If the transaction succeeds, both exist.

If it fails, neither exists.

---

## Step 2

Background worker runs every few seconds.

It sees:

```text
Pending
```

Publishes:

```text
OrderCreated
```

to Kafka.

---

## Step 3

Updates the Outbox.

| Id | Status |
|---:|--------|
| 1 | Sent |

Done.

---

# Why It Works

Imagine Kafka is down.

```text
Database Transaction

Orders Table ✅

Outbox Table ✅
```

Kafka publish fails.

No problem.

The event is still safely stored in the Outbox table.

When Kafka comes back:

```text
Worker retries

Publish succeeds
```

No event is lost.

---

# Architecture Diagram

```text
             Client
                |
                v
         Order Service
                |
      -------------------
      |                 |
      v                 v
 Orders Table     Outbox Table
      |                 |
      -------Commit------
                |
                v
         Outbox Worker
                |
                v
              Kafka
                |
                v
     Other Microservices
```

---

# Benefits

- **No lost events** – If the message broker is temporarily unavailable, events remain in the Outbox table until they can be delivered.
- **Atomic writes** – Business data and the corresponding event are committed together in a single database transaction.
- **Reliable retries** – A background worker can safely retry publishing failed events.

---

# Things to Watch Out For

Because the worker might retry after a failure, the same event may be published more than once.

Example:

```text
Publish Event ✅

Network failure after send

Worker retries

Publish Event ✅
```

Consumers should therefore be **idempotent**, meaning processing the same event multiple times should produce the same result.

---

# Summary

The Outbox Pattern guarantees:

- Database changes and event creation happen **atomically**.
- Events are **never lost**, even if Kafka is temporarily unavailable.
- Background workers publish events asynchronously.
- Consumers should be designed to handle duplicate events safely (idempotency).

It is one of the most common patterns used in event-driven microservices to maintain consistency between a database and a message broker.
