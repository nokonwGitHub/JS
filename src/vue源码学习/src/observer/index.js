import {isArray, isObject} from "../util";
import {arrayMethods} from "./array";

class Observer {
    constructor(data) {
        Object.defineProperty(data, "__ob__", {
            value: this, enumerable: false, writable: true, configurable: true
        });
        if (isArray(data)) {

            Object.setPrototypeOf(data, arrayMethods);
            this.observeArray(data)
        } else if (isObject(data)) {
            this.walk(data)
        }
    }

    walk(data) {
        for (const key in data) {
            defineReactive(data, key, data[key])
        }
    }

    observeArray(items) {
        for (let item of items) {
            observe(item);
        }
    }
}

// Object.defineProperty数据劫持核心 兼容性在ie9以及以上
function defineReactive(data, key, value) {
    observe(value); // 递归关键
    // --如果value还是一个对象会继续走一遍 defineReactive 层层遍历一直到value不是对象才停止
    //   思考？如果Vue数据嵌套层级过深 >>性能会受影响
    Object.defineProperty(data, key, {
        get() {
            return value;
        }, set(newValue) {
            if (newValue === value) return;
            value = newValue;
        },
    });
}

export function observe(data) {
    if (isObject(data) || isArray(data)) {
        return new Observer(data)
    }
}
