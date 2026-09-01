*Grammar check:* Just a tiny correction on the prompt: **"expalin Enables chaining concept which you showed in last example"** is better phrased as **"Explain the 'method chaining' concept that you showed in the last example."**

---

### What is Method Chaining?

**Method chaining** is a technique where you call multiple methods on the same object, one right after another in a single line, connected by dots (`.`):

```javascript
// Without chaining:
calculator.add(5);
calculator.multiply(2);
calculator.subtract(3);

// With chaining:
calculator.add(5).multiply(2).subtract(3);

```

If you are familiar with Java, this is the exact same pattern used in the **Builder Pattern** (e.g., Lombok's `@Builder` or `StringBuilder.append("a").append("b")`), **Java Streams** (`list.stream().filter(...).map(...).toList()`), or Spring Security's `.authorizeHttpRequests().anyRequest().authenticated()`.

---

### How It Works: The Core Secret

To call a method with a dot (`.method()`), the expression to the left of the dot **must evaluate to an object**.

If a method returns nothing (`undefined`), trying to call another method on it crashes with an error:

```javascript
// If add() returns undefined:
calculator.add(5).multiply(2); 
// Becomes: undefined.multiply(2) 💥 TypeError!

```

To prevent this, each method simply returns **`this`** (the current object instance):

```javascript
class Calculator {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  add(num) {
    this.value += num;
    return this; // 👈 Hands the calculator back to you
  }

  multiply(num) {
    this.value *= num;
    return this; // 👈 Hands the calculator back to you
  }

  getValue() {
    return this.value; // Returns the final number, ends chaining
  }
}

```

---

### Step-by-Step Execution

When you run:

```javascript
const calc = new Calculator(10);
const total = calc.add(5).multiply(2).getValue();

```

Here is what happens under the hood:

1. `calc.add(5)` runs:
* `this.value` becomes $15$.
* It returns `calc`.


2. Now the expression is `calc.multiply(2)`:
* `this.value` becomes $30$.
* It returns `calc`.


3. Now the expression is `calc.getValue()`:
* It returns the number `30`.
* `total` is now `30`.



---

### Why Do We Use It?

* **Readability:** Eliminates repetitive variable names on every line.
* **Fluent APIs:** Code reads naturally like a sentence or an assembly line (e.g., in query builders, validation libraries, or HTTP request setup).
