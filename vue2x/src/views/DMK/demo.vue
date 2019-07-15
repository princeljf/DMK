<template>
    <div class="app-main">
        <p class="btns-box" @click="changeKeys($event)">
            <span data-key="age">年龄</span><span data-key="sex">姓别</span>
        </p>
        <div class="demo1">
            <Child :d="arr1" :k="keys1"></Child>
        </div>
    </div>
</template>
<script>
import Child from './child'
export default {
    data() {
        return {
            arr1: [
                {name: '张三', age: 24, sex: '1'},
                {name: '李四', age: 32, sex: '1'},
                {name: '妞妞', age: 18, sex: '0'},
            ],
            keys1:{
                text: 'name', value: 'age'
            },
        };
    },
    components:{
        Child
    },
    methods: {
        changeKeys(event){
            let key = event.target.getAttribute('data-key');
            switch(key){
                case 'age':
                    this.keys1.value = 'age';
                    break;
                case 'sex':
                    this.keys1.value = (item)=>{
                        return item.sex==='1'?'男':'女';
                    }
                    break;
                default:
            }
        }
    },
    created() {
        
    },
    
};
</script>
<style>
.btns-box{ margin-top: 50px; text-align: center; }
.btns-box span{ padding: 5px 30px; margin: 0 20px; border: 1px solid #aaa; border-radius: 6px; }
.demo1{
    margin: 30px 0;
}
</style>
