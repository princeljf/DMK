// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import DMK from '@/views/DMK/lib/DMK.js';//开发模式
// import DMK from 'dmk';//测试模式
Vue.mixin(DMK.mixins);//全局注册mixins
Vue.prototype.$DMK = DMK;//全局挂载DMK

import VueCodeMirror from 'vue-codemirror'
// require styles
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'

// import 'codemirror/mode/javascript/javascript'
// import 'codemirror/mode/clike/clike'
// import 'codemirror/mode/go/go'
// import 'codemirror/mode/htmlmixed/htmlmixed'
// import 'codemirror/mode/http/http'
// import 'codemirror/mode/php/php'
// import 'codemirror/mode/python/python'
// import 'codemirror/mode/http/http'
// import 'codemirror/mode/sql/sql'
import 'codemirror/mode/vue/vue'
// import 'codemirror/mode/xml/xml'

const cmOption = {
  tabSize: 4,
  mode: 'vue',
  readOnly: true,
  theme: "base16-dark",
  styleActiveLine: true,
  lineNumbers: false,
  line: true,
  lineWrapping: true,
  foldGutter: true,
};
Vue.use(VueCodeMirror, {
  options: cmOption,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
