// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueCodeMirror from 'vue-codemirror'
// require styles
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/theme/base16-light.css'
const cmOption = {
  tabSize: 4,
  mode: 'text/html',
  readOnly: true,
  theme: "base16-light",
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
