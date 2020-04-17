<template>
    <div class="common-main-tpl">
        <h2>HelloWorld</h2>
        <div class="common-demo-tpl">
            <h3>渲染结果</h3>
            <child :d="apiData1"></child>
            <child :d="apiData2" :k="keys2"></child>
            <child :d="apiData3"></child>
            <h3 class="common-show-code">查看代码</h3>
            <div class="common-code-box">
                <span>index.vue</span>
                <codemirror v-model="codeParent"></codemirror>
                <span>child.vue</span>
                <codemirror v-model="codeChild"></codemirror>
            </div>
        </div>
    </div>
</template>
<script>
import child from './child'
import DMK from 'dmk'
let codeParent = `
<template>
    <div class="common-demo-tpl">
        <child :d="apiData1"></child>
        <child :d="apiData2" :k="keys2"></child>
        <child :d="apiData3"></child>
    </div>
</template>

<script>
import child from './child'
import DMK from 'dmk'
export default {
    data() { 
        return {
            code: codeParent,
            apiData1:[
                {text: '张三', value: 80},
                {text: '李四', value: 58},
            ],
            apiData2:[
                {name: '张三', score: 80},
                {name: '李四', score: 58},
            ],
            keys2:{
                text: 'name',
                value:{
                    default: 'score', callback:(value)=>{
                        let str = value+'分，';
                        str += value>=60 ? '成绩合格' : '成绩不达标';
                        return str;
                    }
                }
            },
            apiData3:[]
        }
    },
    components:{ 
        child
    },
    created() {
        //等价于<child :d="apiData2" :k="keys2"></child>
        this.apiData3 = DMK.get(this.apiData2, this.keys2);
    },
}
<\/script>
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
import DMK from 'dmk';
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
        DMK.init();
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
            keys2:{
                text: 'name',
                value:{
                    default: 'score', callback:(value)=>{
                        let str = value+'分，';
                        str += value>=60 ? '成绩合格' : '成绩不达标';
                        return str;
                    }
                }
            },
            apiData3:[]
        }
    },
    components:{ 
        child
    },
    created() { 
        this.apiData3 = DMK.get(this.apiData2, this.keys2);//等价于<child :d="apiData2" :k="keys2"></child>
    },
}
</script>

<style lang="" scoped>
</style>