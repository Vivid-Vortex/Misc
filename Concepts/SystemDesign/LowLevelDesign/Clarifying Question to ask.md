
Clarifying questions for low-level system design interviews or tasks. I'll organize this by key areas to probe:

```markdown
1. Data Characteristics
- What is the average size of each data item/record?
- What is the expected read/write ratio?
- Do we need to support batch operations?
- What's the expected data retention period?

2. Scale & Performance
- What's the expected QPS (Queries Per Second)?
- What's the expected peak load?
- What's the acceptable latency (P95, P99)?
- How much data do we expect to handle per day/month?

1. Consistency Requirements
- Do we need strong consistency or is eventual consistency acceptable?
- Are there any specific ACID requirements?
- Can we tolerate data loss? If yes, what's the acceptable threshold?

2. Security & Access Control
- Who can access what data?
- Do we need audit logging?
- Are there any encryption requirements?
- Do we need role-based access control?

3. Integration Points
- What other systems will this interact with?
- What protocols should we support (REST, gRPC, etc.)?
- Are there any existing APIs we need to maintain?

4. Operational Requirements
- What are the monitoring requirements?
- What's the backup strategy?
- How do we handle system failures?
- What metrics are important to track?

5. Resource Constraints
- Are there any memory/CPU constraints?
- What's the storage budget?
- Are there any network bandwidth limitations?
```

For example, if designing a caching system, you might ask:
```markdown
6. Cache-Specific Questions
- What's the maximum cache size needed?
- What eviction policy should we use?
- Do we need cache persistence?
- How do we handle cache invalidation?
- Is it a read-through or write-through cache?
```
