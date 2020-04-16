// fn
var isArray = function(obj){
    return Object.prototype.toString.call(obj) == '[object Array]';
}
var isFunction = function(obj){
    return Object.prototype.toString.call(obj) == '[object Function]';
}
var isObject = function(obj){
    return Object.prototype.toString.call(obj) == '[object Object]';
}
const isMac = ()=>{
  // 判断用户操作系统是否为mac
  return /macintosh|mac os x/i.test(navigator.userAgent);
}

/**
 * 删除前后空格
 */
const trim = (str) => {
  if (typeof str == 'string') {
    return str.replace(/(^\s*)|(\s*$)/g, '');
  } else {
    return str;
  }
};

/**
 * 判断浏览器
 */
const getExplore = () => {
  let Sys = {};
  let ua = navigator.userAgent.toLowerCase();
  let s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
  (s = ua.match(/msie ([\d\.]+)/)) ? Sys.ie = s[1] :
  (s = ua.match(/edge\/([\d\.]+)/)) ? Sys.edge = s[1] :
  (s = ua.match(/firefox\/([\d\.]+)/)) ? Sys.firefox = s[1] :
  (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? Sys.opera = s[1] :
  (s = ua.match(/chrome\/([\d\.]+)/)) ? Sys.chrome = s[1] :
  (s = ua.match(/version\/([\d\.]+).*safari/)) ? Sys.safari = s[1] : 0;
  // 根据关系进行判断
  if (Sys.ie) return ('IE: ' + Sys.ie);
  if (Sys.edge) return ('EDGE: ' + Sys.edge);
  if (Sys.firefox) return ('Firefox: ' + Sys.firefox);
  if (Sys.chrome) return ('Chrome: ' + Sys.chrome);
  if (Sys.opera) return ('Opera: ' + Sys.opera);
  if (Sys.safari) return ('Safari: ' + Sys.safari);
  return 'Unkonwn';
};
const isIe = () => {
  return getExplore().indexOf('IE') > -1
}


const dateUtil = {
    /**
     * 根据传入的日期，返回指定格式的日期
     月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     *
     * @param {Date | Number | String} date
     * @param {String} fmt
     * @return {String}
     */
    format: (date, fmt='yyyy-MM-dd') => {
      if(typeof date === 'number' || parseInt(date) == date){
        date = new Date( parseInt(date) );//时间戳格式
      }else if(typeof date === 'string'){
        date = new Date(date.replace(/-/g, '/'));//兼容ios
      }else if(!date.getTime()){
        console.log('error: Invalid Date.');//NaN
      }
      const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
      };
      let str = '';
      if (/(y+)/.test(fmt)) {
        str = RegExp.$1;
        fmt = fmt.replace(str, (`${date.getFullYear()}`).toString().substr(4 - str.length));
      }
      for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
        }
      }
      return fmt;
    },
  
    /**
     * 根据传入的日期天数，返回新的日期
     *
     * @param {Date} date
     * @param {Number} num
     * @param {String} type 'd'：返回日期对象，默认。 或者返回指定格式的字符串，如'yyyy-MM-dd'
     * @returns {*}
     */
    addDate: (date, num, type = 'date') => {
      const curDate = date.getDate();
      date.setDate(curDate + Number(num));
      return (type === 'date' ? date : dateUtil.format(date, type));
    },
    /**
     * 根据传入的日期月数，返回新的日期
     *
     * @param {Date} date
     * @param {Number} num
     * @param {String} type 'd'：返回日期对象，默认。 或者返回指定格式的字符串，如'yyyy-MM-dd'
     * @returns {*}
     */
    addMonth: (date, num, type = 'date') => {
      const curMonth = date.getMonth();
      date.setMonth(curMonth + Number(num));
      return (type === 'date' ? date : dateUtil.format(date, type));
    },
  
    /**
     * 根据传入的日期年数，返回新的日期
     *
     * @param {Date} date
     * @param {Number} num
     * @param {String} type 'd'：返回日期对象，默认。 或者返回指定格式的字符串，如'yyyy-MM-dd'
     * @returns {*}
     */
    addFullYear: (date, num, type = 'date') => {
      const curYear = date.getFullYear();
      date.setFullYear(curYear + Number(num));
      return (type === 'date' ? date : dateUtil.format(date, type));
    },
  
    /**
     * 根据传入的两个时间计算年龄
     *
     * @param {String} born 出生日期
     * @param {String} now 当前时间
     * @return {*|string}
     */
    getAge: (born, now = new Date()) => now.getFullYear() - born.getFullYear(),
    /**
     * 根据传入的时间计算未来或者过去的月份(包括当前月份) 
     *
     * @param {String} date 传入的时间
     * @param {String} num 未来或过去的几个月
     * @return {*|string}
     */
    getFutureMonth: (date, num) => {
      // 获取年
      let year = date.getFullYear();
      // 获取月
      let mon = num < 0 ? (date.getMonth()+1)+num : date.getMonth();
      let arr = new Array();
      for(let i = 0 ; i < Math.abs(num); i++) {
          mon = Number(mon) + 1;
          if(mon < 1) {
            year--;
            mon += 12;
          }else if(mon > 12){
            year++;
            mon -= 12;
          }
          if(mon < 10) {
            mon = "0" + mon;
          }
          arr[i] = year + "-" + mon;
      }
      return arr;
    },
  };
  