{

    const p1 = new Promise(resolve => resolve("resolve"));
    setTimeout(console.log, 0, p1);
    //const p2 = new Promise((resolve, reject) => reject());// reject必须使用catch来接受抛出的错误
    //setTimeout(console.log, 2, p2);
}

{
    class P {
        constructor(num = 0) {
            this.num = num;
        }

        promise() {
            return new Promise((resolve, reject) => {
                let t1 = setTimeout(() => {
                    reject("reject");
                    clearTimeout(t2);
                }, 1000,);
                let t2 = setTimeout(() => {
                    resolve("resolve");
                    clearTimeout(t1);
                }, this.num)
            })
        }
    }

    const p = new P();
    p.promise().then(value => {
        console.log(value);
    }).catch(err => {
        console.log(err);
    });
    p.num = 2000;
    p.promise().then(value => {
        console.log(value);
    }).catch(err => {
        console.log(err);
    });
}

{

    const pFunc = (success) => new Promise((resolve, reject) => {
        success ? resolve("resolve") : reject("reject");
    });
    pFunc(true).then(value => {
        console.log(value)
        return 10;
    });

    pFunc(false).then(null, error => {
        console.log(error);
    });
}

{
    const pFunc = () => new Promise((resolve, reject) => {
        resolve(10);
    });
    pFunc().then(value => {
        return value + 20;  // 返回同步值
    }).then(value => {
        console.log(value)
    });

    pFunc().then(value => {
        return new Promise(resolve => resolve(30 + value)) // 返回一个异步操作
    }).then(value => {
        console.log(value);
    });


    console.log(Promise.resolve())

}




