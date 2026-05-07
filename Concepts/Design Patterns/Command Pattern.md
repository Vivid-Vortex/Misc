Command Pattern

The Command Pattern in Java is a way to turn a request (like “do this action”) into an object.

That sounds abstract, but the idea is simple:

👉 You wrap an action inside an object so you can pass it around, store it, or execute it later.


---

🧠 Think of it like a remote control

You press a button → something happens

The remote doesn’t care how the TV, Light, or Fan works

It just calls a command like "turn on"


So:

Button (Invoker) → triggers command

Command object → contains the action

Receiver → actually does the work



---

🧱 Structure (Simple)

1. Command (interface) → defines execute()


2. ConcreteCommand → implements the command


3. Receiver → real logic (Light, Fan, TV)


4. Invoker → triggers the command




---

💻 Java Example with Light and Fan

1. Command Interface

interface Command {
    void execute();
}


---

2. Receivers (Actual work happens here)

class Light {

    void turnOn() {
        System.out.println("Light is ON");
    }
}

class Fan {

    void turnOn() {
        System.out.println("Fan is ON");
    }
}


---

3. Concrete Commands

Light Command

class LightOnCommand implements Command {

    private Light light;

    LightOnCommand(Light light) {
        this.light = light;
    }

    public void execute() {
        light.turnOn();
    }
}


---

Fan Command

class FanOnCommand implements Command {

    private Fan fan;

    FanOnCommand(Fan fan) {
        this.fan = fan;
    }

    public void execute() {
        fan.turnOn();
    }
}


---

4. Invoker (Remote Control)

class RemoteControl {

    private Command command;

    void setCommand(Command command) {
        this.command = command;
    }

    void pressButton() {
        command.execute();
    }
}


---

5. Main Class

public class Main {

    public static void main(String[] args) {

        // Receivers
        Light light = new Light();
        Fan fan = new Fan();

        // Commands
        Command lightOn = new LightOnCommand(light);
        Command fanOn = new FanOnCommand(fan);

        // Invoker
        RemoteControl remote = new RemoteControl();

        // Turn ON Light
        remote.setCommand(lightOn);
        remote.pressButton();

        // Turn ON Fan
        remote.setCommand(fanOn);
        remote.pressButton();
    }
}


---

✅ Output

Light is ON
Fan is ON


---

🔥 Important Observation

Notice this:

remote.setCommand(lightOn);
remote.pressButton();

Later:

remote.setCommand(fanOn);
remote.pressButton();

The same remote control works for both Light and Fan.

Why?

Because the remote only knows:

command.execute();

It does NOT know:

how Light works

how Fan works

what logic is inside


That is the power of decoupling.


---

🎯 Why Command Pattern is Useful

✅ 1. Decouples sender from receiver

The invoker (RemoteControl) does not directly call:

light.turnOn();

Instead it calls:

command.execute();

So the remote is loosely coupled.


---

✅ 2. Easy to add new commands

Tomorrow you can add:

TVOnCommand

MusicPlayCommand

ACStartCommand


without changing existing code.


---

✅ 3. Supports Undo/Redo

Because commands are objects, you can store them in:

stack

queue

history list


Very useful in:

editors

IDEs

games



---

✅ 4. Useful in async and reactive systems

This pattern becomes extremely powerful in:

multithreading

task queues

schedulers

event-driven systems

reactive programming


because actions can be passed around like data.


---

🧠 Real-world Analogy

Real World	Command Pattern

Remote button	Invoker
Button action	Command
TV/Light/Fan	Receiver
Pressing button	execute()



---

⚡ In One Line

👉 Command Pattern = “Turn actions into objects so they can be reused, stored, queued, and executed flexibly.”