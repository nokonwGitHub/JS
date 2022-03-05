import {ELEMENT_TYPE} from "./parse";

const defaultTagRE = /{{((?:.|\r?\n)+?)}}/g; //匹配花括号 {{  }} 捕获花括号里面的内容

function gen(node) {
    // 判断节点类型
    // 主要包含处理文本核心
    // 源码这块包含了复杂的处理  比如 v-once v-for v-if 自定义指令 slot等等  咱们这里只考虑普通文本和变量表达式{{}}的处理
    const type = node.type;
    if (type === ELEMENT_TYPE) {

    }
}
export function generate() {

}
