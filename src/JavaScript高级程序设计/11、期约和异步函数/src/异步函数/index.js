{
    // 正常
    async function foo() {
        return "foo1";
    }

    foo().then(console.log);// foo1

    // Promise.resolve
    async function foo2() {
        return Promise.resolve("foo2")
    }

    foo2().then(console.log); // foo2

    // thenable
    async function foo3() {
        return {
            then(func) {
                func("foo3");
            }
        }
    }

    foo3().then(console.log); // foo3


    // 拒绝的期约
    async function foo4() {
        return Promise.reject("foo4 err")
    }

    foo4().catch(console.log)
}


{

    async function foo5() {
        console.log(await Promise.resolve("foo5 before")); // foo5 before
        const p = await new Promise(resolve => setTimeout(resolve, 1000, "foo5 after"))
        console.log(p); //等待1s后打印 foo5 after
        return Promise.resolve("foo5 return")
    }

    foo5().then(console.log); // foo5 return

    async function foo6() {
        console.log(await Promise.reject("foo6 err"));// log 不会被执行。
        console.log("foo6 after"); // 不会被执行。
    }

    foo6().catch(val => {
        console.log("foo6 catch"); // foo6 catch
    });
}


{

    async function foo7() {
        console.log(2)
        await null;
        console.log(4)
    }

    console.log(1)
    foo7();
    console.log(3)

}
