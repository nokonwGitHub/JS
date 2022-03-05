const pRace = Promise.race([
    new Promise(resolve => {
        setTimeout(resolve, 100, "one")
    }),
    new Promise(resolve => {
        setTimeout(resolve, 200, "two")
    }),
    new Promise(resolve => {
        setTimeout(resolve, 40, "three")
    }),
    new Promise((resolve, reject) => {
        setTimeout(reject, 250, "five")
    })]);
pRace.then(value => {
    console.log(value);  // three
});



Promise.race || (Promise.race = function (values) {
    return new Promise((resolve, reject) => {
        values.forEach(value => {
            if (!(value instanceof Promise)) {
                value = Promise.resolve(value);
            }
            value.then(resolve, reject);
        });
    });
});
