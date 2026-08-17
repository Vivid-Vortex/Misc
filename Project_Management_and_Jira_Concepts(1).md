# Project Management + Jira Concepts — Simple Explanation

## Table of Contents

### Project Management Concepts
1. [What is a Project?](#1-what-is-a-project)
2. [Agile](#2-agile)
3. [Scrum](#3-scrum)
4. [Sprint](#4-sprint)
5. [Product Backlog](#5-product-backlog)
6. [Sprint Backlog](#6-sprint-backlog)
7. [Epic](#7-epic)
8. [User Story](#8-user-story)
9. [Task](#9-task)
10. [Bug](#10-bug)
11. [Sub-task](#11-sub-task)
12. [Acceptance Criteria](#12-acceptance-criteria)
13. [Definition of Done](#13-definition-of-done)
14. [Story Points](#14-story-points)
15. [Estimation](#15-estimation)
16. [Velocity](#16-velocity)
17. [Capacity](#17-capacity)
18. [Dependency](#18-dependency)
19. [Risk](#19-risk)
20. [Issue](#20-issue)
21. [RAID](#21-raid)
22. [Milestone](#22-milestone)
23. [Release](#23-release)
24. [Roadmap](#24-roadmap)

### Jira Concepts
25. [Jira Project](#25-jira-project)
26. [Jira Issue](#26-jira-issue)
27. [Jira Board](#27-jira-board)
28. [Workflow](#28-workflow)
29. [Status](#29-status)
30. [Priority](#30-priority)
31. [Severity vs Priority](#31-severity-vs-priority)
32. [Assignee](#32-assignee)
33. [Reporter](#33-reporter)
34. [Labels](#34-labels)
35. [Components](#35-components)
36. [Sprint](#36-sprint)
37. [Backlog](#37-backlog)
38. [Burndown Chart](#38-burndown-chart)
39. [Burnup Chart](#39-burnup-chart)
40. [Cumulative Flow Diagram](#40-cumulative-flow-diagram)
41. [WIP](#41-wip)
42. [Technical Debt](#42-technical-debt)
43. [Scope Creep](#43-scope-creep)
44. [Change Request](#44-change-request)
45. [RACI](#45-raci)

### Summary
46. [The Most Important Mental Model](#46-the-most-important-mental-model)
47. [Which Concepts Should I Learn First?](#which-concepts-should-i-learn-first)

---

# Q: What are the important Project Management + Jira concepts I should know?

Let's divide them into two parts:

1.  **Project Management concepts** --- how software work is planned and
    managed.
2.  **Jira concepts** --- how those concepts are represented and tracked
    in Jira.

------------------------------------------------------------------------

## 1. Project Management Concepts

## Q: What is a Project?

A **project** is a temporary effort to achieve a specific goal.

Example:

> Build and launch a new Payment Service.

It has:

-   a goal
-   people
-   timeline
-   requirements
-   dependencies
-   risks
-   deliverables

------------------------------------------------------------------------

## 2. Agile

## Q: What is Agile?

Agile is a way of developing software where we:

> **Build → Get feedback → Improve → Repeat**

Instead of spending 12 months building everything and showing it at the
end, we deliver smaller pieces regularly.

Agile focuses on:

-   frequent delivery
-   customer feedback
-   adapting to change
-   collaboration
-   working software

------------------------------------------------------------------------

## 3. Scrum

## Q: What is Scrum?

Scrum is **one framework used to implement Agile**.

Think:

``` text
Agile = Philosophy / approach
Scrum = One way of practicing Agile
```

Scrum typically has:

### Roles

-   Product Owner
-   Scrum Master
-   Developers

### Events

-   Sprint Planning
-   Daily Scrum
-   Sprint Review
-   Sprint Retrospective

### Artifacts

-   Product Backlog
-   Sprint Backlog
-   Increment

------------------------------------------------------------------------

## 4. Sprint

## Q: What is a Sprint?

A Sprint is a fixed period during which the team works on a selected set
of work.

Usually:

``` text
Sprint = 2 weeks
```

Example:

``` text
Sprint 10
──────────────
Login API
Payment API
Bug fixes
Performance improvement
──────────────
2 weeks
```

At the end, the team should ideally have a **potentially deliverable
increment**.

------------------------------------------------------------------------

## 5. Product Backlog

## Q: What is a Product Backlog?

It is the **complete prioritized list of work for the product**.

Example:

``` text
Product Backlog

1. Payment integration
2. User registration
3. Search optimization
4. Email notifications
5. Reporting
6. Bug fixes
```

The Product Owner usually manages its priority.

------------------------------------------------------------------------

## 6. Sprint Backlog

## Q: What is a Sprint Backlog?

It is the work selected from the Product Backlog for the current Sprint.

``` text
Product Backlog
       ↓
Sprint Planning
       ↓
Sprint Backlog
```

For example:

``` text
Sprint 15

- Payment API
- Payment UI
- Payment database changes
- Payment tests
```

------------------------------------------------------------------------

## 7. Epic

## Q: What is an Epic?

An **Epic is a large piece of work that is too big to complete as one
normal story**.

Example:

> **Epic: Build Payment System**

It can contain:

``` text
Epic: Payment System
│
├── Story: Add payment API
├── Story: Integrate Stripe
├── Story: Payment UI
├── Story: Payment history
└── Story: Payment notifications
```

Think:

> **Epic = Big business capability**

------------------------------------------------------------------------

## 8. User Story

## Q: What is a User Story?

A User Story describes functionality from the user's/business
perspective.

Common format:

> As a **customer**, I want to **make a payment**, so that I can
> **complete my purchase**.

The important thing is that it describes **what the user/business
needs**, not how developers will implement it.

------------------------------------------------------------------------

## 9. Task

## Q: What is a Task?

A Task is a piece of work that needs to be performed.

Example:

``` text
Task:
Configure Kafka topic for payment events
```

It doesn't necessarily represent a user-facing feature.

------------------------------------------------------------------------

## 10. Bug

## Q: What is a Bug?

A Bug represents something that **is not working as expected**.

Example:

``` text
Bug:
Payment API returns HTTP 500 when card expires.
```

------------------------------------------------------------------------

## 11. Sub-task

## Q: What is a Sub-task?

A Sub-task breaks a larger piece of work into smaller pieces.

Example:

``` text
Story: Implement Payment API

    ├── Sub-task: Create controller
    ├── Sub-task: Create service
    ├── Sub-task: Create repository
    └── Sub-task: Write tests
```

------------------------------------------------------------------------

## 12. Acceptance Criteria

## Q: What are Acceptance Criteria?

Acceptance Criteria define **when the story can be considered acceptable
from the business perspective**.

Example:

Story:

> As a customer, I want to reset my password.

Acceptance criteria:

``` text
Given a registered user
When they request password reset
Then they receive an email.

Given an expired reset link
When the user clicks it
Then the system rejects the request.
```

This is extremely important for senior engineers because it removes
ambiguity.

------------------------------------------------------------------------

## 13. Definition of Done

## Q: What is Definition of Done?

Definition of Done answers:

> **When can we say that this work is actually finished?**

Example:

``` text
Definition of Done

✓ Code implemented
✓ Unit tests written
✓ Code reviewed
✓ Integration tests passed
✓ Sonar checks passed
✓ Documentation updated
✓ Deployed to QA
✓ Acceptance criteria satisfied
```

Notice the difference:

**Acceptance Criteria** → Does the functionality satisfy the
requirement?

**Definition of Done** → Has the team completed all required
engineering/process activities?

------------------------------------------------------------------------

## 14. Story Points

## Q: What are Story Points?

Story points estimate the **relative complexity/effort** of work.

They don't directly mean hours.

For example:

``` text
Story A → 2 points
Story B → 5 points
Story C → 8 points
```

An 8-point story is considered significantly more complex than a 2-point
story.

Common scale:

``` text
1, 2, 3, 5, 8, 13
```

This is usually based on:

-   complexity
-   effort
-   uncertainty
-   dependencies

------------------------------------------------------------------------

## 15. Estimation

## Q: What is Estimation?

Estimation means predicting how much effort a piece of work may require.

Common approaches:

-   Story Points
-   T-shirt sizing
-   Ideal days
-   Hours

T-shirt sizing:

``` text
S → Small
M → Medium
L → Large
XL → Very Large
```

------------------------------------------------------------------------

## 16. Velocity

## Q: What is Velocity?

Velocity tells you approximately how many story points a team completes
in a Sprint.

Example:

``` text
Sprint 1 → 30 points
Sprint 2 → 28 points
Sprint 3 → 32 points
Sprint 4 → 30 points
```

Average:

``` text
~30 points/Sprint
```

You can then roughly predict future capacity.

**Important:** Velocity should primarily be used for **planning**, not
as an individual performance metric.

------------------------------------------------------------------------

## 17. Capacity

## Q: What is Team Capacity?

Capacity answers:

> "How much time does the team actually have available this Sprint?"

Example:

You have 6 developers.

But:

-   1 developer on vacation
-   1 developer working 50% on another project
-   everyone has meetings

So your capacity might be lower than normal.

------------------------------------------------------------------------

## 18. Dependency

## Q: What is a Dependency?

A dependency means:

> **My work cannot proceed until something else happens.**

Example:

``` text
Payment Service
      ↓ depends on
Bank API
```

Your team cannot finish the payment integration until the bank provides
the API.

Dependencies are extremely important in project management.

------------------------------------------------------------------------

## 19. Risk

## Q: What is a Risk?

A risk is something that **might happen in the future and could
negatively affect the project**.

Example:

> The external payment provider may not provide the API on time.

That's a risk.

------------------------------------------------------------------------

## 20. Issue

## Q: What is an Issue?

An issue is a problem that **has already happened**.

Example:

> Payment provider API is currently unavailable.

Simple distinction:

``` text
Risk  → Might happen
Issue → Has happened
```

------------------------------------------------------------------------

## 21. RAID

You may hear **RAID** in project management.

``` text
R → Risks
A → Assumptions
I → Issues
D → Dependencies
```

Example:

  Type         Example
  ------------ ---------------------------
  Risk         Vendor API may be delayed
  Assumption   Vendor will support OAuth
  Issue        QA environment is down
  Dependency   Waiting for database team

This is particularly useful for an Architect/Lead.

------------------------------------------------------------------------

## 22. Milestone

## Q: What is a Milestone?

A milestone is an important checkpoint in a project.

Example:

``` text
Jan  → Architecture complete
Feb  → MVP complete
Mar  → QA complete
Apr  → Production launch
```

The milestones show the major progress points.

------------------------------------------------------------------------

## 23. Release

## Q: What is a Release?

A release is a version of software delivered to users.

Example:

``` text
Release 1.0
Release 1.1
Release 1.2
```

A Sprint and Release are **not necessarily the same thing**.

You might have:

``` text
Sprint 1
Sprint 2
Sprint 3
Sprint 4
      ↓
Release 1.0
```

------------------------------------------------------------------------

## 24. Roadmap

## Q: What is a Product Roadmap?

A roadmap gives a **high-level view of where the product is going**.

Example:

``` text
Q1
 └── Payment

Q2
 └── Recommendations

Q3
 └── Analytics

Q4
 └── Mobile App
```

Roadmap is strategic.

Sprint backlog is tactical.

------------------------------------------------------------------------

## Jira Concepts

The easiest way to understand Jira is:

``` text
Epic
  ↓
Story / Task / Bug
  ↓
Sub-task
```

Example:

``` text
EPIC
Payment System
    │
    ├── STORY
    │   Implement Payment API
    │       ├── Sub-task: Controller
    │       ├── Sub-task: Service
    │       └── Sub-task: Tests
    │
    ├── STORY
    │   Integrate Stripe
    │
    └── BUG
        Payment fails for expired cards
```

------------------------------------------------------------------------

### 25. Jira Project

## Q: What is a Jira Project?

A Jira Project is a container for related work.

Example:

``` text
Jira Project: E-Commerce Platform

    Payments
    Orders
    Inventory
    Notifications
```

------------------------------------------------------------------------

### 26. Jira Issue

## Q: What is a Jira Issue?

Almost everything you track in Jira is an **Issue**.

Examples:

``` text
Story
Task
Bug
Epic
Sub-task
```

So:

> Jira Issue = A trackable unit of work.

------------------------------------------------------------------------

### 27. Jira Board

## Q: What is a Jira Board?

A board gives you a visual representation of work.

Typical Scrum board:

``` text
TO DO          IN PROGRESS       CODE REVIEW       DONE
--------------------------------------------------------
Story A        Story C            Story E            Story B
Story D        Bug F
```

This is basically a visual workflow.

------------------------------------------------------------------------

### 28. Workflow

## Q: What is a Jira Workflow?

Workflow defines how an issue moves through different states.

Example:

``` text
TO DO
  ↓
IN PROGRESS
  ↓
CODE REVIEW
  ↓
QA
  ↓
DONE
```

Different organizations can have different workflows.

------------------------------------------------------------------------

### 29. Status

## Q: What is Status?

Status represents the current state of an issue.

Examples:

``` text
To Do
In Progress
Code Review
QA
Done
```

------------------------------------------------------------------------

### 30. Priority

## Q: What is Priority?

Priority answers:

> **How important is this work compared with other work?**

Example:

``` text
Highest
High
Medium
Low
Lowest
```

------------------------------------------------------------------------

### 31. Severity vs Priority

This is an important interview concept.

### Severity

How badly does the problem affect the system?

### Priority

How urgently should we fix it?

Example:

A typo on the homepage:

``` text
Severity → Low
Priority → High
```

because the CEO may want it fixed immediately.

A serious bug in a rarely used admin feature:

``` text
Severity → High
Priority → Low
```

because it doesn't affect many users.

------------------------------------------------------------------------

### 32. Assignee

## Q: What is an Assignee?

The person responsible for working on the Jira issue.

``` text
Story → Assigned to → Deepak
```

------------------------------------------------------------------------

### 33. Reporter

## Q: What is Reporter?

The person who created/reported the Jira issue.

``` text
Reporter → Product Owner
Assignee → Developer
```

------------------------------------------------------------------------

### 34. Labels

## Q: What are Jira Labels?

Labels are simple tags used to categorize issues.

Example:

``` text
payment
backend
security
performance
technical-debt
```

------------------------------------------------------------------------

### 35. Components

## Q: What are Components?

Components group issues according to a part of the product.

Example:

``` text
Components

Payment
Order
Inventory
Notification
```

You could have:

``` text
Story → Implement refund API
Component → Payment
```

------------------------------------------------------------------------

### 36. Sprint

Jira lets you create a Sprint and assign issues to it.

Example:

``` text
Sprint 25

Story A → 5 points
Story B → 3 points
Bug C   → 2 points
Task D  → 5 points

Total = 15 points
```

------------------------------------------------------------------------

### 37. Backlog

Jira's backlog is basically your list of work waiting to be planned.

``` text
BACKLOG
──────────────
Story A
Story B
Story C
Bug D
Story E

       ↓ Sprint Planning

SPRINT 25
──────────────
Story A
Story C
Bug D
```

------------------------------------------------------------------------

### 38. Burndown Chart

## Q: What is a Burndown Chart?

It shows:

> **How much work is remaining over time.**

Example:

``` text
Remaining Work

100 |\
    | \
 75 |  \
    |   \
 50 |    \
    |     \
 25 |      \
    |       \__
  0 +------------→
      Time
```

Ideally, remaining work goes down as the Sprint progresses.

------------------------------------------------------------------------

### 39. Burnup Chart

A burnup chart shows:

> **How much work has been completed compared with total scope.**

The useful thing about a burnup chart is that it can also show **scope
changes**.

------------------------------------------------------------------------

### 40. Cumulative Flow Diagram

This shows how work moves through statuses.

``` text
To Do
████████████

In Progress
██████

QA
████

Done
████████
```

It helps identify bottlenecks.

For example:

``` text
In Progress → 20 issues
QA          → 2 issues
```

That may indicate developers are producing work faster than QA can
process it.

------------------------------------------------------------------------

### 41. WIP

## Q: What is WIP?

**WIP = Work In Progress**

It means work that has started but isn't finished.

Example:

``` text
5 developers

10 issues IN PROGRESS
```

That may be too much.

A common Agile principle is:

> **Finish existing work before starting too much new work.**

------------------------------------------------------------------------

### 42. Technical Debt

## Q: What is Technical Debt?

Technical debt is the future cost created by taking a shortcut today.

Example:

``` text
Today:
"Let's skip proper abstraction. We'll fix it later."

Tomorrow:
5 services depend on that implementation.
```

Now fixing it becomes expensive.

Examples:

-   outdated libraries
-   poor architecture
-   duplicated code
-   missing tests
-   temporary hacks
-   performance problems

------------------------------------------------------------------------

### 43. Scope Creep

## Q: What is Scope Creep?

Scope creep means:

> The amount of work keeps increasing without proper adjustment to
> timeline/resources.

Example:

Initially:

``` text
Build Login
```

Then:

``` text
+ Google Login
+ Facebook Login
+ MFA
+ Passwordless Login
+ Biometrics
```

But deadline remains the same.

That's scope creep.

------------------------------------------------------------------------

### 44. Change Request

## Q: What is a Change Request?

When somebody wants to change the agreed scope, you formally evaluate
the change.

Example:

``` text
Original:
Payment using Visa/Mastercard

Change:
Add PayPal
```

You evaluate:

``` text
Impact on:
- Timeline
- Cost
- Resources
- Architecture
- Testing
- Release
```

------------------------------------------------------------------------

### 45. RACI

This is **very useful for an Architect/Engineering Manager**.

RACI defines responsibilities.

``` text
R = Responsible
A = Accountable
C = Consulted
I = Informed
```

Example:

  Activity       Architect   Developer   Product Owner
  -------------- ----------- ----------- ---------------
  Architecture   A           C           I
  Coding         I           R           I
  Requirements   C           C           A

Simple difference:

**Responsible** → Does the work.

**Accountable** → Ultimately owns the outcome.

**Consulted** → Gives input.

**Informed** → Needs to know.

------------------------------------------------------------------------

## 46. The Most Important Mental Model

For your transition toward **Architect / senior technical leadership**,
I would remember this hierarchy:

``` text
PRODUCT
   ↓
ROADMAP
   ↓
EPIC
   ↓
USER STORY
   ↓
TASK / SUB-TASK
   ↓
SPRINT
   ↓
RELEASE
```

And around this you manage:

``` text
              PROJECT
                 │
      ┌──────────┼──────────┐
      ↓          ↓          ↓
   SCOPE       TIME       COST
      │
      ↓
   QUALITY
      │
      ↓
RISKS / ISSUES / DEPENDENCIES
```

And Jira is primarily the **tool used to visualize and manage this
work**.

------------------------------------------------------------------------

## Which Concepts Should I Learn First?

Don't try to memorize 50 Jira features. For your role, I would
prioritize them like this:

### 🔴 Must know

1.  Agile
2.  Scrum
3.  Epic
4.  User Story
5.  Task
6.  Bug
7.  Sub-task
8.  Sprint
9.  Product Backlog
10. Sprint Backlog
11. Acceptance Criteria
12. Definition of Done
13. Story Points
14. Velocity
15. Dependencies
16. Risks
17. Issues
18. Jira Workflow
19. Jira Board
20. Release

### 🟡 Very useful for Lead/Architect

21. Capacity
22. Burndown
23. Burnup
24. Cumulative Flow
25. WIP
26. Technical Debt
27. Scope Creep
28. Change Request
29. RAID
30. RACI
31. Roadmap
32. Milestones
33. Severity vs Priority

### 🟢 Jira-specific things to learn later

34. JQL
35. Filters
36. Dashboards
37. Components
38. Versions
39. Jira Automation
40. Permissions
41. Workflows
42. Workflow transitions
43. Custom fields

**For an Architect/Lead, I would focus much more on understanding *why*
these concepts exist than memorizing Jira screens.** Jira is just the
tool; the underlying project-management concepts are what matter in
interviews and real projects.
