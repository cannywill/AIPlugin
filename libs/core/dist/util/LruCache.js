export class PrecalculatedLruCache {
    calculateValue;
    N;
    items = [];
    constructor(calculateValue, N) {
        this.calculateValue = calculateValue;
        this.N = N;
    }
    async initKey(key) {
        // Maintain LRU
        const index = this.items.findIndex((item) => item[0] === key);
        if (index < 0) {
            // Calculate info for new file
            const value = await this.calculateValue(key);
            if (value === null) {
                return;
            }
            this.items.push([key, value]);
            if (this.items.length > this.N) {
                this.items.shift();
            }
        }
        else {
            // Move to end of array, since it was recently used
            const [item] = this.items.splice(index, 1);
            this.items.push(item);
        }
    }
    get(key) {
        return this.items.find((item) => item[0] === key)?.[1];
    }
}
