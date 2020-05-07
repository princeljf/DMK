<template>
    <div class="common-main-tpl">
        <h2>起步</h2>
        <div class="common-demo-tpl">
            <h3>前置说明</h3>
            <div class="common-step-title">1、创建文件</div>
            <div class="common-code-box">
                <span class="fw-bold">创建模板：子组件：child.vue</span>
                <codemirror v-model="codeChild"></codemirror>
            </div>
            <div class="common-code-box">
                <span class="fw-bold">引用模板：</span>
                <codemirror v-model="codeParent"></codemirror>
            </div>
            <child :d="apiData1"></child>
            <div class="common-step-title">2、代码不写死原则：前端数据源不可控</div>
            <div class="common-code-box">
                <codemirror value="
//基准数据
let apiData1 = [
    {text: '张三', value: 80},
    {text: '李四', value: 58},
]
//常见数据：传递给子组件前需要处理为【基准数据】
let apiData2 = [
    {name: '张三', score: 80},
    {name: '李四', score: 58},
]
//DMK.get(arr2obj, maps2keys)：封装为统一处理函数，实现了各种数据转换
let keys = {
    text: 'name',
    value: 'score'
};
let apiData1 = DMK.get(apiData2, keys);//处理为【基准数据】
                " :options="{mode:'javascript'}"></codemirror>
            </div>

            <div class="common-step-title">3、新的思考：<i class="col-red">要是所有的子组件模板都具备处理数据的能力呢？</i></div>
            <div class="common-code-box">
                <codemirror value='
<child :d="apiData2" :k="keys2"></child>
                '></codemirror>
            </div>
            <child :d="apiData2" :k="keys"></child>

            <div class="common-step-title">4、需求千变万化：码农初心不改！</div>
            <child :d="apiData2" :k="keys2"></child>
            <div class="common-code-box">
                <codemirror value='
<child :d="apiData2" :k="keys2"></child>
<script>
let keys2={
    text: "name",
    value:(item)=>{
        let str = item.score+"分，";
        str += item.score>=60 ? "成绩合格" : "成绩不达标";
        return str;
    }
}
</script>
                '></codemirror>
            </div>

            <div class="common-step-title"><b>5、引入DMK.mixins后，通过修改传入配置就能满足各种需求变更！</b></div>
            <h3 class="common-show-code">参数说明：d、m、k属性</h3>
            <table class="common-table-params">
                <tr><th>参数名</th><th>类型</th><th>默认值</th><th>备注</th></tr>
                <tr><td>d</td><td>array | object</td><td>无</td><td>必填</td></tr>
                <tr><td>m</td><td>array</td><td>无</td><td>非必填：当d类型为object时配合使用</td></tr>
                <tr><td>k</td><td>object</td><td>this.keys</td><td>非必填：当d类型为array | object时配合使用<br></td></tr>
            </table>
            <h3 class="common-show-code">示例：详细描述了各种场景支持</h3>
            <div class="common-code-box">
                <codemirror value='
    <child :d="obj" :m="arr"></child>
    <script>
    let obj = { name:"张三", score1:"90", score2:"100", score3:"85", score4:"自定义", age:undefined, sex:null, marry:"", date:[{startDate:"2019-10-12"}] }

    let arr = [
        { text:"姓名", value:"name" },//直接映射obj.name
        { text:"年龄", value:{default:"age", undefined:"未填写"} },//值为undefined轩转换，默认为空串""
        { text:"姓别", value:{default:"sex", null:"未填写"} },//值为null时转换，默认为空串""
        { text:"婚否", value:{default:"marry", empty:"未填写"} },//值为空串""时转换，默认为空串""
        { text:"报名时间", value:"date.0.startDate"},//支持点语法深度映射
        { text:"科目一", value:{default:"score1", callback:(val)=>{ return val}} },//内置callback钩子，在值处理完成后执行
        { text:"科目二", value:{default:"score2"} },//等同于value:"score2"
        { text:"科目三", value:(item)=>{return item.score3} },//function函数处理
        { text:"科目四", value:{default:"score4", "自定义":"等待公布成绩"} },//除关键字外：支持自定义值转换
        { text:"是否完成", value:false },//值无法匹配obj映射关系时，直接当作值返回。
    ]
    </script>
    //渲染结果如下
                '></codemirror>
            </div>
            <child :d="obj" :m="arr"></child>

            <h3 class="common-show-code">m、k -> maps2keys支持格式说明 {text: value} </h3>
            <p>1、text为指定输出key对应名。</p>
            <p>2、value支持四种格式：值输出、string、object、function。</p>
            <div class="common-text-params ti2em">
                <p>(1) 值输出：!value || (isString(value) && !/.\../.test(value) && !(value in obj))</p>
                <p>(2) string：支持点语法深度映射</p>
                <p>(3) object：{default:value, undefined:'', null:'', empty:'', callback:(val,key,data)=>{return value}, '自定义':''}</p>
                <p>(4) function：(item,i,data)=>{ return value }</p>
            </div>
            <p>2.1、object.default：指定映射key；</p>
            <p>2.2、值转换undefined | null | empty(空串)：默认转换为""空串；</p>
            <p>2.3、object.callback：数据处理完成后的回调钩子；</p>
            <p>2.4、object.除关键字：指定自定义转换值；</p>
        </div>
    </div>
</template>
<script>
import child from './child'
let codeParent = `
<child :d="apiData1"></child>
<script>
//基准数据
let apiData1 = [
    {text: '张三', value: 80},
    {text: '李四', value: 58},
]
<\/script>
//渲染结果如下
`;
let codeChild = `
<template>
    <div class="common-child-tpl">
        <div class="common-box-left-right" v-for="(item,i) in arr" :key="i">
            <span class="left">{{item[ keys.text ]}}</span>
            <span class="right">{{item[ keys.value ]}}</span>
        </div>
    </div>
</template>
<script>
import DMK from 'dmk'
export default {
    mixins: [DMK.mixins],
    data() { 
        return {
            arr: [],
            keys:{
                text: 'text',
                value: 'value',
            },
        }
    },
    created() { 
        DMK.init();//初始化mixins
    },
}
<\/script>
`;
export default {
    data() { 
        return {
            codeParent: codeParent,
            codeChild: codeChild,
            apiData1:[
                {text: '张三', value: 80},
                {text: '李四', value: 58},
            ],
            apiData2:[
                {name: '张三', score: 80},
                {name: '李四', score: 58},
            ],
            keys:{
                text: 'name',
                value: 'score'
            },
            keys2:{
                text: 'name',
                value:(item)=>{
                    let str = item.score+'分，';
                    str += item.score>=60 ? '成绩合格' : '成绩不达标';
                    return str;
                }
            },
            obj:{ name:"张三", score1:"90", score2:"100", score3:"85", score4:"自定义", age:undefined, sex:null, marry:"", date:[{startDate:"2019-10-12"}] },
            arr:[
                { text:"姓名", value:"name" },//直接映射obj.name
                { text:"年龄", value:{default:"age", undefined:"未填写"} },//值为undefined轩转换，默认为空串""
                { text:"姓别", value:{default:"sex", null:"未填写"} },//值为null时转换，默认为空串""
                { text:"婚否", value:{default:"marry", empty:"未填写"} },//值为空串""时转换，默认为空串""
                { text:"报名时间", value:"date.0.startDate"},//支持点语法深度映射
                { text:"科目一", value:{default:"score1", callback:(val)=>{ return val}} },//内置callback钩子，在值处理完成后执行
                { text:"科目二", value:{default:"score2"} },//等同于value:"score2"
                { text:"科目三", value:(item)=>{return item.score3} },//回调方法处理
                { text:"科目四", value:{default:"score4", "自定义":"等待公布成绩"} },//除关键字外：支持自定义值转换
                { text:"是否完成", value:false },//值无法匹配obj映射关系时，直接当作值返回。
            ],
        }
    },
    components:{ 
        child
    },
}
</script>

<style lang="" scoped>
</style>