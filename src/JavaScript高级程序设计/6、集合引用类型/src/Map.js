let obj = {};
let map = new Map([[obj, obj]]);
let key = function () {
    return "key";
};

map.set(obj, {a: 10});
map.set(key, key);


let getKey = map.get(key);
console.log(map.has(key));

console.log(getKey());


map.forEach((value, key1, map1) => {
    console.log([key1, value])
});

console.log(map.keys())
console.log(map.values())
console.log(map.entries())

console.log(map.size)
map.clear();
console.log(map.size)

