# DMK.js（dataMapsKeysMixins）for Vue mixins

### DMK v2.0.0主要功能：
1. 数据处理和数据转换
2. 通过参数配置驱动数据映射
3. 团队代码风格统一
4. 代码简洁、提高可维护性

## 一、环境支持
- 子组件形式：使用了非prop特性，目前需要this.$attrs支持（'Vue当前版本不支持非prop特性，请调用DMK.init("arr",option)时指定option.dmkMapOpt的d/m/k/ck配置项指向props值！）
- 父组件形式：不依赖prop特性和props，专职处理数据，等价于调用一个方法DMK.get(arr2obj, maps2keys);

## 二、引用
- Babel
```
import DMK from 'DMK.js'
export default {
    mixins: [DMK.mixins],
    data(){
        return {
            bindKey: []
        }
    },
    created(){
        //子组件初始化绑定调用
        DMK.init('bindKey', option);//声明绑定this.bindKey数组，父组件数据源变动后，实现自动更新bindKey
        //父组件形式调用
        let arr = DMK.get(arr2obj, maps2keys);//arr为处理后的数据
        this.bindKey = arr;//不会自动更新
    }
}
```

## 三、hello world对比（场景：渲染列表数据）
渲染结果需求：
- 张三    24岁
- 李四    26岁
- 王五    /

```
//父组件 parent.vue
<template>
    <div>
        <Child :arr="apiData"></Child>
    </div>
</template>
<script>
import Child form './child';
export default {
    data(){
        return {
            //接口数据
            apiData:[
            	{name: '张三', age:'24'},
            	{name: '李四', age:'26'},
            	{name: '王五', age:''}
            ]
        }
    },
}	
</script>
------ 
//子组件 child.vue
<template>
    <div v-for=“(item,i) in arr”>
    	<!-- 方法一 子组件内部处理-->
    	<span class=“left”>{{item.name}}</span><span class=“right”>{{item.age}}岁</span>
    	<!-- 方法二 父组件数据处理-->
    	<!-- <span class=“left”>item.name</span><span class=“right”>item.age</span> -->
    	<!-- 其它方法：computed、watch、预处理等等... -->
    </div>
</template>
<script>
import DMK from 'DMK.js';
export default {
	mixins: [DMK.mixins],
    data(){
        return {
            //
        }
    },
    props:['arr']
}
</script>
```
###常规代码如上示例，因开发者的代码习惯不同，可能会导致「子组件」模板实现方案各不相同，增加了代码的复杂度和阅读难度。

###DMK实现子组件（推荐）
```
//父组件 parent.vue
<template>
    <div>
        <Child :d="apiData" :k="keys"></Child>
    </div>
</template>
<script>
import Child form './child';
export default {
    data(){
        return {
            //接口数据
            apiData:[
            	{name: '张三', age:'24'},
            	{name: '李四', age:'26'},
            	{name: '王五', age:''}
            ],
            //合并子组件的keys对象，指向绑定apiData的name和age，开发逻辑无需关注子组件实现
            keys:{
            	text: 'name',//支持string(嵌套支持点语法name.1.a)、function、object
            	value: {
            		//更多高级用法参照文档说明
            		default: (item, i, apiData)=>{
	            		//数据处理和逻辑处理
	            		return item.name + '岁';
	            	},//default为默认指向参数：value:'age'等同于value:{default:'age'}
	            	empty: '/',//为空字符串转换为另一个值，例如'/'，默认配置项empty(空字符串)、undefined、null转换为空字符串''
            	}
            }
        }
    },
}	
</script>
//子组件 child.vue 
<template>
    <div v-for=“(item,i) in arr”>
    	<!-- 旧 -->
    	<!-- <span class=“left”>item.name</span><span class=“right”>item.age</span> -->
    	<!-- 新 区别：自定义一个keys对象，指向绑定arr的key值，模板都是这样使用-->
    	<span class=“left”>item[keys.text]</span><span class=“right”>item[keys.value]</span>
    </div>
</template>
<script>
export default {
	mixins: [DMK],
    data(){
        return {
        	arr:[],
            keys:{
            	text: 'text',
            	value: 'value'
            }
        }
    },
    created(){
    	//初始化
    	DMK.init();//等同于DMK.init('arr')，可指定为其它存储位置    	
    }
}
</script>
```
###DMK子组件想要做的事：新增一个keys对象代替传统写死key值的方案，可通过父组件灵活控制。提高模板复用率，DMK还实现了自动watch数据功能等。

###DMK实现父组件（推荐：VUE不支持非prop特性时，纯当做方法调用处理数据时）
```
//父组件 parent.vue
<template>
    <div>
        <Child :arr="arr"></Child>
    </div>
</template>
<script>
import DMK from 'DMK.js';
import Child form './child';
export default {
	mixins: [DMK.mixins],
    data(){
        return {
        	arr:[],
            //接口数据
            apiData:[
            	{name: '张三', age:'24'},
            	{name: '李四', age:'26'},
            	{name: '王五', age:''}
            ],
            //合并子组件的keys对象，指向绑定apiData的name和age
            keys:{
            	text: 'name',//支持string、function、object
            	value: {
            		//更多高级用法参照接口说明
            		default: (item, i, apiData)=>{
	            		//数据处理和逻辑处理
	            		return item.name + '岁';
	            	},//default为默认指向参数：value:'age'等同于value:{default:'age'}
	            	empty: '/',//为空字符串转换为另一个值，例如'/'，默认配置项empty(空字符串)、undefined、null转换为空字符串''
            	}
            }
        }
    },
    created(){
    	//数据处理和数据转换，不关注子组件实现
    	this.arr = DMK.get(this.apiData, this.keys);
    }
}	
</script>
------ 
//子组件 child.vue
<template>
    <div v-for=“(item,i) in arr”>
    	<span class=“left”>{{item.name}}</span><span class=“right”>{{item.age}}岁</span>
    </div>
</template>
<script>
export default {
    data(){
        return {
            //
        }
    },
    props:['arr']
}
</script>
```

## 参数说明：父组件传递数据给子组件
```
例子：
<child-components :d="arr/obj" :m="maps" :k="keys"></child-components>
<script>
export default {
    data(){
        return {
            arr:[
                {name: '张三', age:'24'},
            	{name: '李四', age:'26'},
            	{name: '王五', age:''}
            ],
            obj:{
                name1: '张三', value1: '24',
                name2: '李四', value2: [{age:'26'}],
                name3: '王五', value3: '',
                name4: '特殊值', value3: null/undefined/empty(''),
            },
            //当d为obj对象时，配合使用
            maps:[
                {text: 'name1', value: 'value1'},//等价于value: {default: 'value1'}
                {text: 'name2', value: 'value2.0.age'},//嵌套数据支持点语法引用
                {text: 'name3', value: (obj,value3)=>{
                    //箭头函数this指向父组件实例，因此可以引用this.other其它数据源或者方法等
                    return obj[value3]==='' ? '0' : obj[value3];//各种逻辑处理
                }},
                {text: 'name4', value: {default:'value4', undefined:'未定义', null:'我是null', empty:'我是空字符串'},//特殊值转换
            ],
            keys:{
                text: 'name', value: 'age'  //同样支持maps高级语法特性
            },
            other:{
                //...
            }
            
        }
    },
}
</script>
```
| 参数名 | 类型 | 默认值 | 备注 |
| :------| :------: | :------: | :------ |
|d|array/object|undefined|必传：父组件传递给子组件的数据源，即this.$attrs.d|
|m|array|undefined|可不传：把object转换为有序数组数据的转换配置对象|
|k|object|子组件keys|可不传：等价于子组件定义的keys映射配置对象，传递此参数会进行合并:extend(keys,k)|


## 参数说明：子组件DMK.init(bindKey, option)
| 参数名 | 类型 | 默认值 | 备注 |
| :------| :------: | :------: | :------ |
|bindKey|string|'arr'|1.传递参数为字符串类型时，表示指定子组件绑定数据存储位置|
|bindKey|object|需要指定{key:value}|2.传递参数为对象类型时，key表示数据源名称、value表示指定子组件绑定数据存储位置(支持点语法)|
|bindKey|array|支持格式：['str',{key:value},...]|3.传递参数为数组类型时，表示指定多个子组件绑定数据存储位置|
|option|object|参照如下说明|DMK实现默认值说明|
|option.dmkMapOpt|object|参照如下说明|例：let option = {dmkMapOpt:{d:'d', m:'m', k:'k'}}|
|option.dmkMapOpt.d|string|'$attrs.d'|非prop特性支持存储 数据初始对象|
|option.dmkMapOpt.m|string|'$attrs.m'|非prop特性支持存储 数据转换对象|
|option.dmkMapOpt.k|string|'$attrs.k'|非prop特性支持存储 数据映射对象|
|option.ckMapOpt|object|'keys'|非prop特性支持存储 数据映射对象|
|option.ckMapOpt[bindKey]|string|'keys'|key为参数一指定的bindKey名，例：let option = {ckMapOpt:{arr:'keys', arr2:'keys2', ...}}|
|option.undefined|string|''|undefined数据转换默认值|
|option.empty|string|''|empty(空字符串)数据转换默认值|
|option.null|string|''|null数据转换默认值|
|return返回值|array|[]|如果bindKey为字符串且为真，则返回this[bindKey],否则返回false|

## 参数说明：父组件DMK.get(arr2obj, maps2keys)
### 可以获取到所有通过子组件非prop形式传参处理后的数据，即把子组件处理数据的功能原封不动的实现在了父组件
| 参数名 | 类型 | 默认值 | 备注 |
| :------| :------: | :------: | :------ |
|arr2obj|array/object|undefined|传递数据为数组类型或对象类型时，表示父组件调用|
|maps2keys|object|false|如果maps2keys为对象类型，则keys=maps2keys|
|maps2keys|array|false|如果maps2keys为数组类型，则maps=maps2keys|
|return返回值|array|[]|新数组|
- 其它说明：当arr2obj为对象时：maps2keys可为对象或者数组，当arr2obj为数组时：maps2keys可为对象配合使用

### DMK升级相关问题
- DMK v2.0.0向下兼容v1.1.0所有功能，优化了内部代码结构、新增拓展功能。
- 一、变更说明：
1. 第一步引入不变：
   ```
   import DMK from 'DMK.js'
   ```
2. 第二步组件mixins注册
   ```
   //原来
   mixins: [DMK]
   //新版替代
   mixins: [DMK.mixins]
   ```
3. 第三步created方法初始化调用
   ```
   //原来
   this.DMK();
   //新版替代
   DMK.init();
   ```
4. 注意：默认不使用mixins绑定功能，只处理数据提供了新的接口DMK.get()方法替代原有调用形式
   ```
   //原来
   let arr = this.DMK(arr2obj, maps2keys);
   //新版替代
   let arr = DMK.get(arr2obj, maps2keys);//可无需注册DKM.mixins了
   ```

## 反馈
- 如果有任何纰漏或错误，请发送问题到我的邮箱：384234884@qq.com
- 谢谢！






