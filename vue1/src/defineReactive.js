import observe from "./observe.js";

/**
 * 通过Object.defineObject为obje.key设置getter、setter
 */
export default function defineReactive(obj, key, val){
    // 递归调用，处理val仍然为对象的情况
    observe(val)

    Object.defineProperty(obj, key, {
        get(){
            return val
        },
        set(newVal){
            if(newVal === val) return
            val = newVal
            // 对新值进行响应式处理
            observe(val)
        }
    })
}