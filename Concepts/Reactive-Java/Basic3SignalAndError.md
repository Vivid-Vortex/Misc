# Reactor Signals & Error Propagation

## A Reactor pipeline sends only three kinds of signals:

| Signal           | Meaning                 |
| ---------------- | ----------------------- |
| `onNext(value)`  | ✅ A value               |
| `onComplete()`   | ✅ Finished successfully |
| `onError(error)` | ❌ Failed                |

---

## Easy Rule to Remember

* `map()` → Changes the **value**.
* `then()` → Discards the value, keeps only the **completion/error** signal.
* `onErrorMap()` → Changes the **error**.

This mental model helps you understand most Reactor operators.

---

## Important Note

There is **no `throw` keyword** in a Reactor pipeline.

Instead, Reactor sends an **error signal (`onError`)** to the **subscriber**.

* If the subscriber is **Spring WebFlux**, the error is propagated to WebFlux.
* Then `@ControllerAdvice` / `@RestControllerAdvice` handles the exception and generates the HTTP error response.

---

## Rules to Remember

* ✅ `onErrorMap()` replaces one exception with another.
* ✅ The new exception is propagated automatically.
* ✅ `then()` is **not executed** after an error.
* ✅ Spring WebFlux receives the mapped exception.
* ✅ `@RestControllerAdvice` catches it just like in Spring MVC.
