ECMAScript6新增了正式的期约`Promise`引用类型，支持优雅地定义和组织异步逻辑。并增加了`async`和`await`关键字定义异步函数的机制。

# 异步编程

同步行为和异步行为的对立统一是计算机科学的重要概念。异步行为是为了优化因计算量大而时间长的操作。

## 同步和异步

同步行为：对应内存中顺序执行的处理器指令。  
异步行为：类似系统中断，即当前进程外部实体可以触发代码执行。

```javascript

let x = 3;
x = x + 1;


setTimeout(() => x = x + 1, 1000);

setTimeout(() => console.log(x), 1000);

console.log(x);
```

## 以往的异步编程模式

早期的JavaScript中，只支持定义回调函数来表明异步操作完成。

```javascript

const http = require("http");
const qs = require("querystring");

const nodeAjax = function (url, options = {
    method: "get",
    success() {
    },
    fail() {
    },
    complete() {
    },
    data: {},
    query: {},
    header: {}
}) {
    options.query = options.query || "";
    if (Object.prototype.toString.call(options.query) === "[object Object]") {
        options.query = qs.encode(options.query);
    }
    const request = http.request(url + options.query.toString(), {
        method: options.method || "get",
        headers: options.header,
    }, (res) => {
        if (res.statusCode !== 200) {
            options.fail && options.fail(res);
            return undefined;
        }

        const data = [];

        res.on("data", (chunk) => data.push(chunk));
        res.on("end", (chunk) => {
            let rawDate = Buffer.concat(data).toString("utf8");
            try {
                rawDate = JSON.parse(rawDate);
            } catch {
            }
            options.success && options.success({
                data: rawDate,
                headers: res.headers
            })
        });
    });
    options.data && request.write(options.data, (err) => {
        options.fail && options.fail(err);
    });
    request.end(() => {
        options.complete && options.complete();
    });
}

nodeAjax("http://www.baidu.com", {
    success({data}) {
        console.log(data)
    }
})
```

# 期约 `Promise`

`ECMAScript6`增加了`Promise`类型。成为主导性的异步编程机制。

```javascript
const http = require("http");
const {URL} = require("url");
const qs = require("querystring");

const nodeAjax = function (url, options = {
    method: "get",
    data: {},
    query: {},
    header: {}
}) {
    options.query = options.query || "";
    if (Object.prototype.toString.call(options.query) === "[object Object]") {
        options.query = qs.encode(options.query);
    }
    // 返回一个期约实例。
    return new Promise((resolve, reject) => {
        const request = http.request(url + options.query.toString(), {
            method: options.method || "get",
            headers: options.header,
        }, (res) => {
            if (res.statusCode !== 200) {
                reject(res)
                return undefined;
            }

            const data = [];

            res.on("data", (chunk) => data.push(chunk));
            res.on("end", () => {
                let rawDate = Buffer.concat(data).toString("utf8");
                try {
                    rawDate = JSON.parse(rawDate);
                } catch {
                }
                resolve({
                    data: rawDate,
                    headers: res.headers
                })

            });
        });
        options.data && request.write(JSON.stringify(options.data), (err) => {
            err && reject(err)
        });
        request.end()
    })
}

nodeAjax("http://www.baidu.com").then(({data}) => {
    console.log(data)
});

```

## 期约的基础

### 状态机机制

期约是一个有状态的对象，有三种状态：`pending`待定、`fulfilled`兑现、`rejected`拒绝。  
`pending`是期约的初始状态，当期约可以成功兑现后状态为`fulfilled`，失败为`rejected`，期约的状态转化是不可逆的， 而且期约的状态转化在外部的`JavaScript`
不可修改和访问。期约是在内部将异步代码封装起来的，与外部得到同步代码是隔绝的。

```javascript
const p1 = new Promise(resolve => resolve("resolve"));
setTimeout(console.log, 0, p1);
const p2 = new Promise((resolve, reject) => reject());// reject必须使用catch来接受抛出的错误
setTimeout(console.log, 2, p2);
```

利用状态不可转化的机制。可以添加一个定时退出功能。

```javascript
class P {
    constructor(num = 0) {
        this.num = num;
    }

    promise() {
        return new Promise((resolve, reject) => {
            let t1 = setTimeout(() => {
                reject("reject");
                clearTimeout(t2);
            }, 1000); // 1s后强制退出

            // 正常逻辑
            let t2 = setTimeout(() => {
                resolve("resolve");
                clearTimeout(t1);
            }, this.num);
        })
    }
}

const p = new P();
p.promise().then(value => {
    console.log(value);
}).catch(err => {
    console.log(err);
});
p.num = 2000;
p.promise().then(value => {
    console.log(value);
}).catch(err => {
    console.log(err);
});

```

### 实例方法

期约的实例方法将外部同步代码与内部异步代码结合起来。

#### `Promise.prototype.then()`

为期约实例常用的方法，这个方法可以接受2个参数`onResolved`和`onRejected`2种状态的处理程序。

```javascript
const pFunc = (success) => new Promise((resolve, reject) => {
    success ? resolve("resolve") : reject("reject");
});

pFunc(true).then(value => {
    console.log(value)
});

pFunc(false).then(null, error => {
    console.log(error);
})
```

`then`方法还能够返回一个值

* 返回了同步值（没有返回值相当于返回`undefined`），那么 `then` 返回的 `Promise` 将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。
* 抛出一个错误，那么`then`返回的`Promise`将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。
* 返回一个已经是接受状态的`Promise`，那么`then`返回的`Promise`也会成为接受状态，并且将那个`Promise`的接受状态的回调函数的参数值作为该被返回的`Promise`的接受状态回调函数的参数值。
* 返回一个已经是拒绝状态的`Promise`，那么`then` 返回的`Promise`也会成为拒绝状态，并且将那个`Promise`的拒绝状态的回调函数的参数值作为该被返回的`Promise`的拒绝状态回调函数的参数值。
* 返回一个未定状态的`Promise`，那么`then`返回 `Promise` 的状态也是未定的，并且它的终态与那个`Promise`的终态相同；同时，它变为终态时调用的回调函数参数与那个`Promise`
  变为终态时的回调函数的参数是相同的。

```javascript

const pFunc = () => new Promise((resolve, reject) => {
    resolve(10);
});
pFunc().then(value => {
    return value + 20;  // 返回同步值
}).then(value => {
    console.log(value); // 30
});

pFunc().then(value => {
    return new Promise(resolve => resolve(30 + value)); // 返回一个Promise实例
}).then(value => {
    console.log(value); // 40
});
```

#### `Promise.prototype.catch()`

这个方法相当于 `Promise.prototype.then(null,onRejected)`，为期约添加拒绝处理程序。

#### `Promise.prototype.finally()`

为期约添加`onFinally`处理程序，期约转化为兑现或拒绝时都会被执行。一般来执行`onResolved`和`onRejected`时都会进行的操作。

### 静态方法

期约增加一些静态方法来方便使用

#### `Promise.resolve()`

直接实例化一个解决的期约。相当于 `new Promise((resolve, reject) => resolve())`

```javascript
Promise.resolve || (Promise.resolve = function (val = undefined) {
    return new Promise((resolve, reject) => resolve(val));
})
```

#### `Promise.reject()`

直接实例化一个拒绝的期约。相当于 `new Promise((resolve, reject) => reject())`

```javascript
Promise.reject || (Promise.reject = function (val = undefined) {
    return new Promise((resolve, reject) => reject(val));
})
```

#### `Promise.all()`

期约合成，并返回一个新的期约，其内所有的期约解决这个期约才解决。  
当包含期约拒绝时，会将第一个拒绝期约的值作为合成期约的拒绝理由，之后的拒绝期约不会影响最终期约的拒绝理由，之后的期约还时会被执行的。

```javascript
const pAll1 = Promise.all([
    Promise.resolve("one"),
    Promise.resolve("two"),
    Promise.resolve("three"),
    Promise.resolve("four")]);
pAll1.then(value => {
    console.log(value);  // [ 'one', 'two', 'three', 'four' ]
});

const pAll2 = Promise.all([
    Promise.resolve("one"),
    Promise.resolve("two"),
    Promise.reject("three"),
    Promise.resolve("four")]);

pAll2.then(value => {
    console.log(value);
}).catch(reason => {
    console.log(reason); // three
});

```

`Promise.all`的大概实现逻辑。

```javascript

Promise.all || (Promise.all = function (values = []) {
    return new Promise((resolve, reject) => {
        const len = values.length
        const allVal = new Array(len);
        values.forEach(value => {
            value.then((val, index) => {
                allVal[index] = val;
                if (allVal.length === len) {
                    resolve(allVal);
                }
            }, reject);
        });
    });
});

```

#### `Promise.race()`

静态方法返回一个期约实例，一组集合中最先解决或拒绝的期约。

```javascript
const pRace = Promise.race([
    new Promise(resolve => {
        setTimeout(resolve, 100, "one")
    }),
    new Promise(resolve => {
        setTimeout(resolve, 200, "two")
    }),
    new Promise(resolve => {
        setTimeout(resolve, 40, "three")
    }),
    new Promise((resolve, reject) => {
        setTimeout(reject, 250, "five")
    })]);

pRace.then(value => {
    console.log(value);  // three
});
```

`Promise.race`的大概实现逻辑。

```javascript

Promise.race || (Promise.race = function (values = []) {
    return new Promise((resolve, reject) => {
        values.forEach(value => {
            if (!(value instanceof Promise)) {
                value = Promise.resolve(value);
            }
            value.then(resolve, reject);
        });
    });
});

```

#### `Promise.allSettled()`

`ES2020` 引入了`Promise.allSettled()`方法，可以用来确定一组期约实例的状态。

```javascript
// #### `Promise.all()`

const pAllSettled = Promise.allSettled(
    [Promise.resolve("one"),
        Promise.resolve("two"),
        Promise.resolve("three"),
        new Promise(resolve => setTimeout(resolve, 1000, "four")),
        Promise.resolve("five"),
        Promise.reject("six")
    ]);
pAllSettled.then(value => {
    console.log(value);
});
/*
* 
* 
* */

```

```javascript
// #### `Promise.all()`

const pAllSettled = Promise.allSettled(
    [Promise.resolve("one"),
        Promise.resolve("two"),
        Promise.resolve("three"),
        new Promise(resolve => setTimeout(resolve, 1000, "four")),
        Promise.resolve("five"),
        Promise.reject("six")
    ]);
pAllSettled.then(value => {
    console.log(value);
    /*
    [ { status: 'fulfilled', value: 'one' },
      { status: 'fulfilled', value: 'two' },
      { status: 'fulfilled', value: 'three' },
      { status: 'fulfilled', value: 'five' },
      { status: 'rejected', value: 'six' },
      { status: 'fulfilled', value: 'four' }
    ]
    * */
});
```

`Promise.allSettled`的大概逻辑（与`Promise.all`类似）。

```javascript
Promise.allSettled || (Promise.allSettled = function (values = []) {
    return new Promise(resolve => {
        const allVal = [];
        values.forEach((value, index) => {
            value.then(val => {
                allVal[index] = {status: 'fulfilled', value: val};
                if (allVal.length === values.length) {
                    resolve(allVal);
                }
            }, reason => {
                allVal[index] = {status: 'rejected', value: reason};
                if (allVal.length === values.length) {
                    resolve(allVal);
                }
            });
        });
    });
});
```

#### `Promise.any()`

`Promise.any()` 接收一组期约，只要其中的一个期约成功，就返回那个已经成功的期约。

```javascript
const pAny1 = Promise.any(
    [Promise.resolve("one"),
        Promise.resolve("two"),
        Promise.resolve("three"),
        new Promise(resolve => setTimeout(resolve, 1000, "four")),
        Promise.resolve("five"),
        Promise.reject("six")
    ]);
pAny1.then(value => {
    console.log(value); // one
});


const pAny2 = Promise.any(
    [Promise.reject("one"),
        Promise.reject("two"),
        Promise.reject("three"),
        new Promise((resolve, reject) => setTimeout(reject, 1000, "four")),
        Promise.reject("five"),
        Promise.reject("six")
    ]);
pAny2.then(value => {
    console.log(value)
}).catch(reason => {
    console.log(reason); // [AggregateError: All promises were rejected]
});

```

`Promise.any`的大概逻辑。

```javascript
Promise.any || (Promise.any = function (values = []) {
    return new Promise((resolve, reject) => Promise.allSettled(values).then(allVal => {
            for (const {status, value} of allVal) {
                if (status === "fulfilled") {
                    return resolve(value);
                }
            }
            reject("[AggregateError: All promises were rejected]");
        })
    )
});
```

## 期约扩展

### 期约取消

程序正在处理过程中，程序却不需要其结果，这个时候就需要取消期约。

```javascript
class CancelPromise extends Promise {
    #timer = null;

    constructor(executor, delay = 0) {
        let timer = null;
        super((resolve, reject) =>
            executor(value => timer = setTimeout(resolve, delay, value),
                error => timer = setTimeout(reject, delay, error)
            )
        );
        this.#timer = timer
    }

    clear() {
        clearTimeout(this.#timer)
    }
}

let c1 = new CancelPromise((resolve, reject) => {
    resolve(20);
}, 1000);

c1.then(value => {
    console.log(value); // 20
});

c1.clear(); // 取消期约
```

### 期约进度通知

监控期约的执行进度。

```javascript

class TrackablePromise extends Promise {
    constructor(executor) {
        const notifyHandlers = [];
        super((resolve, reject) =>
            executor(resolve, reject, (status) => notifyHandlers.map((handler) => handler(status)))
        );
        this.notifyHandlers = notifyHandlers;
    }

    notify(notifyHandler) {
        this.notifyHandlers.push(notifyHandler)
        return this;
    }
}


const p = new TrackablePromise((resolve, reject, notify) => {
    function f(x) {
        if (x > 0) {
            notify(`${20 * x}`); // 执行 notifyHandlers<item>(`${20 * x}`) 
            setTimeout(f, 1000, x - 1)
        } else {
            resolve(20)
        }
    }

    f(5)
});

p.notify(x => { // notifyHandlers.push(x=>{})
    console.log(x);
});

```

## 异步函数

异步函数是期约模式在`ECMAScript`函数中的应用。关键字 `async`/`await`，是`ES8`规范新增的。以同步方式写代码能够异步执行。

### `async`

`async`关键字用于声明一个异步函数，可以用在函数声明、函数表达式、箭头函数和方法上。使用 `async`可以让函数具有异步特征，但代码 总体上依然是同步求值的。
而在参数和闭包方面依然具有普通函数的正常行为。异步函数会返回的值会被`Promise.resolve()`包装成一个期约对象，返回一个`Promise.resolve()`和`thenalbe`对象 返回一个`thenable`
接口的对象，这个对象可以由提供给`then()`的处理程序解包。 返回一个`Promise.reject()`会返回一个拒绝的期约。

```javascript
    // 正常
async function foo() {
    return "foo1";
}

foo().then(console.log);// foo1

// Promise.resolve
async function foo2() {
    return Promise.resolve("foo2")
}

foo2().then(console.log); // foo2

// thenable
async function foo3() {
    return {
        then(func) {
            func("foo3");
        }
    }
}

foo3().then(console.log); // foo3


// 拒绝的期约
async function foo4() {
    return Promise.reject("foo4 err")
}

foo4().catch(console.log)
/*
foo1
foo3
foo2
foo4 err
*/
```

### `await`

异步函数主要针对不会马上完成的任务，`await`可以暂停异步函数代码的执行，等待期约解决。 对拒绝的期约使用`await`给返回的期约添加一个拒绝处理的程序。

```javascript

async function foo5() {
    console.log(await Promise.resolve("foo5 before")); // foo5 before
    const p = await new Promise(resolve => setTimeout(resolve, 1000, "foo5 after"))
    console.log(p); //等待1s后打印 foo5 after
    return Promise.resolve("foo5 return")
}

foo5().then(console.log); // foo5 return

async function foo6() {
    console.log(await Promise.reject("foo6 err"));// log 不会被执行。
    console.log("foo6 after"); // 不会被执行。
}

foo6().catch(val => {
    console.log("foo6 catch"); // foo6 catch
});

```

### 停止和恢复执行

`JavaScript`运行时碰到`await`关键字时会记录在哪里暂停执行，等到`await`右边的值可用了，`JavaScript`运行会向消息队列推送一个任务，这个任务恢复异步函数的执行。
`await`后边跟一个立即可用的值，函数其余部分也会被异步求值。

```javascript


async function foo7() {
    console.log(2);
    await null;
    console.log(4);
}

console.log(1)
foo7();
console.log(3)

/*
* 1
* 2
* 3
* 4
* */
```

## 异步函数策略

### 实现`sleep()`

```javascript
async function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

async function foo8() {
    console.time("foo8")
    await sleep(1000);
    console.timeEnd("foo8")
}

foo8();

```

### 利用平行执行

如果使用`await`时不小心，就会错过平行加速的机会。

```javascript

async function randomDelay(id) {
    const delay = Math.ceil(Math.random() * 100);
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`${id} finish`);
            resolve();
        }, delay);
    })
}

async function randomDelay(id) {
  const delay = Math.ceil(Math.random() * 100 || 100);
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${id} finish`);
      resolve(id);
    }, delay);
  })
}


async function parallel1() {
  console.time("parallel1");
  for (let i = 0; i < 5; ++i) {
    console.log(`awaited ${await randomDelay(i)}`);
  }
  console.timeEnd("parallel1");
}

parallel1();
/*
0 finish
awaited 0
1 finish
awaited 1
2 finish
awaited 2
3 finish
awaited 3
4 finish
awaited 4
parallel1: 288.816ms
* */

```

期约直接没有依赖，异步也会依次暂停等待每个超时完成，这样虽然可以保证执行顺序。但总执行时间会变长。 如果顺序不是必须的，可以先一次执行性初始化所有异步，然后再分别等待它们的结果。

```javascript

async function parallel2() {
  console.time("parallel2");
  const allPromise = Array(5).fill(null).map(((value, index) => randomDelay(index)));
  for (const p of allPromise) {
    console.log(`awaited ${await p}`);
  }
  console.timeEnd("parallel2");
}

parallel2().then(r => r);
/*
3 finish
2 finish
1 finish
4 finish
awaited 0
0 finish
awaited 1
awaited 2
awaited 3
awaited 4
parallel2: 97.828ms  
* */
```
虽然期约没有按顺序执行，但`await`按顺序接受到了每个期约的值。


### 串行执行期约

```javascript

async function serial1(x) {
    return await new Promise(resolve => resolve(x + 2));
}

async function serial2(x) {
    return await new Promise(resolve => resolve(x + 2));
}

async function serial3(x) {
    return await new Promise(resolve => resolve(x + 3));
}


async function serialRun(x) {
    for (const p of [serial1, serial2, serial3]) {
        x = await p(x)
    }
    return x;
}

serialRun(10).then(console.log); // 17

```

`await`直接传递了每个函数的返回值，结果通过迭代产生。
