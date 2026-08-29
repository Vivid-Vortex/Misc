Your question is clear. A slightly more natural version would be: **“In point three, also include using `Callable` and `Runnable` with `ExecutorService`, and give examples of both. Then regenerate the above answer.”**

# Q: What are the different ways of creating threads in Java?

In Java, there are **3 main approaches** you should know:

1. **Extending `Thread`**
2. **Implementing `Runnable`**
3. **Using `Runnable` / `Callable` with `ExecutorService`**

> **Important:** `ExecutorService` is generally preferred in real-world applications because it manages a pool of threads for you.

---

## 1. Extending the `Thread` class

The simplest approach is to extend `Thread`.

```java
class MyThread extends Thread {

    @Override
    public void run() {
        System.out.println("Thread is running");
    }
}

public class Main {
    public static void main(String[] args) {

        MyThread thread = new MyThread();
        thread.start();
    }
}
```

### How it works

```text
main()
  |
  |-- thread.start()
          |
          ↓
     New Thread
          |
          ↓
       run()
```

### Important: `start()` vs `run()`

You should call:

```java
thread.start();
```

NOT:

```java
thread.run();
```

`start()` tells the JVM to create a new thread and execute `run()` on that thread.

Whereas:

```java
thread.run();
```

is just a normal method call and executes on the current thread.

### Disadvantage

Java doesn't support multiple class inheritance.

So:

```java
class MyThread extends Thread
```

means `MyThread` cannot extend another class.

That's one reason `Runnable` is usually preferred over extending `Thread`.

---

# 2. Implementing `Runnable`

Instead of making your class a `Thread`, you make it represent the **task** that needs to be executed.

```java
class MyTask implements Runnable {

    @Override
    public void run() {
        System.out.println("Task is running");
    }
}

public class Main {
    public static void main(String[] args) {

        MyTask task = new MyTask();

        Thread thread = new Thread(task);
        thread.start();
    }
}
```

Think of it as:

```text
Runnable
   |
   |-- What should I do?
   |
   ↓
  run()


Thread
   |
   |-- Execute this task
   |
   ↓
 start()
```

### Advantage

Your class can still extend another class:

```java
class MyTask extends SomeClass implements Runnable {

    @Override
    public void run() {
        System.out.println("Running");
    }
}
```

So `Runnable` separates:

> **What to execute** from **which thread executes it**.

---

## 2.1 Runnable using Lambda

Since `Runnable` is a functional interface, we can make it much shorter.

```java
Runnable task = () -> {
    System.out.println("Thread is running");
};

Thread thread = new Thread(task);
thread.start();
```

Or:

```java
Thread thread = new Thread(() -> {
    System.out.println("Thread is running");
});

thread.start();
```

This is simply a shorter way of using `Runnable`.

---

# 3. Using `Runnable` / `Callable` with `ExecutorService` ⭐

This is the **most important approach for real-world Java applications**.

Instead of manually creating threads:

```java
Thread thread = new Thread(task);
thread.start();
```

we submit tasks to an `ExecutorService`.

The executor manages the threads for us.

---

## 3.1 Runnable with ExecutorService

```java
Runnable task = () -> {
    System.out.println("Task is running");
};

ExecutorService executor = Executors.newFixedThreadPool(2);

executor.submit(task);

executor.shutdown();
```

### What's happening?

```text
             ExecutorService
                   |
              Thread Pool
             /            \
        Thread 1        Thread 2
            |
          Task
```

We don't have to manually create and manage the thread.

The executor takes care of it.

### Why is this useful?

Suppose you have 1,000 tasks.

You don't want:

```text
1000 Tasks
   ↓
1000 Threads
```

Instead:

```text
1000 Tasks
     ↓
ExecutorService
     ↓
Thread Pool
     ↓
10 Threads
```

The threads can be **reused** to execute multiple tasks.

---

# 3.2 Callable with ExecutorService

`Runnable` is useful when we **don't need a return value**.

But what if our task needs to calculate something and return the result?

That's where `Callable` comes in.

```java
Callable<Integer> task = () -> {
    return 10 + 20;
};

ExecutorService executor = Executors.newSingleThreadExecutor();

Future<Integer> future = executor.submit(task);

System.out.println(future.get());

executor.shutdown();
```

Output:

```text
30
```

### Flow

```text
Callable
   |
   ↓
Task executes
   |
   ↓
Returns 30
   |
   ↓
Future
   |
   ↓
future.get()
   |
   ↓
30
```

### Runnable vs Callable

|                    | Runnable                                | Callable                    |
| ------------------ | --------------------------------------- | --------------------------- |
| Method             | `run()`                                 | `call()`                    |
| Return value       | ❌ No                                    | ✅ Yes                       |
| Exception          | Cannot throw checked exception directly | Can throw checked exception |
| Commonly used with | `Thread`, `ExecutorService`             | `ExecutorService`           |
| Result             | No result                               | `Future`                    |

---

# Q: What exactly does `ExecutorService` do?

Think of it as a **thread manager**.

Instead of you doing:

```java
Thread t1 = new Thread(task1);
Thread t2 = new Thread(task2);
Thread t3 = new Thread(task3);
```

you say:

```java
executor.submit(task1);
executor.submit(task2);
executor.submit(task3);
```

The `ExecutorService` decides which thread should execute each task.

```text
                 ExecutorService
                       |
                  Thread Pool
                /      |      \
               ↓       ↓       ↓
           Thread 1 Thread 2 Thread 3
               |       |       |
             Task 1  Task 2  Task 3
```

This gives you much better control over thread creation, reuse, and shutdown.

---

# Q: What are the main approaches I should remember?

### Approach 1 — Extend `Thread`

```java
class MyThread extends Thread {
    public void run() {
        System.out.println("Running");
    }
}

new MyThread().start();
```

**Use:** Basic/simple cases and learning.

---

### Approach 2 — Implement `Runnable`

```java
Runnable task = () -> {
    System.out.println("Running");
};

new Thread(task).start();
```

**Use:** When you want to separate the task from the thread.

---

### Approach 3 — ExecutorService ⭐

### Runnable

```java
ExecutorService executor = Executors.newFixedThreadPool(2);

executor.submit(() -> {
    System.out.println("Running");
});

executor.shutdown();
```

**Use:** When you have tasks that don't need to return a result.

### Callable

```java
ExecutorService executor = Executors.newFixedThreadPool(2);

Future<Integer> result = executor.submit(() -> 10 + 20);

System.out.println(result.get());

executor.shutdown();
```

**Use:** When you need a result from the task.

---

# Q: What's the simplest mental model?

Remember this:

```text
                TASK
             /        \
        Runnable    Callable
           |            |
           |            |
           ↓            ↓
     No return       Returns result
           \            /
            \          /
             ExecutorService
                    |
                    ↓
               Thread Pool
                    |
              ---------------
              |      |      |
           Thread  Thread  Thread
```

### ⭐ Interview answer

If the interviewer asks:

> **"What are the different ways of creating threads in Java?"**

You can say:

> "Traditionally, we can create a thread by extending the `Thread` class or implementing `Runnable`. We can also use `Callable` when we need a return value. In real-world applications, we generally use `ExecutorService` with a thread pool and submit `Runnable` or `Callable` tasks instead of manually creating threads."

**One correction to the terminology:** technically, `Runnable` and `Callable` **define tasks**, while `Thread` and the threads managed by `ExecutorService` are the actual execution threads. This distinction becomes very important when you learn Java concurrency.
