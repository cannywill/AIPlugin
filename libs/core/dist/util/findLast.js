export function findLastIndex(arr, criterion) {
    let lastIndex = -1;
    for (let i = arr.length - 1; i >= 0; i--) {
        if (criterion(arr[i])) {
            lastIndex = i;
            break;
        }
    }
    return lastIndex;
}
export function findLast(arr, criterion) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (criterion(arr[i])) {
            return arr[i];
        }
    }
}
