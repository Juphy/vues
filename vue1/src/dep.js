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
    this.watchers = []
}

// 在实例化时进行赋值，待依赖收集完成后再Watcher中又重新赋值为null
Dep.target = null

// 收集watcher
Dep.prototype.depend = function () {
    if (this.watchers.includes(Dep.target)) return
    this.watchers.push(Dep.target)
}

// 依赖派发
Dep.prototype.notify = function () {
    for (let watcher of this.watchers) {
        watcher.update()
    }
}

