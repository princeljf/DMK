<template>
    <div class="common-main-tpl">
        <h2>子组件keys</h2>
        <div class="common-demo-tpl">
            <h3>渲染结果</h3>
            <p><span>点击切换展示数据：</span></p>
            <p class="menus">
                <span class="common-btn" @click="clickType('score')">分数</span><span class="common-btn" @click="clickType('age')">年龄</span>
            </p>
            <child :d="apiData1" :k="keys"></child>
        </div>
    </div>
</template>

<script>
import DMK from 'dmk'
import child from './child'
export default {
    data() { 
        return {
            type: 'score',
            apiData1:[
                {name: '张三', score: 80, age: 25 },
                {name: '李四', score: 58, age: 16 },
            ],
            keys:{
                text: 'name',
                value: (item)=>{
                    return item.score + '分';
                }
            }
            
        }
    },
    components:{
        child
    },
    methods:{
        clickType(type){
            switch(type){
                case 'score':
                    this.keys.value = (item)=>{
                        return item.score + '分';
                    };
                break;
                case 'age':
                    this.keys.value = (item)=>{
                        return item.age + '岁';
                    };
                break;
                default:

            }
        },
    }
}
</script>

<style lang="" scoped>
.menus{
    margin: 20px 0;
}
.menus span{
    margin-right: 20px;
}
</style>