// 字面量对象
{
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
}
// 计算属性
{
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
}
// 访问器属性
{
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
}

// get|set 对
{
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

}


{
    function ObIs(a, b) {
        if (a === b) {
            return a !== 0 || 1 / a === 1 / b;
        } else {
            return a !== a && b !== b;
        }
    }

    console.log(ObIs(NaN, NaN))
    console.log(ObIs(-0, +0))

}

// 增强的对象语法
{
    let computedName = "computedNameVal"
    const obj = {
        computedName,
        computedNameFun() {

        },
        [computedName]: "",
        ["get" + computedName]() {
            return this[computedName]
        },
    }

    console.log(Reflect.ownKeys(obj)) // ['computedName','computedNameFun','computedNameVal','getcomputedNameVal' ]
}

// 对象的解构
{
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
    // 函数中使用
    function result(
        name,
        // 解构
        {obj: obj, array: {length: len = 20}},
        // 设置默认值
        other = "other") {
        console.log(arguments)
    }

    result("name", {obj: "obj", array: {length: 10}}, "other")
}

