<template>
    <div class="common-introduce-tpl">
        introduce
    </div>
</template>

<script>
import DMK from 'dmk';
export default {
    mixins: [DMK.mixins],
    name: 'common-introduce-tpl',
    data() { 
        return {
            arr: [],
            keys:{
                text: 'text'
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