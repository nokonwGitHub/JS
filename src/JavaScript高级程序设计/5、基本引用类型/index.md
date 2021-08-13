引用值是某个特定引用类型的实例。应用类型就是把数据和功能组合到一起的结构。  
引用类型虽然像类，但它和类不是一个概念。

# `Date`

`Date`是从1970年1月1号00:00:00开始的时间

```javascript

const now = new Date();
Date.parse()
```

## 静态方法
* Date.parse() 接收一个日期字符串，返回对应日期的毫秒数。
* Date.UTC() 接收参数，返回对应日期的毫秒数。
* Date.now() 返回当前日期的毫秒数。

## 继承方法
重写了Object的方法。
* `toLocaleString()`  返回本地环境一致的日期时间格式字符串。
* `toString()` 带时区信息的时间日期格式字符串。
* `valueOf()` 毫秒数。  **可以直接比较2个实例化的Date**

## 格式化方法
专门用于格式化日期的方法。
* `toDateString()`  周几、月、日、年
* `toTimeString()`  时、分、秒、时区
* `toLocaleDateString()`
* `toLocaleTimeString()`
* `toUTCString()` `UTC` 格式的日期。

## 日期/时间组件方法

`getYear`、`getDate`、`getHours`等 获取对应信息的`get`方法
`setYear`、`setDate`、`setHours`等 设置对应信息的`set`方法


# 正则RegExp

`JavaScript`是通过`RegExp`支持正则的，类似`Perl`的正则。  

`let expression = /patter/flags; `

## 匹配模式标记
* `g` 全局模式
* `i` 不区分大小写
* `m` 多行模式
* `y` 粘附模式，只查找从`lastIndex`开始及其之后的字符串。
* `u` `Unicode`模式
* `s` `dotAll`模式，表示元字符，匹配任何字符（`\n`或`\r`）


```javascript

let patter = /^182\d{8}$/; // 182开头的手机号
```

### 实例属性
* `global`  是否设置了 `g` 标记
* `ignoreCase`  是否设置了 `i` 标记
* `unicode` 是否设置了 `u` 标记
* `sticky` 是否设置了 `y` 标记
* `lastIndex` 源字符串下一次搜索的开始位置
* `multiline` 是否设置了 `m` 标记
* `dotAll` 是否设置了 `s` 标记
* `source` 正则字面量
* `flags` 正则表达式的标记字符串


### 实例方法

* `exec()` 配合捕获组使用， 返回额外属性 `index`和`input`，每次调用`exec`都会跟新`lastIndex`属性
* `test()` 返回`boolean`，是否匹配。

## RegExp静态属性

捕获组的属性 $开头的几个属性 
* `$_`、`$&`、`$+`、``$```、`$'`
* `$1~$9` 1~9个捕获组的匹配项


# 原始包装类型
为了方便操作原始值，`4`个特殊引用类型 `Boolean`、`Number`、`String`、`BigInt`     
每当用到某个原始值的方法和属性，后台都会创建一个相应的原始包装类型的对象，从而暴露出操作原始的各种方法，最后再销毁创建的对象。

## `Boolean`

原始布尔值和引用类型的布尔值。

## `Number`

### 原型方法

* `toFixed()` 设置小数位数，并自动舍入。
* `toExponential()` 科学计数法。
* `toPrecision()` 得到适当形式的值。

### 静态方法
* `isNaN()` 是否为`NaN`
* `isInteger()` 是否为整数
* `isSafeInteger()` 是否为安全数
* `isFinite()` 是否为有限数
* `parseFloat()` 转化浮动数
* `parseInt()` 转为整数


## `String`

字符串中包含双字节字符（不是单字节的`ASCII`字符），也会按照单字符来计算。  
`String`是由16位码元组成。使用了2种`Unicode`编码：`UCS-2`和`UTF-16`

### 原型方法
* 编码相关
    + `chartAt()` 返回给定索引位置的值。
    + `chartCodeAt()` 返回给定索引位置的值的字符编码。
    + `chartPointAt()` 返回给定索引位置的值的字符码点。
    + `normalize([NFD|NFC|NFKD|NFKC])` 返回对应规范形式的字符。 
* 操作方法
    + `concat()` 返回一个拼接后的字符串。
    + `slice()`、`substr()`、`substring()`返回一个提取的子串。
* 位置方法
    + `indexOf()`、`lastIndexOf()` 查找对应子串的位置。
* 包含方法
    + `startsWith()`、`endsWith()` 指定位置的子串是否为匹配的值。
    + `includes()` 查询指定位置开始的子串是否包含匹配的值。
* 首尾空白
    + `trim()` 返回一个去除了首尾空白的字符串。
    + `trimLeft()`、`trimRight()`
* 复制
    + `repeat()` 返回一个复制了指定次数的字符串。
* 填充
    + `padStart()`、`padEnd()` 首尾填充，直到满足长度条件。
* 迭代和解构
    + 迭代器迭代。属性`[Symbol.iterator]`获取到迭代器。
    + `for-of` 迭代，遍历字符串。
    + 展开操作符。
* 大小写
    + `toUpperCase()`、`toLocaleUpperCase()`  大写
    + `toLowerCase()`、`toLocaleLowerCase()`  小写
* 匹配方法
    + `match()` 和正则的 `exec()` 的返回值一样的。
    + `search()` 查找对应匹配的字符串，返回位置信息。
    + `replace()` 替换对应匹配的字符串。
* 比较
    + `localeCompare()` 按照字母顺序表按序比较。
* `HTML`方法
    + 返回一个标签包裹的字符串，一般不用。

### 静态方法
* `formCharCode()` 根据给定的`UTF-16`码元创造字符串中的字符。


# 单例内置对象

内置对象： 任何由`ECMAScript`实现提供的，与宿主无关，并在`ECMAScript`开始执行时就存在的对象。   
开发者不用显示的实例化内置对象，单例内置对象就是说在全局只有一个实例。

## `Global`

代码中不会显示的访问，事实上不存在全局变量和全局函数，在全局作用域中定义的变量和函数都会变成`Global`对象的属性。  
如 `isNaN()`、`parseInt()`、`parseFloat()`等。  
**其他任何的内置对象都时Global的属性。**

### URL编码方式
用于编码和解码统一资源标识符。

* `encodeURI()`、`encodeURIComponent()`  编码
* `decodeURI()`、`decodeURIComponent()`  解码

### `eval()` 方法

`eval()`就是一个完整的`ECMAScript`解释器。


### `window`对象

`window`对象就是在浏览器环境中`Global`的代理。


## `Math`对象

`Math`对象提供了辅助计算的属性和方法，是用于保存数学公式、信息和计算的地方。

_Math对象上提供的计算比JavaScript实现的要快。_

### 常用的属性
* `E` 自然对数`e`的值
* `PI` 圆周率的值

### 常用方法

* `random()` 得到一个0-1的随机数。
* `min()`、`max()` 得到最大最小值。
* `ceil()`、`floor()`、`round()`、`fround()`  舍入计算。
* `pow()` 幂运算。
* `abs()` 绝对值。
