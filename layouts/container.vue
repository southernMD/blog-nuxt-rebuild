<template>
    <div class="main" draggable="false">
        <div class="left-bk" :class="{ 'left-f': scrollbarVal > 100 }">
            <my-search-input></my-search-input>
            <div class="left">
                <slot name="left"></slot>
                <slot name="option"></slot>
            </div>
            <!-- <div :class="{'lrc-none':true,'lrc':scrollbarVal > 100}" >
                <div class="two-line" v-show="!ifOneLine">
                    <div class="lrc-one">{{ twoLineSongLrc }}</div>
                    <div class="lrc-translate">{{ twoLineSongLrcTra }}</div>
                </div>
                <div class="one-line" v-show="ifOneLine">
                    <div class="lrc-two">{{oneLineSongLrc}}</div>
                </div>
            </div> -->
        </div>
        <el-drawer v-if="$route.path.includes('years')" direction="ltr" v-model="SearchDrawerFlag" :append-to-body="true"
            :show-close="false" :with-header="false" size="70%">
            <my-search-input></my-search-input>
            <div class="drawer-ltr-bk">
            <div class="title">分类</div>
            <el-scrollbar>
                <ul class="list">
                <li v-for="val in taglist" @click="searchByTag(val)">
                    <span>{{val}} </span>
                </li>
                <li v-show="taglist.length == 0" >
                    <span style="cursor: default;">暂无内容</span>
                </li>
                </ul>
            </el-scrollbar>
            </div>
        </el-drawer>
        <div class="left left-none" :class="{ 'placeholder': scrollbarVal <= 100 }"></div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useApp,useOneArticle } from '@/stores'
import type { Article } from '~/types/article';
const AppPinia = useApp()
const SearchDrawerFlag = toRef(AppPinia, 'SearchDrawerFlag')
let scrollbarVal = toRef(AppPinia, 'scrollbarVal')
let searchVal = ref('')
// const oneLineSongLrc = toRef(AppPinia,'oneLineSongLrc')
// const twoLineSongLrc = toRef(AppPinia,'twoLineSongLrc')
// const twoLineSongLrcTra = toRef(AppPinia,'twoLineSongLrcTra')
// const ifOneLine = toRef(AppPinia,'ifOneLine') //ref(true)

const ArticlesList  = toRef(AppPinia,'ArticlesListYear') as unknown as Ref<Article[]>
const $route = useRoute()
const OneArticle = useOneArticle()
const total = toRef(AppPinia,'totalPages')
const taglist = toRef(OneArticle,'tags_list_years')

// const searchByTag = async(key:string)=>{
//     nowPage.value = 1
//     const HttpRequestArticlesList = await useGetArticlesList(1,5,key,2) as ArticleListHttp<Article[]>
//     ArticlesList.value = HttpRequestArticlesList.result as ArticleObj[]
//     total.value = HttpRequestArticlesList.totalPages
//     $router.push({
//         path:'/years',
//         query:{
//             searchType:'tag',
//             searchKey:key
//         }
//     })
// }
</script>

<style scoped lang="less">
.main {
    width: 95vw;
    height: auto;
    display: flex;
    margin: 0 auto;
    margin-top: 120px;
    max-width: 1400px;
    scroll-behavior: smooth;
    .left-bk{
        display: none;
    }

    .left {
        height: 500px;
        min-width: 300px;
        box-sizing: border-box;
        background: @background-color-op;
        border-radius: @border-ra;
        margin-right: 30px;
        transition: all .2s linear;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .left-none {
        background: none;
        transition: none;
        opacity: 0;
        display: block !important;
    }

    .placeholder {
        display: none !important;
    }

    .left-f {
        position: fixed;
        top: 10px;
        z-index: 5;
    }

    .right {
        height: auto;
        width: 100%;
        box-sizing: border-box;
        // background: @background-color-op;
        // border-radius: @border-ra;
        transition: all .2s linear;
        margin-bottom: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media (min-width: 915px) {
        .left-bk {
            display: block;
        }

        .right {
            width: calc(100% - 300px - 20px);
        }
    }

    @media (max-width:915px) {
        .left-none {
            display: none !important;
        }
    }
    @media (max-width:915px) {
        .lrc {
            display: none !important;
        }
    }
    .lrc-none{
        display: none;
    }
    .lrc{
        display: block;
        width: 300px;
        margin-top: 20px;
        background: @background-color-op;
        border-radius: @border-ra;
        height: 100px;
        color: @font-color;
        display: flex;
        justify-content: center;
        align-items: center;
        .two-line{
            >div{
                margin: 5px;
            }
        }

    }

}

.title {
  font-size: 20px;
  color: @font-color;
  margin-top: 10px;
  margin-left: 10px;
  user-select: none;
}

.drawer-ltr-bk {
  height: 500px;
  position: relative;
  z-index: 3;
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
@media (min-width: 915px) {
    .main {
        width: 90vw;
    }
}
</style>