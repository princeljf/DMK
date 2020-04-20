<template>
    <div class="common-child-tpl">
        <div class="common-box-left-right" v-for="(item,i) in arr" :key="i">
            <span class="left">{{item[ keys.text ]}}</span>
            <span class="right">{{item[ keys.value ]}}</span>
        </div>
    </div>
</template>
<script>
export default {
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
        this.$DMK.init();//初始化mixins
    },
}
</script>

<style lang="" scoped>
</style>