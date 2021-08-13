class TrackablePromise extends Promise {
    constructor(executor) {
        const notifyHandlers = [];
        super((resolve, reject) =>
            executor(resolve, reject, (status) => notifyHandlers.map((handler) => handler(status)))
        );
        this.notifyHandlers = notifyHandlers;
    }

    notify(notifyHandler) {
        this.notifyHandlers.push(notifyHandler)
        return this;
    }
}


const p = new TrackablePromise((resolve, reject, notify) => {
    function f(x) {
        if (x > 0) {
            notify(`${20 * x}`)
            setTimeout(f, 1000, x - 1)
        } else {
            resolve(20)
        }
    }
    f(5)
});

p.notify(x => {
    console.log(x)
});

