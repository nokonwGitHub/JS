async function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

async function foo8() {
    console.time("foo8")
    await sleep(1000);
    console.timeEnd("foo8")
}

foo8();
