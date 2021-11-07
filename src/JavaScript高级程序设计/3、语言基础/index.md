任何语言的核心都是这个语言在基本层面上是如何工作的。语法、操作符、数据类型、内置功能。

`JavaScript`的语法实现都是根据`ECMAScript`标准来的

# 语法

`ECMAScript`借鉴了`C`已经类`C`的语法。其实这个语言的语法都是抄来抄去的，换的可能只是写法或关键字，当然也有一些语言自己创建的语法，简化了一些复杂的操作。

## 区分大小写

C和类C语言都是区分大小写的。

## 标识符

标识符就是变量、函数、属性、函数参数的名称。组成：

* 第一个字符必须是字母、下划线、美元符号。
* 其他字符可以是字母、下划线、美元符、数字。  
  扩展 [桂英编程](桂英编程.md)

规范：驼峰大小写 或 下划线命名等 （`myName`、`my_name`)

## 注释

``` javascript
// 单行

/* 
 * 多行
 */
```

## 严格模式

`"use strict";`  
属于预处理命令

## 语句

```javascript
let a1 = 10
let a2 = 10; // 分号有没有，看代码规范要求

if (a2) {
    // 代码块  {}
}

```

# 关键字和保留字

`ECMA-262`保留了一组关键字，都是有特殊用途。

关键字

``` text
break、do、in、typeof、case、else、instanceof、var、catch、export、new、void
class  extends、return、while、const、finally、super、with、continue、for
switch、yield  、debugger、function、this、default、if、throw、delete、import
try 
``` 

始终保留  
`enum`

严格模式保留    
`implements、package、public、interface、protected、static、let、private  `

模块代码保留  
`await`

**最好不要用这些关键字和保留字做标识符和属性名。确保兼容未来和过去的JavaScript**

# 变量

`ECMAScript`变量是松散类型的，变量无类型限制，3个关键字声明变量 `var`、`let`、`const`。最好不用`var`，`var`有变量声明提升且无块级作用域。

## var声明

`var name = value;`

`var`声明提升且无块级作用域。  
而且全局`var`会变成`window`的属性。

## `let`声明

`let`比较`var`：无变量声明提升、有块级作用域。不会变成`window`的属性  
`let`拥有块级作用域会解决一些无块级作用域导致的问题。

暂时性死区：`let`无变量声明提升

## `const`声明

声明一个常量。其他和`let`一致。

## 声明风格及其最佳实践

* 不用`var`
* `const`优先、`let`次之

# 数据类型

ECMAScript有7种简单数据类型（原始类型）`Undefined`、`Null`、`Number`、`String`、`Boolean`、`Symbol`、`BigInt`  
一种复杂数据类型`Object`，无序名值对的集合。

## `typeof`操作符

返回字符串
`undefined`、`boolean`、`string`、`number`、`object`、`function`、`symbol`、`bigint`

严格来说函数在JavaScript中也算是对象。函数第一公民故和object区分开。

## `Undefined`类型

`Undefined`类型，就一个值`undefined`，在声明时未赋值默认赋值为`undefined`。

## `Null`类型

`Undefined`类型，就一个值`null`。  
`null`表示一个空对象指针。所以 `typeof null === "object"`  
由于`undefined`是`null`派生的所以  `null==undefined`

## `Boolean`类型

2个值  `true`、`false`

转化为`false`的

* 空字符串`''`
* `0`和`NaN`
* `null`
* `undefined`

## `Number`类型

`Number`使用了`IEEE 754`格式表示整数和浮点值。

特殊的值

* `Infinity`、`-Infinity`    无穷
* `MAX_VALUE`、`MIN_VALUE`   大小值
* `MAX_SAFE_INTEGER`、`MIN_SAFE_INTEGER` 安全值范围
* `NAN`   非数值
* `EPSILON` 能够接受的误差范围

值转换：三个函数  `Number`、`paresInt`、`parseFloat`

* `Number`转化规则
    + `true`->`1`、`false`->`0`
    + `null`->`0`
    + `undefined`->`0`
    + `string`->含非数字的字符串->`NaN`，空字符串->`0`
    + `object`->调用`valueOf()`的返回值进行转化，若为`NaN`再调用`toString()` 进行转化。

* `parseInt`、`parseFloat`转化规则  
  解决`Number`转化字符串的问题。
    + 数字开头的字符串 +` parseInt`的第二个参数表示字符串中数值的进制数， `parseFloat`只转化10进制

## `String`类型

`String`是0或多个16位的`Unicode`字符序列。可以用双引号、单引号、反撇号包起来。

```javascript
let str = "Hello";
let str2 = 'World';
let str3 = `${str} ${str2}!`;
```

`length`返回字符串长度，不过在遇到双字节字符串时，这个值就不准确了。

### 特点

`ECMAScript`的字符串是不可变的，一旦创建，值就不能改变，若要修改某个变量的字符串，必须先销毁原来的字符串，然后将新值字符串保存到这个变量。

### 字符串转化

* `toString() `以字符串的形式来表达其值。
    + `Number`的`toString()`接受一个参数，可以得到对应进制的字符串。

* `String()`
    + 值有`toString()`,按照`toString()`
    + `null` ->`"null"`
    + `undefined` -> `"undefined"`
* 加号操作符  
  值 `+` 一个字符串

### 模板字符串

反撇号包起来的字符串特点

* 可以直接回车表示换行
* 可以使用`${}`来插入一个JavaScript表达式。所有的插值都会转为`String`
* 可以自定义模板字面量标签函数

#### 模板字面量标签函数

* 自定义标签函数

```javascript

function simpleTag(strings, ...values) {
    console.log(strings); // [ '', ' + ', ' = ', '' ]
    console.log(values);// [ 1, 2, 3 ]
    return "simpleTag";
}

let useSimpleTag = simpleTag`${1} + ${2} = ${1 + 2}`;

console.log(useSimpleTag); // simpleTag

```

* 原始字符串

```javascript

console.log('\u00A9'); // ©
console.log('\\u00A9'); // \u00A9
console.log(String.raw`\u00A9`); // \u00A9

```

## Symbol类型

`Symbol`是ES6新增的数据类型。不能使用`new `操作符。  
其值是唯一且不可变的。  
用于创建唯一记号，主要用于非字符串的属性对向，避免了属性发生冲突。

```javascript

let symbol1 = Symbol("symbol"),
    symbol2 = Symbol("symbol");

console.log(typeof symbol1); // symbol

console.log(symbol1 === symbol2); // false

let symbolObj = {
    [symbol1]: "1",
    [symbol2]: "2"
};

console.log(symbolObj); // { [Symbol(symbol)]: '1', [Symbol(symbol)]: '2' }

```

### 全局符号注册表

在全局符号注册表中创建并重用符号。  
`Symbol.for()` 查找已有的符号，注册未有的标记。   
`Symbol.keyFor() `查询全局注册表。

```javascript

let symbol3 = Symbol("symbol.for"),
    symbol4 = Symbol.for("symbol.for"),
    symbol5 = Symbol.for("symbol.for");

console.log(symbol3 === symbol4); // false
console.log(symbol4 === symbol5); // true

console.log(Symbol.keyFor(symbol3)); // undefined
console.log(Symbol.keyFor(symbol4)); // symbol.for
console.log(Symbol.keyFor(symbol5)); // symbol.for

```

### 内置符号

* `Symbol.asyncIterator`  方法，返回一个默认的 `AsyncIterator`，在`for-await-of`中使用。表示实现异步迭代器API的函数。
* `Symbol.hasInstance`  方法，定义`instanceof`操作符的行为。
* `Symbol.isConcatSpreadable` 属性，值为一个布尔值，覆盖`Array.prototype.concat`的行为。
* `Symbol.iterator` 方法，返回对象的默认迭代器，在`for-of`使用。表示实现迭代器API的函数。
* `Symbol.match` 方法，由`String.prototype.match`的使用。
* `Symbol.replace` 方法，由`String.prototype.replace`的使用。
* `Symbol.search` 方法，由`String.prototype.search`的使用。
* `Symbol.species` 方法，用于对内置类型实例方法的返回值暴露实例化派生对象的方法，定义静态的getter方法，覆盖了新创建实例的原型定义。
* `Symbol.split` 方法，由`String.prototype.split`的使用。
* `Symbol.toPrimitive` 方法，将对象转化了原始值。
* `Symbol.toStringTag` 属性，值为简单值，由`Object.prototype.toString`的使用。
* `Symbol.unscopables` 属性，值为一个`object`，在使用`with`时阻止属性绑定到`with`。

```javascript

(async () => {
    class Test {
        constructor() {

        }

        async* [Symbol.asyncIterator]() {
            yield Promise.resolve(1);
            yield Promise.resolve(2);
            yield Promise.resolve(3);
            yield Promise.resolve(4);
        }


        * [Symbol.iterator]() {
            yield "a";
            yield "b";
            yield "c";
            yield "d";
        }

        static [Symbol.hasInstance](target) {
            return target.constructor === Object
        }

        static [Symbol.match](target) {
            return target[0] === "a"
        }

        static [Symbol.replace](target, replace) {
            return "target"
        }

        static [Symbol.search](target) {
            return "target"
        }

    }

    let test = new Test();

    console.log(test instanceof Test); // false
    console.log(test instanceof Object); // true
    for await (const item of test) {
        console.log(item);
    }
    for (const item of test) {
        console.log(item);
    }

    let arr1 = [1];
    let arr2 = [2, 3]
    console.log(arr2[Symbol.isConcatSpreadable]);
    console.log(arr1.concat(arr2)); // [1, 2, 3]
    arr2[Symbol.isConcatSpreadable] = false;
    console.log(arr1.concat(arr2)); // [1, [2, 3]]

    console.log("ab".match(Test))
    console.log("ba".match(Test))
    console.log("ba".replace(Test, "11"))
    console.log("ba".search(Test))

    // Symbol.species
    class Test2 extends Array {
        static get [Symbol.species]() {
            return Array
        }

        static main() {
            return new Test2().concat()
        }

        static [Symbol.split]() {
            return ["split"]
        }
    }

    let p = Test2.main()
    console.log(p)  // []

    console.log("0001_1000".split(Test2)) // [ 'split' ]

    class Test3 {
        constructor(val) {
            this.val = val
        }

        [Symbol.toPrimitive](target) {
            return this.val
        }

        [Symbol.toStringTag] = "MMTest3"
    }

    let test3 = new Test3("test3")
    console.log(test3 + "") // test3
    console.log(Object.prototype.toString.call(test3)) // [object MMTest3]

    let un1 = {
        a: 1,
        b: 2
    }
    un1[Symbol.unscopables] = {
        a: true
    }
    with (un1) {
        console.log(b)
        try {
            console.log(a)
        } catch (e) {
            console.log(e.toString())
        }
    }
})();

```

## `BigInt`类型

`BigInt`支持范围更大的整数值。  
`JavaScript`精确表示数值的范围有限。

可以用在一个整数后面加 `n` 的方式定义一个 `BigInt` ，或者调用函数BigInt()

```javascript

let big = 10n;

let big2 = BigInt(20);

console.log(big); // 10n
console.log(big2); // 20n
console.log(typeof big); // bigint

```

注意：

* `BigInt`不能和`Number`进行运算，相等且不全等。
* 不能用`Math`中的方法。
* `BigInt`运算的结果也为`BigInt`。

静态方法：

* `BigInt.asIntN()` 将`BigInt`值转换为一个 -2^width-1 与 2^(width-1)-1 之间的有符号整数。
* `BigInt.asUintN()`将一个 `BigInt` 值转换为 0 与 2^width-1 之间的无符号整数。

## `Object`类型

`ECMAScript`的对象是一组数据和功能的集合。对象通过`new`操作符来创建。  
`Object`也是派生其他类的基类。  
每个`Object`实例的方法、属性：

* `constructor`：构造器函数
* `hasOwnProperty`：检查属性的函数。
* `isPrototypeOf`：判断对象是否为另一个对象的原型。
* `propertyIsEnumerable`：判断属性是否可`for-in`枚举的函数。
* `toLocaleString`：对象的字符串形式。对象所在的本地化执行环境。
* `toString`：对象的字符串形式。
* `valueOf`：返回对象对应的字符串、数值或布尔值。

```javascript

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

```

# 操作符

## 一元

* 递增、递减   `++`、`--`
* 一元加减  `+`、`-`

## 位运算符

ECMAScript数值以`IEEE 754 `64位格式存储。  
位操作是先把64位转化为32位再转化为64位。  
操作时只需考虑32位整数即可。

* `~` 按位非
* `&` 按位与
* `|` 按位或
* `^` 按位异或
* `<<` 左移
* `>>` 带符号右移
* `>>>` 无符号右移

## 布尔操作符

* `!` 逻辑非
* `||` 逻辑或
* `&&` 逻辑与

## 乘性操作符

* `*` 乘法
* `/` 除法
* `%` 取余

## 指数操作符

* `**` `Math.pow`

## 加性操作符

* `+` 加
* `-` 减

## 关系操作符

* `<`
* `>`
* `>=`
* `<=`

## 相等操作符

* `==`和`!=`  存在隐性的类型转化
* `===`和`!==`  多使用全等

## 条件操作符

`条件 ? 满足执行 : 不满足执行`

## 赋值操作符

* `=`
* `+=`
* `-=`
* `*=`
* `/=`
* `%=`
* `**=`
* `<<=`
* `>>=`
* `>>>=`
* `>>>=`

## 逗号操作符

一条语句中分割多个操作。

```javascript

let a = 10, b = 10;

```

## 扩展运算符

`...` 用于展开数组和对象。

```javascript
const arr1 = [1, 2, 3, 4];
const arr2 = [0, ...arr1]; // [0].concat(arr1)
// [0,1,2,3,4]

const obj1 = {
    a: 10
};

const obj2 = {  // Object.assign(obj2,obj1)
    ...obj1,
    b: 10
}


```

## 空值合并运算符

`??` 当左侧的值为 `null` 或者 `undefined` 时，返回其右侧值，否则返回左侧值。

```javascript

const val = null ?? 'str'; // 左侧为null 或undefined 返回 右侧
```

## 可选链操作符

`?.` 类似 `&&`

```javascript

const obj = {
    name: 'A',
    other: {
        name: 'B'
    },
    fun(name) {
        console.log(name)
    },

};

const val = obj.other?.name; // B
// const val = obj.other && obj.other.name;

const val2 = obj.that?.["name"]; // undefined
// const val2 = obj.that && obj.that["name"];

obj.fun?.("fun"); // 函数

obj.other?.[console.log(10), console.log(20)]; // 表达式 

```

# 语句

流控制语句。参考了`C`和类`C`的语句。

## `if`语句

`if`语句 条件控制语句

```javascript
const a = 10;
if (a === 10) {
    //...
} else if (a === 20) {
    //... 
} else {
    //...   
}
```

## `do-while`语句

`do-while`语句 属于后测试循环语句。

```javascript
do {
    // 先运行循环语句后判断
} while (true)

```

## `while`语句

`while`语句 属于先测试循环语句。

```javascript

while (true) {
    // 先判断后运行循环语句
}
```

## `for`语句

`for`语句 属于先测试循环语句。  
`for`语句 和 `while`语句。是同样的逻辑。

```javascript

for (let i = 0; i < 10; i++) {
    // 
}

```

## `for-in`语句

`for-in`语句 一种迭代语句。可以用来遍历属性和数组下标的。  
遍历属性时属性顺序输出顺序可能会有差异。

```javascript

for (const property in window) {

}

```

## `for-of`语句

`for-of`语句 一种迭代语句。可以用来遍历属性值和数组值的。  
扩展 `for-await-of` 遍历异步迭代对象。

```javascript

for (const propertyVal of window) {

}

```

## 标签语句

标签语句用于嵌套循环。

```javascript

outFor:
    for (let i = 0; i < 10; i++) {
        innerFor:
            for (let j = 0; j < 10; j++) {
                console.log(j, i)
                if (i === 5 && j === 5) {
                    break outFor;
                }
                if (j === 2) {
                    continue innerFor;
                }
            }
    }

```

## `break、continue`语句

`break` 终止循环。
`continue` 中止本次循环，进入下一轮循环。

## `with`语句

将代码作用域设为特定对象。但是with在严格模式下不支持，且影响性能难以调试，故不用with。

## `switch`语句

`switch`语句 也是一直流控制语句。使用了全等。

`switch`语句的可以用于任意类型，且条件可以是值或表达式。

```javascript

let a = 10;
switch (a) {
    case 10:
        // ...
        break;
    case 20:
        // ...
        break;
    case 30:
    case 40:
        //....
        break;
    default:
    //...
}

switch (true || "sss") {
    case a >= 100:
        // ...
        break;
    case a <= 50 && a >= 20:
        // ...
        break;
    case a === 10:
    case a === 80:
        //....
        break;
    default:
    //...
}

```

# 函数

在ECMAScript中函数是用 `function` 声明的。

```javascript

function name(a, b) { // a,b 形参
    // ...
    return 0; // 返回值
    // return后边的代码不会被执行了。
}


name(10, 20) // 调用函数  10，20 是实参。

```



