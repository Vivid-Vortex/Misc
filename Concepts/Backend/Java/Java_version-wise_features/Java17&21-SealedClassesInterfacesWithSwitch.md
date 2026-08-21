You’re right. A more natural version of your request is:

> **I think sealed classes have significant value when used with `switch`. A real-life example could be a REST API call returning `Success`, `Failure`, or `Loading`. We can define a sealed interface for the API result and permit only these three implementations. Please explain how sealed classes/interfaces work with `switch`, cover the Java versions and evolution of this feature, especially Java 17 sealed classes/interfaces and Java 21 pattern matching for `switch`, and generate a complete Markdown file.**

Below is the complete Markdown content.

# Java Sealed Classes and Interfaces with Switch — Java 17 to Java 21

## Table of Contents

* [1. Introduction](#1-introduction)
* [2. What Problem Do Sealed Classes Solve?](#2-what-problem-do-sealed-classes-solve)
* [3. Real-Life REST API Example](#3-real-life-rest-api-example)
* [4. Sealed Classes vs Sealed Interfaces](#4-sealed-classes-vs-sealed-interfaces)
* [5. Java 17: Sealed Classes and Interfaces](#5-java-17-sealed-classes-and-interfaces)
* [6. Java 17 with Traditional Switch](#6-java-17-with-traditional-switch)
* [7. Java 21: Pattern Matching for Switch](#7-java-21-pattern-matching-for-switch)
* [8. Java 21: Exhaustive Switch with Sealed Types](#8-java-21-exhaustive-switch-with-sealed-types)
* [9. Java 17 vs Java 21 Comparison](#9-java-17-vs-java-21-comparison)
* [10. Complete REST API Result Example](#10-complete-rest-api-result-example)
* [11. Why Sealed Types Are Powerful with Switch](#11-why-sealed-types-are-powerful-with-switch)
* [12. Constructors and Constructors in Sealed Classes](#12-constructors-and-constructors-in-sealed-classes)
* [13. Common Interview Questions](#13-common-interview-questions)
* [14. Cheat Sheet](#14-cheat-sheet)
* [15. Key Takeaway](#15-key-takeaway)

---

# 1. Introduction

## What are sealed classes and sealed interfaces?

A **sealed class or interface** restricts which classes are allowed to extend or implement it.

For example:

```java
public sealed interface ApiResult
        permits Success, Failure, Loading {
}
```

This means only these three types can implement `ApiResult`:

```java
Success
Failure
Loading
```

No other class can implement it.

This makes the type hierarchy **closed and controlled**.

---

# 2. What Problem Do Sealed Classes Solve?

Consider a normal interface:

```java
public interface ApiResult {
}
```

Anyone can create:

```java
class Success implements ApiResult {
}

class Failure implements ApiResult {
}

class Loading implements ApiResult {
}

class SomethingElse implements ApiResult {
}
```

There is no restriction.

But suppose your application logically supports only three API states:

1. `Success`
2. `Failure`
3. `Loading`

Then allowing arbitrary implementations is not desirable.

With a sealed interface:

```java
public sealed interface ApiResult
        permits Success, Failure, Loading {
}
```

Java restricts the hierarchy.

Now this is invalid:

```java
class SomethingElse implements ApiResult {
}
```

The compiler will reject it.

---

# 3. Real-Life REST API Example

A REST API request commonly has three possible states.

```text
API Request
     |
     v
+------------------+
|    ApiResult     |
+------------------+
     |
     +----------------------+
     |          |           |
     v          v           v
  Success     Failure     Loading
```

We can model this using a sealed interface.

```java
public sealed interface ApiResult<T>
        permits Success, Failure, Loading {
}
```

The implementations:

```java
public final class Success<T> implements ApiResult<T> {

    private final T data;

    public Success(T data) {
        this.data = data;
    }

    public T getData() {
        return data;
    }
}
```

```java
public final class Failure<T> implements ApiResult<T> {

    private final String errorMessage;

    public Failure(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
```

```java
public final class Loading<T> implements ApiResult<T> {
}
```

Now every API result must be one of these:

```java
Success<T>
Failure<T>
Loading<T>
```

This is a strong domain model.

---

# 4. Sealed Classes vs Sealed Interfaces

## Sealed Class

Use a sealed class when you want to share common implementation.

```java
public sealed class ApiResult
        permits Success, Failure {
}
```

The subclasses can extend the base class.

```java
public final class Success extends ApiResult {
}

public final class Failure extends ApiResult {
}
```

## Sealed Interface

Use a sealed interface when you primarily want to define a restricted set of types.

```java
public sealed interface ApiResult
        permits Success, Failure, Loading {
}
```

```java
public final class Success implements ApiResult {
}

public final class Failure implements ApiResult {
}

public final class Loading implements ApiResult {
}
```

### For the REST API result example, `sealed interface` is usually better.

Why?

Because `Success`, `Failure`, and `Loading` represent different states rather than different implementations sharing a common class.

---

# 5. Java 17: Sealed Classes and Interfaces

Sealed classes and interfaces became a standard feature in **Java 17**.

Basic syntax:

```java
public sealed interface ApiResult
        permits Success, Failure, Loading {
}
```

Every permitted subclass must explicitly declare what happens to inheritance.

It must be one of:

```text
final
sealed
non-sealed
```

For example:

```java
public final class Success implements ApiResult {
}
```

```java
public final class Failure implements ApiResult {
}
```

```java
public final class Loading implements ApiResult {
}
```

---

## The Three Important Modifiers

### 1. `final`

No one can extend it further.

```java
public final class Success implements ApiResult {
}
```

```text
ApiResult
    |
    +-- Success
```

Inheritance stops at `Success`.

---

### 2. `sealed`

The class can continue restricting its subclasses.

```java
public sealed class ApiError
        permits ValidationError, SystemError {
}
```

---

### 3. `non-sealed`

The hierarchy becomes open again from that point.

```java
public non-sealed class Failure implements ApiResult {
}
```

Now anyone can extend `Failure`.

```java
class CustomFailure extends Failure {
}
```

Therefore:

```text
sealed interface
        |
        v
non-sealed class
        |
        v
Hierarchy becomes open
```

---

# 6. Java 17 with Traditional Switch

This is where an important distinction exists.

Java 17 supports sealed classes/interfaces, but **full pattern matching for `switch` was not yet a standard feature**.

Suppose:

```java
ApiResult<String> result = getResult();
```

In Java 17, you would commonly use:

```java
if (result instanceof Success<String> success) {
    System.out.println(success.getData());

} else if (result instanceof Failure<String> failure) {
    System.out.println(failure.getErrorMessage());

} else if (result instanceof Loading<String>) {
    System.out.println("Loading...");
}
```

This uses pattern matching for `instanceof`.

The key feature is:

```java
if (result instanceof Success<String> success)
```

Instead of:

```java
if (result instanceof Success) {
    Success success = (Success) result;
}
```

Java automatically performs the type check and casting.

---

## Java 17 Style

```java
public void handle(ApiResult<String> result) {

    if (result instanceof Success<String> success) {
        System.out.println("Data: " + success.getData());

    } else if (result instanceof Failure<String> failure) {
        System.out.println("Error: " + failure.getErrorMessage());

    } else if (result instanceof Loading<String>) {
        System.out.println("Loading...");
    }
}
```

This is better than traditional casting, but still involves multiple `if-else` statements.

---

# 7. Java 21: Pattern Matching for Switch

Java 21 makes the sealed hierarchy much more powerful with **Pattern Matching for `switch`**.

Now we can directly switch based on the actual subtype.

```java
public String handle(ApiResult<String> result) {

    return switch (result) {

        case Success<String> success ->
                "Data: " + success.getData();

        case Failure<String> failure ->
                "Error: " + failure.getErrorMessage();

        case Loading<String> loading ->
                "Loading...";
    };
}
```

This is extremely clean.

---

## What Java Does for Us

Java understands:

```java
ApiResult
```

can only be:

```text
Success
Failure
Loading
```

Therefore, this `switch` handles every possible subtype.

```java
switch (result) {

    case Success<String> success -> ...

    case Failure<String> failure -> ...

    case Loading<String> loading -> ...
}
```

No unnecessary `default` case is required.

This is called an **exhaustive switch**.

---

# 8. Java 21: Exhaustive Switch with Sealed Types

This is the biggest significance of sealed classes with `switch`.

Consider:

```java
public sealed interface ApiResult<T>
        permits Success, Failure, Loading {
}
```

Java knows exactly which implementations are possible.

Therefore:

```java
return switch (result) {

    case Success<String> success ->
            "Success";

    case Failure<String> failure ->
            "Failure";

    case Loading<String> loading ->
            "Loading";
};
```

is complete.

---

## What Happens When You Add a New State?

Suppose later you add:

```java
public final class Empty<T> implements ApiResult<T> {
}
```

You must also update:

```java
public sealed interface ApiResult<T>
        permits Success, Failure, Loading, Empty {
}
```

Now your existing switch becomes incomplete:

```java
return switch (result) {

    case Success<String> success ->
            "Success";

    case Failure<String> failure ->
            "Failure";

    case Loading<String> loading ->
            "Loading";
};
```

The compiler forces you to handle the new type.

You must add:

```java
case Empty<String> empty ->
        "No data available";
```

This is a major advantage.

```text
Change domain model
        |
        v
Compiler detects affected switches
        |
        v
Developer updates the logic
```

The compiler helps prevent forgotten cases.

---

# 9. Java 17 vs Java 21 Comparison

| Feature                                 | Java 17                     | Java 21                   |
| --------------------------------------- | --------------------------- | ------------------------- |
| Sealed classes                          | Yes                         | Yes                       |
| Sealed interfaces                       | Yes                         | Yes                       |
| `permits` keyword                       | Yes                         | Yes                       |
| Pattern matching for `instanceof`       | Yes                         | Yes                       |
| Pattern matching for `switch`           | Preview in earlier versions | Standard                  |
| Exhaustive switch with sealed hierarchy | Limited by switch support   | Strongly supported        |
| Pattern variables inside `switch`       | No standard support         | Yes                       |
| Recommended syntax                      | `if instanceof`             | Pattern matching `switch` |

---

## Java 17

```java
if (result instanceof Success<String> success) {
    return success.getData();

} else if (result instanceof Failure<String> failure) {
    return failure.getErrorMessage();

} else if (result instanceof Loading<String>) {
    return "Loading...";
}
```

## Java 21

```java
return switch (result) {

    case Success<String> success ->
            success.getData();

    case Failure<String> failure ->
            failure.getErrorMessage();

    case Loading<String> loading ->
            "Loading...";
};
```

Java 21 is more declarative and easier to maintain.

---

# 10. Complete REST API Result Example

## Step 1: Create the Sealed Interface

```java
public sealed interface ApiResult<T>
        permits Success, Failure, Loading {
}
```

---

## Step 2: Create `Success`

```java
public final class Success<T> implements ApiResult<T> {

    private final T data;

    public Success(T data) {
        this.data = data;
    }

    public T getData() {
        return data;
    }
}
```

---

## Step 3: Create `Failure`

```java
public final class Failure<T> implements ApiResult<T> {

    private final String errorMessage;

    public Failure(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
```

---

## Step 4: Create `Loading`

```java
public final class Loading<T> implements ApiResult<T> {
}
```

---

## Step 5: Use Java 21 Pattern Matching Switch

```java
public class ApiResultHandler {

    public String handle(ApiResult<String> result) {

        return switch (result) {

            case Success<String> success ->
                    "API Response: " + success.getData();

            case Failure<String> failure ->
                    "API Failed: " + failure.getErrorMessage();

            case Loading<String> loading ->
                    "API is loading...";
        };
    }
}
```

---

## Step 6: Use It

```java
public class Main {

    public static void main(String[] args) {

        ApiResult<String> result =
                new Success<>("User fetched successfully");

        ApiResultHandler handler =
                new ApiResultHandler();

        String message = handler.handle(result);

        System.out.println(message);
    }
}
```

Output:

```text
API Response: User fetched successfully
```

---

# 11. Why Sealed Types Are Powerful with Switch

Without sealed types:

```java
public interface ApiResult {
}
```

Java cannot know all possible implementations.

Therefore:

```text
ApiResult
    |
    +-- Unknown Implementation 1
    +-- Unknown Implementation 2
    +-- Unknown Implementation 3
```

With sealed types:

```java
public sealed interface ApiResult
        permits Success, Failure, Loading {
}
```

The compiler knows:

```text
ApiResult
    |
    +-- Success
    +-- Failure
    +-- Loading
```

Because the set is known, the compiler can verify whether the `switch` handles all possible states.

This gives:

* Better type safety
* Better domain modeling
* Fewer forgotten cases
* Cleaner `switch` statements
* Less need for `default`
* Compile-time checking
* Better maintainability

---

# 12. Constructors and Constructors in Sealed Classes

Sealed classes do not introduce special constructor types.

They can have the same constructors as normal classes.

## Default Constructor

```java
public sealed class ApiResult
        permits Success, Failure {

    public ApiResult() {
    }
}
```

---

## Parameterized Constructor

```java
public sealed class ApiResult
        permits Success, Failure {

    private final String requestId;

    public ApiResult(String requestId) {
        this.requestId = requestId;
    }
}
```

A subclass calls the parent constructor:

```java
public final class Success extends ApiResult {

    public Success(String requestId) {
        super(requestId);
    }
}
```

---

## Constructor Overloading

You can overload constructors normally.

```java
public sealed class ApiResult
        permits Success, Failure {

    private final String requestId;

    public ApiResult() {
        this.requestId = "UNKNOWN";
    }

    public ApiResult(String requestId) {
        this.requestId = requestId;
    }
}
```

The important point is:

> **Sealed classes restrict inheritance. They do not change normal constructor behavior.**

---

# 13. Common Interview Questions

## Q1. What is a sealed class?

A sealed class restricts which classes can extend it.

```java
public sealed class Animal
        permits Dog, Cat {
}
```

Only `Dog` and `Cat` can extend `Animal`.

---

## Q2. What is a sealed interface?

A sealed interface restricts which classes can implement it.

```java
public sealed interface Payment
        permits CardPayment, UpiPayment {
}
```

Only the permitted classes can implement it.

---

## Q3. Which Java version introduced sealed classes?

Sealed classes became a standard feature in:

```text
Java 17
```

---

## Q4. Which Java version introduced standard pattern matching for switch?

Pattern matching for `switch` became a standard feature in:

```text
Java 21
```

---

## Q5. Why are sealed classes useful with switch?

Because Java knows all possible subclasses.

```java
sealed interface ApiResult
        permits Success, Failure, Loading
```

Therefore Java can verify:

```java
switch (result)
```

handles all possible cases.

---

## Q6. What are the possible modifiers for a permitted subclass?

A direct permitted subclass must be:

```text
final
sealed
non-sealed
```

---

## Q7. Why is `default` sometimes unnecessary?

Because Java knows every possible implementation.

```java
return switch (result) {

    case Success success -> "Success";
    case Failure failure -> "Failure";
    case Loading loading -> "Loading";
};
```

All permitted types are covered.

---

# 14. Cheat Sheet

## Java 17

```java
public sealed interface ApiResult
        permits Success, Failure, Loading {
}
```

Use:

```java
if (result instanceof Success<String> success) {
    // handle success
}
```

---

## Java 21

```java
return switch (result) {

    case Success<String> success ->
            success.getData();

    case Failure<String> failure ->
            failure.getErrorMessage();

    case Loading<String> loading ->
            "Loading...";
};
```

---

## The Best Combination

```text
Java 17
   |
   +-- Sealed Classes
   +-- Sealed Interfaces
   +-- Pattern Matching for instanceof
```

```text
Java 21
   |
   +-- All Java 17 features
   +-- Pattern Matching for switch
   +-- Exhaustive switch over sealed hierarchy
```

---

# 15. Key Takeaway

The real power of sealed classes is not just:

```java
permits Success, Failure, Loading
```

The bigger significance appears when combined with **Java 21 pattern matching for `switch`**.

```java
return switch (apiResult) {

    case Success<String> success ->
            handleSuccess(success);

    case Failure<String> failure ->
            handleFailure(failure);

    case Loading<String> loading ->
            handleLoading();
};
```

The sealed hierarchy defines the **complete set of possible states**:

```text
Success
Failure
Loading
```

And `switch` forces you to explicitly handle them.

If tomorrow a new state is introduced:

```text
Empty
```

the compiler can identify switches that need to be updated.

Therefore, the strongest real-world mental model is:

> **Use a sealed class or interface when your domain has a fixed and meaningful set of possible types. Use Java 21 pattern matching with `switch` when different behavior should be performed for each type.**

For your example, the REST API state model is a very good real-world use case:

```text
ApiResult<T>
     |
     +-- Success<T>
     |
     +-- Failure<T>
     |
     +-- Loading<T>
```

And Java 21 `switch` makes handling these states clean, readable, and compiler-safe.

---

### My recommendation

For your Java/Spring Boot learning and interviews, remember this association:

```text
Java 17
    Sealed hierarchy

        +

Java 21
    Pattern matching switch

        =

Closed domain model
+
Exhaustive compiler-checked behavior
```

This is one of the best modern Java examples to demonstrate how language features improve **domain modeling and type safety**.
