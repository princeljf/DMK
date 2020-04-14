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
    name: 'common-demo-tpl',
    data() { 
        return {
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
        this.apiData3 = DMK.get(this.apiData2, this.keys2);//
    },
}
</script>

<style lang="" scoped>
</style>