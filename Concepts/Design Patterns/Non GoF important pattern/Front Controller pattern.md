# Q: Explain the Front Controller Pattern with a Spring Boot example, since Spring Boot follows the Front Controller pattern.

You're **right on spot**. This is an important connection because once you understand Front Controller through Spring Boot, the pattern becomes much easier to remember.

## Q1: What is the Front Controller Pattern?

In simple terms:

> **Front Controller means having one central entry point that receives all incoming requests and then decides where each request should go.**

Instead of every request directly reaching its own controller/handler:

```text
Request
   |
   +----> UserController
   |
   +----> OrderController
   |
   +----> PaymentController
```

we have:

```text
                    ┌──> UserController
                    |
Request ---> Front Controller
                    |
                    ├──> OrderController
                    |
                    └──> PaymentController
```

The **Front Controller is a single centralized entry point**.

---

# Q2: What is the Front Controller in Spring Boot?

In a typical Spring Boot MVC application, the Front Controller is:

```text
DispatcherServlet
```

This is the key thing to remember for interviews:

> **Spring MVC uses the Front Controller pattern, and `DispatcherServlet` acts as the Front Controller.**

![Image](https://images.openai.com/static-rsc-4/7Gl563rcf4UBFEqxOOBGmRqnpOwyCI0pbbnAB5KaIdlgkVeVQMYK_YhHuM-uKazVi9r53qMvOq0Vll59jetSM6oC_m-Nzlb5Stc32d0nPkeACB-tnFvlbZbsG3f7tCJ46kDfRDw8HsjIlPJiK8GmNpSVIkftjhmvHW0GNM1AFgAllNr1HO3qPOp0rR-2LU03?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/1606ydV0oYmQog4PIlGpLAlzt8gPZPlAlsGp_O_hj5v0fwL5SUt9K9IFm11UHbSOuONznr_XEjqxS8uVfgYcZ49XPzEt8IstAJ8SM2w9-Fa_DJ1iU1AarBsK0v_-Gx2CLaqjc0Vx279bj385RZ00iWQ3Gz_0oiBzkAcfxTpzHGmOzhKVwawWdzUn7v17HRlg?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/iFG8x69xzuZ-UxoTReJqfUlUQvpm-qbU3B0JWr6egnbezkBTHFEIUnwAqZcQ7RfthG2DYRf2rdvUHV40bIkTIq1ghacZephioaP8GoPrgAQMG_DcRYHZOBbEwr7UZ9Ey-R8DAwQ5PfZZi7dzl40HRnH-bCcBwUqvv5qWH2Ekmwwm7AGyZ0_Ojo7r_zKFH0kA?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/LgGcWRaX3cr_AWgS_xhWWYhwMc8b-WSJo_lOvcr2j99Mv_7BVn4egM3j6JeJA06SNMjETxjBhdWTKi2qPAReJN5lZqo8fuQK-JsNpZ98vElkyD_LA9iyAYcCGlwFdvYeojOwGH97RMyADaZaZ0hdYkW89xfeoRJpGcrcSATFEUDYzI6ELahjMtbwEQxfyVOu?purpose=fullsize)

For example, suppose you have:

```java
@RestController
public class UserController {

    @GetMapping("/users")
    public String getUsers() {
        return "Users";
    }
}
```

And:

```java
@RestController
public class OrderController {

    @GetMapping("/orders")
    public String getOrders() {
        return "Orders";
    }
}
```

The browser makes:

```text
GET /users
```

It **doesn't directly call `UserController`**.

Instead:

```text
Browser
   |
   | GET /users
   ↓
DispatcherServlet
   |
   | "Who should handle /users?"
   ↓
UserController
   |
   ↓
"Users"
```

And for:

```text
GET /orders
```

the flow becomes:

```text
Browser
   |
   | GET /orders
   ↓
DispatcherServlet
   |
   | "Who should handle /orders?"
   ↓
OrderController
   |
   ↓
"Orders"
```

That's the Front Controller pattern.

---

# Q3: Why do we need a Front Controller?

Imagine an application without a Front Controller.

You might have:

```text
/users       ---> UserHandler
/orders      ---> OrderHandler
/payments    ---> PaymentHandler
/products    ---> ProductHandler
```

Each handler might have to deal with common things such as:

```text
Authentication
Logging
Exception handling
Request parsing
Authorization
Routing
```

This can become repetitive.

With a Front Controller:

```text
                    ┌──> UserController
                    |
                    ├──> OrderController
                    |
Request ---> DispatcherServlet
                    |
                    ├──> PaymentController
                    |
                    └──> ProductController
```

Common processing can happen centrally.

For example:

```text
Request
   |
   ↓
DispatcherServlet
   |
   ├── Authentication
   ├── Logging
   ├── Request processing
   ├── Exception handling
   |
   ↓
Find appropriate Controller
   |
   ↓
Controller
```

This gives us **centralized request handling**.

---

# Q4: What exactly happens when I call `/users` in Spring Boot?

Let's walk through the simplest flow.

Suppose we have:

```java
@RestController
public class UserController {

    @GetMapping("/users")
    public String getUsers() {
        return "Users";
    }
}
```

Now the client sends:

```text
GET /users
```

### Step 1 — Request enters the application

```text
Client
  |
  | GET /users
  ↓
Spring Boot application
```

### Step 2 — DispatcherServlet receives it

```text
Client
  |
  ↓
DispatcherServlet
```

This is the **Front Controller**.

### Step 3 — DispatcherServlet determines the handler

It basically asks:

```text
"/users"

Who handles this URL?
```

Spring's MVC infrastructure finds:

```text
UserController.getUsers()
```

### Step 4 — Controller executes

```java
public String getUsers() {
    return "Users";
}
```

### Step 5 — Response goes back

```text
UserController
      |
      ↓
DispatcherServlet
      |
      ↓
Client
```

So the complete simplified flow is:

```text
Client
  |
  | GET /users
  ↓
DispatcherServlet
  |
  | Find handler
  ↓
UserController
  |
  | getUsers()
  ↓
DispatcherServlet
  |
  ↓
Client
```

---

# Q5: Is `DispatcherServlet` itself a Controller?

This is an important distinction.

`DispatcherServlet` is a **Servlet**, not one of your application controllers like:

```java
@RestController
class UserController
```

Its job is to act as the **central dispatcher**.

Think:

```text
DispatcherServlet
       ↓
"Where should this request go?"
       ↓
UserController
OrderController
PaymentController
...
```

So:

| Component           | Role                             |
| ------------------- | -------------------------------- |
| `DispatcherServlet` | Front Controller                 |
| `UserController`    | Handles user-related requests    |
| `OrderController`   | Handles order-related requests   |
| `PaymentController` | Handles payment-related requests |

---

# Q6: How does Spring know which Controller to call?

This is where Spring MVC's request mapping infrastructure comes into play.

For:

```java
@GetMapping("/users")
public String getUsers() {
    return "Users";
}
```

Spring registers the mapping roughly as:

```text
GET /users
       ↓
UserController.getUsers()
```

When the request arrives:

```text
GET /users
```

`DispatcherServlet` uses Spring MVC's handler-mapping mechanism to find the appropriate handler.

Conceptually:

```text
DispatcherServlet
       |
       ↓
Handler Mapping
       |
       ↓
GET /users
       |
       ↓
UserController.getUsers()
```

You don't normally have to manually write this routing logic.

Spring does it for you.

---

# Q7: Where does the Front Controller Pattern fit into the GoF patterns?

This is an important interview distinction.

**Front Controller is NOT one of the 23 GoF Design Patterns.**

The GoF patterns are categorized as:

```text
Creational
Structural
Behavioral
```

Front Controller is generally classified as a **Java EE / Enterprise application architectural pattern**.

So if an interviewer asks:

> "Is Front Controller a GoF pattern?"

Answer:

> **No. Front Controller is an architectural/enterprise pattern, not one of the 23 Gang of Four design patterns. Spring MVC uses this pattern through `DispatcherServlet`.**

---

# Q8: What problem does Front Controller solve?

The easiest way to remember it:

### Without Front Controller

```text
Request
   |
   +----> Handler A
   |
   +----> Handler B
   |
   +----> Handler C
```

Common logic can become scattered.

### With Front Controller

```text
                ┌──> Handler A
                |
Request ---> Front Controller
                |
                ├──> Handler B
                |
                └──> Handler C
```

Common request-processing concerns can be centralized.

For example:

```text
                 DispatcherServlet
                        |
        ┌───────────────┼───────────────┐
        ↓               ↓               ↓
 Authentication      Logging      Exception handling
                        |
                        ↓
                 Find Controller
                        |
          ┌─────────────┼─────────────┐
          ↓             ↓             ↓
       User          Order         Payment
```

This is the **main benefit**.

---

# Q9: Is Spring Boot itself implementing Front Controller?

Be precise here.

It's better to say:

> **Spring MVC implements the Front Controller pattern using `DispatcherServlet`.**

Spring Boot makes configuring and running Spring MVC much easier, but the actual Front Controller concept comes from **Spring MVC**.

So:

```text
Spring Boot
    |
    ↓
Spring MVC
    |
    ↓
DispatcherServlet
    |
    ↓
Front Controller Pattern
```

---

# Q10: How should I explain this in an interview?

A strong but simple answer would be:

> **Front Controller is an architectural pattern where a single central component receives incoming requests and dispatches them to the appropriate handlers. In Spring MVC, `DispatcherServlet` acts as the Front Controller. All incoming HTTP requests first reach the `DispatcherServlet`, which uses Spring MVC's handler mapping to identify the appropriate controller and then dispatches the request to it. This allows common concerns such as request processing, exception handling, and other cross-cutting concerns to be centralized instead of being duplicated across individual controllers.**

### One-line version

> **"In Spring MVC, `DispatcherServlet` is the Front Controller because all incoming requests pass through it before being dispatched to the appropriate controller."**

---

## Q11: What's the easiest way to remember it?

Think of an **airport reception desk**:

```text
Passenger
    |
    ↓
Reception / Information Desk
    |
    ├── International
    ├── Domestic
    ├── Baggage
    └── Security
```

The passenger doesn't need to figure out which department to contact.

The central desk receives the request and routes it appropriately.

Similarly:

```text
HTTP Request
     |
     ↓
DispatcherServlet
     |
     ├── UserController
     ├── OrderController
     ├── ProductController
     └── PaymentController
```

**DispatcherServlet = central reception desk.**

That's essentially the **Front Controller pattern**.
