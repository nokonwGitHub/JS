let big = 10n;

let big2 = BigInt(20);

console.log(big); // 10n
console.log(big2); // 20n
console.log(typeof big); // bigint

try {
    let t = 10n + 20;
} catch {
    console.error("BigInt 不能和 Number运算")
}
try {
    let t = Math.pow(10n, 10n);
} catch {
    console.error("BigInt用于Math方法")
}


console.log(BigInt.asIntN(10, 20n))


