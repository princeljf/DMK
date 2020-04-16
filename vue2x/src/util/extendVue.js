//拓展合并对象方法、兼容vue
export default extendVue = (target, ...objs)=>{
    let isDeep = true;//默认深拷贝
    let length = objs.length;//可变参数长度
    let i = 0;//索引号
    if(typeof target == 'boolean'){
        isDeep = target;
        if(length){
            target = objs[i];
            i++;
        }else{
            return false;//不存在拷贝数据，返回false
        }
    }
    //定义：深拷贝方法
    let extendDeep = (target, obj) => {
        for(let i in obj) {
            if(obj.hasOwnProperty(i)) {
                //检测当前属性是否为array/object
                if(Object.prototype.toString.call(obj[i])=='[object Array]' || Object.prototype.toString.call(obj[i])=='[object Object]') {
                    //如果当前属性为对象，还要检测它是否为数组、赋值对象和原对象是否同一类型
                    if(typeof target[i]!= 'object' || Object.prototype.toString.call(target[i])!=Object.prototype.toString.call(obj[i])){
                        //防止解除原有对象引用
                        target[i] = (Object.prototype.toString.call(obj[i]) == '[object Array]') ? [] : {};
                    }
                    //递归调用extend
                    extendDeep(target[i], obj[i]);
                } else {
                    target[i] = obj[i];
                }
            }
        }
        return target;
    };
    let type = Object.prototype.toString.call(target);
    if(type=='[object Object]' || type=='[object Array]'){ 
        //判断是否存在合并情况
        if(length-i){
            for(;i<length;i++){
                //拷贝类型不同则跳过
                let item = objs[i];
                if(Object.prototype.toString.call(item) == type){
                    if(isDeep){
                        //深拷贝
                        extendDeep(target, item);
                    }else{
                        //浅拷贝
                        for(let key in item){
                            if(item.hasOwnProperty(key)){
                                target[key] = item[key];
                            }
                        }   
                    }
                }
            }
        }else{
            return JSON.parse( JSON.stringify(target) );//仅有一个对象，不存在合并，则返回新对象
        }
    }
    
    return target;
};