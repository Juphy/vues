import Observer from './observer.js'
/**
 * 通过Observer类将对象设置成响应式
 * @param {*} value 
 * @returns Observer 实例
 */
export default function observe(value){
    // 避免无限递归，当value不是对象结束递归
    if(typeof value !== 'object') return

    // value.__ob__是Observer的实例
    // 如果value.__ob__属性已经存在，说明value对象已经具备响应式能力，直接返回已有的响应式对象
    if(value.__ob__) return value.__ob__

    // 返回Observer实例
    return new Observer(value)
}