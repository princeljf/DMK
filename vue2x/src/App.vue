<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{ margin: 0; padding: 0; font-family:Arial,"PingFang SC","Microsoft YaHei",sans-serif;}
html,body{
  height: 100%;
}
h2{
  text-align: center;
}
h3{
  margin-bottom: 20px;
}
#app{
  width: 100%;
  min-width: 320px;
  height: 100%;
  margin: 0 auto;
}
.fw-bold{
  font-weight: bold;
}
.col-red{
  color: red;
}
.common-table-params{
  width: 100%;
  font-size: 14px;
  border-collapse:collapse;
  text-align: left;
}
.common-table-params th,
.common-table-params td{
  border: 1px solid #666;
  padding: 2px 6px;
}
.common-table-params th{
  color: #0099ff;
  font-weight: bold;
  line-height: 32px;
}
.common-step-title{
  line-height: 32px;
  color: #0099ff;
  font-size: 16px;
}
.common-main-box{
  position: relative;
  z-index: 2;
  box-sizing: border-box;
  max-width: 760px;
  min-height: 100%;
  margin: 0 auto;
  padding: 30px 0;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.CodeMirror {
    border: 1px solid #eee;
    height: auto;
}

.CodeMirror-scroll {
    height: auto;
    overflow-y: hidden;
    overflow-x: auto;
}

.common-demo-tpl{
  margin: 12px 0;
  font-size: 14px;
}
.common-box-left-right{
  background-color: #eee;
}
.common-box-left-right .right{
  float: right;
}
</style>
