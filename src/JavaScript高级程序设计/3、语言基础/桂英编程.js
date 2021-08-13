const 打印 = console
const 日志 = "log"
const 创建函数 = function (函数体) {
    return 函数体
}
let 返回 = function (val) {
    return val
};

const 新建 = function (类型, ...参数) {
    return 类型(...参数)
}
const 等于 = (参数1, 参数2) => {
    return Object.is(参数1, 参数2)
}

const 是 = true
const 否 = false

const 判断语句 = function (判断 = [{
    条件: 是,
    执行: 创建函数(() => {
    }),
    退出: 否,
}]) {
    for (let item of 判断) {
        if (item.条件) {
            let p = item.执行();
            if (item.退出 === 是) {
                return p
            }
        }
    }
}
const 变量仓库 = {}
const 函数仓库 = {}


变量仓库.算术 = "中文编程"
打印[日志](变量仓库.算术)

变量仓库.函数仓库 = {}
函数仓库.函数 = 创建函数(() => {
    变量仓库.函数仓库.函数内值1 = 10
    变量仓库.函数仓库.函数内值2 = 20
    变量仓库.函数仓库.函数内值3 = 20
    打印[日志]("函数")
});

判断语句([{
    条件: 等于(1, 1),
    执行: 创建函数(() => {
        打印[日志]("1 === 0")
    })
}])
函数仓库.函数()


