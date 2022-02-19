`DOM`扩展的两个标准：`Selector API` 和 `HTML5`  

# `Selector API`
## `querySelector()`
接收一个`css`选择符，返回匹配的第一个元素，没有返回`null` 。
```javascript

let body = document.querySelector("body")
let choose = document.querySelector("ul#myUl > li.choose")
```

## `querySelectorAll()`

接收一个`css`选择符，返回一个`NodeList`实例，匹配的所有元素，没有返回一个空的`NodeList`实例。  
这个方法查询到的`NodeList`实例是一个“静态”的快照，并非“实时”的查询。

## `matches()`
接收一个`css`选择符，判断元素是否匹配该选择符，返回一个`Boolean`值。

# 元素遍历
`Element Traversal`为`DOM`元素添加了5个元素：（返回`Element`节点）  
- `childElementCount` 子元素个数。
- `firstElementChild` Element版的`firstChild`。
- `lastElementChild` Element版的`lastChild`。
- `previousElementSibling` Element版的`previousSibling`。
- `nextElementSibling` Element版的`nextSibling`。

# `HTML5`

## `CSS`类的扩展 

- `getElementsByClassName()`
接收一个参数，一个或多个类名字符串，返回一个`HTMLCollection`实例。
```javascript
document.getElementsByClassName("a b"); // 所有类名中包含a和b的元素

```

- `classList`属性
为一个`DOMTokenList`实例。
```typescript
DOMTokenList

interface DOMTokenList {
    readonly length: number; // 个数 只读
    value: string; // 该属性以 DOMString 的形式返回 DOMTokenList 列表的值。可修改
    toString(): string; // 该属性以 DOMString 的形式返回 DOMTokenList 列表的值。
    add(...tokens: string[]): void; // 添加
    contains(token: string): boolean; // 是否包含
    item(index: number): string | null; 
    remove(...tokens: string[]): void; // 异常
    replace(oldToken: string, newToken: string): void; // 替换
    supports(token: string): boolean; 
    toggle(token: string, force?: boolean): boolean;
    /**
     * 从 DOMTokenList 字符串中移除标记字串（token），并返回 false(force为false返回true)。
     * 如果传入的字串（token）不存在，则将其添加进去，并返回 true (force为false返回false)。
     **/
    forEach(callbackfn: (value: string, key: number, parent: DOMTokenList) => void, thisArg?: any): void;
    [index: number]: string;
}
```



## 焦点管理

- `document.activeElement` 属性值为有焦点的`DOM`元素。
- `document.hasFocus()` 判断是否拥有焦点。

## `HTMLDocument`扩展

- `readyState`属性，加载状态（值为 `loading, complete`）。  
- `compatMode`属性，渲染模式（值为 `CSS1Compate, BackCompate`）。
- `head`属性 指向文档的`<head>`元素。

## 字符集属性
`document.characterSet` 文档实际使用的字符集，可写。

## 自定义属性

`Element`元素 `data-`前缀的属性。  
如：
``  
可以通过`dataset`属性来访问，`DOMStringMap`实例。

```javascript
/* HTML
<div id="app" data-name="div" data-index="1"></div>
*/


let datas = document.getElementById("app").dataset
// 读取
datas.name // div
datas["index"] // 1

// 设置
datas.name = "other" 
```

## 插入标记

- `innerHTML`属性
返回或写入后代`HTML`字符串。
```javascript
let app = document.querySelector("#app")

// 返回所有后代的`HTML`字符串
console.log(app.innerHTML)

// 替换后代的`HTML`字符串
app.innerHTML = `<div class="${"ddd"}">${"sss"}</div>`

```

- `outerHTML`属性
返回或写入`HTML`字符串。（包含其本身）与`innerHTML`属性用法一样。

- `insertAdjecentHTML` 和 `insertAdjecentText`方法。
接收两个参数：要插入标记的位置，要插入的`HTML`元素或文本。
```typescript
// 位置
type InsertPosition = "beforebegin" | "afterbegin" | "beforeend" | "afterend";
```

### 内存和性能问题

在使用`innerHTML`属性、 `outerHTML`属性、`insertAdjecentHTML` 和 `insertAdjecentText`方法，最好先手动删除要被替换元素
上关联的事件和`JavaScript`对象。  

限制使用 `innerHTML`属性、 `outerHTML`属性。
```javascript
let str = ""

for(item in items) {
    str += `<li>${item}</li>`
}
ul.innerHTML = str
```

### 跨站点脚本

使用`innerHTML`属性等，要隔离要插入的数据，在插入数据前使用相关的库对它进行转义。防止`XSS`攻击。


##  `scrollIntoView()`
控制如何滚动页面中的某个区域的元素。

```typescript
function scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;

arg: {
    true; // 滚动到顶部
    false; // 滚动到底部
}
interface ScrollIntoViewOptions {
    block?: "center" | "end" | "nearest" | "start"; // 垂直方向上的对齐
    inline?: "center" | "end" | "nearest" | "start"; // 水平方向上的对齐
    behavior?: "auto" | "smooth"; // 过渡动画 
}

```

# 专有扩展
部分浏览器支持

## `children`属性

只包含元素`Element`类型的子节点的`HTMLCollection`实例。

## `contains()`方法

判断一个元素是否为另一个元素的后代。

## 插入标记
- `innerText`属性
- `outerText`属性

## 滚动
`scrollIntoViewIfNeeded()` 在元素不可见将其滚动到可见区域。参数为一个布尔值，不可见时是否滚动到视口中央。
