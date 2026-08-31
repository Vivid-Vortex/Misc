## Your question: Can you extend the above list by searching the popular questions asked in TCS on the internet?

**You're right on spot.** I searched recent TCS interview experiences, Glassdoor reports, LinkedIn posts, Reddit discussions, and TCS-related interview material, and compared those with **your actual resume**. 

The interesting part is that the recent reports are **very aligned with your profile**: Java + Spring Boot + Microservices + Kafka + SQL + Kubernetes/DevOps + scenario-based questions.

For example, a recent TCS interview experience for a **7+ year Java developer** specifically reported questions on Java 8, Spring Boot configuration/security, Kafka offset handling, microservice failure scenarios, distributed transactions, design patterns, Docker Compose, Jenkins and Kubernetes. ([LinkedIn][1]) Another TCS report explicitly mentions **Java basics, Java 8, Spring Boot internals, microservices, Saga and Circuit Breaker**. ([Glassdoor][2])

So I would **extend your previous preparation list considerably**.

---

# 1. 🔴 Core Java — TCS questions reported recently

Recent TCS interview reports mention questions around `ConcurrentHashMap`, `volatile`, threads, collections, Java 8 and JVM fundamentals. ([LinkedIn][3])

### Prepare these:

### Java fundamentals

1. What are JDK, JRE and JVM?
2. How does Java achieve platform independence?
3. Primitive vs wrapper classes.
4. What are the default values of primitive data types?
5. `==` vs `equals()`.
6. Why override `hashCode()` with `equals()`?
7. What happens if you override `equals()` but not `hashCode()`?
8. Why is String immutable?
9. String vs StringBuilder vs StringBuffer.
10. `final` vs `finally` vs `finalize()`.
11. Checked vs unchecked exceptions.
12. `throw` vs `throws`.
13. Overloading vs overriding.
14. Interface vs abstract class.
15. Composition vs inheritance.

### Collections

16. How does HashMap work internally?
17. What happens when two keys have the same hashcode?
18. What happens when HashMap reaches its capacity?
19. HashMap vs Hashtable.
20. HashMap vs ConcurrentHashMap.
21. ArrayList vs LinkedList.
22. HashSet vs TreeSet.
23. HashMap vs TreeMap.
24. Comparable vs Comparator.
25. Why can't HashMap guarantee ordering?

### Concurrency

26. What is `volatile`?

This is **specifically reported in TCS interview material**. ([LinkedIn][3])

27. `synchronized` vs `Lock`.
28. What is a race condition?
29. What is deadlock?
30. How do you prevent deadlock?
31. Thread lifecycle.
32. Thread vs Runnable.
33. Runnable vs Callable.
34. ExecutorService.
35. `execute()` vs `submit()`.
36. Future vs CompletableFuture.
37. ConcurrentHashMap internals.
38. AtomicInteger.
39. CountDownLatch vs CyclicBarrier.
40. What is thread starvation?

### Senior-level addition

41. What is the Java Memory Model?
42. What is happens-before?
43. What causes memory visibility problems?
44. How would you diagnose a thread deadlock in production?
45. How would you investigate high CPU in a Java application?

---

# 2. 🔴 Java 8 — HIGH PRIORITY

A recent TCS experience specifically reported a **Java 8 Stream coding question involving employee filtering and null last names**. ([LinkedIn][1])

Prepare:

46. Lambda expressions.
47. Functional interfaces.
48. Predicate.
49. Function.
50. Consumer.
51. Supplier.
52. Optional.
53. `map()` vs `flatMap()`.
54. `filter()`.
55. `reduce()`.
56. `collect()`.
57. `groupingBy()`.
58. `partitioningBy()`.
59. `findFirst()` vs `findAny()`.
60. Parallel streams.
61. Stream vs Collection.
62. Method references.
63. Default methods.
64. Static methods in interfaces.

### Coding

Expect simple-to-medium coding rather than extremely difficult DSA.

Examples:

```text
Find duplicate numbers
Find first non-repeating character
Count character frequency
Find second highest number
Sort employees
Group employees by department
Find duplicate employees
Reverse a string
Palindrome
Anagram
```

**For your DSA preparation, we'll continue using traditional loops rather than Streams**, because that's how you've asked me to approach your DSA problems.

---

# 3. 🔴 Spring Boot — very important

Recent TCS reports mention Spring Boot working, configuration, security, starters, annotations and transactions. ([LinkedIn][1])

Prepare:

65. What is Spring Boot?
66. Spring vs Spring Boot.
67. What does `@SpringBootApplication` do?
68. What is auto-configuration?
69. What are Spring Boot starters?
70. How does component scanning work?
71. `@Component` vs `@Service` vs `@Repository`.
72. `@Controller` vs `@RestController`.
73. How does Dependency Injection work?
74. Constructor injection vs field injection.
75. What is a Spring Bean?
76. Bean lifecycle.
77. Bean scopes.
78. Singleton vs prototype.
79. What is `@Configuration`?
80. What is `@Bean`?
81. What is Spring Boot Actuator?
82. How do you externalize configuration?
83. `application.properties` vs `application.yml`.
84. Profiles.
85. How do you configure different environments?

### Very important reported question

> **How do you handle configuration for different environments in Spring Boot?**

This was specifically reported in a recent TCS interview. ([LinkedIn][1])

---

# 4. 🔴 Spring Boot internals

Because you have **10+ years**, I would go beyond basic annotations.

86. How does Spring create a Bean?
87. What happens during Spring application startup?
88. What is BeanPostProcessor?
89. What is ApplicationContext?
90. BeanFactory vs ApplicationContext.
91. What is Spring AOP?
92. How does `@Transactional` work internally?
93. What is a Spring proxy?
94. JDK proxy vs CGLIB.
95. What is circular dependency?
96. How does Spring resolve dependencies?
97. What happens if two beans have the same type?
98. `@Primary` vs `@Qualifier`.
99. How do you improve Spring Boot startup time?

A recent TCS interview report specifically mentions **Spring Bean scopes, connection pooling and improving Spring Boot startup performance**. ([LinkedIn][4])

---

# 5. 🔴 REST API / Web Services

Prepare:

100. REST vs SOAP.
101. GET vs POST.
102. PUT vs PATCH.
103. Which HTTP methods are idempotent?
104. HTTP status codes.
105. 401 vs 403.
106. 400 vs 404.
107. 409 Conflict.
108. How do you handle API exceptions?
109. `@ControllerAdvice`.
110. API versioning.
111. Pagination.
112. Sorting.
113. Filtering.
114. Request validation.
115. Authentication vs authorization.
116. JWT.
117. OAuth2.
118. How do you secure REST APIs?
119. How do you prevent duplicate requests?
120. How would you design an idempotent payment API?

---

# 6. 🔴 Microservices — one of your biggest areas

A TCS microservices interview source specifically lists **distributed transactions, Saga, idempotency, eventual consistency, OAuth2, JWT, resource servers and inter-service communication**. ([javacodemonk.com][5])

Prepare:

121. Why microservices?
122. Monolith vs microservices.
123. How should services communicate?
124. REST vs Kafka communication.
125. Synchronous vs asynchronous communication.
126. Service discovery.
127. API Gateway.
128. Load balancing.
129. Circuit breaker.
130. Retry.
131. Timeout.
132. Bulkhead.
133. Rate limiting.
134. Distributed transaction.
135. Saga pattern.
136. Saga orchestration vs choreography.
137. Eventual consistency.
138. Idempotency.
139. Distributed locking.
140. Correlation ID.
141. Centralized configuration.
142. Centralized logging.
143. Distributed tracing.

### Extremely important

TCS has specifically been reported to ask:

> **A → B → C, where C is down. How do you keep A and B running?**

This exact type of failure scenario was reported recently. ([LinkedIn][1])

Think:

```text
A
↓
B
↓
C ❌
```

You should discuss:

```text
Timeout
Circuit Breaker
Fallback
Retry
Bulkhead
Async communication
Failure isolation
```

---

# 7. 🔴 Saga Pattern

Don't just know the definition.

Expect:

> "Explain Saga with an example."

Use a simple banking example:

```text
Transfer
   ↓
Debit Account
   ↓
Credit Account
   ↓
Send Notification
```

What if:

```text
Debit ✅
Credit ❌
```

How do you compensate?

That leads to:

> What is a compensating transaction?

Then:

> Orchestration vs choreography?

Then:

> Why not use 2-phase commit?

This is exactly the type of progression I'd expect in your interview, especially because **Saga and distributed transactions have appeared in TCS interview reports**. ([Glassdoor][2])

---

# 8. 🔴 Kafka — VERY HIGH PRIORITY for you

Your resume prominently mentions Kafka, and recent TCS interview experiences specifically report Kafka questions. ([Glassdoor][6])

Prepare:

143. What is Kafka?
144. Broker.
145. Topic.
146. Partition.
147. Producer.
148. Consumer.
149. Consumer group.
150. Offset.
151. Bootstrap server.
152. Why partitions?
153. How does Kafka maintain ordering?
154. How does consumer group work?
155. What happens when consumer crashes?
156. What is consumer lag?
157. What is rebalancing?
158. At-most-once.
159. At-least-once.
160. Exactly-once.
161. How do you handle duplicate messages?
162. How do you make consumers idempotent?
163. Retry mechanism.
164. Dead Letter Topic.
165. Partition key.
166. Producer acknowledgement.
167. Producer retries.
168. Kafka serialization/deserialization.
169. Kafka retention.
170. Kafka vs RabbitMQ.
171. Kafka vs ActiveMQ.

### 🔥 Very important reported scenario

A recent TCS interview specifically mentioned:

> **Kafka consumer processed the message but the offset wasn't committed — credit-card scenario.** ([LinkedIn][1])

You should be able to explain:

```text
Kafka
 ↓
Consumer
 ↓
Process payment
 ↓
DB update SUCCESS
 ↓
Application crashes
 ↓
Offset NOT committed
 ↓
Message comes again
```

Therefore:

> **How do you prevent duplicate payment?**

Answer direction:

**Idempotency + transaction design + unique transaction ID.**

This is especially relevant to a BFSI client.

---

# 9. 🔴 Reactive Programming / WebFlux

This isn't as prominently represented in the TCS reports I found as Kafka/Microservices, **but it is prominent in your resume**, so I'd still prepare it deeply.

172. What is reactive programming?
173. Spring MVC vs WebFlux.
174. Blocking vs non-blocking.
175. Mono.
176. Flux.
177. `map()` vs `flatMap()`.
178. `flatMap()` vs `concatMap()`.
179. Backpressure.
180. Scheduler.
181. Event loop.
182. What happens if blocking code runs in WebFlux?
183. `boundedElastic`.
184. Error handling.
185. Retry.
186. Timeout.
187. How do you debug a reactive application?

### Most dangerous question for your resume

> **"You are using WebFlux. Is your entire application non-blocking?"**

You should answer:

**Not necessarily.**

WebFlux can still become blocking if you call blocking APIs such as traditional JDBC or blocking HTTP clients.

That's exactly the kind of question that distinguishes someone who has **used WebFlux** from someone who **understands reactive architecture**.

---

# 10. 🔴 Database / SQL

Recent TCS interview reports mention SQL/database questions, including indexing. ([interviewyatra.com][7])

Prepare:

188. Primary key vs unique key.
189. Index.
190. Clustered vs non-clustered index.
191. Composite index.
192. When does an index not help?
193. How do you optimize a slow query?
194. Explain execution plan.
195. Joins.
196. Inner vs left join.
197. Group By.
198. Having vs Where.
199. Subquery.
200. CTE.
201. Window functions.
202. Normalization.
203. ACID.
204. Transactions.
205. Isolation levels.
206. Dirty read.
207. Non-repeatable read.
208. Phantom read.
209. Deadlock.
210. Connection pooling.

### Recent TCS-style scenario

> **"How will you make database data fetching faster?"**

One recent candidate reported answering **indexing**, followed by a question about primary vs secondary indexes. ([Reddit][8])

---

# 11. 🔴 BFSI-specific questions I would add

These aren't necessarily "TCS questions" specifically; these are **my recommendation based on the likely BFSI client + your backend profile**.

Prepare these very seriously:

211. Design a money transfer API.
212. How do you prevent duplicate payment?
213. What happens if the user clicks Pay twice?
214. What happens if the network disconnects after payment?
215. How do you determine whether payment succeeded?
216. How do you implement idempotency?
217. How do you maintain transaction consistency?
218. How do you handle partial failure?
219. How would you design transaction reconciliation?
220. How would you audit financial transactions?
221. How do you secure customer data?
222. Authentication vs authorization.
223. JWT vs OAuth2.
224. How do you prevent unauthorized access?
225. How do you handle sensitive information in logs?
226. How would you design transaction history?
227. How would you handle high-volume transactions?
228. How would you scale during peak banking hours?
229. How do you handle duplicate Kafka messages for payments?
230. How do you guarantee transaction processing exactly once from a business perspective?

---

# 12. 🔴 Kubernetes / Docker / DevOps

Recent TCS interview reports specifically mention Docker, Jenkins, CI/CD and Kubernetes. ([LinkedIn][1])

Prepare:

231. Docker vs Kubernetes.
232. Docker image vs container.
233. Dockerfile.
234. Kubernetes Pod.
235. Deployment.
236. Service.
237. ConfigMap.
238. Secret.
239. Ingress.
240. Readiness probe.
241. Liveness probe.
242. Rolling deployment.
243. HPA.
244. Resource requests and limits.
245. What happens when a pod crashes?
246. How do you troubleshoot CrashLoopBackOff?
247. How do you troubleshoot a pod that is running but API isn't accessible?
248. How do you perform zero-downtime deployment?

### Very interesting recent TCS question

A recent TCS interview reportedly asked:

> **How do you perform Kubernetes deployment without dropping active connections while allowing new connections appropriately?** ([LinkedIn][1])

For your profile, definitely prepare:

```text
Readiness Probe
+
Graceful Shutdown
+
Connection Draining
+
Rolling Update
+
Termination Grace Period
```

---

# 13. 🟠 Spring Security

A recent TCS interview specifically reported:

> **How do you secure Spring Boot endpoints?**

and another TCS microservices source goes into OAuth2, JWT and resource servers. ([LinkedIn][1])

Prepare:

249. Authentication vs authorization.
250. JWT.
251. OAuth2.
252. Access token.
253. Refresh token.
254. Resource server.
255. Authorization server.
256. JWT validation.
257. What information should be inside JWT?
258. How does Spring Security filter chain work?
259. How do you secure specific endpoints?
260. Role vs authority.
261. Token expiration.
262. How do microservices authenticate each other?

---

# 14. 🟠 CI/CD

Prepare:

263. What is CI/CD?
264. Explain your pipeline.
265. Jenkins vs GitHub Actions.
266. What does Argo CD do?
267. What is GitOps?
268. Why use Argo CD if GitHub Actions can deploy?
269. Docker image lifecycle.
270. Blue-green deployment.
271. Canary deployment.
272. Rolling deployment.
273. How do you rollback a deployment?
274. What happens if production deployment fails?

---

# 15. 🟠 Observability

Because this is explicitly on your resume, prepare:

275. Logging vs monitoring vs tracing.
276. Metrics.
277. Distributed tracing.
278. OpenTelemetry.
279. Jaeger.
280. Trace vs span.
281. Correlation ID.
282. How do you trace one request across multiple microservices?
283. How do you find the slowest service?
284. How would you troubleshoot production latency?

---

# 16. 🟠 Production troubleshooting

This is where I think **your 10+ years of experience will matter most**.

Prepare scenarios like:

285. API suddenly became slow.
286. CPU suddenly reaches 90%.
287. Memory suddenly increases.
288. Application starts throwing OutOfMemoryError.
289. Kafka consumer lag increases.
290. Database connections are exhausted.
291. One microservice is unavailable.
292. One downstream API is slow.
293. Requests are timing out.
294. Kubernetes pod keeps restarting.
295. Deployment succeeded but API isn't working.
296. Users are receiving duplicate transactions.
297. Application works locally but fails in production.
298. Production issue occurs at 2 AM — what do you do?

---

# 17. 🔥 TCS "scenario chain" questions

This is something I want you to practice specifically.

The interviewer may start with a simple question and keep going deeper.

### Example

**Interviewer:**

> How do you implement Kafka?

You answer.

Then:

> What happens if consumer crashes?

Then:

> What happens if DB update succeeds but offset commit fails?

Then:

> How do you prevent duplicate transactions?

Then:

> How would you handle that for a credit-card transaction?

Then:

> Would you use distributed transactions?

Then:

> What about Saga?

This style is visible in recent TCS interview reports, particularly around Kafka and microservices. ([LinkedIn][1])

### Another chain

> What is Circuit Breaker?

↓

> Why do you need it?

↓

> A → B → C and C is down. What happens?

↓

> How do you prevent cascading failure?

↓

> What happens when C comes back?

↓

> How do you configure retries?

---

# 18. 🔥 TCS + your resume = these are my top 30

If your interview were **tomorrow**, I'd prioritize these:

|  # | Question                       | Priority |
| -: | ------------------------------ | -------- |
|  1 | HashMap internals              | 🔴       |
|  2 | equals/hashCode                | 🔴       |
|  3 | ConcurrentHashMap              | 🔴       |
|  4 | volatile                       | 🔴       |
|  5 | ExecutorService                | 🔴       |
|  6 | Java 8                         | 🔴       |
|  7 | Spring Boot auto-configuration | 🔴       |
|  8 | Spring Bean lifecycle          | 🔴       |
|  9 | `@Transactional`               | 🔴       |
| 10 | REST API design                | 🔴       |
| 11 | Microservices architecture     | 🔴       |
| 12 | Circuit Breaker                | 🔴       |
| 13 | Saga                           | 🔴       |
| 14 | Distributed transaction        | 🔴       |
| 15 | Idempotency                    | 🔴       |
| 16 | Eventual consistency           | 🔴       |
| 17 | Kafka partitions               | 🔴       |
| 18 | Kafka consumer groups          | 🔴       |
| 19 | Kafka offset                   | 🔴       |
| 20 | Kafka duplicate message        | 🔴       |
| 21 | Kafka ordering                 | 🔴       |
| 22 | WebFlux vs MVC                 | 🔴       |
| 23 | Blocking vs non-blocking       | 🔴       |
| 24 | SQL indexing                   | 🔴       |
| 25 | Transaction/isolation          | 🔴       |
| 26 | Kubernetes deployment          | 🟠       |
| 27 | CI/CD + Argo CD                | 🟠       |
| 28 | Spring Security/JWT            | 🟠       |
| 29 | Distributed tracing            | 🟠       |
| 30 | BFSI payment system design     | 🔴       |

---

# 19. One thing I noticed from the recent TCS questions

There is a **clear pattern**.

Older-style preparation:

> "What is Kafka?"

Recent/senior-level preparation:

> **"A Kafka consumer processed a credit-card transaction but crashed before committing the offset. What happens?"** ([LinkedIn][1])

Older:

> "What is Kubernetes?"

Recent:

> **"How do you deploy without dropping existing connections?"** ([LinkedIn][1])

Older:

> "What is microservices?"

Recent:

> **"A → B → C, C is down. How do you keep A and B running?"** ([LinkedIn][1])

That's exactly why **I would not prepare you like a 3–4 year Java developer.**

---

# 20. What I think TCS will focus on in YOUR case

Based on the intersection of:

**your resume** + **recent TCS interview reports** + **your 10+ years experience**, I'd estimate the interview emphasis roughly like this:

```text
                YOUR PREPARATION
                     │
        ┌────────────┴────────────┐
        │                         │
   TECHNICAL                  SCENARIOS
        │                         │
 Java/Spring                  Production
        │                         │
 Microservices              Distributed systems
        │                         │
 Kafka                       BFSI transactions
        │                         │
 WebFlux                     Failure handling
        │                         │
 SQL/K8s                     System Design
```

And I found a particularly relevant recent TCS job posting for **5–10 years Java/Spring Boot/Microservices**, where Java 8, Spring Boot and Microservices are primary skills, with SQL/database as secondary and cloud deployment expected. ([LinkedIn][9])

That is **very close to your profile**.

### My recommendation

Don't try to memorize this 300-question list.

Instead, I suggest we turn this into a **TCS BFSI Interview Master Plan**:

**Phase 1:** Core Java — ~40 questions
**Phase 2:** Spring Boot — ~40
**Phase 3:** Microservices — ~40
**Phase 4:** Kafka — ~30
**Phase 5:** WebFlux — ~25
**Phase 6:** SQL/DB — ~25
**Phase 7:** Kubernetes/DevOps — ~25
**Phase 8:** BFSI/System Design — ~20
**Phase 9:** Production scenarios — ~20
**Phase 10:** Leadership/managerial — ~15

For **each question**, we can prepare the answer in the style:

> **Simple answer → Real-world example → Interview answer → Follow-up questions → Tricky point**

That would be much more useful for your upcoming interview than a giant question dump.

**Sources I used:** recent TCS candidate reports on LinkedIn/Glassdoor, TCS-focused interview resources, and recent candidate discussions on Reddit; these are anecdotal interview reports, not an official TCS question bank. ([LinkedIn][1])

I can also keep the preparation tightly aligned to **your resume rather than generic TCS questions**, which I think is the better strategy for a 10+ year candidate.

[1]: https://www.linkedin.com/posts/saikumar-medishetti-604500121_java-springboot-microservices-activity-7450934872723955712-akSr?utm_source=chatgpt.com "Java Developer Interview Questions at TCS HYD | Saikumar Medishetti posted on the topic | LinkedIn"
[2]: https://www.glassdoor.com/Interview/Overall-experience-was-good-They-asked-Java-basic-questions-java-8-concepts-spring-boot-working-micro-services-relate-QTN_8253688.htm?utm_source=chatgpt.com "Tata Consultancy Services Interview Question: Overall experience was good. They asked Java basic questions, java 8 concepts, spring boot working, micro services related questions, SAGA pattern and circuit breaker. | Glassdoor"
[3]: https://www.linkedin.com/posts/yedulal-bhoi-3345a8254_javainterview-springboot-javadeveloper-activity-7363225225691369472--QPa?utm_source=chatgpt.com "TCS Java/Spring Boot Interview Questions | Rohit Bhoi posted on the topic | LinkedIn"
[4]: https://www.linkedin.com/posts/bibhudatta-behera-0b6bba225_java-springboot-microservices-activity-7476933944920428544-KAEu?utm_source=chatgpt.com "TCS Java Full Stack Developer Interview Experience | Bibhudatta Behera posted on the topic | LinkedIn"
[5]: https://www.javacodemonk.com/tcs-microservices-interview-questions-for-java-developers-d9d2af01?utm_source=chatgpt.com "TCS - Microservices Interview Questions for Java Developers"
[6]: https://www.glassdoor.co.in/Interview/Java-spring-boot-microservices-Kafka-QTN_6939704.htm?utm_source=chatgpt.com "TCS Interview Question: Java spring boot microservices Kafka | Glassdoor"
[7]: https://www.interviewyatra.com/2025/05/tcs-java-interview-java-spring-boot-microservices.html?utm_source=chatgpt.com "TCS Java Interview | Java | Spring Boot | Microservices | Database"
[8]: https://www.reddit.com/r/PlacementsPrep/comments/1uylmgv/tcs_prime_interview_experience_2026_8th_july/?utm_source=chatgpt.com "Tcs prime interview experience 2026 8th July"
[9]: https://in.linkedin.com/jobs/view/java-spring-boot-microservices-aws-walk-in-drive-22nd-august-2026-saturday-at-tata-consultancy-services-4455193500?utm_source=chatgpt.com "Java Spring Boot Microservices AWS_ Walk IN Drive_ 22nd August 2026 (Saturday) at Tata Consultancy Services — Chennai, Tamil Nadu, India | LinkedIn Jobs"
