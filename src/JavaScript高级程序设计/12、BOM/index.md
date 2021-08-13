虽然`ECMAScript`把浏览器对象模型(`BOM`，`Browser Object Model`)描述为`JavaScript`的核心，但实际上`BOM`是使用`JavaScript`开发`Web`应用程序的核心。
`BOM`提供了`JavaScript`与网页无关浏览器功能对象，`BOM`由各大浏览器厂商实现，为Web开发提供了浏览器间互操作的基础。

# `windows`对象

`BOM`的核心是`windows`对象，表示浏览器实例。`windows`在浏览器中有两重身份，一个是`ECMAScript`的`Global`对象，另一个是浏览器窗口的`JavaScript`接口。
这意味着网页中定义的所有对象、变量和函数都能通过`windows`对象访问到。

## `Global`作用域

因为`window`对象被复用为`ECMAScript`的`Global`对象，通过`var`声明的所有全局变量和函数都会变成`window`对象的属性和方法。

`JavaScript`很多对象都暴露在全局作用域中，比如`location`和`navigation`

### 窗口关系

- `top`对象始终指向最上层窗口，即浏览器本身。
- `parent`对象始终指向当前窗口的父窗口，如果当前窗口是最上层窗口，则`parent`等于`top`，都等于`window`。最上层的`window`对象如果不是通过`window.open`打开的，那么其`name`
  属性就不会包含值。
- `self`对象是终极`window`对象始终指向`window`。

### 窗口位置和像素比

`window`对象可以通过`screenLeft`和`screenTop`属性来确定窗口相对于屏幕左侧和顶部的位置，返回值的单位是`css`像素。 可以使用`moveTo(x,y)`和`moveBy(x,y)`
来移动窗口，这些方法一般会被浏览器禁用。

#### 像素比

`CSS`像素是`Web`开发中使用的统一的像素单位。这个单位的背后其实是一个角度`0.0213°`。如果屏幕距离人眼是一臂长，则以这个角度计算的`CSS`像素大小为`1/96`
英寸。这样定义像素大小是为了在不同设备上统一标准。其中物理分辨率和`CSS`像素之间的转化比率由`window.devicePixeRatio`提供（物理像素与逻辑像素之间的缩放比率。）。

### 窗口大小

- `outerWidth`和`outerHeight`返回浏览器窗口自身的大小。
- `innerWidth`和`innerHeight`返回浏览器窗口中页面视口的大小。
- `document.documentElement.clientWidth|clientHeight`返回页面视口的高度和宽度。

可以通过`resizeTo(x,y)`和`resizeBy(x,y)`来缩放窗口，这两个属性一般也是被禁用的。

### 视口位置

度量文档相对于视口滚动距离的属性：

- `window.pageXoffset/window.scrollX`
- `window.pageYoffset/window.scrollY`

滚动页面的方法

- `scrollBy(x,y)`相对当前视口。
- `scrollTo(x,y)`滚动到指定位置。

也可以接受一个`ScrollToOptions`字典。

```typescript
interface ScrollToOptions {
    left: number,
    top: number,
    behavior: "smooth" | "auto" // 是否平滑滚动
}
```

### 导航和新打开窗口

#### 弹出窗口

`window.open`可以用来导航到指定的`URL`，也可以用于打开新窗口。 接受4个值：

- 要加载的URL。类似`a`标签的`href`
- 目标窗口。类似`a`标签的`target`
- 特性字符串。逗号分割的设置字符串，如：`height=400,width=400,left=300,top=0`
- 新窗口在历史记录中是否代替当前加载页面的布尔值。

`window.open` 返回一个新建窗口的引用，方便对新窗口进行控制。

```javascript
if (window.name !== "topFrame") {
    let wroWin = null;
    wroWin = window.open("./", "topFrame", "height=500,width=500,left=150,top=150,Menubar='no',status='no',resizeable='no'", false);

    setTimeout(() => {
        wroWin.moveTo(500, 500);
    }, 5000);
    setTimeout(() => {
        wroWin.close();
        console.log(wroWin.closed);
    }, 5000);

    console.log(wroWin.opener === window) // 打开它的窗口
} else {
    setTimeout(() => {
        window.top.close() // 新窗口关闭自己 
    }, 2000)
}

```

新建窗口有指向打开它的窗口指针，但反之则没有。窗口是不会跟踪自己打开的新窗口。

#### 安全限制

被广告滥用，加了安全限制。

浏览器会在用户操作下才允许创建弹窗，在非用户操作时调用`window.open`时是会被浏览器拦截的。

#### 程序屏蔽弹窗

当`window.open`被屏蔽时可能会返回null或抛出错误。

```javascript
// 封装为屏蔽返回null
function WinOpen(...rest) {
    try {
        return window.open(...rest) // 返回null或抛出错误
    } catch {
        return null
    }
}

```

### 定时器

`JavaScript`在浏览器中是单线程执行的，但允许使用定时器指定在某个时间之后或隔一段时间就执行相同的代码。

- `setTimeout` 指定时间后执行某些代码。 `clearTimeOut` 取消执行。
- `setInterval` 间隔一段时间执行某些代码。`clearInterval` 取消执行。

参数

- 指定执行的代码 为一个函数。
- 毫秒数。
    + `setInterval` 到了间隔时间后浏览器就会把任务添加到执行队列，并不会关心执行花了多长时间。执行时间短、非阻塞的回调函数比较适合`setInterval`。

在实践中一般常用setTimeout来模拟`setInterval`，因为上一个任务结束和下一个任务开始的时间间隔是无法保证的，有些循环任务可能因此被跳过。

```javascript

async function mySetInterval(handler = async () => "stop", timeout = 0) {
    const p = await handler();
    const runner = async () => {
        (await handler()) !== "break" && setTimeout(runner, timeout)
    };
    p !== "break" && setTimeout(runner, timeout);
}

let i = 60;
mySetInterval(async () => {
    if (i >= 0) {
        await sleep(1000); // 等待程序执行完毕再执行下一个延时任务
        console.log(i);
        i--;
        return "continue";
    }
    return "break";
});

function sleep(time = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    })
}

```

### 系统对话框

浏览器系统对话框：`alert`、`confirm`、`promt`。都是同步的模态对话框，在执行时，代码会立即停止，结束后代码才继续执行。可能被用户禁用。

`find`、`print` 这两个对话框都是异步显示的，控制权立即返回给脚本。用户在浏览器菜单上选择”查找“和”打印“时显示的就是这两种对话框。不会返回操作信息，不会被用户禁用。  
`find`没效果。

# `location`对象

`location`提供了当前窗口中加载文档的信息，以及导航功能，它既是`window`的属性，又是`document`的属性。

`location`对象内容如下：

- `hash` 锚点 `#content`
- `host` 服务器名:端口 `www.xx.com:8080`
- `hostname` 服务器名
- `href` 完整`URL`
- `pathname` 路径
- `port` 端口
- `protocol` 协议 `https:`
- `search` 查询字符串 `?name=aa&age=10`
- `username` 域名前指定的用户名
- `password` 域名前指定的密码
- `origin` `protocol`+`hostname`

## 查询字符串

将查询字符串转化为`json`可以使用自定义函数或`URLSearchParams`

```javascript

function getSearchToJson(str = location.search) {
    if (str.length > 0) {
        if (URLSearchParams) {
            const qs = new URLSearchParams(str);
            return Object.fromEntries(qs);
        }
        const obj = {}
        str = str.substring(1)
        str.split("&").forEach(value => {
            value = value.split("=");
            obj[value[0]] = value[1]
        })
        return obj;
    }
    return null
}

console.log(getSearchToJson("?name=lise&age=20")) // {name:"lise", age:'20'}

```

将`json`转化为查询字符串

```javascript

function jsonToSearch(json = {}) {
    let str = "?"
    if (json) {
        if (URLSearchParams) {
            const search = new URLSearchParams(json)
            return str + search.toString()
        } else {
            for (let [key, val] of Object.entries(json)) {
                str += `${encodeURIComponent(key)}=${encodeURIComponent(val.toString())}&`
            }
            return str.slice(0, -2);
        }
    }
    return str
}

console.log(jsonToSearch({name: 10, age: 20, sort: [1, 2, 3, 4]})) // ?name=10&age=20&sort=1%2C2%2C3%2C4

```

## 操作地址

- `location.assign` 会增加历史记录。

+ `location.assign(url)` 方法传入一个`URL`
+ `window.location=url`
+ `location.[href|host|pathname|port|...]=str`

- `location.replace(str)` 不会增加历史记录 重定向到另一个页面
- `location.reload(boolean)` 重新加载页面，参数为是否服务器中加载，最好将其作为最后一行代码。

# `navigator`对象

`navigator` 实现了`NavigatorID`,`NavigatorLanguage`,`NavigatorOnLine`,`NavigatorContentUtils`,`NavigatorStroage`
,`NavigatorStroageUtils`,
`NavigatorConcurrentHardware`,`NavigatorPlugins`,`NavigatorUserMedia`接口定义的属性和方法。

标准属性 （一些尚未实现或存在兼容问题）

- `activeVrDisplays` 返回数组，包含 `ispresenting` 为`true`的`VRDisplay`实例。 _实验中的功能_。
- `appCodeName` 返回 `Mozilla`。
- `appName` 浏览器全名。
- `appVersion` 浏览器版本，通常与当前版本不一致。
- `getBattery()` 获取电量信息,返回一个`Promise`。`battery`属性的替代。
- `buildID` 构建编号，未得到支持。
- `connection` 获取设备的网络连接信息。
- `cookieEnabled` 是否启用`cookie`。
- `credentials` 接口暴露了请求凭证的方法。提供了请求 `credentials` 和通知用户代理（当成功登陆或登出事件发生时）的方法。
- `deviceMemory` 返回`GB`为单位的设备内存容量。
- `doNotTrack` 返回用户的`do-not-track`设置,如果用户不允许网站,内容和广告等进行跟踪,则该值为`yes`.
- `geolocation` 返回一个 `Geolocation` 对象，通过这个对象可以访问到设备的位置信息。
- `getVRDisplays()` 返回数组，可用的每个`VRDisplay`实例。 _实验中的功能_。
- `getUserMedia()` 可用媒体设备关联的流。
- `hardwareConcurrency` 设备处理器核心数。
- `javaEnabled()` 浏览器是否启用`java`。
- `language` 浏览器的主语言。
- `languages` 浏览器偏好的语言数组。
- `locks` 返回一个LockManager对象，该对象提供用于请求新Lock对象和查询现有Lock对象的方法。 _实验中的功能_
    + `request()` 请求一个Lock带有指定其名称和特征的参数的对象。
    + `query()` 返回用一个`Promise<LockManagerSnapshot>`，其中包含有关持有和挂起的锁的信息。
- `mediaCapabilities` 返回一个`MediaCapabilities`，公开关于给定格式的解码和编码功能以及由`MediaCapabilities` `API`定义的输出功能的信息。 _实验中的功能_
- `mediaDevices` 返回一个 `MediaDevices` 对象，该对象可提供对相机和麦克风等媒体输入设备的连接访问，也包括屏幕共享。 _实验中的功能_。
    + `ondevicechange` 监听设备变化。
    + `enumerateDevices()` 返回一个`Promise`，获取有关系统中可用的媒体输入和输出设备的一系列信息。
    + `getSupportedConstraints()` 该对象指明了 MediaStreamTrack 接口支持的可约束的属性。
    + `getDisplayMedia()` 提示用户选择显示器或显示器的一部分（例如窗口）以捕获为MediaStream 以便共享或记录。返回解析为`MediaStream`的`Promise`。
    + `getUserMedia()` 在用户通过提示允许的情况下，打开系统上的相机或屏幕共享和/或麦克风，并提供 `MediaStream` 包含视频轨道和/或音频轨道的输入。
- `maxTouchPoints` 返回设置触屏模式支持的最大接触点。
- `mimeTypes` 返回浏览器中注册的MIME类型的数据。
- `onLine` 设备是否联网。
- `oscpu` 返回当前操作系统名。_不属于任何标准 未实现_
- `permissions` 返回一个可用于查询或更新某些`APIs`（由`Permissions API`覆盖）的权限状态的对象。 _实验中的功能_
- `platform` 浏览器系统平台。
- `plugins` 浏览器安装的插件数组。
- `product` 产品名，通常为`Gecko`。
- `productSub` 产品的额外信息，通常为`Gecko`的版本。
- `registerProtocolHandler(scheme, url, title)` 为网站注册为一个特定协议的处理程序。
- `navigator.requestMediaKeySystemAccess(keySystem, supportedConfigurations)`
  返回`Promise<MediaKeySystemAccess>`，该对象可用于访问特定媒体密钥系统，该系统又可用于创建用于解密媒体流的密钥。 此方法是`Encrypted Media Extensions API`
  的一部分，它为网络带来了对加密媒体和受 DRM 保护的视频的支持。
- `sendBeacon(url, data)` 可用于通过HTTP将少量数据异步传输到Web服务器。  
  使用户代理在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的载入性能。 这就解决了提交分析数据时的所有的问题：数据可靠，传输异步并且不会影响下一页面的加载。
  这个方法主要用于满足统计和诊断代码的需要，这些代码通常尝试在卸载（`unload`）文档之前向`web`服务器发送数据。
- `serviceWorker` 返回 关联文件 的 `ServiceWorkerContainer` 对象，它提供对`ServiceWorker` 的注册，删除，升级和通信的访问。
- `share(data)` 通过调用本机的共享机制作为`Web Share API`的一部分。 _实验中的功能_
- `canShare(data)` 如果对`navigator.share()` 的调用成功，则`Web Share API`的`navigator.canShare()`方法将返回true。 _实验中的功能_
- `storage` 返回单一`StorageManager`使用对象来访问浏览器的整体存储能力为当前网站或应用程序。返回的对象使可以检查和配置数据存储的持久性，并了解浏览器大约有多少空间可用于本地存储。
- `userAgent`、`userAgentData` 返回用户代理字符串或对象。
- `vendor`、`vendorSub` 返回浏览器厂商信息。
- `vibrate(pattern)` 使设备（有震动硬件）产生有频率的震动。
- `webdriver` 检查是否被自动化程序控制。

- `bluetooth`  蓝牙相关APIs。
- `clipboard` 该属性返回一个可以读写剪切板内容的 `Clipboard` 对象。 在 `Web` 应用中，剪切板 `API` 可用于实现剪切、复制、粘贴的功能。

navigator通常用于确定浏览器类型。

## 检测插件

检测浏览器是否安装了某个插件。都可以通过`plugins`数组来确定，数组每一项都包含：

- `name` 插件名称。
- `description` 插件介绍。
- `filename` 插件文件名。
- `length` 当前插件处理的`MIME`类型数量。

```javascript

const hasPlugin = (name) => {
    name = name.toLowerCase();
    for (let plugin of window.navigator.plugins) {
        if (plugin.name.toLowerCase().includes(name)) {
            return true
        }
    }
    return false
}

const hasIEPlugin = (name) => {
    try {
        new ActiveXObject(name)
        return true
    } catch {
        return false
    }
}

```

`plugins`有一个`refresh`方法，刷新`plugins`属性以反应新安装的插件，可用传入一个布尔值，表示是否刷新页面。

## 注册处理程序

`registerProtocolHandler(scheme, url, title)`把一个网站注册为处理某种特定类型信息应用程序。将`Web`应用程序注册为像桌面软件一样的默认应用程序。

三个参数

- 要处理的协议（如:`mailto`|`ftp`）。
- 要处理该协议的`URL`。
- 应用名称。

```javascript

navigator.registerProtocolHandler(
    "mailto",
    "https://www.somemailclient.com?cmd=%s", // %s表示原始的请求
    "Some Mail Client"
)

```

# `screen` 对象
`screen`保存的是客户端能力的信息，浏览器窗口外面的客户端显示器的信息。

- `availHeight` 屏幕像素高度减去系统组件高度。
- `availLeft` 没有被系统组件占用的屏幕的最左侧像素。
- `availTop` 没有被系统组件占用的屏幕的最顶端像素。
- `availWidth` 屏幕像素宽度减去系统组件高度。
- `colorDepth` 屏幕颜色的位数，多系统为32位。
- `height` 屏幕像素高度。
- `left` 当前屏幕左边的像素距离。
- `pixelDepth` 屏幕的位深。
- `top` 当前屏幕顶端的像素距离。
- `width` 屏幕像素宽度。
- `orientation` 返回`Screen Orientation API`中屏幕的朝向。


# `history`对象
`history`对象表示当前窗口的用户的导航历史信息。
处于安全考虑，这个对象不会暴露用户访问过的`URL`，但可以通过它在不知道实际`URL`的情况下前进和后退。


## 导航
- `go(string|number)`方法可以在用户记录中沿着任何方向进行导航。(导航到最近的`string`页面)。
- `back()` 后退 `go(-1)`。
- `forword()` 后退 `go(1)`。
- `length` 历史记录的条数。

## 历史状态管理

- `hashchange事件`会在页面`URL`的锚点变化时触发。并去执行某些操作。
- `histoty.pushState()` 方法可以在改变浏览器`URL`情况下不重新刷新页面。  
  参数：
  + 一个`state`对象。为了防止滥用，大小控制在`500KB~1MB`之内。
  + 一个新状态的标题。
  + 一个可选的相对`URL`。  
  `histoty.pushState()` 会触发`window`对象上的`popstate`事件，事件对象上有一个state属性，其中包含`pushState`第一个参数传入的`state`对象。
- `histoty.replaceState()`，会更新状态不会创建新历史记录，只会覆盖当前状态。

使用`HTML5`的状态管理，要确保`history`所有的`url`都在服务器上有一个可访问的地址，否则在刷新时会导致`404`，
所有的单页应用`SPA`框架都必须通过服务器或客户端某些配置来解决这个问题。

# 小结
浏览器对象模板`BOM`是以`window`对象为基础的，这个对象代表了浏览器和页面可见的区域。
- 要引用其他`window`对象，可以使用不同的窗口指针。
- 通过`location`对象可以以编程方式操纵浏览器的导航系统。通过设置这个对象上的属性，可以改变浏览器`URL`信息。
- 使用`replace`方法可以替换浏览器历史记录中当前显示的页面，并导航到新`URL`。
- `navigator`对象提供关于浏览器的信息，提供的信息类型取决于浏览器。
- `screen`对象中保存着客户端显示器的信息。
- `history`对象提供了操纵浏览器历史记录的能力。
