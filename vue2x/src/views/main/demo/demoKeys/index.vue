<template>
    <div class="common-main-tpl">
        <h2>子组件DMK.init()初始化</h2>
        <div class="common-demo-tpl">
            <h3>init初始化mixins，实现自动watch数据更新。</h3>
            <div class="common-step-title">1、单个dmk绑定</div>
            <div class="common-code-box">
                <span>子组件模板：child.vue</span>
                <codemirror v-model="codeChild"></codemirror>
                <span>父组件引入child.vue</span>
                <codemirror value='
<child :d="apiData1" :k="keys"></child>
<script>
    let apiData1 = [
        {name: "张三", score: 80, age: 25 },
        {name: "李四", score: 58, age: 16 },
    ]
    let keys = {
        text: "name",
        value: (item)=>{
            return item.score + "分";
        }
    }
</script>
//渲染结果如下          
                '>
                </codemirror>
            </div>
            <!-- 单个dmk绑定 -->
            <child :d="apiData1" :k="keys"></child>
            <div class="common-step-title">2、多个dmk绑定</div>
            <div class="common-code-box">
                <span>子组件模板：child2.vue</span>
                <codemirror v-model="codeChild2"></codemirror>
                <span>父组件引入child2.vue</span>
                <codemirror value='
<child2 :arr="{d:apiData1, k:keys}" :arr2="{d:apiData2, m:maps}"></child2>
<script>
    let apiData1 = [
        {name: "张三", score: 80, age: 25 },
        {name: "李四", score: 58, age: 16 },
    ]
    let keys = {
        text: "name",
        value: (item)=>{
            return item.score + "分";
        }
    }
    let apiData2 = {
        score1: "合格", score2: "不合格"
    }
    let maps = [
        {text: "语文", value: "score1"},
        {text: "数学", value: "score2"},
    ]
</script>
//渲染结果如下          
                '>
                </codemirror>
            </div>
            <!-- 多个dmk绑定 -->
            <child2 :arr="{d:apiData1, k:keys}" :arr2="{d:apiData2, m:maps}"></child2>
            <div class="common-step-title"><b>3、DMK.init( [bindKey]=String | Object | Array, [option]=Object )</b></div>
            <h3 class="common-show-code">参数说明：</h3>
            <table class="common-table-params">
                <tr><th>参数名</th><th>类型</th><th>默认值</th><th>备注</th></tr>
                <tr><td>bindKey</td><td>string | object | array</td><td>"arr"</td><td>非必填</td></tr>
                <tr><td>option</td><td>object</td><td>无</td><td>非必填</td></tr>
            </table>

            <p class="common-show-code">参数一：bindKey，指定需要绑定的数据源</p>
            <div class="common-text-params ti2em">
                <p>(1) string=key：默认值为key="arr"={arr:"arr"}，表示绑定this[key]，点语法请使用object传参，父组件绑定:d/:m/:k</p>
                <p>(2) object={key:value}：表示绑定this[value]，value支持点语法深度映射，父组件绑定:d/:m/:k</p>
                <p>(3) array=[arr, {key:value}]：绑定多套数据源，父组件绑定:arr={:d/:m/:k}、:key={:d/:m/:k}</p>
            </div>
            <p class="common-show-code">参数二：option，设置相关配置项</p>
            <div class="common-text-params ti2em">
                <p>(1) option.dmkMapOpt：绑定数据源映射配置，默认值为dmkMapOpt={d:'$attrs.d', m:'$attrs.m', k:'$attrs.k'}</p>
                <p>(2) option.ckMapOpt：绑定子组件映射配置，默认值为ckMapOpt=[arr:'keys']，示例：bindKey=[arr, {key:value}]，ckMapOpt={arr:'keys', key:'otherKeys'}</p>
                <p>(3) option.valMapOpt：绑定输出值映射配置，默认值为valMapOpt={undefined:'', null:'', empty:''}</p>
                <p>(4) option.dmkOption：指定父组件配置项属性名，默认值为dmkOption="dmkOption"，示例：:dmkOption="{...}"</p>
            </div>
        </div>
    </div>
</template>
<script>

import child from './child'
import child2 from './child2'
const codeChild = `
<template>
    <div class="common-child-tpl">
        <div v-for="(item,i) in arr" :key="i" class="common-box-left-right">
            <span class="left">{{item[ keys.text ]}}</span>
            <span class="right">{{item[ keys.value ]}}</span>
        </div>
    </div>
</template>
<script>
export default {
    data() { 
        return {
            arr:[
            ],
            keys:{
                text: 'text',
                value: 'value',
            },
        }
    },
    created(){
        this.$DMK.init();//等价于this.$DMK.init('arr')
    },
}
<\/script>
`;
const codeChild2 = `
<template>
    <div class="common-child-tpl">
        <div class="box">
            <div v-for="(item,i) in arr" :key="i" class="common-box-left-right">
                <span class="left">{{item[ keys.text ]}}</span>
                <span class="right">{{item[ keys.value ]}}</span>
            </div>
        </div>
        <div class="box">
            <div v-for="(item,i) in deepObj.arr" :key="i" class="common-box-left-right">
                <span class="left">{{item[ deepObj.keys.text ]}}</span>
                <span class="right">{{item[ deepObj.keys.value ]}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() { 
        return {
            arr:[
            ],
            keys:{
                text: 'text',
                value: 'value',
            },
            deepObj:{
                arr:[
                ],
                keys:{
                    text: 'name',
                    value: 'score',
                }
            },
        }
    },
    created(){
        //支持点语法，但必须指定key用于绑定父组件传参
        this.$DMK.init(['arr', {arr2:'deepObj.arr'}], {
            ckMapOpt:{
                arr: 'keys',//默认值绑定this.keys，可不传
                arr2: 'deepObj.keys',//指定另一个keys绑定源
            }
        });
    },
}
<\/script>
`;
export default {
    data() { 
        return {
            codeChild: codeChild,
            codeChild2: codeChild2,
            apiData1:[
                {name: '张三', score: 80, age: 25 },
                {name: '李四', score: 58, age: 16 },
            ],
            keys:{
                text: 'name',
                value: (item)=>{
                    return item.score + '分';
                }
            },
            apiData2:{
                score1: "合格", score2: "不合格"
            },
            maps:[
                {text: "语文", value: "score1"},
                {text: "数学", value: "score2"},
            ]
            
        }
    },
    components:{
        child, child2
    },
}
</script>

<style lang="" scoped>
</style>