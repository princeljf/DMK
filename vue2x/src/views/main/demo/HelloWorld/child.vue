<template>
    <div class="common-demo-tpl">
        <div class="common-box-left-right" v-for="(item,i) in arr" :key="i">
            <span class="left">{{item[ keys.text ]}}</span>
            <span class="right">{{item[ keys.value ]}}</span>
        </div>
    </div>
</template>

<script>
import DMK from 'dmk';
export default {
    mixins: [DMK.mixins],
    name: 'common-demo-tpl',
    data() { 
        return {
            arr: [],
            keys:{
                text: 'text',
                value: 'value',
            },
        }
    },
    components:{ 
        
    },
    created() { 
        DMK.init();
    },
}
</script>

<style lang="" scoped>
</style>