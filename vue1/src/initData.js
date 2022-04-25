import { proxy } from './utils.js'
import observe from './observe.js'
/**
 * 初始化options.data
 * 代理data对象上的各个属性到Vue实例
 * data对象上的各个属性设置成响应式
 * @param {*} vm 
 */
export default function initData(vm){
    // 获取data选项
    let { data } = vm.$options

    // 设置vm._data选项，保证它的值是一个对象
    if(!data){
        vm._data = {}
    }else{
        vm._data = typeof data === 'function' ? data(): data
    }

    // 代理，将data对象上的各个属性代理到Vue实力上，支持通过this访问
    for(let key in vm._data){
        proxy(vm, '_data', key)
    }

    // 设置响应式
    observe(vm._data)
}