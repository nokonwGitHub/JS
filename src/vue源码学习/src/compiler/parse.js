const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; //标签名 形如 abc-123
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //特殊标签 形如 abc:234 前面的abc:可有可无
const startTagOpen = new RegExp(`^<${qnameCapture}`); // start标签开始 形如 <abc-123 捕获里面的标签名
const startTagClose = /^\s*(\/?)>/; // start标签结束  > />
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配结尾标签 如 </abc-123> 捕获里面的标签名
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性  形如 id="app"


let root, currentParent; //代表根节点 和当前父节点
// 栈结构 来表示开始和结束标签
let stack = [];
// 标识元素和文本type
export const ELEMENT_TYPE = 1; /*Node.ELEMENT_NODE*/
export const TEXT_TYPE = 3;  /*Node.TEXT_NODE*/
export const COMMENT_TYPE = 8;  /*Node.COMMENT_NODE*/

// 生成ast方法
function createASTElement(tagName, attrs) {
    return {
        tag: tagName, type: ELEMENT_TYPE, children: [], attrs, parent: null
    }
}

// 开始标签
function handleStartTag({tagName, attrs}) {
    const node = createASTElement(tagName, attrs)
    if (!root) {
        root = node
    }
    currentParent = node
    stack.push(node)
}

// 结尾标签
function handleEndTag(tagName) {
    const element = stack.pop();
    if (tagName !== element.name) {
        throw Error(`${tagName} is error`)
    }
    currentParent = element[stack.length - 1]
    if (currentParent) {
        element.parent = currentParent
        currentParent.children.push(element)
    }
}

// 对文本进行处理
function handleChars(text) {
    // 去掉空格
    text = text.replace(/\s/g, "");
    if (text) {
        currentParent.children.push({
            type: TEXT_TYPE, text,
        });
    }
}

export function parse(html) {
    function parseStartTag() {
        const start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1],
                attrs: [],
            };
            //匹配到了开始标签 就截取掉
            advance(start[0].length)
            // 开始匹配属性
            // end代表结束符号>  如果不是匹配到了结束标签
            // attr 表示匹配的属性
            let end, attr
            while (!(end = html.match(startTagClose))
                && (attr = html.match(attribute))
                ) {
                advance(attr[0].length);
                attr = {
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5], //这里是因为正则捕获支持双引号 单引号 和无引号的属性值
                }
                match.attrs.push(attr);
            }
            if (end) {
                // 代表一个标签匹配到结束的>了 代表开始标签解析完毕
                advance(end[0].length)
                return match
            }
        }
        return null
    }

    function advance(n) {
        html = html.substring(n)
    }

    while (html) {
        let textEnd = html.indexOf("<");
        //  如果<在第一个 那么证明接下来就是一个标签 不管是开始还是结束标签
        if (textEnd === 0) {
            const startTagMatch = parseStartTag();
            if (startTagMatch) {
                // 把解析的标签名和属性解析生成ast
                handleStartTag(startTagMatch);
                continue;
            }
            // 匹配结束标签</app>  <app />
            const endTagMatch = html.match(endTag);
            if (endTagMatch) {
                advance(endTagMatch[0].length);
                handleEndTag(endTagMatch[1]);
                continue;
            }
        }
        let text;
        if (textEnd >= 0) {
            text = html.substring(0, textEnd);
        }
        if (text) {
            advance(text.length)
            handleChars(text)
        }
    }
    return root;
}
