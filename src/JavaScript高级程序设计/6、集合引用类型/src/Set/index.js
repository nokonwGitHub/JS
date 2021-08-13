class XSet extends Set {
    union(...sets) { // 并集
        return XSet.union(this, ...sets)
    }

    intersection(...sets) { // 交集
        return XSet.intersection(this, ...sets)
    }

    difference(set) { // 差集
        return XSet.difference(this, set)
    }

    symmetricDifference(set) { // 对称差
        return XSet.symmetricDifference(this, set)
    }

    cartesianProduct(set) { // 笛卡尔积
        return XSet.cartesianProduct(this, set)
    }

    powerSet() { // 幂集
        return XSet.powerSet(this)
    }

    static union(a, ...bSets) {
        const unionSet = new XSet(a);
        for (const item of bSets) {
            for (const itemVal of item) {
                unionSet.add(itemVal);
            }
        }
        return unionSet;
    }

    static intersection(a, ...bSets) { // 交集
        const intersectionSet = new XSet(a);
        for (const item of intersectionSet) {
            for (const bVal of bSets) {
                if (!bVal.has(item)) {
                    intersectionSet.delete(item);
                }
            }
        }
        return intersectionSet;
    }

    static difference(a, b) { // 差集
        const differenceSet = new XSet(a);
        for (const bVal of b) {
            if (a.has(bVal)) {
                differenceSet.delete(bVal);
            }
        }
        return differenceSet
    }

    static symmetricDifference(a, b) { // 对称差
        return a.union(b).difference(a.intersection(b));
    }

    static cartesianProduct(a, b) { // 笛卡尔积
        const cartesianProductSet = new XSet();
        for (const aVal of a) {
            for (const bVal of b) {
                cartesianProductSet.add([aVal, bVal])
            }
        }
        return cartesianProductSet
    }

    static powerSet(a) { // 幂集
        const powerSet = new XSet().add(new XSet());
        for (const aVal of a) {
            for (const set of new XSet(powerSet)) {
                powerSet.add(new XSet(set).add(aVal));
            }
        }
        return powerSet;
    }
}

let set = new XSet([1, 2, 3, 4, 5, 6]);


console.log(set.union(new XSet([2, 4, 8, 6])));
console.log(set.intersection(new XSet([2, 4, 8, 6])));
console.log(set.difference(new XSet([2, 4, 8, 6])));
console.log(set.symmetricDifference(new XSet([2, 4, 8, 6])));
console.log(set.cartesianProduct(new XSet([2, 4, 8, 6])));
console.log(set.powerSet());


