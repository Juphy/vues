import { def } from "./utils.js"

const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
const methodsToPatch = ['push', 'pop', 'unshift', 'shift', 'splice', 'sort', 'reverse']

methodsToPatch.forEach(method => {
    let original = arrayMethods[method]
    def(arrayMethods, method, function mutator(...args) {
        const result = original.apply(this, args)
        const ob = this.__ob__
        // 新增的元素列表
        let inserted = []
        switch(method){
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted = args.slice(2)    
                break;    
        }
        // 如果数组有新增的元素，则需要对新增的元素进行响应式处理
        if(inserted.length) ob.observeArray(inserted)
        // 依赖通知更新
        ob.dep.notify()
        return result
    }, true)
})

/**
 * 覆盖数组（arr）的原型对象
 * @param {*} arr 
 */
export default function protoArgument(arr) {
    arr.__proto__ = arrayMethods
}