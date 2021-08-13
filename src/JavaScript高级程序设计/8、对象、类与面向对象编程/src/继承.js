{
    // 继承
    function One() {
    }

    One.prototype.one = true

    function Two() {
    }

    Two.prototype.two = true

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
    //  {}[__proto__] -> Two.prototype[__proto__] ->One.prototype[__proto__]->Object.prototype[__proto__]->null

    console.log(obj.__proto__ === Two.prototype)
    console.log(Two.prototype.__proto__ === One.prototype)
    console.log(One.prototype.__proto__ === Object.prototype)
    console.log(obj.constructor === Two)
}

{
    function A() {
    }

    function B() {
    }

    B.prototype = Object.create(A.prototype);
    B.prototype.constructor = B; // 把构造函数再改回来。
    const obj = Object.create(B.prototype);
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

}
