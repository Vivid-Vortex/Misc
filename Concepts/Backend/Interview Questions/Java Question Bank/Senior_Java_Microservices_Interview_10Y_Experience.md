# Senior Java / Microservices Interview Questions — 10+ Years Experience

## Scope

This interview preparation guide is designed for senior/staff-level Java engineers with around 10 years of experience. It is **company-agnostic** and focuses on the areas commonly expected across product companies, consulting firms, fintech, e-commerce, SaaS, and large enterprise organizations.

### Core Topics

- Java 8–17
- Spring Framework / Spring Boot
- Microservices Architecture
- Kafka / Event-Driven Architecture
- Spring Security
- Docker
- Kubernetes
- Distributed Systems
- System Design
- Production Troubleshooting / Observability
- Leadership, ownership, and senior-engineer behavioral questions

---

# 1. What Interviewers Expect at 10 Years

At ~10 years, interviews usually move beyond syntax and framework definitions.

You should be able to explain:

1. **Why** you chose a particular approach.
2. **Trade-offs** between alternatives.
3. How the design behaves under failure.
4. How it scales.
5. How it is secured.
6. How it is deployed and operated.
7. How you debug production issues.
8. What you personally owned.
9. What went wrong and what you learned.
10. How you influence architecture and other engineers.

A strong senior answer normally follows:

> **Context → Problem → Options → Decision → Trade-offs → Implementation → Failure handling → Result**

---

# 2. Java 8–17

## Core Java

1. Explain the major features introduced from Java 8 through Java 17.
2. What changed between Java 8, 11, and 17?
3. Why would you upgrade a Java 8 application to Java 17?
4. Explain JVM architecture at a high level.
5. Heap vs Stack vs Metaspace.
6. How does garbage collection work?
7. What are young and old generations?
8. What is a GC pause?
9. How would you troubleshoot high GC activity?
10. What causes `OutOfMemoryError`?
11. What causes `StackOverflowError`?
12. Explain strong, weak, soft, and phantom references.
13. `==` vs `equals()`.
14. Why must `hashCode()` be consistent with `equals()`?
15. How does `HashMap` work internally?
16. What happens when multiple keys have the same hash?
17. `HashMap` vs `ConcurrentHashMap`.
18. `ArrayList` vs `LinkedList`.
19. `HashSet` vs `TreeSet`.
20. `Comparable` vs `Comparator`.

## Collections / Streams

21. Explain Java Stream API.
22. Intermediate vs terminal operations.
23. `map()` vs `flatMap()`.
24. `filter()` vs `map()`.
25. When should you avoid Streams?
26. What is lazy evaluation in Streams?
27. Sequential vs parallel streams.
28. Why can parallel streams hurt performance?
29. How does `Collectors.groupingBy()` work?
30. How would you find duplicate elements using Streams?
31. How would you group objects by a field?
32. How would you find the first non-repeated character?
33. How would you sort objects by multiple fields?

## Concurrency

34. Process vs thread.
35. `synchronized` vs `Lock`.
36. `volatile` — what does it guarantee?
37. What is a race condition?
38. What is deadlock?
39. How do you prevent deadlocks?
40. What is thread starvation?
41. `ExecutorService` vs creating threads manually.
42. `Future` vs `CompletableFuture`.
43. How does `CompletableFuture` help in microservices?
44. `AtomicInteger` vs `synchronized`.
45. `CountDownLatch` vs `CyclicBarrier`.
46. How would you design a thread-safe singleton?
47. How would you troubleshoot thread pool exhaustion?

## Modern Java

48. Explain `var`.
49. What are records?
50. What are sealed classes?
51. What are switch expressions?
52. What are text blocks?
53. What is pattern matching introduced around Java 16/17?
54. What are the benefits and limitations of records?
55. When would you use a sealed hierarchy?
56. Which Java 17 features have you actually used in production?

---

# 3. Spring Framework / Spring Boot

## Spring Fundamentals

57. What problem does Spring solve?
58. Explain Dependency Injection.
59. Constructor injection vs field injection.
60. `@Component`, `@Service`, `@Repository`, and `@Controller`.
61. How does Spring create and manage beans?
62. Explain the Spring bean lifecycle.
63. Singleton vs prototype scope.
64. What is Spring AOP?
65. How does proxy-based AOP work?
66. Why can self-invocation cause `@Transactional` problems?
67. What is an application context?

## Spring Boot

68. What does Spring Boot provide over Spring?
69. Explain auto-configuration.
70. How does Spring Boot decide which auto-configurations to apply?
71. What is a starter dependency?
72. `application.properties` vs `application.yml`.
73. How do profiles work?
74. How do you manage configuration across environments?
75. `@ConfigurationProperties` vs `@Value`.
76. How would you structure a large Spring Boot application?
77. How do you externalize secrets?
78. How do you implement health checks?
79. Explain Spring Boot Actuator.
80. How would you diagnose a slow Spring Boot application?

## REST APIs

81. `@Controller` vs `@RestController`.
82. `@RequestParam` vs `@PathVariable` vs `@RequestBody`.
83. How do you implement global exception handling?
84. `@ControllerAdvice` vs `@ExceptionHandler`.
85. How do you validate request payloads?
86. How do you version APIs?
87. How do you make a REST API idempotent?
88. What HTTP status codes do you commonly use?
89. PUT vs PATCH.
90. How would you design pagination?
91. Offset pagination vs cursor pagination.
92. How do you prevent API abuse?
93. How do you document APIs?

## Transactions

94. How does `@Transactional` work?
95. What are transaction propagation modes?
96. What are isolation levels?
97. What is a dirty read?
98. Non-repeatable read vs phantom read.
99. Why might `@Transactional` not work?
100. Should `@Transactional` be placed on a controller?
101. How do transactions interact with asynchronous processing?
102. How would you handle a transaction spanning multiple services?

---

# 4. Microservices Architecture

## Fundamentals

103. What is a microservice?
104. Monolith vs modular monolith vs microservices.
105. When should you NOT use microservices?
106. What are the advantages of microservices?
107. What are the biggest disadvantages?
108. How do you identify service boundaries?
109. What is bounded context?
110. How do you avoid a distributed monolith?
111. How small should a microservice be?
112. Should every service have its own database?
113. How do you handle shared data?
114. How do you handle schema changes between services?
115. How do you version services?

## Communication

116. REST vs messaging.
117. Synchronous vs asynchronous communication.
118. REST vs gRPC.
119. How do services discover each other?
120. Client-side vs server-side discovery.
121. What is an API Gateway?
122. API Gateway vs load balancer.
123. What should NOT be placed in an API Gateway?
124. How do you handle service timeouts?
125. How do you prevent cascading failures?

## Resilience

126. Explain Circuit Breaker.
127. Closed, Open, and Half-Open states.
128. Retry vs Circuit Breaker.
129. When should you NOT retry?
130. What is exponential backoff?
131. What is jitter?
132. What is a bulkhead?
133. What is rate limiting?
134. What is backpressure?
135. How do you design graceful degradation?
136. How do you prevent retry storms?
137. How would you handle a downstream service that is intermittently failing?

## Distributed Transactions

138. Why are distributed transactions difficult?
139. Explain the Saga pattern.
140. Saga choreography vs orchestration.
141. What are compensating transactions?
142. Two-phase commit vs Saga.
143. What is eventual consistency?
144. When is eventual consistency acceptable?
145. How do you guarantee idempotency?
146. Explain the Transactional Outbox pattern.
147. What is the Inbox pattern?
148. How would you ensure DB and event publishing remain consistent?

---

# 5. Kafka / Event-Driven Architecture

## Kafka Fundamentals

149. What problem does Kafka solve?
150. Kafka vs RabbitMQ.
151. Topic vs partition.
152. What is an offset?
153. What is a consumer group?
154. How does Kafka achieve scalability?
155. How does Kafka achieve ordering?
156. What happens when a consumer crashes?
157. What is consumer rebalancing?
158. How do you choose partition count?
159. What determines Kafka consumer throughput?

## Delivery Semantics

160. At-most-once vs at-least-once vs exactly-once.
161. Why can duplicate messages occur?
162. How do you build an idempotent consumer?
163. How do you handle out-of-order events?
164. How do you handle poison messages?
165. What is a Dead Letter Topic?
166. How do you retry Kafka messages?
167. Retry topic vs in-process retry.

## Kafka + Database

168. What happens if DB commit succeeds but Kafka publish fails?
169. What happens if Kafka publish succeeds but DB commit fails?
170. Explain Transactional Outbox.
171. Kafka transactions vs database transactions.
172. How do you prevent duplicate event processing?
173. How would you design an order event pipeline?

## Production Kafka

174. How would you troubleshoot consumer lag?
175. What causes consumer lag?
176. How do you increase consumer throughput?
177. How do you handle a slow consumer?
178. What happens when there are more consumers than partitions?
179. What is retention?
180. What is compaction?
181. When would you use compacted topics?
182. How do you evolve event schemas?
183. What is schema compatibility?
184. How do you monitor Kafka in production?

---

# 6. Spring Security

185. Authentication vs authorization.
186. Explain Spring Security filter chain.
187. How does JWT authentication work?
188. Where should JWT validation happen?
189. Access token vs refresh token.
190. OAuth2 vs JWT.
191. OAuth2 authorization code flow.
192. What is OpenID Connect?
193. Role-based vs permission-based authorization.
194. How do you secure microservice-to-microservice communication?
195. How do you handle token expiration?
196. How do you revoke tokens?
197. How do you protect APIs from CSRF?
198. CORS vs CSRF.
199. How do you secure actuator endpoints?
200. How do you prevent sensitive information from appearing in logs?
201. How would you implement method-level authorization?
202. How would you secure an API Gateway?

---

# 7. Docker

203. Why use containers?
204. VM vs container.
205. Image vs container.
206. Explain a Dockerfile.
207. `COPY` vs `ADD`.
208. `ENTRYPOINT` vs `CMD`.
209. What is a multi-stage Docker build?
210. How would you reduce image size?
211. How do containers communicate?
212. What is Docker networking?
213. How do you inject configuration into containers?
214. How do you handle secrets?
215. What happens when a container crashes?
216. How do you debug a container?
217. How would you containerize a Spring Boot application?
218. How do you make Java containers memory-aware?

---

# 8. Kubernetes

## Fundamentals

219. What problem does Kubernetes solve?
220. Pod vs container.
221. Deployment vs StatefulSet.
222. ReplicaSet vs Deployment.
223. Kubernetes Service.
224. ClusterIP vs NodePort vs LoadBalancer.
225. What is Ingress?
226. ConfigMap vs Secret.
227. Namespace.
228. Labels and selectors.

## Reliability

229. What happens when a Pod crashes?
230. Liveness vs readiness probe.
231. Startup probe.
232. Why can a bad readiness probe cause an outage?
233. How does Kubernetes perform rolling deployment?
234. Rolling vs Blue-Green vs Canary deployment.
235. What is PodDisruptionBudget?
236. How do you achieve high availability?
237. How do you autoscale workloads?
238. HPA vs VPA.
239. What is a resource request vs limit?
240. What happens when a container exceeds its memory limit?

## Production

241. How do you troubleshoot CrashLoopBackOff?
242. How do you troubleshoot OOMKilled?
243. How do you troubleshoot a service that is unreachable?
244. How do you inspect logs?
245. How do you perform zero-downtime deployment?
246. How would you scale a service during a traffic spike?
247. How do you manage configuration across environments?
248. How do you secure Kubernetes workloads?

---

# 9. Observability & Production Troubleshooting

249. Logging vs metrics vs tracing.
250. What is distributed tracing?
251. What are correlation IDs?
252. How do you trace a request across 10 microservices?
253. What metrics would you expose for a microservice?
254. What are the four golden signals?
255. How do you detect a memory leak?
256. How do you diagnose high CPU?
257. How do you diagnose high latency?
258. How do you diagnose database connection pool exhaustion?
259. How do you diagnose thread pool exhaustion?
260. How do you investigate sudden Kafka consumer lag?
261. How do you perform root-cause analysis after a production incident?
262. What should an effective alert contain?

---

# 10. System Design — 10-Year Level

263. Design an Order Management System.
264. Design a Payment Processing System.
265. Design a Notification System.
266. Design an E-commerce platform.
267. Design a URL shortener.
268. Design a distributed rate limiter.
269. Design a file upload/download service.
270. Design a ride-booking system.
271. Design a ticket booking system.
272. Design an event-driven order processing system.
273. Design a scalable authentication service.
274. Design a real-time notification system.

For each design, be prepared to discuss:

- Functional requirements
- Non-functional requirements
- Capacity estimation
- API design
- Data model
- Service boundaries
- Database choice
- Caching
- Messaging
- Consistency
- Availability
- Scalability
- Failure handling
- Security
- Observability
- Deployment
- Trade-offs

---

# 11. Generic Senior-Level Architecture Questions

275. Tell me about the most complex system you designed.
276. What architectural decision are you most proud of?
277. Tell me about an architecture decision that turned out to be wrong.
278. How do you decide between two technologies?
279. How do you evaluate whether a technology is production-ready?
280. How do you balance delivery speed with technical quality?
281. How do you handle technical debt?
282. How do you convince stakeholders to invest in technical improvements?
283. How do you review another team's architecture?
284. How do you handle disagreement with a principal/staff engineer?
285. How do you make architecture decisions when requirements are unclear?
286. How do you ensure architecture doesn't become over-engineered?
287. How do you communicate complex architecture to non-technical stakeholders?
288. How do you mentor senior engineers?
289. How do you influence teams without direct authority?
290. How do you handle an engineer who strongly disagrees with your design?

---

# 12. Real-World Scenario Questions

## Scenario 1 — Downstream Failure

**Question:** Order Service calls Payment Service, and Payment becomes slow.

Discuss:

- Timeout
- Retry
- Circuit breaker
- Bulkhead
- Fallback
- Monitoring
- Alerting
- Async alternatives

## Scenario 2 — Duplicate Kafka Event

**Question:** An order is created twice because the same Kafka event was processed twice.

Discuss:

- At-least-once delivery
- Idempotency
- Unique business key
- Inbox/idempotency table
- Consumer retry
- Offset management

## Scenario 3 — DB + Kafka Consistency

**Question:** Your application updates the DB and publishes an event. How do you guarantee consistency?

Discuss:

- Transactional Outbox
- DB transaction
- Outbox publisher
- Kafka
- Idempotent consumers
- Retry / DLQ

## Scenario 4 — Production Latency

**Question:** API latency suddenly increases from 200 ms to 5 seconds.

Your investigation should cover:

1. Metrics
2. Distributed traces
3. Application logs
4. Database latency
5. Connection pools
6. Thread pools
7. Downstream APIs
8. Kafka
9. CPU / memory / GC
10. Recent deployments

## Scenario 5 — Traffic Spike

**Question:** Traffic suddenly increases by 20x.

Discuss:

- Load balancing
- Horizontal scaling
- Kubernetes HPA
- Caching
- Rate limiting
- Queueing
- Database scaling
- Backpressure
- Graceful degradation

---

# 13. Coding Questions for 10 Years Experience

Even senior candidates should prepare coding.

### Easy / Medium

1. Check whether a string is a palindrome.
2. Find the first non-repeated character.
3. Find duplicate elements.
4. Find the second-highest number.
5. Reverse a linked list.
6. Detect a cycle in a linked list.
7. Merge two sorted arrays.
8. Implement a simple LRU cache.
9. Find the top K frequent elements.
10. Find the longest substring without repeating characters.

### Java-Specific

11. Implement an immutable class.
12. Implement a thread-safe singleton.
13. Implement a producer-consumer solution.
14. Use `CompletableFuture` to call two services in parallel.
15. Implement a simple rate limiter.
16. Implement a retry mechanism with exponential backoff.
17. Group employees by department using Streams.
18. Find the highest-paid employee per department.
19. Convert a list into a map safely when duplicate keys exist.
20. Explain the time and space complexity of your solution.

---

# 14. Behavioral / Leadership Questions

At 10 years, these can be as important as technical questions.

1. Tell me about yourself.
2. Describe your current project and your role.
3. What exactly do you own?
4. Tell me about a major production incident.
5. Tell me about a difficult technical decision.
6. Tell me about a failure.
7. Tell me about a conflict with another engineer.
8. Tell me about a conflict with a manager.
9. Tell me about a time you influenced architecture.
10. Tell me about a time you improved system performance.
11. Tell me about a time you reduced infrastructure cost.
12. Tell me about a time you mentored someone.
13. Tell me about a time you disagreed with requirements.
14. Tell me about a time you had to deliver under severe time pressure.
15. Why are you looking for a change?
16. Why should we hire you for a senior role?
17. What distinguishes a senior engineer from a mid-level engineer?
18. What is your biggest technical weakness?
19. What are you currently learning?
20. Where do you see yourself in 3–5 years?

---

# 15. Questions You Should Ask the Interviewer

A senior candidate should also interview the company.

Good questions:

1. What architectural problems is the team currently solving?
2. What are the biggest scalability challenges?
3. How much ownership does this role have over architecture?
4. How are architecture decisions made?
5. How frequently do engineers participate in design reviews?
6. What does production ownership look like?
7. What is the current deployment model?
8. How much of the platform is event-driven?
9. What are the biggest technical debts?
10. What would success look like in the first six months?

---

# 16. Highest-Priority Preparation

If you have limited preparation time, prioritize these.

### Tier 1 — Must Know

- Java concurrency
- Collections
- JVM / GC
- Spring Boot
- `@Transactional`
- REST API design
- Microservice boundaries
- API Gateway
- Resilience patterns
- Kafka
- Idempotency
- Saga
- Transactional Outbox
- Spring Security / JWT
- Docker
- Kubernetes fundamentals
- System design

### Tier 2 — Strongly Recommended

- Distributed tracing
- Observability
- Redis / caching
- Database indexing
- Optimistic locking
- gRPC
- Schema evolution
- Kubernetes troubleshooting
- CI/CD
- Cloud fundamentals

### Tier 3 — Architect-Level Differentiators

- Domain-Driven Design
- Event-driven architecture
- CAP theorem
- Consistency models
- Distributed locking
- Backpressure
- Rate limiting
- Multi-region architecture
- Disaster recovery
- Cost optimization
- Platform engineering
- Architecture governance

---

# 17. The Most Important Rule

For a 10-year interview, don't memorize definitions.

For every important technology, be able to answer these seven questions:

1. **What problem does it solve?**
2. **How does it work internally?**
3. **When would you use it?**
4. **When would you NOT use it?**
5. **What are the alternatives?**
6. **What can go wrong in production?**
7. **What did you personally implement?**

For example, don't stop at:

> "Kafka is a distributed event streaming platform."

Be ready to explain:

> "We used Kafka because the producer shouldn't have to wait for downstream consumers. The order event is published once the transaction succeeds. Consumers process it independently, and because delivery can be at least once, consumers are idempotent. We monitor consumer lag and use retry/DLQ handling for failures."

That is the level of thinking expected from a strong 10-year engineer.

---

# 18. Recommended Preparation Strategy

A practical sequence is:

**Week 1:** Java 8–17 + concurrency + JVM

**Week 2:** Spring + Spring Boot + REST + transactions

**Week 3:** Microservices + resilience + distributed transactions

**Week 4:** Kafka + event-driven architecture

**Week 5:** Spring Security + Docker + Kubernetes

**Week 6:** System design + production scenarios + behavioral interviews

For each topic:

**Learn → Explain without notes → Design → Code → Discuss failure scenarios → Explain a real project example**

The final goal is not to answer 300 questions independently.

The goal is to develop a **small set of deep mental models** that allow you to handle unfamiliar follow-up questions.
