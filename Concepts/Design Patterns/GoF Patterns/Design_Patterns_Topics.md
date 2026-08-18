# Design Patterns Reference

# Gang of Four (GoF) Design Patterns

## 1. Creational Patterns

-   Factory Method Pattern
-   Abstract Factory Pattern
-   Singleton Pattern
-   Prototype Pattern
-   Builder Pattern
-   Object Pool Pattern *(commonly included by some tutorials, but not
    one of the original GoF patterns)*

------------------------------------------------------------------------

## 2. Structural Patterns

-   Adapter Pattern
-   Bridge Pattern
-   Composite Pattern
-   Decorator Pattern
-   Facade Pattern
-   Flyweight Pattern
-   Proxy Pattern

------------------------------------------------------------------------

## 3. Behavioral Patterns

-   Chain of Responsibility Pattern
-   Command Pattern
-   Interpreter Pattern
-   Iterator Pattern
-   Mediator Pattern
-   Memento Pattern
-   Observer Pattern
-   State Pattern
-   Strategy Pattern
-   Template Pattern

------------------------------------------------------------------------

# J2EE Design Patterns

## Presentation Tier

-   Front Controller Pattern
-   Intercepting Filter Pattern
-   MVC (Model-View-Controller) Pattern

## Business Tier

-   Business Delegate Pattern
-   Service Locator Pattern

## Integration Tier

-   Data Access Object (DAO) Pattern
-   Transfer Object Pattern

## Persistence Tier

-   Composite Entity Pattern

## Other Enterprise Pattern

-   Null Object Pattern

------------------------------------------------------------------------

# Microservices Design Patterns

## 1. Decomposition Patterns

-   Decompose by Business Capability
-   Decompose by Subdomain (DDD)
-   Strangler Fig Pattern

## 2. Communication Patterns

### Synchronous

-   API Gateway Pattern
-   Backend for Frontend (BFF) Pattern
-   Aggregator Pattern

### Asynchronous

-   Event-Driven Architecture
-   Publish-Subscribe Pattern
-   Event Notification Pattern
-   Event-Carried State Transfer Pattern
-   Competing Consumers Pattern
-   Request-Reply Pattern

## 3. Data Management Patterns

-   Database per Service Pattern
-   Shared Database Pattern *(generally discouraged)*
-   Saga Pattern (Choreography)
-   Saga Pattern (Orchestration)
-   CQRS (Command Query Responsibility Segregation)
-   Event Sourcing
-   Transactional Outbox Pattern
-   Inbox Pattern
-   Idempotent Consumer Pattern
-   Materialized View Pattern

## 4. Resiliency Patterns

-   Circuit Breaker Pattern
-   Retry Pattern
-   Timeout Pattern
-   Bulkhead Pattern
-   Fallback Pattern
-   Rate Limiter Pattern
-   Throttling Pattern

## 5. Service Discovery Patterns

-   Client-Side Discovery
-   Server-Side Discovery
-   Service Registry Pattern

## 6. Deployment Patterns

-   Blue-Green Deployment
-   Canary Deployment
-   Rolling Deployment
-   Ring Deployment
-   Shadow Deployment
-   Feature Toggle (Feature Flag) Pattern

## 7. Observability Patterns

-   Distributed Tracing
-   Centralized Logging
-   Health Check Pattern
-   Metrics Collection
-   Correlation ID Pattern

## 8. Security Patterns

-   OAuth 2.0
-   OpenID Connect (OIDC)
-   JWT Authentication
-   API Key Authentication
-   Mutual TLS (mTLS)
-   Zero Trust Security

## 9. API Patterns

-   API Gateway
-   Backend for Frontend (BFF)
-   API Composition Pattern
-   GraphQL Gateway Pattern

## 10. Messaging Patterns

-   Message Broker Pattern
-   Dead Letter Queue (DLQ)
-   Retry Queue
-   Priority Queue
-   Event Streaming Pattern
-   Message Filtering Pattern

## 11. Configuration Patterns

-   Externalized Configuration
-   Centralized Configuration Server
-   Service Mesh Pattern

## 12. Infrastructure Patterns

-   Sidecar Pattern
-   Ambassador Pattern
-   Adapter Pattern
-   Init Container Pattern

## 13. Workflow Patterns

-   Orchestration Pattern
-   Choreography Pattern
-   Process Manager Pattern

## 14. Caching Patterns

-   Cache-Aside Pattern
-   Read-Through Cache
-   Write-Through Cache
-   Write-Behind Cache

## 15. Reliability Patterns

-   Leader Election Pattern
-   Lease Pattern
-   Distributed Lock Pattern
-   Idempotency Pattern

------------------------------------------------------------------------

# Recommended Study Order

1.  GoF Creational Patterns
2.  GoF Structural Patterns
3.  GoF Behavioral Patterns
4.  J2EE Design Patterns
5.  API Gateway
6.  Database per Service
7.  Saga
8.  CQRS
9.  Event Sourcing
10. Transactional Outbox
11. Circuit Breaker
12. Retry & Timeout
13. Service Discovery
14. Distributed Tracing
15. Sidecar & Service Mesh
16. Feature Toggle
17. Blue-Green, Canary, Rolling & Ring Deployments
