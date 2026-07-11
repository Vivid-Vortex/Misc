A **Servlet** is a Java class that handles HTTP requests and responses in a web application. It is part of the **Jakarta Servlet API** (formerly Java Servlet API) and runs inside a **servlet container** such as Apache Tomcat or Jetty.

In Spring, especially **Spring MVC**, servlets are the foundation of how web requests are processed.

### How a servlet works

When a user opens a URL in a browser:

1. The browser sends an HTTP request.
2. The servlet container receives the request.
3. The servlet processes the request.
4. The servlet generates an HTTP response.
5. The response is sent back to the browser.

A basic Java servlet looks like this:

```java
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws IOException {

        response.getWriter().println("Hello, World!");
    }
}
```

---

## Servlet in Spring MVC

In Spring MVC, you usually **don't write servlets yourself**. Instead, Spring provides a special servlet called the **DispatcherServlet**.

DispatcherServlet is the central servlet that receives every incoming request.

The flow is:

```
Browser
   |
HTTP Request
   |
DispatcherServlet
   |
Handler Mapping
   |
Controller
   |
Service
   |
Repository
   |
Database
   |
Response
   |
DispatcherServlet
   |
Browser
```

---

## Example in Spring Boot

Controller:

```java
@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello Spring!";
    }
}
```

When you visit:

```
http://localhost:8080/hello
```

The request flow is:

```
Client
   |
   ▼
DispatcherServlet
   |
   ▼
HelloController
   |
   ▼
Returns "Hello Spring!"
```

Notice that **you never create a servlet class**. Spring Boot automatically configures the `DispatcherServlet`.

---

## Why Spring uses DispatcherServlet

Without Spring:

```
Request
   |
   ▼
HelloServlet
```

Each servlet handles its own URL.

With Spring:

```
Request
   |
   ▼
DispatcherServlet
      ├── UserController
      ├── ProductController
      └── OrderController
```

One servlet (`DispatcherServlet`) receives all requests and routes them to the appropriate controller method.

---

## Servlet vs Controller

| Servlet | Spring Controller |
|----------|-------------------|
| Java EE/Jakarta component | Spring component |
| Extends `HttpServlet` | Uses `@Controller` or `@RestController` |
| Handles HTTP requests directly | Business logic is written in methods annotated with `@GetMapping`, `@PostMapping`, etc. |
| Manual configuration | Managed automatically by Spring Boot |

---

## Key points

* A **Servlet** is a Java class that handles HTTP requests and responses.
* It runs inside a servlet container like Tomcat.
* Spring MVC is built on the Servlet API.
* Spring provides **DispatcherServlet**, a front controller that handles all incoming requests.
* In Spring Boot, you typically write controllers rather than custom servlets, because the framework handles servlet configuration for you.

In short, **a servlet is the low-level request handler, while Spring's `DispatcherServlet` uses that servlet mechanism to route requests to your controller methods.**
