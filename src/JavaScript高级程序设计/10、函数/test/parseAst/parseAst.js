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

function _compare(nodes) {
    const set = [];
    // node  filter
    for (const [node, filter] of nodes) {
        for (const [fKey, fVal] of Object.entries(filter)) {
            if (isPri(fVal)) {
                if (node[fKey] !== fVal) {
                    return false;
                }
            } else {
                set.push([node[fKey], fVal]);
            }
        }
    }
    return _compare(set);
}

function compare(node, filter) {
    return _compare([[node, filter]]) === undefined;
}

function _parseAst(asts, nodeType, filter, allSet = []) {
    const set = [].concat(allSet);
    const needAsts = [];
    for (let value of asts) {
        for (const item of Object.values(value.value)) {
            if (getType(item) === "Array") {
                item.forEach(item2 => {
                    needAsts.push({value: item2, parent: value});
                });
            } else if (getType(item) === "Object") {
                needAsts.push({value: item, parent: value});
            }
        }

        if (typeof nodeType === "string" && value.value.type === nodeType) {
            if (getType(filter) === "Object") {
                if (compare(value.value, filter)) {
                    set.push(value);
                }
            } else if (isFunc(filter)) {
                if (filter(value.value)) {
                    set.push(value);
                }
            } else {
                set.push(value)
            }
        }
    }

    if (needAsts.length === 0) {
        return set
    }

    return _parseAst(needAsts, nodeType, filter, set);
}


module.exports.parseAst = function parseAst(ast, nodeType, filter) {
    if (!("parent" in ast)) {
        ast = {
            value: ast,
            parent: undefined
        };
    }
    return _parseAst([ast], nodeType, filter);
}
