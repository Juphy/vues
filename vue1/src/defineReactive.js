import Dep from "./dep.js";
import observe from "./observe.js";

/**
 * 通过Object.defineObject为obje.key设置getter、setter拦截
 * getter时收集依赖
 * setter时依赖通过watcher更新
 */
export default function defineReactive(obj, key, val){
    // 递归调用，处理val仍然为对象的情况
    let childOb = observe(val)

    const dep = new Dep()

    Object.defineProperty(obj, key, {
        get(){
            // 依赖收集
            if(Dep.target){
                dep.depend()
                // 如果存在子observe
                if(childOb){
                    childOb.dep.depend()
                }
            }
            return val
        },
        set(newVal){
            if(newVal === val) return
            val = newVal
            // 对新值进行响应式处理
            observe(val)
            // 数据更新，让dep通知自己收集所有的watcher执行update方法
            dep.notify()
        }
    })
}