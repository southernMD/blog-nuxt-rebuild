<template>
    <div class="article">
        <div class="search-block" v-show="$route?.query?.searchType">
            <span>{{ $route?.query?.searchType === 'tag' ? '标签搜索' : '关键词搜索' }}</span>
            <span>"{{ $route?.query?.searchKey }}"</span>
        </div>
        <div class="article-list">
            <div class="noData" v-if="ArticlesList?.length == 0">
                {{ helpMessage }}
            </div>
            <ArticleItem v-else v-for="(val, index) in ArticlesList" :key="val.id" :ArticlesList="ArticlesList[index]" />
        </div>
        <ClientOnly>
            <el-pagination background layout="prev, pager, next" :page-count="total" v-model:currentPage="nowPage" />
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { ElPagination } from 'element-plus';
import type { Article, ArticleListHttp, getArticleListRes } from '~/types/article';
// import { useApp, useOneArticle } from '~~/stores';
const AppPinia = useApp()
// const OneArticle = useOneArticle()
// const total = toRef(AppPinia,'totalPages')
const nowPage = toRef(AppPinia,'nowPage')
const ArticlesList = ref([]) as Ref<Article[]>
const total = ref(0)
// const nowPage = ref(1)
const $route = useRoute()
const helpMessage = ref("加载中...")
const searchKey = ref($route.query.searchKey?$route.query.searchKey:'')
watch(()=>$route.query.searchKey,(newVal)=>{
    searchKey.value = newVal ? newVal : ''
    nowPage.value = 1
})

const { data: articlesData} = useAsyncData('articlesList', async () => {
    let flag = $route?.query?.searchType === 'tag' ? 2:0
    const HttpRequestArticlesList = await useGetArticlesList(nowPage.value, 5,searchKey.value.toString(), flag) as ArticleListHttp<Article[]>;
    return HttpRequestArticlesList as getArticleListRes
}, {
    watch: [nowPage, searchKey],
});

watch(articlesData, (newData) => {
    if (newData) {
        ArticlesList.value = newData.result as Article[];
        total.value = newData.totalPages
    }
}, { immediate: true });

watch(nowPage, () => {
    AppPinia.scrollbarRef!.scrollTo({
        top: 0,
    })
})


setTimeout(() => {
    helpMessage.value = "暂无内容"
}, 10000);

</script>

<style scoped lang="less">
.search-block {
    width: 100%;
    height: 150px;
    background: @background-color-op;
    border-radius: @border-ra;
    margin-bottom: 20px;
    display: flex;
    justify-self: start;
    align-items: center;
    color: @font-color;

    span:first-child {
        margin-left: 20px;
        font-size: 25px;
    }

    span:last-child {
        font-size: 30px;
    }
}

.el-tag {
    background-color: rgba(0, 0, 0, 0);
    margin: 5px 5px;
    user-select: none;
    cursor: pointer;
}

.article {
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    .article-list {
        width: 100%;

        .noData {
            width: 100%;
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: @background-color-op;
            border-radius: @border-ra;
            margin-bottom: 20px;
            font-size: 30px;
            color: @font-color;
        }
    }

    :deep(.el-pagination) {
        margin-bottom: 50px;

        button,
        li {
            border-radius: @border-ra;
            background: @background-color !important;
            color: @font-color !important;
        }

        .is-active {
            background: @background-color-op !important;
        }
    }
}
</style>