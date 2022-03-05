{
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
            console.log(new.target)
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
}

{
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
}
