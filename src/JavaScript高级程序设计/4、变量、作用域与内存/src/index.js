function f(obj) {
    obj.name = 10
    obj = null
    return obj
}


let m = {}


console.log(f(m))
console.log(m)
console.log(m === f(m))
