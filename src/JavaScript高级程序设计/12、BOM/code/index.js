async function mySetInterval(handler = async () => "stop", timeout = 0) {
    const p = await handler();
    const runner = async () => {
        (await handler()) !== "break" && setTimeout(runner, timeout)
    };
    p !== "break" && setTimeout(runner, timeout);
}

let i = 60;
mySetInterval(async () => {
    if (i >= 0) {
        await sleep(1000);
        console.log(i);
        i--;
        return "continue";
    }
    return "break";
}, 0);

function sleep(time = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    })
}
