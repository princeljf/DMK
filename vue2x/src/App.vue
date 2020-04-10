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
</style>
