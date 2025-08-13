function insertionSort(arr) {
    const n = arr.length;
    
    // Start from the second element (index 1)
    for (let i = 1; i < n; i++) {
        let key = arr[i]; // Current element to be inserted
        let j = i - 1;    // Index of the last element in sorted portion
        
        // Move elements of arr[0..i-1] that are greater than key
        // one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Place key at its correct position
        arr[j + 1] = key;
    }
    
    return arr;
}

// Alternative implementation with more explicit shifting
function insertionSortVerbose(arr) {
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let position = i;
        
        // Shift elements to the right until we find the correct position
        while (position > 0 && arr[position - 1] > current) {
            arr[position] = arr[position - 1];
            position--;
        }
        
        // Insert the current element at its correct position
        arr[position] = current;
    }
    
    return arr;
}

// Version that doesn't modify the original array
function insertionSortCopy(arr) {
    const copy = [...arr];
    return insertionSort(copy);
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", numbers);

const sorted = insertionSortCopy(numbers);
console.log("Sorted array:", sorted);

// Test with different scenarios
const almostSorted = [1, 3, 2, 4, 6, 5, 7];
console.log("Almost sorted:", almostSorted);
console.log("After insertion sort:", insertionSortCopy(almostSorted));

const reversed = [9, 8, 7, 6, 5, 4, 3, 2, 1];
console.log("Reversed array:", reversed);
console.log("After insertion sort:", insertionSortCopy(reversed));

// Works with strings too
const words = ['zebra', 'apple', 'banana', 'cherry'];
console.log("Original words:", words);
console.log("Sorted words:", insertionSortCopy(words));