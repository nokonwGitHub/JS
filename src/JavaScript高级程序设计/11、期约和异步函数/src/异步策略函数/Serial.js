async function serial1(x) {
    return await new Promise(resolve => resolve(x + 2));
}

async function serial2(x) {
    return await new Promise(resolve => resolve(x + 2));
}

async function serial3(x) {
    return await new Promise(resolve => resolve(x + 3));
}


async function serialRun(x) {
    for (const p of [serial1, serial2, serial3]) {
        x = await p(x)
    }
    return x;
}

serialRun(10).then(console.log)
