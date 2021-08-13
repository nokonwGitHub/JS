{
    let x = 3;
    x = x + 1;


    setTimeout(() => x = x + 1, 1000);

    setTimeout(() => console.log(x), 1000);

    console.log(x)
}


// 如ajax
{
    const http = require("http");
    const {URL} = require("url");
    const qs = require("querystring");

    const nodeAjax = function (url, options = {
        method: "get",
        success() {
        },
        fail() {
        },
        complete() {
        },
        data: {},
        query: {},
        header: {}
    }) {
        options.query = options.query || "";
        if (Object.prototype.toString.call(options.query) === "[object Object]") {
            options.query = qs.encode(options.query);
        }
        const request = http.request(url + options.query.toString(), {
            method: options.method || "get",
            headers: options.header,
        }, (res) => {
            if (res.statusCode !== 200) {
                options.fail && options.fail(res);
                return undefined;
            }

            const data = [];

            res.on("data", (chunk) => data.push(chunk));
            res.on("end", (chunk) => {
                let rawDate = Buffer.concat(data).toString("utf8");
                try {
                    rawDate = JSON.parse(rawDate);
                } catch {
                }
                options.success && options.success({
                    data: rawDate,
                    headers: res.headers
                })
            });
        });
        options.data && request.write(JSON.stringify(options.data), (err) => {
            err && options.fail && options.fail(err);
        });
        request.end(() => {
            options.complete && options.complete();
        });
    }

    nodeAjax("http://www.baidu.com", {
        success({data}) {
            console.log(data)
        }
    });
}
// 期约的nodeAjax
{
    const http = require("http");
    const {URL} = require("url");
    const qs = require("querystring");

    const nodeAjax = function (url, options = {
        method: "get",
        data: {},
        query: {},
        header: {}
    }) {

        options.query = options.query || "";
        if (Object.prototype.toString.call(options.query) === "[object Object]") {
            options.query = qs.encode(options.query);
        }
        return new Promise((resolve, reject) => {
            const request = http.request(url + options.query.toString(), {
                method: options.method || "get",
                headers: options.header,
            }, (res) => {
                if (res.statusCode !== 200) {
                    reject(res)
                    return undefined;
                }

                const data = [];

                res.on("data", (chunk) => data.push(chunk));
                res.on("end", () => {
                    let rawDate = Buffer.concat(data).toString("utf8");
                    try {
                        rawDate = JSON.parse(rawDate);
                    } catch {
                    }
                    resolve({
                        data: rawDate,
                        headers: res.headers
                    })

                });
            });
            options.data && request.write(JSON.stringify(options.data), (err) => {
                err && reject(err)
            });
            request.end()
        })
    }

    nodeAjax("http://www.baidu.com").then(({data}) => {
        console.log(data)
    });

}

