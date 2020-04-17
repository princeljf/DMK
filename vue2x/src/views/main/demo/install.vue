<template>
    <div class="common-main-tpl">
        <h2>安装</h2>
        <div class="common-tpl-title">
            一、npm安装
        </div>
        <div class="common-tpl-code">
            <code>
                $ npm install dmk
            </code>
        </div>
        <div class="common-tpl-title">
            二、组件引入
        </div>
        <div class="common-tpl-code">
            <code>
                import DMK from 'dmk';
            </code>
        </div>
        <div class="common-tpl-title">
            三、注册DMK.mixins和初始化mixins
        </div>
        <div class="common-tpl-code">
            <code>
                <p>注册: mixins: [DMK.mixins]</p>
                <p>初始化：建议在created钩子函数中调用 DMK.init()</p>
            </code>
        </div>
        <div class="common-tpl-title">
            四、使用DMK.get()处理数据函数
        </div>
        <div class="common-tpl-code">
            <code>
                let arr = DMK.get(datas, maps2keys);
            </code>
        </div>
    </div>
</template>

<script>
import DMK from 'dmk';
export default {
    mixins: [DMK.mixins],
    name: 'common-install-tpl',
    data() { 
        return {
            arr: [],
            keys:{
                text: 'text'
            },
        }
    },
    components:{ 
        
    },
    created() { 
        DMK.init();
    },
}
</script>

<style lang="" scoped>
</style>