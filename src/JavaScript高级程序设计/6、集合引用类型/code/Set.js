let set = new Set();

let obj = {
    name: 10
}
console.log(set.size);
set.add(obj);
console.log(set.size);

console.log(set.has(obj));

set.forEach((value, value2, set1) => {
    console.log(value)
})

console.log(set.values())
console.log(set.entries())
console.log(set.keys())

set.delete(obj);
set.clear();


console.log(Reflect.ownKeys(WeakSet.prototype))
