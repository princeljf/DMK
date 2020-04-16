<template>
    <div class="common-demo-tpl">
        <h3>渲染结果</h3>
        <child :titles="{d:titleArr}" :datas="{d:apiData1, k:titleKeys}"></child>
    </div>
</template>

<script>
import DMK from 'dmk'
import child from './child'
export default {
    data() { 
        return {
            apiData1:[
                {studenName:'张三', birthday:'1992-10-05', phoneNumber:'13590269110', datetime: new Date().getTime(), score1: 100, score2: 90, score3: 100, score4: 100 },
                {studenName:'李四', birthday:'1996-10-04', phoneNumber:'13390269814', datetime: new Date().getTime(), score1: 100, score2: '', score3: '', score4: '' },
                {studenName:'王五', birthday:'1988-08-05', phoneNumber:'13490269195', datetime: new Date().getTime(), score1: 100, score2: undefined, score3: null, score4: '错误数据' },
            ],
            titleArr:[
                {title: '姓名', key: 'name' },
                {title: '出生日期', key: 'birthday' },
                {title: '年龄', key: 'age' },
                {title: '手机号', key: 'phone' },
                {title: '报名日期', key: 'date' },
                {title: '科目一', key: 'score1' },
                {title: '科目二', key: 'score2' },
                {title: '科目三', key: 'score3' },
                {title: '科目四', key: 'score4' },
                {title: '是否合格', key: 'result' },
            ],
            titleKeys:{
                name: 'studenName',
                birthday: 'birthday',
                age: 'age',
                phone: 'phone',
                date: 'date',
                result: 'result',
            }
            
        }
    },
    components:{
        child
    },
    methods:{
    }
}
</script>

<style lang="" scoped>
.common-demo-tpl{
    width: 100%;
}
</style>