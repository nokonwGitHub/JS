function promiseExecutor(resolve, reject) {
    setTimeout(() => {
        reject("err");
    }, 1000);
}

function track1() {
    console.trace()
    new Promise(promiseExecutor).catch(r=>r)
}

track1()


async function track2() {
    console.trace()
    await new Promise(promiseExecutor);
}

track2().catch(r => r)
