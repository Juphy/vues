/**
 * Vue1中 key与Dep是一一对应的关系
 * new Vue({
 *   data() {
 *     return {
 *       t1: xx,
 *       t2: {
 *         tt2: xx
 *       },
 *       arr: [1, 2, 3, { t3: xx }]
 *     }
 *   }
 * })
 * data 函数 return 回来的对象是一个 dep
 * 对象中的 key => t1、t2、tt2、arr、t3 都分别对应一个 dep
 */
export default function Dep() {
    // 存储当前dep实例收集所有watcher
    this.watchers = []
}

// Dep.target 是一个静态属性，值为null或者watcher实例
// 在实例化时进行赋值，待依赖收集完成后在Watcher中又重新赋值为null
Dep.target = null

/**
 * 收集watcher
 * 在实例化watcher时进行赋值，待依赖收集完成后在Watcher中又重新赋值为null
 */ 
Dep.prototype.depend = function () {
    // 防止依赖重复收集
    if (this.watchers.includes(Dep.target)) return
    // 收集watcher实例
    this.watchers.push(Dep.target)
}

/**
 * dep 通知自己收集的所有watcher执行更新函数
 */
Dep.prototype.notify = function () {
    for (let watcher of this.watchers) {
        watcher.update()
    }
}

