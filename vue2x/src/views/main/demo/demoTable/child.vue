<template>
    <div class="common-child-tpl">
        <table border="1">
            <tr>
                <th v-for="(item,i) in titleArr" :key="i">
                    {{item[keys.title]}}
                </th>
            </tr>
            <tr v-for="(data,i) in tableArr" :key="i">
                <td v-for="(obj, index) in titleArr" :key="index">{{data[ obj[keys.key] ]}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import DMK from 'dmk'
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
            keys2: this.initKeys()

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