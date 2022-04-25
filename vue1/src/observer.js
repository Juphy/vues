import observe from "./observe.js"
import protoArgument from './proroArgument.js'
import defineReactive from './defineReactive.js'

/**
 * 将普通对象和数组设置成响应式
 */
export default function Observer(value) {
    // 为对象设置__ob__属性，值为this，标识当前对象已经是一个响应式对象
    Object.defineProperty(value, '__ob__', {
        value: this,
        // 可枚举属性设置为false
        // 1.在递归设置数据时跳过__ob__
        // 2.将响应式对象字符串化时也不限显示 __ob__ 对象
        enumerable: false,
        writable: true,
        configurable: true
    })

    if (Array.isArray(value)) {
        // 处理数组
        protoArgument(value)
        this.observeArray(value)
    } else {
        // 处理对象
        this.walk(value)
    }
}

/**
 * 遍历对象，为这些属性设置getter、setter
 */
Observer.prototype.walk = function (obj) {
    for (let key in obj) {
        defineReactive(obj, key, obj[key])
    }
}

/**
 * 遍历数组，为每个元素设置响应式
 */
Observer.prototype.observeArray = function (arr) {
    for (let item of arr) {
        observe(item)
    }
}