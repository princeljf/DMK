<template>
    <div class="tpl-box">
        <div v-for="(item,i) in arr" :key="i" class="list-box">
            <span class="left">{{item[keys.text]}}</span><span class="right">{{item[keys.value]}}</span>
        </div>
    </div>
</template>
<script>
import DMK from './lib/dataMapsKeysMixins'
export default {
    mixins: [DMK],
    data() {
        return {
            arr: [],
            keys:{
                text: 'name',
                value: 'age',
            },
        };
    },
    created() {
        this.DMK('arr');
    },
};
</script>
<style>
.list-box{ padding: 0 20px; border: 1px solid #aaa; }
.list-box span{ display: inline-block; width: 50%; box-sizing: border-box; }
.list-box .right{ text-align: right; }

</style>

