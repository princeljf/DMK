<template>
    <div class="common-thanks-tpl">
        thanks
    </div>
</template>

<script>
import DMK from 'dmk';
export default {
    mixins: [DMK.mixins],
    name: 'common-thanks-tpl',
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