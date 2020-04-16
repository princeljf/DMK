<template>
    <div class="common-child-tpl">
        <div v-for="(item,i) in arr" :key="i" class="common-tpl-box">
            <span class="common-tpl-left">
                {{item[keys.text]}}
            </span>
            <span class="common-tpl-right">
                {{item[keys.value]}}
            </span>
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
        DMK.init();
    },
}
</script>

<style lang="" scoped>
</style>