function forEach(array, iteratee) {
    let index = -1
    const length = array.length
    while (++index < array.length) {
        iteratee(array[index], index)
    }
    return array
}

function clone(target, map = new WeakMap()) {
    if (typeof target === 'object') { // 判断是否为引用类型，如果是引用类型直接返回
        const isArray = Array.isArray(target)  // 是引用类型，判断是否是数组，并存储数组标记
        let cloneTarget = isArray ? [] : {} // 如果是数组就使用数组字面量，否则就创建空对象

        if (map.has(target)) { // 如果这个元素在map中存在，就直接返回map中保存的value 
            return map.get(target)
        }
        map.set(target, cloneTarget) // 如果这个元素在map中不存在，就创建一个以target(原元素)为key键的，cloneTarget（克隆元素）为value值的map对象
        // 此处需注意，cloneTarget在此时只是一个空的数组或是对象，但因为map中的key和value都可以是引用类型，value是会随着cloneTarget的改变而变化的，或者可以把value看做是一个指针，指向cloneTarget

        const keys = isArray ? undefined : Object.keys(target) // 如果是对象类型，就把对象所有的key值提取出来存放在keys中

        forEach(keys || target, (value, key) => { 
            if (keys) { // 如果是对象，就让对象key数组的索引等于value
                key = value
            }
            cloneTarget[key] = clone(target[key], map)
        })
        // console.log('111', keys);
        return cloneTarget
    } else {
        return target
    }
}

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
};

console.log(clone(target));
// console.log(target);