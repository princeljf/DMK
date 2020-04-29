<template>
    <div class="common-child-tpl">
        <table class="common-table-params">
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
export default {
    data() { 
        return {
            titleArr:[],//表头
            tableArr:[],//表格数据
            keys:{
                title: 'title',
                key: 'key'
            },
            // keys2:{},//动态keys建议使用computed
        }
    },
    computed: {
        keys2(){
            return this.initKeys();
        }
    },
    created(){
        this.$DMK.init([{titles: 'titleArr'}, {datas: 'tableArr'}],{
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