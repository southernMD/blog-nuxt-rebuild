<template>
    <Head>
        <Title>南山有壶酒-关于</Title>
        <Meta name="keywords" content="南山有壶酒-关于">
        </Meta>
        <Meta name="description" content="南山有壶酒-关于">
        </Meta>
    </Head>
    <div class="about" >
       <div class="title">
        <div class="txt">关于本站</div>
       </div>
       <div class="main" v-html="aboutHtml">
       </div>
    </div>
</template>

<script setup lang="ts">
import type { Article, ArticleListHttp } from '~/types/article';

const aboutHtml = (await useAboutHtml() as ArticleListHttp<Article[]>).result
</script>

<style scoped lang="less">
.about{
    width: 100%;
    min-height: 400px;
    background-color: @background-color-op;
    border-radius: @border-ra;
    .title{
        height: 60px;
        user-select: none;
        font-size: 25px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid @split-color;
        .txt{
            margin-left: 15px;
            color: @font-color;
        }
    }
    .main{
        width: 950;
        margin: 0 auto;
        min-height: 450px;
        margin: 30px;
        color: @font-color;
        line-height: 20px;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
    }
}
</style>