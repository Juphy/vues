import Watcher from "../watcher.js"

/**
 * 编译文本节点
 * @param {*} node 
 * @param {*} vm 
 */
export default function compileTextNode(node, vm){
    // <div>{{ key }}</div>
    const key = RegExp.$1.trim()

    // 当响应式数据key更新时，dep通知watcher执行update函数，cb会被调用
    function cb(){
        node.textContent = JSON.stringify(vm[key])
    }

    // 实例化Watcher，执行cb，触发getter，进行依赖收集
    new Watcher(cb)
}