`ECMAScript`中的函数实际上是对象。每个函数都是`Function`的实例，而Function也有属性和方法，和其他引用类型一样。函数是对象，函数名就是指向函数对象的指针，而且不一定与函数本身紧密绑定。

# 箭头函数

`ESMAScript6`新增了箭头函数，可以视为函数的简洁写法。  
箭头函数和普通函数区别

* `argument`
* `super`
* `new.target`
* 不能用作构造函数
* 没有`prototype`属性
* `this`指向不同

# 函数名

函数名就是指向函数的指针。所以一个函数可以有多个名称。

`ECMAScript6`中所有的函数对象都会暴露一个只读属性`name`，包含关于函数的信息。

# 理解参数

`ECMAScript`函数的参数与大多数语言不同，不关心传入参数的个数，也不关心这些参数的类型，主要是因为`ECMAScript`函数的参数在内部表现为一个数组 `arguments`。

箭头函数的参数：箭头函数没有`arguments`关键字来访问参数。

# 没有重载

`ECMAScript`函数没有签名，因为参数是由包含0个或多个值的数组表示，没有函数签名，自然也没有重载。

# 默认参数值

在`ECMAScript`中没有给参数传值默认为undefined。也可以在写参数时设置默认值。

# 参数扩展和收集

使用扩展操作符(`...`)，可以简洁的操作和组合集合数据。

# 函数声明与函数表达式

函数的声明提升：  
`JavaScript`引擎在任何代码执行前，会先读取函数声明，并在执行上下文中生成函数定义；而函数表达必须等到执行到它那行，才会在执行上下文中生成函数定义。

# 函数内部

函数内部存在： `arguments`、`this`、`new.target` 三个特殊的对象。

* `arguments` 类数组对象，包含调用时传入的所有参数。
* `this` 标准函数中，`this`引用的是把函数当成方法调用上下文对象。箭头函数中 `this` 是定义其的上下文。
* `caller` 调用当前函数的函数。
* `new.target` 是否使用`new`关键字调用的`new.target`属性。

# 函数属性与方法

函数是对象，因此有属性和方法。

## 属性

* `length` 函数定义的命名参数的个数。
* `prototype` 保存引用类型所有实例方法的地方。

## 方法

* `apply()` 指定`this`调用函数。参数：函数内部`this`值、参数数组。
* `call()` 指定`this`调用函数。参数：函数内部`this`值、参数1、参数2...。
* `bind()` 指定`this`创建新的函数。参数：函数内部`this`值。

# 递归

递归函数 通常形式是一个函数通过函数名或`arguments.callee`调用自己。

```javascript
function factorial(num) {
    if (num <= 1) {
        return 1
    }
    return num * factorial(num - 1);
}

```

# 尾递归优化

`ES6`尾调用优化的关键：如果函数的逻辑允许基于尾调用将其销毁，则引擎就会那么做。

## 尾调用优化的条件

尾调用优化的条件就是确认外部栈帧真的没必要存在了。

* 代码在**严格模式**下执行。
* 外部函数的返回值是对尾调用函数的调用。
* 尾调用函数返回后不需要执行额外的逻辑。
* 尾调用函数不是引用外部函数作用域中自由变量的闭包。

# 尾调用优化的代码

主要是调整参数，将变动的值通过参数传递到递归函数。

# 闭包

引用了另一个函数作用域中变量的函数，通常在嵌套函数中实现。

## `this`对象

闭包时使用箭头函数，可以避免一些`this`产生的问题。

## 内存泄露

`IE`在`IE9`之前对`JScript`对象和`COM`对象使用了不同的垃圾回收机制，闭包在旧版`IE`中可能会导致一些问题。  
解决办法：解除对对象的引用。

# 立即调用的函数表达式

立即调用的匿名函数被称为**立即调用的函数表达式（IIFE）**。

```javascript
(function () {
    // 函数体
})();

```

# 私有变量

`JavaScript`没有私有成员的概念，所有的对象属性都是公有的。不过有`私有变量`的概念，私有变量包括函数参数、局部变量，以及函数内部定义的其他函数。

## 静态私有变量

特权方法也可以使用私有作用域定义私有变量和函数实现。

```javascript

const Person = (function () {
    let name = "";

    return class Person {
        constructor() {

        }

        getName() {
            return name;
        }

        setName(val) {
            name = val;
        }
    };
})();

let p1 = new Person();
p1.setName("name");
console.log(p1.getName());
```

## 模块模式

在一个单例对象上实现了相同的隔离和封装。`Web`开发中，使用单例对象管理程序级的信息。

```javascript
const singleton = (function () {
    const arr = [];

    return {
        getArrCount() {
            return arr.length
        },
        addItem(item) {
            arr.push(item);
        },
        write() {
            return JSON.stringify(arr);
        }
    }
})();

singleton.addItem("1");
singleton.addItem("2");
singleton.addItem("3");

console.log(singleton.getArrCount());
console.log(singleton.write());
```

## 模块增强模式

另一个利用模块模式的做法时在返回对象之前对其进行增强，适用于单例对象需要是某个特定类型的实例单又必须给它添加额外的属性或方法的场景。

```javascript

const singleton = (function () {
    let curTime = null;
    const timeArr = [];

    timeArr.now = function () {
        curTime = new Date();
        timeArr.push(curTime);
        return curTime;
    }

    timeArr.format = function (format, time = curTime) {
        if (!time) {
            return undefined;
        }
        const o = {
            "M+": time.getMonth() + 1,                 //月份
            "d+": time.getDate(),                    //日
            "h+": time.getHours(),                   //小时
            "m+": time.getMinutes(),                 //分
            "s+": time.getSeconds(),                 //秒
            "q+": Math.floor((time.getMonth() + 3) / 3), //季度
            "S": time.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (const k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return format;
    }
    timeArr.clear = function () {
        timeArr.splice(0, timeArr.length);
        curTime = null;
    }
    timeArr.getTimes = function () {
        console.log(timeArr)
    }
    timeArr.size = function () {
        return timeArr.length;
    }
    return timeArr;
})();

const t1 = singleton.now();
console.log(singleton.format("yyyy mm:ss S"));
const t2 = singleton.now();
console.log(singleton.format("yyyy mm:ss S"));
console.log(singleton.format("yyyy mm:ss S", t1));
console.log(singleton.size());
singleton.clear();
console.log(singleton.size());

```

