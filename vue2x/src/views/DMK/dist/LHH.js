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
    var isBoolean = function isBoolean(obj) {
        return Object.prototype.toString.call(obj) === '[object Boolean]';
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
        isBoolean: isBoolean,
        extend: extend
    };
}();

exports.default = LHH;