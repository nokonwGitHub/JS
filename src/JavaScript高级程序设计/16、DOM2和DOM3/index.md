`DOM1`主要定义了`HTML`和`XML`文档的底层结构。`DOM2`和`DOM3`在这些结构之中加入了更多的交互能力，提供了更高级额`XML`特性。  

`DOM2`和`DOM3`是按照模块化定制标准的，主要分为：
- `DOM Core` `DOM1`核心的基础上为节点增加了方法和属性。
- `DOM View` 定义基于样式信息的不同视图。
- `DOM Event` 定义通过事件实现`DOM`文档交互。
- `DOM Style` 定义一编程方式访问和修改`CSS`样式的接口。
- `DOM Traversal and Range` 新增遍历`DOM`文档及选择文档内容的接口。
- `DOM HTML` 在`DOM1 HTML`基础上，增加属性、方法和接口。
- `DOM Mutation Observers` 定义基于`DOM`变化触发回调的接口。

# `DOM`的演进
## `DocumentType`的变化
新增 `publicId`、`systemId`、`internalSubset`

## `Document`的变化
### `importNode()`方法
从其他文档获取一个节点并导入到新文档。 
### `defaultView`属性
指向当前拥有文档的窗口。


## `Node`的变化

### `isSameNode()`和`isEqualNode()`
比较节点的方法

### `setUserData()`和`getUserData()`
为节点附加额外的数据提供操作。

## `iframe` 内嵌窗格的变化
### `contentDocument`属性
内嵌窗格的`document`对象
### `contentWindow`属性
内嵌窗格的`window`对象


# 样式  
`HTML`中有3种样式：外部样式表、文档样式表、元素特定样式。  
## 存取元素样式  
元素对象通过`style`属性获取和调整`style`上的样式。

### `DOM`样式 `style` 的属性和方法  
- `cssText` 获取或重写`style`属性中的`CSS`代码。
- `length` 元素`CSS`属性的数量
- `parseRule` `CSS`信息的`CSSRules`对象
- `getPropertyPriority(propertyName)` `CSS`属性使用了`!important` 返回 `important`，否则返回空字符串。
- `getPropertyValue(propertyName)` 获取属性对应的值
- `removePropertyValue(propertyName)` 删除属性
- `setPropertyValue(propertyName, value, priority)` 设置属性的值

### 获取计算样式
`document.defaultView.getComputedStyle(elt, pseudoElt)`获取计算样式的元素和伪元素字符串。  
所有的计算样式都是只读的，不能修改`getComputedStyle`方法返回的对象。

## 操作样式表
`CSSStyleSheet`类型表示`CSS`样式表（`link`和`style`元素定义的样式表）。  

## 元素尺寸

### 偏移量

- `offsetHeight` 元素的在垂直方向上占用的像素数。
- `offsetLeft` 元素边框距离左外内侧的像素数。
- `offsetTop`
- `offsetWidth`
- `offsetParent` 包含这个元素的外部父元素 

### 客户端尺寸
`content` + `padding`的值
- `clientHeight` 
- `clientWidth` 

### 滚动尺寸

- `scrollHeight` 没有滚动条出现前 元素内容的总高度。
- `scrollLeft` 左侧隐藏的像素数。
- `scrollTop`
- `scrollWidth`


### 确定元素尺寸

`getBoundingClientRect()` 获取元素在页面中相对于视口的位置。


# 遍历

`NodeIterator`和`TreeWalker` 用于遍历`DOM`结构。  
`TreeWalker`为遍历`DOM`提供了更大的灵活性。

# 范围
为了支持对页面更加细致地控制。可以用于在文档中选择内容，不考虑节点之间的限制。  
`document.createRange()`







