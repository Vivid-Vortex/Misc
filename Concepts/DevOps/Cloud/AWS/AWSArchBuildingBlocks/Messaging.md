Messaging
- SQS (Simple Queue Service)
- SNS (Simple Notification Service)
- MSK (Managed Streaming for Apache Kafka) is it Kafka replacement but only difference is it's AWS managed.

---

## Q: What are SQS, SNS, and MSK?

This Much is enough to understand these three. But you can look further if you want more understanding.

| AWS Service | Simple meaning    | What it does                                                     | Without cloud                                     |
| ----------- | ----------------- | ---------------------------------------------------------------- | ------------------------------------------------- |
| **SQS**     | Message Queue     | One service sends a message, another consumes it later           | **RabbitMQ / ActiveMQ**                           |
| **SNS**     | Pub/Sub messaging | One service publishes a message, multiple subscribers receive it | **RabbitMQ / Kafka / NATS** depending on use case |
| **MSK**     | Managed Kafka     | AWS manages Apache Kafka for you                                 | **Apache Kafka**                                  |

---

### 1. SQS — Queue

Think:

```text
Producer → [ Queue ] → Consumer
```

Example:

```text
Order Service → SQS → Email Service
```

The Order Service puts a message into the queue.
The Email Service picks it up and processes it.

**AWS:** SQS
**No cloud:** RabbitMQ or ActiveMQ are common alternatives.

---

### 2. SNS — Publish/Subscribe

Think:

```text
             → Email Service
Publisher → SNS → SMS Service
             → Notification Service
```

One service publishes an event, and **multiple subscribers** can receive it.

Example:

```text
Order Service
      ↓
   SNS Topic
   ↙   ↓   ↘
Email  SMS  Analytics
```

**AWS:** SNS
**No cloud:** RabbitMQ, NATS, or Kafka can provide similar pub/sub patterns, depending on requirements.

---

### 3. MSK — Managed Kafka

Yes, **MSK is essentially AWS's managed Apache Kafka service.**

```text
Your application
       ↓
      MSK
       ↓
Apache Kafka
```

AWS manages much of the Kafka infrastructure for you.

Without AWS/cloud:

```text
Your application
       ↓
   Apache Kafka
       ↓
   Your servers
```

So:

> **MSK = Apache Kafka managed by AWS**

### Easy way to remember

```text
SQS  → Queue       → RabbitMQ / ActiveMQ
SNS  → Pub/Sub     → RabbitMQ / NATS / Kafka
MSK  → Kafka       → Apache Kafka
```

And importantly, **SQS/SNS are not Kafka replacements in a 1-to-1 sense**. Kafka is a distributed event-streaming platform with partitions, offsets, replay, consumer groups, etc., while SQS is primarily a queue and SNS is primarily pub/sub.
