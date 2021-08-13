// 工厂模式
{
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
    console.log(f1 instanceof factory); // false
}

// 构造函数模式和原型组合

(function () {
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

    // 构造函数当成普通函数使用
    Person("glo", 22);
    console.log(global.name); // glo
    Person("glo2", 22);
    console.log(global.name); // glo2


    // new 实现
    // new 操作的实质。this 指向了被原型链被修改的 {}
    let obj = {};
    obj.__proto__ = Person.prototype;
    Person.call(obj, "glo2", 22)
    console.log(obj instanceof Person);
    return 0;
})();


(function () {
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

    console.log(Object.getOwnPropertyNames(p1))
    console.log(Object.getOwnPropertyNames(p2))

})()

// 原型模式
{
    function Proto() {
    }

    Proto.prototype.name = "Proto"
    Proto.prototype.getName = function () {
        return this.name
    }
    let p1 = new Proto();
    let p2 = new Proto();
    p1.name = "p1";
    p2.name = "p2";
    p2.age = 10;
    console.log(p1.name, p2.name, Proto.prototype.name)
    console.log(p1.age, p2.age, Proto.prototype.age)

    // 得到一个Null类
    {
        function Null() {
        }

        Null.prototype = Object.create(null);
        Null.prototype.constructor = Null;
        const getNull = new Null()
        console.log(getNull.toString)
        console.log(getNull.valueOf)
    }
}


