// Binary Search Implementation
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found the target, return index
    }
    
    if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  
  return -1; // Target not found
}

// Recursive version
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1; // Base case: target not found
  }
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) {
    return mid;
  }
  
  if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}

// Example usage
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

console.log('Iterative Binary Search:');
console.log(`Index of 7: ${binarySearch(sortedArray, 7)}`);
console.log(`Index of 15: ${binarySearch(sortedArray, 15)}`);
console.log(`Index of 20: ${binarySearch(sortedArray, 20)}`);

console.log('\nRecursive Binary Search:');
console.log(`Index of 7: ${binarySearchRecursive(sortedArray, 7)}`);
console.log(`Index of 15: ${binarySearchRecursive(sortedArray, 15)}`);
console.log(`Index of 20: ${binarySearchRecursive(sortedArray, 20)}`);

// Export for use in other modules
module.exports = { binarySearch, binarySearchRecursive };