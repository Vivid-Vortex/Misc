# FlatMap Operator in Project Reactor

`flatMap` is used when your mapping function returns another `Publisher` (`Mono` or `Flux`).
It automatically **flattens the nested publisher**, so you get the emitted values instead of a nested `Mono` or `Flux`.

For example:

```java
Mono<User> findById(int id);

Flux.just(1, 2, 3)
    .flatMap(id -> repository.findById(id));
```

You get:

- `User1` and **not** `Mono<User1>` because `flatMap` unwraps the returned `Mono<User>`.
- `User2` and **not** `Mono<User2>` because of `flatMap`.

---

# Real Use Case

## Use of `flatMap` in Spring WebFlux

Example: We need to make another database call after fetching the user.

This is where `flatMap()` is needed.

Suppose we have the following tables.

### User Table

**User**

| Column |
|---------|
| id |
| name |
| addressId |

### Address Table

**Address**

| Column |
|---------|
| id |
| city |
| country |

## Repositories

```java
Mono<User> findById(Long id);
```

### Address Repository

```java
Mono<Address> findById(Long id);
```

## Service

```java
public Mono<Address> getAddress(Long userId) {

    return repository.findById(userId)
            .flatMap(user ->
                    addressRepository.findById(user.getAddressId()));
    // We use flatMap because the lambda returns Mono<Address>.
    // flatMap unwraps it and returns Mono<Address>, not Mono<Mono<Address>>.
}
```

## Step-by-Step Explanation

First,

```java
repository.findById(userId)
```

returns

```java
Mono<User>
```

When the `User` arrives,

you execute

```java
addressRepository.findById(...)
```

which returns

```java
Mono<Address>
```

So your lambda is doing:

```text
User
  ↓
Mono<Address>
```

Since the lambda returns a `Mono`, use `flatMap()`.

## Why Not `map()`?

Suppose you wrote:

```java
repository.findById(userId)
    .map(user ->
        addressRepository.findById(user.getAddressId()));
```

The lambda returns a `Mono<Address>`.

Since `map()` wraps whatever the lambda returns, the result becomes:

```java
Mono<Mono<Address>>
```

which looks like:

```text
Mono
 └── Mono
      └── Address
```

Think of it as **a box inside another box**.

You usually don't want that.

`flatMap()` removes one level of wrapping (flattens the nested publisher), so the result is simply:

```java
Mono<Address>
```

which looks like:

```text
Mono
 └── Address
```

**Rule:** If your lambda returns a `Mono` or `Flux`, use **`flatMap()`**, not **`map()`**.

---

# `map` vs `flatMap`

`map`, as you know from Java Streams, is used for **synchronous transformations**—when you convert one object into another object.

Using the same example:

```java
Mono<User> findById(int id);

Flux.just(1, 2, 3)
    .map(id -> new Profile(
            repository.findById(id),
            List<Contact>,
            ...
    ));
```

You will get:

```text
Profile1
Profile2
etc.
```

Here, the lambda returns a `Profile` object, **not** a `Mono<Profile>`, so `map` is the correct choice.

---

## Rule of Thumb

- If your lambda returns a **normal object**, use **`map()`**.
- If your lambda returns a **`Mono` or `Flux`**, use **`flatMap()`**.
