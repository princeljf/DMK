<template>
    <div class="common-main-tpl">
        <h2>子组件keys</h2>
        <div class="common-demo-tpl">
            <h3>渲染结果</h3>
            <!-- 单个dmk绑定 -->
            <child :d="apiData1" :k="keys"></child>
            <!-- 多个dmk绑定 -->
            <child2 :arr="{d:apiData1, k:keys}" :arr2="{d:apiData2, m:maps}"></child2>
            <h3 class="common-show-code">查看代码</h3>
            <div class="common-code-box">
                <span>父组件：index.vue</span>
                <codemirror v-model="codeParent"></codemirror>
                <span>子组件（单个dmk绑定）：child.vue</span>
                <codemirror v-model="codeChild"></codemirror>
                <span>子组件（多个dmk绑定）：child2.vue</span>
                <codemirror v-model="codeChild2"></codemirror>
            </div>
        </div>
    </div>
</template>
<script>
import DMK from 'dmk'
import child from './child'
import child2 from './child2'
const codeParent = `
<template>
    <div class="common-demo-tpl">
        <h3>渲染结果</h3>
        <!-- 单个dmk绑定 -->
        <child :d="apiData1" :k="keys"></child>
        <!-- 多个dmk绑定 -->
        <child2 :arr="{d:apiData1, k:keys}" :arr2="{d:apiData2, m:maps}"></child2>
    </div>
</template>
<script>
import DMK from 'dmk'
import child from './child'
import child2 from './child2'
export default {
    data() { 
        return {
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
                name1: '科目一', score1: '合格', name2: '科目二', score2: '不合格'
            },
            maps:[
                {text: 'name1', value: 'score1'},
                {text: 'name2', value: 'score2'},
            ]
            
        }
    },
    components:{
        child, child2
    },
}
<\/script>
`;
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
import DMK from 'dmk'
export default {
    mixins: [DMK.mixins],
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
        DMK.init();//等价于DMK.init('arr') 或 DMK.init({arr:'arr'})
    },
}
<\/script>
`;
const codeChild2 = `

`;
export default {
    data() { 
        return {
            codeParent: codeParent,
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
                name1: '科目一', score1: '合格', name2: '科目二', score2: '不合格'
            },
            maps:[
                {text: 'name1', value: 'score1'},
                {text: 'name2', value: 'score2'},
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