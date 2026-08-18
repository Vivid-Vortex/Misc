# GraphQL Interview Questions

> **Question:** Can you create a Markdown file containing the GraphQL
> interview questions and answers from the referenced article, without
> mentioning the site's name?

## Table of Contents

-   [Beginner](#beginner)
    -   [1. What is GraphQL?](#1-what-is-graphql)
    -   [2. Mutation vs Query](#2-mutation-vs-query)
    -   [3. GraphQL Schema](#3-graphql-schema)
    -   [4. Scalar Types](#4-scalar-types)
    -   [5. Exclamation Mark `!`](#5-exclamation-mark-)
    -   [6. Resolvers](#6-resolvers)
    -   [7. When is GraphQL Useful?](#7-when-is-graphql-useful)
    -   [8. Key GraphQL Query Language
        Concepts](#8-key-graphql-query-language-concepts)
-   [Intermediate](#intermediate)
    -   [9. Variables](#9-variables)
    -   [10. Introspection](#10-introspection)
    -   [11. Authentication and
        Authorization](#11-authentication-and-authorization)
    -   [12. Error Handling](#12-error-handling)
    -   [13. Production Error Handling](#13-production-error-handling)
    -   [14. GraphQL vs REST](#14-graphql-vs-rest)
    -   [15. Advantages and
        Disadvantages](#15-advantages-and-disadvantages)
    -   [16. Versioning Without Breaking
        Clients](#16-versioning-without-breaking-clients)
-   [Advanced](#advanced)
    -   [17. Batching](#17-batching)
    -   [18. Query Performance
        Optimization](#18-query-performance-optimization)
    -   [19. Public API Security](#19-public-api-security)
    -   [20. SQL Injection and DDoS
        Protection](#20-sql-injection-and-ddos-protection)
    -   [21. Federated GraphQL in
        Microservices](#21-federated-graphql-in-microservices)
    -   [22. Custom Directives](#22-custom-directives)
    -   [23. Serverless GraphQL](#23-serverless-graphql)
    -   [24. Real-Time Updates with
        Subscriptions](#24-real-time-updates-with-subscriptions)
-   [Quick Revision Cheat Sheet](#quick-revision-cheat-sheet)

------------------------------------------------------------------------

# Beginner

## 1. What is GraphQL?

GraphQL is both:

1.  A **query language** for APIs.
2.  A **server-side runtime** that executes those queries.

Its main idea is that the client asks for the exact fields it needs.

For example, instead of receiving a large fixed REST response:

``` graphql
query {
  user(id: "1") {
    name
    email
  }
}
```

The client receives only the requested fields.

### Key benefit

GraphQL helps reduce:

-   **Over-fetching** --- receiving more data than required.
-   **Under-fetching** --- needing multiple API calls to obtain related
    data.

------------------------------------------------------------------------

## 2. Mutation vs Query

### Query

A **query** is used to read data.

``` graphql
query {
  user(id: "1") {
    name
  }
}
```

### Mutation

A **mutation** is used to change data.

``` graphql
mutation {
  createUser(name: "Deepak") {
    id
    name
  }
}
```

### Simple rule

  Operation   Purpose
  ----------- --------------------------------
  Query       Read data
  Mutation    Create, update, or delete data

Queries are generally expected to be free of side effects, while
mutations represent operations that modify state.

------------------------------------------------------------------------

## 3. What is a GraphQL Schema?

A GraphQL schema defines the **contract of the API**.

It describes:

-   Available types
-   Fields
-   Relationships
-   Queries
-   Mutations
-   Directives
-   Arguments

Example:

``` graphql
type User {
  id: ID!
  name: String!
  email: String
}

type Query {
  user(id: ID!): User
}
```

The schema tells the client what can be requested and what shape of
response to expect.

### Simple analogy

Think of the schema as the **menu of a restaurant**.

The client can order only items that exist on the menu.

------------------------------------------------------------------------

## 4. What are Scalar Types?

Scalar types represent individual values.

GraphQL provides five built-in scalar types:

  Scalar      Meaning
  ----------- -----------------------
  `String`    Text
  `Int`       Integer
  `Float`     Floating-point number
  `Boolean`   `true` / `false`
  `ID`        Unique identifier

Example:

``` graphql
type User {
  id: ID!
  name: String!
  age: Int
  salary: Float
  active: Boolean
}
```

Scalars form the **leaf values** of a GraphQL response.

------------------------------------------------------------------------

## 5. What Does the Exclamation Mark `!` Mean?

The `!` means **non-nullable**.

``` graphql
name: String!
```

This means `name` must have a value and cannot be `null`.

It can also be used with arguments:

``` graphql
user(id: ID!): User
```

Here, the client must provide `id`.

### Simple rule

``` text
String   -> may be null
String!  -> cannot be null
```

------------------------------------------------------------------------

## 6. What are Resolvers?

A **resolver** is a function responsible for obtaining the value of a
GraphQL field.

Example:

``` graphql
type Query {
  user(id: ID!): User
}
```

The server needs a resolver for `user`.

Conceptually:

``` java
User user(String id) {
    return userRepository.findById(id);
}
```

A resolver may obtain data from:

-   Database
-   REST API
-   Another service
-   Cache
-   Any other data source

### Simple idea

**Schema says what can be requested.**

**Resolver says how to get it.**

------------------------------------------------------------------------

## 7. When is GraphQL Useful?

GraphQL is particularly useful when:

-   Clients need different subsets of data.
-   Data has complex relationships.
-   Multiple clients have different requirements.
-   Data needs to be aggregated from multiple sources.
-   Real-time updates are required.
-   Reducing unnecessary data transfer is important.

It can also act as a flexible API layer over existing services.

------------------------------------------------------------------------

## 8. What are the Key GraphQL Query Language Concepts?

Important GraphQL concepts include:

### Fields

Specify the data to retrieve.

### Arguments

Pass input to fields.

``` graphql
user(id: "1")
```

### Queries

Read data.

### Mutations

Modify data.

### Variables

Provide dynamic values at runtime.

### Aliases

Give a different name to a returned field.

### Fragments

Reuse a group of fields.

### Directives

Modify execution behavior based on conditions or custom rules.

### Introspection

Allows clients and tools to inspect the schema.

------------------------------------------------------------------------

# Intermediate

## 9. What are Variables in GraphQL?

Variables allow dynamic values to be supplied at runtime instead of
hard-coding them into a query.

Example:

``` graphql
query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
  }
}
```

Variables:

``` json
{
  "id": "1"
}
```

### Benefits

Variables make queries:

-   Reusable
-   Cleaner
-   Safer
-   Easier to maintain

------------------------------------------------------------------------

## 10. What is Introspection?

Introspection allows a client to ask the GraphQL server about its own
schema.

It can discover:

-   Types
-   Fields
-   Arguments
-   Directives
-   Available operations

### Why is it useful?

It enables tools to:

-   Generate documentation
-   Validate queries
-   Provide autocomplete
-   Explore the API
-   Generate client-side code

GraphQL APIs can therefore be highly discoverable.

------------------------------------------------------------------------

## 11. How are Authentication and Authorization Handled?

These are two different concerns.

### Authentication

Answers:

> **Who are you?**

Authentication is commonly handled using mechanisms such as:

-   JWT
-   OAuth
-   HTTP authentication headers
-   Session-based authentication

### Authorization

Answers:

> **What are you allowed to access?**

Authorization is commonly enforced while resolving fields or executing
operations.

Example:

``` text
Request
   |
   v
Authentication
   |
   v
GraphQL
   |
   v
Authorization
   |
   v
Resolver
```

### Simple distinction

``` text
Authentication = Identity
Authorization  = Permission
```

------------------------------------------------------------------------

## 12. How is Error Handling Done in GraphQL?

GraphQL commonly returns errors in an `errors` section of the response.

A response can contain both:

-   `data`
-   `errors`

Example:

``` json
{
  "data": {
    "user": null
  },
  "errors": [
    {
      "message": "User not found"
    }
  ]
}
```

Errors can originate from:

-   Query syntax
-   Validation
-   Resolver execution
-   Business logic
-   Runtime failures

Clients can inspect information such as the error message, path, and
application-specific error codes.

------------------------------------------------------------------------

## 13. How Should Errors Be Handled in Production?

Production error handling should balance **useful diagnostics** with
**security**.

### Return to clients

Return:

-   User-friendly messages
-   Appropriate application error codes
-   Relevant error paths where useful

Avoid exposing:

-   Stack traces
-   Database details
-   Internal implementation details
-   Secrets
-   Sensitive information

### Log internally

Monitoring systems should capture enough context to diagnose failures.

Useful information may include:

-   Operation/query information
-   Variables where safe
-   User/request context
-   Error details
-   Correlation/request IDs

### Important distinction

Separate:

-   **Operational errors** --- expected runtime failures that can be
    handled.
-   **Developer/programming errors** --- defects that require fixing.

------------------------------------------------------------------------

## 14. What is the Difference Between GraphQL and REST?

  -----------------------------------------------------------------------
  GraphQL                             REST
  ----------------------------------- -----------------------------------
  Usually exposes a schema-driven API Usually exposes resource-oriented
                                      endpoints

  Client selects fields               Server commonly defines response
                                      shape

  Can retrieve related data in one    May require multiple endpoints
  query                               

  Strongly typed schema               Typing depends on API/documentation
                                      approach

  Flexible queries                    Fixed endpoint operations

  Dynamic queries complicate caching  HTTP caching is often
                                      straightforward

  Usually one GraphQL endpoint        Often multiple resource endpoints
  -----------------------------------------------------------------------

### Example

REST may require:

``` text
GET /users/1
GET /users/1/orders
GET /orders/10/products
```

GraphQL can potentially request related information in one operation:

``` graphql
query {
  user(id: "1") {
    name
    orders {
      id
      products {
        name
      }
    }
  }
}
```

------------------------------------------------------------------------

## 15. What are the Advantages and Disadvantages of GraphQL?

### Advantages

-   Precise data fetching
-   Reduces over-fetching
-   Reduces under-fetching
-   Strongly typed schema
-   Good developer tooling
-   Flexible client queries
-   Can aggregate multiple data sources

### Disadvantages

-   Steeper learning curve
-   More complex server implementation
-   Query optimization can be difficult
-   Caching can be more complicated
-   Poorly designed queries can be expensive
-   Requires controls around query depth and complexity

------------------------------------------------------------------------

## 16. How Can You Version GraphQL Without Breaking Existing Clients?

GraphQL generally favors **schema evolution** instead of traditional API
versions such as:

``` text
/v1/users
/v2/users
```

Instead:

1.  Add new fields.
2.  Keep existing fields for current clients.
3.  Deprecate fields that should no longer be used.
4.  Remove deprecated fields only after clients have migrated.

Example:

``` graphql
type User {
  name: String
  fullName: String
}
```

The old field can be deprecated:

``` graphql
name: String @deprecated(reason: "Use fullName")
```

### Key idea

**Evolve the schema while maintaining backward compatibility.**

------------------------------------------------------------------------

# Advanced

## 17. What is Batching in GraphQL?

Batching combines multiple operations into fewer network requests.

Without batching:

``` text
Client -> Server
Client -> Server
Client -> Server
```

With batching:

``` text
Client -> Server
          ├── Request 1
          ├── Request 2
          └── Request 3
```

### Benefit

It can reduce:

-   Network round trips
-   Latency
-   Request overhead

### Important consideration

The server must still resolve the batched work efficiently.

Tools such as **DataLoader** can also help batch data fetching and
reduce repeated database calls.

------------------------------------------------------------------------

## 18. How Can GraphQL Queries Be Optimized?

Deeply nested or complex queries can become expensive.

Useful techniques include:

### 1. Query depth limiting

Limit how deeply a query can traverse the schema.

### 2. Query complexity analysis

Assign costs to fields and reject overly expensive operations.

### 3. Batching

Combine related data requests.

### 4. Caching

Cache frequently requested data where appropriate.

### 5. Efficient data loading

Avoid repeatedly querying the same underlying data.

### 6. Persisted queries

Store known queries on the server and reference them efficiently.

### 7. Database optimization

Use:

-   Proper indexes
-   Efficient joins
-   Pagination
-   Efficient query plans

### Key idea

GraphQL gives clients flexibility, so the server must put **guardrails**
around expensive queries.

------------------------------------------------------------------------

## 19. What Security Practices Are Important for a Public GraphQL API?

Important controls include:

-   Strong authentication
-   Proper authorization
-   Input validation
-   Input sanitization
-   Query depth limiting
-   Query complexity limits
-   Rate limiting
-   API monitoring
-   Secure schema design
-   Safe error responses
-   Protection of sensitive fields

### Important principle

Never assume that because GraphQL is strongly typed, it is automatically
secure.

The server still needs explicit security controls.

------------------------------------------------------------------------

## 20. How Can You Protect Against SQL Injection and DDoS Attacks?

### SQL Injection

Use:

-   Parameterized queries
-   Prepared statements
-   Input validation
-   Proper ORM/database APIs
-   Safe query construction

Avoid constructing SQL by concatenating user input.

### DDoS / Resource Exhaustion

Use:

-   Rate limiting
-   Query depth limits
-   Query complexity analysis
-   Request size limits
-   Monitoring
-   Web Application Firewalls
-   Caching where appropriate

### GraphQL-specific concern

A single GraphQL request can potentially represent a very expensive
operation.

Therefore, **query cost control** is particularly important.

------------------------------------------------------------------------

## 21. What are the Benefits and Challenges of Federated GraphQL in Microservices?

Federation allows different services to own different parts of a larger
GraphQL schema.

Example:

``` text
                  GraphQL Gateway
                        |
          +-------------+-------------+
          |             |             |
       User Service  Order Service  Product Service
```

Each service can own part of the domain while clients see a unified API.

### Benefits

-   Service ownership
-   Modular schema
-   Better alignment with microservices
-   Single API experience for clients
-   Independent service development

### Challenges

-   Schema consistency
-   Cross-service authorization
-   Error handling
-   Query planning
-   Inter-service latency
-   Distributed debugging
-   Avoiding inefficient service-to-service calls

------------------------------------------------------------------------

## 22. How Can You Create Custom Directives?

GraphQL directives provide additional instructions that can influence
execution or schema behavior.

A custom directive can be defined in the schema and implemented by the
server.

Example:

``` graphql
directive @auth on FIELD_DEFINITION
```

It could then be used as:

``` graphql
type Query {
  adminData: String @auth
}
```

### Possible use cases

-   Authorization
-   Logging
-   Field transformation
-   Deprecation
-   Conditional behavior
-   Business rules

### Simple idea

A directive acts like an **instruction attached to part of the GraphQL
schema or operation**.

------------------------------------------------------------------------

## 23. What is the Role of Serverless Functions in GraphQL?

In a serverless GraphQL architecture, GraphQL resolvers can execute
using serverless functions.

Conceptually:

``` text
Client
  |
  v
GraphQL API
  |
  v
Serverless Function
  |
  v
Database / Other Services
```

### Benefits

-   Automatic scaling
-   No continuously running application server
-   Potentially lower cost for sporadic traffic
-   Easy integration with other serverless services

### Good use cases

-   Unpredictable traffic
-   Sporadic workloads
-   Event-driven operations
-   Computational tasks
-   Integrations with serverless platforms

------------------------------------------------------------------------

## 24. How Do GraphQL Subscriptions Provide Real-Time Updates?

Subscriptions allow clients to receive updates when a particular event
occurs.

A persistent connection is commonly used, often through WebSockets.

Conceptually:

``` text
Client
  |
  | Subscribe
  v
GraphQL Server
  |
  | Event occurs
  v
Client receives update
```

Example:

``` graphql
subscription {
  messageAdded {
    id
    text
  }
}
```

When a new message is added, subscribed clients can receive the update.

### Common use cases

-   Chat applications
-   Notifications
-   Live dashboards
-   Real-time status updates
-   Collaborative applications

------------------------------------------------------------------------

# Quick Revision Cheat Sheet

  -----------------------------------------------------------------------
  Topic                               One-Line Answer
  ----------------------------------- -----------------------------------
  GraphQL                             Query language + server runtime for
                                      APIs

  Query                               Reads data

  Mutation                            Changes data

  Schema                              Contract describing available API
                                      capabilities

  Scalar                              Basic single-value type

  `!`                                 Non-nullable

  Resolver                            Function that obtains a field's
                                      value

  Variable                            Runtime value supplied to a
                                      query/mutation

  Introspection                       Querying the schema itself

  Authentication                      Verifies identity

  Authorization                       Checks permissions

  Error handling                      Errors are commonly returned
                                      alongside data

  REST vs GraphQL                     Fixed resource responses vs
                                      client-selected fields

  Schema evolution                    Add/deprecate fields instead of
                                      breaking existing clients

  Batching                            Combines multiple operations/data
                                      loads

  DataLoader                          Helps batch and cache data fetching

  Depth limiting                      Prevents excessively deep queries

  Complexity analysis                 Controls expensive queries

  Persisted queries                   Reuses stored/known queries

  Federation                          Combines schemas owned by multiple
                                      services

  Directive                           Adds execution/schema behavior

  Serverless GraphQL                  Resolver logic runs through
                                      serverless functions

  Subscription                        Real-time GraphQL operation
  -----------------------------------------------------------------------

## Interview Preparation Focus

For a backend or architect-level GraphQL interview, make sure you can
explain these especially well:

1.  GraphQL vs REST
2.  Schema and type system
3.  Queries vs mutations vs subscriptions
4.  Resolvers
5.  Variables and fragments
6.  Introspection
7.  Authentication vs authorization
8.  Error handling
9.  N+1 problem and DataLoader
10. Query depth and complexity limits
11. Caching
12. Schema evolution and deprecation
13. Federation in microservices
14. GraphQL security
15. Performance optimization
