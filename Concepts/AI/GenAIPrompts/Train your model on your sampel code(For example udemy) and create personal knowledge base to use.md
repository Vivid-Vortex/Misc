# Global Engineering Knowledge Extraction Agent

## Objective

Analyze the **current repository** and extract reusable software engineering knowledge, patterns, conventions, architectural decisions, implementation techniques, and best practices.

Store this knowledge in a **global local knowledge base outside the current repository** so that the knowledge can be reused when analyzing and generating code for future repositories.

This prompt may be executed from **any repository**.

The knowledge base must continuously evolve:

```text
Repository A
    ↓
Extract knowledge
    ↓
Global Knowledge Base
    ↑
Repository B
    ↓
Extract new knowledge
    ↓
Merge / update
    ↑
Repository C
    ↓
Extract new knowledge
```

The objective is to create a **persistent global engineering knowledge layer** that can be used by an AI coding agent across any local project.

Do **not** train or fine-tune the underlying LLM unless explicitly requested.

---

# 1. Global Knowledge Base Location

Use a single global directory on the local machine.

Preferred location:

```text
C:\AI\global-engineering-knowledge\
```

If this directory does not exist:

1. Create it.
2. Initialize the knowledge-base structure.
3. Analyze the current repository.
4. Add the extracted knowledge.

If it already exists:

1. Read the existing knowledge.
2. Understand its current structure.
3. Analyze the current repository.
4. Add only genuinely new or improved knowledge.
5. Do not unnecessarily duplicate existing information.

If the operating system is not Windows, use an equivalent location such as:

```text
~/AI/global-engineering-knowledge/
```

---

# 2. IMPORTANT: Register the Global Knowledge Base With the AI Agent

After creating or locating the global knowledge base, configure the AI coding agent so that it knows about this location for **future coding tasks**.

The objective is:

```text
Global Knowledge Base
        ↓
Global AI Instructions
        ↓
Any Local Repository
        ↓
AI Coding Agent
        ↓
Consult Global Knowledge
        ↓
Generate Code
```

The agent must determine which global instruction/configuration mechanism is applicable to the environment in which this prompt is being executed.

Examples may include:

```text
Claude Code
    → global/user-level Claude instructions

GitHub Copilot
    → supported global/user-level custom instructions

Other AI coding agents
    → their equivalent global instruction mechanism
```

Do not assume that every AI tool uses the same configuration file.

First identify the appropriate mechanism supported by the current environment.

---

## 2.1 Global Instruction Requirement

The global instruction/configuration should contain a concise instruction equivalent to:

```text
GLOBAL ENGINEERING KNOWLEDGE

A persistent engineering knowledge base is available at:

C:\AI\global-engineering-knowledge\

When generating, modifying, reviewing, or refactoring code:

1. Check this knowledge base for relevant engineering patterns and conventions.
2. Use relevant knowledge when it applies to the current task.
3. Combine global knowledge with the current project's existing architecture and conventions.
4. Prefer the current project's established patterns when they intentionally differ from generic global knowledge.
5. Do not blindly apply a pattern if it conflicts with the current project's requirements.
6. Do not treat every entry as an absolute rule; evaluate the context.
```

For non-Windows systems, use the actual configured global knowledge-base path.

---

# 2.2 Do Not Overwrite Existing Global Instructions

If a global instruction file already exists:

```text
READ
  ↓
UNDERSTAND
  ↓
CHECK WHETHER KNOWLEDGE-BASE CONFIGURATION EXISTS
  ↓
ADD ONLY IF MISSING
```

Do **not** replace the user's existing instructions.

Do not delete or modify unrelated configuration.

Do not create duplicate instructions.

For example, if this already exists:

```text
Always use simple TypeScript.

Prefer readable code.

Avoid unnecessary abstractions.
```

append the global knowledge instruction after the existing content.

---

# 2.3 Make the Configuration Idempotent

Running this prompt multiple times must be safe.

For example:

### First execution

```text
Global instruction
    +
Knowledge-base path
```

### Second execution

The agent should detect that the path is already registered and **not add it again**.

Do not create:

```text
C:\AI\global-engineering-knowledge\
C:\AI\global-engineering-knowledge\
C:\AI\global-engineering-knowledge\
```

or duplicate instructions.

---

# 2.4 Verify the Registration

After configuring the global instruction mechanism, verify that:

1. The global knowledge path exists.
2. The global instruction references the correct path.
3. The instruction tells the AI agent to consult the knowledge base before generating code.
4. Existing global instructions were preserved.
5. No duplicate configuration was introduced.

Report the configuration that was created or updated.

---

# 3. Knowledge Base Structure

Organize the knowledge hierarchically.

Use this structure:

```text
global-engineering-knowledge/
│
├── README.md
│
├── frontend/
│   │
│   ├── README.md
│   │
│   ├── react/
│   │   ├── README.md
│   │   │
│   │   ├── fundamentals/
│   │   │   ├── components.md
│   │   │   ├── props.md
│   │   │   ├── state.md
│   │   │   ├── hooks.md
│   │   │   └── rendering.md
│   │   │
│   │   ├── react-router/
│   │   │   ├── README.md
│   │   │   ├── routing.md
│   │   │   ├── loaders.md
│   │   │   ├── actions.md
│   │   │   └── forms.md
│   │   │
│   │   ├── state-management/
│   │   │   ├── README.md
│   │   │   └── patterns.md
│   │   │
│   │   ├── data-fetching/
│   │   │   ├── README.md
│   │   │   ├── fetch.md
│   │   │   ├── axios.md
│   │   │   └── tanstack-query.md
│   │   │
│   │   ├── forms/
│   │   │   ├── README.md
│   │   │   └── patterns.md
│   │   │
│   │   ├── testing/
│   │   │   └── patterns.md
│   │   │
│   │   └── architecture/
│   │       └── patterns.md
│   │
│   ├── typescript/
│   │   ├── README.md
│   │   ├── fundamentals.md
│   │   ├── react-patterns.md
│   │   └── advanced.md
│   │
│   ├── css/
│   │   ├── README.md
│   │   ├── fundamentals.md
│   │   ├── tailwind.md
│   │   └── responsive-design.md
│   │
│   └── general/
│       ├── architecture.md
│       ├── components.md
│       └── testing.md
│
├── backend/
│   │
│   ├── README.md
│   │
│   ├── java/
│   │   ├── README.md
│   │   ├── fundamentals/
│   │   ├── collections/
│   │   ├── concurrency/
│   │   └── design-patterns/
│   │
│   ├── spring/
│   │   ├── README.md
│   │   ├── spring-core/
│   │   ├── spring-boot/
│   │   ├── spring-mvc/
│   │   ├── spring-data/
│   │   ├── spring-security/
│   │   └── webflux/
│   │
│   ├── microservices/
│   │   ├── README.md
│   │   ├── architecture.md
│   │   ├── communication.md
│   │   ├── resilience.md
│   │   └── observability.md
│   │
│   ├── kafka/
│   │   ├── README.md
│   │   ├── producers.md
│   │   ├── consumers.md
│   │   └── patterns.md
│   │
│   └── testing/
│       └── patterns.md
│
├── databases/
│   ├── sql/
│   ├── nosql/
│   └── data-modeling/
│
├── cloud/
│   ├── aws/
│   ├── azure/
│   └── gcp/
│
├── devops/
│   ├── docker/
│   ├── kubernetes/
│   ├── helm/
│   ├── argocd/
│   └── ci-cd/
│
├── architecture/
│   ├── system-design/
│   ├── distributed-systems/
│   ├── scalability/
│   ├── security/
│   └── observability/
│
└── cross-cutting/
    ├── testing.md
    ├── logging.md
    ├── error-handling.md
    ├── security.md
    ├── performance.md
    └── code-quality.md
```

Do not create every directory immediately.

Create directories/files **only when useful knowledge for that category actually exists**.

---

# 4. Technology Hierarchy

Knowledge must be organized from **general → specific**.

For example:

```text
Frontend
   ↓
React
   ↓
React Router
   ↓
React Router Forms
   ↓
Form Actions
```

Similarly:

```text
Frontend
   ↓
React
   ↓
Data Fetching
   ↓
TanStack Query
   ↓
Query Invalidation
```

Backend:

```text
Backend
   ↓
Java
   ↓
Spring
   ↓
Spring Boot
   ↓
Spring Data JPA
   ↓
Hibernate
```

Another example:

```text
Backend
   ↓
Microservices
   ↓
Kafka
   ↓
Consumers
   ↓
Concurrency / Partitioning
```

The hierarchy should reflect the actual technology relationship.

---

# 5. Knowledge Levels

Classify extracted knowledge into levels where appropriate.

Use:

```text
Level 1 → Fundamentals
Level 2 → Core Usage
Level 3 → Production Patterns
Level 4 → Advanced Patterns
Level 5 → Architecture / Expert
```

For example:

```text
React
│
├── Level 1 - Fundamentals
│   ├── Components
│   ├── JSX
│   ├── Props
│   └── State
│
├── Level 2 - Core Usage
│   ├── Hooks
│   ├── Context
│   └── Routing
│
├── Level 3 - Production
│   ├── Data Fetching
│   ├── Error Handling
│   ├── Forms
│   └── Testing
│
├── Level 4 - Advanced
│   ├── Performance
│   ├── Advanced State Management
│   └── Advanced Routing
│
└── Level 5 - Architecture
    ├── Application Architecture
    ├── Scalability
    └── Design Decisions
```

Do not artificially force a concept into a level if the distinction is not meaningful.

---

# 6. Analyze the Current Repository

Before writing anything to the global knowledge base:

### Step 1 — Identify the technology stack

Inspect:

```text
package.json
pom.xml
build.gradle
requirements.txt
go.mod
Dockerfile
docker-compose.yml
README.md
configuration files
source directories
test directories
CI/CD configuration
```

Determine:

```text
Frontend technologies
Backend technologies
Database technologies
Cloud technologies
Messaging technologies
Testing technologies
Build tools
Deployment technologies
Observability technologies
```

---

# 7. Analyze Existing Code

Do not only inspect configuration files.

Inspect representative source code.

Look for:

```text
Architecture
Design patterns
Naming conventions
Folder structure
Component structure
API patterns
Error handling
Validation
Logging
Testing
Dependency injection
State management
Data fetching
Security
Performance
Caching
Concurrency
Database access
Messaging
Deployment
Observability
```

Identify patterns that are actually demonstrated by the code.

---

# 8. Separate Reusable Knowledge From Project-Specific Details

This is extremely important.

### Reusable

```text
Controllers should not contain business logic.

Use service layer for business logic.

Use constructor injection.

Use centralized exception handling.
```

### Project-specific

```text
The Order API uses port 8085.

The company name is XYZ.

The database password is stored in environment variable ABC.

Customer ID 12345 belongs to John.
```

Do **NOT** store project-specific secrets, credentials, tokens, passwords, API keys, personal data, or irrelevant business data.

Focus on reusable engineering knowledge.

---

# 9. Identify Patterns

Look for recurring patterns.

For example:

```text
Controller
    ↓
Service
    ↓
Repository
```

or:

```text
React Component
    ↓
Custom Hook
    ↓
TanStack Query
    ↓
API
```

or:

```text
Kafka Producer
    ↓
Topic
    ↓
Consumer
    ↓
Service
```

Record the pattern and explain:

1. What it is.
2. Why it is used.
3. When it should be used.
4. When it should not be used.
5. A minimal representative example.
6. The source project where it was observed.

---

# 10. Merge With Existing Knowledge

Before adding new knowledge:

```text
Read existing knowledge
        ↓
Compare with current repository
        ↓
Is this already known?
        │
       YES
        ↓
Improve only if the new information adds value

       NO
        ↓
Add new knowledge
```

Do not create duplicate documents such as:

```text
react-forms.md
react-forms-2.md
react-forms-new.md
react-forms-final.md
```

Maintain a single authoritative document for each concept.

---

# 11. Improve Existing Knowledge

If the current repository demonstrates a better or more complete implementation, update the existing knowledge.

For example:

Existing:

```text
Use TanStack Query for server state.
```

New repository demonstrates:

```text
Use query keys consistently.
Invalidate related queries after mutations.
Use staleTime appropriately.
Avoid unnecessary refetches.
```

Update the knowledge:

```text
TanStack Query
├── Server state
├── Query keys
├── Cache invalidation
├── staleTime
└── Mutation patterns
```

Do not simply append duplicate paragraphs.

---

# 12. Preserve Multiple Valid Approaches

Do not assume that one repository's approach is universally correct.

For example:

```text
Forms

Approach A:
React Router Form

Approach B:
React Hook Form

Approach C:
Controlled React form
```

Record:

```text
When to use A
When to use B
When to use C
```

The knowledge base should represent **engineering decisions**, not blindly enforce one technology.

---

# 13. Track Confidence

When useful, classify knowledge as:

```text
Observed
```

Meaning the pattern was directly observed in the repository.

```text
Common Pattern
```

Meaning the pattern is observed across multiple repositories.

```text
Project-Specific
```

Meaning it should not automatically be treated as a global recommendation.

Do not turn a single unusual implementation into a global rule.

---

# 14. Maintain Source References

For each important pattern, record where it was observed.

Example:

```markdown
## Custom Hook for Server Data

### Pattern

Components delegate server-data fetching to a custom hook.

### Example

`src/features/products/hooks/useProducts.ts`

### Observed In

- ecommerce-app
- admin-dashboard

### Notes

This separates UI concerns from data-fetching concerns.
```

Do not store unnecessary full source files.

Store concise examples or references to the relevant implementation.

---

# 15. Create a Global Index

Maintain:

```text
global-engineering-knowledge/README.md
```

It should contain an index such as:

```markdown
# Global Engineering Knowledge

## Frontend

### React

- Fundamentals
- Hooks
- Components
- React Router
- Forms
- Data Fetching
- State Management
- Testing

### TypeScript

- Fundamentals
- React patterns
- Advanced patterns

### CSS

- Fundamentals
- Tailwind
- Responsive design

---

## Backend

### Java

- Fundamentals
- Collections
- Concurrency
- Design Patterns

### Spring

- Spring Boot
- Spring MVC
- Spring Data
- Spring Security
- WebFlux

### Microservices

- Communication
- Resilience
- Observability

### Kafka

- Producers
- Consumers
- Concurrency
- Error handling

---

## DevOps

- Docker
- Kubernetes
- Helm
- ArgoCD
- CI/CD

---

## Architecture

- System Design
- Distributed Systems
- Scalability
- Security
- Observability
```

Update this index whenever new knowledge categories are added.

---

# 16. React-Specific Organization

React knowledge should be particularly granular.

Use approximately:

```text
Frontend
└── React
    │
    ├── Fundamentals
    │
    ├── Components
    │
    ├── Props
    │
    ├── State
    │
    ├── Hooks
    │
    ├── Effects
    │
    ├── Context
    │
    ├── React Router
    │   ├── Routing
    │   ├── Nested Routes
    │   ├── Loaders
    │   ├── Actions
    │   ├── Forms
    │   └── Navigation
    │
    ├── Data Fetching
    │   ├── Fetch
    │   ├── Axios
    │   └── TanStack Query
    │
    ├── Forms
    │
    ├── State Management
    │
    ├── Performance
    │
    ├── Testing
    │
    └── Architecture
```

Do not mix React fundamentals with React Router-specific knowledge.

---

# 17. TypeScript Organization

Keep TypeScript separate from React.

For example:

```text
Frontend
├── React
│
└── TypeScript
    ├── Fundamentals
    ├── Types
    ├── Interfaces
    ├── Generics
    ├── Utility Types
    ├── React Props
    └── API Types
```

React-specific TypeScript patterns should live under:

```text
typescript/react-patterns.md
```

---

# 18. Backend Organization

Use the same principle.

For example:

```text
Backend
├── Java
│
├── Spring
│   ├── Spring Core
│   ├── Spring Boot
│   ├── Spring MVC
│   ├── Spring Data
│   ├── Spring Security
│   └── WebFlux
│
├── Microservices
│
├── Kafka
│
└── Databases
```

Avoid putting all backend knowledge into one large document.

---

# 19. Security

Never store:

```text
Passwords
API keys
Access tokens
Private keys
Connection strings containing credentials
Personal information
Production secrets
```

If discovered, ignore them and do not write them to the global knowledge base.

---

# 20. Do Not Modify the Current Repository

By default, this task is **knowledge extraction only**.

Do not create:

```text
CLAUDE.md
AGENTS.md
README.md
documentation
source files
configuration files
```

inside the current repository unless explicitly requested.

The primary output should be the global knowledge base.

The **global AI instruction/configuration is an exception**: it may be updated because it is outside the current repository and is required to register the global knowledge base for future AI coding sessions.

---

# 21. Future Code Generation Behavior

Once the global knowledge base has been registered with the AI agent, the agent must follow this workflow whenever generating, modifying, or reviewing code in any local repository:

```text
Current Coding Task
        ↓
Identify relevant technology
        ↓
Check Global Engineering Knowledge
        ↓
Retrieve relevant patterns
        ↓
Inspect Current Repository
        ↓
Compare global patterns with project patterns
        ↓
Follow current project's intentional conventions
        ↓
Apply useful global knowledge
        ↓
Generate / modify code
        ↓
Run validation
        ↓
Fix issues
        ↓
Re-test
```

The AI should **not read the entire global knowledge base for every task**.

Instead:

1. Identify the technologies relevant to the task.
2. Read the relevant knowledge sections.
3. Use only the applicable knowledge.
4. Avoid unnecessary context.

For example:

```text
Task:
Implement a React Router form.
```

The agent should prioritize:

```text
frontend/
└── react/
    └── react-router/
        └── forms.md
```

rather than reading unrelated:

```text
backend/java/
cloud/aws/
kafka/
```

---

# 22. Global Knowledge Has Lower Priority Than Explicit Project Requirements

Use the following priority order:

```text
1. Explicit user requirements
        ↓
2. Current project's architecture and established conventions
        ↓
3. Global engineering knowledge
        ↓
4. General AI assumptions
```

If the current project intentionally uses a different pattern from the global knowledge base, follow the current project's pattern unless the user explicitly asks to change it.

Example:

```text
Global Knowledge:
Use TanStack Query.

Current Project:
Uses Redux Toolkit Query.

Result:
Follow the current project's established approach.
```

Do not force global knowledge into a project merely because it exists in the knowledge base.

---

# 23. Continuous Learning

Every time this prompt is executed against another repository:

```text
New Repository
      ↓
Analyze
      ↓
Extract
      ↓
Compare
      ↓
Existing knowledge?
      │
 ┌────┴────┐
 │         │
YES       NO
 │         │
Improve   Add
 │         │
 └────┬────┘
      ↓
Update Global Knowledge
      ↓
Update Global Index
```

The knowledge base should become progressively more useful.

---

# 24. Final Validation

After analysis:

1. Verify the global knowledge directory exists.
2. Verify the global instruction/configuration references the correct path.
3. Verify the AI agent is instructed to consult the knowledge base for future coding tasks.
4. Verify new knowledge was placed in the correct technology category.
5. Check for duplicate concepts.
6. Check that frontend and backend knowledge are separated.
7. Check that React and its ecosystem are separated into appropriate levels.
8. Check that project-specific information was not accidentally promoted to global knowledge.
9. Check that secrets and sensitive information were not stored.
10. Update the global index.
11. Ensure the operation is idempotent.
12. Summarize what was added, updated, and configured.

---

# 25. Final Output

At the end, report:

```text
Global Knowledge Base:
C:\AI\global-engineering-knowledge\

Repository analyzed:
<repository name>

Technology detected:
- React
- React Router
- TypeScript
- TanStack Query
- etc.

Knowledge added:
- React → Hooks
- React → React Router → Forms
- TypeScript → React patterns

Knowledge updated:
- React → Data Fetching
- React → Component Architecture

Knowledge skipped:
- Project-specific business logic
- Secrets
- Duplicate patterns

Global AI Configuration:
- <configuration mechanism detected>
- Knowledge-base path registered
- Future coding sessions instructed to consult the knowledge base

Files created/updated:
- <list>
```

Do not provide a long explanation of the repository unless useful.

The primary purpose of this task is to **continuously build and improve a global local engineering knowledge base and make that knowledge available to the AI coding agent across local projects**.

---

# 26. Core Rule

Always follow this principle:

```text
Analyze
   ↓
Extract
   ↓
Classify
   ↓
Compare with existing knowledge
   ↓
Merge / Improve
   ↓
Organize hierarchically
   ↓
Update global index
   ↓
Register / verify global AI configuration
   ↓
Validate
```

The global knowledge base should become progressively more useful as this prompt is executed against more repositories.

---

# 27. Desired End State

After running this prompt against many repositories:

```text
                 Global Engineering Knowledge
                            │
          ┌─────────────────┴─────────────────┐
          │                                   │
       Frontend                            Backend
          │                                   │
       React                                Java
          │                                   │
    ┌─────┼──────┐                      Spring
    │     │      │                         │
 Router Forms Hooks                    Spring Boot
    │                                      │
Loaders Actions                         WebFlux
    │                                      │
TanStack Query                         Microservices
                                           │
                                         Kafka
                                           │
                                       Databases
```

And the AI coding agent should have a permanent global instruction similar to:

```text
For every coding task, when relevant, consult:

C:\AI\global-engineering-knowledge\

Use the knowledge as a reusable engineering reference.
Combine it with the current repository's architecture and conventions.
Do not blindly apply patterns that conflict with the current project.
```

The knowledge base should continuously evolve as new repositories are analyzed.

The goal is **not to train a model to memorize repositories**.

The goal is to create a **persistent, globally available engineering knowledge layer** that an AI coding agent can use while working on any local project.
