# DMK.js（dataMapsKeysMixins）for Vue mixins

### DMK主要功能：
1. 数据处理和数据转换
2. 通过参数配置驱动数据映射
3. 团队代码风格统一、不依赖API文档提前开发
4. 代码简洁明了、提高可维护性

## 一、环境支持
- 子组件使用了非prop特性，目前需要this.$attrs支持（'Vue当前版本不支持非prop特性，请调用this.DMK("arr",option)时指定option的d/m/k配置项指向props值或者通过父组件处理！）
- 父组件不依赖prop特性和props，专职处理数据，等价于调用一个方法

## 二、引用
- Babel
(```)
import DMK from 'DMK.js'
export default {
    mixins: [DMK]
}
(```)

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
	mixins: [DMK],
    data(){
        return {
            //
        }
    },
    props:['arr']
}
</script>
------ DMK实现父组件 ------
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
	mixins: [DMK],
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
    	this.arr = this.DMK(this.apiData, this.keys);
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
------ DMK实现子组件 ------
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
            //合并子组件的keys对象，指向绑定apiData的name和age
            keys:{
            	text: 'name',//支持string、function、object
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
    	this.DMK();//等同于this.DMK('arr')，可指定为其它存储位置    	
    }
}
</script>
```

## 参数说明：子组件this.DMK(bindKey, option)
|参数名|类型|默认值|备注|
|:—:|:—:|:—:|:—:|
|bindKey|string|'arr'|传递数据为字符串类型时，表示指定子组件绑定数据存储位置|
|option|object|{bindKey:'arr', d:'$attrs.d', m:'$attrs.m', k:'$attrs.k', childKeys:'keys', undefined:'', empty:'', null:''}|DMK实现默认值说明|
|option.bindKey|string|'arr'|指定子组件绑定数据存储位置|
|option.d|string|'$attrs.d'|非prop特性支持存储 数据初始对象|
|option.m|string|'$attrs.m'|非prop特性支持存储 数据转换对象|
|option.k|string|'$attrs.k'|非prop特性支持存储 数据映射对象|
|option.childKeys|string|'keys'|指定子组件绑定数据存储位置|
|option.undefined|string|''|undefined数据转换默认值|
|option.empty|string|''|empty(空字符串)数据转换默认值|
|option.null|string|''|null数据转换默认值|
|return返回值|array|[]|如果bindKey为字符串且为真，则返回this[bindKey],否则返回false|

## 参数说明：父组件this.DMK(bindKey, maps2keys, childKeys)
### 可以获取到所有通过子组件非prop形式传参处理后的数据，即把子组件处理数据的功能原封不动的实现在了父组件
|参数名|类型|默认值|备注|
|:—:|:—:|:—:|:—:|
|bindKey|array、object|'arr'|传递数据为数组类型或对象类型时，表示父组件调用|
|maps2keys|object|false|如果maps2keys为对象类型，则keys=maps2keys|
|maps2keys|array|false|如果maps2keys为数组类型，则maps=maps2keys|
|childKeys|object|keys|如果childKeys为对象类型，则childKey=maps2keys，否则childKey=keys|
|return返回值|array|[]|新数组|

## 反馈
- 如果有任何纰漏或错误，请发送问题到我的邮箱：384234884@qq.com
- 谢谢！






