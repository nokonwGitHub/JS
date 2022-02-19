import { observe } from "./observer";

export function initState(vm) {
    const option = vm.$option
    if (option.data) {
        initData(vm)
    }
}

// 初始化data
/**
 * 1、把this.$options.data 上的数据代理到this上，
 *    this.$options.data.a -> this._data.a ---> this.a
 * 2、响应式数据劫持。
 *  ①递归调用definedReactive 使用Object.defineProperty 进行get和set
 *  get方法里对依赖进行收集 dep.depend() 每个属性都有dep实例保存自己的 watch
 *  set方法里进行派发更新 dep.notify() 通知所有的属性相关的 watch 进行更新
 *
 *  ②数组 重写数组原型的7种方法，对内部对象继续进行劫持
 *  重写变异方法采用切片思想(AOP),将push、unshift、splice新增的对象进行响应式数据处理
 *  利用__ob__属性完成响应处理。
 *
 *  数组的依赖收集和派发更新都是基于__ob__属性完成的。
 *
 *
 * */
function initData(vm) {
    let data = vm.$option.data
    data = vm._data = typeof data === "function" ? data.call(this) : data || {}
    for (const key in data) {
        proxy(vm, `_data`, key)
    }
    observe(data)
}

// 将数据代理到 vm 上
function proxy(object, sourceKey, key) {
    Object.defineProperty(object, key, {
        get() {
            return object[sourceKey][key];
        },
        set(newValue) {
            object[sourceKey][key] = newValue;
        }
    })
}
