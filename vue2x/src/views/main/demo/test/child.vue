<template>
    <div class="common-child-tpl">
        <table border="1">
            <tr>
                <th v-for="(item,i) in titleArr" :key="i">
                    {{item[keys.title]}}
                </th>
            </tr>
            <tr v-for="(item,i) in tableArr" :key="i">
                <td v-for="(obj, index) in titleArr" :key="index">{{item[ obj[keys.key] ]}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
import DMK from '@/views/DMK/lib/DMK.js';
export default {
    mixins: [DMK.mixins],
    data() { 
        return {
            titleArr:[],//表头
            tableArr:[],//表格数据
            keys:{
                title: 'title',
                key: 'key'
            },
            //动态keys请使用computed或者watch或者props处理
            // keys2: this.initKeys(),
        }
    },
    watch: {
        // '$attrs.titles':function(){
        //     //mixins监听完成，后执行此watch，所以tableArr没有新增列数据
        //     this.keys2 = this.initKeys();
        //     DMK.update();//使用update方法更新数据
        // }
    },
    computed: {
        keys2(){
            return this.initKeys();
        }
    },
    created(){
        DMK.init([{titles: 'titleArr'}, {datas: 'tableArr'}],{
            ckMapOpt:{
                datas: 'keys2'
            }
        });
    },
    methods:{
        initKeys(){
            let obj = {}
            this.$attrs.titles.d.map(item=>{
                obj[item.key] = item.key;
            });
            return obj;
        },
    }
}
</script>
<style lang="" scoped>
table{
    width: 100%;
}
</style>