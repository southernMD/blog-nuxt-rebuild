<template>
    <div class="taglist-bk">
        <div class="inpt">
            <input type="text" v-model="searchVal" @input="debounceSearch" placeholder="Search Tags...">
        </div>
        <div class="taglist">
            <el-scrollbar>
                <el-tag v-for="val in tagsCopy" :key="val" :type="_.sample(tagsColor)" effect="plain" @click="searchByTag(val)">
                    {{ val }}
                </el-tag>
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup lang="ts">
import _  from 'lodash'
import {useApp } from '~~/stores';
import { ElTag, ElScrollbar } from 'element-plus';
const AppPinia = useApp()
const tags = toRef(AppPinia,'tags_list')
const tagsCopy = ref(tags.value) as Ref<any>
watch(tags,()=>{
    tagsCopy.value = tags
},{deep:true})

const tagsColor = ['success', 'warning', 'danger', '']
let searchVal = ref('')
const search = () => {
    tagsCopy.value = []
    tagsCopy.value = tags.value.filter((val:any) => {
        return val.includes(searchVal.value)
    })
}
const debounceSearch = _.debounce(search, 300)
const nowPage = toRef(AppPinia,'nowPage')

const searchByTag = async(key:string)=>{
    nowPage.value = 1
    AppPinia.SearchDrawerFlag = false
    if(key === '十年'){
        navigateTo("/years")
    }else{
        navigateTo({
            path:'/articles',
            query:{
                searchType:'tag',
                searchKey:key,
            }
        })
    }
}

</script>

<style scoped lang="less">
.taglist-bk{
    order: 2;
}
.inpt {
    height: 40px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid @font-color;
    z-index: 0;
    position: relative;
}

input {
    height: 30px;
    font-size: 20px;
    background: none;
    color: @font-color;
}

.taglist {
    width: 260px;
    margin: 0 auto;
    margin-top: 20px;
    height: 400px;
    max-width: 100%;

    .el-tag {
        background-color: rgba(0, 0, 0, 0);
        margin: 5px 5px;
        user-select: none;
        cursor: pointer;
    }
}
</style>