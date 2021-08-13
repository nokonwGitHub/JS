// symbol

let symbol1 = Symbol("symbol"),
    symbol2 = Symbol("symbol");

console.log(typeof symbol1)

console.log(symbol1 === symbol2)

let symbolObj = {
    [symbol1]: "1",
    [symbol2]: "2",
}

console.log(symbolObj)

//
let symbol3 = Symbol("symbol.for"),
    symbol4 = Symbol.for("symbol.for"),
    symbol5 = Symbol.for("symbol.for");

console.log(symbol3 === symbol4)
console.log(symbol4 === symbol5)

console.log(Symbol.keyFor(symbol3));
console.log(Symbol.keyFor(symbol4));
console.log(Symbol.keyFor(symbol5));

// 内置符号


(async () => {
    class Test {
        constructor() {

        }

        async* [Symbol.asyncIterator]() {
            yield Promise.resolve(1);
            yield Promise.resolve(2);
            yield Promise.resolve(3);
            yield Promise.resolve(4);
        }


        * [Symbol.iterator]() {
            yield "a";
            yield "b";
            yield "c";
            yield "d";
        }

        static [Symbol.hasInstance](target) {
            return target.constructor === Object
        }

        static [Symbol.match](target) {
            return target[0] === "a"
        }

        static [Symbol.replace](target, replace) {
            return "target"
        }

        static [Symbol.search](target) {
            return "target"
        }

    }

    let test = new Test();

    console.log(test instanceof Test); // false
    console.log(test instanceof Object); // true
    for await (const item of test) {
        console.log(item);
    }
    for (const item of test) {
        console.log(item);
    }

    let arr1 = [1];
    let arr2 = [2, 3]
    console.log(arr2[Symbol.isConcatSpreadable]);
    console.log(arr1.concat(arr2)); // [1, 2, 3]
    arr2[Symbol.isConcatSpreadable] = false;
    console.log(arr1.concat(arr2)); // [1, [2, 3]]

    console.log("ab".match(Test))
    console.log("ba".match(Test))
    console.log("ba".replace(Test, "11"))
    console.log("ba".search(Test))

    // Symbol.species
    class Test2 extends Array {
        static get [Symbol.species]() {
            return Array
        }

        static main() {
            return new Test2().concat()
        }

        static [Symbol.split]() {
            return ["split"]
        }
    }

    let p = Test2.main()
    console.log(p)  // []

    console.log("0001_1000".split(Test2)) // [ 'split' ]

    class Test3 {
        constructor(val) {
            this.val = val
        }

        [Symbol.toPrimitive](target) {
            return this.val
        }

        [Symbol.toStringTag] = "MMTest3"
    }

    let test3 = new Test3("test3")
    console.log(test3 + "") // test3
    console.log(Object.prototype.toString.call(test3)) // [object MMTest3]

    let un1 = {
        a: 1,
        b: 2
    }
    un1[Symbol.unscopables] = {
        a: true
    }
    with (un1) {
        console.log(b)
        try {
            console.log(a)
        } catch (e) {
            console.log(e.toString())
        }
    }
})();


