<template>
    <div class="common-main-tpl">
        <h2>数据处理函数DMK.get()</h2>
        <div class="common-demo-tpl">
            <h3>DMK.get(arr2obj, maps2keys)：不依赖prop特性和props，专职处理数据，等价于调用一个方法。</h3>
            <div class="common-step-title">1、用法一：DMK.get(arr, keys)</div>
            <div class="common-code-box">
                <span>示例一：数组 + 对象</span>
                <codemirror value='
<script>
    let arr = [
        {name: "张三", score: 80, age: 25 },
        {name: "李四", score: 58, age: 16 },
    ]
    let keys = {
        text: "name",
        value: (item)=>{
            return item.score + "分";
        }
    }
    let arr1 = DMK.get(arr, keys);
</script>
                '>
                </codemirror>
            </div>
            <div class="common-output-box">
                <p class="output-data">arr1 = {{$DMK.get(apiData1, keys)}}</p>
            </div>

            <div class="common-step-title">2、用法二：DMK.get(obj, maps)</div>
            <div class="common-code-box">
                <span>示例二：对象 + 数组</span>
                <codemirror value='
<script>
    let obj = { name1: "科目一", score1: "合格", name2: "科目二", score2: "不合格" }

    let maps = [
        { text: "name1", value: score1 },
        { text: "name2", value: score2 },
    ]
    
    let arr2 = DMK.get(arr, maps);
</script>       
                '>
                </codemirror>
            </div>
            <div class="common-output-box">
                <p class="output-data">arr2 = {{$DMK.get(apiData2, maps)}}</p>
            </div>

            <div class="common-step-title">3、用法三：DMK.get(obj, keys, isReturnObj=false)</div>
            <div class="common-code-box">
                <span>示例三：对象 + 对象</span>
                <codemirror value='
<script>
    let obj = { name1: "科目一", score1: "合格", name2: "科目二", score2: "不合格" }

    let keys2 = { text1: "name1", value1: "score1", text2: "name2", value2: "score2" }
    
    let arr3 = DMK.get(arr, keys2);
    //此种情况可传递第三个参数控制返回数据为对象格式
    let obj3 = DMK.get(arr, keys2, true);
</script>       
                '>
                </codemirror>
            </div>
            <div class="common-output-box">
                <p class="output-data">arr3 = {{$DMK.get(apiData2, keys2)}}</p>
                <p class="output-data">obj3 = {{$DMK.get(apiData2, keys2, true)}}</p>
            </div>
            <h3 class="common-show-code">配置参数说明：DMK.get(arr2obj, maps2keys, option, isReturnObj)</h3>
            <table class="common-table-params">
                <tr><th>参数名</th><th>类型</th><th>默认值</th><th>备注</th></tr>
                <tr><td>option</td><td>object</td><td>{ valMapOpt:{undefined:'', null:'', empty:''} }</td><td>非必填</td></tr>
            </table>
            <h3 class="common-show-code">备注：DMK.get(arr2obj, maps2keys)返回数据与dmk处理数据完全一致！maps2keys语法支持格式也保持一致（参照起步）。</h3>

        </div>
    </div>
</template>
<script>

export default {
    data() { 
        return {
            apiData1:[
                {name: '张三', score: 80, age: 25 },
                {name: '李四', score: 58, age: 16 },
                {name: undefined, score: null, age: '' },
            ],
            keys:{
                text: 'name',
                value: (item)=>{
                    return item.score + '分';
                }
            },
            apiData2:{ name1: "科目一", score1: "合格", name2: "科目二", score2: "不合格" },
            maps:[
                {text: "name1", value: "score1"},
                {text: "name2", value: "score2"},
            ],
            keys2:{ text1: "name1", value1: "score1", text2: "name2", value2: "score2" }
            
        }
    },
}
</script>

<style lang="" scoped>
</style>