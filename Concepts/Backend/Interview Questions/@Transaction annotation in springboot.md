# Q: Explain Spring Boot `@Transactional` annotation and its properties like propagation and isolation in detail but in simple terms

You're right on spot. Let's build this **from the absolute basics**, and then gradually go into propagation, isolation, rollback, and interview-level scenarios.

---

# 1. What is `@Transactional`?

In simple terms:

> **`@Transactional` tells Spring: "Treat these database operations as one unit of work."**

For example, imagine transferring ₹1,000:

```text
Account A: -₹1,000
Account B: +₹1,000
```

There are **two database operations**.

We want:

```text
Both succeed  → COMMIT
Any one fails → ROLLBACK both
```

Without a transaction, this could happen:

```text
A → ₹1,000 deducted     ✅
B → money not credited  ❌
```

That's a problem.

With:

```java
@Transactional
public void transferMoney() {

    debitAccount();

    creditAccount();
}
```

Spring treats both operations as **one transaction**.

```text
START TRANSACTION
       |
       v
 debitAccount()
       |
       v
 creditAccount()
       |
       v
    COMMIT
```

If an exception occurs:

```text
START TRANSACTION
       |
       v
 debitAccount()      ✅
       |
       v
 creditAccount()     ❌
       |
       v
    ROLLBACK
```

So the database returns to its previous state.

---

# 2. Where should we generally put `@Transactional`?

Usually on the **service layer**.

```java
@Service
public class PaymentService {

    @Transactional
    public void transferMoney() {
        // database operations
    }
}
```

Why?

Because a service method usually represents **one business operation**.

For example:

```text
Controller
    ↓
PaymentService
    ↓
Repository
    ↓
Database
```

The service can define:

> "These 3 database operations together represent one business operation."

---

# 3. What exactly happens when Spring sees `@Transactional`?

Suppose we have:

```java
@Transactional
public void transfer() {
    debit();
    credit();
}
```

Conceptually Spring does something like:

```text
Begin Transaction
       ↓
    transfer()
       ↓
   debit()
       ↓
   credit()
       ↓
Commit Transaction
```

If something goes wrong:

```text
Begin Transaction
       ↓
    transfer()
       ↓
   debit()
       ↓
   credit()
       ↓
    Exception
       ↓
Rollback Transaction
```

Spring achieves this using **transaction management + proxies/AOP**.

You don't normally manually write:

```java
connection.setAutoCommit(false);
connection.commit();
connection.rollback();
```

Spring manages this for you.

---

# 4. Important `@Transactional` properties

The annotation has several properties:

```java
@Transactional(
    propagation = ...,
    isolation = ...,
    timeout = ...,
    readOnly = ...,
    rollbackFor = ...,
    noRollbackFor = ...
)
```

The two most important concepts to understand first are:

```text
Propagation
Isolation
```

Think of them as answering two completely different questions.

### Propagation asks:

> **"What should happen if another transaction already exists?"**

### Isolation asks:

> **"How much should one transaction be able to see from another transaction?"**

This distinction is extremely important.

---

# 5. Propagation

Imagine:

```java
@Transactional
public void methodA() {

    methodB();
}
```

And:

```java
@Transactional
public void methodB() {

}
```

Now we have:

```text
Transaction A
     |
     └── methodA()
             |
             └── methodB()
```

The question is:

> What should happen to `methodB()`'s transaction?

Should it:

* use the existing transaction?
* create a new transaction?
* run without a transaction?
* fail if no transaction exists?

That's what **propagation** controls.

---

# 6. Default propagation: `REQUIRED`

The default is:

```java
@Transactional(propagation = Propagation.REQUIRED)
```

You can simply remember:

> **REQUIRED = "Use the existing transaction, otherwise create one."**

Example:

```java
@Transactional
public void methodA() {

    methodB();
}
```

```java
@Transactional
public void methodB() {

}
```

If `methodA()` already has a transaction:

```text
methodA()
   |
   | Transaction 1
   |
   └── methodB()
          |
          └── uses Transaction 1
```

There is **one transaction**.

```text
Transaction 1
--------------------------------
methodA()
    |
    └── methodB()
--------------------------------
COMMIT
```

If `methodA()` doesn't have a transaction:

```text
methodA()
    |
    └── methodB()
           |
           └── creates Transaction 1
```

### Remember:

```text
REQUIRED

Existing transaction?
      |
   YES → Join it
      |
   NO → Create one
```

This is the most commonly used propagation mode.

---

# 7. `REQUIRES_NEW`

Now suppose:

```java
@Transactional
public void methodA() {

    methodB();
}
```

And:

```java
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void methodB() {

}
```

`REQUIRES_NEW` means:

> **"I don't care about the existing transaction. Give me a completely new one."**

So:

```text
Transaction 1
     |
     | methodA()
     |
     |  suspend
     ↓
Transaction 2
     |
     | methodB()
     |
     | COMMIT
     ↓
Transaction 1 resumes
```

Visually:

```text
Transaction 1
----------------------
methodA()
    |
    | suspend
    ↓
Transaction 2
----------------------
methodB()
    |
    └── COMMIT
----------------------
Transaction 1 resumes
    |
    └── COMMIT
```

This is useful when you want something to commit **independently**.

### Classic example: audit logging

```java
@Transactional
public void processPayment() {

    paymentRepository.save(payment);

    auditService.log("Payment started");
}
```

Suppose the audit method uses:

```java
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void log(String message) {
    auditRepository.save(...);
}
```

Then the audit transaction is independent.

If the main transaction later fails:

```text
Payment Transaction → ROLLBACK
Audit Transaction   → COMMIT
```

This can be useful for audit records that you want to persist independently.

---

# 8. `SUPPORTS`

```java
@Transactional(propagation = Propagation.SUPPORTS)
```

Meaning:

> **"If a transaction exists, use it. If not, that's okay."**

```text
Existing transaction?
       |
    YES → Join it
       |
     NO → Run without transaction
```

Example:

```text
methodA()
   |
   └── methodB()
```

If A has a transaction:

```text
Transaction 1
     |
     ├── methodA()
     └── methodB()
```

If A doesn't:

```text
methodA()
   |
   └── methodB()
        ↓
   No transaction
```

It's less commonly needed in typical Spring Boot applications.

---

# 9. `NOT_SUPPORTED`

```java
@Transactional(propagation = Propagation.NOT_SUPPORTED)
```

Meaning:

> **"I don't want to run inside a transaction."**

If a transaction already exists, Spring **suspends it**.

```text
Transaction 1
     |
     | suspend
     ↓
methodB()
     |
     | NO transaction
     ↓
Transaction 1 resumes
```

---

# 10. `MANDATORY`

```java
@Transactional(propagation = Propagation.MANDATORY)
```

Meaning:

> **"I MUST be called inside an existing transaction."**

If there isn't one:

```text
methodB()
   ↓
No transaction
   ↓
Exception
```

Useful when a method is only safe/valid when participating in a caller's transaction.

---

# 11. `NEVER`

```java
@Transactional(propagation = Propagation.NEVER)
```

Meaning:

> **"I must NOT run inside a transaction."**

If a transaction exists:

```text
Transaction exists
       ↓
   Exception
```

Opposite of `MANDATORY`.

```text
MANDATORY → transaction MUST exist

NEVER     → transaction MUST NOT exist
```

---

# 12. `NESTED`

```java
@Transactional(propagation = Propagation.NESTED)
```

This is more advanced.

It generally uses a **savepoint** within an existing transaction.

Think:

```text
Transaction 1
---------------------
Operation A

SAVEPOINT

Operation B
---------------------
```

If B fails, the database can potentially roll back to the savepoint instead of rolling back everything.

```text
A ✅

SAVEPOINT

B ❌
 ↓
ROLLBACK TO SAVEPOINT

A remains
```

However, `NESTED` support depends on the transaction manager/database setup, so don't treat it as simply "REQUIRES_NEW but cheaper."

---

# 13. Propagation cheat sheet

| Propagation     | Simple meaning                                   |
| --------------- | ------------------------------------------------ |
| `REQUIRED`      | Join existing, otherwise create                  |
| `REQUIRES_NEW`  | Always create a new transaction                  |
| `SUPPORTS`      | Join if exists, otherwise no transaction         |
| `NOT_SUPPORTED` | Run without transaction                          |
| `MANDATORY`     | Existing transaction required                    |
| `NEVER`         | Transaction must not exist                       |
| `NESTED`        | Use nested transaction/savepoint where supported |

### Most important for interviews:

Focus heavily on:

```text
REQUIRED
REQUIRES_NEW
NESTED
```

Especially:

```text
REQUIRED vs REQUIRES_NEW
```

---

# 14. Now let's understand Isolation

Propagation and isolation are completely different.

Propagation:

> **Which transaction should I participate in?**

Isolation:

> **What can my transaction see from other transactions?**

Imagine two users accessing the same database row simultaneously.

```text
Transaction A
      |
      | reads account
      |
      ↓
   Database
      ↑
      |
      | updates account
      |
Transaction B
```

Now problems can occur when transactions execute concurrently.

Isolation determines **how much one transaction is isolated from other concurrent transactions**.

---

# 15. Why do we need isolation?

There are three famous problems.

```text
1. Dirty Read
2. Non-Repeatable Read
3. Phantom Read
```

Understanding these three makes isolation levels much easier.

---

# 16. Dirty Read

Suppose account balance is:

```text
₹10,000
```

Transaction A changes it:

```text
Transaction A
----------------
₹10,000 → ₹5,000
```

But A has **not committed yet**.

Transaction B reads:

```text
Transaction B
----------------
Reads ₹5,000
```

Then A fails:

```text
Transaction A
ROLLBACK
```

Database returns to:

```text
₹10,000
```

But B already saw:

```text
₹5,000
```

That's a:

> **Dirty Read**

B read data that was not committed.

---

# 17. Non-Repeatable Read

Transaction A reads:

```text
₹10,000
```

Then Transaction B changes it:

```text
₹10,000 → ₹5,000
COMMIT
```

Transaction A reads again:

```text
₹5,000
```

Within the **same transaction**, A got two different values.

```text
First read  → ₹10,000
Second read → ₹5,000
```

That's:

> **Non-Repeatable Read**

---

# 18. Phantom Read

This is slightly different.

Suppose:

```text
SELECT * FROM employee
WHERE salary > 100000;
```

Transaction A gets:

```text
Employee 1
Employee 2
```

Then Transaction B inserts:

```text
Employee 3
```

where salary > ₹100,000.

Transaction A runs the same query again:

```text
Employee 1
Employee 2
Employee 3
```

A new row "appeared."

That's a:

> **Phantom Read**

---

# 19. Isolation levels

Spring provides:

```java
Isolation.DEFAULT
Isolation.READ_UNCOMMITTED
Isolation.READ_COMMITTED
Isolation.REPEATABLE_READ
Isolation.SERIALIZABLE
```

Let's understand them from weakest to strongest.

---

# 20. `READ_UNCOMMITTED`

```java
@Transactional(isolation = Isolation.READ_UNCOMMITTED)
```

It provides the **least isolation**.

Transactions can potentially read uncommitted changes.

Therefore:

```text
Dirty Read       → possible
Non-repeatable   → possible
Phantom Read     → possible
```

Example:

```text
A:
₹10,000 → ₹5,000
(not committed)

B:
reads ₹5,000
```

B sees uncommitted data.

### Advantage

Potentially better concurrency/performance.

### Disadvantage

Data can be inconsistent.

It's rarely appropriate for normal business transactions.

---

# 21. `READ_COMMITTED`

```java
@Transactional(isolation = Isolation.READ_COMMITTED)
```

Meaning:

> **"I can only see committed data."**

Therefore:

```text
Dirty Read → prevented
```

But:

```text
Non-repeatable Read → possible
Phantom Read → possible
```

This is a very common isolation level.

For example:

```text
A reads → ₹10,000

B updates → ₹5,000
B commits

A reads again → ₹5,000
```

A doesn't see uncommitted data, but the value can change between reads.

---

# 22. `REPEATABLE_READ`

```java
@Transactional(isolation = Isolation.REPEATABLE_READ)
```

The idea is:

> **"If I read the same row twice within my transaction, I should get a consistent result."**

Generally:

```text
Dirty Read       → prevented
Non-repeatable   → prevented
Phantom Read     → DB-dependent
```

Important:

**Don't memorize the phantom-read behavior as universally identical across databases.**

For example, MySQL/InnoDB's implementation provides stronger behavior for many ordinary cases than the SQL-standard minimum would suggest.

---

# 23. `SERIALIZABLE`

```java
@Transactional(isolation = Isolation.SERIALIZABLE)
```

This provides the strongest standard isolation.

Think:

> **"Pretend transactions are happening one after another rather than concurrently."**

Conceptually:

```text
Transaction A
     ↓
     ↓
     ↓
  COMMIT
     ↓
Transaction B
     ↓
     ↓
  COMMIT
```

Rather than:

```text
A ────────
    B ────────
A ────────
    B ────────
```

This provides very strong consistency but can significantly reduce concurrency and increase locking/contention.

So:

> **Don't automatically choose SERIALIZABLE just because it's safest.**

---

# 24. Isolation cheat sheet

| Isolation        | Dirty Read  | Non-repeatable | Phantom      |
| ---------------- | ----------- | -------------- | ------------ |
| READ_UNCOMMITTED | ❌ Possible  | ❌ Possible     | ❌ Possible   |
| READ_COMMITTED   | ✅ Prevented | ❌ Possible     | ❌ Possible   |
| REPEATABLE_READ  | ✅ Prevented | ✅ Prevented    | DB-dependent |
| SERIALIZABLE     | ✅ Prevented | ✅ Prevented    | ✅ Prevented  |

The ❌ means **the problem can occur**.

---

# 25. What is `Isolation.DEFAULT`?

This is important.

```java
@Transactional(isolation = Isolation.DEFAULT)
```

It means:

> **"Use the database's default isolation level."**

Spring doesn't choose something like `READ_COMMITTED` itself here.

For example:

```text
Spring
  ↓
Isolation.DEFAULT
  ↓
Database's configured default
```

Therefore, the actual isolation behavior can vary depending on your database/configuration.

---

# 26. `readOnly`

Another useful property:

```java
@Transactional(readOnly = true)
public Employee getEmployee() {
    ...
}
```

It means:

> **"This transaction is intended only for reading."**

Example:

```java
@Transactional(readOnly = true)
public Employee findEmployee(Long id) {
    return repository.findById(id).orElseThrow();
}
```

It can allow the transaction infrastructure/database/ORM to optimize read-only work.

But very important:

> `readOnly = true` is **not a security mechanism that absolutely prevents writes in every setup**.

Don't think:

```text
readOnly = true
        ↓
Database physically cannot perform UPDATE
```

That's not universally true.

---

# 27. `timeout`

You can specify:

```java
@Transactional(timeout = 5)
public void process() {
}
```

Meaning approximately:

> Don't allow this transaction to run beyond 5 seconds.

The exact behavior depends on the transaction manager/resource involved.

Useful for preventing transactions from hanging for too long.

Long-running transactions can be problematic because they may:

```text
hold locks
consume connections
increase contention
```

---

# 28. `rollbackFor`

By default, Spring's rollback behavior is primarily based on **unchecked exceptions** (`RuntimeException`) and `Error`.

Example:

```java
@Transactional
public void transfer() {

    debit();

    throw new RuntimeException();
}
```

Spring normally rolls back.

But suppose:

```java
@Transactional
public void transfer() throws Exception {

    debit();

    throw new Exception();
}
```

A checked exception does not automatically trigger rollback by default.

You can explicitly configure:

```java
@Transactional(rollbackFor = Exception.class)
```

Now checked exceptions of that type also trigger rollback.

---

# 29. `noRollbackFor`

The opposite:

```java
@Transactional(noRollbackFor = SomeException.class)
```

Means:

> Even if this exception occurs, don't mark the transaction for rollback because of that exception.

Use this carefully.

---

# 30. Putting everything together

A transaction could look like:

```java
@Transactional(
    propagation = Propagation.REQUIRED,
    isolation = Isolation.READ_COMMITTED,
    timeout = 5,
    readOnly = false,
    rollbackFor = Exception.class
)
public void transferMoney() {

    debit();

    credit();
}
```

But don't write all these properties everywhere.

Usually:

```java
@Transactional
public void transferMoney() {
    debit();
    credit();
}
```

is perfectly fine.

Configure the properties **when your business requirement actually needs different behavior**.

---

# 31. The most important comparison: Propagation vs Isolation

This is an excellent interview question.

### Propagation

Controls:

> **Transaction boundaries / participation**

Example:

```text
A → B
```

Should B:

```text
join A?
create new?
run without transaction?
```

That's propagation.

---

### Isolation

Controls:

> **Interaction between concurrent transactions**

Example:

```text
Transaction A
       ↕
Transaction B
```

What data can A see from B?

That's isolation.

### One-line memory trick:

> **Propagation = "Which transaction?"**
> **Isolation = "What can I see?"**

---

# 32. A real-world example

Imagine:

```java
@Transactional
public void placeOrder() {

    saveOrder();

    reduceInventory();

    savePayment();
}
```

We want:

```text
saveOrder()
     ↓
reduceInventory()
     ↓
savePayment()
     ↓
COMMIT
```

If payment fails:

```text
saveOrder()       ✅
reduceInventory() ✅
savePayment()     ❌

        ↓

ROLLBACK EVERYTHING
```

Default:

```java
@Transactional
```

gives us:

```text
Propagation → REQUIRED
Isolation   → DEFAULT
```

So:

```text
Propagation
    ↓
Join existing transaction
or create one

Isolation
    ↓
Use database's default isolation
```

---

# 33. One important real-world trap: self-invocation

This is an important Spring interview question.

Suppose:

```java
@Service
public class PaymentService {

    public void methodA() {
        methodB();
    }

    @Transactional
    public void methodB() {
        // DB operation
    }
}
```

You might think:

```text
methodA()
   ↓
methodB()
   ↓
Spring creates transaction
```

But when `methodA()` calls `methodB()` **directly on `this`**, the call can bypass Spring's transactional proxy.

Conceptually:

```text
External caller
      ↓
Spring Proxy
      ↓
methodA()
      ↓
this.methodB()
      ↓
methodB()
```

The `methodB()` call doesn't go back through the proxy.

Therefore, `@Transactional` on `methodB()` may not be applied as you expect.

This is one reason transaction boundaries are generally best placed around **externally invoked service methods**.

---

# 34. Another important trap: where the transaction actually ends

Consider:

```java
@Transactional
public void placeOrder() {

    orderRepository.save(order);

}
```

When the method finishes successfully:

```text
@Transactional method
       ↓
transaction commit
       ↓
return to caller
```

So generally you want your database-dependent work to happen **inside the transactional method**.

This becomes particularly important with things like lazy-loaded JPA relationships.

---

# 35. What should you remember for interviews?

If you're preparing for senior/architect-level interviews, I would prioritize these:

### Level 1 — Must know

```text
What is @Transactional?
Why do we need transactions?
Commit vs rollback
```

### Level 2 — Must know very well

```text
Propagation.REQUIRED
Propagation.REQUIRES_NEW
Propagation.NESTED

Isolation:
READ_UNCOMMITTED
READ_COMMITTED
REPEATABLE_READ
SERIALIZABLE
```

### Level 3 — Important Spring behavior

```text
rollbackFor
readOnly
timeout
```

### Level 4 — Tricky questions

```text
Self-invocation
@Transactional on private methods
@Transactional on final methods/classes
Exception handling inside transactions
Nested transactions
REQUIRED vs REQUIRES_NEW
Isolation vs propagation
Database-specific isolation behavior
```

---

# 36. The mental model I want you to remember

Don't try to memorize all of `@Transactional` at once.

Think:

```text
                 @Transactional
                       |
          +------------+------------+
          |                         |
     Propagation                 Isolation
          |                         |
 "Which transaction?"       "What can I see?"
          |                         |
      REQUIRED                 READ_COMMITTED
      REQUIRES_NEW             REPEATABLE_READ
      NESTED                    SERIALIZABLE
      SUPPORTS
      etc.
```

And then:

```text
@Transactional
       |
       +-- propagation
       |      └── transaction participation
       |
       +-- isolation
       |      └── concurrent transaction visibility
       |
       +-- rollbackFor
       |      └── what causes rollback
       |
       +-- readOnly
       |      └── transaction intended for reads
       |
       +-- timeout
              └── maximum transaction duration
```

**The single most important distinction:**

> **Propagation deals with multiple transaction boundaries/callers. Isolation deals with multiple transactions running concurrently.**

For your Spring Boot learning sequence, the best next step is to go **deep into `Propagation.REQUIRED` first** with 5–6 concrete scenarios—especially **what happens when the outer method succeeds, fails, catches an exception, or calls another `@Transactional` method**. That will make `REQUIRES_NEW` and `NESTED` much easier to understand.
