{

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

}

{
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
}


{
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
        console.error(e.message)
    }
}


{
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
        console.error(e.message)
    }

}


{
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
}
// Date
{

    let date = new Date()

    const proxy = new Proxy(date, {});
    console.log(proxy instanceof Date)
    try {
        console.log(proxy.getDate())
    } catch (e) {
        console.log(e.message)
    }
}

// 跟踪属性访问
{
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
}
//  隐藏属性
{
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
}

// 属性验证
{
    const Methods = ["POST", "GET"]
    const req = {
        method: "post"
    }
    const proxy = new Proxy(req, {
        set(target, p, value, receiver) {
            console.log(p)
            if (p === "method" && typeof value === "string" && !Methods.includes(value.toUpperCase())) {
                return undefined
            }
            return Reflect.set(...arguments)
        }
    })

    proxy.method = "put";
    console.log(proxy.method); // post
    proxy.method = "get";
    console.log(proxy.method); // get
}

// 函数和构造函数参数校验
{
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
}
// 数据绑定观察对象
{
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
}

{
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
}
