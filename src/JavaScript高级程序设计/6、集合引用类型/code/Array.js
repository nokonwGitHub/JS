let arr = ["Hello"];
// arr.length = 10;

let arr2 = new Array("Hello");
// let arr2 = new Array(10);

try {
    let arr3 = new Array(4294967296);
} catch (e) {
    console.log("数组长度不能超过4294967295")
}

// 索引修改，访问，增加
arr[0] = "other";
console.log(arr[0]);
arr[1] = ""


// fill
let fill = new Array(20)
fill.fill(10, 6, 10)
console.log(fill, "fill") // [ <6 empty items>, 10, 10, 10, 10, <10 empty items> ]

// copyWithin
let copyWithin = [1, 2, 3, 4, 5, 6, 7, 8, 9]
copyWithin.copyWithin(0, 5)
console.log(copyWithin, "copyWithin") // [6, 7, 8, 9, 5, 6, 7, 8, 9]


// find  findIndex
let find = [
    {
        index: 0,
    },
    {
        index: 1,
    },
    {
        index: 2,
    }
]

console.log(find.find((value, index, array) => {
    return value.index === 1;
}), "find");

console.log(find.findIndex((value, index, array) => {
    return value.index === 1;
}), "findIndex");

/*迭代方法*/
// every
console.log(find.every((value, index) => {
    return value["index"] >= 0
}), "every")

// some
console.log(find.some((value, index) => {
    return value["index"] === 2
}), "some")

// filter
console.log(find.filter((value, index) => {
    return value["index"] > 0 && value["index"] < 2
}), "filter")

// forEach
let forEach = []
find.forEach((value, index) => {
    forEach.push(value.index)
})

console.log(forEach, "forEach")

// map
console.log(find.map((value, index) => {
    return value.index
}), "map")


// 归并
console.log(find.reduce((previousValue, currentValue, currentIndex, array) => {
    previousValue.push(currentValue.index)
    return previousValue
}, []), "reduce");



// 展开
let flat = [1, [1, [1, [1,]]]]
console.log(flat.flat(1), "flat 1")
console.log(flat.flat(2), "flat 2")
console.log(flat.flat(3), "flat 3")

let flatMap = ["a b c", "d", "abcd"];
console.log(flatMap.flatMap((value, index, array) => {
    return value.split(" ") // 返回一个数组
}), "flatMap")


// 迭代器
let keys = ["a", "b", "d"]

for (let item of keys.keys()) {
    console.log(item)
}

for (let item of keys.values()) {
    console.log(item)
}

for (let item of keys.entries()) {
    console.log(item)
}
