`ES6`新增的代理和反射为开发者提供了拦截并向基本操作嵌入额外行为的能力，为对象定义一个关联的代理抽象对象，通过操作这个对象来对控制被代理的对象。

# 代理基础

代理是目标对象的抽象。代理类似`C++`指针，因为它可以作为目标对象的替身，但又完全独立于目标对象，目标对象既可以被直接操作，也可以通过代理来操作。

## 创建代理

代理是使用`Proxy`来创建的，`Proxy`接受2个参数：目标对象和处理程序对象。

### 定义捕获器

使用代理的主要目的是可以定义捕获器，捕获器就是在处理程序对象中定义的基本操作的拦截器，拦截对应的操作。

```javascript
const target = {
  foo: "123"
}
const proxy = new Proxy(target, {
  set(target, p, value, receiver) {
    console.log(receiver, "set")
    target[p] = value
  },
})

proxy.foo = 10

```

### 捕获器参数和反射`API`

所有的捕获器都可以访问相应的参数，基于这些参数可以重建被捕获方法的原始行为。 所有的捕获器都可以基于自己的参数重建原始操作，实际开发中开发者并不需要手动重建原始行为，而是可以通过调用全局Reflect对象上的同名方法来重建。

```javascript

const target = {
  foo: "123"
}
const proxy = new Proxy(target, {
  set(target, p, value, receiver) {
    console.log(receiver, "Reflect.set")
    Reflect.set(target, p, value, receiver)
  },
})

proxy.foo = 10

```

### 捕获器不变式

使用捕获器几乎可以改变所有基本方法的行为，但也存在一些限制，如目标对象有一个不可配置且不可写的数据属性。

```javascript

try {
  const target = {}
  Object.defineProperty(target, "foo", {
    configurable: false,
    writable: false,
    value: "bar"
  })
  const proxy = new Proxy(target, {
    get(target, p, value, receiver) {
      return "baz"
    },
  })

  console.log(proxy.foo)
} catch (e) {
  console.error(e) //TypeError
}

```

### 可撤销代理

中断代理对象与目标对象之间的联系，对于使用`new Proxy()`创建的普通代理来说，这种联系会在代理对象的声明周期内一直持续存在。

`Proxy`也暴露了`revocable()`方法，这个方法支持撤销代理对象与目标对象的关联。撤销代理的操作是不可逆的，而且撤销函数是幂等的，撤销之后再调用代理会抛出`TypeError`。

```javascript

const target = {
  foo: "10"
}

const {proxy, revoke} = Proxy.revocable(target, {
  get(target, p, receiver) {
    return "get"
  }
})

console.log(proxy.foo)

revoke()

try {
  console.log(proxy.foo)
} catch (e) {
  console.error(e)
}

```

### 实用反射`API`

某些清况下优先使用反射`API`

* 反射`API`与对象`API`
  + 反射`API`并不仅限于捕获处理程序；
  + 大多数反射`API`方法在`Object`类型上有对应的方法。
* 状态标记  
  很多反射方法返回一个标记操作是否成功的布尔值。
  + `Reflect.defineProperty()`
  + `Reflect.preventExtensions()`
  + `Reflect.setPrototypeOf()`
  + `Reflect.set()`
  + `Reflect.deleteProperty()`
* 一等函数代理操作符
  + `Reflect.get()` 代替对象属性访问操作符
  + `Reflect.set()` 代替 `=` 赋值操作
  + `Reflect.has()` 代替 `in` 操作符或 `with()`
  + `Reflect.deleteProperty()` 代替`delete`操作符
  + `Reflect.construct()` 代替 `new` 操作符
* 安全地应用函数
  + `Reflect.apply()` 可以代替 `Function.prototype.apply.call()`

### 代理另一个代理

代理可以拦截反射`API`的操作，可以在一个目标对象上构建多层拦截网。

### 代理的问题和不足

在某些情况下，代理也不能与现在的`ECMAScript`机制很好地协同。

* 代理中的`this`  
  `this`指向调用这个方法的对象。但是当目标对象依赖于对象标识符，就会碰到问题。

```javascript

const vm = new WeakMap()

class User {
  constructor(id) {
    vm.set(this, id);
  }

  set id(id) {
    vm.set(this, id)
  }

  get id() {
    return vm.get(this)
  }
}

const user = new User(123);
console.log(user.id); // 123
const proxy = new Proxy(user, {});
console.log(proxy.id); //undefined

// 解决
const ProxyUser = new Proxy(User, {});
const user2 = new ProxyUser(123);
console.log(user2.id) // 123

```

* 代理和内部槽位  
  代理与内置引用类型的实例通常可以很好地协同，但有一些内置类型可能会依赖代理无法控制的机制， 导致在代理上调用某些方法出错。（如`Date`）  
  `Date`类型方法依赖`this`值上的内部槽位`[[NumberDate]]`，代理对象上不存在这个内部槽位，而且这个内部槽位也不能通过普通的`get`和`set`操作访问到。

```javascript

let date = new Date()

const proxy = new Proxy(date, {});
console.log(proxy instanceof Date)
try {
  console.log(proxy.getDate())
} catch (e) {
  console.log(e.message)
}
```

## 内部捕获器与反射方法

代理可以捕获13种不同的基本操作。

### `get()`

`get()`捕获器会在获取属性值的操作中被调用，对应的反射`API`方法为`Reflect.get()`。

### `set()`

`set()`捕获器会在设置属性值的操作中被调用，对应的反射`API`方法为`Reflect.set()`。

### `has()`

`has()`捕获器会在`in`操作符中被调用，对应的反射`API`方法为`Reflect.has()`。

### `defineProperty()`

`defineProperty()`捕获器会在`Object.defineProperty()`中被调用，对应的反射`API`方法为`Reflect.defineProperty()`。

### `getOwnPropertyDescriptor()`

`getOwnPropertyDescriptor()`捕获器会在`Object.getOwnPropertyDescriptor()`中被调用，对应的反射`API`
方法为`Reflect.getOwnPropertyDescriptor()`。

### `deleteProperty()`

`deleteProperty()`捕获器会在`delete`操作符中被调用，对应的反射`API`方法为`Reflect.deleteProperty()`。

### `ownKeys()`

`ownKeys()`捕获器会在`Object.keys()`及其类似方法中被调用，对应的反射`API`方法为`Reflect.ownKeys()`。

### `getPrototypeOf()`

`getPrototypeOf()`捕获器会在`Object.getPrototypeOf()`中被调用，对应的反射`API`方法为`Reflect.getPrototypeOf()`。

### `setPrototypeOf()`

`setPrototypeOf()`捕获器会在`Object.setPrototypeOf()`中被调用，对应的反射`API`方法为`Reflect.setPrototypeOf()`。

### `isExtensible()`

`isExtensible()`捕获器会在`Object.isExtensible()`中被调用，对应的反射`API`方法为`Reflect.isExtensible()`。

### `preventExtensible()`

`preventExtensible()`捕获器会在`Object.preventExtensible()`中被调用，对应的反射`API`方法为`Reflect.preventExtensible()`。

### `apply()`

`apply()`捕获器会在调用函数时被调用，对应的反射`API`方法为`Reflect.apply()`。

### `construct()`

`construct()`捕获器会在`new`操作符中被调用，对应的反射`API`方法为`Reflect.construct()`。

## 代理模式

### 跟踪属性访问

通过捕获`get`、`set`、`has`等操作，可以监控这个对象在何处被访问过。

```javascript
const user = {
  name: "10"
}

const proxy = new Proxy(user, {
  get(target, p, receiver) {
    console.log(`get ${p}`)
    return Reflect.get(...arguments);
  },
  set(target, p, value, receiver) {
    console.log(`set ${p} = ${value}`)
    return Reflect.set(...arguments);
  }
})

proxy.name; // get name
proxy.name = "ddd"; // set name = ddd
```

### 隐藏属性

代理的内部实现对外部代码是不可见的，因此要隐藏目标对象上的属性也是轻而易举的。

```javascript

const hidden = ["foo", "goo"]
const user = {
  name: "10",
  foo: "foo",
  goo: "goo"
}

const proxy = new Proxy(user, {
  get(target, p, receiver) {
    if (hidden.includes(p)) {
      return undefined
    }
    return Reflect.get(...arguments);
  },
  has(target, p) {
    if (hidden.includes(p)) {
      return false
    }
    return Reflect.has(...arguments)
  }
})

console.log(proxy.foo); // undefined
console.log(proxy.goo);  // undefined
console.log(proxy.name); // 10

console.log("foo" in proxy); // false
console.log("goo" in proxy); // false
console.log("name" in proxy); // true
```

### 属性验证

在`set`捕获器中决定是否拒绝赋值。

```javascript

const Methods = ["POST", "GET"];
const req = {
  method: "post"
};
const proxy = new Proxy(req, {
  set(target, p, value, receiver) {
    if (p === "method" && typeof value === "string" && !Methods.includes(value.toUpperCase())) {
      return undefined
    }
    return Reflect.set(...arguments)
  }
});

proxy.method = "put";
console.log(proxy.method); // post
proxy.method = "get";
console.log(proxy.method); // get
```

### 函数和构造函数参数校验

对函数和构造函数参数进行校验。

```javascript

function Add(a, b) {
  this.sum = a + b;
  return a + b;
}


const proxy = new Proxy(Add, {
  apply(target, thisArg, argArray) {
    if (argArray.length !== 2) {
      throw "参数为2个"
    }
    for (const item of argArray) {
      if (typeof item !== "number") {
        throw "参数为2个number"
      }
    }
    return Reflect.apply(...arguments)
  },
  construct(target, argArray, newTarget) {
    if (argArray.length !== 2) {
      throw "参数为2个"
    }
    for (const item of argArray) {
      if (typeof item !== "number") {
        throw "参数为2个number"
      }
    }
    return Reflect.construct(...arguments)
  }
});

console.log(proxy(1, 2)); // 3

try {
  console.log(proxy(1, "2")) // undefined
} catch (e) {
  console.log(e)
}


let p1 = new proxy(1, 2);
console.log(p1.sum);

try {
  let p1 = new proxy(1, "2");
  console.log(p1.sum);
} catch (e) {
  console.log(e)
}
```

### 数据绑定与可观察对象

通过代理可以把运行时互不相关的部分联系到一起。这样就可以实现各种模式，从而让不同的代码互相操作。

* 将被代理的类绑定到一个全局实例集合，让所有的实例都被添加带这个集合中。

```javascript
const userList = [];

class User {
  constructor(name) {
    this.name = name
  }
}

const UserProxy = new Proxy(User, {
  construct(target, argArray, newTarget) {
    const newUser = Reflect.construct(...arguments);
    userList.push(newUser);
    return newUser;
  }
});
new UserProxy("a");
new UserProxy("b");
new UserProxy("c");
console.log(userList);
```

* 把集合绑定到一个事件分派程序，每次插入新实例时都会发送消息。

```javascript
const userList = [];

function emit(newVal) {
  console.log(newVal)
}

const proxy = new Proxy(userList, {
  set(target, p, value, receiver) {
    const result = Reflect.set(...arguments);
    if (result && parseInt(p) >= 0) {
      emit(Reflect.get(target, p, receiver))
    }
    return result
  }
});

proxy.push("John")
proxy.push("JaCob")
```
