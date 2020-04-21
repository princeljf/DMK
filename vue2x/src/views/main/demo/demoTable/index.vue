<template>
    <div class="common-main-tpl">
        <h2>动态表格监听</h2>
        <div class="common-demo-tpl">
            <h3>渲染结果</h3>
            <p><span @click="clickBtn('add')" class="common-btn">增加一列</span><span @click="clickBtn('del')" class="common-btn">删除一列</span></p>
            <child :titles="{d:titleArr}" :datas="{d:apiData1, k:titleKeys}"></child>
            <h3 class="common-show-code">查看代码</h3>
            <div class="common-code-box">
                <span>父组件：index.vue</span>
                <codemirror v-model="codeParent"></codemirror>
                <span>子组件：child.vue</span>
                <codemirror v-model="codeChild"></codemirror>
            </div>
        </div>
    </div>
</template>
<script>

import child from './child'
import dateUtil from '@/util/dateUtil.js'
const codeParent = `
<script>
<template>
    <div class="common-demo-tpl">
        <p><span @click="clickBtn('add')" class="common-btn">增加一列</span><span @click="clickBtn('del')" class="common-btn">删除一列</span></p>
        <child :titles="{d:titleArr}" :datas="{d:apiData1, k:titleKeys}"></child>
    </div>
</template>
export default {
    data() { 
        return {
            apiData1:[
                {studenName:'张三', birthday:'1992-10-05', phoneNumber:'13590269110', datetime: new Date().getTime(), score1: 100, score2: 90, score3: 100, score4: 100 },
                {studenName:'李四', birthday:'1996-10-04', phoneNumber:'13390269814', datetime: new Date().getTime(), score1: 100, score2: '', score3: undefined, score4: '' },
                {studenName:'王五', birthday:'1988-08-05', phoneNumber:'13490269195', datetime: new Date().getTime(), score1: 100, score2: '', score3: null, score4: '错误数据' },
            ],
            titleArr:[
                {title: '姓名', key: 'name' },
                {title: '出生日期', key: 'birthday' },
                {title: '手机号', key: 'phone' },
                {title: '报名日期', key: 'date' },
                {title: '科目一', key: 'score1' },
                {title: '科目二', key: 'score2' },
                {title: '科目三', key: 'score3' },
                {title: '科目四', key: 'score4' },
                {title: '是否合格', key: 'result' },
            ],
            titleKeys:{
                name: 'studenName',//映射key
                birthday: (item)=>{
                    return item.birthday.replace(/\-/g, '\/');//函数处理
                },
                phone: 'phoneNumber',
                date: (item)=>{
                    return dateUtil.format(item.datetime, 'yyyy-MM-dd');
                },
                score3: {default: 'score3', undefined:'undefined默认转换为空串', null:'null默认转换为空串' },
                score4: {default: 'score4', empty:'空串默认转换值', '错误数据':'任意转换值' },
                result: (item)=>{
                    return item.score1>=80&&item.score2>=80&&item.score3>=80&&item.score4>=80 ? '合格' : '/';
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
                this.$set(this.titleKeys, addKey, 'studenName');
            }else if(type=='del'){
                this.addLength--;
                this.titleArr.pop();
            }
        },
    },
}
<\/script>
`;
const codeChild = `
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
export default {
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
        //     this.$DMK.update();//使用update方法更新数据
        // }
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
                {studenName:'张三', birthday:'1992-10-05', phoneNumber:'13590269110', datetime: new Date().getTime(), score1: 100, score2: 90, score3: 100, score4: 100 },
                {studenName:'李四', birthday:'1996-10-04', phoneNumber:'13390269814', datetime: new Date().getTime(), score1: 100, score2: '', score3: undefined, score4: '' },
                {studenName:'王五', birthday:'1988-08-05', phoneNumber:'13490269195', datetime: new Date().getTime(), score1: 100, score2: '', score3: null, score4: '错误数据' },
            ],
            titleArr:[
                {title: '姓名', key: 'name' },
                {title: '出生日期', key: 'birthday' },
                {title: '手机号', key: 'phone' },
                {title: '报名日期', key: 'date' },
                {title: '科目一', key: 'score1' },
                {title: '科目二', key: 'score2' },
                {title: '科目三', key: 'score3' },
                {title: '科目四', key: 'score4' },
                {title: '是否合格', key: 'result' },
            ],
            titleKeys:{
                name: 'studenName',//映射key
                birthday: (item)=>{
                    return item.birthday.replace(/\-/g, '\/');//函数处理
                },
                phone: 'phoneNumber',
                date: (item)=>{
                    return dateUtil.format(item.datetime, 'yyyy-MM-dd');
                },
                score3: {default: 'score3', undefined:'undefined默认转换为空串', null:'null默认转换为空串' },
                score4: {default: 'score4', empty:'空串默认转换值', '错误数据':'任意转换值' },
                result: (item)=>{
                    return item.score1>=80&&item.score2>=80&&item.score3>=80&&item.score4>=80 ? '合格' : '/';
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
                this.$set(this.titleKeys, addKey, 'studenName');
            }else if(type=='del'){
                this.addLength--;
                this.titleArr.pop();
            }
        },
    },
}
</script>

<style lang="" scoped>
</style>