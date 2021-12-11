文档对象模型`（DOM）`是`HTML`和`XML`文档的编程接口。

# 节点层级

任何`HTML`和`XML`文档都可用`DOM`表示为一个由节点构成的层级结构。

`DOM`总共有12种节点类型。

## Node类型

`Node`接口在`JavaScript`中被实现为`Node`类型。`JavaScript`中所有节点都继承自这个`Node`类型。

每个节点都有一个`nodeType`类型。

- `Node.ELEMENT_NODE`  1 元素节点
- `Node.ATTRIBUTE_NODE` 2
- `Node.TEXT_NODE`  3 文本节点
- `Node.CDATA_SECTION_NODE`  4
- `Node.ENTITY_REFERENCE_NODE`  5
- `Node.ENTITY_NODE`  6
- `Node.PROCESSING_INSTRUCTION_NODE`  7
- `Node.COMMENT_NODE`  8
- `Node.DOCUMENT_NODE`  9
- `Node.DOCUMENT_TYPE_NODE`  10
- `Node.DOCUMENT_FRAGMENT_NODE`  11
- `Node.NOTATION_NODE`  12

### 1.`nodeName`和`nodeValue`

保存着节点相关信息

### 2.节点关系

- `childNodes`属性 子元素 包含一个类数组的`NodeList`实例。实时集合
- `parentNode`属性 父元素。
- `previousSibling` `nextSibling`属性 相邻元素。
- `firstChild` `lastChild` 首个 末尾子元素。
- `hasChildNodes()` 返回`true` 节点存在子节点的。

### 3.操作节点

- `appendChild()` 在 `childNodes` 末尾添加节点。 若为存在的节点，会将其移动到指定位置。
- `insertBefore()` 在指定节点之后添加节点。
- `replaceChild()` 替换指定子节点。
- `removeChild()` 移除指定字节的节点。
- `cloneNode()` 克隆节点，传入`ture`表示深复制节点。只会复制节点不会复制节点上的JavaScript属性。
- `normalize()` 处理文档子树中的文本节点。

## `Document`类型

文档对象`document`是`HTMLDocument`实例（`HTMLDocument`继承自`Document`），表示整个`HTML`页面。

- `nodeType` 为 `9`
- `nodeName` `"#document"`
- `nodeValue` `null`
- `parentNode` `null`
- `ownerDocument` `null`
- 子节点为 `DocumentType`、`Element`、`ProcessingInstruction`或`Comment`类型。

### 子节点

- `document.documentElement` 属性获取 `<html>`元素。
- `document.body` 属性获取 `<body>`元素。
- `document.doctype` 属性获取 `<!doctype>`元素。

### 文档信息

- `document.title` 文档标题 可修改
- `document.URL`
- `document.referrer` 页面来源
- `document.domain`

### 定位元素

- `document.getElementById()` 获取指定`id`属性元素。
- `document.getElementsByTagName()` 获取指定标签元素，返回一个`HTMLCollection`实例。
- `document.getElementsByName()` 获取指定`name`类型的元素，返回一个`HTMLCollection`实例。单选按钮

### 特殊集合

- `document.anchors` 所有带`name`的`<a>`元素
- `document.applets` 所有`<applet>` 元素
- `document.forms` 所有 `<form>` 元素
- `document.images` 所有 `<img>` 元素
- `document.links` 所有带href的`<a>` 元素

### DOM兼容性检测

`DOM`有多个`Level`和部分。

`document.implementation`属性提供了浏览器`DOM`实现相关的信息和能力。

### 文档写入

- `write()`
- `writeIn()`
- `open()` 打开网页输出流
- `close()` 关闭网页输出流

## `Element`类型

- `nodeType` 为 `1`
- `nodeName` 大写元素标签名
- `nodeValue` `null`
- `parentNode` 为`Document`或`Element`对象
- `ownerDocument` 所在文档对象。
- 子节点为 `Element`、`Text`、`ProcessingInstruction`、`Comment`、`CDATASection`、`EntityReference`类型。

### `HTML`元素

标准属性

- `id` 唯一标识符
- `title` 额外信息，多以提示条形式展示。
- `lang` 语言代码。
- `dir` 书写方向。
- `className` `class`属性。

### 属性操作

- `getAttribute()` 获取
- `setAttribute()` 设置
- `removeAttribute()` 删除

### `attributes`属性

`Element`类型是唯一使用`attributes`属性的`DOM`节点类型。`attributes`属性包含一个`NamedNodeMap`实例，类似`NodeList`的实时集合。

- `getNamedItem()` 获取指定`name`的 `node` 节点
- `removeNamedItem()` 移除指定`name`的 `node` 节点
- `setNamedItem()` 添加 `node` 节点
- `item()` 返回索引位置的节点。

`attributes`属性 适用场景为迭代元素上的所有节点。

### 创建元素

- `document.createElement()`

### 元素后代

`childNodes` 包含元素所有子节点，包括其他元素，文本节点、注释、处理命令等。

## `Text`类型

- `nodeType` 为 `3`
- `nodeName` `"#text"`
- `nodeValue` 文本内容
- `parentNode` 为`Element`对象
- `ownerDocument` 所在文档对象。
- 不支持子节点

### 操作方法

- `appendData()` 最后添加
- `deleteData()` 删除
- `insertData()` 指定位置插入
- `replaceData()` 替换
- `splitText()` 拆分
- `substringData()` 提取

### 创建

- `document.createTextNode()`

## `Comment`类型

- `nodeType` 为 `8`
- `nodeName` `"#comment"`
- `nodeValue` 注释内容
- `parentNode` 为`Document`或`Element`对象
- `ownerDocument` 所在文档对象。
- 不支持子节点

与`Text`继承同一个基类`CharacterData`，拥有除了`splitText`之外所有Text节点的字符串操作方法。

## `CDATASection` 类型

- `nodeType` 为 `4`
- `nodeName` `"#cdata-section"`
- `nodeValue` `CDATA` 区块内容
- `parentNode` 为`Document`或`Element`对象
- `ownerDocument` 所在文档对象。
- 不支持子节点

只在`XML`中有效。

## `DocumentType`类型

- `nodeType` 为 `10`
- `nodeName` 文档类型名称
- `nodeValue` `null`
- `parentNode` 为`Document`对象
- `ownerDocument` 所在文档对象。
- 不支持子节点

`<!doctype html>`

## `DocumentFragment` 类型

唯一一个在标记中没有对应表示的类型，轻量级文档。

- `nodeType` 为 `11`
- `nodeName` `"#document-fragment"`
- `nodeValue` `null`
- `parentNode` 为`Document`对象
- `ownerDocument` 所在文档对象。
- 子节点可以是`Element`、`Text`、`ProcessingInstruction`、`Comment`、`CDATASection`、`EntityReference`类型。

## `Attr` 类型

- `nodeType` 为 `2`
- `nodeName` 属性名
- `nodeValue` 属性值
- `parentNode` null
- `ownerDocument` 所在文档对象。
- 子节点：`HTML`中不支持，`XML`中可以是`Text`或`EntityReference`。

使用`getAttribute`、`setAttribute`、`removeAttribute`来操作属性。

# `DOM` 编程

## 动态脚本

动态插入 `<script>`，通过`innerHtm`l插入`<script>`是不会被执行的。

## 动态样式

动态插入 `<link ref="stylesheet" type="text/css" href="style.css">`

动态插入 `<style>/* */</style>`

## 操作表格

`<table>` 的属性方法：

- `caption` 指向`<caption>`元素的指针。
- `tBodies` 包含`<tbody>`元素的`HtmlCollection`。
- `tFoot` 指向`<tfoot>`元素的指针。
- `tHead` 指向`<thead>`元素的指针。
- `rows` 包含所有行的  `HtmlCollection`
- `createTHead` 创建`<thead>`元素放入表格中，并返回引用。
- `createTFoot` 创建`<tfoot>`元素放入表格中，并返回引用。
- `createCaption` 创建`<caption>`元素放入表格中，并返回引用。
- `deleteTHead` 删除`<thead>`元素。
- `deleteTFoot` 删除`<tfoot>`元素。
- `deleteCaption` 删除`<caption>`元素。
- `deleteRow` 删除指定位置的行。
- `insertRow` 在指定行位置插入一行。

`<tbody>` 的属性方法：

- `rows`
- `deleteRow`
- `insertRow`

`<tr>`元素的属性和方法

- `cells` `<tr>`的 `HtmlCollection`。
- `deleteCell`
- `insertCell`

## 使用`NodeList`

`NodeList`对象和相关的 `NamedNodeMap`、`HTMLCollection`是理解`DOM`编程的关键。这个3种集合类型都是实时的，文档结构的变化会实时地在它们 身上反映出来。

限制操作NodeList的次数，每次查询都会搜索整个文档，最好把查询到的NodeList缓存起来。

# `MutationObserver`接口

`MutationObserver`接口，可以在`DOM`被修改时异步执行回调。使用这个接口可以观察整个文档，`DOM`树的一部分，或某个元素，还可以观察元素属性、子节点、文本。

## 基本用法

`MutationObserver`调用构造函数传入回调函数来创建。

### `observer`函数

参数：要观察的`DOM`节点和一个`MutationObserverInit`对象。

```javascript

let observer = new MutationObserver((mutations, observer) => {
    console.log("body class changed") // 
});
observer.observe(document.body, {
    attributes: true
})

document.body.className = "change"
console.log("change body class")

```

回调函数不是与DOM同步执行的。

### 回调和`MutationRecord`

每个回调都会收到一个`MutationRecord`实例的数组，包含的信息包括发生了什么变化，以及DOM的哪一部分收到了影响。  
回调执行前可能会同时发生多个满足观察条件的事件，每次执行回调都会传入一个包含入队`MutationRecord`实例数组。

```javascript

let observer = new MutationObserver((mutations, observer) => {
    console.log(mutations) // 
});
observer.observe(document.body, {
    attributes: true
})

document.body.className = "change"
document.body.id = "change"
console.log("change body class")
```

```typescript
type MutationRecordType = "attributes" | "characterData" | "childList"

interface MutationRecord {
    readonly addedNodes: NodeList; // childList类型的变化
    readonly attributeName: string | null; // attributes类型的变化 被修改属性的名字
    readonly attributeNamespace: string | null; // 命名空间attributes类型的变化 被修改属性的名字
    readonly nextSibling: Node | null; // childList类型的变化 节点变化后的同胞节点
    readonly oldValue: string | null;
    readonly previousSibling: Node | null;
    readonly removedNodes: NodeList;
    readonly target: Node; // 被影响的节点
    readonly type: MutationRecordType; // 变化的类型 
}
```

### `disconnect`方法

默认情况下，观察对象不被垃圾回收，`MutationObserver`回调就会响应`DOM`的变化事件，从而被执行。  
需要提前终止执行回调，可以调用 `disconnect`方法

### 复用 `MutationObserver`对象观察多个不同的目标节点，`MutationObserver`的target属性可以标识发生变化事件的目标节点。

```javascript

let observer = new MutationObserver((mutations, observer) => {
    console.log(mutations.map(value => {
        return value.target
    }))
});
let one = document.querySelector("#one");
let two = document.querySelector("#two");
observer.observe(one, {
    attributes: true
})
observer.observe(two, {
    attributes: true
})
one.className = "one"
two.className = "two"

setTimeout(() => {
    observer.disconnect() // 停止观察所有目标
    one.className = "one1"
    two.className = "two2"
}, 0)

```

### 重用 `MutationObserver`

`disconnect`方法并不会结束`MutationObserver`的生命，还可以通过调用`observer`来关联到新的目标节点。

## `MutationObserverInit`与观察范围

`MutationObserverInit`用于控制目标节点的观察范围。

```typescript

interface MutationObserverInit {
    attributeFilter?: string[]; // 是否观察哪些属性
    attributeOldValue?: boolean; // 是否记录旧的属性值
    attributes?: boolean; // 是否观察属性 默认false
    characterData?: boolean; // 修改字符数据 默认false
    characterDataOldValue?: boolean; // 
    childList?: boolean; // 修改子节点是否触发 默认false
    subtree?: boolean; //是否观察子树 默认false
}

```

在调用observer时 `attributes` `characterData` `childList` 至少有一个值为`true`，否则会抛出错误。

### 观察属性

`MutationObserver`可以观察节点的属性的增加、移除和修改。需要将`attributes`设置为`true`。

### 观察字符数据

`MutationObserver`可以观察文本节点 中字符的添加、删除和修改。需要将`characterData`设置为`true`。

```javascript
let observer = new MutationObserver((mutations) => {
    console.log(mutations)
})

let app = document.createElement("div");
let text = document.createTextNode("init")
app.append(text);
observer.observe(text, {
    characterData: true,
    characterDataOldValue: true
})
text.replaceData(0, 1, "change")
text.deleteData(0, 1)
text.textContent = "changed"
document.body.insertBefore(app, document.body.firstChild)
```

### 观察子节点

`MutationObserver`可以观察子节点的添加、删除。需要将`childList`设置为`true`。

```javascript

const app = document.createElement("div")
const btn = document.createElement("button")
btn.innerText = "交换"
const observer = new MutationObserver(mutations => {
    console.log(mutations)
});
observer.observe(app, {
    childList: true
});
const span = document.createElement("span")
const span2 = document.createElement("span")
span.innerHTML = "span1"
span2.innerHTML = "span2"
app.appendChild(span)
app.appendChild(span2)

btn.addEventListener("click", evt => {
    app.insertBefore(span2, span) // 报告次变化 span2 先被移除  后被添加
})

document.body.insertBefore(app, document.body.firstChild)
document.body.appendChild(btn);

```

### 观察子树

`MutationObserver`可以观察范围限定为一个元素及其子节点的变化，可以把观察范围扩展到这个元素的子树（所有后代节点）。需要将`subtree`设置为`true`。

```javascript

const body = document.body;
const app = document.createElement("div");
const btn = document.createElement("button")
const btn2 = document.createElement("button")
const app2 = document.createElement("div")
btn.innerText = "改变type"
btn2.innerText = "移动"

const observe = new MutationObserver(mutations => {
    console.log(mutations)
})
const sub1 = document.createElement("input");
app2.appendChild(sub1);
sub1.setAttribute("type", "input")
observe.observe(app2, {subtree: true, attributes: true, attributeOldValue: true})
sub1.setAttribute("type", "time")

app.appendChild(sub1);
sub1.setAttribute("type", "radio")

btn.addEventListener("click", ev => {
    sub1.setAttribute("type", "color")
})

btn2.addEventListener("click", ev => {
    if (app2.contains(sub1)) {
        app.appendChild(sub1)
    } else {
        app2.appendChild(sub1)
    }
})

body.append(app, btn, btn2, app2)

```

## 异步回调与记录队列

`MutationObserver`接口是出于性能考虑而设计的，其核心是异步回调与记录队列模型。每次变化的信息都会保存在`MutationRecord`实例中，然后添加到**记录队列**中。  
这个队列的每个`MutationRecord`实例都是唯一的，是所有`DOM`变化事件的有序列表。

### 记录队列

回调函数会接受到一个`MutationRecord`实例的数组，回调执行后这个记录队列就会被清空。

### `takeRecords`方法

`takeRecords`可以清空记录队列，并返回其中的队列。

```javascript
const observe = new MutationObserver(mutations => {
    console.log(mutations)
})
observe.observe(app2, {subtree: true, attributes: true, attributeOldValue: true})
//...
console.log(observe.takeRecords()) // 清空记录队列，并返回其中的队列。

```

## 性能、内存与垃圾回收

将回调委托给微任务来执行可以保证事件同步触发，避免随之而来的混乱。为`MutationObserver`而实现的记录队列，可以保证变化事件即使在被爆发式的触发，也不会显著地拖慢浏览器。
