/**
 * 将key代理到target上，比如代理 this._data.xx 为 this.xx 
 * @param {*} target 目标对象, vm
 * @param {*} sourceKey 原始key, _data
 * @param {*} key 代理原始对象上的指定属性
 */
export function proxy(target, sourceKey, key) {
    Object.defineProperty(target, key, {
        // target.key => target.sourceKey.key
        get() {
            return target[sourceKey][key]
        },
        set(newVal) {
            target[sourceKey][key] = newVal
        }
    })
}

/**
 * Define a property.
 */
export function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}