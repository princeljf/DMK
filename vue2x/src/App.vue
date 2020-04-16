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
*{ margin: 0; padding: 0; }
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
.common-main-box{
  position: relative;
  z-index: 2;
  box-sizing: border-box;
  max-width: 760px;
  min-height: 100%;
  margin: 0 auto;
  padding: 30px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.common-demo-tpl{
  width: 200px;
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
