module.exports = function (env, config) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve({
                entry: ""
            })
        }, 5000)
    })
}
