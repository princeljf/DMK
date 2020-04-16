<template>
    <div class="common-main-box">
        <div class="left-box">
            <commonMenus @click="munus.click" :d="munus.arr"></commonMenus>
        </div>
        <div class="right-box">
            <component :is="component.tpl"></component>
        </div>
    </div>
</template>

<script>
import commonMenus from './commonMenus';
import {install, introduce, HelloWorld, demoKeys, demoTable, thanks} from './demo.js';
export default {
    name: 'common-main-box',
    data() { 
        return {
            munus:{
                arr: [
                    { text: '安装', tpl: 'install' },
                    { text: '介绍', tpl: 'introduce' },
                    { text: 'HelloWorld', tpl: 'HelloWorld' },
                    { text: '子组件keys', tpl: 'demoKeys' },
                    { text: '表格例子', tpl: 'demoTable' },
                    // { text: '致谢', tpl: 'thanks' },
                ],
                click:(item,i,arr)=>{
                    this.component.tpl = arr[i].tpl;
                },
            },
            component:{
                tpl: 'install'
            }
        }
    },
    components:{ 
        commonMenus,
        install, introduce, HelloWorld, demoKeys, demoTable, thanks,
    },
    created() { 
        
    },
}
</script>

<style lang="">
.common-main-box .left-box{
    box-sizing: border-box;
    padding: 0 15px;
    position: absolute;
    z-index: 99;
    width: 120px;
    border-right: 1px solid #ccc;
    text-align: right;
}
.common-main-box .right-box{
    box-sizing: border-box;
    padding: 0 15px 0 135px;
}

.common-tpl-title{
    color: #0099FF;
    margin-top: 30px;
    line-height: 60px;
    font-size: 20px;
}
.common-btn{
    border-radius: 4px;
    padding: 2px 15px;
    background-color: #0099FF;
    color: #fff;
}
.common-tpl-code p{
    text-indent: 2em;
    margin-bottom: 6px;
}
.common-tpl-code p.tip{
    color: #aaa;
}
</style>