// Number
console.log(Infinity)
console.log(-Infinity)
console.log(Number.MAX_VALUE)
console.log(Number.MIN_VALUE)
console.log(Number.MAX_SAFE_INTEGER)
console.log(Number.NaN)
console.log(Number.EPSILON)
console.log(Number.POSITIVE_INFINITY)
// Number 转化
console.log(Number(false))
console.log(Number(""))
console.log(Number("1"))
console.log(Number("1s"))
console.log(Number({})) // {}.valueOf->object
console.log(Number(new Date())) // Date.prototype.valueOf() -> number
console.log(Number([])) // [].toString() -> ""
console.log(Number([10])) // [].toString() -> "10"
console.log(Number([10, 11]))// [].toString() -> "[10, 11]"

// parseInt parseFloat
console.log(parseInt("0x10"))
console.log(parseInt("10", 16))
console.log(parseInt("10", 8))
console.log(parseInt("10", 2))
console.log(parseInt("10"))
console.log(parseInt("10sss"))
console.log(parseInt("-10sss"))

console.log(parseFloat("0.10"))
console.log(parseFloat(".10"))
console.log(parseFloat("10"))
console.log(parseFloat("0010.000"))
