<template>
    <div class="common-install-tpl">
        <h2>介绍</h2>
        <div class="common-tpl-title">
            一、DMK 主要功能
        </div>
        <div class="common-tpl-code">
            <p>1. 数据处理和数据转换、数据监听自动更新；</p>
            <p>2. 通过参数配置驱动数据映射：提高解耦性和复用率；</p>
            <p>3. 团队代码风格统一：轻量简洁、提高可维护性；</p>
        </div>
        <div class="common-tpl-title">
            二、环境支持
        </div>
        <div class="common-tpl-code">
            <p>1. DMK.mixins：使用了非prop特性，目前需要this.$attrs支持；</p>
            <p class="tip">（注意：Vue版本不支持非prop特性，请调用DMK.init("arr",option)时指定option.dmkMapOpt的d/m/k/ck配置项指向props值）</p>
            <p>2. DMK.get(arr2obj, maps2keys)：不依赖prop特性和props，专职处理数据，等价于调用一个方法；</p>
        </div>
    </div>
</template>

<script>
import DMK from 'dmk';
export default {
    mixins: [DMK.mixins],
    name: 'common-introduce-tpl',
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