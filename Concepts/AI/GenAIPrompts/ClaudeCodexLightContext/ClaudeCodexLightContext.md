## Q: Can I free up Claude Code context so that it takes only the relevant points?

**Yes.** And this is actually a very good way to use Claude Code, especially for large projects.

The key idea is: **don't let Claude Code repeatedly load your entire project knowledge/context. Give it a small, targeted context for each task.**

### 1. Use `CLAUDE.md` only for permanent rules

Keep `CLAUDE.md` relatively small.

For example:

```text
# Project Rules

- Java 21
- Spring Boot 3.x
- Gradle
- Follow layered architecture
- Write tests for new functionality
- Run tests after changes
- Never modify unrelated modules

See docs/architecture.md for architecture details.
See docs/testing.md for testing guidelines.
```

Don't put hundreds of lines of architecture explanations into `CLAUDE.md`.

Instead, **point Claude to detailed documents when needed**.

---

### 2. Split your knowledge into focused files

For example:

```text
project/
├── CLAUDE.md
├── docs/
│   ├── architecture.md
│   ├── database.md
│   ├── kafka.md
│   ├── security.md
│   ├── testing.md
│   └── deployment.md
│
├── services/
│   ├── order-service/
│   ├── inventory-service/
│   └── notification-service/
```

Then tell Claude:

> For this task, only consider `order-service` and `docs/kafka.md`. Do not load or analyze unrelated services.

This is much better than giving it the entire project's context.

---

### 3. Use a task-specific context file

This is probably the **most useful technique for what you're asking**.

Create something like:

```text
docs/tasks/
├── current-task.md
├── order-kafka-task.md
└── authentication-task.md
```

For example:

```markdown
# Current Task

## Goal
Implement Kafka event publishing in order-service.

## Relevant Files
- services/order-service/
- docs/kafka.md

## Requirements
- Use Spring Kafka
- Publish OrderCreatedEvent
- Do not change database schema
- Add unit tests
- Add integration test

## Not Relevant
- Kubernetes
- Terraform
- Frontend
- Notification service
```

Then your Claude Code prompt can simply say:

> Read `docs/tasks/current-task.md` first.
> Use only the files and requirements relevant to this task.
> Do not inspect unrelated modules unless necessary.

This significantly reduces unnecessary exploration.

---

### 4. Ask Claude Code to search instead of reading everything

Instead of:

> Understand the entire project and then implement Kafka.

Use:

> Find the existing Kafka configuration and event-publishing pattern. Inspect only the files necessary to implement this feature.

Claude can then use targeted searches rather than dumping large portions of the repository into context.

---

### 5. Use `/compact`

Claude Code has a **context compaction** mechanism.

When the conversation becomes large, you can use:

```text
/compact
```

This tells Claude Code to reduce the conversation context while retaining the important information.

You can also give it guidance about what to preserve, for example:

```text
/compact Keep the current implementation requirements,
architecture decisions, files modified, failing tests, and remaining tasks.
Discard unrelated discussion.
```

That's very useful.

---

### 6. Start a new Claude Code session for a new major task

This is one of the simplest and most effective approaches.

Don't keep one Claude Code conversation alive for:

```text
Task 1 → Kafka
Task 2 → Security
Task 3 → Kubernetes
Task 4 → React
Task 5 → Terraform
Task 6 → debugging
```

After Task 1 is complete, start a new session.

Your repository + `CLAUDE.md` already contain the persistent knowledge.

Think of it like:

```text
CLAUDE.md
     ↓
Persistent project knowledge

New Claude session
     ↓
Only current task context
```

This keeps the active context much cleaner.

---

## Q: Can I make Claude automatically pick only relevant information?

**To some extent, yes.** The best architecture is:

```text
                 CLAUDE.md
                     │
          ┌──────────┴──────────┐
          │                     │
    Project rules        Navigation/index
                                │
                 ┌──────────────┼──────────────┐
                 ↓              ↓              ↓
           architecture.md   kafka.md     security.md
                 │              │              │
                 └──────────────┼──────────────┘
                                ↓
                         Current Task
                                ↓
                       Relevant files only
```

The important part is that **CLAUDE.md acts more like an index/router than a giant knowledge dump.**

---

### My recommendation for your projects

Since you're building fairly large **Spring Boot + Microservices + Kafka + Cloud + Kubernetes** projects, I'd use:

```text
CLAUDE.md
docs/
├── architecture/
│   ├── overview.md
│   ├── microservices.md
│   └── communication.md
├── technology/
│   ├── spring-boot.md
│   ├── kafka.md
│   ├── security.md
│   └── database.md
├── infrastructure/
│   ├── docker.md
│   ├── kubernetes.md
│   └── terraform.md
└── tasks/
    └── current-task.md
```

And keep `CLAUDE.md` **short**.

For each task:

```text
Read CLAUDE.md.

For this task, focus only on:
- services/order-service
- docs/technology/kafka.md
- docs/architecture/communication.md

Ignore Kubernetes, Terraform, frontend, and unrelated services.

Implement the task and follow the project's Definition of Done.
```

That gives you **much better context efficiency** than putting everything into `CLAUDE.md`.

**One important distinction:** `/compact` reduces the **conversation context**. A well-structured `CLAUDE.md` and targeted task instructions reduce the **amount of project information Claude needs to inspect**. You want both.

---

## Q: Can you give me a one-shot prompt to generate this type of file structure for multiple technology ecosystems?

Yes. For your use case, I would make the agent create **a lightweight root `CLAUDE.md` + modular documentation + task-specific context**, rather than putting all knowledge into `CLAUDE.md`.

The prompt below is designed to make Claude Code **inspect the repository first, identify applicable ecosystems, create the structure, and avoid unnecessary context loading**.

```
# Goal

Analyze the current repository and create a context-efficient documentation and instruction structure for Claude Code.

The primary objective is to prevent Claude Code from unnecessarily loading the entire project's knowledge into every task.

Design the structure so that:

1. `CLAUDE.md` remains small and acts primarily as a project-level router/index.
2. Detailed knowledge is split into focused documentation files.
3. Claude can load only the documentation relevant to the current task.
4. Technology-specific documentation is separated from project-specific documentation.
5. Task-specific context can be created without polluting permanent project documentation.
6. The structure works well for monorepos containing multiple applications, services, libraries, and platforms.
7. The structure supports the following ecosystems:

   * Java + Spring Boot
   * Kotlin + Spring Boot
   * Kotlin Multiplatform
   * Android
   * Jetpack Compose
   * iOS
   * Swift
   * SwiftUI
   * macOS
   * React
   * Next.js
   * React Native
   * TypeScript
   * Node.js
   * Tauri
   * Rust
   * REST APIs
   * GraphQL
   * Kafka / event-driven systems
   * Microservices
   * Databases
   * Docker
   * Kubernetes
   * Terraform / Infrastructure as Code
   * CI/CD
   * Cloud platforms
   * Testing
   * Observability
   * Security
   * AI/ML-related applications where applicable

Do not create documentation for technologies that are completely irrelevant to the repository. However, create a reusable structure/template for the supported ecosystems so that documentation can easily be added when those technologies are introduced later.

---

# Phase 1 — Analyze the Repository

First inspect the repository.

Identify:

* Repository type
* Monorepo or single application
* Programming languages
* Frameworks
* Build systems
* Package managers
* Application types
* Backend services
* Frontend applications
* Mobile applications
* Desktop applications
* Shared libraries
* Databases
* Messaging systems
* Infrastructure
* Cloud providers
* CI/CD systems
* Testing frameworks
* Observability tools
* Security technologies

Inspect only enough files to understand the repository structure.

Do NOT perform an exhaustive repository scan merely to create documentation.

---

# Phase 2 — Create the Documentation Architecture

Create a structure similar to:

docs/
├── README.md
│
├── architecture/
│   ├── overview.md
│   ├── system-context.md
│   ├── components.md
│   ├── communication.md
│   ├── data-flow.md
│   └── decisions/
│       └── README.md
│
├── ecosystems/
│   ├── java/
│   │   ├── README.md
│   │   ├── java.md
│   │   ├── spring-boot.md
│   │   ├── spring-framework.md
│   │   ├── spring-data.md
│   │   ├── spring-security.md
│   │   ├── spring-cloud.md
│   │   ├── spring-webflux.md
│   │   ├── reactor.md
│   │   ├── kafka.md
│   │   ├── testing.md
│   │   └── build.md
│   │
│   ├── kotlin/
│   │   ├── README.md
│   │   ├── kotlin.md
│   │   ├── kotlin-spring.md
│   │   ├── coroutines.md
│   │   ├── flow.md
│   │   ├── multiplatform.md
│   │   └── testing.md
│   │
│   ├── android/
│   │   ├── README.md
│   │   ├── android.md
│   │   ├── jetpack-compose.md
│   │   ├── architecture.md
│   │   ├── navigation.md
│   │   ├── networking.md
│   │   ├── persistence.md
│   │   ├── dependency-injection.md
│   │   └── testing.md
│   │
│   ├── swift/
│   │   ├── README.md
│   │   ├── swift.md
│   │   ├── swiftui.md
│   │   ├── concurrency.md
│   │   ├── ios.md
│   │   ├── macos.md
│   │   ├── networking.md
│   │   ├── persistence.md
│   │   └── testing.md
│   │
│   ├── react/
│   │   ├── README.md
│   │   ├── react.md
│   │   ├── typescript.md
│   │   ├── nextjs.md
│   │   ├── state-management.md
│   │   ├── routing.md
│   │   ├── data-fetching.md
│   │   ├── styling.md
│   │   └── testing.md
│   │
│   ├── react-native/
│   │   ├── README.md
│   │   ├── react-native.md
│   │   ├── navigation.md
│   │   ├── native-modules.md
│   │   ├── android.md
│   │   ├── ios.md
│   │   └── testing.md
│   │
│   ├── node/
│   │   ├── README.md
│   │   ├── nodejs.md
│   │   ├── typescript.md
│   │   ├── npm.md
│   │   ├── pnpm.md
│   │   ├── express.md
│   │   └── testing.md
│   │
│   ├── rust/
│   │   ├── README.md
│   │   ├── rust.md
│   │   ├── cargo.md
│   │   ├── async.md
│   │   ├── tokio.md
│   │   └── testing.md
│   │
│   └── tauri/
│       ├── README.md
│       ├── tauri.md
│       ├── rust-backend.md
│       ├── frontend.md
│       ├── commands.md
│       ├── plugins.md
│       ├── desktop.md
│       └── security.md
│
├── backend/
│   ├── microservices.md
│   ├── rest.md
│   ├── graphql.md
│   ├── kafka.md
│   ├── event-driven.md
│   ├── databases.md
│   ├── caching.md
│   └── distributed-systems.md
│
├── frontend/
│   ├── web.md
│   ├── accessibility.md
│   ├── performance.md
│   └── security.md
│
├── mobile/
│   ├── android.md
│   ├── ios.md
│   ├── cross-platform.md
│   └── app-architecture.md
│
├── desktop/
│   ├── tauri.md
│   ├── macos.md
│   └── cross-platform.md
│
├── infrastructure/
│   ├── docker.md
│   ├── kubernetes.md
│   ├── terraform.md
│   ├── helm.md
│   ├── service-mesh.md
│   └── networking.md
│
├── cloud/
│   ├── README.md
│   ├── aws.md
│   ├── azure.md
│   ├── gcp.md
│   └── cloud-architecture.md
│
├── devops/
│   ├── ci-cd.md
│   ├── github-actions.md
│   ├── git.md
│   └── release-management.md
│
├── testing/
│   ├── strategy.md
│   ├── unit-testing.md
│   ├── integration-testing.md
│   ├── contract-testing.md
│   ├── end-to-end-testing.md
│   └── testcontainers.md
│
├── observability/
│   ├── logging.md
│   ├── metrics.md
│   ├── tracing.md
│   ├── prometheus.md
│   ├── grafana.md
│   └── opentelemetry.md
│
├── security/
│   ├── principles.md
│   ├── authentication.md
│   ├── authorization.md
│   ├── oauth2.md
│   ├── oidc.md
│   ├── jwt.md
│   └── secrets.md
│
├── development/
│   ├── local-setup.md
│   ├── debugging.md
│   ├── code-style.md
│   └── troubleshooting.md
│
├── decisions/
│   ├── README.md
│   └── ADR-0001-template.md
│
└── tasks/
├── README.md
├── current-task.md
└── archive/

---

# Phase 3 — Root CLAUDE.md

Create or update the root `CLAUDE.md`.

Keep it intentionally small.

It should contain:

## Project Overview

A very short description of the repository.

## Repository Structure

Explain only the major directories.

## Technology Detection

Tell Claude how to determine which ecosystem applies to a task.

For example:

* Java/Spring Boot task → read relevant Java/Spring documentation.
* Kotlin task → read Kotlin documentation.
* React task → read React documentation.
* React Native task → read React Native + relevant Android/iOS documentation.
* Tauri task → read Tauri + Rust + frontend documentation.
* iOS task → read Swift/SwiftUI/iOS documentation.
* Android task → read Android/Kotlin/Compose documentation.
* Infrastructure task → read infrastructure documentation.
* Kafka task → read Kafka/event-driven documentation.
* Security task → read security documentation.

## Context Loading Rules

Add strict rules such as:

* Do not read the entire `docs/` directory.
* Do not load unrelated ecosystem documentation.
* Start with the smallest relevant documentation set.
* Inspect source code only when necessary.
* Prefer targeted search over broad repository exploration.
* Follow references only when required.
* Do not load documentation merely because it exists.
* If a task crosses multiple ecosystems, load only the documentation required for those ecosystems.
* When uncertain, inspect the task and repository structure before loading additional documentation.

## Task Context

Tell Claude that `docs/tasks/current-task.md` is the optional source of truth for the current task.

---

# Phase 4 — Create Task Context System

Create:

docs/tasks/README.md

Explain how task-specific context should work.

Create:

docs/tasks/current-task.md

Use this template:

# Current Task

## Objective

Describe exactly what needs to be accomplished.

## Scope

### In Scope

*

### Out of Scope

*

## Relevant Applications / Modules

*

## Relevant Documentation

*

## Relevant Technologies

*

## Requirements

*

## Constraints

*

## Existing Behavior That Must Not Change

*

## Validation

*

## Current Status

*

## Known Issues

*

## Decisions

*

## Files Modified

*

## Remaining Work

*

The purpose of this file is to provide Claude with a small, focused context for the current task.

---

# Phase 5 — Create Documentation Indexes

Every major documentation directory must contain a `README.md`.

Each README should act as a navigation map.

For example:

`docs/ecosystems/java/README.md`

should explain:

* When Claude should read this directory.
* Which files are relevant to which tasks.
* Which files should normally be ignored.
* Relationships between the documents.

Example:

Java task:

```text
Java language
    ↓
java.md

Spring Boot task
    ↓
java.md
spring-boot.md

Spring Data task
    ↓
java.md
spring-boot.md
spring-data.md

WebFlux task
    ↓
java.md
spring-boot.md
spring-webflux.md
reactor.md
```

Use the same concept for every ecosystem.

---

# Phase 6 — Documentation Content Rules

Do not create huge documentation files.

Each file should answer a specific category of questions.

Prefer:

```text
kafka.md
spring-security.md
reactor.md
swiftui.md
jetpack-compose.md
tauri.md
```

over:

```text
everything-about-backend.md
everything-about-mobile.md
everything-about-java.md
```

Documentation should contain:

* Project-specific conventions
* Architecture decisions
* Important implementation patterns
* Commands
* Configuration conventions
* Common pitfalls
* Testing expectations
* Security considerations
* Performance considerations
* Links/references when useful
* Examples only when necessary

Do not fill documentation with generic textbook explanations.

The documentation is primarily for helping Claude work correctly in THIS repository.

---

# Phase 7 — Technology-Specific Rules

For each detected ecosystem, document project-specific conventions.

## Java / Spring Boot

Cover where applicable:

* Java version
* Spring Boot version
* Gradle/Maven
* Spring MVC
* Spring WebFlux
* Project Reactor
* Spring Data
* JPA/Hibernate
* Spring Security
* Spring Cloud
* Kafka
* REST
* validation
* exception handling
* transactions
* testing
* Testcontainers
* observability

## Kotlin

Cover where applicable:

* Kotlin version
* Gradle
* coroutines
* Flow
* Kotlin/JVM
* Kotlin Multiplatform
* Spring integration
* testing

## React Ecosystem

Cover where applicable:

* React
* TypeScript
* Next.js
* Vite
* routing
* state management
* TanStack Query
* API integration
* component architecture
* styling
* accessibility
* testing

## React Native

Cover:

* React Native
* TypeScript
* navigation
* native modules
* Android integration
* iOS integration
* build configuration
* platform-specific code
* testing

## Android

Cover:

* Kotlin
* Jetpack Compose
* Android architecture
* ViewModel
* Navigation
* Room
* networking
* dependency injection
* coroutines
* testing
* build configuration

## Swift / iOS / macOS

Cover:

* Swift
* SwiftUI
* UIKit/AppKit when applicable
* concurrency
* async/await
* networking
* persistence
* architecture
* dependency injection
* testing
* platform-specific behavior
* build configuration

## Tauri

Cover:

* Tauri
* Rust
* frontend framework
* commands
* IPC
* plugins
* permissions
* security
* desktop packaging
* platform-specific behavior

## Rust

Cover:

* Rust version
* Cargo
* ownership patterns relevant to the project
* async runtime
* Tokio when applicable
* error handling
* testing
* FFI/native integration when applicable

---

# Phase 8 — Cross-Ecosystem Rules

Create documentation for cases where ecosystems interact.

Examples:

React Native:

```text
React Native
    ↓
TypeScript
    ↓
Android / Kotlin
    +
iOS / Swift
```

Tauri:

```text
Frontend
    +
Rust
    ↓
Tauri IPC
    ↓
Desktop OS
```

Kotlin Multiplatform:

```text
Shared Kotlin
    ↓
Android
    +
iOS
```

Spring Boot microservices:

```text
Spring Boot
    ↓
REST / Kafka
    ↓
Database
    ↓
Observability
```

Only create cross-ecosystem documentation when it is relevant to the repository.

---

# Phase 9 — Architecture Decision Records

Create:

docs/decisions/README.md

and:

docs/decisions/ADR-0001-template.md

Use ADRs for important architectural decisions.

Examples:

* Why Kafka instead of synchronous REST?
* Why WebFlux instead of MVC?
* Why React Native instead of native mobile?
* Why Tauri instead of Electron?
* Why Kotlin Multiplatform?
* Why PostgreSQL instead of MySQL?
* Why Kubernetes?
* Why a particular cloud architecture?

Do not create ADRs for trivial implementation details.

---

# Phase 10 — Context Loading Strategy

Create:

docs/CONTEXT_GUIDE.md

Explain exactly how Claude should determine which documentation to read.

Use a decision table similar to:

| Task                | Read                                                  |
| ------------------- | ----------------------------------------------------- |
| Java feature        | Java docs                                             |
| Spring Boot feature | Java + Spring Boot                                    |
| WebFlux             | Java + Spring Boot + WebFlux + Reactor                |
| Kafka               | Kafka + relevant backend architecture                 |
| React               | React + TypeScript                                    |
| Next.js             | React + Next.js + TypeScript                          |
| React Native        | React + React Native + relevant Android/iOS docs      |
| Android             | Kotlin + Android                                      |
| Compose             | Kotlin + Android + Compose                            |
| iOS                 | Swift + iOS + SwiftUI if applicable                   |
| macOS               | Swift + macOS + SwiftUI if applicable                 |
| Tauri               | Tauri + Rust + frontend                               |
| Rust                | Rust                                                  |
| Terraform           | Infrastructure + cloud provider                       |
| Kubernetes          | Kubernetes + infrastructure                           |
| Security            | Security + affected ecosystem                         |
| Testing             | Testing + affected ecosystem                          |
| Performance         | Relevant ecosystem + observability                    |
| Production issue    | Relevant application + observability + infrastructure |

The goal is to establish a **minimum necessary context principle**.

---

# Phase 11 — Do Not Over-Document

This is extremely important.

Do NOT create dozens of populated documentation files just for the sake of having them.

If a technology is not currently used:

1. Create only the relevant README/navigation structure if useful.
2. Do not invent project-specific rules.
3. Do not invent architecture decisions.
4. Do not pretend the repository uses a technology that it does not use.
5. Clearly mark future/template documentation as such.

Existing project facts must always take precedence over generic templates.

---

# Phase 12 — Validate the Structure

After creating the files:

1. Check for duplicate information.
2. Check for contradictory instructions.
3. Check that `CLAUDE.md` is concise.
4. Check that documentation is properly separated.
5. Check that every major documentation directory has a README.
6. Check that `current-task.md` is easy to use.
7. Check that ecosystem documentation can be loaded independently.
8. Check that no document unnecessarily references unrelated ecosystems.
9. Verify all paths.
10. Verify Markdown formatting.
11. Verify internal links.
12. Remove unnecessary files.

Then provide a concise summary containing:

* Files created
* Files modified
* Documentation architecture
* Context-loading strategy
* Recommended workflow for future Claude Code sessions

---

# Critical Requirement

The final architecture must optimize for **context efficiency**.

Think of documentation as a graph:

```text
CLAUDE.md
    ↓
Task
    ↓
Relevant ecosystem
    ↓
Relevant technology
    ↓
Relevant project module
    ↓
Relevant source files
```

NOT:

```text
CLAUDE.md
    ↓
Read everything
    ↓
Analyze everything
    ↓
Load entire repository
    ↓
Start task
```

The desired behavior is:

> Load the minimum amount of context necessary to complete the current task correctly.

Do not sacrifice correctness for context reduction.

If additional context becomes necessary during implementation, progressively load it.

---

# Definition of Done

The task is NOT complete when the documentation files have merely been created.

It is complete only when:

* The repository has been analyzed.
* The documentation structure has been created.
* `CLAUDE.md` is concise.
* Context-loading rules are defined.
* Task-specific context support exists.
* Ecosystem documentation is logically separated.
* Relevant existing project knowledge has been captured.
* No unsupported project assumptions were invented.
* Documentation does not unnecessarily duplicate information.
* Internal references are valid.
* Markdown structure is valid.
* The resulting structure is practical for future Claude Code sessions.

Follow this loop:

```text
Analyze
→ Design
→ Create
→ Review
→ Detect duplication/conflicts
→ Fix
→ Validate
→ Re-check
→ Finalize
```

Do not stop after creating the files. Perform the validation and cleanup yourself before reporting completion.

# Final Output

After completing the work, report:

1. What was created.
2. What was modified.
3. How Claude Code should use the structure.
4. An example of how to start a new task using `docs/tasks/current-task.md`.
5. Any important recommendations for keeping context small over time.

```
