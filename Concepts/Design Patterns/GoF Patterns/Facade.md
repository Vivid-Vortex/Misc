# Q: What is the Facade Pattern?

**Facade means providing a simple interface to a complex system.**

Imagine you want to **book a flight**.

Internally, many things may happen:

```text
Check Flight
   ↓
Check Seat
   ↓
Process Payment
   ↓
Generate Ticket
   ↓
Send Confirmation
```

Instead of making the client call all these services individually, we create one simple class:

```text
FlightBookingFacade
        |
        +-- FlightService
        +-- SeatService
        +-- PaymentService
        +-- TicketService
```

The client simply does:

```java
facade.bookFlight();
```

That's the **Facade Pattern**.

---

# Q: What problem does it solve?

Without Facade:

```java
flightService.checkFlight();
seatService.checkSeat();
paymentService.processPayment();
ticketService.generateTicket();
```

The client needs to know about **all these internal classes**.

With Facade:

```java
facade.bookFlight();
```

The client doesn't need to know how the booking works internally.

---

# Q: Simple Java Example

Let's say we have three complicated subsystems.

### 1. PaymentService

```java
class PaymentService {

    public void pay() {
        System.out.println("Payment successful");
    }
}
```

### 2. TicketService

```java
class TicketService {

    public void generateTicket() {
        System.out.println("Ticket generated");
    }
}
```

### 3. NotificationService

```java
class NotificationService {

    public void sendConfirmation() {
        System.out.println("Confirmation sent");
    }
}
```

Now create the **Facade**:

```java
class BookingFacade {

    private PaymentService paymentService = new PaymentService();
    private TicketService ticketService = new TicketService();
    private NotificationService notificationService = new NotificationService();

    public void book() {
        paymentService.pay();
        ticketService.generateTicket();
        notificationService.sendConfirmation();
    }
}
```

The client doesn't need to know about the three services.

```java
public class Main {

    public static void main(String[] args) {

        BookingFacade facade = new BookingFacade();

        facade.book();
    }
}
```

Output:

```text
Payment successful
Ticket generated
Confirmation sent
```

---

# Q: What is happening here?

Think of it like this:

```text
              CLIENT
                 |
                 | book()
                 ↓
        +------------------+
        |  BookingFacade   |
        +------------------+
          /       |       \
         ↓        ↓        ↓
    Payment     Ticket   Notification
    Service     Service     Service
```

The **Facade hides the complexity**.

The client only knows:

```java
facade.book();
```

It doesn't need to know:

```java
paymentService.pay();
ticketService.generateTicket();
notificationService.sendConfirmation();
```

---

# Q: Is Facade just a wrapper?

**Yes, essentially.**

A Facade is a **simplified wrapper/interface over multiple classes or a complex subsystem**.

But its purpose is not merely to wrap one class.

Usually:

```text
Facade
   ↓
Multiple classes / complex subsystem
```

---

# Q: What is the key idea to remember?

Remember this one sentence:

> **Facade = One simple interface hiding multiple complex operations.**

For example:

```text
                Simple
                  ↓
          facade.book()
                  ↓
        ┌─────────────────┐
        │ Complex System  │
        ├─────────────────┤
        │ Payment         │
        │ Ticket          │
        │ Notification    │
        │ Seat            │
        └─────────────────┘
```

### Real-world analogy

**Facade is like a hotel receptionist.**

You say:

> "I want to check in."

You don't personally:

```text
Find room
   ↓
Verify reservation
   ↓
Verify payment
   ↓
Generate room key
   ↓
Update hotel system
```

The receptionist handles all of that.

**You interact with one simple interface — the receptionist.**

That's exactly what the **Facade Design Pattern** does.
