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
    }
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
    let opt = LHH.isObject(option) ? LHH.extend({}, valMapOpt, option) : valMapOpt;
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
        if( LHH.isString(flagStr) && (flagStr in opt) ){
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
    vm2parent: null,
    name: 'dataMapsKeysMixins',
    data(){
        return {
            dmk_mixins_option: {
                //保存外部传入参数对象
                inputParams:{
                    bindKey: null,//必填：第一个参数，绑定数据结构，类型：String | Object | Array
                    option: null,//可选：第二个参数，配置项结构，类型：Object
                },
            },
            dmk_output_obj:{
                mapAttrs: [],
                bindKeys: [],
                childKeys:[],
                valMapOpt: null,
                datas:{

                },
            },
        }
    },
    watch:{
        '$attrs':{
            handler(newVal,oldVal){
                this._updateDMK_();
            },
            deep:true
        },
        '_props':{
            handler(newVal,oldVal){
                this._updateDMK_();
            },
            deep:true
        },
    },
    beforeCreate(){
        dataMapsKeysMixins.vm2parent = this;
    },
    methods:{
        _updateDMK_(callback){
            let ip = this.dmk_mixins_option.inputParams;
            ip.bindKey && this._DMK_(ip.bindKey, ip.option) && LHH.isFunction(callback) && setTimeout(()=>{
                this.$nextTick(()=>{
                    callback();
                });
            },1);
        },
        //组件初始化，使用此mixins必需调用，建议在created方法里执行：this._DMK_();
        _DMK_(bindKey='arr', option={}){
            this.dmk_mixins_option.inputParams.bindKey = bindKey;
            this.dmk_mixins_option.inputParams.option = option;
            //使用场景：作为子组件调用传参为字符串时
            if(!bindKey){ console.log('warn: The first parameter type is not "String or Array", return false.'); return false; }
            let dmkObj = this.dmk_output_obj;
            this._set_input_bindKey(bindKey);
            this._set_input_option(option);
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
                    arr = this._get_data(d, m, k, ck);
                }else{
                    arr = [];
                }
                set_splitData(this, dmkObj.bindKeys[i], arr);
            });
            return this;
        },
        _set_bind_keys(str){
            let outputObj = this.dmk_output_obj;
            outputObj.bindKeys.indexOf(str) === -1 && (outputObj.bindKeys.push(str));
        },
        _set_map_attrs(str){
            let outputObj = this.dmk_output_obj;
            outputObj.mapAttrs.indexOf(str) === -1 && (outputObj.mapAttrs.push(str));
        },
        _set_input_bindKey(bindKey){
            let bk = bindKey;
            if(LHH.isString(bk)){
                this._set_map_attrs(bk);
                this._set_bind_keys(bk);
            }else if(LHH.isObject(bk)){
                let mapKey = Object.keys(bk)[0];
                this._set_map_attrs(mapKey);
                this._set_bind_keys(bk[mapKey]);
            }else if(LHH.isArray(bk)){
                bk.map((item)=>{
                    this._set_input_bindKey(item);
                });
            }
        },
        _set_val_map_opt(option){
            let opt = LHH.isObject(option) ? option : {};
            let defOpt = this.dmk_output_obj.valMapOpt;
            for(let k in defOpt){
                k instanceof opt && (defOpt[k] = opt[k]);
            }
        },
        _set_input_option(option){
            let outputObj = this.dmk_output_obj;
            let dmkMapOpt = outputObj.dmkMapOpt;
            let ckMapOpt = LHH.isObject(option.ckMapOpt) ? option.ckMapOpt : {};
            this._set_val_map_opt(option);
            outputObj.mapAttrs.map((mapKey, i)=>{
                let opt = (option.dmkMapOpt && LHH.isObject(option.dmkMapOpt[mapKey])) ? option.dmkMapOpt[mapKey] : get_dmkMapOpt(mapKey, this.dmk_mixins_option.inputParams);
                let item = LHH.extend( {}, DEF_OPT.dmkMapOpt, LHH.isObject(opt)?LHH.extend(dmkMapOpt, opt):dmkMapOpt );
                ckMapOpt[mapKey] && (item.ck = ckMapOpt[mapKey]);
                this.$set(outputObj.datas, mapKey, item);
            });
        },
        //动态转换生成 this[saveName] 数据
        _get_data(data, maps, keys, childKeys){
            let d = data, m = maps, k = LHH.extend({},childKeys,keys||{}), ck = childKeys;
            let arr = [];
            let opt = {
                ck: ck,
                valMapOpt: this.dmk_output_obj.valMapOpt,
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
                        arr.push( get_d2object(d, k, ck, d, i, this.dmk_output_obj.valMapOpt) );//对象：data或者data+keys或者data+maps处理数据格式
                    });
                }else if(LHH.isObject(k)){
                    //data={}, keys={}
                    arr = get_d2array([d], k, opt);//数组：data或者data+keys处理数据格式
                }
            }
            return arr;
        }
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
    returnObj.prototype.get = (obj2arr, maps2keys)=>{
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
        if(LHH.isArray(d) && d.length){
            //源数据为数组结构、数组不为空
            //data=[], keys={}
            arr = get_d2array(d, k);//数组：data或者data+keys处理数据格式
        }else if(LHH.isObject(d)){
            //源数据为对象结构
            if(LHH.isArray(m) && m.length){
                //data={}, keys=[]
                m.map((item,i)=>{
                    k = item;
                    arr.push( get_d2object(d, k, init_keys2childKeys(k), d, i) );//对象：data或者data+keys或者data+maps处理数据格式
                });
            }else if(LHH.isObject(k)){
                //data={}, keys={}
                arr = get_d2array([d], k);//数组：data或者data+keys处理数据格式
            }
        }
        return arr;
    };//END -> DMK.get()

    //初始化mixins方法
    returnObj.prototype.init = (bindKey='arr', option)=>{
        return dataMapsKeysMixins.methods._DMK_.call(dataMapsKeysMixins.vm2parent, bindKey, option);
    };//END -> DMK.init()
    
    //设置 DEF_OPT 全局配置项方法
    returnObj.prototype.setOption = (option)=>{
        return setDefOpt(option);
    };//END -> DMK.setOption()

    returnObj.prototype.update = (callback, context)=>{
        let cb=callback, ct=context;
        if(!LHH.isFunction(callback)){
            ct = callback;
            cb = context;
        }
        return dataMapsKeysMixins.methods._updateDMK_.call(ct || dataMapsKeysMixins.vm2parent, cb);
    };//END -> DMK.setOption()

    return new returnObj();
})(LHH);


export default DMK;
