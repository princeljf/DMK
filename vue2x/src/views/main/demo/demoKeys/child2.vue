<template>
    <div class="common-child-tpl">
        <div v-for="(item,i) in arr" :key="i" class="common-box-left-right">
            <span class="left">{{item[ keys.text ]}}</span>
            <span class="right">{{item[ keys.value ]}}</span>
        </div>
        <div v-for="(item,i) in deepObj.arr" :key="i" class="common-box-left-right">
            <span class="left">{{item[ deepObj.keys.text ]}}</span>
            <span class="right">{{item[ deepObj.keys.value ]}}</span>
        </div>
    </div>
</template>
<script>
import DMK from 'dmk'
export default {
    mixins: [DMK.mixins],
    data() { 
        return {
            arr:[
            ],
            keys:{
                text: 'text',
                value: 'value',
            },
            deepObj:{
                arr:[
                ],
                keys:{
                    text: 'name',
                    value: 'score',
                }
            },
        }
    },
    created(){
        //支持点语法，但必须指定key用于绑定父组件传参
        DMK.init(['arr', {arr2:'deepObj.arr'}], {
            ckMapOpt:{
                arr: 'keys',//默认值绑定this.keys，可不传
                arr2: 'deepObj.keys',//指定另一个keys绑定源
            }
        });
    },
}
</script>

<style lang="" scoped>
</style>