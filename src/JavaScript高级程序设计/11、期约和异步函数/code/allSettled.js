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


Promise.allSettled || (Promise.allSettled = function (values) {
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

