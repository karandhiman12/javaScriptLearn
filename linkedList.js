// Node class to represent individual elements in the linked list
class Node{
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// LinkedList class with various operations
class LinkedList{
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Add element to the beginning of the list
    prepend(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    // Add element to the end of the list
    append(data) {
        const newNode = new Node(data);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    // Insert element at specific index
    insertAt(index, data) {
        if (index < 0 || index > this.size) {
            throw new Error('Index out of bounds');
        }

        if (index === 0) {
            this.prepend(data);
            return;
        }

        const newNode = new Node(data);
        let current = this.head;
        
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        newNode.next = current.next;
        current.next = newNode;
        this.size++;
    }

    // Remove element from the beginning
    removeFirst() {
        if (!this.head) return null;
        
        const removedData = this.head.data;
        this.head = this.head.next;
        this.size--;
        return removedData;
    }

    // Remove element from the end
    removeLast() {
        if (!this.head) return null;
        
        if (!this.head.next) {
            const removedData = this.head.data;
            this.head = null;
            this.size--;
            return removedData;
        }
        
        let current = this.head;
        while (current.next.next) {
            current = current.next;
        }
        
        const removedData = current.next.data;
        current.next = null;
        this.size--;
        return removedData;
    }

    // Remove element at specific index
    removeAt(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }

        if (index === 0) {
            return this.removeFirst();
        }

        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        const removedData = current.next.data;
        current.next = current.next.next;
        this.size--;
        return removedData;
    }

    // Find element and return its index
    indexOf(data) {
        let current = this.head;
        let index = 0;
        
        while (current) {
            if (current.data === data) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    // Check if list contains an element
    contains(data) {
        return this.indexOf(data) !== -1;
    }

    // Get element at specific index
    get(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current.data;
    }

    // Get the size of the list
    getSize() {
        return this.size;
    }

    // Check if list is empty
    isEmpty() {
        return this.size === 0;
    }

    // Clear the entire list
    clear() {
        this.head = null;
        this.size = 0;
    }

    // Convert list to array
    toArray() {
        const result = [];
        let current = this.head;
        
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }

    // Display the list
    display() {
        if (!this.head) {
            console.log('List is empty');
            return;
        }

        const elements = this.toArray();
        console.log(elements.join(' -> '));
    }

    // Reverse the linked list
    reverse() {
        let prev = null;
        let current = this.head;
        let next = null;
        
        while (current) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        
        this.head = prev;
    }
}

// Demonstration of the LinkedList
function demonstrateLinkedList() {
    console.log('=== Linked List Demonstration ===\n');
    
    // Create a new linked list
    const list = new LinkedList();
    
    console.log('1. Creating empty list:');
    console.log('Size:', list.getSize());
    console.log('Is empty:', list.isEmpty());
    list.display();
    
    console.log('\n2. Adding elements to the end (append):');
    list.append(10);
    list.append(20);
    list.append(30);
    list.display();
    console.log('Size:', list.getSize());
    
    console.log('\n3. Adding elements to the beginning (prepend):');
    list.prepend(5);
    list.prepend(1);
    list.display();
    console.log('Size:', list.getSize());
    
    console.log('\n4. Inserting element at specific index:');
    list.insertAt(2, 15); // Insert 15 at index 2
    list.display();
    console.log('Size:', list.getSize());
    
    console.log('\n5. Getting elements by index:');
    console.log('Element at index 0:', list.get(0));
    console.log('Element at index 3:', list.get(3));
    console.log('Element at index 5:', list.get(5));
    
    console.log('\n6. Searching for elements:');
    console.log('Index of 15:', list.indexOf(15));
    console.log('Index of 99:', list.indexOf(99));
    console.log('Contains 20:', list.contains(20));
    console.log('Contains 99:', list.contains(99));
    
    console.log('\n7. Current list as array:', list.toArray());
    
    console.log('\n8. Removing elements:');
    console.log('Removed first element:', list.removeFirst());
    list.display();
    console.log('Removed last element:', list.removeLast());
    list.display();
    console.log('Removed element at index 1:', list.removeAt(1));
    list.display();
    console.log('Size after removals:', list.getSize());
    
    console.log('\n9. Reversing the list:');
    console.log('Before reverse:', list.toArray());
    list.reverse();
    console.log('After reverse:', list.toArray());
    list.display();
    
    console.log('\n10. Adding more elements for final demonstration:');
    list.append(40);
    list.append(50);
    list.prepend(0);
    list.display();
    console.log('Final list as array:', list.toArray());
    console.log('Final size:', list.getSize());
    
    console.log('\n11. Clearing the list:');
    list.clear();
    console.log('After clear - Size:', list.getSize());
    console.log('Is empty:', list.isEmpty());
    list.display();
}

// Additional utility function to create a list from array
function createListFromArray(arr) {
    const list = new LinkedList();
    arr.forEach(item => list.append(item));
    return list;
}

// Example of creating list from array
function arrayToListDemo() {
    console.log('\n=== Creating List from Array ===');
    const numbers = [1, 2, 3, 4, 5];
    const list = createListFromArray(numbers);
    console.log('Original array:', numbers);
    console.log('Created list:');
    list.display();
}

// Run the demonstrations
if (require.main === module) {
    demonstrateLinkedList();
    arrayToListDemo();
}

// Export the classes for use in other modules
module.exports = { Node, LinkedList, createListFromArray };