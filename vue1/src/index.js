import initData from './initData.js'
/**
 * Vue 构造函数
 * @param {*} options 初始化时传递的配置对象
 */
export default function Vue(options){
    this._init(options)
}

Vue.prototype._init = function (options) {
    // 将options配置挂载到Vue实例上
    this.$options = options

    // 初始化options.data
    // 代理data对象上的各个属性到Vue实例
    // data对象上的各个属性设置成响应式
    initData(this)
}