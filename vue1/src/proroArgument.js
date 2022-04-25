import { def } from "./utils.js"

const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
const methodsToPatch = ['push', 'pop', 'unshift', 'shift', 'splice', 'sort', 'reverse']

methodsToPatch.forEach(method => {
    let original = arrayMethods[method]
    def(arrayMethods, method, function mutator(...args) {
        const result = original.apply(this, args)
        const ob = this.__ob__
        return result
    })
})

/**
 * 覆盖数组（arr）的原型对象
 * @param {*} arr 
 */
export default function protoArgument(arr) {
    arr.__proto__ = arrayMethods
}