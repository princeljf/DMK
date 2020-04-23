<template>
    <div class="common-menus-tpl">
        <div @click="$emit('click', item, i, $attrs.d)" v-for="(item, i) in arr" :key="i" class="menu-box">
            {{item[keys.text]}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'common-menus-tpl',
    data() { 
        return {
            arr: [],
            keys:{
                text: 'text'
            },
        }
    },
    created() { 
        this.$DMK.init();
    },
}
</script>

<style lang="" scoped>
.common-menus-tpl .left-box{
    position: absolute;
    z-index: 99;
}
</style>