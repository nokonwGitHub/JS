function* gen() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}

const genVal = gen();
console.log(genVal === genVal[Symbol.iterator]()); // true
console.log(genVal.next());
console.log(genVal.next());
console.log(genVal.next());
console.log(genVal.next());
console.log(genVal.next());


// yield实现输入输出

function* gen2(v) {
    console.log("第一个next");
    const a = yield v;
    console.log("第二个next");
    const b = yield 5 + a;
    console.log("第三个next");
    const c = yield 5 + b;
    console.log("第四个next");
    return c;
}

const g2 = gen2(1);
console.log("开始");
console.log(g2.next(2)) // { value: 1, done: false } 第一个next的值不会被使用。
console.log(g2.next(3)) // { value: 8, done: false }  这个值传给第一个yield
console.log(g2.next(4)) // { value: 9, done: false }  这个值传给第二个yield
console.log(g2.next(5)) // { value: 5, done: true }  这个值传给第三个yield


// 终止生成器

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
