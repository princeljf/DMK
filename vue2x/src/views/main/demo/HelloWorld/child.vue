<template>
    <div class="common-child-tpl">
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
    data() { 
        return {
            arr: [],
            keys:{
                text: 'text',
                value: 'value',
            },
        }
    },
    created() { 
        DMK.init();
    },
}
</script>

<style lang="" scoped>
.common-child-tpl{
    margin-bottom: 6px;
}
</style>