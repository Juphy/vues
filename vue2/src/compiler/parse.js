/**
 * 解析模板字符串，生成AST语法树
 * @param {string} template 
 * @returns {AST} root ast语法树
 */
export default function parse(template) {
    // 存放所有的未配对的开始标签的AST对象
    const stack = []
    // 最终的AST语法树
    let root = null

    let html = template
    while (html.trim()) {
        // 过滤注释标签
        if (html.indexOf('<!--') === 0) {
            // 说明开始位置是一个注释标签，忽略掉
            html = html.slice(html.indexOf('-->') + 3)
            continue
        }
        // 匹配开始标签
        const startIdx = html.indexOf('<')

        if (startIdx === 0) {
            if (html.indexOf('</') === 0) {
                // 说明是闭合标签
                parseEnd()
            } else {
                // 处理开始标签
                parseStartTag()
            }
        } else if (startIdx > 0) {
            // 说明在开始标签之间有一段文本内容，在html中找到下一个标签的开始位置
            const nextStartIdx = html.indexOf('<')
            // 如果栈为空，则说明这段文本不属于任何一个元素，直接丢掉，不做处理
            if(stack.length){
                // 栈不为空，则处理这段文本，并将其放到栈顶的元素里
                processChars(html.slice(0, nextStartIdx))
            }
            html = html.slice(nextStartIdx)
        }else{
            // 说明没有匹配到开始标签，整个html就是一段文本
        }
    }
    return root
}
