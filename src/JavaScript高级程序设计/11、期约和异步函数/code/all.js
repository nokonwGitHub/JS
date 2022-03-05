// #### `Promise.all()`

const pAll1 = Promise.all([Promise.resolve("one"), Promise.resolve("two"), Promise.resolve("three"), Promise.resolve("four")]);
pAll1.then(value => {
    console.log(value);
});

const pAll2 = Promise.all([Promise.resolve("one"), Promise.resolve("two"), Promise.reject("three"), Promise.resolve("four"), new Promise((resolve, reject) => {
    console.log("five");
    reject("five");
})]);
pAll2.then(value => {
    console.log(value);
}).catch(reason => {
    console.log(reason);
});

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
