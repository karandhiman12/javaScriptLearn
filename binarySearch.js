function binarySearch(array, target) {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (array[mid] === target) {
            return mid; // Target found, return its index
        }

        if (array[mid] < target) {
            left = mid + 1; // Search in the right half
        } else {
            right = mid - 1; // Search in the left half
        }
    }

    return -1; // Target not found
}

// Example usage:
const sortedArray = [1, 3, 5, 7, 9, 11];
const target = 7;

const result = binarySearch(sortedArray, target);
console.log(result); // Output: 3 (index of the target element)
