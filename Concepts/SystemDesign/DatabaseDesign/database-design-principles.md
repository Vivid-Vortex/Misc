# Database Design Principles — A Practical Reference

A comprehensive guide for system design work and interviews. Organized from schema fundamentals through performance, scaling, and operational concerns.

---

## 1. Schema Design Fundamentals

### 1.1 Normalization (Know 1NF → 3NF cold)

- **1NF**: Atomic values only — no arrays or comma-separated lists in a column. Each row unique.
- **2NF**: No partial dependencies — every non-key column depends on the *whole* primary key (matters for composite keys).
- **3NF**: No transitive dependencies — non-key columns depend only on the key, not on other non-key columns.

**Rule of thumb**: Normalize until it hurts, denormalize until it works. Start with 3NF for OLTP systems; denormalize deliberately and only with measured justification.

### 1.2 Deliberate Denormalization

Denormalize when:
- Read-heavy workloads where JOIN cost dominates (e.g., storing `order_total` on the order instead of summing line items every read).
- Reporting/analytics tables (star schemas are intentionally denormalized).
- Caching derived values (counters, aggregates) — but pair with a strategy to keep them consistent (triggers, application logic, or scheduled reconciliation).

**Trade-off**: You're exchanging write complexity and consistency risk for read speed. Document every denormalization.

### 1.3 Choose Keys Carefully

- **Surrogate keys** (auto-increment, UUID): stable, decoupled from business meaning. Default choice for most tables.
- **Natural keys** (email, SSN, ISBN): meaningful but risky — business rules change (people change emails).
- **UUID vs auto-increment**:
  - Auto-increment: compact, index-friendly (sequential inserts), but leaks information (row counts, ordering) and complicates sharding/merging.
  - UUIDv4: globally unique, shard-friendly, but random inserts fragment B-tree indexes. Prefer **UUIDv7 / ULID** (time-ordered) if you need UUIDs at scale.

### 1.4 Data Types Matter

- Use the smallest type that fits: `INT` vs `BIGINT`, `VARCHAR(50)` vs `TEXT`.
- Money: `DECIMAL/NUMERIC`, never `FLOAT` (rounding errors).
- Timestamps: store in **UTC** (`TIMESTAMPTZ` in Postgres); convert at the presentation layer.
- Enums: prefer lookup tables or check constraints over DB-native enums if values change often.
- Booleans as booleans — not `VARCHAR('Y'/'N')`.

---

## 2. Constraints and Integrity

### 2.1 Enforce Integrity in the Database, Not Just Code

- **Primary keys** on every table.
- **Foreign keys** to enforce referential integrity — application-level enforcement alone always eventually fails (race conditions, forgotten code paths, ad-hoc scripts).
- **NOT NULL** by default; nullable only when null is semantically meaningful.
- **UNIQUE** constraints for business uniqueness (email, SKU).
- **CHECK** constraints for domain rules (`quantity > 0`, `status IN (...)`).

**Interview line**: "The database is the last line of defense for data integrity. Applications come and go; the data outlives them."

### 2.2 Idempotency and Uniqueness

Design writes to be safely retryable: unique constraints + `INSERT ... ON CONFLICT` (upsert) patterns prevent duplicates from retries — critical in distributed systems and message-driven architectures.

---

## 3. Indexing

### 3.1 Core Rules

- Index columns used in `WHERE`, `JOIN`, `ORDER BY`, and `GROUP BY`.
- **Composite index column order matters**: leftmost-prefix rule. An index on `(a, b, c)` serves queries filtering on `a`, `(a,b)`, `(a,b,c)` — but not `b` alone.
- **Selectivity**: index high-cardinality columns (email, user_id), not low-cardinality ones (boolean flags, status with 3 values) — unless combined in a composite or partial index.
- **Covering indexes**: include all columns a query needs so the DB never touches the table (index-only scan).

### 3.2 Costs of Indexes

Every index slows down `INSERT/UPDATE/DELETE` and consumes storage. Don't index speculatively — index based on actual query patterns, and drop unused indexes (check `pg_stat_user_indexes` in Postgres).

### 3.3 Specialized Indexes

- **Partial indexes**: index only rows matching a condition (`WHERE deleted_at IS NULL`) — smaller, faster.
- **Functional/expression indexes**: `LOWER(email)` for case-insensitive lookups.
- **Full-text indexes** (GIN/tsvector, or dedicated search engines) for text search — never `LIKE '%term%'` at scale.

---

## 4. Query Design Principles

### 4.1 Push Work to the Database (Your Original Question)

- **Aggregate, filter, and join in SQL**, not in application code — the DB uses indexes, avoids network transfer of raw rows, and is optimized for set operations.
- Exception: complex business logic that doesn't map to SQL, or already-small result sets.
- Corollary: **fetch only what you need** — no `SELECT *`, use `LIMIT`, paginate.

### 4.2 Avoid N+1 Queries

Fetching a list then querying per-item in a loop is the most common ORM performance killer. Use JOINs, `IN` clauses, or ORM eager loading (`JOIN FETCH` in JPA/Hibernate — relevant for your Spring Boot work).

### 4.3 Pagination

- **Offset pagination** (`LIMIT 20 OFFSET 10000`): simple but degrades linearly — the DB scans and discards all skipped rows.
- **Keyset/cursor pagination** (`WHERE id > :last_id ORDER BY id LIMIT 20`): constant-time, the right choice for infinite scroll and large datasets.

### 4.4 Understand Your Query Plans

`EXPLAIN ANALYZE` is your primary diagnostic tool. Know the difference between a sequential scan, index scan, and index-only scan, and what nested loop vs hash join vs merge join mean.

---

## 5. Transactions and Concurrency

### 5.1 ACID — Be Able to Define Each

- **Atomicity**: all-or-nothing.
- **Consistency**: transactions move the DB from one valid state to another.
- **Isolation**: concurrent transactions don't corrupt each other.
- **Durability**: committed data survives crashes.

### 5.2 Isolation Levels (Common Interview Topic)

From weakest to strongest, with the anomalies each permits:

| Level | Dirty Read | Non-repeatable Read | Phantom Read |
|---|---|---|---|
| Read Uncommitted | ✅ possible | ✅ | ✅ |
| Read Committed (Postgres default) | ❌ | ✅ | ✅ |
| Repeatable Read (MySQL default) | ❌ | ❌ | ✅* |
| Serializable | ❌ | ❌ | ❌ |

*Postgres Repeatable Read also prevents phantoms via snapshot isolation.

Higher isolation = more locking/retries = lower throughput. Most apps run fine at Read Committed with explicit locking where needed.

### 5.3 Locking Strategies

- **Pessimistic**: `SELECT ... FOR UPDATE` — lock up front. Use when conflicts are frequent.
- **Optimistic**: version column, check on update (`UPDATE ... WHERE version = :v`). Use when conflicts are rare — standard in JPA via `@Version`.

### 5.4 Keep Transactions Short

Long transactions hold locks, block vacuum (Postgres bloat), and increase deadlock risk. Never do network calls (HTTP, external APIs) inside a DB transaction.

---

## 6. Scaling Patterns

### 6.1 Vertical First, Then Horizontal

Scale up (bigger machine) before scaling out — it's operationally simpler. Modern hardware takes a single Postgres/MySQL instance surprisingly far.

### 6.2 Read Replicas

- Offload read traffic to replicas; writes go to the primary.
- **Replication lag** is the key caveat: read-your-own-writes can fail on a replica. Route freshness-sensitive reads to the primary or use sticky sessions.

### 6.3 Caching Layer

- Cache-aside (lazy loading) with Redis/Memcached is the standard pattern.
- Define invalidation strategy up front — TTLs, event-driven invalidation, or write-through. "There are only two hard things: cache invalidation and naming things."

### 6.4 Partitioning and Sharding

- **Partitioning** (within one DB): split large tables by range (date) or hash. Great for time-series data and enabling cheap drops of old data (`DROP PARTITION` vs `DELETE`).
- **Sharding** (across DBs): split data across servers by a shard key.
  - Choose a shard key with even distribution and that appears in most queries (usually `tenant_id` or `user_id`).
  - Costs: no cross-shard JOINs or transactions, resharding pain, hot-shard risk. Treat as a last resort.

### 6.5 CAP Theorem and Consistency Models

- Under a network partition, you choose **Consistency** or **Availability** (CP vs AP).
- Know **eventual consistency** and where it's acceptable (social feeds, analytics) vs not (payments, inventory).

---

## 7. Data Modeling Patterns Worth Knowing

- **Soft deletes** (`deleted_at` timestamp): preserves history and referential integrity; pair with partial indexes to keep queries fast. Trade-off: every query must filter, unique constraints get tricky.
- **Audit/history tables**: append-only change log, via triggers or application events. Never mutate audit data.
- **Event sourcing** (advanced): store events as the source of truth; derive current state. Powerful but operationally heavy — mention it, don't default to it.
- **Polymorphic associations**: avoid the `(entity_type, entity_id)` anti-pattern where possible — it breaks foreign keys. Prefer separate join tables or exclusive-arc design.
- **EAV (Entity-Attribute-Value)**: flexible schema, terrible queries. Use JSONB columns instead for genuinely dynamic attributes, and index them (GIN).
- **Many-to-many**: always a join table with its own composite/surrogate key; attributes of the relationship live there.
- **Hierarchies**: adjacency list (simple, recursive CTEs), materialized path, or closure tables depending on read/write patterns.

---

## 8. SQL vs NoSQL — Choosing a Database

| Concern | Relational (Postgres/MySQL) | Document (MongoDB) | Key-Value (Redis/Dynamo) | Wide-Column (Cassandra) |
|---|---|---|---|---|
| Best for | Structured data, transactions, complex queries | Flexible/nested documents | Caching, sessions, simple lookups | Massive write throughput, time-series |
| Joins | ✅ native | Limited | ❌ | ❌ |
| Transactions | ✅ full ACID | Per-document (multi-doc limited) | Limited | Limited |
| Schema | Enforced | Flexible | None | Defined per table |

**Interview guidance**: Default to relational unless you have a specific reason not to. "We chose NoSQL for scale" without numbers is a red flag; Postgres handles most workloads. NoSQL shines for: extreme write volume, genuinely schemaless data, or simple access patterns at massive scale.

---

## 9. Operational and Security Principles

- **Migrations as code**: versioned, forward-only migrations (Flyway — which you already use — or Liquibase). Make migrations backward-compatible with the running app version (expand → migrate → contract pattern) for zero-downtime deploys.
- **Connection pooling**: databases handle limited concurrent connections; always pool (HikariCP in Spring Boot, PgBouncer at the infra level).
- **Backups you've actually tested**: an untested backup is a hope, not a strategy. Know your RPO (data loss tolerance) and RTO (recovery time).
- **Least privilege**: app users get only the permissions they need; no app connects as a superuser. Separate read-only credentials for reporting.
- **Encryption**: at rest (disk/tablespace) and in transit (TLS). Column-level encryption or tokenization for PII where required.
- **Never store secrets or plaintext passwords**: bcrypt/argon2 for passwords; secrets managers for credentials.
- **SQL injection**: parameterized queries always — never string concatenation.
- **Monitoring**: slow query logs, connection counts, replication lag, table bloat, index usage. Alert before users notice.

---

## 10. Common Anti-Patterns (Quick Interview Checklist)

1. `SELECT *` in production code.
2. N+1 queries from ORM lazy loading.
3. Storing comma-separated values in a column (violates 1NF).
4. Business logic that bypasses DB constraints ("we validate in the app").
5. Using `FLOAT` for money.
6. Indexing everything "just in case."
7. `LIKE '%term%'` for search at scale.
8. Long-running transactions wrapping external API calls.
9. Premature sharding.
10. EAV tables instead of JSONB.
11. Offset pagination on large tables.
12. Timestamps without timezones / not in UTC.
13. Soft deletes without partial indexes or filtered unique constraints.
14. One giant "god table" with 100+ columns.

---

## Quick Decision Framework (System Design Interviews)

1. **Access patterns first**: What are the top queries? Read/write ratio? Design the schema for the queries, not the other way around.
2. **Estimate scale**: rows, QPS, growth rate. This determines whether you even need replicas/sharding.
3. **Consistency requirements**: strong (money, inventory) vs eventual (feeds, counts)?
4. **Start simple**: single relational DB + indexes + connection pool. Add caching → replicas → partitioning → sharding *only as each bottleneck appears*, and say this explicitly in interviews — it shows judgment.
