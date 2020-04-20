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
            二、全局引入
        </div>
        <div class="common-tpl-code">
            <codemirror v-model="codeParent" :options="{mode: 'javascript'}"></codemirror>
        </div>
        <div class="common-tpl-title">
            三、组件引入
        </div>
        <div class="common-tpl-code">
            <codemirror v-model="codeChild" :options="{mode: 'javascript'}"></codemirror>
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

Vue.mixin(DMK.mixins);//全局注册mixins
Vue.prototype.$DMK = DMK;//全局挂载DMK
//组件在created钩子初始化使用mixins
this.$DMK.init();
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
`;
export default {
    
    name: 'common-install-tpl',
    data() { 
        return {
            codeParent: codeParent,
            codeChild: codeChild,
            codeGet: codeGet,
            arr: [],
            keys:{
                text: 'text'
            },
        }
    },
    components:{ 
        
    },
    created() { 
        this.$DMK.init();
    },
}
</script>

<style lang="" scoped>
</style>