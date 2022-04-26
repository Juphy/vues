import parse from "./parse.js"
/**
 * 解析模板字符串，得到AST语法树
 * 将AST语法树生成渲染函数
 * @param {string} template 模板字符串
 * @returns 渲染函数
 */
export default function compileToFunction(template){
    // 解析模板，生成AST
    const ast = parse(template)
    // 将ast生成渲染函数
    const render = generate(ast)
    return render
}