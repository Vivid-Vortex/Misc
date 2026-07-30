# FlatMap Operator in Project Reactor

`flatMap` flattens the publisher and returns the actual object inside that publisher.

For example:

```java
Mono<User> findById(int id);

Flux.just(1, 2, 3)
    .flatMap(id -> repository.findById(id));
```

You get:

- `User1` and **not** `Mono<User1>` because of `flatMap`.
- `User2` and **not** `Mono<User2>` because of `flatMap`.

## Real Use Case

### Use of `flatMap` in Spring WebFlux

Example 3: Now we need another database call.

This is where `flatMap()` is needed.

Suppose we have the following tables.

### User Table

**User**

| Column |
|--------|
| id |
| name |
| addressId |

### Address Table

**Address**

| Column |
|--------|
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
            .flatMap(user -> addressRepository.findById(user.getAddressId())); // Here you need flatmap becuase above findById is returning Map<Addres> but you need address to pass in below method.
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

So you're doing

```text
User
   ↓
Mono<Address>
```

Whenever your lambda returns a `Mono`, use `flatMap()`.

---

# `map` vs `flatMap`

`map`, as you know from Java Streams, is used to convert one form into another.

Using the same example as above:

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
