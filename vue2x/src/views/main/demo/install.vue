<template>
    <div class="common-install-tpl">
        install
    </div>
</template>

<script>
import DMK from 'dmk';
export default {
    mixins: [DMK.mixins],
    name: 'common-install-tpl',
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