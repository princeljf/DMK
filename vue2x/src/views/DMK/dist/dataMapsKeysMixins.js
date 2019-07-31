'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var LHH = function () {
    var isFunction = function isFunction(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    };
    var isArray = function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    var isObject = function isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };
    var isNumber = function isNumber(obj) {
        return Object.prototype.toString.call(obj) === '[object Number]';
    };
    var isString = function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    };
    //借鉴jquery.extend
    var extend = function extend() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        /*
        *target被扩展的对象
        *length参数的数量
        *deep是否深度操作
        */
        var options = void 0,
            name = void 0,
            src = void 0,
            copy = void 0,
            copyIsArray = void 0,
            clone = void 0,
            target = args[0] || {},
            i = 1,
            length = args.length,
            deep = false;
        // target为第一个参数，如果第一个参数是Boolean类型的值，则把target赋值给deep
        // deep表示是否进行深层面的复制，当为true时，进行深度复制，否则只进行第一层扩展
        // 然后把第二个参数赋值给target
        if (typeof target === "boolean") {
            deep = target;
            target = args[1] || {};
            // 将i赋值为2，跳过前两个参数
            i = 2;
        }
        // target既不是对象也不是函数则把target设置为空对象。
        if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== "object" && !LHH.isFunction(target)) {
            target = {};
        }
        // 如果只有一个参数，则把空对象{}赋值给target，即扩展到空对象{}上
        if (length === i) {
            target = {};
            // i减1，指向被扩展对象
            --i;
        }
        // 开始遍历需要被扩展到target上的参数
        for (; i < length; i++) {
            // 处理第i个被扩展的对象，即除去deep和target之外的对象
            if ((options = args[i]) != null) {
                // 遍历第i个对象的所有可遍历的属性
                for (name in options) {
                    // 根据被扩展对象的键获得目标对象相应值，并赋值给src
                    src = target[name];
                    // 得到被扩展对象的值
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    // 当用户想要深度操作时，递归合并
                    // copy是纯对象或者是数组
                    if (deep && copy && (LHH.isObject(copy) || (copyIsArray = LHH.isArray(copy)))) {
                        // 如果是数组
                        if (copyIsArray) {
                            // 将copyIsArray重新设置为false，为下次遍历做准备。
                            copyIsArray = false;
                            // 判断被扩展的对象中src是不是数组
                            clone = src && LHH.isArray(src) ? src : [];
                        } else {
                            // 判断被扩展的对象中src是不是纯对象
                            clone = src && LHH.isObject(src) ? src : {};
                        }
                        // 递归调用extend方法，继续进行深度遍历
                        target[name] = extend(deep, clone, copy);
                        // 如果不需要深度复制，则直接把copy（第i个被扩展对象中被遍历的那个键的值）
                    } else {
                        target[name] = copy;
                    }
                }
            }
        }
        // 原对象被改变，因此如果不想改变原对象，target可传入{}
        return target;
    };
    return {
        isFunction: isFunction,
        isArray: isArray,
        isObject: isObject,
        isNumber: isNumber,
        isString: isString,
        extend: extend
    };
}();
var dataMapsKeysMixins = {
    name: 'dataMapsKeysMixins',
    data: function data() {
        return {
            optionDef_mixin: {
                'bindKey': null, //子组件调用this.DMK传入的参数bindKey，默认绑定子组件this[bindKey]作为数据源
                'd': '$attrs.d',
                'm': '$attrs.m',
                'k': '$attrs.k',
                'childKeys': 'keys', //子组件绑定模板的数据源，默认为this.keys：支持$data.keys或者$props.keys形式
                'epmty': '', //值为空字符串''时，转换为设置的值
                'undefined': '', //值为undefined时，转换为设置的值
                'null': '' //值为null时，转换为设置的值
            }
        };
    },

    watch: {
        '$attrs': {
            handler: function handler(newVal, oldVal) {
                this.optionDef_mixin.bindKey && this.DMK(this.optionDef_mixin.bindKey, this.optionDef_mixin);
            },

            deep: true
        },
        '_props': {
            handler: function handler(newVal, oldVal) {
                this.optionDef_mixin.bindKey && this.DMK(this.optionDef_mixin.bindKey, this.optionDef_mixin);
            },

            deep: true
        }
    },
    methods: {
        //组件初始化，使用此mixins必需调用，建议在created方法里执行：this.DMK();
        DMK: function DMK() {
            var bindKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'arr';
            var maps2keys = arguments[1];
            var childKeys = arguments[2];

            var name = bindKey;
            if (!name) {
                return false;
            }
            var arr = [];
            var d = void 0,
                m = void 0,
                k = void 0,
                ck = void 0;
            var opt = this.optionDef_mixin;
            if (LHH.isObject(name) || LHH.isArray(name)) {
                //使用场景：作为父组件调用传参为对象或者数据时，默认处理数据模式
                m = LHH.isArray(maps2keys) ? maps2keys : false;
                k = LHH.isObject(maps2keys) ? maps2keys : false;
                ck = LHH.isObject(childKeys) ? this._getk2ck_(k, childKeys) : this._getk2ck_(k);
                arr = this._getObj2arr_(name, m, k, ck);
            } else if (LHH.isString(name)) {
                //使用场景：作为子组件调用传参为字符串时，默认绑定this.optionDef_mixin.bindKey处理数据模式
                if (LHH.isObject(maps2keys)) {
                    LHH.extend(opt, maps2keys); //合并参数
                }
                if (!this.$attrs) {
                    if (!(maps2keys.d && maps2keys.m && maps2keys.k)) {
                        console.warn('Vue当前版本不支持非prop特性，请调用this.DMK("arr",option)时指定option的d/m/k配置项指向props值或者通过父组件处理！return false.');
                        return false;
                    }
                }
                opt.bindKey = name;
                d = this._getSplitData_(this, opt.d);
                m = this._getSplitData_(this, opt.m);
                k = this._getSplitData_(this, opt.k);
                ck = this._getSplitData_(this, opt.childKeys);
                if ((LHH.isArray(d) || LHH.isObject(d)) && Object.keys(d).length) {
                    arr = this._getObj2arr_(d, m, k, ck);
                } else {
                    arr = [];
                }
                this[name] = arr;
            }
            return arr;
        },
        _getk2ck_: function _getk2ck_(keys, childKeys) {
            var obj = {};
            for (var k in keys) {
                obj[k] = k;
            }
            if (LHH.isObject(childKeys)) {
                LHH.extend(obj, childKeys);
            }
            return obj;
        },
        _getSplitData_: function _getSplitData_(data) {
            var splitStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var splitFlag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';

            var val = data;
            var splitArr = splitStr.split(splitFlag);
            for (var k in splitArr) {
                val = val[splitArr[k]];
                if (!val) {
                    break;
                }
            }
            return val;
        },

        //分割点'.'数据处理：keys.k1.0.k2，支持点语法，数组直接用下标表示，暂不支持中括号'[]'形式：keys.k1[0]k2，不存在的key默认值返回为空字符串：return = ''
        _getDeepData_: function _getDeepData_(data, splitStr, option) {
            var opt = LHH.isObject(option) ? LHH.extend({}, this.optionDef_mixin, option) : this.optionDef_mixin;
            var val = data;
            var flagStr = '';
            var splitArr = splitStr.split('.');
            for (var k in splitArr) {
                val = val[splitArr[k]];
                switch (val) {
                    case undefined:
                        flagStr = 'undefined';
                        break;
                    case null:
                        flagStr = 'null';
                        break;
                    case '':
                        flagStr = 'empty';
                        break;
                    default:
                }
                if (flagStr) {
                    val = opt[flagStr];
                    break;
                }
            }
            return val;
        },

        //动态转换生成 this[saveName] 数据
        _getObj2arr_: function _getObj2arr_(data, maps, keys, childKeys) {
            var _this = this;

            var d = data,
                m = maps,
                k = LHH.extend({}, childKeys, keys || {}),
                ck = childKeys;

            var arr = [];
            if (LHH.isArray(d) && d.length) {
                //数组：data或者data+keys处理数据格式
                d.map(function (item, i) {
                    var obj = {};
                    for (var ckey in ck) {
                        var kkey = k[ckey];
                        //处理对象，默认key映射为defalut的值
                        if (LHH.isObject(kkey)) {
                            kkey = kkey.default || '';
                        }
                        if (!kkey) {
                            console.warn('Keys or Maps is empty.');
                        } else if (LHH.isFunction(kkey)) {
                            obj[ck[ckey]] = kkey(LHH.extend({}, item), i, d);
                        } else {
                            obj[ck[ckey]] = _this._getDeepData_(LHH.extend({}, item), kkey, k[ckey]);
                        }
                    }
                    arr.push(obj);
                });
            } else if (LHH.isObject(data)) {
                //对象：data或者data+keys或者data+maps处理数据格式
                if (m) {
                    if (d && m.length) {
                        m.map(function (item, i) {
                            var obj = {};
                            for (var ckey in ck) {
                                var kkey = item[ckey];
                                //处理对象，默认key映射为defalut的值
                                if (LHH.isObject(kkey)) {
                                    kkey = kkey.default || '';
                                }
                                if (!kkey) {
                                    console.warn('Keys or Maps is empty.');
                                } else if (LHH.isFunction(kkey)) {
                                    obj[ck[ckey]] = kkey(LHH.extend({}, d), i, item);
                                } else {
                                    obj[ck[ckey]] = _this._getDeepData_(LHH.extend({}, d), kkey, item[ckey]);
                                }
                            }
                            arr.push(obj);
                        });
                    }
                } else {
                    var obj = {};
                    for (var ckey in ck) {
                        var kkey = k[ckey];
                        //处理对象，默认key映射为defalut的值
                        if (LHH.isObject(kkey)) {
                            kkey = kkey.default || '';
                        }
                        if (!kkey) {
                            console.warn('Keys or Maps is empty.');
                        } else if (LHH.isFunction(kkey)) {
                            obj[ck[ckey]] = kkey(LHH.extend({}, d), ckey, k);
                        } else {
                            obj[ck[ckey]] = this._getDeepData_(LHH.extend({}, d), kkey, k[ckey]);
                        }
                    }
                    arr.push(obj);
                }
            }
            return arr;
        }
    }

};

exports.default = dataMapsKeysMixins;