# 🚀 Command Queue Example (Advanced Understanding)

One of the biggest powers of the Command Pattern is this:

👉 Commands can be stored and executed later.

That means commands behave like normal objects.

You can:

- store them in a queue
- send them to another thread
- retry failed commands
- delay execution
- execute asynchronously

This is heavily used in:

- task schedulers
- event systems
- job queues
- reactive systems
- message brokers

---

# 💻 Command Queue Example

## Queue Stores Commands

```java
import java.util.Queue;
import java.util.LinkedList;

class CommandQueue {

    private Queue<Command> queue = new LinkedList<>();

    void addCommand(Command command) {
        queue.offer(command);
    }

    void processCommands() {

        while (!queue.isEmpty()) {

            Command command = queue.poll();

            command.execute();
        }
    }
}
```

---

# 🧠 What This Means (Important)

```text
queue stores commands, NOT receivers

addCommand()  = enqueue action

processCommands() = execute actions in order
```

✅ FIFO (First In, First Out)

---

# 💻 Main Class

```java
public class Main {

    public static void main(String[] args) {

        // Receivers
        Light light = new Light();
        Fan fan = new Fan();

        // Commands
        Command lightOn = new LightOnCommand(light);
        Command fanOn = new FanOnCommand(fan);

        // Command queue
        CommandQueue commandQueue = new CommandQueue();

        // Enqueue commands (NO execution yet)
        commandQueue.addCommand(lightOn);
        commandQueue.addCommand(fanOn);

        System.out.println("Commands queued...");

        // Later (or in another thread / time)
        commandQueue.processCommands();
    }
}
```

---

# ✅ Output

```text
Commands queued...

Light is ON
Fan is ON
```

---

# 🔥 What Just Happened (VERY Important)

## Timeline

```text
Create LightOnCommand
↓
Create FanOnCommand
↓
Put commands into queue
↓
Nothing happens yet
↓
Later → process queue
↓
execute() is called
↓
Receivers do the work
```

---

# 💡 Key Insight (This is the “Aha” Moment)

The queue:

- does NOT know about `Light`
- does NOT know about `Fan`
- does NOT know what the command actually does

It only knows:

```java
command.execute();
```

That is maximum decoupling.

---

# 🧠 Why This Is Powerful

Because now you can:

## ✅ Execute later

```java
queue.addCommand(command);

// execute after 5 minutes
```

---

## ✅ Execute in another thread

```java
new Thread(() -> queue.processCommands()).start();
```

---

## ✅ Retry failed commands

```java
try {
    command.execute();
} catch(Exception e) {
    retryQueue.add(command);
}
```

---

## ✅ Send commands over network/message broker

Examples:

- Kafka
- RabbitMQ
- ActiveMQ

A consumer later executes the command.

---

# ⚡ Reactive Programming Connection

This is why Command Pattern is deeply connected to:

- async programming
- event-driven systems
- reactive systems

because:

👉 actions become data

Instead of immediately doing work:

```java
light.turnOn();
```

you create an object representing the work:

```java
new LightOnCommand(light)
```

and execute it later.

That mental shift is extremely important for:

- Reactor
- WebFlux
- RxJava
- Kafka consumers
- task schedulers

---

# 🧠 Ultimate One-Line Understanding

👉 **Command Pattern = Encapsulate work inside objects so the work can be passed, queued, delayed, retried, or executed asynchronously.**