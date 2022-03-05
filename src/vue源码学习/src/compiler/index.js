import { parse } from "./parse";
import { generate } from "./codegen";

/**
 *
 * */
export function compileToFunctions(template, options) {
    /*
    * 需要把html字符串变为render函数
    * 1、把html代码转化为ast语法树
    * */
    let ast = parse(template);
    /*
    * if(options.optimize  !== false ) {
    *    optimize(ast, options);
    * }
    * */
    let code = generate(ast)

    return new Function(`with(this) { return ${code}}`)
}
