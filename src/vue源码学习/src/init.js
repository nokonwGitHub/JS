import { initState } from "./state.js";

export function initMixin(Vue) {
    Vue.prototype._init = function (option) {
        const vm = this;
        vm.$option = option;
        initState(vm)
    }
}
