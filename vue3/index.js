let targetMap = new Map()
let activeEffect = null
let effect = (eff) => {
    activeEffect = eff
    activeEffect()
    activeEffect = null
}
function track(target, key) {
    if (activeEffect) {
        let depMap = targetMap.get(target)
        if (!depMap) {
            targetMap.set(target, (depMap = new Map()))
        }
        let dep = depMap.get(key)
        if (!dep) {
            depMap.set(key, (dep = new Set()))
        }
        dep.add(activeEffect)
    }
}
function trigger(target, key){
    let depMap = targetMap.get(target)
    if(!depMap) return
    let dep = depMap.get(key)
    if(dep){
        dep.forEach(effect => effect())
    }
}
const ref = (a) => {
    const r = {
        get value(){
            track(r, 'value')
            return a
        },
        set value(newVal){
            if(a!==newVal){
                a = newVal
                trigger(r, 'value')
            }
        }
    }
    return r
}
const computed = (getter) => {
    const result = ref()
    effect(() => (result.value = getter()))
    return result
}

const reactive = (target) => {
    const handler = {
        get(target, key, receiver){
            let result = Reflect.get(target, key, receiver)
            track(target, key)
            return result
        },
        set(target, key, value, receiver){
            let oldValue = target[key]
            let result = Reflect.set(target, key, value, receiver)
            if(oldValue !== value){
                trigger(target, key)
            }
            return result
        }
    }
    return new Proxy(target, handler)
}

let product = reactive({ price: 10, quantity: 1 })
let salePrice = computed(() => {
    return product.price * 0.9
})
let totalprice = computed(() => {
    return salePrice.value * product.quantity
})
console.log(`salePrice: ${salePrice.value}, totalPrice: ${totalprice.value}`)

product.price = 20
console.log(`salePrice: ${salePrice.value}, totalPrice: ${totalprice.value}`)

product.quantity = 2
console.log(`salePrice: ${salePrice.value}, totalPrice: ${totalprice.value}`)



