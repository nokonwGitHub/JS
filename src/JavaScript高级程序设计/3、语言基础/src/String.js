

// 自定义标签函数
function simpleTag(strings, ...values) {
    console.log(strings)
    console.log(values)
    return "simpleTag"
}

let useSimpleTag = simpleTag`${1} + ${2} = ${1 + 2}`

console.log(useSimpleTag)

// 原始字符串

console.log('\u00A9')
console.log('\\u00A9')
console.log(String.raw`\u00A9`)
