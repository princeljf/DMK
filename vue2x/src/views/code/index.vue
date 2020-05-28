<template>
    <div class="common-main-tpl">
        <h2>代码片段-示例</h2>
        <!-- 三角形  -->
        <div class="lhh-box">
            <span class="text">triangle</span>
            <span class="lhh-triangle-box">
                <span class="lhh-triangle top"></span>
                <span class="lhh-triangle bottom"></span>
            </span>
            <span class="lhh-triangle-box">
                <span class="lhh-triangle left"></span>
                <span class="lhh-triangle right"></span>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'common-code-tpl',
    data() { 
        return {
        }
    },
    created() { 
    },
}
</script>

<style lang="" scoped>
.common-main-tpl{
    width: 1024px;
    margin: 0 auto;
    padding: 24px 0;
}
/* 三角形 */
.lhh-triangle-box{
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    font-size: 0; /* 清除高度 */
}
.lhh-triangle{
    position: absolute;
    width: 0;
    height: 0;
    border: 8px solid transparent;
}
.lhh-triangle.top{
    left: 0;
    top: 50%;
    border-top-color: black;
}
.lhh-triangle.bottom{
    left: 0;
    bottom: 50%;
    border-bottom-color: green;
}
.lhh-triangle.left{
    top: 0;
    left: 50%;
    border-left-color: blue;
}
.lhh-triangle.right{
    top: 0;
    right: 50%;
    border-right-color: red;
}


</style>