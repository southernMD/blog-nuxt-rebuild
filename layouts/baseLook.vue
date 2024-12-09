<template>
    <div style="height:100vh;">
        <NuxtLayout name="container">
            <template #left>
                <div v-if="!$route.path.includes('years')">
                    <Component :is="comps[flag]"></Component>
                </div>
                <div v-else>
                    <div class="title">分类</div>
                    <el-scrollbar>
                        <ul class="list">
                            <li v-for="val in taglist" @click="searchByTag(val)">
                                <span>{{ val }} </span>
                            </li>
                            <li v-show="taglist.length == 0">
                                <span style="cursor: default; ">暂无内容</span>
                            </li>
                        </ul>
                    </el-scrollbar>
                </div>
            </template>
            <template #option v-if="!$route.path.includes('years')">
                <div class="option">
                    <div v-for="(val, index) in tagslen" @click="change(index)" :class="{ active: flag == index }"
                        :key="index">
                        {{ tags[index] }}
                    </div>
                </div>
            </template>
            <template #right>
                <slot name="right"></slot>
            </template>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { useApp, useOneArticle } from '@/stores'
import { type Ref } from 'vue'

const OneArticle = useOneArticle()
const AppPinia = useApp()
let scrollbarVal = toRef(AppPinia, 'scrollbarVal')
const MyMessage = resolveComponent('MyMessage')
const TagList = resolveComponent('TagList')
const taglist = toRef(OneArticle, 'tags_list_years')
const $route = useRoute()

const Directory = resolveComponent('Directory')
const comps = shallowRef([MyMessage, TagList, Directory])
const tags = ref(['站点信息', '标签云', '目录'])
const tagslen = ref(2)
let flag = ref(0)
const change = (num: number) => {
    flag.value = num;
}

const directory = toRef(AppPinia, 'directory')
watch(directory, () => {
    if (directory.value == -1) {
        flag.value = 0
        tagslen.value = 2
    } else {
        flag.value = 2
        tagslen.value = 3
    }
}, { immediate: true })

const nowPage = toRef(AppPinia, 'nowPage')
const ArticlesList = toRef(AppPinia, 'ArticlesListYear') as unknown as Ref<ArticleObj[]>
const total = toRef(AppPinia, 'totalPages')
const $router = useRouter()

const searchByTag = async (key: string) => {
    nowPage.value = 1
    const HttpRequestArticlesList = await useGetArticlesList(1, 5, key, 2) as ArticleListHttp<ArticleObj[]>
    ArticlesList.value = HttpRequestArticlesList.result as ArticleObj[]
    total.value = HttpRequestArticlesList.totalPages
    $router.push({
        path: '/years',
        query: {
            searchType: 'tag',
            searchKey: key
        }
    })
}
</script>

<style scoped lang="less">
.option {
    width: 60%;
    display: flex;
    justify-content: space-between;
    color: @font-color;
    user-select: none;
    order: 3;

    >div {
        height: 25px;
        box-sizing: border-box;
        margin: 0 5px;
        cursor: pointer;

        &:hover {
            color: @font-color-hover;
            border-color: @font-color-hover;
        }
    }

    .active {
        border-bottom: 2px solid @font-color;
    }
}

//开始过度
.switch-enter-from {
    opacity: 0;
}

//开始过度了
.switch-enter-active {
    transition: all .2s linear;
}

//过度完成
.switch-enter-to {
    opacity: 1;
}

.title {
    font-size: 20px;
    color: @font-color;
    margin-top: 10px;
    margin-left: 10px;
    user-select: none;
}


.list {
    width: 100%;
    min-height: 300px;
    height: auto;
    margin-top: 10px;

    li {
        width: 100%;
        user-select: none;
        // background-color: red;
        height: 40px;
        line-height: 40px;

        >span {
            cursor: pointer;
            color: @font-color;
            padding-left: 20px;

            &:hover {
                color: @font-color-hover;
            }
        }

    }
}
</style>