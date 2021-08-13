"use strict";

function getType(val) {
    return Object.prototype.toString.call(val).slice(8, -1)
}

function isDef(val) {
    return typeof val === "undefined" || val === null;
}

function isPri(val) {
    return typeof val === "number" || typeof val === "string" || typeof val === "boolean" || typeof val === "bigint" || isDef(val);
}

function isFunc(val) {
    return typeof val === "function";
}


function compareAst(val, filter) {
    for (const item of val) {
        for (const [fKey, fVal] of Object.entries(filter)) {
            if (isPri(fVal)) {
                if (val[fKey] !== fVal) {
                    return false;
                }
            } else if (getType(fVal) === "Object") {
                if (!compareAst(val[fKey], fVal)) {
                    return false;
                }
            } else if (getType(fVal) === "Array") {
                for (const index in fVal) {
                    if (!compareAst(val[fKey][index], fVal[index])) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

function parseAst(ast, nodeType, filter) {
    const arr = [];
    if (!("parent" in ast)) {
        ast = {
            value: ast,
            parent: undefined
        };
    }
    for (const item of Object.values(ast.value)) {
        if (getType(item) === "Array") {
            item.forEach(item2 => {
                arr.push(...parseAst({value: item2, parent: ast}, nodeType, filter));
            });
        } else if (getType(item) === "Object") {
            arr.push(...parseAst({value: item, parent: ast}, nodeType, filter));
        }
    }

    if (typeof nodeType === "string" && ast.value.type === nodeType) {
        if (getType(filter) === "Object") {
            if (compareAst(ast.value, filter)) {
                arr.push(ast);
            }
        } else if (isFunc(filter)) {
            if (filter(ast.value)) {
                arr.push(ast);
            }
        } else {
            arr.push(ast)
        }
    }
    return arr;
}


module.exports.parseAst = parseAst
