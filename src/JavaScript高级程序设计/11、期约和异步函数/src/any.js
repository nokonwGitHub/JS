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


