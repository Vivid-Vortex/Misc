# Claude Code / Codex — Light Context Strategy

> **Purpose:** Keep AI coding-agent context small, focused, and task-specific while preserving enough project knowledge for correct implementation.
>
> **Source:** [ClaudeCodexLightContext.md](https://github.com/Vivid-Vortex/Misc/blob/dev_m1_1.0.0/Concepts/AI/GenAIPrompts/ClaudeCodexLightContext/ClaudeCodexLightContext.md)

---

## Table of Contents

- [1. Core Idea](#1-core-idea)
- [2. The Light-Context Architecture](#2-the-light-context-architecture)
- [3. Keep CLAUDE.md Small](#3-keep-claudemd-small)
- [4. Split Knowledge into Focused Files](#4-split-knowledge-into-focused-files)
- [5. Use Task-Specific Context](#5-use-task-specific-context)
- [6. Prefer Targeted Search](#6-prefer-targeted-search)
- [7. Use Context Compaction](#7-use-context-compaction)
- [8. Start a New Session for Major Tasks](#8-start-a-new-session-for-major-tasks)
- [9. Recommended Documentation Architecture](#9-recommended-documentation-architecture)
- [10. One-Shot Prompt to Generate the Structure](#10-one-shot-prompt-to-generate-the-structure)
- [11. Ecosystem Coverage](#11-ecosystem-coverage)
- [12. Cross-Ecosystem Context](#12-cross-ecosystem-context)
- [13. Architecture Decision Records](#13-architecture-decision-records)
- [14. Context Loading Guide](#14-context-loading-guide)
- [15. Avoid Over-Documentation](#15-avoid-over-documentation)
- [16. Validation](#16-validation)
- [17. Definition of Done](#17-definition-of-done)
- [18. Recommended Workflow](#18-recommended-workflow)

---

# 1. Core Idea

The objective is simple:

> **Load the minimum amount of context necessary to complete the current task correctly.**

Do **not** make Claude Code repeatedly load the entire project's knowledge for every task.

Instead, use a layered model:

```text
CLAUDE.md
    ↓
Current Task
    ↓
Relevant Ecosystem
    ↓
Relevant Technology
    ↓
Relevant Project Module
    ↓
Relevant Source Files
```

Avoid this:

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

Context efficiency should never come at the cost of correctness.

If additional context becomes necessary, the agent should **progressively load it**.

---

# 2. The Light-Context Architecture

The recommended architecture is:

```text
                         CLAUDE.md
                             │
                 ┌───────────┴───────────┐
                 │                       │
           Project Rules          Documentation Router
                                         │
              ┌──────────────┬───────────┼──────────────┐
              ↓              ↓           ↓              ↓
        Architecture     Ecosystems    Backend       Infrastructure
              │              │
              │        ┌─────┼─────┬─────┬─────┐
              │        ↓     ↓     ↓     ↓     ↓
              │      Java  Kotlin React Android Swift
              │
              └──────────────────┐
                                 ↓
                         Current Task Context
                                 ↓
                         Relevant Source Files
```

The important principle is:

> **`CLAUDE.md` should behave more like an index/router than a giant knowledge dump.**

---

# 3. Keep CLAUDE.md Small

`CLAUDE.md` should contain **persistent project-level rules**, not hundreds of lines of architecture documentation.

### Good

```text
# Project Rules

- Java 21
- Spring Boot 3.x
- Gradle
- Follow layered architecture
- Write tests for new functionality
- Run tests after changes
- Never modify unrelated modules

See docs/architecture/ for architecture details.
See docs/testing/ for testing guidelines.
See docs/tasks/current-task.md for the current task.
```

### Avoid

```text
CLAUDE.md
└── 800+ lines containing:
    ├── architecture explanations
    ├── Kafka theory
    ├── database documentation
    ├── Kubernetes documentation
    ├── frontend conventions
    ├── mobile conventions
    └── unrelated implementation details
```

Instead, point the agent to detailed documentation **only when needed**.

---

# 4. Split Knowledge into Focused Files

Prefer small, focused documents:

```text
docs/
├── architecture/
│   ├── overview.md
│   ├── communication.md
│   └── data-flow.md
│
├── technology/
│   ├── spring-boot.md
│   ├── kafka.md
│   ├── security.md
│   └── database.md
│
└── tasks/
    └── current-task.md
```

Instead of:

```text
docs/
└── everything-about-the-project.md
```

Each file should answer a **specific category of questions**.

Examples:

```text
kafka.md
spring-security.md
reactor.md
swiftui.md
jetpack-compose.md
tauri.md
```

are preferable to:

```text
everything-about-backend.md
everything-about-mobile.md
everything-about-java.md
```

---

# 5. Use Task-Specific Context

A task-specific context file is one of the most useful mechanisms for keeping context small.

Recommended structure:

```text
docs/tasks/
├── README.md
├── current-task.md
├── order-kafka-task.md
├── authentication-task.md
└── archive/
```

Example:

```markdown
# Current Task

## Objective

Implement Kafka event publishing in order-service.

## Relevant Files

- services/order-service/
- docs/technology/kafka.md

## Requirements

- Use Spring Kafka
- Publish OrderCreatedEvent
- Do not change the database schema
- Add unit tests
- Add integration tests

## Not Relevant

- Kubernetes
- Terraform
- Frontend
- Notification service
```

Then the task instruction can simply be:

> Read `docs/tasks/current-task.md` first. Use only the files and requirements relevant to this task. Do not inspect unrelated modules unless necessary.

---

# 6. Prefer Targeted Search

Do not instruct the agent to understand the entire repository unless that is genuinely necessary.

### Avoid

> Understand the entire project and then implement Kafka.

### Prefer

> Find the existing Kafka configuration and event-publishing pattern. Inspect only the files necessary to implement this feature.

The agent should:

1. Identify the task.
2. Identify the relevant ecosystem.
3. Identify the relevant module.
4. Search for the existing implementation pattern.
5. Read only the necessary files.
6. Expand context only if required.

---

# 7. Use Context Compaction

When the conversation becomes large, use:

```text
/compact
```

A more targeted version is preferable when supported:

```text
/compact

Keep:
- current implementation requirements
- architecture decisions
- files modified
- failing tests
- remaining tasks
- important discovered constraints

Discard:
- unrelated discussion
- completed exploratory work
- obsolete approaches
- irrelevant implementation details
```

### Important distinction

`/compact` primarily reduces the **conversation context**.

A well-structured `CLAUDE.md`, modular documentation, and targeted task instructions reduce the **project information the agent needs to inspect**.

Use both strategies.

---

# 8. Start a New Session for Major Tasks

Do not keep one coding-agent session alive across unrelated tasks:

```text
Task 1 → Kafka
Task 2 → Security
Task 3 → Kubernetes
Task 4 → React
Task 5 → Terraform
Task 6 → Debugging
```

Instead:

```text
Session 1 → Kafka
Session 2 → Security
Session 3 → Kubernetes
Session 4 → React
```

The repository and documentation preserve the durable project knowledge.

A new session can therefore start with:

```text
CLAUDE.md
    ↓
Current task
    ↓
Relevant documentation
    ↓
Relevant source
```

This keeps active context much cleaner.

---

# 9. Recommended Documentation Architecture

For a large monorepo or multi-technology project, use a structure along these lines:

```text
CLAUDE.md

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
│   ├── kotlin/
│   ├── android/
│   ├── swift/
│   ├── react/
│   ├── react-native/
│   ├── node/
│   ├── rust/
│   └── tauri/
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
```

---

# 10. One-Shot Prompt to Generate the Structure

Use the following prompt in Claude Code or another coding agent.

## Prompt

```text
Analyze the current repository and create a context-efficient documentation and instruction structure for the coding agent.

OBJECTIVE

The primary objective is to prevent the coding agent from unnecessarily loading the entire project's knowledge into every task.

The final architecture must follow this principle:

    Load the minimum amount of context necessary to complete the current task correctly.

Do not sacrifice correctness for context reduction. If additional context becomes necessary, progressively load it.

--------------------------------------------------
1. ANALYZE THE REPOSITORY
--------------------------------------------------

First inspect the repository enough to understand its structure.

Identify:

- Repository type
- Monorepo or single application
- Programming languages
- Frameworks
- Build systems
- Package managers
- Application types
- Backend services
- Frontend applications
- Mobile applications
- Desktop applications
- Shared libraries
- Databases
- Messaging systems
- Infrastructure
- Cloud providers
- CI/CD systems
- Testing frameworks
- Observability tools
- Security technologies

Do NOT perform an exhaustive repository scan merely to create documentation.

--------------------------------------------------
2. CREATE A SMALL ROOT CLAUDE.md
--------------------------------------------------

Create or update the root CLAUDE.md.

Keep it intentionally small.

CLAUDE.md must primarily act as:

- Project rulebook
- Documentation router
- Context-loading guide

It should contain:

### Project Overview

A short description of the repository.

### Repository Structure

Only the major directories.

### Technology Detection

Explain which documentation should be consulted for different types of tasks.

Examples:

- Java/Spring Boot → Java + Spring documentation
- Kotlin → Kotlin documentation
- React → React + TypeScript documentation
- React Native → React Native + relevant Android/iOS documentation
- Android → Kotlin + Android documentation
- iOS → Swift + iOS documentation
- macOS → Swift + macOS documentation
- Tauri → Tauri + Rust + frontend documentation
- Kafka → Kafka + backend/event-driven documentation
- Kubernetes → Kubernetes + infrastructure documentation
- Terraform → Terraform + cloud documentation
- Security → Security + affected ecosystem documentation
- Testing → Testing + affected ecosystem documentation

### Context Loading Rules

Include strict rules:

- Do not read the entire docs directory.
- Do not load unrelated ecosystem documentation.
- Start with the smallest relevant documentation set.
- Inspect source code only when necessary.
- Prefer targeted search over broad repository exploration.
- Follow documentation references only when required.
- Do not load documentation merely because it exists.
- If a task crosses ecosystems, load only the required documentation.
- Use current-task.md when present.
- Expand context progressively when necessary.

--------------------------------------------------
3. CREATE MODULAR DOCUMENTATION
--------------------------------------------------

Create a docs/ structure containing focused documentation.

Documentation should be split by:

- Architecture
- Ecosystem
- Backend
- Frontend
- Mobile
- Desktop
- Infrastructure
- Cloud
- DevOps
- Testing
- Observability
- Security
- Development
- Architecture Decision Records
- Tasks

Every major documentation directory must contain a README.md that acts as a navigation map.

Each documentation file should answer one focused category of questions.

Do NOT create giant documents such as:

- everything-about-java.md
- everything-about-backend.md
- everything-about-mobile.md

Prefer focused files such as:

- spring-boot.md
- spring-security.md
- kafka.md
- reactor.md
- swiftui.md
- jetpack-compose.md
- tauri.md

Documentation must primarily contain project-specific information.

Do not fill documentation with generic textbook explanations unless they are necessary to explain a project-specific decision or convention.

--------------------------------------------------
4. SUPPORTED ECOSYSTEMS
--------------------------------------------------

The documentation architecture should support these ecosystems:

Backend:

- Java
- Spring Boot
- Spring Framework
- Spring Data
- JPA/Hibernate
- Spring Security
- Spring Cloud
- Spring WebFlux
- Project Reactor
- Kotlin
- Kotlin + Spring
- Kotlin Coroutines
- Kotlin Flow
- Kotlin Multiplatform
- Node.js
- TypeScript
- Rust
- Tauri

Frontend:

- React
- TypeScript
- Next.js
- Vite
- React Router
- TanStack Query
- State management
- Styling
- Accessibility
- Frontend testing

Mobile:

- Android
- Kotlin
- Jetpack Compose
- Android Architecture
- Room
- Navigation
- ViewModel
- Dependency Injection
- React Native
- iOS
- Swift
- SwiftUI
- UIKit where applicable
- Kotlin Multiplatform

Desktop:

- Tauri
- Rust
- macOS
- Swift
- SwiftUI
- Cross-platform desktop development

Backend architecture:

- REST
- GraphQL
- Microservices
- Event-driven architecture
- Kafka
- Distributed systems
- Databases
- Caching

Infrastructure:

- Docker
- Kubernetes
- Helm
- Terraform
- Infrastructure as Code
- Service Mesh
- Networking

Cloud:

- AWS
- Azure
- GCP
- Cloud architecture

Engineering:

- Git
- CI/CD
- GitHub Actions
- Testing
- Observability
- Security

AI:

- AI/ML applications
- GenAI
- LLM integrations
- AI agent integrations

Only populate documentation with technologies actually used by the repository.

For technologies not currently used, do not invent project-specific rules.

--------------------------------------------------
5. TASK CONTEXT SYSTEM
--------------------------------------------------

Create:

docs/tasks/README.md

and:

docs/tasks/current-task.md

Use current-task.md as the focused context for the active task.

The template must contain:

# Current Task

## Objective

## Scope

### In Scope

### Out of Scope

## Relevant Applications / Modules

## Relevant Documentation

## Relevant Technologies

## Requirements

## Constraints

## Existing Behavior That Must Not Change

## Validation

## Current Status

## Known Issues

## Decisions

## Files Modified

## Remaining Work

The purpose is to give the coding agent a small, focused context for the current task.

--------------------------------------------------
6. DOCUMENTATION INDEXES
--------------------------------------------------

Every major documentation directory must contain a README.md.

Each README must explain:

- When the agent should read this directory.
- Which files are relevant to which tasks.
- Relationships between the documents.
- Which documents normally do not need to be loaded.

Example:

Java task:

    Java
      ↓
    java.md

Spring Boot task:

    Java
      ↓
    spring-boot.md

WebFlux task:

    Java
      ↓
    Spring Boot
      ↓
    Spring WebFlux
      ↓
    Reactor

React Native task:

    React Native
      ↓
    TypeScript
      ↓
    Android/Kotlin and/or iOS/Swift

Tauri task:

    Tauri
      ↓
    Rust
      +
    Frontend
      ↓
    Tauri IPC

--------------------------------------------------
7. CROSS-ECOSYSTEM CONTEXT
--------------------------------------------------

Document relationships between ecosystems when they actually exist.

Examples:

React Native:

    React Native
        ↓
    TypeScript
        ↓
    Android / Kotlin
        +
    iOS / Swift

Tauri:

    Frontend
        +
    Rust
        ↓
    Tauri IPC
        ↓
    Desktop OS

Kotlin Multiplatform:

    Shared Kotlin
        ↓
    Android
        +
    iOS

Spring Boot microservices:

    Spring Boot
        ↓
    REST / Kafka
        ↓
    Database
        ↓
    Observability

Do not create unnecessary cross-ecosystem dependencies.

--------------------------------------------------
8. ARCHITECTURE DECISION RECORDS
--------------------------------------------------

Create:

docs/decisions/README.md

and:

docs/decisions/ADR-0001-template.md

Use ADRs for meaningful architectural decisions.

Examples:

- Kafka vs synchronous REST
- WebFlux vs MVC
- React Native vs native mobile
- Tauri vs Electron
- Kotlin Multiplatform vs separate implementations
- PostgreSQL vs MySQL
- Kubernetes architecture
- Cloud architecture

Do not create ADRs for trivial implementation details.

--------------------------------------------------
9. CONTEXT GUIDE
--------------------------------------------------

Create:

docs/CONTEXT_GUIDE.md

Create a decision table showing the minimum documentation required for common tasks.

Examples:

| Task | Minimum Context |
|------|-----------------|
| Java feature | Java |
| Spring Boot | Java + Spring Boot |
| WebFlux | Java + Spring Boot + WebFlux + Reactor |
| Kafka | Kafka + relevant backend architecture |
| React | React + TypeScript |
| Next.js | React + Next.js + TypeScript |
| React Native | React Native + TypeScript + relevant platform |
| Android | Kotlin + Android |
| Jetpack Compose | Kotlin + Android + Compose |
| iOS | Swift + iOS |
| SwiftUI | Swift + iOS/macOS + SwiftUI |
| macOS | Swift + macOS |
| Tauri | Tauri + Rust + frontend |
| Rust | Rust |
| Terraform | Terraform + relevant cloud |
| Kubernetes | Kubernetes + infrastructure |
| Security | Security + affected ecosystem |
| Testing | Testing + affected ecosystem |
| Performance | Relevant ecosystem + observability |
| Production issue | Application + observability + infrastructure |

The goal is the minimum necessary context principle.

--------------------------------------------------
10. DOCUMENTATION CONTENT RULES
--------------------------------------------------

Documentation should contain, where relevant:

- Project-specific conventions
- Architecture decisions
- Important implementation patterns
- Commands
- Configuration conventions
- Common pitfalls
- Testing expectations
- Security considerations
- Performance considerations
- Useful references
- Examples only when necessary

Avoid generic explanations.

Existing project facts always take precedence over generic templates.

--------------------------------------------------
11. DO NOT OVER-DOCUMENT
--------------------------------------------------

Do NOT create dozens of populated files simply because a technology exists in the supported list.

For unused technologies:

- Do not invent project-specific rules.
- Do not invent architecture decisions.
- Do not claim the repository uses the technology.
- Create only reusable navigation/templates when genuinely useful.
- Clearly distinguish future/template documentation from current project documentation.

--------------------------------------------------
12. VALIDATION
--------------------------------------------------

After creating the structure:

1. Check for duplicate information.
2. Check for contradictory instructions.
3. Ensure CLAUDE.md is concise.
4. Ensure documentation is properly separated.
5. Ensure major documentation directories have README.md.
6. Ensure current-task.md is practical.
7. Ensure ecosystem documentation can be loaded independently.
8. Ensure unrelated ecosystems are not unnecessarily referenced.
9. Verify paths.
10. Verify Markdown formatting.
11. Verify internal links.
12. Remove unnecessary files.

Then provide a concise summary of:

- Files created
- Files modified
- Documentation architecture
- Context-loading strategy
- Recommended workflow

--------------------------------------------------
13. CRITICAL CONTEXT RULE
--------------------------------------------------

The final architecture must optimize for context efficiency.

The intended flow is:

    CLAUDE.md
        ↓
    Current Task
        ↓
    Relevant Ecosystem
        ↓
    Relevant Technology
        ↓
    Relevant Project Module
        ↓
    Relevant Source Files

Never default to:

    Read everything
        ↓
    Analyze everything
        ↓
    Load entire repository
        ↓
    Start task

If additional information is needed, progressively load it.

--------------------------------------------------
14. DEFINITION OF DONE
--------------------------------------------------

The task is NOT complete when files have merely been created.

It is complete only when:

- Repository has been analyzed.
- Documentation structure has been created.
- CLAUDE.md is concise.
- Context-loading rules are defined.
- Task-specific context support exists.
- Ecosystems are logically separated.
- Relevant project knowledge has been captured.
- No unsupported assumptions were invented.
- Duplicate information has been minimized.
- Internal references are valid.
- Markdown is valid.
- The resulting structure is practical for future coding-agent sessions.

Follow this loop:

    Analyze
      ↓
    Design
      ↓
    Create
      ↓
    Review
      ↓
    Detect duplication/conflicts
      ↓
    Fix
      ↓
    Validate
      ↓
    Re-check
      ↓
    Finalize

Do not stop after creating the files. Perform validation and cleanup before reporting completion.

--------------------------------------------------
15. FINAL RESPONSE
--------------------------------------------------

After completing the work, report:

1. What was created.
2. What was modified.
3. How the coding agent should use the structure.
4. An example of starting a new task using docs/tasks/current-task.md.
5. Recommendations for keeping context small over time.
```

---

# 11. Ecosystem Coverage

The structure intentionally separates ecosystems so that a task does not accidentally pull unrelated knowledge into context.

### Java / Spring

```text
java/
├── README.md
├── java.md
├── spring-boot.md
├── spring-framework.md
├── spring-data.md
├── spring-security.md
├── spring-cloud.md
├── spring-webflux.md
├── reactor.md
├── kafka.md
├── testing.md
└── build.md
```

### Kotlin

```text
kotlin/
├── README.md
├── kotlin.md
├── kotlin-spring.md
├── coroutines.md
├── flow.md
├── multiplatform.md
└── testing.md
```

### Android

```text
android/
├── README.md
├── android.md
├── jetpack-compose.md
├── architecture.md
├── navigation.md
├── networking.md
├── persistence.md
├── dependency-injection.md
└── testing.md
```

### Swift / iOS / macOS

```text
swift/
├── README.md
├── swift.md
├── swiftui.md
├── concurrency.md
├── ios.md
├── macos.md
├── networking.md
├── persistence.md
└── testing.md
```

### React

```text
react/
├── README.md
├── react.md
├── typescript.md
├── nextjs.md
├── state-management.md
├── routing.md
├── data-fetching.md
├── styling.md
└── testing.md
```

### React Native

```text
react-native/
├── README.md
├── react-native.md
├── navigation.md
├── native-modules.md
├── android.md
├── ios.md
└── testing.md
```

### Tauri / Rust

```text
tauri/
├── README.md
├── tauri.md
├── rust-backend.md
├── frontend.md
├── commands.md
├── plugins.md
├── desktop.md
└── security.md
```

---

# 12. Cross-Ecosystem Context

The important point is that these ecosystems should **not be treated as isolated islands**.

For example, a React Native task may require:

```text
React Native
    +
TypeScript
    +
Android/Kotlin
    +
iOS/Swift
```

But a normal React web task should not automatically load Android and Swift documentation.

Similarly:

```text
Tauri task
    ↓
Tauri
    ↓
Rust
    ↓
Frontend
```

while a normal Rust library task should not load Tauri documentation.

This is why each README should explicitly define **when its child documents should be loaded**.

---

# 13. Architecture Decision Records

Use ADRs for decisions that affect the architecture.

Example:

```text
docs/decisions/
├── README.md
├── ADR-0001-template.md
├── ADR-0002-kafka-for-events.md
├── ADR-0003-webflux-for-service-x.md
└── ADR-0004-tauri-for-desktop.md
```

ADRs preserve **why** a decision was made, which prevents a future coding agent from accidentally "fixing" something that was intentional.

---

# 14. Context Loading Guide

The most important rule is:

> **Don't load documentation because it exists. Load it because the current task requires it.**

Example:

| Task | Minimum Context |
|---|---|
| Java class | `java.md` |
| Spring Boot feature | `java.md` + `spring-boot.md` |
| JPA change | Java + Spring Boot + Spring Data |
| WebFlux | Java + Spring Boot + WebFlux + Reactor |
| Kafka | Kafka + relevant architecture |
| React | React + TypeScript |
| Next.js | React + Next.js + TypeScript |
| React Native | React Native + TypeScript + relevant platform |
| Android | Kotlin + Android |
| Compose | Kotlin + Android + Compose |
| iOS | Swift + iOS |
| SwiftUI | Swift + SwiftUI + relevant platform |
| macOS | Swift + macOS |
| Tauri | Tauri + Rust + frontend |
| Terraform | Terraform + relevant cloud |
| Kubernetes | Kubernetes + infrastructure |
| Security | Security + affected ecosystem |
| Testing | Testing + affected ecosystem |
| Performance | Relevant ecosystem + observability |
| Production incident | Application + observability + infrastructure |

---

# 15. Avoid Over-Documentation

More documentation does **not** automatically mean better context.

The danger is:

```text
Small task
   ↓
CLAUDE.md
   ↓
README
   ↓
Architecture
   ↓
Backend
   ↓
Infrastructure
   ↓
Cloud
   ↓
Security
   ↓
Testing
   ↓
Everything
```

Instead:

```text
Small task
   ↓
CLAUDE.md
   ↓
Task context
   ↓
Relevant ecosystem
   ↓
Relevant files
```

The documentation system should therefore be **progressive**, not exhaustive.

---

# 16. Validation

After generating or modifying the documentation structure, validate:

- [ ] `CLAUDE.md` is concise.
- [ ] Major documentation directories have navigation files.
- [ ] Documentation is logically separated.
- [ ] No unnecessary duplication exists.
- [ ] No contradictory instructions exist.
- [ ] `current-task.md` is easy to use.
- [ ] Ecosystem documentation can be loaded independently.
- [ ] Unrelated ecosystems are not unnecessarily referenced.
- [ ] Internal links are valid.
- [ ] Markdown formatting is valid.
- [ ] Project-specific facts are not confused with generic templates.
- [ ] Unused technologies are not falsely represented as being used.

---

# 17. Definition of Done

The task is **not complete** merely because documentation files were created.

It is complete only when:

1. The repository has been analyzed.
2. The documentation structure has been created.
3. `CLAUDE.md` is concise.
4. Context-loading rules are defined.
5. Task-specific context support exists.
6. Ecosystem documentation is logically separated.
7. Relevant project knowledge has been captured.
8. No unsupported assumptions were invented.
9. Duplicate information has been minimized.
10. Internal references are valid.
11. Markdown structure is valid.
12. The resulting structure is practical for future coding-agent sessions.

Use this loop:

```text
Analyze
  ↓
Design
  ↓
Create
  ↓
Review
  ↓
Detect duplication/conflicts
  ↓
Fix
  ↓
Validate
  ↓
Re-check
  ↓
Finalize
```

---

# 18. Recommended Workflow

For each new feature:

### Step 1 — Create the task context

Update:

```text
docs/tasks/current-task.md
```

### Step 2 — Start a fresh coding-agent session

Give the agent the task.

### Step 3 — Let it identify the minimum context

The agent should determine:

```text
Task
 ↓
Ecosystem
 ↓
Technology
 ↓
Module
 ↓
Source files
```

### Step 4 — Implement

The agent progressively loads additional context only when required.

### Step 5 — Validate

Run:

```text
Tests
Build
Lint
Static analysis
Integration tests
```

### Step 6 — Finish the task

Update:

```text
current-task.md
```

with:

- Decisions
- Files modified
- Current status
- Remaining work
- Known issues

### Step 7 — Start a new session for the next major task

Do not carry unrelated conversation context forward.

---

## Final Principle

The entire system can be summarized in one sentence:

> **Keep permanent knowledge outside the conversation, keep `CLAUDE.md` as a lightweight router, keep the current task narrowly scoped, and progressively load only the context required to solve that task.**

This gives the coding agent a much cleaner operating model:

```text
                    ┌───────────────┐
                    │  CLAUDE.md    │
                    │ Small + Stable│
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │ Current Task  │
                    │ Small + Focused│
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │   Ecosystem   │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │  Technology   │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │ Project Module│
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │ Relevant Code │
                    └───────────────┘
```

**Minimum necessary context. Maximum necessary correctness.**
