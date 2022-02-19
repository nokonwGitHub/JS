const path = require("path")

module.exports = function (evt, ...arg) {
    console.log(evt)
    return {
        name: "Vue",
        mode: "development", // "production" | "development" | "none"
        devtool: "eval",
        // 这里应用程序开始执行
        // webpack 开始打包
        entry: {
            index: {
                import: path.join(__dirname, "../index.js"),
                library: {
                    type: 'umd',
                    auxiliaryComment: "test"
                }
            }
        }, // string | object | array

        output: {
            auxiliaryComment: "test",
            chunkLoading: "async-node",
            sourcePrefix: "test"
        }
    }
}
