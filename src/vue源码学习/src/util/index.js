export function isType(data, type) {
    return Object.prototype.toString.call(data) === `[object ${type}]`
}


export function isObject(data) {
    return !isNull(data) && isType(data, "Object")
}

export function isArray(data) {
    return Array.isArray(data)
}

export function isFunc(func) {
    return typeof func === "function"
}

export function isNull(data) {
    return data === null
}

export function isNumber(data) {
    return typeof data === "number"
}

function isString(data) {
    return typeof data === "string"
}

function isSymbol(data) {
    return typeof data === "symbol"
}

function isUndef(data) {
    return isNull(data) || typeof data === "undefined"
}

function isDef(data) {

}
