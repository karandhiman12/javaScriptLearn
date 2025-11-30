//se;ection sort in javascript

function selectionSort(arr) {
    const n = arr.length;
    
    // One by one move boundary of unsorted subarray
    for (let i = 0; i < n - 1; i++) {
        // Find the minimum element in remaining unsorted array
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // Swap the found minimum element with the first element
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    
    return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", numbers);

const sorted = selectionSort([...numbers]); // Create a copy to preserve original
console.log("Sorted array:", sorted);

// Alternative version that doesn't modify the original array
function selectionSortCopy(arr) {
    const copy = [...arr];
    return selectionSort(copy);
}

// Test with different data types
const strings = ['banana', 'apple', 'cherry', 'date'];
console.log("Original strings:", strings);
console.log("Sorted strings:", selectionSortCopy(strings));