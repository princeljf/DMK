<template>
    <div class="common-main-tpl">
        <h2>安装</h2>
        <div class="common-tpl-title">
            一、npm安装
        </div>
        <div class="common-tpl-code">
            <code>
                $ npm install dmk --save
            </code>
        </div>
        <div class="common-tpl-title">
            二、组件引入
        </div>
        <div class="common-tpl-code">
            <codemirror v-model="codeChild" :options="{mode: 'javascript'}"></codemirror>
        </div>
        <div class="common-tpl-title">
            三、全局引入
        </div>
        <div class="common-tpl-code">
            <codemirror v-model="codeParent" :options="{mode: 'javascript'}"></codemirror>
        </div>
        <div class="common-tpl-title">
            四、使用DMK.get()处理数据函数
        </div>
        <div class="common-tpl-code">
            <codemirror v-model="codeGet" :options="{mode: 'javascript'}"></codemirror>
        </div>
    </div>
</template>

<script>

const codeParent = `
//入口文件：main.js
import Vue from 'vue'
import DMK from 'dmk';
Vue.mixin(DMK.mixins);//全局注册mixins
Vue.prototype.$DMK = DMK;//全局挂载DMK

//全局配置项
let DEF_OPT = {
    dmkMapOpt:{
        d:'$attrs.d',     
        m:'$attrs.m', 
        k:'$attrs.k',
        ck: 'keys', //子组件绑定模板的数据源，默认为this.keys：支持$data.keys或者$props.keys形式
    },
    valMapOpt:{
        'empty':'',         //值为空字符串''时，转换为设置的值
        'undefined':'',     //值为undefined时，转换为设置的值
        'null':'',          //值为null时，转换为设置的值
    }
};

//created钩子函数
this.$DMK.setOption( DEF_OPT );//使用前可设置全局配置项
`;
const codeChild = `
//子组件
import DMK from 'dmk'
export default {
    mixins: [DMK.mixins],
    data() { 
        return {
            arr: [],
        }
    },
    created() { 
        DMK.init('arr');//初始化mixins绑定this.arr
    },
}
`;
const codeGet = `
let arr = DMK.get(arr2obj, maps2keys);
//支持三种参数形式
let arr1 = DMK.get([], {});//数组+对象
let arr2 = DMK.get({}, {});//对象+对象：let obj = DMK.get({}, {}, true);//返回对象
let arr3 = DMK.get({}, []);//对象+数组
`;
export default {
    
    name: 'common-install-tpl',
    data() { 
        return {
            codeParent: codeParent,
            codeChild: codeChild,
            codeGet: codeGet,
        }
    },
}
</script>

<style lang="" scoped>
</style>