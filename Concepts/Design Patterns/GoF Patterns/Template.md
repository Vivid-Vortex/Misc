You're right on spot. Let's understand the **Template Method GoF Design Pattern** in the simplest possible way.

## Q: What is the Template Method pattern?

**Template Method** means:

> **Define the overall steps of an algorithm in a parent class, but let child classes decide how some individual steps are performed.**

Think of it like a **recipe**.

For example, making coffee and making tea both follow:

1. Boil water
2. Add the main ingredient
3. Pour into cup

But **what you add** differs.

---

## Q: What does the structure look like?

```text
             Beverage
                |
        makeBeverage()
        /     |      \
       /      |       \
   boilWater  |    pourIntoCup
              |
        addIngredient()
          /        \
      Coffee        Tea
```

The parent class defines the **template**, while subclasses provide the specific implementation.

---

## Q: Can you show a simple Java example?

```java
abstract class Beverage {

    // Template Method
    public final void makeBeverage() {
        boilWater();
        addIngredient();
        pourIntoCup();
    }

    private void boilWater() {
        System.out.println("Boiling water");
    }

    protected abstract void addIngredient();

    private void pourIntoCup() {
        System.out.println("Pouring into cup");
    }
}
```

Now we create the specific beverages:

```java
class Coffee extends Beverage {

    @Override
    protected void addIngredient() {
        System.out.println("Adding coffee");
    }
}
```

```java
class Tea extends Beverage {

    @Override
    protected void addIngredient() {
        System.out.println("Adding tea");
    }
}
```

Client:

```java
public class Main {
    public static void main(String[] args) {

        Beverage coffee = new Coffee();
        coffee.makeBeverage();

        System.out.println();

        Beverage tea = new Tea();
        tea.makeBeverage();
    }
}
```

Output:

```text
Boiling water
Adding coffee
Pouring into cup

Boiling water
Adding tea
Pouring into cup
```

---

## Q: Where is the "Template" here?

This method is the **Template Method**:

```java
public final void makeBeverage() {
    boilWater();
    addIngredient();
    pourIntoCup();
}
```

It defines the **fixed sequence**:

```text
boilWater()
     ↓
addIngredient()
     ↓
pourIntoCup()
```

The child classes cannot change this sequence because `makeBeverage()` is `final`.

But they can decide **how `addIngredient()` works**.

```java
Coffee → add coffee
Tea    → add tea
```

---

## Q: Why is `makeBeverage()` `final`?

Because the parent class wants to control the algorithm.

Without `final`, a child could do:

```java
class Coffee extends Beverage {

    @Override
    public void makeBeverage() {
        pourIntoCup();
        boilWater();
    }
}
```

Now the algorithm's sequence is broken.

So:

```java
public final void makeBeverage()
```

means:

> **"I define the overall algorithm. You can customize certain steps, but you cannot change the overall process."**

---

## Q: What are the important parts of Template Method?

| Component               | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
| Abstract class          | Defines the overall algorithm                   |
| Template Method         | Defines the fixed sequence                      |
| Concrete methods        | Common steps shared by all subclasses           |
| Abstract methods        | Steps that subclasses must implement            |
| `final` Template Method | Prevents subclasses from changing the algorithm |

In our example:

```text
Beverage
   │
   ├── makeBeverage()     ← Template Method
   │
   ├── boilWater()        ← Common step
   │
   ├── addIngredient()    ← Variable step
   │
   └── pourIntoCup()      ← Common step
```

---

## Q: When should I use Template Method?

Use it when:

> **Multiple classes follow the same overall algorithm but differ in a few steps.**

For example:

```text
Payment Processing

validatePayment()
      ↓
authenticate()
      ↓
processPayment()    ← different
      ↓
sendReceipt()
```

Credit Card:

```text
processPayment() → Process credit card
```

UPI:

```text
processPayment() → Process UPI
```

The overall process remains the same.

---

## Q: How is Template Method different from Strategy?

This is important for interviews.

**Template Method:**

```text
Parent class
     ↓
defines algorithm
     ↓
Child classes customize steps
```

It primarily uses **inheritance**.

**Strategy:**

```text
Context
   ↓
Strategy interface
   ↓
Different implementations
```

It primarily uses **composition**.

So the easiest way to remember:

> **Template Method = "same algorithm, different steps" using inheritance.**

> **Strategy = "different algorithm/behavior" using composition.**

### One-line memory trick

**Template Method = Parent controls the recipe; children customize some ingredients.**
