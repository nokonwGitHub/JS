`ECMAScript6`新增了两个高级特性：迭代器和生成器。

# 迭代器

循环就是迭代机制的基础。迭代会在有序集合上进行。

for循环执行迭代不理想：

* 事先要知道如何使用数据结构。
* 遍历顺序不是数据结构固有的。

## 迭代器模式

迭代器模式：一些数据结构称为可迭代对象，它们实现了正式的`Iterable`接口，可以通过迭代器消费。

### 可迭代协议

实现`Iterable`接口（可迭代协议）需要具备两种能力：

* 支持迭代的自我识别能力。
* 创建实现`Iterable`接口的对象的能力。

可迭代对象必须暴露一个属性作为默认迭代器，这个属性以`Symbol.iterable`作为键，值为一个迭代工厂函数，这个工厂函数返回一个新的迭代器。  
在实际编写代码时不需要显示的调用这个属性，接受可迭代对象的原生语言特性包括：

* `for-of`
* 数组解构
* 扩展操作符
* `Array.form()`
* 创建集合
* 创建映射
* `Promise.all()`接收由`promise`组成的可迭代对象。
* `Promise.race()`接收由`promise`组成的可迭代对象。
* `yield*`操作符。在生成器中使用。

### 迭代器协议

迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象。迭代器`API`使用`next()`方法在可迭代对象中遍历数据。每次成功都调用`next()`, 都会返回一个`IteratorResult`
对象，包含迭代器返回的下一个值。若不调用`next()`则无法知道迭代器当前的位置。

`IteratorResult`对象包含2个属性：

* `done` 是否消耗完。消耗完值为`true`。
* `value` 可迭代对象的下一个值。

```javascript

const p = [1, 2, 3, 4, 5, 6];
const iterable = p[Symbol.iterator]();

console.log(iterable.next()) // { value: 1, done: false }
console.log(iterable.next()) // { value: 2, done: false }
console.log(iterable.next()) // { value: 3, done: false }
console.log(iterable.next()) // { value: 4, done: false } 
console.log(iterable.next()) // { value: 5, done: false }
console.log(iterable.next()) // { value: 6, done: false }
console.log(iterable.next()) // { value: undefined, done: true }

```

_迭代器维护着一个指向可迭代对象的引用，迭代器会阻止垃圾回收程序回收迭代对象。_

### 自定义迭代器

`[Symbol.iterator]` 返回可以包括2个方法：

* `next()` 每次迭代返回的值。`{value:any,done:boolean}`
* `return()` 提前退出迭代时调用。 `{done: true}`

```javascript
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
                console.log("提前终止");
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

```



# 生成器
生成器是一个极为灵活的结构，拥有在一个函数块内暂停和恢复执行的能力。  
使用生成器可以由自定义迭代器和生成协程。  

## 创建一个生成器
生成器的形式是一个函数，在函数名前加一个`*`号表示它是生成器。生成器函数会返回一个生成器对象。生成器也具有`Iterator`对象。
生成器通过`yield`中断执行。
```javascript
function* gen() {
    yield 1;  // 通过yield中断执行。
    yield 2;
    yield 3;
    return 4;
}

const genVal = gen();
console.log(genVal === genVal[Symbol.iterator]()); // true
console.log(genVal.next()); // { value: 1, done: false }
console.log(genVal.next()); // { value: 2, done: false }
console.log(genVal.next()); // { value: 3, done: false }
console.log(genVal.next()); // { value: 4, done: true }
console.log(genVal.next()); // { value: undefined, done: true }

```

### `yield`实现输入输出
yield可以作为中间返回语句使用，还可以作为函数中间参数使用。  

```javascript

function* gen2(v) {
    console.log("第一个next");
    const a = yield v;       // a = 3
    console.log("第二个next");
    const b = yield 5 + a;   // b = 4
    console.log("第三个next");
    const c = yield 5 + b;   // c = 5
    console.log("第四个next");
    return c;
}

const g2 = gen2(1);
console.log("开始");
console.log(g2.next(2)) // { value: 1, done: false } 第一个next的值不会被使用。
console.log(g2.next(3)) // { value: 8, done: false }  这个值传给第一个yield
console.log(g2.next(4)) // { value: 9, done: false }  这个值传给第二个yield
console.log(g2.next(5)) // { value: 5, done: false }  这个值传给第三个yield

```

### 提前终止生成器

`return()` 和 `throw()` 都能提前终止生成器。

```javascript


function* gen3() {
    try {
        yield 1;
    } catch (e) { // e 接受 throw的参数
        console.log(e)
        return e;
    }
    yield 2;
    yield 3;
}

const g3 = gen3();

console.log(g3.next()) // { value: 1, done: false }
console.log(g3.return(10)) // { value: 10, done: true }  提前终止
console.log(g3.next()) // { value: undefined, done: true }


const g4 = gen3();

console.log(g4.next()) // { value: 1, done: false }
console.log(g4.throw(10)) // { value: 10, done: true }  提前终止
console.log(g4.next()) // { value: undefined, done: true }

```
