`JavaScript`与`HTML`交互是通过事件实现的。在事件发生是执行监听器订阅事件。观察者模式。

# 事件流

## 事件冒泡

`IE`事件流 被称为事件冒泡：事件被定义从最具体的元素开始触发到，然后向上传播到`document`对象。  
现代浏览器会一致冒泡到`window`对象。

## 事件捕获

事件捕获：从最外层的节点接收到事件，让后向下传播到具体的节点。可以在事件在到达最终目标前进行拦截。  
所有的浏览器都是从`window`对象开始捕获事件。DOM2规定从`document`对象开始。  
旧版浏览器不支持事件捕获，建议使用事件冒泡，特殊情况使用事件捕获。

## `DOM`事件流

`DOM`事件流分为3个阶段：事件捕获、到达目标、事件冒泡。  
事件捕获可以提前拦截事件。   
事件冒泡最迟在这个阶段响应事件。

# 事件处理程序

## `HTML` 事件处理程序

以`HTML`属性来指定事件处理程序。

```html
<input type="text" oninput="console.log(this.value)">
```

## `DOM0` 事件处理程序

把一个函数赋值给`DOM`元素的一个事件处理程序属性。

```javascript
document.getElementById("app").onclick = function (ev) {
} // 赋值
document.getElementById("app").onclick = null // 移除
```

## `DOM2` 事件处理程序

- `addEventListener(type, handler, options)` 添加 第三个参数是否捕获阶段，默认为冒泡阶段。
- `removeEventListener(type, handler)` 移除

## `IE`事件处理程序

- `attachEven(on+type, handler)` 添加
- `detachEvent(on+type, handler)` 移除

# 事件对象

在`DOM`中发生事件，所有相关的信息都会被收集存储到一个`event`对象中。

## `DOM`事件对象

`event`对象是传递给事件处理程序的参数。

所包含的公共属性和方法：

- `bubbles` 是否为冒泡
- `cancelable` 是否可以取消事件的默认行为
- `defaultPrevent` 是否调用了`preventDefault()`
- `preventDefault()` 取消默认行为
- `stopImmdiatePropagation()` 取消后续事件捕获或冒泡，并阻止调用任何后续事件处理程序
- `stopPropagation()` 取消后续事件捕获或冒泡
- `currentTarget`  当前事件处理处理所在的元素
- `target` 事件目标，事件在那个具体元素上触发的
- `type` 事件类型
- `trusted` 事件是否为浏览器生成的
- `View` 与事件相关的抽象视图，等于事件发生的`window`对象


## `IE`事件对象

使用了标签属性绑定的事件，`event`对象为`window`上的`event`属性。

```javascript
let app = document.getElementById("app")
app.onclick = function () {
    let event = window.event;
}

app.attachEvent("onclick", function (event) {
    
})

```

所包含的公共属性和方法：

- `cancelBubble` 设为 `true` 为取消冒泡，类似 `stopPropagation()`
- `returnValue` 设为 `false` 为禁止默认行为，同 `preventDefault()`
- `srcElement` 事件目标 同 `target`
- `type` 事件类型


# 事件类型
`DOM3 Events`定义了如下事件类型：
- 用户界面事件 与`BOM`交互的通用浏览器事件
- 焦点事件 元素获取和失去焦点时触发
- 鼠标事件 鼠标在页面执行某些操作触发
- 滚轮事件 使用鼠标滚轮或类似设备触发
- 键盘事件 键盘在页面上执行某些操作触发
- 输入事件 文档中输入文本触发
- 合成事件 使用某种输入法编辑器输入字符时触发

`HTML5`还定义了，浏览器通常在在`DOM`和`BOM`上实现专有事件。

## 用户界面事件  
- `load` 页面或元素加载完成后触发
- `unload` 页面或元素卸载完成后触发
- `resize` 窗口缩放时触发
- `scroll` 在包含滚动条元素上触发
- `abort` 终止下载时触发
- `error` 加载错误触发
- `select` 文本框上选择字符时触发

## 焦点事件  
`document.hasFocus()`和`document.activeElement`获取用户在页面中的焦点信息
- `blur` 失焦触发
- `focus` 聚焦触发
- `focusin` 聚焦触发
- `focusout` 失焦触发

## 鼠标事件

- `click` 单击主键
- `dbclick` 双击主键
- `mousedown` 按下任意鼠标键触发
- `mouseup` 释放任意鼠标键触发
- `mouseenter` 光标进入元素
- `mouseleave` 光标离开元素
- `mousemove` 光标在元素上移动
- `mouseout` 光标从一个元素到另一个元素
- `mouseover` 光标从元素外部到元素内部

### 修饰键
修饰键一般有`Shift`、`Ctrl`、`Alt`、`Meta`


## 滚轮事件

- mousewheel事件 使用滚轮时触发

## 键盘事件
- `keydown` 按下某个键触发
- `keyup` 释放某个键触发
- `keypress` 释放某个键并产生字符触发

## 输入事件
- `textInput` 只可以在编辑区域触发 

## 合成事件

- `compositionstart` 在IME的文本合成系统打开时触发
- `compositionupdate` 新字符插入输入字段触发
- `compositionend` 在IME的文本合成系统关闭时触发

## `HTML5`事件

- `contextmenu` 上下文菜单事件
- `beforeunload` 页面卸载时触发
- `DOMContentLoaded` `DOM`树构建后立即触发
- `readystatechange` 提供文档或元素加载状态的信息
- `pageshow` `pagehide` 页面显示和隐藏触发
- `hashchange` 锚点变化时触发

## 设备事件
设备事件 确定用户使用设备的方式

- `orientationchange` 设备垂直或水平变化触发 `window.orientation`确定方向
- `deviceorientation` 获取设备的加速计信息
- `devicemotion` 设备移动触发

## 触摸及手势信息

### 触摸事件
- touchstart 接触
- touchmove 移动滑动
- touchend 离开
- touchcancel 停止跟踪触摸触发

### 手势事件
- `gesturestart` 接触
- `gesturechange` 位置变化
- `gestureend` 离开



# 内存与性能

## 事件委托
利用冒泡机制，可以只使用一个事件处理程序来管理一种类型的事件。整个页面指定一个`click`事件处理程序，不用为每个点击元素分别指定事件处理程序。
## 删除事件处理程序
把事件处理程序指定给元素后，浏览器代码和负责页面交互的`JavaScript`代码之间就建立了联系，这种联系越多，页面性能就越差。及时删除不用的事件处理程序。  

在删除带有事件处理程序的元素，如果被删除的元素上带有事件处理程序，就不会被垃圾收集程序正常清理。

在卸载页面时，如果事件程序没有被清理掉，则它们仍然会残留在内存中，一般来说最好在onunload事件中趁页面尚未卸载先删除所有事件处理程序。

# 模拟事件
事件就是为了表示网页中某个有意义的时刻。事件由用户交互式或浏览器功能触发，JavaScript在任何时候触发任意事件，这些事件会被当成浏览器创建的事件。

## DOM事件模拟
使用`document.createEvent()`创建一个`event`对象。

### 模拟鼠标事件
使用 `initMouseEvent()` 来初始化`event`对象。   
`dispatchEvent()` 来触发事件。
### 模拟键盘事件
使用 `initKeyborderEvent()` 来初始化`event`对象。   
`dispatchEvent()` 来触发事件。

### 模拟其他事件
使用 `initEvent()` 来初始化`event`对象。   
`dispatchEvent()` 来触发事件。

### 自定义`DOM`事件
自定义事件不会触发原生`DOM`事件，可以让开发者自定义自己的事件。

## `IE`事件模拟

`IE`使用`document.createEventObject()`创建一个`event`对象。  
设置属性来初始化事件对象。  
使用`fireEvent()`来触发事件。
