## Your question

> **Explain Comparable and Comparator in simple terms. Give one traditional example without lambda expressions and one example with lambda expressions for both Comparable and Comparator.**

You're right on spot. Let's make this very simple first.

# Q: What are Comparable and Comparator?

Both are used to **sort objects**.

Imagine we have:

```java
Employee e1 = new Employee(101, "John", 50000);
Employee e2 = new Employee(102, "Alex", 30000);
Employee e3 = new Employee(103, "Bob", 40000);
```

If we say:

> "Sort employees by salary."

Java needs to know **how one Employee should be compared with another Employee**.

That's where `Comparable` and `Comparator` come in.

### The easiest way to remember

|                         | Comparable                                                  | Comparator                          |
| ----------------------- | ----------------------------------------------------------- | ----------------------------------- |
| Meaning                 | "I know how to compare myself"                              | "I know how to compare two objects" |
| Method                  | `compareTo()`                                               | `compare()`                         |
| Where written?          | Inside the class being sorted                               | Usually outside the class           |
| Number of sorting rules | Usually **one natural/default rule**                        | Can have **multiple rules**         |
| Lambda                  | ❌ Cannot directly make `Comparable` implementation a lambda | ✅ Very commonly used with lambda    |
| Package                 | `java.lang`                                                 | `java.util`                         |

---

# 1. Comparable

## Q: What does Comparable mean?

Think:

> **Comparable = The object itself knows how to compare itself.**

For example, suppose we decide:

> Employee's natural ordering = salary.

Then `Employee` implements `Comparable<Employee>`.

---

# Q: What is the traditional way without lambda?

```java
import java.util.*;

class Employee implements Comparable<Employee> {

    int id;
    String name;
    int salary;

    Employee(int id, String name, int salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    @Override
    public int compareTo(Employee other) {
        return this.salary - other.salary;
    }

    @Override
    public String toString() {
        return name + " : " + salary;
    }
}

public class Main {
    public static void main(String[] args) {

        List<Employee> employees = new ArrayList<>();

        employees.add(new Employee(101, "John", 50000));
        employees.add(new Employee(102, "Alex", 30000));
        employees.add(new Employee(103, "Bob", 40000));

        Collections.sort(employees);

        System.out.println(employees);
    }
}
```

Output:

```text
Alex : 30000
Bob : 40000
John : 50000
```

### What's happening?

This is the important part:

```java
class Employee implements Comparable<Employee>
```

We're saying:

> "Employee has a natural way of comparing itself."

Then:

```java
public int compareTo(Employee other) {
    return this.salary - other.salary;
}
```

Here:

```text
this.salary       other.salary
     ↓                 ↓
   50000             30000

50000 - 30000 = positive
```

So Java understands:

```text
50000 > 30000
```

---

# Q: What does `compareTo()` return?

This is **very important for interviews**.

It doesn't have to return exactly `-1`, `0`, or `1`.

It only needs to follow:

```text
negative → this object comes BEFORE other

zero     → both are considered EQUAL for sorting

positive → this object comes AFTER other
```

For example:

```java
return this.salary - other.salary;
```

If:

```text
this.salary = 30000
other.salary = 50000
```

then:

```text
30000 - 50000 = -20000
```

Negative → `this` comes before `other`.

---

# Q: Can Comparable use a lambda expression?

**No, not directly.**

Why?

Because `Comparable` is an interface whose comparison behavior is implemented as part of the class's `compareTo()` method.

You normally write:

```java
class Employee implements Comparable<Employee> {
    
    @Override
    public int compareTo(Employee other) {
        return this.salary - other.salary;
    }
}
```

You cannot simply do:

```java
Employee implements Comparable<Employee> -> ...
```

with a lambda.

### Why?

Because although `Comparable` has one abstract method, the lambda would need to represent a `Comparable` object, not modify the `Employee` class's implementation.

For normal object sorting, **Comparable is traditionally implemented with `compareTo()` inside the class**.

---

# 2. Comparator

Now let's say something different.

Our `Employee` class has:

```text
id
name
salary
```

Today we want:

> Sort by salary.

Tomorrow:

> Sort by name.

Day after tomorrow:

> Sort by ID.

Should we keep changing `Employee.compareTo()`?

**No.**

This is where `Comparator` is useful.

---

# Q: What does Comparator mean?

Think:

> **Comparator = A separate person/object that knows how to compare two objects.**

So instead of:

```text
Employee → "I know how to compare myself"
```

we have:

```text
Comparator → "I know how to compare two Employees"
```

---

# Q: Traditional Comparator without lambda

Let's sort employees by salary.

```java
import java.util.*;

class Employee {

    int id;
    String name;
    int salary;

    Employee(int id, String name, int salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    @Override
    public String toString() {
        return name + " : " + salary;
    }
}

class SalaryComparator implements Comparator<Employee> {

    @Override
    public int compare(Employee e1, Employee e2) {
        return e1.salary - e2.salary;
    }
}

public class Main {
    public static void main(String[] args) {

        List<Employee> employees = new ArrayList<>();

        employees.add(new Employee(101, "John", 50000));
        employees.add(new Employee(102, "Alex", 30000));
        employees.add(new Employee(103, "Bob", 40000));

        Collections.sort(employees, new SalaryComparator());

        System.out.println(employees);
    }
}
```

Output:

```text
Alex : 30000
Bob : 40000
John : 50000
```

Notice the difference.

With Comparable:

```java
class Employee implements Comparable<Employee>
```

With Comparator:

```java
class SalaryComparator implements Comparator<Employee>
```

The comparison logic is **outside Employee**.

---

# 3. Comparator with Lambda

Now Java gives us a much shorter way.

Instead of creating:

```java
class SalaryComparator implements Comparator<Employee> {

    @Override
    public int compare(Employee e1, Employee e2) {
        return e1.salary - e2.salary;
    }
}
```

we can simply write:

```java
employees.sort((e1, e2) -> e1.salary - e2.salary);
```

Complete example:

```java
import java.util.*;

class Employee {

    int id;
    String name;
    int salary;

    Employee(int id, String name, int salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    @Override
    public String toString() {
        return name + " : " + salary;
    }
}

public class Main {
    public static void main(String[] args) {

        List<Employee> employees = new ArrayList<>();

        employees.add(new Employee(101, "John", 50000));
        employees.add(new Employee(102, "Alex", 30000));
        employees.add(new Employee(103, "Bob", 40000));

        employees.sort((e1, e2) -> e1.salary - e2.salary);

        System.out.println(employees);
    }
}
```

Same result:

```text
Alex : 30000
Bob : 40000
John : 50000
```

---

# 4. Why is Comparator more powerful?

Suppose we want three different sorting options.

### Sort by salary

```java
employees.sort((e1, e2) -> e1.salary - e2.salary);
```

### Sort by name

```java
employees.sort((e1, e2) -> e1.name.compareTo(e2.name));
```

### Sort by ID

```java
employees.sort((e1, e2) -> e1.id - e2.id);
```

We don't have to modify `Employee`.

That's one of the biggest advantages of `Comparator`.

---

# 5. The most important difference

Imagine this:

```text
              Employee
                 |
        ---------------------
        |                   |
   Comparable          Comparator
        |                   |
   compareTo()          compare()
        |                   |
 "I compare myself"   "I compare two objects"
```

### Comparable

```java
employee1.compareTo(employee2);
```

The **employee itself** provides the comparison logic.

### Comparator

```java
comparator.compare(employee1, employee2);
```

A **separate comparator** provides the comparison logic.

---

# 6. Comparable vs Comparator — interview answer

If the interviewer asks:

> **What is the difference between Comparable and Comparator?**

You can answer:

> **Comparable is used when a class has a natural/default ordering. We implement `Comparable` inside the class and override `compareTo()`. Comparator is used when we want external or multiple sorting strategies. We implement `Comparator` and override `compare()`, or use a lambda expression for a concise implementation.**

That's a strong interview answer.

---

# 7. One important correction in our code

You may see code like:

```java
return e1.salary - e2.salary;
```

This is easy to understand, but **not the safest production approach** because integer subtraction can overflow.

Prefer:

```java
return Integer.compare(e1.salary, e2.salary);
```

So modern code would be:

```java
employees.sort((e1, e2) -> Integer.compare(e1.salary, e2.salary));
```

And for Comparable:

```java
@Override
public int compareTo(Employee other) {
    return Integer.compare(this.salary, other.salary);
}
```

---

# 8. Modern Comparator methods

Java also provides very convenient methods.

Instead of:

```java
employees.sort((e1, e2) -> Integer.compare(e1.salary, e2.salary));
```

you can write:

```java
employees.sort(Comparator.comparingInt(e -> e.salary));
```

For name:

```java
employees.sort(Comparator.comparing(e -> e.name));
```

For ID:

```java
employees.sort(Comparator.comparingInt(e -> e.id));
```

And descending salary:

```java
employees.sort(
    Comparator.comparingInt((Employee e) -> e.salary).reversed()
);
```

---

# 9. One simple memory trick 🧠

Remember these two sentences:

### Comparable

> **"I am comparable. I know how to compare myself."**

```java
class Employee implements Comparable<Employee> {

    public int compareTo(Employee other) {
        ...
    }
}
```

### Comparator

> **"I am a comparator. I know how to compare two objects."**

```java
class SalaryComparator implements Comparator<Employee> {

    public int compare(Employee e1, Employee e2) {
        ...
    }
}
```

---

# 10. Final cheat sheet

```text
Comparable
----------
Interface: java.lang.Comparable<T>

Method:
compareTo(T other)

Logic:
Inside the class

Purpose:
Natural/default ordering

Example:
Employee implements Comparable<Employee>


Comparator
----------
Interface: java.util.Comparator<T>

Method:
compare(T o1, T o2)

Logic:
Outside the class

Purpose:
Custom/multiple sorting strategies

Example:
SalaryComparator implements Comparator<Employee>
```

### Lambda versions

```java
// Comparator
employees.sort((e1, e2) -> e1.salary - e2.salary);
```

`Comparable` itself is normally implemented through `compareTo()` in the class; **Comparator is the one you'll commonly see expressed with lambdas.**

### ⭐ Interview rule of thumb

**One natural sorting rule → `Comparable`**

**Multiple/custom sorting rules → `Comparator`**

**Need concise modern syntax → `Comparator` + lambda / `Comparator.comparing...`**
