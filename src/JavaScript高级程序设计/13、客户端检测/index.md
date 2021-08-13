各家浏览器之间存在着一些差异。客户端检测就是为了来减小这些差异。

# 能力检测

能力检测：在浏览器运行时使用一套简单的检测逻辑，测试浏览器是否支持某种特性。不要求知道浏览器信息，只需要检测是否支持某种能力。

## 安全能力检测

能力检测最有效的是：检测能力是否存在的同时，验证其是否能够展现出预取的能力。

- `typeof` 验证其是否为函数
- 在检测`IE`是要注意 `COM`对象实现的函数 `typeof` 返回 `object`。

## 基于能力检测进行浏览器分析

能力检测而非用户代理检测的优点：伪造用户代理字符串很简单，而伪造能够欺骗能力检测的浏览器器特性却很难。

### 特性检测

按照能力将浏览器归类。

```javascript
// 检测是否支持Netscape式的插件
let hasNSPlugins = navigator.plugins && navigator.plugins.length;
Object.prototype.toString.call(navigator.plugins) === "[object PluginArray]"
```

### 检测浏览器

根据对浏览器特性的检测并与已知特性对比，确定用户使用什么浏览器，这样可以获得比用户代码嗅探更准确。

```javascript

class BrowserDetector {
    constructor() {
        // IE6-IE10的条件编译
        this.isIE_Gte6Lte10 = /*@cc_on!@*/false;
        // IE7-IE11 测试documentMode
        this.isIE_Gte7Lte11 = !!document.documentMode;
        // Edge 20及以上版本  测试StyleMedia构造函数
        this.isEdge_Get20 = !!window.StyleMedia;

        // Firefox专有扩展安装API
        this.isFirefox_Gtel = typeof InstallTrigger !== "undefined";

        // 测试chrome对象 及其webstore属性。
        // Opera有些版本有chrome 属性但没有 window.chrome.webstore
        // 所有Chrome版本都支持 都有 window.chrome 但也不一定有window.chrome.webstore
        this.isChrom_Gtel = !!window.chrome  // && !!window.chrome.webstore;

        // Safari早期版本会给构造函数的标签追加 Constructor
        // window.Element.toString() // [object ElementConstructor]
        // Safari 3-9.1
        this.isSafari_Gte3Lte9_1 = /constructor/i.test(window.Element.toString());

        // 推送通知API暴露在window对象
        // 使用默认参数值以免对undefined调用toString
        // Safari 7.1及其以上版本
        this.isSafari_Gte7_1 = (({pushNotification = {}} = {}) => pushNotification.toString() === "[object SafariRemoteNotification]")(window.safari)

        // 测试addons属性
        // Opera20及其以上版本
        this.isOpera_Gte20 = !!window.opr && !!window.opr.addons;
    }

    isIE() {
        return this.isIE_Gte6Lte10 || this.isIE_Gte7Lte11;
    }

    isEdge() {
        return this.isEdge_Get20;
    }

    isFirefox() {
        return this.isFirefox_Gtel;
    }

    isChrome() {
        return this.isChrom_Gtel && !this.isOpera_Gte20;
    }

    isSafari() {
        return this.isSafari_Gte7_1 || this.isSafari_Gte3Lte9_1
    }

    isOpera() {
        return this.isOpera_Gte20;
    }
}

```

# 用户代理检测

通过`navigator.userAgent`来确定使用的是什么浏览器。

## 历史

`HTTP`规范：要求浏览器向服务器发送信息要包含浏览器名称和版本信息。

## 浏览器分析

用户代理检测：准确识别浏览器。
### 伪造代理
`navigator.userAgent` 是一个只读属性。但是可以通过属性计算属性`get`方法来改变其值。

### 分析浏览器

推断相关信息
- 浏览器
- 浏览器版本
- 浏览器渲染引擎
- 设备类型（PC或Mobile）
- 设备生成商
- 设备型号
- 操作系统
- 操作系统版本

可以使用第三方库来对浏览器相关信息进行获取：Browser、UAParse.js、Platform.js等


# 软件与硬件检测

现代浏览器提供了一组与计算机硬件和软件相关的`API`。不过还没有达到标准。

## 识别浏览器和操作系统

- `navigator.oscpu`操作系统/系统架构相关信息
- `navigator.vendor` 开发商信息
- `navigator.platform` 操作系统
- `screen.colorDepth`、`screen.pixelDepth` 显示器没像素颜色的位深
- `screen.orientation` 屏幕信息

## 浏览器元数据

- `navigator.geolocation` 暴露了 `Geolocation API`，浏览器感知设备地理位置信息。
   只有在通过`HTTPS`获取的脚本中可用。 
- `navigator.onLine` 获取联网状态。
  + `window.online` `window.offline` 联接 断开触发事件。
- `navigator.connection` 网络连接信息。
- `navigator.getBattery()` 设备电量和充电状态信息。

## 硬件

- `navigator.hardwareConcurrency` 浏览器可用并向执行的最大线程数量。
- `navigator.deviceMemory` 系统内存大小。
- `navigator.maxTouchPoints` 返回触摸屏支持的最大关联点数量。


# 小结

- 能力检测
- 用户代理检测


