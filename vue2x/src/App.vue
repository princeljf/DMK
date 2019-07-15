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
.app-main{
  width: 53%;
  min-width: 320px;
  margin: 0 auto;
  border: 1px solid #eee;
}
</style>
