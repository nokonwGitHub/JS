const ArrayPrototype = Array.prototype
// 然后将arrayMethods继承自数组原型
// 这里是面向切片编程思想（AOP）--不破坏封装的前提下，动态的扩展功能
const arrayMethod = Object.create(ArrayPrototype)
const MethodsToPatch = ["push", "pop", "shift", "unshift", "splice", "reverse", "sort"];

MethodsToPatch.forEach(method => {
    arrayMethod[method] = function (...args) {
        //   这里保留原型方法的执行结果
        const result = ArrayPrototype[method].apply(this, args)
        // 这句话是关键
        // this代表的就是数据本身 比如数据是{a:[1,2,3]} 那么我们使用a.push(4)
        // this 就是 a  ob就是a.__ob__ 这个属性就是上段代码增加的 代表的是该数据已经被响应式观察过了指向Observer实例
        const ob = this.__ob__
        let inserted
        switch (method) {
            case "push":
            case "unshift":
                inserted = args
                break
            case "splice":
                inserted = args.slice(2)
                break
            default:
                break;
        }
        if (inserted) {
            ob.observeArray(inserted)
        }
        return result
    }
})

export const arrayMethods = arrayMethod;
