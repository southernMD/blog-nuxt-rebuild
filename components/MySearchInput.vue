<template>
    <el-input v-model="searchVal" :placeholder="`search in ${$route.path.includes('years') ? 'years' : 'station'} ...`"
        @keydown.enter="goSearch">
        <template #suffix>
            <i class="iconfont icon-search" style="font-size:18px;cursor: pointer;" @click.self="goSearch"></i>
        </template>
    </el-input>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus';
import { useApp } from '~~/stores';
let searchVal = ref('')
const AppPinia = useApp()
const nowPage = toRef(AppPinia,'nowPage')
const $route = useRoute()
const goSearch = async() => {
    searchVal.value = searchVal.value.trim()
    if(searchVal.value.length === 0){
        if($route.path.includes('years')){
            navigateTo({path:'/years',query:undefined})
            return;
        }else if($route.path.includes('articles')){
            navigateTo({path:'/articles',query:undefined})
            return;
        }else{
            return;
        }
    }
    nowPage.value = 1
    AppPinia.changeSearchDrawerState(false)
    if($route.path.includes('years')){
        navigateTo({
            path:'/years',
            query:{
                searchType:'key',
                searchKey:searchVal.value,
            }
        })
    }else{
        navigateTo({
            path:'/articles',
            query:{
                searchType:'key',
                searchKey:searchVal.value,
            }
        })
    }
    searchVal.value = ''
}

</script>

<style scoped lang="less">
.el-input {
    background: none;
    margin-bottom: 20px;
    width: 280px;
    border-radius: @border-ra;
    height: 50px;

    :deep(.el-input__wrapper) {
        border-radius: @border-ra;
        width: 280px;
        height: 50px;
        box-shadow: none !important;
        background-color: @background-color-op;

        input {
            width: 280px;
            color: @font-color;
            height: 50px;
            font-size: 18px;

            &::placeholder {
                color: @font-color;
                opacity: 0.4;
            }
        }
    }
}
</style>