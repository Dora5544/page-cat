Sure, here is a simple implementation of Quick Sort in JavaScript:

```javascript
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        let pivotIndex = pivot(arr, left, right);
        // recursively call the function for the left and right part of the array
        quickSort(arr, left, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
}

function pivot(arr, start = 0, end = arr.length - 1) {
    let pivot = arr[start];
    let swapIdx = start;

    for (let i = start + 1; i <= end; i++) {
        if (pivot > arr[i]) {
            swapIdx++;
            [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]];
        }
    }

    [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]];
    return swapIdx;
}

// Test the code
let arr = [5, 3, 1, 4, 6];
console.log(quickSort(arr)); // Output: [1, 3, 4, 5, 6]
```

This code first defines a helper function `pivot` which is used to take an element in the array (the pivot) and move all elements that are less than the pivot value before it, and all values that are greater after it. 

The `quickSort` function then uses this `pivot` function to sort the array. It first finds the pivot index in the array, then recursively calls `quickSort` on the subarray to the left of that index, and the subarray to the right of that index. 

This process continues until the base case is reached, which is when the left pointer is no longer less than the right pointer. At this point, the array is sorted and is returned.