import Vue from 'vue';
import commonApi from '@/api/common.js';

let errMessage = (resBody={}, option={})=>{
  let defMsg = '网络异常，请稍后重试！';
  let defOption = {
    message: resBody.message || resBody.errorCode || defMsg,
    center: true
  };
  let obj = extendDeep(option, defOption);
  alert( obj );//错误提示
};
const ajaxGet = (url='', params={}, option={})=>{
  return new Promise((resolve,reject) => {
    Vue.http.get(url, {params : params, ...option})
    .then(res => {
      if(res.body.returnFlag=='success'){
        res.body.data = res.body.data || {};
        resolve(res.body.data);
      }else{
        errMessage(res.body);
        reject();
      }
    })
    .catch(res => {
      errMessage();
      reject();
    })
  })
};
const ajaxPost = (url='', params={}, option={})=>{
  return new Promise((resolve,reject) => {
    Vue.http.post(url, params, option)
    .then(res => {
      if(res.body.returnFlag=='success'){
        res.body.data = res.body.data || {};
        resolve(res.body.data);
      }else{
        errMessage(res.body);
        reject();
      }
    })
    .catch(res => {
      errMessage();
      reject();
    })
  })
};

const ajaxGetAll = (url='', params={}, option={})=>{
  return new Promise((resolve,reject) => {
    Vue.http.get(url, {params : params, ...option})
    .then(res => {
      resolve(res.body);
    })
    .catch(res => {
      reject();
    })
  })
};
const ajaxPostAll = (url='', params={}, option={})=>{
  return new Promise((resolve,reject) => {
    Vue.http.post(url, params, option)
    .then(res => {
      resolve(res.body);
    })
    .catch(res => {
      reject();
    })
  })
};
const ajaxDelete = (url='', params={}, option={})=>{
  let urlStr = url;
  for(let key in params){
    urlStr += '/' + params[key];
  }
  return new Promise((resolve,reject) => {
    Vue.http.delete(urlStr, option)
      .then(res => {
        resolve(res.body);
      })
      .catch(res => {
        reject();
      })
  })
};

const API = {
  common: commonApi,
}
const AJAX = {
  get: ajaxGet,
  getAll: ajaxGetAll,
  post: ajaxPost,
  postAll: ajaxPostAll,
  delete: ajaxDelete,
}
const CONSTANT = {
  defHeaders: {
    emulateJSON: false,
    headers: {'Content-Type': 'application/json'}
  }
}

export {
  API,      //全局API接口定义
  AJAX,     //全局接口请求定义
  CONSTANT, //全局常用常量定义
}