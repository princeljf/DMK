<template>
    <div class="common-child-tpl">
        <div v-for="(item,i) in arr" :key="i" class="common-box-left-right">
            <span class="left">{{item[ keys.text ]}}</span>
            <span class="right">{{item[ keys.value ]}}</span>
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
        }
    },
    created(){
        DMK.init();//等价于DMK.init('arr') 或 DMK.init({arr:'arr'})
    },
}
</script>

<style lang="" scoped>
</style>