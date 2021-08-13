`ECMA-262`将对象定义为一组属性的无序集合，没有特定顺序的值。可以将其看成一张`[键(string)值对]`的散列表。

# 对象

创建对象有2种写法：一种是`new`一个实例，一种是字面量。

```javascript
// 字面量
let obj = {
    name: "lisan",
    age: 20,
    phone: undefined, // 一般不要在obj外部新建属性。直接在写字面量时，将可能的值赋值为undefined。
    getPhone() {
        return this.phone;
    },
};

obj.phone = 911;

console.log(obj.getPhone()); // 911

```

## 属性的类型

属性分为：数据属性和访问器属性。 用`Object.defineProperty()`、`Object.defineProperties()` 来设置其数据属性或访问器属性。  
用`Object.getOwnPropertyDescriptor`、`Object.getOwnPropertyDescriptors()` 来读取其数据属性或访问器属性。

* 数据属性  
  数据属性包含一个保存数据值的位置，值会从这个地方来读取和进行写入。

```javascript
let obj = {
    name: undefined,
    age: undefined
}

Object.defineProperty(obj, "name", {
    value: 10,
    configurable: true,
    writable: true,
    enumerable: true
});

console.log(Object.getOwnPropertyDescriptor(obj, "name"));

```

* 访问器属性  
  访问器属性包含一个`getter`和`setter`函数。

```javascript
let obj = {
    name: undefined,
    age: undefined
}

let objAge = "objAge";
Object.defineProperty(obj, "age", {
    configurable: true,
    enumerable: true,
    get() {
        console.log("getter");
        return objAge;
    },
    set(v) {
        console.log(v);
        objAge = v;
    }
});

console.log(obj.age);

obj.age = "set obj.age";

```

## 合并属性

合并2个对象，把源对象的属性复制到目标对象上。  
`Object.assign()`可以合并对象。将源对象可枚举和自有的属性复制到目标对象，这个方法会使用源对象上的`[[Get]]`取得属性值，用目标对象上的`[[Set]]`设置属性值。

```javascript
// get|set 对
let assignVal = "val"
const obj1 = {
    a: 10,
    set c(v) {
        console.log("c set obj1")
        assignVal = v;
    },
    get c() {
        console.log("c get obj1")
        return undefined;
    }

};

const obj2 = {
    b: 20,

    set c(v) {
        console.log("c set obj2")
        return undefined;
    },
    get c() {
        console.log("c get obj2")
        return assignVal;
    }
}

Object.assign(obj2, obj1);
```

## 对象标识级及相等判定

ECMAScript6新增了`Object.is()`,这个方法是对 `===` 存在的问题进行解决。

* `+0 === -0` 按逻辑来说`+0!==-0`的。
* `NaN !== NaN` 按逻辑来说 `NaN === NaN`的。

```javascript

function ObIs(a, b) {
    if (a === b) {
        return a !== 0 || (1 / a === 1 / b); // 1/+0为正无穷 !== 1/-0为负无穷
    } else {
        return a !== a && b !== b;
    }
}

console.log(ObIs(NaN, NaN)); // true
console.log(ObIs(-0, +0)); // false

```

## 增强的对象语法

可简写属性和方法而且可以在字面量中写可计算的属性。  
**可计算属性可以是表达式。**

```javascript

let computedName = "computedNameVal"
const computed = {
    // 简写
    computedName,
    computedNameFun() {

    },
    // 可计算属性
    [computedName]: "",
    ["get" + computedName]() {  // 表达式
        return this[computedName]
    },
}

console.log(Reflect.ownKeys(computed)) // ['computedName','computedNameFun','computedNameVal','getcomputedNameVal' ]

```

## 对象的解构

简单来说就是对象的属性解构为变量。  
对象解构一般用于对函数参数的解构。

```javascript
const {
    keys, // const keys = Object.keys;
    assign: Assign, // const Assign = Object.assign;
    // 属于嵌套解构
    prototype: {toString: toStr}, // const toStr = Object.prototype.toString;
    myVal = "默认值" // const myVal = Object.myVal || ”默认值“
} = Object;

console.log(keys); // [Function: keys]
console.log(Assign); // [Function: assign]
console.log(toStr); // [Function: toString]
console.log(myVal); // 默认值


// 一般用于函数参数的解构
function result(
    name,
    // 解构
    {obj: obj, array: {length: len = 20}},
    // 设置默认值
    other = "other") {
    console.log(arguments)
}

result("name", {obj: "obj", array: {length: 10}}, "other")

```

# 创建对象

封装一套逻辑代码，根据不同的参数来设置不同的属性值，大大提供了代码的复用性。

## 工厂模式

通过函数根据不同的参数，来返回一个对象。

```javascript
const FactoryType = Symbol("factoryType");

function factory(name, age) {
    return {
        name,
        age,
        getName() {
            return this.name
        },
        $type: FactoryType
    }
}

let f1 = factory("lisa", 21);
let f2 = factory("lisa", 21);

console.log(f1.$type === f2.$type);
console.log(f1.$type === FactoryType);
```

只是对逻辑代码进行了一个基础的封装，可以创建多个类似的对象。简单粗暴有效。  
不过这种方式不能判断创建的对象是什么类型的。从根本上来讲还是创建的一个`Object`类型。  
而且从根本上来其中定义的方法没有复用性，每次执行函数都会重建方法。  
不过我们也可以在返回对象中加一个标记如`$type`来对其进行标识。不过不能通过`instanceof`对其类型进行判断。

## 构造函数模式与原型模式组合

在ECMAScript5中一般使用构造函数模式与原型模式组合来自定义构造函数。

* 构造函数：可以通过`new`操作符来得到一个对应的实例对象。如`Object`、`Array`。  
  从逻辑上来看构造函数模式与工厂函数没有很大的区别。将`new`对象放到了外部，多了一个`this`的概念。  
  构造函数模式是为了解决工厂模式无法通过`instanceof`来判断对象类型的问题。

* 原型模式实际上就是在`prototype`上增加函数和方法。解决了构造函数模式函数复用的问题。

`instanceof`可以判断指定类型是否为实例原型链上存在的构造函数。

```javascript
function Person(name, age) { // 构造函数中定义属性
    this.name = name;
    this.age = age;
}

Person.prototype.getName = function () { // 原型模式定义方法
    return this.name
}
console.log(Person.prototype.constructor);

let p1 = new Person("lisa", 21)
let p2 = new Person("lusa", 22)
console.log(p1.constructor);
console.log(p1 instanceof Person);

```

### 理解`new`

若`Person`按照函数式调用。`this`将指向全局作用域`global`。  
`new`的作用就是先`new Object()`，再将这个对象的内部的原型通过`__proto__`指向`Person`函数的原型，最后这`this`绑定到这个对象。   
理解了`new`做了什么事情，基本就对原型链有了一个初步的认识。

```javascript
// 直接调用函数 this指向了 global 
Person("glo", 22);
console.log(global.name); // glo
Person("glo2", 22);
console.log(global.name); // glo2
// new 操作的实质。this 指向了被原型链被修改的 {} 
let obj = {};
obj.__proto__ = Person.prototype;
Person.call(obj, "glo2", 22)
console.log(obj instanceof Person);

```

### 原型的理解：

任何实例都存在一个`prototype`属性。这个`prototype` 就是`Object`的一个实例。有一个例外就是 `Object.prototype = new Null()`。 虽然没有`Null`
这个类。不过我们可以通过代码来得到一个类似`Null`
的类。可以使用这个`Null`类在一些逻辑中避免`Object.prototype`产生影响。  
实例属性的增加和修改也都不会影响到`prototype`上的属性。任何属性的修改和新增都是在实例对象上进行的，或覆盖`prototype`的同名属性。  
`prototype`上有的属性，实例一定可以获取到；但实例上新增的属性，`prototype`一定获取不到。

```javascript
function Null() {
}

Null.prototype = Object.create(null);
Null.prototype.constructor = Null;
const getNull = new Null(); // 得到一个完全纯净的对象。
console.log(getNull.toString); // undefined
console.log(getNull.valueOf); // undefined

```

### 区分原型和实例属性

* 使用`hasOwnProperty()`方法 判断一个对象的实例上的是否存在该属性。
* `in`操作符 可以通过它来判断实例是否可访问到对应的属性。
* `Object.getOwnPropertyNames()` 和 `Object.getOwnPropertySymbols()`
  获取对象本身的所有属性。

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.name = "default";
Person.prototype.main = "main";
let p1 = new Person("p1");
p1.age = 10;
let p2 = new Person("p2");
p2.job = "job";
console.log(Person.prototype.hasOwnProperty("name"), p1.hasOwnProperty("name"));
console.log(Person.prototype.hasOwnProperty("main"), p1.hasOwnProperty("main"));
console.log(Person.prototype.hasOwnProperty("age"), p1.hasOwnProperty("age"));
console.log(Person.prototype.hasOwnProperty("job"), p2.hasOwnProperty("job"));

console.log("main" in p1);
console.log("main" in p2);

console.log(Object.getOwnPropertyNames(p1));
console.log(Object.getOwnPropertyNames(p2));
```

### 属性枚举顺序

* `for-in`和`Object.keys()`
  枚举顺序不确定。
* `Object.getOwnPropertyNames()` 、 `Object.getOwnPropertySymbols()`和`Object.assign()`
  枚举顺序是确定的。

### 对象的迭代

`Object.keys()` 获取其键名的迭代器。  
`Object.values()` 获取其值的迭代器。  
`Object.enties()` 获取其键名和值的迭代器。

# 继承

根据`JavaScript`提供的语法和语言特性，可以有各式的继承方案。  
继承主要涉及到原型链的问题，理解了原型链，其他的继承方案都可以被理解。

## 原型链

`__proto__` 是一个实例的内部属性`[[Prototype]]`。 `__proto__`是一个兼容性的，它是对象所独有的，函数也是对象。     
也可以通过`Object.setPrototypeOf()`、`Object.getPrototypeOf()`来对`[[Prototype]]`进行修改和读取。

### 原型链图：

原型链主要就是看实例的`__proto__`指向关系。

```javascript
// 继承
function One() {
    this.one = true;
}

function Two() {
    this.two = true;
}

let obj = {};
// 改变__proto__ 指向
//  class Two extends One {}
obj.__proto__ = Two.prototype; // Two.prototype 指向 Object.prototype的 
Two.prototype.__proto__ = One.prototype;
// 开始运行逻辑
One.call(obj); // 走一遍One中实现逻辑
Two.call(obj); // 走一遍Two中的逻辑

console.log(obj instanceof One);
console.log(obj instanceof Two);

// {}[__proto__] -> Two.prototype[__proto__] ->One.prototype[__proto__]->Object.prototype[__proto__]->null
console.log(obj.__proto__ === Two.prototype);
console.log(Two.prototype.__proto__ === One.prototype);
console.log(One.prototype.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__ === null);
/**
 Function:{
   __proto__   这个 __proto__ 指向了 Function.prototype
    prototype   // prototype 本质上就是一个  new Object()
            .constructor  // 这个永远指向 prototype 所在的函数
            .__proto__ //  __proto__ --->  Object.prototype 
}

 One: {
    __proto__    函数的__proto__永远 指向 Function.prototype包括Object函数
    prototype.__proto__  // __proto__ --->   Object.prototype   
}


 Two: {
     prototype.__proto__  // __proto__ --->  Object.prototype 改变为 One.prototype [原型链的改变]
}

 Object {
   prototype.__proto__ // __proto__ --->  null
}

 总的来说就是
 1.从实例开始看原型链
 实例[.__proto__]  ----> 实例对应的类.protype[.__proto__] -----> Object.prototype[.__proto__] ---> null

 2. 从原型开始看原型链
 Two.prototype[.__proto__]  ---->  Object.prototype[.__proto__ ]  ---> null
 |
 在这块加 ----> One.prototype[.__proto__]
 3. new的实现
 {}[.__proto__] ---->  Two.prototype[.__proto__] ----> 2
 */                      
```

### `Object.create()`

通过使用`__proto__`可以更加直观的看到原型直接的关系，不过直接对原型链的操作可能会产生代码性能。建议使用其它方案如`Object.create()`。

```javascript
function A() {
}

function B() {
}

B.prototype = Object.create(A.prototype); // new A()
B.prototype.constructor = B; // 把构造函数再改回来。
const obj = Object.create(B.prototype); // new B()
A.call(obj);
B.call(obj);
console.log(obj instanceof A);
console.log(obj instanceof B);

console.log(obj.__proto__ === B.prototype)
console.log(B.prototype.__proto__ === A.prototype)


// Object.create 的执行过程
function objectCreate(o) {
    function F() {
    }

    F.prototype = o
    return new F()
}
```

# 类

`ECMAScript`引入了类，背后其实是原型和构造函数的概念，属于一个语法糖解构。  
极大的方便了构造函数的定义和继承的实现。 `class`还可以解决想是`Date`类的继承问题。  
与函数相比较`class`没有函数提升。class拥有块级作用域。

`class`相关：

* `constructor` 相当于构造函数。
* 可以定义原型属性和方法。
* 使用`static`来定义静态属性和方法。
* 可以使用`#`私有化标记来实现私有化，在类外部无法访问。
* 可以定义`async`函数和生成器。
* 可以定义一个`get|set`对的属性。
* `class`中还支持计算属性。

`class`大大降低了定义构造函数的复杂度，提高了封装性，便于代码的阅读。

## 定义类

```javascript
const computed = Symbol("")
const computedFun = Symbol("")

class Person {
    [computed] = "computedVal";

    [computedFun]() {
        console.log("computedFun")
    }

    name = ""; // 原型属性 Person.prototype.name
    #age_$ = 0; // 加#私有属性
    constructor() { // function Person(){}
        console.log(new.target) //  new.target === Person
    } // 构造函数
    sayName() { // Person.prototype.sayName = function(){}
    } // 原型函数
    #init() {
    }  // 私有原型函数

    static staticFunc() { // 静态函数 Person.staticFunc = function(){}
    }

    static
    #json = ""; // 静态属性
    * gen() { // 生成器
        yield "a";
        yield "b";
    }

    async asyncFunc() { // async函数
        try {
            return 1
        } catch (e) {
            return 2
        }
    }

    set age(val) {
        this.#age_$ = val
    }

    get age() {
        return this.#age_$;
    }

    getAge() {
        return this.#age_$;
    }

}

console.log(Person["json"]); // 无法访问私有变量
console.log(Person["#json"]); // 加上#标记也 无法访问私有属性

let p = new Person();
console.log(p[computed]);
p[computedFun]();
p.age = 10;
console.log(p.getAge());
p.asyncFunc().then(value => {
    console.log(value)
})
for (const item of p.gen()) {
    console.log(item)
}
```


## 继承

`ES6`支持单类继承，使用`extends`关键字来继承。`super`关键字只能获取父类原型方法。  
`class`为继承内置引用类（`Date`、`Array`等）进行了加强。不过在`ES6`转为`ES5`后以及会出问题。

```javascript
class A {
    name = "name";

    constructor() {
    }

    sayName() {
        return this.name
    }
}

class B extends A { // B.prototype.__proto__ = A.prototype
    name = "dd"

    constructor() {
        super(); // A.call(this,...args)
    }

    // 覆盖sayName
    sayName() {
        return super.name + super.sayName();
    }

}

let b = new B();

console.log(b.sayName())

```



### `new.target`
在类和构造函数中可以使用`new.target`来判断实例化的是哪个类。可以对父类进行限制，只能实例化子类，不能实例化父类。





