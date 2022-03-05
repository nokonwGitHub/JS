// let obj = new Object();
let obj = {
    val: 10
};

console.log(obj.constructor)
console.log(obj.hasOwnProperty("val"))
console.log(obj.isPrototypeOf(Object.prototype))
console.log(obj.propertyIsEnumerable("val"))
console.log(obj.toLocaleString())
console.log(obj.toString())
console.log(obj.valueOf())
