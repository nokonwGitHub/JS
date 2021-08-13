class CancelPromise extends Promise {
    #timer = null;

    constructor(executor, delay = 0) {
        let timer = null;
        super((resolve, reject) =>
            executor(value => timer = setTimeout(resolve, delay, value),
                error => timer = setTimeout(reject, delay, error)
            )
        );
        this.#timer = timer
    }

    clear() {
        clearTimeout(this.#timer)
    }
}

let c1 = new CancelPromise((resolve, reject) => {
    resolve(20);
});

c1.then(value => {
    console.log(value)
});

c1.clear();
