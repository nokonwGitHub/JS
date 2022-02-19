import {initMixin} from "./src/init.js"

function Vue(option) {
    this._init(option)
}

// _init方法是挂载在Vue原型的方法 通过引入文件的方式进行原型挂载需要传入Vue
// 此做法有利于代码分割
initMixin(Vue);

export default Vue;

const tapp = new Vue({
    data: {
        p: [{
            a: 10
        }]
    }
})

console.log(tapp.p)
