# Comprehensive Linked List Problem and Solution

## Problem: Multi-Function Linked List Manager

Design a Java program that implements a specialized linked list with the following functionalities:

1. Create a linked list with basic operations (insert, delete, display)
2. Detect and remove a cycle in the linked list
3. Find the middle node in a single traversal
4. Reverse the linked list (both iteratively and recursively)
5. Merge two sorted linked lists
6. Find the intersection point of two linked lists
7. Clone a linked list with random pointers
8. Check if the linked list is a palindrome
9. Skip M nodes and delete N nodes
10. Add two numbers represented by linked lists
11. Flatten a multilevel linked list
12. Implement LRU Cache using doubly linked list

## Solution

```java
import java.util.*;

class LinkedListManager {
    
    // ---------- Node Definitions ----------
    
    // Basic node for singly linked list
    static class Node {
        int data;
        Node next;
        
        public Node(int data) {
            this.data = data;
            this.next = null;
        }
    }
    
    // Node with random pointer
    static class RandomNode {
        int data;
        RandomNode next;
        RandomNode random;
        
        public RandomNode(int data) {
            this.data = data;
            this.next = null;
            this.random = null;
        }
    }
    
    // Node for multilevel linked list
    static class MultiLevelNode {
        int data;
        MultiLevelNode next;
        MultiLevelNode down;
        
        public MultiLevelNode(int data) {
            this.data = data;
            this.next = null;
            this.down = null;
        }
    }
    
    // Node for doubly linked list (for LRU Cache)
    static class DoublyNode {
        int key;
        int value;
        DoublyNode prev;
        DoublyNode next;
        
        public DoublyNode(int key, int value) {
            this.key = key;
            this.value = value;
            this.prev = null;
            this.next = null;
        }
    }
    
    // ---------- Basic Operations ----------
    
    // Insert a node at the end of the linked list
    public static Node insertAtEnd(Node head, int data) {
        Node newNode = new Node(data);
        
        // If the list is empty
        if (head == null) {
            return newNode;
        }
        
        // Traverse to the end of the list
        Node current = head;
        while (current.next != null) {
            current = current.next;
        }
        
        current.next = newNode;
        return head;
    }
    
    // Insert a node at the beginning of the linked list
    public static Node insertAtBeginning(Node head, int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        return newNode;
    }
    
    // Insert a node at a specific position
    public static Node insertAtPosition(Node head, int data, int position) {
        if (position < 0) {
            System.out.println("Invalid position");
            return head;
        }
        
        if (position == 0 || head == null) {
            return insertAtBeginning(head, data);
        }
        
        Node newNode = new Node(data);
        Node current = head;
        
        for (int i = 0; i < position - 1 && current != null; i++) {
            current = current.next;
        }
        
        if (current == null) {
            System.out.println("Position out of bounds");
            return head;
        }
        
        newNode.next = current.next;
        current.next = newNode;
        
        return head;
    }
    
    // Delete a node by value
    public static Node deleteByValue(Node head, int value) {
        if (head == null) {
            return null;
        }
        
        // If head node itself holds the value to be deleted
        if (head.data == value) {
            return head.next;
        }
        
        Node current = head;
        
        // Search for the node to be deleted
        while (current.next != null && current.next.data != value) {
            current = current.next;
        }
        
        // If the value is found
        if (current.next != null) {
            current.next = current.next.next;
        }
        
        return head;
    }
    
    // Delete a node at specific position
    public static Node deleteAtPosition(Node head, int position) {
        if (head == null) {
            return null;
        }
        
        if (position == 0) {
            return head.next;
        }
        
        Node current = head;
        
        for (int i = 0; i < position - 1 && current != null; i++) {
            current = current.next;
        }
        
        if (current == null || current.next == null) {
            System.out.println("Position out of bounds");
            return head;
        }
        
        current.next = current.next.next;
        
        return head;
    }
    
    // Display the linked list
    public static void display(Node head) {
        Node current = head;
        
        while (current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;
        }
        
        System.out.println("null");
    }
    
    // ---------- Cycle Detection and Removal ----------
    
    // Detect if there is a cycle in the linked list
    public static boolean hasCycle(Node head) {
        if (head == null || head.next == null) {
            return false;
        }
        
        Node slow = head;
        Node fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            
            if (slow == fast) {
                return true;
            }
        }
        
        return false;
    }
    
    // Find the start node of the cycle
    public static Node findCycleStart(Node head) {
        if (head == null || head.next == null) {
            return null;
        }
        
        Node slow = head;
        Node fast = head;
        boolean hasCycle = false;
        
        // Detect cycle
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            
            if (slow == fast) {
                hasCycle = true;
                break;
            }
        }
        
        if (!hasCycle) {
            return null;
        }
        
        // Find the start of the cycle
        slow = head;
        while (slow != fast) {
            slow = slow.next;
            fast = fast.next;
        }
        
        return slow;
    }
    
    // Remove cycle from the linked list
    public static void removeCycle(Node head) {
        if (head == null || head.next == null) {
            return;
        }
        
        Node slow = head;
        Node fast = head;
        boolean hasCycle = false;
        
        // Detect cycle
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            
            if (slow == fast) {
                hasCycle = true;
                break;
            }
        }
        
        if (!hasCycle) {
            return;
        }
        
        // Find the start of the cycle
        slow = head;
        Node prev = fast; // To keep track of the node before the meeting point
        
        while (slow != fast) {
            prev = fast;
            slow = slow.next;
            fast = fast.next;
        }
        
        // Break the cycle
        while (fast.next != slow) {
            fast = fast.next;
        }
        
        fast.next = null;
    }
    
    // ---------- Middle Node ----------
    
    // Find the middle node of the linked list
    public static Node findMiddleNode(Node head) {
        if (head == null) {
            return null;
        }
        
        Node slow = head;
        Node fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return slow;
    }
    
    // ---------- Reverse Linked List ----------
    
    // Reverse the linked list iteratively
    public static Node reverseIterative(Node head) {
        Node prev = null;
        Node current = head;
        Node next = null;
        
        while (current != null) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        
        return prev;
    }
    
    // Reverse the linked list recursively
    public static Node reverseRecursive(Node head) {
        if (head == null || head.next == null) {
            return head;
        }
        
        Node rest = reverseRecursive(head.next);
        head.next.next = head;
        head.next = null;
        
        return rest;
    }
    
    // ---------- Merge Two Sorted Lists ----------
    
    // Merge two sorted linked lists
    public static Node mergeTwoSortedLists(Node l1, Node l2) {
        Node dummy = new Node(0);
        Node tail = dummy;
        
        while (l1 != null && l2 != null) {
            if (l1.data <= l2.data) {
                tail.next = l1;
                l1 = l1.next;
            } else {
                tail.next = l2;
                l2 = l2.next;
            }
            tail = tail.next;
        }
        
        // Attach the remaining nodes
        if (l1 != null) {
            tail.next = l1;
        } else {
            tail.next = l2;
        }
        
        return dummy.next;
    }
    
    // ---------- Find Intersection ----------
    
    // Find the intersection point of two linked lists
    public static Node findIntersection(Node headA, Node headB) {
        if (headA == null || headB == null) {
            return null;
        }
        
        Node ptrA = headA;
        Node ptrB = headB;
        
        // If the two lists have different lengths,
        // we'll iterate through both lists twice to equalize the difference
        while (ptrA != ptrB) {
            ptrA = (ptrA == null) ? headB : ptrA.next;
            ptrB = (ptrB == null) ? headA : ptrB.next;
        }
        
        return ptrA; // Either the intersection node or null
    }
    
    // ---------- Clone with Random Pointer ----------
    
    // Clone a linked list with random pointers
    public static RandomNode cloneWithRandomPointers(RandomNode head) {
        if (head == null) {
            return null;
        }
        
        // Step 1: Create a new node for each node and insert it next to the original node
        RandomNode iter = head;
        while (iter != null) {
            RandomNode copy = new RandomNode(iter.data);
            copy.next = iter.next;
            iter.next = copy;
            iter = copy.next;
        }
        
        // Step 2: Assign random pointers for the copy nodes
        iter = head;
        while (iter != null) {
            if (iter.random != null) {
                iter.next.random = iter.random.next;
            }
            iter = iter.next.next;
        }
        
        // Step 3: Restore the original list and extract the copy list
        RandomNode dummy = new RandomNode(0);
        RandomNode copyTail = dummy;
        iter = head;
        
        while (iter != null) {
            // Extract the copy
            copyTail.next = iter.next;
            copyTail = copyTail.next;
            
            // Restore the original list
            iter.next = iter.next.next;
            iter = iter.next;
        }
        
        return dummy.next;
    }
    
    // ---------- Palindrome Check ----------
    
    // Check if the linked list is a palindrome
    public static boolean isPalindrome(Node head) {
        if (head == null || head.next == null) {
            return true;
        }
        
        // Find the middle of the linked list
        Node slow = head;
        Node fast = head;
        
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // Reverse the second half of the linked list
        Node secondHalf = reverseIterative(slow.next);
        Node firstHalf = head;
        
        // Compare the first and second half nodes
        while (secondHalf != null) {
            if (firstHalf.data != secondHalf.data) {
                return false;
            }
            firstHalf = firstHalf.next;
            secondHalf = secondHalf.next;
        }
        
        return true;
    }
    
    // ---------- Skip M Delete N ----------
    
    // Skip M nodes and delete N nodes
    public static Node skipMDeleteN(Node head, int M, int N) {
        if (head == null || N <= 0) {
            return head;
        }
        
        if (M <= 0) {
            return null; // Skip 0 nodes means delete all
        }
        
        Node current = head;
        
        while (current != null) {
            // Skip M nodes
            for (int i = 1; i < M && current != null; i++) {
                current = current.next;
            }
            
            if (current == null) {
                break;
            }
            
            // Delete N nodes
            Node temp = current;
            for (int i = 0; i <= N && temp != null; i++) {
                temp = temp.next;
            }
            
            current.next = temp;
            current = temp;
        }
        
        return head;
    }
    
    // ---------- Add Two Numbers ----------
    
    // Add two numbers represented by linked lists
    public static Node addTwoNumbers(Node l1, Node l2) {
        Node dummy = new Node(0);
        Node current = dummy;
        int carry = 0;
        
        while (l1 != null || l2 != null) {
            int x = (l1 != null) ? l1.data : 0;
            int y = (l2 != null) ? l2.data : 0;
            
            int sum = carry + x + y;
            carry = sum / 10;
            
            current.next = new Node(sum % 10);
            current = current.next;
            
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }
        
        if (carry > 0) {
            current.next = new Node(carry);
        }
        
        return dummy.next;
    }
    
    // ---------- Flatten Multilevel Linked List ----------
    
    // Flatten a multilevel linked list
    public static Node flattenMultilevelList(MultiLevelNode head) {
        if (head == null) {
            return null;
        }
        
        // Placeholder for the flattened linked list
        Node dummy = new Node(0);
        Node current = dummy;
        
        // Stack to keep track of nodes
        Stack<MultiLevelNode> stack = new Stack<>();
        stack.push(head);
        
        while (!stack.isEmpty()) {
            MultiLevelNode node = stack.pop();
            
            while (node != null) {
                // Add current node to the flattened list
                current.next = new Node(node.data);
                current = current.next;
                
                // Push the next horizontal node for later processing
                if (node.next != null) {
                    stack.push(node.next);
                }
                
                // Move to the child node
                node = node.down;
            }
        }
        
        return dummy.next;
    }
    
    // ---------- LRU Cache Implementation ----------
    
    static class LRUCache {
        private int capacity;
        private Map<Integer, DoublyNode> cache;
        private DoublyNode head, tail;
        
        public LRUCache(int capacity) {
            this.capacity = capacity;
            this.cache = new HashMap<>();
            this.head = new DoublyNode(0, 0); // Dummy head
            this.tail = new DoublyNode(0, 0); // Dummy tail
            head.next = tail;
            tail.prev = head;
        }
        
        public int get(int key) {
            if (cache.containsKey(key)) {
                DoublyNode node = cache.get(key);
                moveToHead(node);
                return node.value;
            }
            return -1;
        }
        
        public void put(int key, int value) {
            if (cache.containsKey(key)) {
                DoublyNode node = cache.get(key);
                node.value = value;
                moveToHead(node);
            } else {
                DoublyNode newNode = new DoublyNode(key, value);
                cache.put(key, newNode);
                addToHead(newNode);
                
                if (cache.size() > capacity) {
                    DoublyNode tail = removeTail();
                    cache.remove(tail.key);
                }
            }
        }
        
        private void addToHead(DoublyNode node) {
            node.next = head.next;
            node.prev = head;
            head.next.prev = node;
            head.next = node;
        }
        
        private void removeNode(DoublyNode node) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        
        private void moveToHead(DoublyNode node) {
            removeNode(node);
            addToHead(node);
        }
        
        private DoublyNode removeTail() {
            DoublyNode res = tail.prev;
            removeNode(res);
            return res;
        }
    }
    
    // ---------- Utility Methods for Testing ----------
    
    // Create a cycle for testing
    public static void createCycle(Node head, int position) {
        if (head == null || position < 0) {
            return;
        }
        
        Node current = head;
        Node cyclePoint = null;
        int count = 0;
        
        // Find the position where cycle needs to be created
        while (current.next != null) {
            if (count == position) {
                cyclePoint = current;
            }
            count++;
            current = current.next;
        }
        
        // Create cycle
        if (cyclePoint != null) {
            current.next = cyclePoint;
        }
    }
    
    // Create a linked list from array
    public static Node createLinkedList(int[] array) {
        if (array == null || array.length == 0) {
            return null;
        }
        
        Node head = new Node(array[0]);
        Node current = head;
        
        for (int i = 1; i < array.length; i++) {
            current.next = new Node(array[i]);
            current = current.next;
        }
        
        return head;
    }
    
    // Create intersection between two linked lists
    public static void createIntersection(Node headA, Node headB, int posA, int posB) {
        if (headA == null || headB == null || posA < 0 || posB < 0) {
            return;
        }
        
        Node nodeA = headA;
        for (int i = 0; i < posA && nodeA != null; i++) {
            nodeA = nodeA.next;
        }
        
        Node nodeB = headB;
        for (int i = 0; i < posB && nodeB != null; i++) {
            nodeB = nodeB.next;
        }
        
        if (nodeA != null && nodeB != null) {
            nodeB.next = nodeA;
        }
    }
    
    // Main method for testing
    public static void main(String[] args) {
        // Create a linked list for testing
        Node head = null;
        head = insertAtEnd(head, 1);
        head = insertAtEnd(head, 2);
        head = insertAtEnd(head, 3);
        head = insertAtEnd(head, 4);
        head = insertAtEnd(head, 5);
        
        System.out.println("Original linked list:");
        display(head);
        
        // Test finding middle node
        Node middle = findMiddleNode(head);
        System.out.println("Middle node: " + middle.data);
        
        // Test reversing linked list
        head = reverseIterative(head);
        System.out.println("Reversed linked list:");
        display(head);
        
        // Test merging two sorted lists
        Node list1 = createLinkedList(new int[]{1, 3, 5});
        Node list2 = createLinkedList(new int[]{2, 4, 6});
        Node merged = mergeTwoSortedLists(list1, list2);
        System.out.println("Merged linked list:");
        display(merged);
        
        // Test cycle detection
        Node cycleList = createLinkedList(new int[]{1, 2, 3, 4, 5});
        createCycle(cycleList, 2);
        System.out.println("Has cycle: " + hasCycle(cycleList));
        removeCycle(cycleList);
        System.out.println("After removing cycle, has cycle: " + hasCycle(cycleList));
        
        // Test palindrome check
        Node palindrome = createLinkedList(new int[]{1, 2, 3, 2, 1});
        System.out.println("Is palindrome: " + isPalindrome(palindrome));
        
        // Test skip M delete N
        Node skipList = createLinkedList(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10});
        skipList = skipMDeleteN(skipList, 2, 3);
        System.out.println("After skipping 2 and deleting 3:");
        display(skipList);
    }
}
```

## Patterns Covered in the Solution

This comprehensive problem covers nearly all common linked list patterns:

1. **Basic Operations**:
   - Insertion (beginning, end, specific position)
   - Deletion (by value, by position)
   - Traversal and display

2. **Special Pointer Techniques**:
   - Fast and slow pointers (used in middle node finding, cycle detection, palindrome check)
   - Multiple pointer manipulation (used in list reversal)
   - Dummy node pattern (used in merging lists and adding numbers)

3. **Cycle Detection and Handling**:
   - Floyd's Cycle-Finding Algorithm (Tortoise and Hare)
   - Cycle detection
   - Finding cycle start point
   - Cycle removal

4. **List Manipulation**:
   - Reversing (both iterative and recursive approaches)
   - Merging sorted lists
   - Skip and delete pattern
   - In-place operations

5. **Two-Pointer Techniques**:
   - From opposite ends (palindrome check)
   - At different speeds (middle finding)
   - From different starting points (intersection finding)

6. **Complex Node Structures**:
   - Singly linked list
   - Doubly linked list (for LRU Cache)
   - Random pointer nodes
   - Multi-level linked list

7. **Algorithmic Patterns**:
   - Two-pass algorithms (palindrome check)
   - Hash map utilization (LRU Cache)
   - Stack-based traversal (flattening multi-level list)
   - Mathematical operations on lists (adding two numbers)

8. **Special Problem Patterns**:
   - Palindrome verification
   - Deep clone with complex pointers
   - Finding intersection points
   - Flattening hierarchical structures
   - LRU Cache implementation using doubly linked list
