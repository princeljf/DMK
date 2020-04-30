<template>
    <div class="common-main-tpl">
        <h2>DMK.update()更新方法</h2>
        <div class="common-demo-tpl">
            <h3>一、动态表格监听-示例中：</h3>
            <p>1、动态keys我们使用的是computed实现的，现在我们改用watch，然后点击"增加一列"；我们发现表头更新了，但是表格数据没有渲染；</p>
            <p>2、原因：DMK.mixins内部通过watch更新数据，子组件watch执行前已经完成了数据更新；</p>
            <p>3、执行流程：数据源改变->子组件computed->DMK.mixins内部watch->子组件watch；</p>
            <p>4、解决方案：主动调用DMK.update()方法重新生成数据。</p>
            <p><span @click="clickBtn('add')" class="common-btn">增加一列</span><span v-show="addLength" @click="clickBtn('del')" class="common-btn">删除一列</span></p>
            <child :titles="{d:titleArr}" :datas="{d:apiData1, k:titleKeys}"></child>
            <div class="common-code-box">
                <span>子组件模板：child.vue</span>
                <codemirror v-model="codeChild"></codemirror>
            </div>
        </div>
        <h3 class="common-show-code">参数说明：DMK.update(callback, context)</h3>
        <table class="common-table-params">
            <tr><th>参数名</th><th>类型</th><th>默认值</th><th>备注</th></tr>
            <tr><td>callback</td><td>function</td><td>无</td><td>非必填，回调钩子函数</td></tr>
            <tr><td>context</td><td>this</td><td>this->最后一个实例对象</td><td>非必填，指定更新的实例对象</td></tr>
        </table>
        <h3 class="common-show-code">示例：</h3>
        <div class="common-code-box">
            <codemirror value='
<script>
    // callback和context参数顺序可调换
    DMK.update();//子组件引入无需指定实例对象，即当前组件实例对象
    DMK.update( ()=>{console.log("回调钩子函数")} );//设置回调函数
    DMK.update( this });//指定更新数据的实例对象
    DMK.update( ()=>{console.log("回调钩子函数")}, this );//设置回调函数和实例对象
    DMK.update( this, ()=>{console.log("回调钩子函数")} });//设置回调函数和实例对象
    //全局注册mixins注意事项：必须指定更新当前实例对象，否则有可能更新不成功
    this.$DMK.update( this );//通常传this指向当前实例即可
</script>
            '></codemirror>
        </div>
    </div>
</template>
<script>

import child from './child'
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
            keys2:this.initKeys(),//动态keys建议使用computed
        }
    },
    watch: {
        '$attrs.titles.d':{
            handler(){
                this.keys2 = this.initKeys();
                // 重新生成数据，全局注册则需要传递实例对象this
                // this.$DMK.update(this);
            }
        }
    },
    computed: {
        // keys2(){
        //     return this.initKeys();
        // }
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