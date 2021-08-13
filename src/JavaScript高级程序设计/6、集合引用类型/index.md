常用集合引用类型包括`Object`、`Array`、`Map`、`Set`等

# `Object`

大多数引用值都是使用的`Object`类型。

```javascript
// 字面量定义
let obj = { // 存储任意类型的值。
    val: 10,
    obj: {},
    func() {

    }
};

// 取值
console.log(obj.val);
console.log(obj["val"]);

```

# `Array`

`JavaScript`中的数组是动态的，可以存储任意类型的值，一组有序的数据。  
当数组长度变化时会销毁原来的数组，新建一个数组。数组最大长度不超过`4294967295`。

```javascript
let arr = ["Hello"];
// arr.length = 10;

let arr2 = new Array("Hello");
// let arr2 = new Array(10);


// 索引修改，访问，增加
arr[0] = "other";
console.log(arr[0]);
arr[1] = ""

```

## 静态方法

* `from()` 类数组转化为数组。
* `of()` 一组参数转化为数组。
* `isArray()` 检测是否为数组。

## 原型方法

* `fill()` 指定一个范围，批量复制
* `copyWithin()` 指定范围浅复制数组中的部分内容。
* 转化方法：
    + `toString()`、`valueOf()`、`toLocaleString()`
    + `join()` 按照指定的分隔符来拼接数组每一项。
* 首尾增删   **改变原数组**
    + `push()` 尾部增加，返回数组长度。
    + `pop()` 尾部移除，返回移除的项。
    + `shift()` 头部移除，返回移除的项。
    + `unshift()` 头部增加，返回数组长度。
* 排序方法   **改变原数组**
    + `reverse()` 反转数组。
    + `sort()` 按照排序规则排序。
* 操作方法
    + `concat()` 返回拼接后的数组。
    + `slice()` 返回指定范围的项组成的数组。
    + `splice()` 用于数组的修改、删除、插入，返回删除项组成的数组。**会改变原数组。**
* 搜索和位置方法
    + 严格相等：`indexOf()`、`lastIndexOf()`、`includes()`
    + 断言函数：`find()`返回匹配的项，`findIndex()`返回匹配项的下标。
* 迭代方法
    + `every()` 每项都匹配。返回布尔值。
    + `filter()` 过滤数组并返回。
    + `forEach()` 遍历数组，无返回值。
    + `map()`  遍历数组，返回每次函数调用结果构成的函数。
    + `some()` 存在一项匹配。返回布尔值。
* 归并方法
    + `reduce()` 在遍历数组的基础上返回一个最终的结果。 +`reduceRight()`
* 展开项
    + `flat()` 按照深度展开每一项。
    + `flatMap()` 遍历每个元素，将其压缩为一个数组。

* 生成迭代器
    + `keys()` 返回下标的迭代器。
    + `values()` 返回值的迭代器。
    + `entries()` 返回`[下标，值]`的迭代器。

# `TypedArray`定型数组

定型数组是`ECMAScript`新增的结构，目的是提升原生库传输数据的效率。  
`JavaScript`其实并没有`TypedArray`，是一种特殊的包含数值类型的数组。   
充分利用`3D`图形`API`和`GPU`加速，以便在`<canvas>`元素上渲染复杂的图形。

## `ArrayBuffer`

`ArrayBuffer`是所有定型数组和视图引用的基本单位。  
`ArrayBuffer`是一个普通的`JavaScript`构造函数，可用于在内存中分配特定数量的字节空间。

```javascript

const buf1 = new ArrayBuffer(16); // 一旦创建就不能再调整大小。
const buf2 = buf1.slice(4, 12); // slice 可以复杂指定范围的值。
console.log(buf2.byteLength); // byteLength 字节长度

```

不能直接去操作`ArrayBuffer`的内容，需要通过类型数组对象或` DataView `对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

## `DataView`

`DataView` 专门为文件`I/O`和网络`I/O`设计的，其`API`支持对缓冲数据的高度控制，性能比其他类型额视图要差些。  
`DataView` 对缓冲区没有预设，也不可迭代。

```javascript

const dataBuf = new ArrayBuffer(256);

const dataView = new DataView(dataBuf); // 使用一个buffer，可以设置其使用范围。
console.log(dataView.byteOffset); // 偏移量
console.log(dataView.byteLength); // 使用了多长的buffer
console.log(dataView.buffer === dataBuf);

// 设置 Int8 -128~127
dataView.setInt8(0, 128);
console.log(dataView.getInt8(0)) // -128
// 设置 Uint8 0~255
dataView.setUint8(1, 256);
console.log(dataView.getUint8(1)) // 0

```

## 定型数组

定型数组也是`ArrayBuffer`视图。定型数组相较于`DataView`提供了更多的`API`和高性能。  
设计目的为了和`WebGL`等原生库进行二进制数据的交换。`JavaScript`引擎可以重度优化算术运算、按位运算等对定型数组的操作。  
创建定型数组方式：

* 读取已有缓存。
* 使用自有缓存。
* 填充可迭代结构。
* 填充任意类型的定型数组。
* 静态函数`from()`和`of()`

```javascript

let typeArray = new Int32Array(10);
console.log(typeArray.BYTES_PER_ELEMENT); // 每个元素的大小。
console.log(typeArray.length); // 长度
console.log(typeArray.byteLength); // byteLength = length * BYTES_PER_ELEMENT

```

定型数组和普通函数相比较：除了不能使用可能改变原数组长度的方法(`pop|push|shift|unshift|splice`)和`concat`方法，其他的用法一样。  
定型数组提供了2个方法`set`和`subarray`，来向外或向内复制数组。

```javascript

let typeArray2 = new Int32Array(10);
console.log(typeArray2);
typeArray2.set(new Int32Array([1, 2, 3, 4]), 2); // 类似数组splice修改内容
console.log(typeArray2);

console.log(typeArray2.subarray(3, 9)); // 复制指定范围的项 

```

# `Map`

`Map`是一种集合类型。与`Object`类似。`Map`可以使用任意类型作为键。
## 原型方法属性
* `size` 键值对个数。
* `set()` 添加或修改指定键对应的值。
* `get()` 获取键对应的值。
* `has()` 判断是否包含对应的键。
* `forEach()` 遍历。
* `delete()` 删除指定键的键值对。
* `clear()` 清空所有键值对。
* `keys()`、`values()`、`entries()` 获取对应的迭代器。


```javascript

let obj = {};
let map = new Map([[obj, obj]]); // 初始化 ：不传值 或  [key,val] 组成的数组。
let key = function () {
    return "key";
};
map.set(obj, {a: 10}); // 改变值
map.set(key, key);   // 新增值


let getKey = map.get(key);  // 获取值 不存在返回undefined
console.log(map.has(key));  // 是否存在

console.log(getKey());

// 对应迭代器函数 用于 for-of遍历
console.log(map.keys());  
console.log(map.values());
console.log(map.entries());

console.log(map.size); // 键值对个数
map.delete(obj); // 删除
map.clear();  // 清空
console.log(map.size);

```

## `Object`和 `Map`的差别
对于`web`开发来说差别不大。差别主要体现在性能和内存上。
* 内存占用：`Map`比`Object`多存储大概50%的键值对。
* 插入性能：插入新键`Map`略快。在大量插入操作时，`Map`性能更优。
* 查找速度：两者性能差异极小，不过在大量的查找操作中，`Object`更优。
* 删除性能：`Object`不提倡使用删除操作，一般设值为`null`或`undefined`。就`delete`操作，`Map`的`delete`操作更优。

# `WeakMap`
`WeakMap`是一种弱集合类型。`JavaScript`垃圾回收对待是弱类型中**键**的方式。  
`WeakMap`只能使用`Object`或继承于`Object`的类型。

## 原型方法
* `set()` 添加或修改指定键对应的值。
* `get()` 获取键对应的值。
* `has()` 判断是否包含对应的键。
* `delete()`。 删除指定键的键值对。

`WeakMap`实例是弱类型，无法获取`size`和迭代器相关的方法，同时也没有`clear()`方法。

#### `WeakMap`适应场景：
* 私有变量：私有变量被存储在弱映射中，对象实例为键，私有成员的字典为值。这个并不是真正的私有变量。
* `DOM`节点元数据： `WeakMap`实例不会妨碍垃圾回收，适合保存关联的元数据。


# `Set`

`Set`是一种集合类型。`Set`像是加强的`Map`(键===值)。成员的值都是唯一的，没有重复的值。

## 原型方法属性
* `size` 值对个数。
* `add()` 添加值。
* `has()` 判断是否包含对应的键。
* `forEach()` 遍历。
* `delete()` 删除指定值。
* `clear()` 清空所有值。
* `keys()`、`values()`、`entries()` 获取对应的迭代器。

```javascript

let set = new Set();

let obj = {
    name: 10
}
console.log(set.size);
set.add(obj);
console.log(set.size);

console.log(set.has(obj));

set.forEach((value, value2, set1) => {
    console.log(value)
})

console.log(set.values())
console.log(set.entries())
console.log(set.keys())

set.delete(obj);
set.clear();

```

`Set`可以用于数组去重。

# `WeakSet`
`WeakSet`是一种弱集合类型。`JavaScript`垃圾回收对待是弱类型中**值**的方式。  
`WeakSet`只能使用`Object`或继承于`Object`的类型。

## 原型方法
* `add()` 添加值。
* `has()` 判断是否包含对应的值。
* `delete()`。 删除指定值。

`WeakSet`实例是弱类型，无法获取`size`和迭代器相关的方法，同时也没有`clear()`方法。

#### `WeakSet`适应场景：

`WeakSet`可以用于给对象打标签。通过判断次对象的状态，来完成对应的逻辑。

# 迭代于扩展操作

`Array`、定型数组、`Map`、`Set`都定义了默认的迭代器(可以`for-of`循环)。  
扩展操作符(`...`)用于数组和可迭代对象浅复制。  


