const j = require("jscodeshift");
const {parseAst} = require("./parseAst");
const {parseAst: parseAst2} = require("./parseAst2");

(async () => {
    const ast = require("./mm.json");
    let {body} = ast;
    body = body.slice(50,1050)
    for (let i =0; i < 5000; i++) {
        ast.body.push(...body)
    }
    console.log("start", ast.body.length)
    // console.time("d");
    // let d = parseAst(ast, "MemberExpression");
    // console.timeEnd("d");
    // console.log(d.length);
    //
    // console.time("d2")
    // let d2 = parseAst2(ast, "MemberExpression");
    // console.timeEnd("d2")
    // console.log(d2.length);

    console.time("d3");
    let d3 = j(ast).find(j.MemberExpression);
    console.timeEnd("d3");

    console.log(d3.size());
})()


