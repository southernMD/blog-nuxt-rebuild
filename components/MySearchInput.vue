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
import { useApp,useOneArticle } from '~~/stores';
let searchVal = ref('')
const OneArticle = useOneArticle()
const AppPinia = useApp()
const totalPages = toRef(AppPinia,'totalPages')
const nowPage = toRef(AppPinia,'nowPage')
const ArticlesList = toRef(AppPinia,'ArticlesList') as unknown as Ref<ArticleObj[]>
const ArticlesListYear  = toRef(AppPinia,'ArticlesListYear') as unknown as Ref<ArticleObj[]>
const $route = useRoute()
const $router = useRouter()

const goSearch = async() => {
    if(searchVal.value.length === 0)return
    nowPage.value = 1
    if($route.path.includes('years')){
        const HttpRequestArticlesList = await useGetArticlesList(1,5,searchVal.value,1) as ArticleListHttp<ArticleObj[]>
        ArticlesListYear.value = HttpRequestArticlesList.result as ArticleObj[]
        totalPages.value = +HttpRequestArticlesList.totalPages
        $router.push({
            path:'years',
            query:{
                searchType:'key',
                searchKey:searchVal.value
            }
        })
    }else{
        const HttpRequestArticlesList = await useGetArticlesList(1,5,searchVal.value,0) as ArticleListHttp<ArticleObj[]>
        ArticlesList.value = HttpRequestArticlesList.result as ArticleObj[]
        totalPages.value = +HttpRequestArticlesList.totalPages
        $router.push({
            path:'/articles',
            query:{
                searchType:'key',
                searchKey:searchVal.value
            }
        })
    }
    searchVal.value = ''
}


watch(nowPage,async()=>{
    const flag = $route.path.includes('years')?1:0
    if($route.query.searchType == 'key'){
        const HttpRequestArticlesList = await useGetArticlesList(nowPage.value, 5,String($route.query.searchKey),flag) as ArticleListHttp<ArticleObj[]>
        ArticlesList.value = HttpRequestArticlesList.result as ArticleObj[]
    }
})
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