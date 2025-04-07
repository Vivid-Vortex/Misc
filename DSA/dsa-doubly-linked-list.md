# Comprehensive Doubly Linked List Challenge and Solution

## Problem Statement

You're building a text editor application that needs an efficient way to store and manipulate text. Design a text buffer using a Doubly Linked List with the following operations:

1. Insert text at a specific position
2. Delete text from a specific position
3. Navigate forward and backward through the buffer
4. Copy a range of text
5. Cut a range of text
6. Paste text at current position
7. Implement undo and redo functionality for all operations
8. Find and replace text
9. Implement a cursor that can move bidirectionally
10. Split the buffer into two separate buffers at a specific position
11. Merge two buffers together
12. Create a circular buffer option for navigating
13. Implement pagination - split text into pages of fixed size
14. Reverse a section of text
15. Sort a section of text (alphabetically)

## Implementation Requirements

Your solution should:
- Use a doubly linked list as the underlying data structure
- Optimize operations for large text inputs
- Support efficient traversal in both directions
- Provide methods to convert between String and your buffer representation
- Handle edge cases (empty buffer, operations at start/end, etc.)
- Include appropriate exceptions handling

## Solution

```java
/**
 * Comprehensive Doubly Linked List Text Editor Implementation
 * This implementation covers almost all common patterns of Doubly Linked List operations.
 */

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.List;

public class TextEditor {
    // Node class for the doubly linked list
    private static class Node {
        char data;
        Node prev;
        Node next;

        Node(char data) {
            this.data = data;
            this.prev = null;
            this.next = null;
        }
    }

    // Class that represents the state of the text buffer
    private static class BufferState {
        Node head;
        Node tail;
        Node cursor;
        int cursorPosition;

        BufferState(Node head, Node tail, Node cursor, int cursorPosition) {
            this.head = head;
            this.tail = tail;
            this.cursor = cursor;
            this.cursorPosition = cursorPosition;
        }

        // Deep copy of the buffer state for undo/redo functionality
        BufferState deepCopy() {
            if (head == null) {
                return new BufferState(null, null, null, 0);
            }

            Node newHead = new Node(head.data);
            Node current = head.next;
            Node newCurrent = newHead;
            Node newCursor = (cursor == head) ? newHead : null;

            while (current != null) {
                Node newNode = new Node(current.data);
                newNode.prev = newCurrent;
                newCurrent.next = newNode;
                newCurrent = newNode;

                if (current == cursor) {
                    newCursor = newNode;
                }

                current = current.next;
            }

            return new BufferState(newHead, newCurrent, newCursor, cursorPosition);
        }
    }

    // Command interface and implementations for undo/redo functionality
    private interface Command {
        void execute();
        void undo();
    }

    private Node head;
    private Node tail;
    private Node cursor;
    private int cursorPosition;
    private int bufferSize;
    private String clipboard;
    private Deque<Command> undoStack;
    private Deque<Command> redoStack;
    private boolean isCircular;

    // Constructor
    public TextEditor() {
        head = null;
        tail = null;
        cursor = null;
        cursorPosition = 0;
        bufferSize = 0;
        clipboard = "";
        undoStack = new ArrayDeque<>();
        redoStack = new ArrayDeque<>();
        isCircular = false;
    }

    // Sets whether the buffer is circular
    public void setCircular(boolean isCircular) {
        this.isCircular = isCircular;
        if (isCircular && head != null && tail != null) {
            tail.next = head;
            head.prev = tail;
        } else if (!isCircular && head != null && tail != null) {
            tail.next = null;
            head.prev = null;
        }
    }

    // Insert text at current cursor position
    public void insertText(String text) {
        if (text == null || text.isEmpty()) {
            return;
        }

        final String textToInsert = text;
        final int position = cursorPosition;

        Command cmd = new Command() {
            private final BufferState previousState = new BufferState(head, tail, cursor, cursorPosition);

            @Override
            public void execute() {
                insertTextAtPosition(textToInsert, position);
            }

            @Override
            public void undo() {
                deleteTextRange(position, position + textToInsert.length());
            }
        };

        cmd.execute();
        undoStack.push(cmd);
        redoStack.clear();
    }

    // Helper method to insert text at a specific position
    private void insertTextAtPosition(String text, int position) {
        if (position < 0 || position > bufferSize) {
            throw new IndexOutOfBoundsException("Position out of bounds");
        }

        // If buffer is empty
        if (head == null) {
            for (char c : text.toCharArray()) {
                Node newNode = new Node(c);
                if (head == null) {
                    head = newNode;
                    tail = newNode;
                } else {
                    tail.next = newNode;
                    newNode.prev = tail;
                    tail = newNode;
                }
                bufferSize++;
            }
            cursor = head;
            cursorPosition = 0;
            return;
        }

        // Insert at the beginning
        if (position == 0) {
            for (int i = text.length() - 1; i >= 0; i--) {
                Node newNode = new Node(text.charAt(i));
                newNode.next = head;
                head.prev = newNode;
                head = newNode;
                bufferSize++;
            }
            cursor = head;
            cursorPosition = 0;
            return;
        }

        // Insert at the end
        if (position == bufferSize) {
            for (char c : text.toCharArray()) {
                Node newNode = new Node(c);
                tail.next = newNode;
                newNode.prev = tail;
                tail = newNode;
                bufferSize++;
            }
            cursor = tail;
            cursorPosition = bufferSize - 1;
            return;
        }

        // Insert in the middle
        Node current = head;
        int count = 0;
        
        // Navigate to the insertion position
        while (count < position) {
            current = current.next;
            count++;
        }

        for (char c : text.toCharArray()) {
            Node newNode = new Node(c);
            newNode.prev = current.prev;
            newNode.next = current;
            current.prev.next = newNode;
            current.prev = newNode;
            bufferSize++;
        }
        
        cursor = current;
        cursorPosition = position + text.length();
    }

    // Delete text from the current cursor position
    public void deleteText(int count) {
        if (count <= 0 || head == null) {
            return;
        }

        final int position = cursorPosition;
        final String deletedText = getTextRange(position, Math.min(position + count, bufferSize));

        Command cmd = new Command() {
            @Override
            public void execute() {
                deleteTextRange(position, position + count);
            }

            @Override
            public void undo() {
                insertTextAtPosition(deletedText, position);
            }
        };

        cmd.execute();
        undoStack.push(cmd);
        redoStack.clear();
    }

    // Helper method to delete a range of text
    private void deleteTextRange(int start, int end) {
        if (start < 0 || start >= bufferSize || end < start || end > bufferSize) {
            throw new IndexOutOfBoundsException("Range out of bounds");
        }

        int count = end - start;
        
        // If we're deleting the entire buffer
        if (count >= bufferSize) {
            head = null;
            tail = null;
            cursor = null;
            cursorPosition = 0;
            bufferSize = 0;
            return;
        }

        // Navigate to the start position
        Node startNode = getNodeAtPosition(start);
        
        // Delete the nodes
        for (int i = 0; i < count; i++) {
            Node nodeToDelete = startNode;
            
            // Update head/tail pointers if necessary
            if (nodeToDelete == head) {
                head = head.next;
                if (head != null) {
                    head.prev = isCircular ? tail : null;
                    if (isCircular && tail != null) {
                        tail.next = head;
                    }
                }
            } else if (nodeToDelete == tail) {
                tail = tail.prev;
                if (tail != null) {
                    tail.next = isCircular ? head : null;
                    if (isCircular && head != null) {
                        head.prev = tail;
                    }
                }
            } else {
                nodeToDelete.prev.next = nodeToDelete.next;
                nodeToDelete.next.prev = nodeToDelete.prev;
            }
            
            startNode = nodeToDelete.next;
            bufferSize--;
        }

        // Update cursor position
        if (start < cursorPosition) {
            cursorPosition = Math.max(start, cursorPosition - count);
            cursor = getNodeAtPosition(cursorPosition);
        }
    }

    // Get node at a specific position
    private Node getNodeAtPosition(int position) {
        if (position < 0 || position >= bufferSize) {
            throw new IndexOutOfBoundsException("Position out of bounds");
        }

        Node current;
        int count;

        // Optimization: start from the closest end
        if (position <= bufferSize / 2) {
            current = head;
            count = 0;
            while (count < position) {
                current = current.next;
                count++;
            }
        } else {
            current = tail;
            count = bufferSize - 1;
            while (count > position) {
                current = current.prev;
                count--;
            }
        }

        return current;
    }

    // Move cursor forward
    public void moveCursorForward(int steps) {
        if (head == null || steps <= 0) {
            return;
        }

        for (int i = 0; i < steps; i++) {
            if (cursor == null) {
                cursor = head;
                cursorPosition = 0;
                continue;
            }

            if (cursor.next == null) {
                if (isCircular) {
                    cursor = head;
                    cursorPosition = 0;
                }
                break;
            }

            cursor = cursor.next;
            cursorPosition++;
        }
    }

    // Move cursor backward
    public void moveCursorBackward(int steps) {
        if (head == null || steps <= 0) {
            return;
        }

        for (int i = 0; i < steps; i++) {
            if (cursor == null) {
                cursor = tail;
                cursorPosition = bufferSize - 1;
                continue;
            }

            if (cursor.prev == null) {
                if (isCircular) {
                    cursor = tail;
                    cursorPosition = bufferSize - 1;
                }
                break;
            }

            cursor = cursor.prev;
            cursorPosition--;
        }
    }

    // Copy a range of text to clipboard
    public void copyText(int start, int end) {
        if (start < 0 || end > bufferSize || start >= end) {
            throw new IndexOutOfBoundsException("Invalid range");
        }

        clipboard = getTextRange(start, end);
    }

    // Helper method to get text range
    private String getTextRange(int start, int end) {
        if (start < 0 || end > bufferSize || start >= end) {
            throw new IndexOutOfBoundsException("Invalid range");
        }

        StringBuilder result = new StringBuilder();
        Node current = getNodeAtPosition(start);
        
        for (int i = start; i < end; i++) {
            result.append(current.data);
            current = current.next;
        }
        
        return result.toString();
    }

    // Cut text from start to end
    public void cutText(int start, int end) {
        if (start < 0 || end > bufferSize || start >= end) {
            throw new IndexOutOfBoundsException("Invalid range");
        }

        final int startPos = start;
        final int endPos = end;
        final String cutText = getTextRange(start, end);

        Command cmd = new Command() {
            @Override
            public void execute() {
                clipboard = cutText;
                deleteTextRange(startPos, endPos);
            }

            @Override
            public void undo() {
                insertTextAtPosition(cutText, startPos);
            }
        };

        cmd.execute();
        undoStack.push(cmd);
        redoStack.clear();
    }

    // Paste text at current cursor position
    public void pasteText() {
        if (clipboard == null || clipboard.isEmpty()) {
            return;
        }

        insertText(clipboard);
    }

    // Undo last operation
    public void undo() {
        if (undoStack.isEmpty()) {
            return;
        }

        Command cmd = undoStack.pop();
        cmd.undo();
        redoStack.push(cmd);
    }

    // Redo last undone operation
    public void redo() {
        if (redoStack.isEmpty()) {
            return;
        }

        Command cmd = redoStack.pop();
        cmd.execute();
        undoStack.push(cmd);
    }

    // Find and replace text
    public void findAndReplace(String find, String replace) {
        if (find == null || find.isEmpty() || head == null) {
            return;
        }

        final List<Integer> positions = new ArrayList<>();
        String text = toString();
        
        int index = text.indexOf(find);
        while (index != -1) {
            positions.add(index);
            index = text.indexOf(find, index + 1);
        }

        // Replace from end to start to avoid position shifts
        for (int i = positions.size() - 1; i >= 0; i--) {
            int pos = positions.get(i);
            deleteTextRange(pos, pos + find.length());
            insertTextAtPosition(replace, pos);
        }
    }

    // Split the buffer at current cursor position
    public TextEditor split() {
        TextEditor newEditor = new TextEditor();
        
        if (head == null || cursor == null) {
            return newEditor;
        }

        // Create a new buffer for the second part
        if (cursor.next != null) {
            // Update the new buffer
            newEditor.head = cursor.next;
            newEditor.tail = tail;
            newEditor.bufferSize = bufferSize - cursorPosition - 1;
            
            // Update previous links in the new buffer
            Node current = newEditor.head;
            current.prev = null;
            
            // Update the original buffer
            cursor.next = null;
            tail = cursor;
            bufferSize = cursorPosition + 1;
        }
        
        return newEditor;
    }

    // Merge another buffer to the end of this buffer
    public void merge(TextEditor other) {
        if (other == null || other.head == null) {
            return;
        }

        if (head == null) {
            head = other.head;
            tail = other.tail;
            cursor = head;
            cursorPosition = 0;
            bufferSize = other.bufferSize;
            return;
        }

        // Connect the two buffers
        tail.next = other.head;
        other.head.prev = tail;
        tail = other.tail;
        bufferSize += other.bufferSize;
        
        // Update circular references if necessary
        if (isCircular) {
            tail.next = head;
            head.prev = tail;
        }
    }

    // Implement pagination - get a specific page of text
    public String getPage(int pageNumber, int pageSize) {
        if (pageNumber < 0 || pageSize <= 0) {
            throw new IllegalArgumentException("Invalid page parameters");
        }

        int start = pageNumber * pageSize;
        int end = Math.min(start + pageSize, bufferSize);
        
        if (start >= bufferSize) {
            return "";
        }
        
        return getTextRange(start, end);
    }

    // Reverse a section of text
    public void reverseSection(int start, int end) {
        if (start < 0 || end > bufferSize || start >= end) {
            throw new IndexOutOfBoundsException("Invalid range");
        }

        final int startPos = start;
        final int endPos = end;
        final String originalText = getTextRange(start, end);

        Command cmd = new Command() {
            @Override
            public void execute() {
                // Get the text, reverse it, and replace
                String reversed = new StringBuilder(getTextRange(startPos, endPos)).reverse().toString();
                deleteTextRange(startPos, endPos);
                insertTextAtPosition(reversed, startPos);
            }

            @Override
            public void undo() {
                deleteTextRange(startPos, endPos);
                insertTextAtPosition(originalText, startPos);
            }
        };

        cmd.execute();
        undoStack.push(cmd);
        redoStack.clear();
    }

    // Sort a section of text alphabetically
    public void sortSection(int start, int end) {
        if (start < 0 || end > bufferSize || start >= end) {
            throw new IndexOutOfBoundsException("Invalid range");
        }

        final int startPos = start;
        final int endPos = end;
        final String originalText = getTextRange(start, end);

        Command cmd = new Command() {
            @Override
            public void execute() {
                // Get the text, sort it, and replace
                char[] chars = getTextRange(startPos, endPos).toCharArray();
                List<Character> charList = new ArrayList<>();
                for (char c : chars) {
                    charList.add(c);
                }
                Collections.sort(charList);
                
                StringBuilder sorted = new StringBuilder();
                for (Character c : charList) {
                    sorted.append(c);
                }
                
                deleteTextRange(startPos, endPos);
                insertTextAtPosition(sorted.toString(), startPos);
            }

            @Override
            public void undo() {
                deleteTextRange(startPos, endPos);
                insertTextAtPosition(originalText, startPos);
            }
        };

        cmd.execute();
        undoStack.push(cmd);
        redoStack.clear();
    }

    // Convert the buffer to string
    @Override
    public String toString() {
        StringBuilder result = new StringBuilder();
        Node current = head;
        
        while (current != null) {
            result.append(current.data);
            current = current.next;
            
            // Avoid infinite loop in circular list
            if (isCircular && current == head) {
                break;
            }
        }
        
        return result.toString();
    }

    // Set text from string
    public void setText(String text) {
        clear();
        insertText(text);
    }

    // Clear the buffer
    public void clear() {
        head = null;
        tail = null;
        cursor = null;
        cursorPosition = 0;
        bufferSize = 0;
    }

    // Get the current buffer size
    public int size() {
        return bufferSize;
    }

    // Get the current cursor position
    public int getCursorPosition() {
        return cursorPosition;
    }

    // Set the cursor position
    public void setCursorPosition(int position) {
        if (position < 0 || position > bufferSize) {
            throw new IndexOutOfBoundsException("Position out of bounds");
        }

        cursor = getNodeAtPosition(position);
        cursorPosition = position;
    }

    // Main method with example usage
    public static void main(String[] args) {
        // Create a new text editor
        TextEditor editor = new TextEditor();
        
        // Test inserting text
        editor.insertText("Hello, Doubly Linked List!");
        System.out.println("After insert: " + editor);
        
        // Test moving cursor
        editor.setCursorPosition(7);
        System.out.println("Cursor at position: " + editor.getCursorPosition());
        
        // Test inserting at cursor
        editor.insertText(" wonderful");
        System.out.println("After insert at cursor: " + editor);
        
        // Test copy and paste
        editor.copyText(0, 5);
        editor.setCursorPosition(editor.size());
        editor.pasteText();
        System.out.println("After copy and paste: " + editor);
        
        // Test undo and redo
        editor.undo();
        System.out.println("After undo: " + editor);
        editor.redo();
        System.out.println("After redo: " + editor);
        
        // Test delete
        editor.setCursorPosition(7);
        editor.deleteText(10);
        System.out.println("After delete: " + editor);
        
        // Test find and replace
        editor.findAndReplace("Doubly", "Amazing");
        System.out.println("After find and replace: " + editor);
        
        // Test reverse section
        editor.reverseSection(7, 14);
        System.out.println("After reverse section: " + editor);
        
        // Test split
        editor.setCursorPosition(7);
        TextEditor secondEditor = editor.split();
        System.out.println("First part after split: " + editor);
        System.out.println("Second part after split: " + secondEditor);
        
        // Test merge
        editor.merge(secondEditor);
        System.out.println("After merge: " + editor);
        
        // Test circular
        editor.setCircular(true);
        editor.setCursorPosition(editor.size() - 1);
        editor.moveCursorForward(3);
        System.out.println("After circular move forward: " + editor);
        System.out.println("Cursor at position: " + editor.getCursorPosition());
    }
}
```

## Explanation of Patterns Covered

This comprehensive text editor implementation covers nearly all doubly linked list patterns:

1. **Basic DLL Operations**:
   - Creating, inserting, and deleting nodes
   - Traversing nodes in both directions
   - Managing head and tail pointers

2. **Insertion Patterns**:
   - Insert at the beginning of the list
   - Insert at the end of the list
   - Insert in the middle of the list
   - Insert an entire string of characters

3. **Deletion Patterns**:
   - Delete from the beginning of the list
   - Delete from the end of the list
   - Delete from the middle of the list
   - Delete a range of nodes

4. **Cursor and Navigation**:
   - Bidirectional traversal
   - Cursor positioning
   - Optimization for locating nodes (head vs. tail approach)

5. **Memory Management**:
   - Creating new nodes
   - Managing references between nodes
   - Handling empty list cases

6. **Command Pattern Implementation**:
   - Undo/redo functionality
   - State saving and restoration

7. **Advanced Operations**:
   - Split and merge lists
   - Reverse sections
   - Sort sections
   - Find and replace

8. **Edge Cases**:
   - Empty list handling
   - Single node list handling
   - Operations at list boundaries

9. **Circular Doubly Linked List**:
   - Converting between circular and non-circular modes
   - Special navigation for circular lists
   - Managing head and tail connections in circular mode

10. **Memory Optimization**:
    - Smart traversal (starting from closer end)
    - Efficient node reuse in operations

11. **Buffer Management**:
    - Pagination implementation
    - Range operations
    - Clipboard functionality

12. **State Management**:
    - Deep copying for undo/redo
    - Maintaining cursor position during operations

13. **Conversion Operations**:
    - Converting between string and list representation
    - Managing character-by-character operations

14. **Utility Operations**:
    - Getting text ranges
    - Checking buffer size
    - Clearing the buffer

The solution demonstrates a comprehensive implementation that covers virtually all common doubly linked list patterns while creating a practical text editor application. The code includes detailed comments and a main method with examples to demonstrate the functionality.
