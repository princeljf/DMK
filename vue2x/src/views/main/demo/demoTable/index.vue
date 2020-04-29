<template>
    <div class="common-main-tpl">
        <h2>动态表格监听</h2>
        <div class="common-demo-tpl">
            <h3>不用定义相关props属性，dmk绑定数据源变动会自动watch更新。</h3>
            <p><span @click="clickBtn('add')" class="common-btn">增加一列</span><span v-show="addLength" @click="clickBtn('del')" class="common-btn">删除一列</span></p>
            <child :titles="{d:titleArr}" :datas="{d:apiData1, k:titleKeys}"></child>
            <div class="common-code-box">
                <span>子组件模板：child.vue</span>
                <codemirror v-model="codeChild"></codemirror>
                <span>父组件：index.vue</span>
                <codemirror v-model="codeParent"></codemirror>
            </div>
        </div>
    </div>
</template>
<script>

import child from './child'
import dateUtil from '@/util/dateUtil.js'
const codeParent = `
//引用表格组件
<child :titles="{d:titleArr}" :datas="{d:apiData1, k:titleKeys}"></child>

<script>
export default {
    data() { 
        return {
            apiData1:[
                {studenName:'张三', birthday:'1992-10-05', age:50, phone:'13590269110'},
                {studenName:'李四', birthday:'1996-10-04', age:22, phone:'13390269814'},
                {studenName:'王五', birthday:'1988-08-05', age:34, phone:'13490269195'},
            ],
            titleArr:[
                {title: '姓名', key: 'name' },
                {title: '年龄', key: 'age' },
                {title: '出生日期', key: 'birthday' },
                {title: '手机号', key: 'phone' },
            ],
            //需要处理的数据映射
            titleKeys:{
                name: 'studenName',
                phone: (item)=>{
                    let reg=/(\d{3})\d{4}(\d{4})/
                    return item.phone.replace(reg,'$1****$2')
                },
            },
            addLength: 0,
        }
    },
    components:{
        child
    },
    methods:{
        clickBtn(type){
            this.addLength = type=='add' ? this.addLength++ : this.addLength--;
            let addKey = 'add'+this.addLength;
            if(type=='add'){
                this.addLength++;
                this.titleArr.push({title: addKey, key: addKey },);
                this.titleKeys[addKey] = addKey;
            }else if(type=='del'){
                this.addLength && this.titleArr.pop() && this.addLength--;
            }
        },
    },
}
<\/script>
`;
const codeChild = `
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
<\/script>
`;
export default {
    data() { 
        return {
            codeParent: codeParent,
            codeChild: codeChild,
            apiData1:[
                {studenName:'张三', birthday:'1992-10-05', age:50, phone:'13590269110'},
                {studenName:'李四', birthday:'1996-10-04', age:22, phone:'13390269814'},
                {studenName:'王五', birthday:'1988-08-05', age:34, phone:'13490269195'},
            ],
            titleArr:[
                {title: '姓名', key: 'name' },
                {title: '年龄', key: 'age' },
                {title: '出生日期', key: 'birthday' },
                {title: '手机号', key: 'phone' },
            ],
            //需要处理的数据映射
            titleKeys:{
                name: 'studenName',
                phone: (item)=>{
                    let reg=/(\d{3})\d{4}(\d{4})/
                    return item.phone.replace(reg,'$1****$2')
                },
            },
            addLength: 0,
        }
    },
    components:{
        child
    },
    methods:{
        clickBtn(type){
            this.addLength = type=='add' ? this.addLength++ : this.addLength--;
            let addKey = 'add'+this.addLength;
            if(type=='add'){
                this.addLength++;
                this.titleArr.push({title: addKey, key: addKey },);
                this.titleKeys[addKey] = addKey;
            }else if(type=='del'){
                this.addLength && this.titleArr.pop() && this.addLength--;
            }
        },
    },
}
</script>

<style lang="" scoped>
</style>