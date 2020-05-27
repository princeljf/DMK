import LHH from './LHH.js';
//全局配置项
let DEF_OPT = {
    dmkMapOpt:{
        d:'$attrs.d',     
        m:'$attrs.m', 
        k:'$attrs.k',
        ck: 'keys', //子组件绑定模板的数据源，默认为this.keys：支持$data.keys或者$props.keys形式
    },
    valMapOpt:{
        'empty':'',         //值为空字符串''时，转换为设置的值
        'undefined':'',     //值为undefined时，转换为设置的值
        'null':'',          //值为null时，转换为设置的值
    },
    dmkOption: 'dmkOption', //指定组件配置项属性名
};
const DEF_OPT_COPY = LHH.extend(true, DEF_OPT);//全局配置项副本
//设置全局默认配置
const setDefOpt = (option)=>{
    let opt = option;
    if(opt=='reset'){
        opt = DEF_OPT = LHH.extend(true, DEF_OPT_COPY)//还原默认配置
    }else if(LHH.isObject(opt)){
        opt = LHH.extend(true, DEF_OPT, opt);//覆盖配置
    }else{
        opt = false;//失败
    }
    return opt;
};
//分割点'.'数据处理：keys.k1.0.k2，支持点语法，数组直接用下标表示，暂不支持中括号'[]'形式：keys.k1[0]k2，不存在的key默认值返回为空字符串：return = ''
const get_deepData = (data, splitStr, option, defOption)=>{
    //新增：自定义字符转换和设置function、新增回调方法callback(val, key, data)
    let valMapOpt = LHH.isObject(defOption) ? defOption : LHH.extend(DEF_OPT.valMapOpt);
    let opt = LHH.isObject(option) ? LHH.extend({}, valMapOpt, option) : LHH.extend(DEF_OPT.valMapOpt, valMapOpt);
    let val = data;
    let flagStr = '';
    let splitArr = splitStr.split('.');
    for(let k in splitArr){
        val = val[ splitArr[k] ];
        switch(val){
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
        if( (LHH.isString(flagStr) || LHH.isNumber(flagStr)) && (flagStr in opt) ){
            val = LHH.isFunction(opt[flagStr]) ? opt[flagStr]( val ) : opt[flagStr];
            break;
        }
    }
    opt.callback && (val = opt.callback( val, opt.default, data ));
    return val;
};

//返回对象数据：keys生成默认childKeys
const init_keys2childKeys = (keys)=>{
    let ck = {};
    for(let key in keys){
        ck[key] = key;
    }
    return ck;
};
//返回对象数据
const get_d2object = (d, k, ck, item, i, valMapOpt)=>{
    let obj = {};
    for(let ckey in ck){
        let kkey = k[ckey];
        //当映射值为字符串且不存在点语法且  映射值不包含于数据源中，直接返回当前值
        
        if( !kkey || (LHH.isString(kkey) && !/.\../.test(kkey) && !(kkey in item)) ){
            obj[ ck[ckey] ] = kkey;
        }else{
            //处理对象，默认key映射为defalut的值
            if( LHH.isObject(kkey) ){
                kkey = kkey.default || '';
            }
            if(!kkey){ 
                console.warn('Keys or Maps is empty.'); 
            }else if( LHH.isFunction(kkey) ){
                obj[ ck[ckey] ] = kkey( LHH.extend({},item), i, d );
            }else{
                obj[ ck[ckey] ] = get_deepData( LHH.extend({},item), kkey, k[ckey], valMapOpt );
            }
        }
    }
    return obj;
};
//返回数组数据
const get_d2array = (d, k, option)=>{
    let opt = LHH.isObject(option) ? option : {};
    if(!LHH.isObject(opt.ck)){
        opt.ck = init_keys2childKeys(k);
    }
    let retArr = [];
    d.map((item,i)=>{
        retArr.push( get_d2object(d, k, opt.ck, item, i, opt.valMapOpt) );
    });
    return retArr;
};
//返回点语法数据
const get_splitData = (data, splitStr='', splitFlag='.')=>{
    let val = data;
    let splitArr = splitStr.split(splitFlag);
    for(let k in splitArr){
        val = val[ splitArr[k] ];
        if(!val){
            break;
        }
    }
    return val;
};
//设置点语法数据
const set_splitData = (data, splitStr='', value=[], splitFlag='.')=>{
    let val = data;
    let splitArr = splitStr.split(splitFlag);
    let isBoolean = false;
    for(let i=0; i<splitArr.length; i++){
        if(i === splitArr.length-1){
            val[ splitArr[i] ] = value;
            isBoolean = true;
        }else{
            val = val[ splitArr[i] ];
        }
        
    }
    return isBoolean;
};

const get_dmkMapOpt = (mapKey='', inputParams)=>{
    let obj = LHH.extend(DEF_OPT.dmkMapOpt);
    if(!mapKey || LHH.isString(inputParams.bindKey) || LHH.isObject(inputParams.bindKey)){ return obj; }
    for(let k in obj){
        obj[k] = obj[k].replace(/^\$attrs/, '\$attrs\.'+mapKey);
    }
    return obj;
};

const dataMapsKeysMixins = {
    dmkMixinsSelf:{
        vm2parent: null,//指向组件实例
        setOptionLock: 0, //判断全局配置是否设置过
        warn: true,
    },
    name: 'dataMapsKeysMixins',
    data(){
        return {
            //dmk内部数据
            dmk_mixins_data_: {
                //保存外部传入参数对象
                inputParams:{
                    bindKey: null,//必填：第一个参数，绑定数据结构，类型：String | Object | Array
                    option: null,//可选：第二个参数，配置项结构，类型：Object
                },
                //生成相关数据
                outputData:{
                    mapAttrs: [],
                    bindKeys: [],
                    childKeys:[],
                    valMapOpt: {},
                    dmkOption: '',
                    datas:{

                    },
                },
                fn:{
                    //更新函数
                    update: (callback, context)=>{
                        let self = context || this;
                        let ip = self.dmk_mixins_data_.inputParams;
                        ip.bindKey && self._DMK_(ip.bindKey, ip.option) && LHH.isFunction(callback) && setTimeout(()=>{
                            self.$nextTick(()=>{
                                callback();
                            });
                        },1);
                    },
                    setBindKeys: (str)=>{
                        let outputObj = this.dmk_mixins_data_.outputData;
                        outputObj.bindKeys.indexOf(str) === -1 && (outputObj.bindKeys.push(str));
                    },
                    setMapAttrs: (str)=>{
                        let outputObj = this.dmk_mixins_data_.outputData;
                        outputObj.mapAttrs.indexOf(str) === -1 && (outputObj.mapAttrs.push(str));
                    },
                    setInputBindKey: (bindKey)=>{
                        let bk = bindKey;
                        if(LHH.isString(bk)){
                            this.dmk_mixins_data_.fn.setMapAttrs(bk);
                            this.dmk_mixins_data_.fn.setBindKeys(bk);
                        }else if(LHH.isObject(bk)){
                            let mapKey = Object.keys(bk)[0];
                            this.dmk_mixins_data_.fn.setMapAttrs(mapKey);
                            this.dmk_mixins_data_.fn.setBindKeys(bk[mapKey]);
                        }else if(LHH.isArray(bk)){
                            bk.map((item)=>{
                                this.dmk_mixins_data_.fn.setInputBindKey(item);
                            });
                        }
                    },
                    setValMapOpt: ()=>{
                        //配置项优先级：全局setOption < 子组件init < 父组件:option < 指定项maps2keys
                        let outputObj = this.dmk_mixins_data_.outputData;
                        let defOpt = DEF_OPT.valMapOpt;
                        let ip = this.dmk_mixins_data_.inputParams;
                        let inputOpt = LHH.isObject(ip.option) ? ip.option.valMapOpt : {};
                        let attrsOpt = LHH.isObject(this.$attrs[outputObj.dmkOption]) ? this.$attrs[outputObj.dmkOption] : {};
                        LHH.extend(this.dmk_mixins_data_.outputData.valMapOpt, defOpt, inputOpt, attrsOpt.valMapOpt);
                    },
                    setInputOption: (option)=>{
                        let outputObj = this.dmk_mixins_data_.outputData;
                        outputObj.dmkOption = LHH.isString(option.dmkOption) ? option.dmkOption : DEF_OPT.dmkOption;
                        let dmkMapOpt = outputObj.dmkMapOpt;
                        let ckMapOpt = LHH.isObject(option.ckMapOpt) ? option.ckMapOpt : {};
                        this.dmk_mixins_data_.fn.setValMapOpt(option);
                        outputObj.mapAttrs.map((mapKey, i)=>{
                            let opt = (option.dmkMapOpt && LHH.isObject(option.dmkMapOpt[mapKey])) ? option.dmkMapOpt[mapKey] : get_dmkMapOpt(mapKey, this.dmk_mixins_data_.inputParams);
                            let item = LHH.extend( {}, DEF_OPT.dmkMapOpt, LHH.isObject(opt)?LHH.extend(dmkMapOpt, opt):dmkMapOpt );
                            ckMapOpt[mapKey] && (item.ck = ckMapOpt[mapKey]);
                            this.$set(outputObj.datas, mapKey, item);
                        });
                    },
                    //动态转换生成 this[saveName] 数据
                    getData: (data, maps, keys, childKeys)=>{
                        let d = data, m = maps, k = LHH.extend({},childKeys,keys||{}), ck = childKeys;
                        let arr = [];
                        let opt = {
                            ck: ck,
                            valMapOpt: this.dmk_mixins_data_.outputData.valMapOpt,
                        };
                        if(LHH.isArray(d) && d.length){
                            //源数据为数组结构、数组不为空
                            //data=[], keys={}
                            arr = get_d2array(d, k, opt);//数组：data或者data+keys处理数据格式
                        }else if(LHH.isObject(d)){
                            //源数据为对象结构
                            if(LHH.isArray(m) && m.length){
                                //data={}, keys=[]
                                m.map((item,i)=>{
                                    k = item;
                                    arr.push( get_d2object(d, k, ck, d, i, this.dmk_mixins_data_.outputData.valMapOpt) );//对象：data或者data+keys或者data+maps处理数据格式
                                });
                            }else if(LHH.isObject(k)){
                                //data={}, keys={}
                                arr = get_d2array([d], k, opt);//数组：data或者data+keys处理数据格式
                            }
                        }
                        return arr;
                    }
                }
            },
        }
    },
    watch:{
        '$attrs':{
            handler(newVal,oldVal){
                this.dmk_mixins_data_.fn.update();
            },
            deep:true
        },
        '_props':{
            handler(newVal,oldVal){
                this.dmk_mixins_data_.fn.update();
            },
            deep:true
        },
    },
    beforeCreate(){
        dataMapsKeysMixins.dmkMixinsSelf.vm2parent = this;//注意：全局注册，this更新为最后一个组件实例
    },
    methods:{
        //dmk内部主函数：组件初始化，使用此mixins必需调用，建议在created方法里执行：DMK.init();
        _DMK_(bindKey='arr', option={}){
            this.dmk_mixins_data_.inputParams.bindKey = bindKey;
            this.dmk_mixins_data_.inputParams.option = option;
            //使用场景：作为子组件调用传参为字符串时
            if(!bindKey){ console.log('warn: The first parameter type is not "String or Array", return false.'); return false; }
            let dmkObj = this.dmk_mixins_data_.outputData;
            this.dmk_mixins_data_.fn.setInputBindKey(bindKey);
            this.dmk_mixins_data_.fn.setInputOption(option);
            let arr = [];
            let d, m, k, ck;
            dmkObj.mapAttrs.map((mapKey, i)=>{
                let dataOpt = dmkObj.datas[mapKey];
                if(!this.$attrs){
                    if( !(dataOpt.d && dataOpt.m && dataOpt.k) ){
                        console.warn('Vue当前版本不支持非prop特性，请调用DMK.init("arr",option)时指定option.dmkMapOpt的d/m/k/ck配置项指向props值！return false.');
                        return false;
                    }
                }
                d = get_splitData(this, dataOpt.d);
                m = get_splitData(this, dataOpt.m);
                k = get_splitData(this, dataOpt.k);
                ck = get_splitData(this, dataOpt.ck);
                if( (LHH.isArray(d) || LHH.isObject(d)) && Object.keys(d).length ){
                    arr = this.dmk_mixins_data_.fn.getData(d, m, k, ck);
                }else{
                    arr = [];
                }
                set_splitData(this, dmkObj.bindKeys[i], arr);
            });
            return this;
        },
    }
};//END -> DMK.mixins

////暴露唯一实例化接口：
const DMK = ((LHH)=>{
    let returnObj = function(){
        this.mixins = dataMapsKeysMixins;
        //返回接口对象
    };
    /**数据转换处理函数，父组件可直接调用
     * 例子：
     * import DMK from 'DMK';
     * let arr = DMK.get(obj2arr, maps2keys);
     * **/
    returnObj.prototype.get = (obj2arr, maps2keys, isReturnObject, option)=>{
        //校验第一个参数是否为对象或者数组，否则无需转换直接返回false
        if(!LHH.isObject(obj2arr) && !LHH.isArray(obj2arr)){ console.log('warn: The first parameter type is not "Object or Array", return false.'); return false; }
        let arr = [];
        let d = obj2arr;
        let m = LHH.isArray(maps2keys) ? maps2keys : false;
        let k = LHH.isObject(maps2keys) ? maps2keys : false;
        if(!m && !k){
            let cpd = LHH.extend( d );//缺少参数，直接返回源数据副本
            return LHH.isObject(d) ? [cpd] : cpd; 
        }
        //判断第三个和第四个参数
        let retObj = isReturnObject, opt = LHH.isObject(option)?option:{};
        if(LHH.isObject(isReturnObject)){
            opt = isReturnObject;
            retObj = option;
        }
        if(LHH.isArray(d) && d.length){
            //源数据为数组结构、数组不为空
            //data=[], keys={}
            arr = get_d2array(d, k, opt);//数组：data或者data+keys处理数据格式
        }else if(LHH.isObject(d)){
            //源数据为对象结构
            if(LHH.isArray(m) && m.length){
                //data={}, keys=[]
                m.map((item,i)=>{
                    k = item;
                    arr.push( get_d2object(d, k, init_keys2childKeys(k), d, i, opt.valMapOpt) );//对象：data或者data+keys或者data+maps处理数据格式
                });
            }else if(LHH.isObject(k)){
                //data={}, keys={}
                arr = retObj ? get_d2object(d, k, init_keys2childKeys(k), d, 0, opt.valMapOpt) : get_d2array([d], k, opt);//数组：data或者data+keys处理数据格式
            }
        }
        return arr;
    };//END -> DMK.get()

    //初始化mixins方法
    returnObj.prototype.init = (bindKey='arr', option)=>{
        return dataMapsKeysMixins.methods._DMK_.call(dataMapsKeysMixins.dmkMixinsSelf.vm2parent, bindKey, option);
    };//END -> DMK.init()
    
    //设置 DEF_OPT 全局配置项方法
    returnObj.prototype.setOption = (option, isForceUpdate)=>{
        let obj = dataMapsKeysMixins.dmkMixinsSelf;
        let result = false;
        if(!obj.setOptionLock || isForceUpdate){
            obj.setOptionLock && obj.warn && console.log('warn: 正在多次修改全局配置项，请确认已了解风险！');
            result = setDefOpt(option);
            result && (obj.setOptionLock++);
        }else{
            obj.warn && console.log('warn: 请勿重复设置全局配置项，建议组件传参覆盖！(若已了解风险，可传递第二个参数强制覆盖)');
        }
        return result;
    };//END -> DMK.setOption()

    returnObj.prototype.update = (callback, context)=>{
        let cb=callback, ct=context || dataMapsKeysMixins.dmkMixinsSelf.vm2parent;
        if(!LHH.isFunction(callback)){
            ct = callback;
            cb = context;
        }
        return ct.dmk_mixins_data_.fn.update(cb);
    };//END -> DMK.setOption()

    return new returnObj();
})(LHH);


export default DMK;
