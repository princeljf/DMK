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
import {install, introduce, thanks} from './demo.js';
export default {
    name: 'common-main-box',
    data() { 
        return {
            munus:{
                arr: [
                    { text: '安装', tpl: 'install' },
                    { text: '介绍', tpl: 'introduce' },
                    { text: '致谢', tpl: 'thanks' },
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
        install, introduce, thanks,
    },
    created() { 
        
    },
}
</script>

<style lang="" scoped>
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
</style>