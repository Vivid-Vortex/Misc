# Command Pattern

The Command Pattern in Java is a way to turn a request (like “do this action”) into an object. That sounds abstract, but the idea is simple:

👉 You wrap an action inside an object so you can pass it around, store it, or execute it later.

---

## 🧠 Think of it like a remote control

* You press a button → something happens
* The remote doesn’t care how the TV works
* It just calls a command like “turn on”

**So:**

* Button (Invoker) → triggers command
* Command object → contains the action
* Receiver → actually does the work

---

## 🧱 Structure (simple)

1. **Command (interface)** → defines `execute()`
2. **ConcreteCommand** → implements the command
3. **Receiver** → real logic (e.g., TV, Light)
4. **Invoker** → triggers the command

---

## 💻 Simple Java Example

### 1. Command interface

```java
interface Command {
    void execute();
}
```

---

### 2. Receiver (actual work happens here)

```java
class Light {
    void turnOn() {
        System.out.println("Light is ON");
    }
}
```

---

### 3. Concrete Command

```java
class LightOnCommand implements Command {
    private Light light;

    LightOnCommand(Light light) {
        this.light = light;
    }

    public void execute() {
        light.turnOn();
    }
}
```

---

### 4. Invoker (like a button)

```java
class RemoteControl {
    private Command command;

    void setCommand(Command command) {
        this.command = command;
    }

    void pressButton() {
        command.execute();
    }
}
```

---

### 5. Use it

```java
public class Main {
    public static void main(String[] args) {
        Light light = new Light();

        Command lightOn = new LightOnCommand(light);

        RemoteControl remote = new RemoteControl();
        remote.setCommand(lightOn);

        remote.pressButton(); // Output: Light is ON
    }
}
```

---

## 🎯 Why use Command Pattern?

* ✅ Decouples who asks from who does
* ✅ Easy to add new commands without changing existing code
* ✅ Supports undo/redo (by storing commands)
* ✅ Useful for queues, logs, or macros

---

## ⚡ In one line

👉 **Command Pattern = “Turn actions into objects so they can be reused, stored, and executed flexibly.”**

---

If you want next step, I can show:

* Real-world Spring / framework usage
* Undo/Redo implementation
* Difference vs Strategy (very important for interviews)
