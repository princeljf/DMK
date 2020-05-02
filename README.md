# DMK.js（dataMapsKeys）for Vue mixins

## 一、npm安装
- $ npm install dmk --save

### 最新文档和相关示例，建议git拉取完整代码查看，谢谢！
- 1. git clone https://github.com/princeljf/DMK.git
- 2. cd DMK/vue2x
- 3. npm install
- 4. npm run dev

### DMK v2 主要功能介绍
- 1. 数据处理和数据转换、自动watch数据更新；
- 2. 通过参数配置驱动数据映射：提高解耦性和复用率；
- 3. 团队代码风格统一：轻量简洁、提高可维护性；

### 环境支持
- DMK.mixins：使用了非prop特性，目前需要this.$attrs支持；

- - （注意：Vue版本不支持非prop特性，请调用this.$DMK.init("arr",option)时指定option.dmkMapOpt的d/m/k/ck配置项指向props值）

- DMK.get(arr2obj, maps2keys)：不依赖prop特性和props，专职处理数据，等价于调用一个方法；

  

## 二、DMK引用
- Babel
```
//局部引入
import DMK from 'DMK.js'
export default {
    mixins: [DMK.mixins],//引入mixins
    data(){
        return {
        	arr: [],
            keys: {
            	text: 'text',
            	value: 'value'
            }
        }
    },
    created(){
        DMK.init('arr');//初始化mixins绑定this.arr
    }
}

//全局引入
//入口文件：main.js
import Vue from 'vue'
import DMK from 'dmk';
Vue.mixin(DMK.mixins);//全局注册mixins
Vue.prototype.$DMK = DMK;//全局挂载DMK

//全局配置项
let DEF_OPT = {
    dmkMapOpt:{
        d:'$attrs.d',  //data     
        m:'$attrs.m',//maps
        k:'$attrs.k',  //keys
        ck: 'keys', //子组件绑定模板的数据源，默认为this.keys：支持$data.keys或者$props.keys形式
    },
    valMapOpt:{
        'empty':'',         //值为空字符串''时，转换为设置的值
        'undefined':'',     //值为undefined时，转换为设置的值
        'null':'',          //值为null时，转换为设置的值
    },
    dmkOption: 'dmkOption', //指定组件配置项属性名
};

this.$DMK.setOption( DEF_OPT );//使用前可修改全局配置项
```

## 反馈
- 1. 如果有任何纰漏或错误，请发送问题到我的邮箱：384234884@qq.com。
- 2. 如果邮箱反馈不及时，生产紧急问题添加微信：princeljf，备注dmk通过。








