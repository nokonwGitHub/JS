// 静态私有变量
{
    const Person = (function () {
        let name = "";

        return class Person {
            constructor() {

            }

            getName() {
                return name;
            }

            setName(val) {
                name = val;
            }
        };
    })();

    let p1 = new Person()
    p1.setName("name");
    console.log(p1.getName());

}

// 模块模式

{
    const singleton = (function () {
        const arr = [];

        return {
            getArrCount() {
                return arr.length
            },
            addItem(item) {
                arr.push(item);
            },
            write() {
                return JSON.stringify(arr);
            }
        }
    })();

    singleton.addItem("1");
    singleton.addItem("2");
    singleton.addItem("3");

    console.log(singleton.getArrCount());
    console.log(singleton.write());
}

// 模块增强模式

{
    const singleton = (function () {
        let curTime = null;
        const timeArr = [];

        timeArr.now = function () {
            curTime = new Date();
            timeArr.push(curTime);
            return curTime;
        }

        timeArr.format = function (format, time = curTime) {
            if (!time) {
                return undefined;
            }
            const o = {
                "M+": time.getMonth() + 1,                 //月份
                "d+": time.getDate(),                    //日
                "h+": time.getHours(),                   //小时
                "m+": time.getMinutes(),                 //分
                "s+": time.getSeconds(),                 //秒
                "q+": Math.floor((time.getMonth() + 3) / 3), //季度
                "S": time.getMilliseconds()             //毫秒
            };
            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (const k in o)
                if (new RegExp("(" + k + ")").test(format))
                    format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return format;
        }
        timeArr.clear = function () {
            timeArr.splice(0, timeArr.length);
            curTime = null;
        }
        timeArr.getTimes = function () {
            console.log(timeArr)
        }
        timeArr.size = function () {
            return timeArr.length;
        }
        return timeArr;
    })();

    const t1 = singleton.now();
    console.log(singleton.format("yyyy mm:ss S"));
    const t2 = singleton.now();
    console.log(singleton.format("yyyy mm:ss S"));
    console.log(singleton.format("yyyy mm:ss S", t1));
    console.log(singleton.size());
    singleton.clear();
    console.log(singleton.size());
}

