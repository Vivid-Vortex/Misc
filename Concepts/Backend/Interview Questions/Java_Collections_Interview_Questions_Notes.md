# Java Collections Interview Questions and Answers

> Interview-focused notes covering the most important Java Collections concepts, comparisons, and commonly asked coding tasks.

## Table of Contents

- [1. What is the Collection Framework?](#1-what-is-the-collection-framework)
- [2. Array vs Collection](#2-array-vs-collection)
- [3. Main Collection Framework Interfaces](#3-main-collection-framework-interfaces)
- [4. ArrayList vs Vector](#4-arraylist-vs-vector)
- [5. ArrayList vs LinkedList](#5-arraylist-vs-linkedlist)
- [6. Iterator vs ListIterator](#6-iterator-vs-listiterator)
- [7. Iterator vs Enumeration](#7-iterator-vs-enumeration)
- [8. List vs Set](#8-list-vs-set)
- [9. HashSet vs TreeSet](#9-hashset-vs-treeset)
- [10. Set vs Map](#10-set-vs-map)
- [11. HashSet vs HashMap](#11-hashset-vs-hashmap)
- [12. HashMap vs TreeMap](#12-hashmap-vs-treemap)
- [13. HashMap vs Hashtable](#13-hashmap-vs-hashtable)
- [14. Collection vs Collections](#14-collection-vs-collections)
- [15. Comparable vs Comparator](#15-comparable-vs-comparator)
- [16. BlockingQueue](#16-blockingqueue)
- [17. Advantages of a Properties File](#17-advantages-of-a-properties-file)
- [18. hashCode()](#18-hashcode)
- [19. Why Override equals()?](#19-why-override-equals)
- [20. Synchronizing Collections](#20-synchronizing-collections)
- [21. Advantages of Generic Collections](#21-advantages-of-generic-collections)
- [22. Hash Collision](#22-hash-collision)
- [23. Dictionary Class](#23-dictionary-class)
- [24. Default Load Factor](#24-default-load-factor)
- [25. Fail-Fast Iterators](#25-fail-fast-iterators)
- [26. Array vs ArrayList](#26-array-vs-arraylist)
- [27. array.length vs list.size()](#27-arraylength-vs-listsize)
- [28. Array ↔ ArrayList Conversion](#28-array--arraylist-conversion)
- [29. Read-Only ArrayList](#29-read-only-arraylist)
- [30. Remove Duplicates from ArrayList](#30-remove-duplicates-from-arraylist)
- [31. Reverse an ArrayList](#31-reverse-an-arraylist)
- [32. Sort an ArrayList in Descending Order](#32-sort-an-arraylist-in-descending-order)
- [33. Synchronize an ArrayList](#33-synchronize-an-arraylist)
- [34. When to Use ArrayList vs LinkedList](#34-when-to-use-arraylist-vs-linkedlist)
- [Quick Interview Cheat Sheet](#quick-interview-cheat-sheet)

---

## 1. What is the Collection Framework?

The Java Collection Framework is a standard set of **interfaces and classes** used to store, organize, manipulate, and process groups of objects.

Common interfaces:

- `Collection`
- `List`
- `Set`
- `Queue`
- `Deque`
- `Map`

Common implementations:

- `ArrayList`
- `LinkedList`
- `HashSet`
- `TreeSet`
- `HashMap`
- `TreeMap`
- `ArrayDeque`

### Interview answer

> The Java Collection Framework provides a standardized architecture of interfaces, implementations, and utility algorithms for storing and manipulating groups of objects efficiently.

---

## 2. Array vs Collection

| Feature | Array | Collection |
|---|---|---|
| Size | Fixed | Usually dynamic |
| Primitive support | Yes | Stores objects |
| Methods | Very limited | Rich API |
| Flexibility | Low | High |
| Generics | No | Yes |
| Framework | Not part of Collection Framework | Part of Collection Framework |

```java
int[] array = new int[3];

List<Integer> list = new ArrayList<>();
list.add(10);
list.add(20);
```

---

## 3. Main Collection Framework Interfaces

### Collection

The root interface for most collection types.

```java
Collection<String> values = new ArrayList<>();
```

### List

- Ordered
- Allows duplicates
- Supports index-based access

Implementations:

- `ArrayList`
- `LinkedList`
- `Vector`

### Set

- No duplicate elements
- Ordering depends on implementation

Implementations:

- `HashSet`
- `LinkedHashSet`
- `TreeSet`

### Queue

Usually processes elements in FIFO order.

Implementations:

- `LinkedList`
- `PriorityQueue`
- `ArrayDeque`

### Deque

Double-ended queue. Elements can be added or removed from both ends.

```java
Deque<Integer> deque = new ArrayDeque<>();
```

A `Deque` can behave as both a queue and a stack.

### Map

Stores key-value pairs.

```java
Map<String, Integer> scores = new HashMap<>();
```

Important: `Map` is part of the Collections Framework ecosystem but does **not** extend `Collection`.

---

## 4. ArrayList vs Vector

| Feature | ArrayList | Vector |
|---|---|---|
| Thread-safe | No | Yes, legacy synchronization |
| Performance | Usually faster | Usually slower |
| Synchronization | No | Built-in |
| Growth | Typically grows automatically | Configurable growth behavior |
| Modern usage | Preferred in most cases | Mainly legacy code |

### Interview point

For modern concurrent applications, prefer specialized concurrent collections when appropriate instead of automatically choosing `Vector`.

---

## 5. ArrayList vs LinkedList

| Feature | ArrayList | LinkedList |
|---|---|---|
| Internal structure | Dynamic array | Doubly linked list |
| Random access | Fast: `O(1)` | Slow: `O(n)` |
| Memory | Lower overhead | Higher overhead |
| Add/remove at end | Usually fast | Fast |
| Insert/remove in middle | Requires shifting | Link changes after node location is known |

### Practical answer

Use `ArrayList` by default.

Use `LinkedList` only when its specific characteristics are genuinely useful. In many real applications, `ArrayList` is still faster because of better CPU cache locality.

---

## 6. Iterator vs ListIterator

| Feature | Iterator | ListIterator |
|---|---|---|
| Direction | Forward only | Forward and backward |
| Works with | Many collections | `List` only |
| Remove | Yes | Yes |
| Add | No | Yes |
| Replace using `set()` | No | Yes |

```java
Iterator<String> iterator = list.iterator();
ListIterator<String> listIterator = list.listIterator();
```

---

## 7. Iterator vs Enumeration

`Enumeration` is mainly associated with legacy collection classes such as `Vector` and `Hashtable`.

| Feature | Iterator | Enumeration |
|---|---|---|
| Modern API | Yes | Legacy |
| Traversal | Forward | Forward |
| Remove support | Yes | No |
| Typical use | Modern collections | Legacy classes |

Iterator methods:

```java
hasNext();
next();
remove();
```

Enumeration methods:

```java
hasMoreElements();
nextElement();
```

---

## 8. List vs Set

| Feature | List | Set |
|---|---|---|
| Duplicates | Allowed | Not allowed |
| Index access | Yes | No |
| Order | Usually positional order | Depends on implementation |
| Examples | ArrayList, LinkedList | HashSet, TreeSet |

Important nuance:

- `HashSet` does not guarantee insertion order.
- `LinkedHashSet` preserves insertion order.
- `TreeSet` keeps sorted order.

---

## 9. HashSet vs TreeSet

| Feature | HashSet | TreeSet |
|---|---|---|
| Order | No guaranteed order | Sorted order |
| Average performance | `O(1)` | `O(log n)` |
| Internal basis | Hashing | Tree structure |
| Null support | One `null` allowed | Generally no `null` in natural ordering |

Use:

- `HashSet` for fast membership checks.
- `TreeSet` when sorted unique elements are required.

---

## 10. Set vs Map

| Feature | Set | Map |
|---|---|---|
| Stores | Values | Key-value pairs |
| Uniqueness | Values must be unique | Keys must be unique |
| Access | By iteration / membership operations | By key |

```java
Set<String> set = new HashSet<>();

Map<String, Integer> map = new HashMap<>();
```

---

## 11. HashSet vs HashMap

`HashSet` stores unique values.

`HashMap` stores key-value pairs.

Internally, a `HashSet` is backed by a `HashMap` implementation.

```java
Set<String> set = new HashSet<>();
set.add("Java");

Map<String, Integer> map = new HashMap<>();
map.put("Java", 10);
```

---

## 12. HashMap vs TreeMap

| Feature | HashMap | TreeMap |
|---|---|---|
| Order | No guaranteed order | Sorted by keys |
| Typical performance | `O(1)` average | `O(log n)` |
| Internal structure | Hash table | Red-black tree |
| Null key | Supports one | Does not support natural-order `null` keys |

Use `HashMap` for fast general-purpose lookup.

Use `TreeMap` when sorted keys or range operations are required.

---

## 13. HashMap vs Hashtable

| Feature | HashMap | Hashtable |
|---|---|---|
| Modern usage | Yes | Legacy |
| Synchronization | No | Yes |
| Null key | Allowed | Not allowed |
| Null value | Allowed | Not allowed |
| Performance | Usually better | Synchronization overhead |

For concurrent access, consider `ConcurrentHashMap` instead of `Hashtable`.

---

## 14. Collection vs Collections

### `Collection`

An interface representing a group of objects.

```java
Collection<String> values = new ArrayList<>();
```

### `Collections`

A utility class containing static helper methods.

```java
Collections.sort(list);
Collections.reverse(list);
Collections.unmodifiableList(list);
```

### Interview answer

> `Collection` is an interface used as the root of the collection hierarchy, while `Collections` is a utility class containing static methods for common collection operations.

---

## 15. Comparable vs Comparator

| Feature | Comparable | Comparator |
|---|---|---|
| Method | `compareTo()` | `compare()` |
| Package | `java.lang` | `java.util` |
| Number of sort orders | Usually one natural order | Multiple possible orders |
| Modifies model class | Usually yes | No |

### Comparable

```java
class Employee implements Comparable<Employee> {

    @Override
    public int compareTo(Employee other) {
        return this.id - other.id;
    }
}
```

### Comparator

```java
Comparator<Employee> bySalary =
        Comparator.comparing(Employee::getSalary);
```

### Modern approach

`Comparator.comparing(...)` and method references are usually cleaner than anonymous comparator classes.

---

## 16. BlockingQueue

`BlockingQueue` is a thread-safe queue commonly used in producer-consumer systems.

Important operations:

- `put()` waits if the queue is full.
- `take()` waits if the queue is empty.

```java
BlockingQueue<Integer> queue =
        new ArrayBlockingQueue<>(10);
```

Common implementations:

- `ArrayBlockingQueue`
- `LinkedBlockingQueue`

`null` elements are not allowed.

---

## 17. Advantages of a Properties File

A properties file stores configuration separately from application code.

Example:

```properties
db.url=jdbc:mysql://localhost/test
db.user=app
```

Java code:

```java
Properties properties = new Properties();

try (FileReader reader =
         new FileReader("application.properties")) {

    properties.load(reader);
    System.out.println(properties.getProperty("db.user"));
}
```

### Advantages

- Configuration can change without changing source code.
- Environment-specific values can be externalized.
- Easier application maintenance.

In modern Spring Boot applications, `application.properties` and `application.yml` are common examples.

---

## 18. hashCode()

`hashCode()` returns an integer used by hash-based collections to locate objects efficiently.

Important contract:

> If two objects are equal according to `equals()`, they must return the same `hashCode()`.

However:

> Two different objects can have the same hash code.

This is why `equals()` is used to distinguish objects after a hash collision.

---

## 19. Why Override equals()?

The default `Object.equals()` checks object identity.

```java
a == b
```

Sometimes logical equality is required.

Example: two employees with the same ID should be treated as equal.

```java
@Override
public boolean equals(Object obj) {
    if (this == obj) {
        return true;
    }

    if (!(obj instanceof Employee other)) {
        return false;
    }

    return id == other.id;
}
```

When overriding `equals()`, usually override `hashCode()` too.

---

## 20. Synchronizing Collections

The `Collections` utility class provides synchronized wrappers.

```java
List<String> list =
        Collections.synchronizedList(new ArrayList<>());

Set<String> set =
        Collections.synchronizedSet(new HashSet<>());

Map<String, Integer> map =
        Collections.synchronizedMap(new HashMap<>());
```

For modern concurrent applications, consider specialized classes from `java.util.concurrent`, depending on the use case.

---

## 21. Advantages of Generic Collections

### Type safety

```java
List<String> names = new ArrayList<>();
```

Only `String` values can be added.

### No explicit casting

Without generics:

```java
Object value = list.get(0);
String name = (String) value;
```

With generics:

```java
String name = names.get(0);
```

### Compile-time checking

Many type errors are detected before runtime.

---

## 22. Hash Collision

A hash collision happens when different keys produce the same hash bucket.

Example idea:

```text
Key A → Bucket 5
Key B → Bucket 5
```

Modern `HashMap` handles collisions using bucket structures. Historically this is commonly described using linked nodes, and heavily populated buckets may be treeified under appropriate conditions.

### Interview answer

> A collision occurs when multiple keys map to the same bucket. Java resolves collisions by storing multiple entries within the bucket and using equality checks to locate the correct key.

---

## 23. Dictionary Class

`Dictionary` is an abstract legacy class for key-value storage.

Important methods:

- `put()`
- `get()`
- `remove()`
- `elements()`

In modern Java code, prefer `Map` implementations such as:

- `HashMap`
- `TreeMap`
- `ConcurrentHashMap`

---

## 24. Default Load Factor

For hash-based collections such as `HashMap`, the default load factor is:

```text
0.75
```

Example:

```text
Initial capacity = 16
Load factor = 0.75

Threshold = 16 × 0.75 = 12
```

After the threshold is exceeded, the table may resize.

---

## 25. Fail-Fast Iterators

A fail-fast iterator detects certain structural modifications made outside the iterator during iteration and typically throws:

```text
ConcurrentModificationException
```

Example:

```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");

for (String value : list) {
    list.add("C"); // May cause ConcurrentModificationException
}
```

Important: fail-fast behavior is generally best-effort, not a strict synchronization guarantee.

---

## 26. Array vs ArrayList

| Feature | Array | ArrayList |
|---|---|---|
| Size | Fixed | Dynamic |
| Primitive values | Yes | Uses wrapper objects |
| Part of Collection Framework | No | Yes |
| Access | `array[index]` | `get(index)` |
| Size API | `length` | `size()` |

```java
int[] array = {1, 2, 3};

List<Integer> list = new ArrayList<>();
list.add(1);
```

---

## 27. array.length vs list.size()

For arrays:

```java
int[] numbers = new int[4];

System.out.println(numbers.length);
```

For `ArrayList`:

```java
List<String> names = new ArrayList<>();
names.add("A");

System.out.println(names.size());
```

Remember:

```text
array.length
string.length()
collection.size()
```

---

## 28. Array ↔ ArrayList Conversion

### Array to List

```java
String[] array = {"A", "B"};

List<String> list = new ArrayList<>(
        Arrays.asList(array)
);
```

### List to Array

```java
List<String> list = List.of("A", "B");

String[] array = list.toArray(new String[0]);
```

Modern alternative:

```java
String[] array = list.toArray(String[]::new);
```

---

## 29. Read-Only ArrayList

Use an unmodifiable view:

```java
List<String> list = new ArrayList<>();
list.add("A");

List<String> readOnly =
        Collections.unmodifiableList(list);
```

Attempting to modify `readOnly` throws:

```text
UnsupportedOperationException
```

Important: changes to the original list are still visible through the unmodifiable view.

For a true immutable snapshot, create an immutable copy:

```java
List<String> immutable = List.copyOf(list);
```

---

## 30. Remove Duplicates from ArrayList

### Preserve insertion order

```java
List<Integer> list = Arrays.asList(1, 2, 2, 3);

List<Integer> unique =
        new ArrayList<>(new LinkedHashSet<>(list));
```

Result:

```text
[1, 2, 3]
```

### Do not care about order

```java
Set<Integer> unique = new HashSet<>(list);
```

---

## 31. Reverse an ArrayList

```java
List<Integer> list =
        new ArrayList<>(List.of(10, 50, 30));

Collections.reverse(list);

System.out.println(list);
```

Result:

```text
[30, 50, 10]
```

---

## 32. Sort an ArrayList in Descending Order

```java
List<Integer> list =
        new ArrayList<>(List.of(10, 50, 30));

list.sort(Comparator.reverseOrder());

System.out.println(list);
```

Modern preferred style:

```java
list.sort(Comparator.reverseOrder());
```

Older style:

```java
Collections.sort(list, Comparator.reverseOrder());
```

---

## 33. Synchronize an ArrayList

### Option 1: Synchronized wrapper

```java
List<String> list =
        Collections.synchronizedList(new ArrayList<>());
```

### Option 2: CopyOnWriteArrayList

```java
List<String> list =
        new CopyOnWriteArrayList<>();
```

### When to use which?

`CopyOnWriteArrayList` is useful when:

- Reads are very frequent.
- Writes are relatively rare.
- Safe iteration is important.

It is expensive for frequent writes because each modification copies the underlying array.

---

## 34. When to Use ArrayList vs LinkedList

### Use ArrayList when

- Random access is frequent.
- The application is read-heavy.
- You want lower memory overhead.
- You need a good general-purpose list.

### Use LinkedList when

- You specifically need efficient operations at the ends.
- You use it as a `Deque`.
- Its linked-node characteristics match the workload.

### Brutally honest interview advice

Do not automatically say:

> LinkedList is always better for insertions and deletions.

Insertion or deletion in the middle is only cheap **after reaching the correct node**. Finding that node can still cost `O(n)`.

For most real-world use cases:

> Start with `ArrayList` unless you have a measured reason to choose `LinkedList`.

---

# Quick Interview Cheat Sheet

| Question | Short Answer |
|---|---|
| Root collection interface | `Collection` |
| Key-value structure | `Map` |
| Ordered duplicates allowed | `List` |
| Unique elements | `Set` |
| Fast general lookup | `HashMap` |
| Sorted keys | `TreeMap` |
| Unique sorted values | `TreeSet` |
| Preserves insertion order | `LinkedHashSet`, `LinkedHashMap` |
| Thread-safe legacy map | `Hashtable` |
| Modern concurrent map | `ConcurrentHashMap` |
| Compare natural ordering | `Comparable` |
| Multiple custom orderings | `Comparator` |
| HashMap default load factor | `0.75` |
| Array size | `length` |
| Collection size | `size()` |
| Convert array to list | `Arrays.asList()` |
| Convert list to array | `toArray()` |
| Reverse list | `Collections.reverse()` |
| Descending sort | `Comparator.reverseOrder()` |
| Read-only view | `Collections.unmodifiableList()` |
| Immutable copy | `List.copyOf()` |

---

## Final Interview Strategy

For Java Collections interviews, focus on these high-value areas:

1. Internal differences between `ArrayList`, `LinkedList`, `HashMap`, and `ConcurrentHashMap`.
2. The `equals()` and `hashCode()` contract.
3. Hash collisions and hashing basics.
4. `Comparable` vs `Comparator`.
5. Fail-fast behavior.
6. Thread-safe and concurrent collection choices.
7. Time complexity and practical trade-offs.
8. Modern Java APIs such as `List.of()`, `List.copyOf()`, method references, and `Comparator.comparing()`.

> **Best interview mindset:** Explain not only what a collection does, but also **why you would choose it for a specific workload**.
