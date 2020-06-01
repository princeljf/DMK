'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _LHH = require('./LHH.js');

var _LHH2 = _interopRequireDefault(_LHH);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//全局配置项
var DEF_OPT = {
    dmkMapOpt: {
        d: '$attrs.d',
        m: '$attrs.m',
        k: '$attrs.k',
        ck: 'keys' //子组件绑定模板的数据源，默认为this.keys：支持$data.keys或者$props.keys形式
    },
    valMapOpt: {
        'empty': '', //值为空字符串''时，转换为设置的值
        'undefined': '', //值为undefined时，转换为设置的值
        'null': '' //值为null时，转换为设置的值
    },
    dmkOption: 'dmkOption' //指定组件配置项属性名
};
var DEF_OPT_COPY = _LHH2.default.extend(true, DEF_OPT); //全局配置项副本
//设置全局默认配置
var setDefOpt = function setDefOpt(option) {
    var opt = option;
    if (opt == 'reset') {
        opt = DEF_OPT = _LHH2.default.extend(true, DEF_OPT_COPY); //还原默认配置
    } else if (_LHH2.default.isObject(opt)) {
        opt = _LHH2.default.extend(true, DEF_OPT, opt); //覆盖配置
    } else {
        opt = false; //失败
    }
    return opt;
};
//分割点'.'数据处理：keys.k1.0.k2，支持点语法，数组直接用下标表示，暂不支持中括号'[]'形式：keys.k1[0]k2，不存在的key默认值返回为空字符串：return = ''
var get_deepData = function get_deepData(data, splitStr, option, defOption) {
    //新增：自定义字符转换和设置function、新增回调方法callback(val, key, data)
    var valMapOpt = _LHH2.default.isObject(defOption) ? defOption : _LHH2.default.extend(DEF_OPT.valMapOpt);
    var opt = _LHH2.default.isObject(option) ? _LHH2.default.extend({}, valMapOpt, option) : _LHH2.default.extend(DEF_OPT.valMapOpt, valMapOpt);
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
                flagStr = val;
        }
        if ((_LHH2.default.isString(flagStr) || _LHH2.default.isNumber(flagStr)) && flagStr in opt) {
            val = _LHH2.default.isFunction(opt[flagStr]) ? opt[flagStr](val) : opt[flagStr];
            break;
        }
    }
    opt.callback && (val = opt.callback(val, opt.default, data));
    return val;
};

//返回对象数据：keys生成默认childKeys
var init_keys2childKeys = function init_keys2childKeys(keys) {
    var ck = {};
    for (var key in keys) {
        ck[key] = key;
    }
    return ck;
};
//返回对象数据
var get_d2object = function get_d2object(d, k, ck, item, i, valMapOpt) {
    var obj = {};
    for (var ckey in ck) {
        var kkey = k[ckey];
        //当映射值为字符串且不存在点语法且  映射值不包含于数据源中，直接返回当前值

        if (!kkey || _LHH2.default.isString(kkey) && !/.\../.test(kkey) && !(kkey in item)) {
            obj[ck[ckey]] = kkey;
        } else {
            //处理对象，默认key映射为defalut的值
            if (_LHH2.default.isObject(kkey)) {
                kkey = kkey.default || '';
            }
            if (!kkey) {
                console.warn('Keys or Maps is empty.');
            } else if (_LHH2.default.isFunction(kkey)) {
                obj[ck[ckey]] = kkey(_LHH2.default.extend({}, item), i, d);
            } else {
                obj[ck[ckey]] = get_deepData(_LHH2.default.extend({}, item), kkey, k[ckey], valMapOpt);
            }
        }
    }
    return obj;
};
//返回数组数据
var get_d2array = function get_d2array(d, k, option) {
    var opt = _LHH2.default.isObject(option) ? option : {};
    if (!_LHH2.default.isObject(opt.ck)) {
        opt.ck = init_keys2childKeys(k);
    }
    var retArr = [];
    d.map(function (item, i) {
        retArr.push(get_d2object(d, k, opt.ck, item, i, opt.valMapOpt));
    });
    return retArr;
};
//返回点语法数据
var get_splitData = function get_splitData(data) {
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
};
//设置点语法数据
var set_splitData = function set_splitData(data) {
    var splitStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var splitFlag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';

    var val = data;
    var splitArr = splitStr.split(splitFlag);
    var isBoolean = false;
    for (var i = 0; i < splitArr.length; i++) {
        if (i === splitArr.length - 1) {
            val[splitArr[i]] = value;
            isBoolean = true;
        } else {
            val = val[splitArr[i]];
        }
    }
    return isBoolean;
};

var get_dmkMapOpt = function get_dmkMapOpt() {
    var mapKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var inputParams = arguments[1];

    var obj = _LHH2.default.extend(DEF_OPT.dmkMapOpt);
    if (!mapKey || _LHH2.default.isString(inputParams.bindKey) || _LHH2.default.isObject(inputParams.bindKey)) {
        return obj;
    }
    for (var k in obj) {
        obj[k] = obj[k].replace(/^\$attrs/, '\$attrs\.' + mapKey);
    }
    return obj;
};

var dataMapsKeysMixins = {
    dmkMixinsSelf: {
        vm2parent: null, //指向组件实例
        setOptionLock: 0, //判断全局配置是否设置过
        warn: true
    },
    name: 'dataMapsKeysMixins',
    data: function data() {
        var _this = this;

        return {
            //dmk内部数据
            dmk_mixins_data_: {
                //保存外部传入参数对象
                inputParams: {
                    bindKey: null, //必填：第一个参数，绑定数据结构，类型：String | Object | Array
                    option: null //可选：第二个参数，配置项结构，类型：Object
                },
                //生成相关数据
                outputData: {
                    mapAttrs: [],
                    bindKeys: [],
                    childKeys: [],
                    valMapOpt: {},
                    dmkOption: '',
                    datas: {}
                },
                fn: {
                    //更新函数
                    update: function update(callback, context) {
                        var self = context || _this;
                        var ip = self.dmk_mixins_data_.inputParams;
                        ip.bindKey && self._DMK_(ip.bindKey, ip.option) && _LHH2.default.isFunction(callback) && setTimeout(function () {
                            self.$nextTick(function () {
                                callback();
                            });
                        }, 1);
                    },
                    setBindKeys: function setBindKeys(str) {
                        var outputObj = _this.dmk_mixins_data_.outputData;
                        outputObj.bindKeys.indexOf(str) === -1 && outputObj.bindKeys.push(str);
                    },
                    setMapAttrs: function setMapAttrs(str) {
                        var outputObj = _this.dmk_mixins_data_.outputData;
                        outputObj.mapAttrs.indexOf(str) === -1 && outputObj.mapAttrs.push(str);
                    },
                    setInputBindKey: function setInputBindKey(bindKey) {
                        var bk = bindKey;
                        if (_LHH2.default.isString(bk)) {
                            _this.dmk_mixins_data_.fn.setMapAttrs(bk);
                            _this.dmk_mixins_data_.fn.setBindKeys(bk);
                        } else if (_LHH2.default.isObject(bk)) {
                            var mapKey = Object.keys(bk)[0];
                            _this.dmk_mixins_data_.fn.setMapAttrs(mapKey);
                            _this.dmk_mixins_data_.fn.setBindKeys(bk[mapKey]);
                        } else if (_LHH2.default.isArray(bk)) {
                            bk.map(function (item) {
                                _this.dmk_mixins_data_.fn.setInputBindKey(item);
                            });
                        }
                    },
                    setValMapOpt: function setValMapOpt() {
                        //配置项优先级：全局setOption < 子组件init < 父组件:option < 指定项maps2keys
                        var outputObj = _this.dmk_mixins_data_.outputData;
                        var defOpt = DEF_OPT.valMapOpt;
                        var ip = _this.dmk_mixins_data_.inputParams;
                        var inputOpt = _LHH2.default.isObject(ip.option) ? ip.option.valMapOpt : {};
                        var attrsOpt = _LHH2.default.isObject(_this.$attrs[outputObj.dmkOption]) ? _this.$attrs[outputObj.dmkOption] : {};
                        _LHH2.default.extend(_this.dmk_mixins_data_.outputData.valMapOpt, defOpt, inputOpt, attrsOpt.valMapOpt);
                    },
                    setInputOption: function setInputOption(option) {
                        var outputObj = _this.dmk_mixins_data_.outputData;
                        outputObj.dmkOption = _LHH2.default.isString(option.dmkOption) ? option.dmkOption : DEF_OPT.dmkOption;
                        var dmkMapOpt = outputObj.dmkMapOpt;
                        var ckMapOpt = _LHH2.default.isObject(option.ckMapOpt) ? option.ckMapOpt : {};
                        _this.dmk_mixins_data_.fn.setValMapOpt(option);
                        outputObj.mapAttrs.map(function (mapKey, i) {
                            var opt = option.dmkMapOpt && _LHH2.default.isObject(option.dmkMapOpt[mapKey]) ? option.dmkMapOpt[mapKey] : get_dmkMapOpt(mapKey, _this.dmk_mixins_data_.inputParams);
                            var item = _LHH2.default.extend({}, DEF_OPT.dmkMapOpt, _LHH2.default.isObject(opt) ? _LHH2.default.extend(dmkMapOpt, opt) : dmkMapOpt);
                            ckMapOpt[mapKey] && (item.ck = ckMapOpt[mapKey]);
                            _this.$set(outputObj.datas, mapKey, item);
                        });
                    },
                    //动态转换生成 this[saveName] 数据
                    getData: function getData(data, maps, keys, childKeys) {
                        var d = data,
                            m = maps,
                            k = _LHH2.default.extend({}, childKeys, keys || {}),
                            ck = childKeys;
                        var arr = [];
                        var opt = {
                            ck: ck,
                            valMapOpt: _this.dmk_mixins_data_.outputData.valMapOpt
                        };
                        if (_LHH2.default.isArray(d) && d.length) {
                            //源数据为数组结构、数组不为空
                            //data=[], keys={}
                            arr = get_d2array(d, k, opt); //数组：data或者data+keys处理数据格式
                        } else if (_LHH2.default.isObject(d)) {
                            //源数据为对象结构
                            if (_LHH2.default.isArray(m) && m.length) {
                                //data={}, keys=[]
                                m.map(function (item, i) {
                                    k = item;
                                    arr.push(get_d2object(d, k, ck, d, i, _this.dmk_mixins_data_.outputData.valMapOpt)); //对象：data或者data+keys或者data+maps处理数据格式
                                });
                            } else if (_LHH2.default.isObject(k)) {
                                //data={}, keys={}
                                arr = get_d2array([d], k, opt); //数组：data或者data+keys处理数据格式
                            }
                        }
                        return arr;
                    }
                }
            }
        };
    },

    watch: {
        '$attrs': {
            handler: function handler(newVal, oldVal) {
                this.dmk_mixins_data_.fn.update();
            },

            deep: true
        },
        '_props': {
            handler: function handler(newVal, oldVal) {
                this.dmk_mixins_data_.fn.update();
            },

            deep: true
        }
    },
    beforeCreate: function beforeCreate() {
        dataMapsKeysMixins.dmkMixinsSelf.vm2parent = this; //注意：全局注册，this更新为最后一个组件实例
    },

    methods: {
        //dmk内部主函数：组件初始化，使用此mixins必需调用，建议在created方法里执行：DMK.init();
        _DMK_: function _DMK_() {
            var _this2 = this;

            var bindKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'arr';
            var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            this.dmk_mixins_data_.inputParams.bindKey = bindKey;
            this.dmk_mixins_data_.inputParams.option = option;
            //使用场景：作为子组件调用传参为字符串时
            if (!bindKey) {
                console.log('warn: The first parameter type is not "String or Array", return false.');return false;
            }
            var dmkObj = this.dmk_mixins_data_.outputData;
            this.dmk_mixins_data_.fn.setInputBindKey(bindKey);
            this.dmk_mixins_data_.fn.setInputOption(option);
            var arr = [];
            var d = void 0,
                m = void 0,
                k = void 0,
                ck = void 0;
            dmkObj.mapAttrs.map(function (mapKey, i) {
                var dataOpt = dmkObj.datas[mapKey];
                if (!_this2.$attrs) {
                    if (!(dataOpt.d && dataOpt.m && dataOpt.k)) {
                        console.warn('Vue当前版本不支持非prop特性，请调用DMK.init("arr",option)时指定option.dmkMapOpt的d/m/k/ck配置项指向props值！return false.');
                        return false;
                    }
                }
                d = get_splitData(_this2, dataOpt.d);
                m = get_splitData(_this2, dataOpt.m);
                k = get_splitData(_this2, dataOpt.k);
                ck = get_splitData(_this2, dataOpt.ck);
                if ((_LHH2.default.isArray(d) || _LHH2.default.isObject(d)) && Object.keys(d).length) {
                    arr = _this2.dmk_mixins_data_.fn.getData(d, m, k, ck);
                } else {
                    arr = [];
                }
                set_splitData(_this2, dmkObj.bindKeys[i], arr);
            });
            return this;
        }
    }
}; //END -> DMK.mixins

////暴露唯一实例化接口：
var DMK = function (LHH) {
    var returnObj = function returnObj() {
        this.mixins = dataMapsKeysMixins;
        //返回接口对象
    };
    /**数据转换处理函数，父组件可直接调用
     * 例子：
     * import DMK from 'DMK';
     * let arr = DMK.get(obj2arr, maps2keys);
     * **/
    returnObj.prototype.get = function (obj2arr, maps2keys, isReturnObject, option) {
        //校验第一个参数是否为对象或者数组，否则无需转换直接返回false
        if (!LHH.isObject(obj2arr) && !LHH.isArray(obj2arr)) {
            console.log('warn: The first parameter type is not "Object or Array", return false.');return false;
        }

        var retObj = isReturnObject,
            opt = LHH.isObject(option) ? option : {};
        //判断第三个和第四个参数
        if (LHH.isObject(isReturnObject)) {
            opt = isReturnObject;
            retObj = option;
        }
        //如果第二个参数为true时，则转换obj2arr
        if (LHH.isBoolean(maps2keys) && maps2keys) {
            opt.isHandle = true;
        }

        var arr = [];
        var d = obj2arr;
        var m = LHH.isArray(maps2keys) ? maps2keys : false;
        var k = LHH.isObject(maps2keys) ? maps2keys : false;
        if (opt.isHandle) {
            k = init_keys2childKeys(LHH.isArray(d) ? d[0] || {} : d);
        }
        if (!m && !k) {
            var cpd = LHH.extend(d); //缺少参数，直接返回源数据副本
            return LHH.isObject(d) ? [cpd] : cpd;
        }

        if (LHH.isArray(d) && d.length) {
            //源数据为数组结构、数组不为空
            //data=[], keys={}
            arr = get_d2array(d, k, opt); //数组：data或者data+keys处理数据格式
        } else if (LHH.isObject(d)) {
            //源数据为对象结构
            if (LHH.isArray(m) && m.length) {
                //data={}, keys=[]
                m.map(function (item, i) {
                    k = item;
                    arr.push(get_d2object(d, k, init_keys2childKeys(k), d, i, opt.valMapOpt)); //对象：data或者data+keys或者data+maps处理数据格式
                });
            } else if (LHH.isObject(k)) {
                //data={}, keys={}
                arr = retObj ? get_d2object(d, k, init_keys2childKeys(k), d, 0, opt.valMapOpt) : get_d2array([d], k, opt); //数组：data或者data+keys处理数据格式
            }
        }
        return arr;
    }; //END -> DMK.get()

    //初始化mixins方法
    returnObj.prototype.init = function () {
        var bindKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'arr';
        var option = arguments[1];

        return dataMapsKeysMixins.methods._DMK_.call(dataMapsKeysMixins.dmkMixinsSelf.vm2parent, bindKey, option);
    }; //END -> DMK.init()

    //设置 DEF_OPT 全局配置项方法
    returnObj.prototype.setOption = function (option, isForceUpdate) {
        var obj = dataMapsKeysMixins.dmkMixinsSelf;
        var result = false;
        if (!obj.setOptionLock || isForceUpdate) {
            obj.setOptionLock && obj.warn && console.log('warn: 正在多次修改全局配置项，请确认已了解风险！');
            result = setDefOpt(option);
            result && obj.setOptionLock++;
        } else {
            obj.warn && console.log('warn: 请勿重复设置全局配置项，建议组件传参覆盖！(若已了解风险，可传递第二个参数强制覆盖)');
        }
        return result;
    }; //END -> DMK.setOption()

    returnObj.prototype.update = function (callback, context) {
        var cb = callback,
            ct = context || dataMapsKeysMixins.dmkMixinsSelf.vm2parent;
        if (!LHH.isFunction(callback)) {
            ct = callback;
            cb = context;
        }
        return ct.dmk_mixins_data_.fn.update(cb);
    }; //END -> DMK.setOption()

    return new returnObj();
}(_LHH2.default);

exports.default = DMK;