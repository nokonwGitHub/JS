const path = require("path")
const webpack = require("webpack")

/**
 * 命令行
 *  ①build 运行 webpack（默认命令，可用输出文件）
 *  npx webpack build [options]
 *  npx webpack build --config ./webpack.config.js --stats verbose
 *  ②init 用于初始化一个新的 webpack 项目。
 *  npx webpack init [generation-path] [options]
 *  npx webpack init ./my-app --force --template=default
 *  ③Loader 初始化一个 loader
 *  npx webpack loader [output-path] [options]
 *  npx webpack loader ./my-loader --template=default
 *  ④ Plugin 初始化一个 Plugin
 *  npx webpack plugin [output-path] [options]
 *  npx webpack plugin ./my-plugin --template=default
 *  ⑤ Info 输出你的系统信息。
 *  npx webpack info [options]
 *  npx webpack info --output json --addition-package postcss
 *  ⑥ Configtest 校验 webpack 配置。
 *  npx webpack configtest [config-path]
 *  npx webpack configtest ./webpack.config.js
 *  ⑦ Serve 运行 webpack 开发服务器
 *  npx webpack serve [options]
 *  npx webpack serve --static --open
 *  ⑧ Watch 运行 webpack 并且监听文件变化。
 *  npx webpack watch [options]
 *  npx webpack watch --mode development
 *
 *
 *  webpack --analyze
 *
 *  webpack 配置中也使用了一些 env 内置变量
 *  WEBPACK_SERVE
 *  WEBPACK_BUILD
 *  WEBPACK_WATCH
 * */
module.exports = {
    // 配置的名称。当加载不同的配置时会被使用。
    name: "my-app",
    mode: "none", // "development" | "production" | "none"
    /* 1、入口和上下文 */

    // 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
    context: path.join(__dirname, "../"), // 当前执行路径

    // string | [string] | object { <key>: string | [string] } | (function: () => string | [string] | object { <key>: string | [string] })
    // 起点或是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行。
    // 如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。
    // 动态加载的模块不是入口起点。 () => ? | () => new Promise(resolve => resolve(?))
    // 当结合 output.library 选项时：如果传入数组，则只导出最后一项。
    entry: {
        index: path.join(__dirname, "../src/index.js"),
        main: {
            import: path.join(__dirname, "../src/main.js"),
            library: {
                // all options under `output.library` can be used here
                name: 'MyLibrary', // { root: "", amd:"", commonjs2:""}
                type: 'umd', // 'var', 'module', 'assign', 'assign-properties', 'this', 'window', 'self', 'global', 'commonjs', 'commonjs2', 'commonjs-module', 'commonjs-static', 'amd', 'amd-require', 'umd', 'umd2', 'jsonp' and 'system'
                umdNamedDefine: true,
                // 库导出哪些。
                export: "default", // string | [string]
                // 在 UMD 包装器中添加注释。
                auxiliaryComment: "" // string | { amd?: string, commonjs?: string, commonjs2?: string, root?: string }
            }
        }
    },

    /* 2、 出口 */
    //output 位于对象最顶级键(key)，包括了一组选项，指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」。
    output: {
        // 在和 output.library 和 output.libraryTarget 一起使用时，此选项允许用户向导出容器(export wrapper)中插入注释。
        // 要为 libraryTarget 每种类型都插入相同的注释，将 auxiliaryComment 设置为一个字符串：
        // Prefer to use output.library.auxiliaryComment instead.
        auxiliaryComment: "", // string | object  {root:"xx",  commonjs: "CommonJS Comment"}

        /* chunk 文件 */
        // 此选项决定了非入口(non-entry) chunk 文件的名称。用法类似 output.filename 选项。
        chunkFilename: "[id].js", // string function
        // 'array-push' (web/WebWorker), 'commonjs' (node.js), 'module' (ESM),
        chunkFormat: "", // 'array-push' | 'commonjs' | 'module' | <any string>
        // chunk 请求到期之前的毫秒数，默认为 120 000。
        chunkLoadTimeout: 120000,
        // webpack 使用全局变量来加载块
        chunkLoadingGlobal: "myCustomFunc",
        // 加载块的方法
        chunkLoading: "async-node", // 'jsonp' (web), 'import' (ESM), 'importScripts' (WebWorker), 'require' (sync node.js), 'async-node' (async node.js)
        // worker加载块的方法
        workerChunkLoading: "async-node",

        // 创建按需加载的异步块。
        asyncChunks: true,

        // 告诉 webpack 在写入输出文件系统之前检查要发出的文件是否已经存在并且具有相同的内容。
        compareBeforeEmit: false,
        //  devtool = 'source-map'
        sourceMapFilename: "[file].map[query]",
        // bundles 中每一行的前缀
        sourcePrefix: "",
        /* entry 控制*/
        // entry 启用的块加载类型列表。将由 webpack 自动填充。只有在entry 为函数， 从那里返回 chunkLoading 选项时才需要。
        enabledChunkLoadingTypes: ['jsonp', 'require'], // [string: 'jsonp' | 'import-scripts' | 'require' | 'async-node' | <any string>]
        // 允许 entry 使用的库类型列表。
        enabledLibraryTypes: ['module'],
        // entry 启用的 wasm 加载类型列表
        enabledWasmLoadingTypes: ['fetch'],

        /* 输出 可以使用 哪些特性*/
        environment: {
            arrowFunction: true,
            bigIntLiteral: true,
            const: true,
        },
        // 全局对象 哪个全局对象来挂载库
        globalObject: "this", // this / self / globalThis / window
        // 告诉 webpack在发出的代码周围添加IIFE包装器 (()=>{})()  （立即调用函数表达式）
        iife: true,

        // The name of the native import() function. Can be used for polyfilling, e.g. with dynamic-import-polyfill.
        importFunctionName: "import",


        /* script标签 属性  只在 web生效*/
        // 只用于 target 是 web，使用了通过 script 标签的 JSONP 来按需加载 chunk。 启用 cross-origin 属性 加载 chunk。
        crossOriginLoading: false, // false  禁用跨域加载 |  "anonymous" 带凭据的跨域加载 | "use-credentials" 不带凭据的跨域加载
        // 允许自定义 script 的type <script type=?></script> ，webpack 会将 script 标签注入到 DOM 中以下载异步 chunk。
        jsonpScriptType: "text/javascript", // 默认   也可"module"：与 ES6 就绪代码一起使用。
        charset: "utf-8",

        /* 文件名生成 */
        // 当模板字符串或函数产生重复时使用的备用内容。 查看 output.devtoolModuleFilenameTemplate。
        devtoolFallbackModuleFilenameTemplate: "", // string | function(info)

        // 已废弃  对所有或某些模块启用「行到行映射(line to line mapping)
        devtoolLineToLine: false, // boolean | {test, include, exclude}

        // 此选项仅在 「devtool 使用了需要模块名称的选项」时使用。 自定义每个 source map 的 sources 数组中使用的名称
        devtoolModuleFilenameTemplate: "", // string | function(info)

        // 此选项确定 output.devtoolModuleFilenameTemplate 使用的模块名称空间。
        // 未指定时的默认值为：output.library。
        // 在加载多个通过 webpack 构建的 library 时，用于防止 sourcemap 中源文件路径冲突。
        devtoolNamespace: "output.library",

        // 此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。
        // 对于单个入口起点，filename 会是一个静态名称。
        // 此选项不会影响那些「按需加载 chunk」的输出文件 请使用 output.chunkFilename
        filename: "[name].bundle.js", // string function
        /*[hash] 生成相关*/
        // 在生成 hash 时使用的编码方式，默认为 'hex'
        hashDigest: "hex",
        //  在生成 hash 时 的前缀长度
        hashDigestLength: 20,
        // 散列算法，默认为 'md5' 确保 hash 函数有可访问的 update and digest 方法。
        hashFunction: "md5", // string|function
        // 一个可选的salt，通过Node.JS的hash.update更新哈希值。
        // hashSalt: "",

        /* 热更新相关 */
        // 自定义热更新 chunk 的文件名
        hotUpdateChunkFilename: "[id].[hash].hot-update.js",

        // 只在 target 是 web 时使用，用于加载热更新(hot update)的 JSONP 函数。
        // JSONP 函数用于异步加载(async load)热更新(hot-update) chunk。
        hotUpdateFunction: () => 0, // function

        // 自定义热更新的主文件名(main filename)
        hotUpdateMainFilename: "[hash].hot-update.json", // string | function
        // 仅在target设置为时'web'使用，它使用 JSONP 加载热更新。 类似 output.chunkLoadingGlobal。
        hotUpdateGlobal: "",

        /* JSONP */
        // 只在 target 是 web 时使用，用于按需加载(load on-demand) chunk 的 JSONP 函数。
        // JSONP 函数用于异步加载(async load) chunk，或者拼接多个初始 chunk(CommonsChunkPlugin, AggressiveSplittingPlugin)。
        // 如果在同一网页中使用了多个（来自不同编译过程(compilation)的）webpack runtime，则需要修改此选项。
        jsonpFunction: "", // string

        // 输出一个 entry 导出的库。 也可以在 entry 中单独配置 library
        library: "MyLibrary",//  ["MyLibrary", "[name]"] // string | string[] | object
        /*
        * e.g.
        * {
        *  library: "MyLibrary"  //  ["MyLibrary", "[name]"]
        * }
        * // a.js
        * export function say() {}
        *
        * MyLibrary.say()       // MyLibrary.a.say()
        * */
        // output.library.export
        libraryExport: "default",
        // output.library.type
        libraryTarget: "",
        // 将 JavaScript 文件输出为模块类型。 实验  output.module是一项实验性功能，只能通过设置experiments.outputModule为启用true。
        // 启用后，webpack 将在内部设置output.iife为false、output.scriptType = 'module' 和 terserOptions.module = true。
        module: false, // boolean

        // 输出路径  absolute path.
        path: path.resolve(__dirname, 'dist'),
        // 告诉 webpack 在 bundle 中包含关于所包含模块的信息的注释。此选项默认分别为development为true和production为false。
        // verbose显示更多信息，如 exports, runtime requirements and bailouts
        pathinfo: "verbose", // boolean string: 'verbose'

        // 使用它来确定从哪里提供输出文件。
        // 按需加载或加载图像、文件等外部资源时 前缀地址信息
        // 此选项指定在浏览器中引用时输出目录的公共 URL
        // output.path需要考虑的规则：从 HTML 页面视图中的URL 来加载信息。
        // publicPath在编译时无法知道输出文件的情况下，可以将其为空，并在运行时使用 变量 __webpack_public_path__ 在入口文件中动态设置。
        publicPath: "/", // function string
        // 根据EcmaScript模块规范处理模块加载中的错误，以性能为代价。
        strictModuleErrorHandling: true,
        strictModuleExceptionHandling: true, // 弃用  以strictModuleErrorHandling代替
        // 信任
        trustedTypes: false, // false | string | {policyName:""}  true 时使用output.uniqueName 作为 policyName
        // webpack 构建名称 以避免在使用全局变量时多个webpack运行时发生冲突 默认 output.library[.name] 或 package.json name
        uniqueName: ""

    },

    /* 3、 这些选项决定了如何处理项目中的不同类型的模块。 */
    module: {
        //以使用 module.generator 在一个地方配置所有生成器的选项
        generator: {
            asset: {
                // asseet 模块的 generator 选项
                // 自定义 asset 模块的 publicPath，自 webpack 5.28.0 起可用
                publicPath: 'assets/',
                // 将静态资源输出到相对于 'output.path' 的指定文件夹中，webpack 5.67.0 后可用
                outputPath: 'cdn-assets/',
            },
        },
        // 类似  generator 用 module.parser 在一个地方配置所有解析器的选项。
        parser: {
            javascript: { //
                // javascript 模块的解析器选项
                // 例如，启用解析 require.ensure 语法的功能
                requireEnsure: true,
                // 为 CommonJS 启用 魔法注释。
                commonjsMagicComments: true
            },
        },
        // 防止 webpack 解析那些任何与给定正则表达式相匹配的文件。
        noParse: /jquery/, // RegExp [RegExp] function(resource):boolean string [string]

        //缓存模块请求的解析。module.unsafeCache 包含如下几个默认值
        // 如果 cache 未被启用，则默认值为 false。
        // 如果 cache 被启用，并且此模块的来自 node_modules，则值为 true，否则为 false。
        unsafeCache: false, // boolean function (module)

        // 创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。 这些规则能够对模块(module)应用 loader，或者修改解析器(parser)
        // 每个rule<item>可以分为三部分 - 条件(condition)，结果(result)和嵌套规则(nested rule)。
        /*
        * 1、条件
        * 条件有两种输入值：字符串 | 正则表达式 | 函数 | 条件数组 | 对象 { and:  [Condition], or:  [Condition], not:  [Condition] }
        *   resource：资源文件的绝对路径。它已经根据 resolve 规则解析。 属性 test, include, exclude 和 resource 对 resource 匹配
        *   issuer: 请求者的文件绝对路径。是导入时的位置。 属性 issuer 对 issuer 匹配。
        *
        * 2、结果
        * 规则结果只在规则条件匹配时使用。
        * 规则有两种输入值：
        *   应用的 loader：应用在 resource 上的 loader 数组。
        *   Parser 选项：用于为模块创建解析器的选项对象。
        * 这些属性会影响 loader：loader, options, use。也兼容这些属性：query, loaders。
        * enforce 属性会影响 loader 种类。不论是普通的，前置的，后置的 loader。
        * parser 属性会影响 parser 选项。
        * 3、嵌套规则
        * 可以使用属性 rules 和 oneOf 指定嵌套规则。
        * 被解析的顺序基于以下规则：父规则 rules oneOf
        * */
        rules: [
            {   // Pitching 阶段: loader 上的 pitch 方法， ，按照后置(post)、行内(inline)、普通(normal)、前置(pre) 的顺序调用
                // Normal 阶段: loader 上的 常规方法，按照 前置(pre)、普通(normal)、行内(inline)、后置(post) 的顺序调用。模块源码的转换， 发生在这个阶段。
                enforce: "pre",// 可能的值有："pre" | "post"  指定 loader 种类。没有值表示是普通 loader。
                /*
                * // 禁用普通 loaders
                * import { a } from '!./file1.js';
                * // 禁用前置和普通 loaders
                * import { b } from '-!./file2.js';
                * // 禁用所有的 loaders
                * import { c } from '!!./file3.js';
                * 不应使用inline loader 和 ! 前缀，因为它是非标准的。它们可能会被 loader 生成代码使用。
                * */

                // 排除所有符合条件的模块。
                // 如果你提供了 Rule.exclude 选项，就不能再提供 Rule.resource
                exclude: /noed_module/,
                // 引入符合以下任何条件的模块。
                // 如果你提供了 Rule.include 选项，就不能再提供 Rule.resource
                include: "*.js",
                //一个条件，用来与被发出的 request 对应的模块项匹配。
                issuer: "",
                //
                issuerLayer: "",
                // 指定模块应放置在哪个 layer。
                layer: "",
                // Rule.loader 是 Rule.use: [ { loader } ] 的简写
                loader: "",
                // mimetype 使 rules 配置与 data 的 uri 进行匹配。
                mimetype: 'application/json',
                // 规则数组，当规则匹配时，只使用第一个匹配规则。
                oneOf: [{/* rule */}],
                // 解析选项对象。所有应用的解析选项都将合并。
                parser: {
                    dataUrlCondition: {maxSize: 8096}, // { maxSize number = 8096 } function (source, { filename, module }) => boolean
                    // 如果 Rule.type 被设置成 'json'，那么 Rules.parser.parse 选择可能会是一个方法，
                    parser: ""
                },
                //
                generator: {
                    dataUrl: {}, // object = { encoding string = 'base64' | false, mimetype string = undefined | false } function (content, { filename, module }) => string
                    emit: true, // 配置不从 Asset Modules 写入资源文件, 你可能会在 SSR 中使用它。
                    // 对某些特定的规则而言与 output.assetModuleFilename 相同.
                    // 覆盖了 output.assetModuleFilename 选项并且仅与 asset 和 asset/resource 模块类型一同起作用。
                    filename: 'static/[hash][ext]',
                    // 对指定的资源模式指定 publicPath。
                    publicPath: "", // string | ((pathData: PathData, assetInfo?: AssetInfo) => string)
                    // 将静态资源输出到相对于 'output.path' 的指定文件夹中。只有当 'publicPath' 被用来匹配文件夹结构时才会需要设置该配置。
                    outputPath: "", // string | ((pathData: PathData, assetInfo?: AssetInfo) => string)
                },
                // 条件会匹配 resource。
                resource: "",
                // 与资源查询相匹配的 Condition。此选项用于测试请求字符串的查询部分（即从问号开始）
                // import Foo from './foo.css?inline' 导入 Foo
                resourceQuery: /inline/,
                rules: [],
                // 匹配使用的 schema
                scheme: /data|https?/, // string | RegExp | ((value: string) => boolean) | RuleSetLogicalConditions | RuleSetCondition[]
                // sideEffects 表明模块的哪一部份包含副作用
                sideEffects: false,
                // 引入所有通过断言测试的模块 如果你提供了一个 Rule.test 选项，就不能再提供 Rule.resource。
                test: "",
                // Rule.type 设置类型用于匹配模块。它防止了 defaultRules 和它们的默认导入行为发生
                // 'javascript/auto' | 'javascript/dynamic' | 'javascript/esm' | 'json' | 'webassembly/sync' | 'webassembly/async'
                // | 'asset' | 'asset/source' | 'asset/resource' | 'asset/inline'
                type: "",
                // Rule.use 可以是一个应用于模块的 UseEntries 数组。每个入口(entry)指定使用一个 loader。
                // Loaders 可以通过传入多个 loaders 以达到链式调用的效果，它们会从右到左被应用（从最后到最先配置）。
                // "css-loader" === {loader: "css-loader" , options: {}}
                //  Rule.use 也可以是一个函数，接受对象参数，描述被加载的模块，而且必须 返回 UseEntry 元素的数组
                // function(info)
                // info { compiler 当前 webpack 的编译器, issuer 模块的路径, realResource 总会是被加载模块的路径, resource 被加载的模块路径}
                //
                use: [], // [UseEntry] function(info)
                // 模块解析可以在模块层被配置。resolve 配置页面可查看所有可用的配置。 所有被应用的 resolve 选项被更高层级的resolve配置合并。
                resolve: {
                    // 启用后，你若在 .mjs 文件或其他 .js 文件中导入模块，并且它们最近的 package.json 中包含 "type" 字段，其值为 "module"时，你应为此文件提供扩展名，
                    // 否则 webpack 会提示 Module not found 的错误且编译失败。
                    fullySpecified: true
                }
            }
        ]
    },

    /*
    * 4、解析器
    * */
    resolve: {
        // 别名
        alias: {},
        // 指定一个字段，例如 browser，根据 此规范进行解析
        aliasFields: [""], // [string]
        //如果启用了不安全缓存，请在缓存键(cache key)中引入 request.context。这个选项被 enhanced-resolve 模块考虑在内。
        // 从 webpack 3.1.0 开始，在配置了 resolve 或 resolveLoader 插件时，解析缓存(resolve caching)中的上下文(context)会被忽略。
        cacheWithContext: false,
        // exports 配置项 （定义一个库的入口）的 conditionName。
        conditionNames: ["mydd"], // [string]
        // 用于描述的 JSON 文件。
        descriptionFiles: ['package.json'],
        // enforceExtension 如果是 true，将不允许无扩展名文件。
        enforceExtension: false,
        //
        extensions: ['.js', '.json', '.wasm'], // 按照顺序解析
        // 当正常解析失败时，重定向模块请求。
        // webpack 5 不再自动 polyfill Node.js 的核心模块，这意味着如果你在浏览器或类似的环境中运行的代码中使用它们，你必须从 NPM 中安装兼容的模块，并自己包含它们。
        fallback: {
/*            assert: require.resolve('assert'),
            buffer: require.resolve('buffer'),
            console: require.resolve('console-browserify'),
            constants: require.resolve('constants-browserify'),
            crypto: require.resolve('crypto-browserify'),
            domain: require.resolve('domain-browser'),
            events: require.resolve('events'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify'),
            punycode: require.resolve('punycode'),
            process: require.resolve('process/browser'),
            querystring: require.resolve('querystring-es3'),
            stream: require.resolve('stream-browserify'),
            string_decoder: require.resolve('string_decoder'),
            sys: require.resolve('util'),
            timers: require.resolve('timers-browserify'),
            tty: require.resolve('tty-browserify'),
            url: require.resolve('url'),
            util: require.resolve('util'),
            vm: require.resolve('vm-browserify'),
            zlib: require.resolve('browserify-zlib'),*/
        },
        // 当从 npm 包中导入模块时（例如，import * as D3 from 'd3'），此选项将决定在 package.json 中使用哪个字段导入模块。
        mainFields: [],
        // 解析目录时要使用的文件名。 dd/fff -> dd/fff/index[.js|.json]
        mainFiles: ["index"],
        // 在 package.json 中用于解析模块请求的字段。
        exportsFields: [],
        // 告诉 webpack 解析模块时应该搜索的目录。
        modules: ['node_modules'],

        // 正则匹配启用，会主动缓存模块，但并 不安全。传递 true 将缓存一切。
        unsafeCache: false,  // RegExp [RegExp] boolean: true
        // 对 resolver 使用同步文件系统调用。
        useSyncFileSystemCalls: true,
        // 应该使用的额外的解析插件列表。
        plugins: [/*Plugin*/],
        // 当启用此选项时，webpack 更倾向于将模块请求解析为相对请求，而不使用来自 node_modules 目录下的模块。
        preferRelative: true,
        // 解析时，首选的绝对路径为 resolve.roots。
        preferAbsolute: true,

        // 是否将符号链接(symlink)解析到它们的符号链接位置(symlink location)。
        // 启用时，符号链接(symlink)的资源，将解析为其 真实 路径，而不是其符号链接(symlink)的位置。
        symlinks: true,
        // 决定请求是否应该被缓存的函数。
        cachePredicate: function ({path, request}) { // function(module) => boolean
            return true
        },
        // 解析限制列表，用于限制可以解析请求的路径。
        restrictions: [], // [string, RegExp]
        // 以 / 开头文件的跟路径
        roots: [],
        // 通过 module 请求类型来配置 resolve 选项。
        byDependency: { // { [type: string]: ResolveOptions }
            esm: {
                mainFields: ['browser', 'module'],
            },
            commonjs: {
                aliasFields: ['browser'],
            },
            url: {
                preferRelative: true,
            },
        },
        //
    },
    // object { modules [string] = ['node_modules'], extensions [string] = ['.js', '.json'], mainFields [string] = ['loader', 'main']}
    // 这组选项与上面的 resolve 对象的属性集合相同， 但仅用于解析 webpack 的 loader 包。
    resolveLoader: {},

    /*
    * 5、 优化
    * 根据选择的 mode 来执行不同的优化 也可以手动配置
    * */
    optimization: {
        /*
         * 告知 webpack 当选择模块 id 时需要使用哪种算法
         * */
        // chunkIds: "", // boolean = false string: 'natural' | 'named' | 'size' | 'total-size' | 'deterministic'
        /* 告知 webpack 去寻找模块图形中的片段，哪些是可以安全地被合并到单一模块中。
         * 这取决于 optimization.providedExports 和 optimization.usedExports。
         *
         * */
        // concatenateModules: ""
        /*
         * 使用 optimization.emitOnErrors 在编译时每当有错误时，就会发送静态资源。
         * 这样可以确保出错的静态资源被发送出来。关键错误会被发送到生成的代码中，并会在运行时报错。
         * */
        // emitOnErrors: "",
        /*
        * 告知 webpack 确定和标记出作为其他 chunk 子集的那些 chunk，
        * 其方式是在已经加载过较大的 chunk 之后，就不再去加载这些 chunk 子集。
        * optimization.flagIncludedChunks 默认会在 production 模式 中启用，其他情况禁用。
        * */
        // flagIncludedChunks: "",

        /* webpack 是否对未使用的导出内容，实施内部图形分析(graph analysis)。*/
        // innerGraph:true,
        /* 允许控制导出处理(export mangling)。 */
        // mangleExports:"" // boolean string: 'deterministic' | 'size'
        /* 在设置为 true 时，告知 webpack 通过将导入修改为更短的字符串，来减少 WASM 大小。这会破坏模块和导出名称。 */
        // mangleWasmImports: true,

        /* 告知 webpack 合并含有相同模块的 chunk。*/
        // mergeDuplicateChunks: true,
        /* 告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer定义的插件压缩 bundle。 */
        // minimize: true,
        /* 允许提供一个或多个定制过的 TerserPlugin 实例，覆盖默认压缩工具(minimizer)。*/
        // minimizer: [] , // [TerserPlugin] 或 [function (compiler)]

        /* 告知 webpack 当选择模块 id 时需要使用哪种算法。 */
        // moduleIds: "", // boolean: false string: 'natural' | 'named' | 'deterministic' | 'size'

        /* 告知 webpack 将 process.env.NODE_ENV 设置为一个给定字符串 */
        // nodeEnv: "",
        /* 告知 webpack 生成带有相对路径的记录(records)使得可以移动上下文目录。
        * 如果下列至少一个选项在 webpack 中被设置，该选项也会自动启用：recordsPath, recordsInputPath，recordsOutputPath。
        * */
        // portableRecords: "",
        /* 告知 webpack 去确定那些由模块提供的导出内容，为 export * from ... 生成更多高效的代码。默认 optimization.providedExports 会被启用。 */
        // providedExports: true,
        /* 在处理静态资源后添加额外的哈希编译，以获得正确的静态资源内容哈希 */
        // realContentHash: false,

        /* 如果模块已经包含在所有父级模块中，告知 webpack 从 chunk 中检测出这些模块，或移除这些模块。
        * 将 optimization.removeAvailableModules 设置为 true 以启用这项优化。在 production 模式 中默认会被开启。
        * */
        // removeAvailableModules: true,
        /* 移除空的模块 */
        // removeEmptyChunks:true,
        /* 将 optimization.runtimeChunk
         * 值true 或 'multiple'，会为每个入口添加一个只含有 runtime 的额外 chunk。
         *   此配置的别名如下：
         *   runtimeChunk: {  name: (entrypoint) => `runtime~${entrypoint.name}`},
         * 值 "single" 会创建一个在所有生成 chunk 之间共享的运行时文件
         * 值 false 每个入口 chunk 中直接嵌入 runtime。
         *
         * */
        // runtimeChunk: true,

        /*
        * 告知 webpack 去辨识 package.json 中的 副作用 标记或规则，以跳过那些当导出不被使用且被标记不包含副作用的模块。
        * */
        // sideEffects: "sideEffects", // boolean = true string: 'flag'

        /*
        * 对于动态导入模块，默认使用 webpack v4+ 提供的全新的通用分块策略
        * SplitChunksPlugin
        * */
        // splitChunks: {}, // object
    },


    /* 6、插件
    * plugins 选项用于以各种方式自定义 webpack 构建过程。
    * webpack 附带了各种内置插件，可以通过 webpack.[plugin-name] 访问这些插件。
    * */
    plugins: [
        new webpack.DefinePlugin({
            // Definitions...
        }),
    ],

    /*
    * 7、webpack-dev-server 可用于快速开发应用程序。
    * 启用服务
    * ① 通过 npx webpack serve  https://github.com/webpack/webpack-cli/blob/master/SERVE-OPTIONS-v4.md
    * ② 通过 API 来启用服务器。webpack-dev-server
    * 通过 webpack-dev-server 的这些配置，能够以多种方式改变其行为。
    * */
    devServer: {
        // 该选项允许将允许访问开发服务器的服务列入白名单。
        allowedHosts: "all", // 'auto' | 'all' | [string]
        // 指定要使用的 host post
        host: "0.0.0.0", // 'local-ip' | 'local-ipv4' | 'local-ipv6' | string
        post: 50012, //
        // 使用 spdy 提供 HTTP/2 服务。
        /*
        * SPDY（读作“SPeeDY”）是Google开发的基于TCP的会话层协议，用以最小化网络延迟，提升网络速度，优化用户的网络使用体验。
        * SPDY并不是一种用于替代HTTP的协议，而是对HTTP协议的增强。
        * */
        // 对于 Node 15.0.0 及更高版本，此选项将被忽略，因为 spdy 在这些版本中已被破坏。
        // 一旦 Express 支持，开发服务器将迁移到 Node 内置的 HTTP/2。
        http2: false,
        // 默认情况下，开发服务器将通过 HTTP 提供服务。
        https: false, // TLS 配置项: { ca: , pfx:, key: , cert: ,passphrase: ,requestCert: ,....},

        // 启用 webpack 的 热模块替换 特性：
        hot: true, // boolean | only(在构建失败时不刷新页面作为回退)
        // 将其设置为 true 将会监听 /your-os-temp-dir/webpack-dev-server.sock 的 socket：
        ipc: true, // boolean | string  path.join(__dirname, 'my-socket.sock'),
        // 默认情况下，当监听到文件变化时 dev-server 将会重新加载或刷新页面。
        // 为了 liveReload 能够生效，devServer.hot 配置项必须禁用或者 devServer.watchFiles 配置项必须启用。
        // 热加载仅对像 web、webworker、electron-renderer 和 node-webkit 的 targets 生效。
        liveReload: true,
        // 告诉dev-server启用/禁用magicHtml路由(对应于你的webpack输出的路由，例如main.js的/main)。
        magicHtml: true,
        // 这个配置用于在启动时通过 ZeroConf 网络广播你的开发服务器。
        // npx webpack serve --bonjour
        bonjour: true,
        // 启用 gzip compression：
        compress: true,
        // 允许设置服务器和配置项（默认为 'http'）。
        server:"http", // 'http' | 'https' | 'spdy' string object {type:'http' | 'https' | 'spdy' string, options:{} }
        // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
        setupExitSignals: true,

        //
        client: {
            // 允许在浏览器中设置日志级别，例如在重载之前，在一个错误之前或者 热模块替换 启用时。
            // npx webpack serve --client-logging info
            logging: "warn", // 'log' | 'info' | 'warn' | 'error' | 'none' | 'verbose'
            // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
            overlay: true, // boolean = true object: { errors boolean = true, warnings boolean = true }
            // 在浏览器中以百分比显示编译进度。
            progress: true, //npx webpack serve --[no-]client-progress
            // 告诉 dev-server 它应该尝试重新连接客户端的次数.
            reconnect: true, // boolean = true number

            // 该配置项允许我们为客户端单独选择当前的 devServer 传输模式，或者提供自定义的客户端实现。
            // 这允许指定浏览器或其他客户端与 devServer 的通信方式。
            webSocketTransport: "ws", // 'ws' | 'sockjs' string
            // 这个选项允许指定 URL 到 web socket 服务器（当你代理开发服务器和客户端脚本不总是知道连接到哪里时很有用）。
            webSocketURL: "ws://0.0.0.0:8080/ws", // { hostname, pathname, password, port, protocol, username}
        },

        // 开发服务器使用功能强大的 http-proxy-middleware [中间件] 软件包。
        // 代理
        proxy: {   },// object , [object, function]

        // 为 webpack-dev-middleware [中间件] 提供处理 webpack 资源的配置项。
        /*
        * webpack-dev-middleware,作用就是，生成一个与webpack的compiler绑定的中间件，然后在express启动的服务app中调用这个中间件。
        * */
        devMiddleware: {
            index: true,
            mimeTypes: {phtml: 'text/html'},
            publicPath: '/publicPathForDevServe',
            serverSideRender: true,
            writeToDisk: true,
        },

        // 告诉 dev-server 在服务器已经启动后打开浏览器。设置其为 true 以打开你的默认浏览器。
        // "xx" 打开指定页面，  [string] 打开多个页面
        open: true, // boolean string object [string, object] {target: [string], app: {name, arguments:[]} }

        // 该配置项允许配置从目录提供静态文件的选项（默认是 'public' 文件夹）。express.static
        /*
        * object
        * {
        *   directory: path.join(process.cwd(), 'public'), // 告诉服务器从哪里提供内容。static.publicPath 将会被用来决定应该从哪里提供 bundle，并具有优先级。
        *   staticOptions: {redirect: true}, 可以配置从 static.directory 提供静态文件的高级选项。 http://expressjs.com/en/4x/api.html#express.static
        *   publicPath: "/", // 告诉服务器在哪个 URL 上提供 static.directory 的内容。
        *   serveIndex: true, // 告诉开发服务器启用后使用 serve-index [中间件]。serve-index 中间件会在查看没有 index.html 文件的目录时生成目录列表
        *   watch: true// 通过 static.directory 配置项告诉 dev-server 监听文件
        * }
        * */
        static: "public", // boolean string object [string, object]

        // 该配置项允许你配置 globs/directories/files 来监听文件变化。
        // 可以配置高级选项来监听文件。关于可用选项可以查看 chokidar [插件] https://github.com/paulmillr/chokidar 文档。
        watchFiles: ['src/**/*.php', 'public/**/*'], // string object [string, object]
        // 该配置项允许我们选择当前的 web-socket 服务器或者提供自定义的 web-socket 服务器实现。
        webSocketServer: "ws", // false | 'sockjs' | 'ws' string function object

        // 提供服务器内部在所有其他中间件之后|之前 执行 自定义中间件的能力
        onAfterSetupMiddleware (devServer) { }, // 该配置项已弃用，以支持 devServer.setupMiddlewares
        onBeforeSetupMiddleware (devServer) { }, // 该配置项已弃用，以支持 devServer.setupMiddlewares
        // 提供执行自定义函数和应用自定义中间件的能力。
        setupMiddlewares(middlewares, devServer) {
            // middlewares.unshift({name:"", path:"", middleware(res,req){ }}) onBeforeSetupMiddleware
            // middlewares.push() onBeforeSetupMiddleware
            return middlewares
        },
        // 提供在 webpack-dev-server 开始监听端口连接时执行自定义函数的能力。
        onListening() {

        },

    },

    /*
    * 8、cache 缓存
    * 缓存生成的 webpack 模块和 chunk，来改善构建速度。
    * cache 会在开发 模式被设置成 type: 'memory' 而且在 生产 模式 中被禁用。
    * */
    cache: {
        // 将 cache 类型设置为内存或者文件系统。
        type: "filesystem", // string: 'memory' | 'filesystem'
        // 缓存数据的版本。不同版本不会允许重用缓存和重载当前的内容。当配置以一种无法重用缓存的方式改变时，要更新缓存的版本。这会让缓存失效。
        version: "1.0", //  'filesystem' 生效
        // 缓存的名称。不同的名字会导致不同的的共存的缓存。默认值为 ${config.name}-${config.mode}
        name: `AppBuildCache`,
        // 告诉 webpack 什么时候将数据存放在文件系统中。
        store: "pack", // 当编译器闲置时候，将缓存数据都存放在一个文件中

        // cache.cacheDirectory 选项仅当 cache.type 被设置成 'filesystem' 才可用
        // 缓存目录
        cacheDirectory: path.join(__dirname, "cache"),

        // 缓存的路径。默认值为 path.resolve(cache.cacheDirectory, cache.name)
        cacheLocation: path.join(__dirname, "cache"),
        // 用于缓存文件的压缩类型
        compression: "gzip",
        // 时间以毫秒为单位。cache.idleTimeout 表示缓存存储发生的时间间隔。
        idleTimeout: 60000,

        // 以毫秒为单位。cache.idleTimeoutAfterLargeChanges 是当检测到较大的更改时，缓存存储应在此之后发生的时间段。
        idleTimeoutAfterLargeChanges: 1000,
        // 允许未使用的缓存留在文件系统缓存中的时间（以毫秒为单位）；默认为一个月。
        maxAge: 5184000000,
        // 定义内存缓存中未使用的缓存项的生命周期
        /*
        * cache.maxGenerations: 1: 在一次编译中未使用的缓存被删除。
        * cache.maxGenerations: Infinity: 缓存将永远保存。
        * */
        maxGenerations: 100, //  在n编译中未使用的缓存被删除。

    },

    /*
    * 9、DevTool
    * 此选项控制是否生成，以及如何生成 source map。
    * 使用 SourceMapDevToolPlugin [插件] 进行更细粒度的配置。
    * */
    devtool: "source-map", // string = 'eval' false

    /*
    * 10、构建目标
    * webpack 能够为多种环境或 target 构建编译。
    * 默认值 browserslist, 没有找到 browserslist配置， 则为 "web"
    * */
    target: "node", //string [string]

    /*
    * 11、watch 和 watchOptions
    * Webpack 可以监听文件变化，当它们修改后会重新编译。
    * */
    // 开启 Watch 模式
    watch: true, // boolean  webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启。
    //
    watchOptions:{
        // 当第一个文件更改，会在重新构建前增加延迟。
        aggregateTimeout: 200,
        // 排除
        ignored:/node_modules/, // RegExp string [string]
        // 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。 如果监听没生效，试试这个选项吧。
        pool: 1000, // boolean = false number  每秒检查一次变动
        // 根据软链接查找文件。这通常是不需要的，因为 webpack 已经使用 resolve.symlinks 解析了软链接。
        followSymlinks: true, // boolean
        // 当 stdin 流结束时停止监听。
        stdin: true,
    },

    /*
    * 12、外部扩展
    * externals 配置选项提供了 「从输出的 bundle 中排除依赖」 的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖。
    * string | object | function | RegExp | [string, object, function, RegExp]
    * */
    externals:{
        jquery: 'jQuery', // 从 CDN 引入 jQuery，而不是把它打包：
    },
    // 指定 externals 的默认类型。
    // 当 external 被设置为 amd，umd，system 以及 jsonp 时，output.libraryTarget 的值也应相同。
    // 例如，你只能在 amd 库中使用 amd 的 externals。
    externalsType: "var", // "var" |
    // 为特定的 target 启用 externals 的 preset。
    externalsPresets:{
        node: true, // 将 node.js 的内置模块视为 external 模块（如 fs，path 或 vm），使用时通过 require() 加载。
    },

    /*
    * 13、performance
    * 配置如何展示性能提示。
    * */
    performance:{
        // 此属性允许 webpack 控制用于计算性能提示的文件。
        assetFilter(assetFilename) {
             return !/\.map$/.test(assetFilename); // 只给.map 文件提示
        },
        // hints 打开/关闭提示。此外，当找到提示时，告诉 webpack 抛出一个错误或警告。
        hints: "warning", // string = 'warning': 'error' | 'warning' boolean: false
        // 资源(asset)是从 webpack 生成的任何文件。此选项根据单个资源体积(单位: bytes)，控制 webpack 何时生成性能提示。
        maxAssetSize: 250000,
        // 入口起点表示针对指定的入口，对于所有资源，要充分利用初始加载时(initial load time)期间。
        // 此选项根据入口起点的最大体积，控制 webpack 何时生成性能提示。
        maxEntrypointSize: 250000
    },

    /*
    * 14 Node
    * 这些选项可以配置是否 polyfill 或 mock 某些 Node.js 全局变量。
    * 此功能由 webpack 内部的 NodeStuffPlugin 插件提供。 https://github.com/webpack/webpack/blob/main/lib/NodeStuffPlugin.js
    * 如果需要在 webpack 5 下的 Node.js 中填充 fs，使用 resolve.fallback
    * */
    node: {
        global: false, // boolean 'warn'
        __filename: false, // boolean 'mock' | 'warn-mock' | 'eval-only'
        __dirname: false, // boolean 'mock' | 'warn-mock' | 'eval-only'
    },
    /*
    * 15、Stats 对象
    *  stats 选项让你更精确地控制 bundle 信息该怎么显示。
    * */
    stats: { // string | statsOption = {}
        assets: true, // 告知 stats 是否展示资源信息。
        assetsSort: "id", // 基于字段排序
        builtAt: true, // 告知 stats 是否添加构建日期与时间信息

        },

    /*
    * 16、 实验特性
    * experiments 配置是在 webpack 5 中推出，目的是为了给用户赋能去开启并试用一些实验的特性。
    * */
    experiments:{
        css: true, // 启用原生 CSS 支持。
    },

    /*
    * 17、其它选项
    * webpack 支持的其它选项
    * */
    // 设置 require.amd 或 define.amd 的值。
    amd: {// boolean | object([string]: boolean)
        jQuery: true,
    },
    // 在第一个错误出现时抛出失败结果，而不是容忍它。true 这将迫使 webpack 退出其打包过程。
    bail: false,
    // 一个 name 列表，定义它所依赖的所有兄弟（sibling）配置。需要首先编译依赖的配置。
    /*
    * 在 watch 模式下，当出现以下情况时，依赖项将使编译器失效：
    *   依赖项发生变化
    *   依赖项当前正在编译或者处于无效状态
    * 请记住，在完成依赖项编译之前，不会编译此配置。
    * */
    dependencies:[],
    // 告诉 webpack 忽略掉特定的警告。
    // [RegExp, function (WebpackError, Compilation) => boolean, {module?: RegExp, file?: RegExp, message?: RegExp}]
    ignoreWarnings: [ /module2\.js\?/],
    // 选项 用于实现基础的日志
    infrastructureLogging: {
        level: "info", // string = 'info' : 'none' | 'error' | 'warn' | 'info' | 'log' | 'verbose'
        // 提供 基础的日志 实现方案
        // console(){},

        appendOnly: true, // 追加
        colors: true, // 带颜色的日志
        //开启特定日志比如插件(plugins)和加载器(loaders)的调试信息。 与 stats.loggingDebug 选项类似但仅仅对于基础设施而言。默认为 false。
        debug: false, // string boolean = false RegExp function(name) => boolean [string, RegExp, function(name) => boolean]
        // 用于日志输出的流。默认为 process.stderr。此选项仅在未提供自定义 console 的情况下使用。
        stream: process.stderr,
    },
    // 在 loader 上下文 中暴露自定义值。
    loader:{
        answer: 42,
        /*
        module.exports = function (source) {
            console.log(this.answer); // will log `42` here
            return source;
        };
        * */
    },

    //限制并行处理的模块数量。可以用于调优性能或获取更可靠的性能分析结果
    parallelism: 100,
    // 捕获一个应用程序"配置文件"，包括统计和提示，然后可以使用 Analyze 分析工具进行详细分析。
    // 使用 StatsPlugin 可以更好地控制生成的配置文件。
    // 与 parallelism: 1 混用以达到更好的结果。 需要注意的是，这样做也会减慢建造速度。
    profile: false,
    // 指定读取最后一条记录的文件的名称。这可以用来重命名一个记录文件。
    recordsInputPath: path.join(__dirname, 'records.json'),
    // 指定记录要写入的位置。以下示例描述了如何用这个选项和 recordsInputPath 来重命名一个记录文件：
    recordsOutputPath: path.join(__dirname, 'newRecords.json'),
    //开启这个选项可以生成一个 JSON 文件，其中含有 webpack 的 "records" 记录 -
    // 即「用于存储跨多次构建(across multiple builds)的模块标识符」的数据片段。
    // 可以使用此文件来跟踪在每次构建之间的模块变化。只要简单的设置一下路径,就可以生成这个 JSON 文件：
    recordsPath: path.join(__dirname, 'records.json'),

    // snapshot 配置项决定文件系统是如何创建和无效快照。
    snapshot:{
        // 由包管理器管理的路径数组，可以信任它不会被修改
        managedPaths: [path.resolve(__dirname, '../node_modules')],
        // 由包管理器管理的路径数组，在其路径中包含一个版本或哈希，以便所有文件都是不可变的
        immutablePaths: [],
        // 使用持久化缓存时的依赖构建关系快照。
        buildDependencies: {
            hash: true,
            timestamp: true,
        },
        // 构建模块的快照。
        module: {
            timestamp: true,
        },
        // 解析请求的快照。
        resolve: {
            timestamp: true,
        },
        // 使用持久缓存时用于解析构建依赖项的快照。
        resolveBuildDependencies: {
            hash: true,
            timestamp: true,
        },
    },
}
