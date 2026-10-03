# AI Engineer Stack

This roadmap is designed for an experienced backend/software engineer transitioning into **AI Application Engineering**.

## 1. Core AI Engineering — Primary Focus

### Python
Learn enough Python to build and maintain production AI applications.

- Python fundamentals
- Type hints
- Virtual environments and dependency management
- Async programming
- Pydantic
- FastAPI
- HTTP clients and API integration
- Testing with pytest

### Python Web Frameworks

**FastAPI — Primary**

- REST API development
- Request/response models with Pydantic
- Dependency injection
- Async endpoints
- Authentication and authorization integration

**Django — Secondary / Optional**

Learn Django when building larger Python web applications that need features such as:

- ORM-heavy applications
- User management
- Admin interfaces
- Server-rendered applications
- Session-based applications

> **Priority:** FastAPI is more relevant to the AI application stack. Django is useful but should not distract from core AI engineering.

### LLM Application Development
Understand how modern LLM-powered applications are built.

- LLM APIs
- Prompt engineering
- Structured outputs
- Tool/function calling
- Context windows and token usage
- Model selection
- AI application evaluation
- Streaming responses
- Model fallbacks and routing

### RAG (Retrieval-Augmented Generation)
Build reliable applications that use external/private knowledge.

- Document ingestion
- Chunking
- Embeddings
- Vector databases
- Retrieval
- Reranking
- Context construction
- RAG evaluation
- Metadata filtering
- Access-controlled retrieval

### Agentic AI
Build multi-step, stateful AI workflows.

- LangChain
- LangGraph
- Tool use
- State management
- Multi-step workflows
- Human-in-the-loop
- Agent evaluation
- Agent/tool permissions
- Error handling and retries

---

## 2. AI Application Security

Security is a core requirement for production AI applications.

### Authentication & Identity

- OAuth 2.0
- OpenID Connect (OIDC)
- JWT
- Access tokens
- Refresh tokens
- Token expiration and validation
- Identity Providers (IdP)
- API keys

### Authorization

- RBAC
- Permissions
- OAuth scopes
- Resource-level authorization
- Service-to-service authorization
- Multi-tenant authorization

### API Security

- HTTPS / TLS
- CORS
- CSRF
- Rate limiting
- Input validation
- Secure headers
- Secrets management
- Secure configuration
- Dependency and vulnerability management

### AI-Specific Security

- Prompt injection
- Indirect prompt injection
- Sensitive data leakage
- PII protection
- RAG access control
- Tool/function authorization
- Agent permission boundaries
- Multi-tenant data isolation
- Excessive agency
- Secure handling of retrieved content

---

## 3. Backend Engineering — Existing Strength to Leverage

### Java / Spring
Continue using your existing backend expertise.

- Java
- Spring Boot
- Spring Web
- REST APIs
- Microservices
- Spring Security
- OAuth 2.0 / OIDC
- JWT

### Distributed Systems

- Kafka
- Event-driven architecture
- Messaging patterns
- Resilience and reliability
- Distributed transactions
- Idempotency

### Data

- PostgreSQL
- SQL
- Caching
- Vector databases for AI workloads
- Data modeling

> **Goal:** Do not relearn backend engineering. Apply your existing backend knowledge to AI systems.

---

## 4. AI System Architecture

This is the bridge between **AI Engineer** and **AI Architect**.

- AI application architecture
- API design
- Service boundaries
- RAG architecture
- Agent architecture
- Data flows
- Security architecture
- Identity and access management
- Scalability
- Reliability
- AI observability
- Cost optimization
- Evaluation and monitoring
- Multi-tenancy
- Data privacy
- Human-in-the-loop workflows

---

## 5. Cloud & Deployment

### Cloud

Focus deeply on **one cloud**, while remaining familiar with the others.

- Azure / AWS / GCP
- Managed AI services
- Storage
- Compute
- Databases
- Networking
- IAM
- Secrets management
- Key management
- Managed identity

### Containers & Delivery

- Docker
- CI/CD
- Infrastructure basics
- Environment management

### Kubernetes Ecosystem

Learn this as a deployment/platform capability rather than as the center of your AI learning.

- Kubernetes
- Helm
- ArgoCD
- GitOps
- Service configuration
- Secrets
- Ingress
- Autoscaling

---

## 6. Observability

Production AI systems need observability just like traditional distributed systems.

### Application Observability

- Logging
- Metrics
- Tracing
- OpenTelemetry
- Prometheus
- Grafana
- Distributed tracing

### AI Observability

- LLM latency
- Token usage
- Cost
- Model performance
- RAG retrieval quality
- Response quality
- Evaluation metrics
- Agent/tool execution
- Failure rates

---

## 7. Testing & Quality

AI applications require both traditional software testing and AI-specific evaluation.

### Software Testing

- Unit testing
- Integration testing
- API testing
- Contract testing
- End-to-end testing
- pytest
- Testcontainers

### AI Evaluation

- RAG evaluation
- Retrieval evaluation
- Response evaluation
- Hallucination detection
- Prompt regression testing
- Agent evaluation
- Evaluation datasets
- LLM-as-a-judge
- Offline and online evaluation

---

# Priority for You

Given your existing Java/backend experience:

### Deep expertise

- AI/LLM application development
- Python
- LLM APIs
- RAG
- LangChain
- LangGraph
- AI evaluation
- AI security
- AI system architecture
- Production AI engineering

### Leverage existing expertise

- Java
- Spring Boot
- Spring Security
- Microservices
- Kafka
- PostgreSQL
- REST
- Distributed systems
- Observability

### Supporting skills

- FastAPI
- Cloud
- Docker
- CI/CD
- Kubernetes
- Helm
- ArgoCD
- GitOps
- Django
- Python testing

---

# Target Profile

```
                 AI APPLICATION ENGINEER
                           │
       ┌───────────────────┼────────────────────┐
       │                   │                    │
     AI/LLM             Backend              Cloud
       │                   │                    │
    Python             Java/Spring        Azure/AWS/GCP
    LLM APIs           Microservices      Docker
    RAG                Kafka              CI/CD
    LangChain          REST               Kubernetes
    LangGraph          PostgreSQL         Helm
    Pydantic           Security           ArgoCD
    FastAPI            Distributed        GitOps
    Vector DB          Systems             Observability
       │                   │                    │
       └───────────────────┼────────────────────┘
                           │
                           ↓
                 AI APPLICATION SECURITY
                           │
          OAuth 2.0 / OIDC / JWT / RBAC
          RAG access control / AI security
                           │
                           ↓
                 AI SYSTEM ARCHITECTURE
                           │
                           ↓
                  AI ARCHITECT / FDE
```

## Recommended Learning Order

```
Python fundamentals
        ↓
FastAPI + Pydantic
        ↓
LLM APIs + fundamentals
        ↓
OAuth 2.0 / OIDC / JWT
        ↓
RAG
        ↓
LangChain
        ↓
LangGraph / Agentic AI
        ↓
AI security
        ↓
AI evaluation + observability
        ↓
Production AI architecture
        ↓
Cloud + deployment
        ↓
Advanced AI system design
```

> **The key principle:** Add AI engineering to your existing backend expertise rather than replacing your backend expertise.

> **Target outcome:** Become an engineer who can design, build, secure, deploy, observe, and scale production-grade AI applications.
