async function randomDelay(id) {
    const delay = Math.ceil(Math.random() * 100 || 100);
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`${id} finish`);
            resolve(id);
        }, delay);
    })
}


async function parallel1() {
    console.time("parallel1");
    for (let i = 0; i < 5; ++i) {
        console.log(`awaited ${await randomDelay(i)}`);
    }
    console.timeEnd("parallel1");
}

parallel1();
/*
0 finish
awaited 0
1 finish
awaited 1
2 finish
awaited 2
3 finish
awaited 3
4 finish
awaited 4
parallel1: 288.816ms
* */


async function parallel2() {
    console.time("parallel2");
    const allPromise = Array(5).fill(null).map(((value, index) => randomDelay(index)));
    for (const p of allPromise) {
        console.log(`awaited ${await p}`);
    }
    console.timeEnd("parallel2");
}

// parallel2();
/*
3 finish
2 finish
1 finish
awaited 0
4 finish
awaited 1
awaited 2
0 finish
awaited 3
awaited 4
parallel2: 97.828ms
* */

