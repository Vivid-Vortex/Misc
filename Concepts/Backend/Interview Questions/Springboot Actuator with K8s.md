# Spring Boot Actuator — Simple Explanation

## Q: What is Spring Boot Actuator?

Spring Boot Actuator provides **production-ready endpoints that allow us to monitor and manage a Spring Boot application**.

Think of it as a **health and monitoring system for our application**.

For example, Actuator can tell us:

* Is the application alive?
* Is the application ready to receive traffic?
* Is the database available?
* How much memory is being used?
* How many requests are coming in?
* What beans has Spring created?
* What APIs are mapped?
* What logging level is configured?

The dependency is:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

---

# Q: What are Actuator endpoints?

Actuator exposes endpoints under:

```text
/actuator
```

For example:

```text
/actuator/health
/actuator/info
/actuator/metrics
/actuator/beans
/actuator/mappings
```

For example:

```text
http://localhost:8080/actuator/health
```

may return:

```json
{
    "status": "UP"
}
```

This means that the application's health is currently considered **UP**.

---

# Q: What is the most important thing to understand about `/health`?

There are actually **different health concepts** that are important in a production application.

The important ones are:

```text
Health
   |
   +---- Liveness
   |
   +---- Readiness
```

They answer two different questions.

### Liveness

> **"Is my application alive?"**

### Readiness

> **"Is my application ready to receive traffic?"**

This distinction becomes particularly important with Kubernetes.

---

# Q: Does Kubernetes automatically call `/actuator/health`?

**Not necessarily.**

This is an important correction.

Spring Boot Actuator provides the health endpoints.

Kubernetes provides the mechanism that periodically checks an endpoint.

You configure Kubernetes to use the appropriate Actuator endpoint.

Conceptually:

```text
Spring Boot
    |
    +---- Actuator
            |
            +---- Liveness endpoint
            |
            +---- Readiness endpoint
```

Then Kubernetes can call those endpoints periodically:

```text
Kubernetes
    |
    |---- GET /actuator/health/liveness
    |
    |---- GET /actuator/health/readiness
```

So:

```text
Actuator       → provides the health information

Kubernetes     → periodically checks that information

Kubernetes     → takes action based on the result
```

---

# Q: What is Liveness?

Liveness answers:

> **"Is my application still alive?"**

For example:

```text
Application
     |
     ↓
/actuator/health/liveness
     |
     ↓
UP
```

Kubernetes can interpret this as:

```text
UP
 ↓
Application is alive
 ↓
Keep the Pod running
```

If it repeatedly becomes unhealthy:

```text
DOWN
 ↓
Application is considered unhealthy
 ↓
Kubernetes may restart the Pod
```

This is called a **liveness probe**.

---

# Q: Should Liveness check the database?

**Generally, NO.**

This is a very important production principle.

Suppose:

```text
Spring Boot
     |
     ↓
MySQL
```

MySQL goes down.

If your liveness check depends on MySQL:

```text
MySQL DOWN
    ↓
Liveness DOWN
    ↓
Kubernetes restarts Pod
    ↓
Pod starts
    ↓
MySQL still DOWN
    ↓
Liveness DOWN
    ↓
Kubernetes restarts Pod again
```

You can end up with unnecessary restart loops.

The application itself may actually be perfectly alive.

The problem is an **external dependency**.

Therefore, liveness should generally answer only:

> **"Is my application process healthy enough to keep running?"**

It should not normally depend on things such as:

```text
Database
Redis
Kafka
External REST APIs
```

---

# Q: What is Readiness?

Readiness answers:

> **"Can this application instance currently receive traffic?"**

This is different from being alive.

For example:

```text
Application → ALIVE
Database    → DOWN
```

The application process is running.

But perhaps it cannot properly process requests because the database is unavailable.

In that situation, we may want:

```text
Liveness  → UP
Readiness → DOWN
```

Then Kubernetes can stop sending traffic to that Pod.

Conceptually:

```text
                 Kubernetes
                     |
          +----------+----------+
          |                     |
      Liveness              Readiness
          |                     |
     "Are you alive?"     "Can I send traffic?"
          |                     |
         UP                    DOWN
          |                     |
    Keep Pod alive       Remove Pod from traffic
```

Notice something important:

**Readiness failure does not necessarily mean Kubernetes should restart the Pod.**

It usually means:

> "Don't send traffic to this instance right now."

---

# Q: Can Readiness check the database?

**Yes, it can.**

This is where your understanding is correct.

For example:

```text
Readiness
    |
    +---- Application state
    |
    +---- Database
    |
    +---- Other required dependency
```

If the database is unavailable:

```text
Database DOWN
      ↓
Readiness DOWN
      ↓
Kubernetes stops sending traffic
```

The Pod can remain running.

Once the dependency becomes available again:

```text
Database UP
      ↓
Readiness UP
      ↓
Kubernetes can send traffic again
```

However, there is an important nuance:

**You should not blindly put every external dependency into readiness.**

You need to decide which dependencies are truly required for the service to handle requests.

---

# Q: What are the Actuator Kubernetes health endpoints?

Spring Boot provides dedicated health groups for Kubernetes:

```text
/actuator/health/liveness
/actuator/health/readiness
```

So you can think of them as:

```text
/actuator/health/liveness
        ↓
"Am I alive?"

/actuator/health/readiness
        ↓
"Can I receive traffic?"
```

These are the endpoints Kubernetes commonly uses for:

```text
livenessProbe
readinessProbe
```

---

# Q: What happens when a Liveness Probe fails?

Suppose we have:

```text
Pod
 |
 +---- Spring Boot Application
          |
          +---- Liveness = UP
```

Kubernetes keeps the Pod running.

But suppose:

```text
Liveness = DOWN
```

Kubernetes may restart the container/Pod according to its probe configuration and restart policy.

The simplified flow is:

```text
Kubernetes
    |
    ↓
Check liveness
    |
    ↓
DOWN
    |
    ↓
Restart application
```

---

# Q: What happens when a Readiness Probe fails?

Suppose:

```text
Pod A → Readiness UP
Pod B → Readiness UP
Pod C → Readiness DOWN
```

Kubernetes can stop routing traffic to Pod C while continuing to route traffic to A and B.

Conceptually:

```text
                 Load Balancer / Service
                         |
                  +------+------+
                  |      |      |
                 Pod A  Pod B  Pod C
                  ↑      ↑
                traffic traffic
                         
                         X
                       Pod C
                    no traffic
```

Pod C is **not necessarily restarted**.

It simply isn't considered ready to receive traffic.

---

# Q: What is the difference between Liveness and Readiness?

This is one of the most important interview questions.

|                      | Liveness                        | Readiness                           |
| -------------------- | ------------------------------- | ----------------------------------- |
| Question             | Is the application alive?       | Can it receive traffic?             |
| Main purpose         | Detect stuck/broken application | Control traffic                     |
| Failure action       | Kubernetes may restart Pod      | Kubernetes removes Pod from traffic |
| Should depend on DB? | Generally no                    | Can, if DB is required              |
| Kubernetes probe     | `livenessProbe`                 | `readinessProbe`                    |

The easiest way to remember:

```text
Liveness
    ↓
"Should Kubernetes restart me?"

Readiness
    ↓
"Should Kubernetes send traffic to me?"
```

---

# Q: Then what is `/actuator/health`?

`/actuator/health` is the **general health endpoint**.

For example:

```text
/actuator/health
```

can provide an overall health status.

But when running in Kubernetes, we generally care specifically about:

```text
/actuator/health/liveness
/actuator/health/readiness
```

because Kubernetes needs to distinguish:

```text
ALIVE
```

from:

```text
READY
```

---

# Q: What does Actuator check for health?

Actuator can have different **health indicators**.

For example:

```text
Health
  |
  +---- Database
  |
  +---- Redis
  |
  +---- Disk space
  |
  +---- Custom health indicator
```

For example, the database health indicator may check whether the application can communicate with the database.

So you might get:

```json
{
    "status": "UP",
    "components": {
        "db": {
            "status": "UP"
        }
    }
}
```

If the database is unavailable:

```json
{
    "status": "DOWN",
    "components": {
        "db": {
            "status": "DOWN"
        }
    }
}
```

**But remember:** just because Actuator knows that the DB is down doesn't mean that the **liveness probe should fail**.

This is where the distinction between health indicators and liveness/readiness becomes important.

---

# Q: What is `/actuator/metrics`?

It provides application metrics.

For example:

```text
/actuator/metrics
```

may expose metrics such as:

```text
jvm.memory.used
jvm.threads.live
process.cpu.usage
http.server.requests
```

For example:

```text
/actuator/metrics/jvm.memory.used
```

can provide information about JVM memory usage.

---

# Q: What is `/actuator/beans`?

It shows information about Spring beans.

For example:

```java
@Service
public class UserService {
}
```

Spring creates a bean for `UserService`.

Actuator can expose information about that bean.

Useful for debugging:

> "Did Spring actually create my bean?"

---

# Q: What is `/actuator/mappings`?

It shows the request mappings registered by Spring.

For example:

```java
@GetMapping("/users")
public List<User> getUsers() {
    ...
}
```

Actuator can show something similar to:

```text
GET /users
    ↓
UserController.getUsers()
```

This is useful when debugging API mappings.

---

# Q: What is `/actuator/loggers`?

It allows you to inspect logging configuration.

For example:

```text
com.example.service
```

may currently have:

```text
INFO
```

You can inspect logging levels through Actuator and, where configured, change them dynamically.

For example:

```text
INFO
 ↓
DEBUG
```

without restarting the application.

---

# Q: How do I expose Actuator endpoints?

By default, not every Actuator endpoint is exposed over HTTP.

For example:

```properties
management.endpoints.web.exposure.include=health,info,metrics
```

This exposes:

```text
/actuator/health
/actuator/info
/actuator/metrics
```

You can expose everything:

```properties
management.endpoints.web.exposure.include=*
```

but **this should not be done blindly in production**.

Some endpoints can expose sensitive internal information.

---

# Q: How does Actuator fit into Kubernetes?

A simplified production architecture looks like this:

```text
                         Kubernetes
                              |
                +-------------+-------------+
                |                           |
          Liveness Probe              Readiness Probe
                |                           |
                ↓                           ↓
 /actuator/health/liveness     /actuator/health/readiness
                |                           |
                ↓                           ↓
        Is app alive?              Can app receive traffic?
                |                           |
              YES/NO                      YES/NO
```

Then Kubernetes takes the appropriate action.

### Liveness failure

```text
Liveness DOWN
     ↓
Kubernetes may restart Pod
```

### Readiness failure

```text
Readiness DOWN
     ↓
Kubernetes stops routing traffic to Pod
```

---

# Q: What about Prometheus and Grafana?

Actuator is **not a complete monitoring platform**.

Think of the architecture as:

```text
Spring Boot
     |
     ↓
  Actuator
     |
     +---- Health
     |
     +---- Metrics
     |
     ↓
 Prometheus
     |
     ↓
 Grafana
```

So:

```text
Actuator
    =
Expose application health and metrics

Prometheus
    =
Collect/store metrics

Grafana
    =
Visualize metrics
```

---

# Q: What should I remember for interviews?

The most important concepts are:

### 1. Actuator

> **Spring Boot Actuator provides production-ready endpoints for monitoring and managing a Spring Boot application.**

### 2. Health

```text
/actuator/health
```

Provides overall health information.

### 3. Liveness

```text
/actuator/health/liveness
```

Answers:

> **"Is my application alive?"**

If it fails, Kubernetes **may restart the Pod**.

### 4. Readiness

```text
/actuator/health/readiness
```

Answers:

> **"Can my application receive traffic?"**

If it fails, Kubernetes generally **stops routing traffic to that Pod**.

### 5. Database

A database check can be useful for **readiness**, but generally should **not be used to determine liveness**.

### 6. Kubernetes

Kubernetes periodically calls the configured probes.

```text
Kubernetes
    |
    +---- Liveness → restart decision
    |
    +---- Readiness → traffic decision
```

### 7. Metrics

```text
/actuator/metrics
```

Provides application/JVM metrics that can be consumed by monitoring systems.

---

# The easiest mental model

Remember these three sentences:

```text
Actuator:
"Here is information about my application."

Liveness:
"I am alive."

Readiness:
"I am ready to handle traffic."
```

And Kubernetes decides what to do with that information:

```text
                 Actuator
                    |
          +---------+---------+
          |                   |
       Liveness            Readiness
          |                   |
      "Alive?"            "Ready?"
          |                   |
          ↓                   ↓
     K8s restart?        K8s traffic?
```

**One final important distinction:** `health` is an Actuator concept; `livenessProbe` and `readinessProbe` are Kubernetes concepts that can be wired to Actuator's liveness/readiness endpoints. This distinction is important in system-design and Kubernetes interviews.
