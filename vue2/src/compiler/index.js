import compileToFunction from './compileToFunction.js'
/**
 * 编译器
 */
export default function mount(vm){
    if(!vm.$options.render){
        let tmeplate = ''

        if(vm.$options.tmeplate){
            tmeplate = vm.$options.tmeplate
        }else if(vm.$options.el){
            template = document.querySelector(vm.$options.el).outerHTML
            vm.$el = document.querySelector(vm.$options.el)
        }

        // 生成渲染函数
        const render = compileToFunction(template)
        // 将渲染函数挂载到$options上
        vm.$options.render = render
    }
}