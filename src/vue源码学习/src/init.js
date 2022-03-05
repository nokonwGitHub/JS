import {initState} from "./state.js";
import {compileToFunctions} from "./compiler/index";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        // 这里的this代表调用_init方法的对象(实例对象)
        //  this.$options就是用户new Vue的时候传入的属性
        const vm = this;
        vm.$options = options;
        initState(vm);
        // 如果有el属性 进行模板渲染
        if (vm.$options.el) {
            vm.$mount(vm.$options.el);
        }
    };
    Vue.prototype.$mount = function (el) {
        const vm = this;
        const options = vm.$options;
        el = document.querySelector(el);
        // 如果不存在render属性
        if (!options.render) {
            let template = options.template;
            // 如果不存在render和template 但是存在el属性 直接将模板赋值到el所在的html结构
            if(!template && el) {
                template = el.outerHTML
            }
            // 最终需要把template模板转化成render函数
            options.render = compileToFunctions(template, options)
        }
    };
}
