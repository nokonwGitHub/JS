const p = [1, 2, 3, 4, 5, 6];
const iterable = p[Symbol.iterator]();

console.log(iterable.next())
console.log(iterable.next())
console.log(iterable.next())
console.log(iterable.next())
console.log(iterable.next())
console.log(iterable.next())
console.log(iterable.next())


class Count {
    constructor(limit = 10) {

        this.limit = limit;
    }

    [Symbol.iterator]() {
        let count = 1,
            limit = this.limit;
        return {
            next() {
                if (count <= limit) {
                    return {value: count++, done: false};
                }
                return {value: undefined, done: true};
            },
            return() {
                console.log("提前终止")
                return {value: undefined, done: true};
            }
        };
    }
}

let count = new Count(5);
for (const item of count) {
    console.log(item)
    if (item === 4) {
        break;
    }
}
