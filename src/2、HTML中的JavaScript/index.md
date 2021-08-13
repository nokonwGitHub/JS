`JavaScript`的出现就是为了在网页中使用，如何在`HTML`中使用成了一个问题，在引入`JavaScript`时不会导致HTML在浏览器中的渲染不会出问题。后来就提出了script标签。

# `script` 标签

这个是由网景公司创造的。`script`不仅仅可以写 `JavaScript`。`script` 可以写任何语言，就看浏览器是怎么去支持了。目前浏览器主要还是支持的是`JavaScript`。不过这个标签也给未来浏览器支持其他语言提供了一个容器。  

## 8个属性：
* `async`：立即开始下载脚本，单不能阻止其他页面动作，如下载资源或等待其他脚本加载。只对外部脚本有效。没用过。  
* `charset`：指定代码字符集，没用过。  
* `crossorigin`：设置请求的`CORS`跨域资源共享的。`CND`内容分发网络  一般会用的，还是常见的。
* `defer`：文档解析和显示完后再执行脚本，外部脚本。 不咋用，
* `integrity`：对比接收到的资源和这个属性指定的加密签名以验证子资源完整性。可以确保`CDN`不会提供恶意内容。好像存在兼容问题，没用过。
* `language`：被`type`代替了，已经废弃了。
* `type`：脚本语言的内容类型，**`module`**的话可以使用`import`和`export`关键字实现模块化。
* `src`：外部脚本的位置，简直是标配。

在写行内脚本时要注意 不用在代码中出现 `</script>`要转义一下 `<\/script>`。现在基本都是写外部脚本文件。

## 标签位置
一般放在`body`后边。

## 动态加载脚本
这是之前一些前端模块化类库`requireJS`和`seaJS`实现的一个基本原理，当然它们都有其一套自己的设计理念。  
`webpack`、`gulp`的打包在引入其他模块时也是动态加载一个脚本。

```javascript
    let module = {} // 存放各个模块到处的信息
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            let script = document.createElement("script");
            script.src = src;
            script.async = false;
            script.onload = function () {
                resolve(module)
            };
            document.head.appendChild(script);
            document.head.removeChild(script);
        })
    }
    
    loadScript("./out.js").then(module => {  //导入模块
        console.log(module["out.js"].outVal)
        module["out.js"].outFun()
        setTimeout(() => {
            clearInterval(module["out.js"].outInterval)
        }, 5000)
    })
```
```javascript

let outVal = "outVal";

function outFun() {
    console.log("outFun")
}

const app = document.querySelector("#app")

const outInterval = setInterval(() => {
    let div = document.createElement("div")
    div.innerText = new Date().toString();
    app.appendChild(div)
}, 1000)


module["out.js"] = { //导出模块
    outVal,
    outFun,
    outInterval
}
 
```

这种方式获取的资源对浏览器的加载器是不可见的，会影响它们在资源获取队列中的优先级。想要让加载器知道这些请求文件的存在可以在头部显示的增加。

`<link rel="preload" href="./out.js" as="script">`


# 行内代码和外部文件

使用外部文件：  
* 可维护性  独立开发不同的功能。
* 缓存  浏览器会将其缓存起来，下次访问使用缓存的`JavaScript`。
* 适应未来  避免了行内代码的一些问题。

# 文档模式

IE5.5发明的文档模式（微软收拾烂摊子创造的）。
`doctype`分类
* 混杂模式
* 标准模式
* 准标准模式

# `noscript`标签

浏览器不支持`script`时展示的内容。一般提示用户该升级浏览器了，走出原始社会，迈向花里胡哨的社会。 
或者时用户关闭了浏览器读取`script`的功能，提示开启。



