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
import { install, introduce, demoStep, demoKeys, demoGet, demoTable, demoUpdate, thanks} from './demo.js';
export default {
    name: 'common-main-box',
    data() { 
        return {
            munus:{
                arr: [
                    { text: '介绍', tpl: 'introduce' },
                    { text: '安装', tpl: 'install' },
                    { text: '起步', tpl: 'demoStep' },
                    { text: 'DMK.init()', tpl: 'demoKeys' },
                    { text: 'DMK.get()', tpl: 'demoGet' },
                    { text: '动态表格监听', tpl: 'demoTable' },
                    { text: 'DMK.update()', tpl: 'demoUpdate' },
                    { text: '致谢', tpl: 'thanks' },
                ],
                click:(item,i,arr)=>{
                    this.component.tpl = arr[i].tpl;
                },
            },
            component:{
                tpl: 'introduce',
                // tpl: 'introduce',
            }
        }
    },
    components:{ 
        commonMenus,
        install, introduce, demoStep, demoKeys, demoGet, demoTable, demoUpdate, thanks,
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
    width: 150px;
    border-right: 1px solid #ccc;
    text-align: right;
}
.common-main-box .right-box{
    box-sizing: border-box;
    padding: 0 15px 0 165px;
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
.common-tpl-code{
}
.common-tpl-code p{
    text-indent: 2em;
    margin-bottom: 6px;
}
.common-tpl-code p.tip{
    color: #aaa;
}
.common-show-code{
    margin: 20px 0 0 0;
    line-height: 60px;
    border-top: 1px solid #eee;
}
.common-code-box{
    margin: 6px 0;
}
.common-child-tpl{
    margin-bottom: 6px;
}
</style>