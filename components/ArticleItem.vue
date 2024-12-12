<template>
    <div class="article-list-item" v-lazy-directive @click="detail">
        <NuxtImg :src="ArticlesList.imgUrl" fit="cover" format="webp"></NuxtImg>
        <div class="txt">
            <div class="title" @click.stop>
                {{ArticlesList.title}}
            </div>
            <div class="title2" v-show="true" @click.stop>
                {{ArticlesList.title2}}
            </div>
            <div class="icons" @click.stop>
                <div class="time">
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>{{ArticlesList.time}}</span>
                    &nbsp;|
                </div>
                <div class="pl">
                    <el-icon>
                        <ChatDotRound />
                    </el-icon>
                    <span>{{ArticlesList.comments}}</span>
                    &nbsp;|
                </div>
                <div class="see">
                    <el-icon>
                        <View />
                    </el-icon>
                    <span>{{ArticlesList.click}}</span>
                </div>
                <div class="tags">
                    <el-tag size="small" v-for="(val,index) in (tags)" :key="index">{{val}}</el-tag>
                </div>
            </div>
            <div class="main-txt" @click.stop>
               {{ArticlesList.text}}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type Directive} from 'vue';
import { Calendar, ChatDotRound, View } from '@element-plus/icons-vue';
import { ElIcon, ElTag } from 'element-plus';
import type { Article } from '~/types/article';
const props = defineProps<{
    ArticlesList:Article
}>()
const tags =(props.ArticlesList as Article).tags.length == 0?[]:(props.ArticlesList as Article).tags.split(',')
const vLazyDirective: Directive = (el: HTMLElement) => {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
            el.classList.add('article-list-item-show')
            const t = setTimeout(() => {
                el.classList.add('article-list-item-limit')
                clearTimeout(t);
            }, 500)
        }
    })
    observer.observe(el)
}

const detail = ()=>{
    navigateTo({
        path:`/articles/${props.ArticlesList.id}`
    })
}

</script>

<style lang="less" scoped>
.article-list-item {
    width: 100%;
    height: 220px;
    background: @background-color-op;
    margin-bottom: 50px;
    transform: rotateX(-180deg);
    border-radius: @border-ra ;
    display: flex;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    >img {
        border-radius: @border-ra;
        width: 35%;
        min-width: 35%;
        height: 100%;
        overflow: hidden;
    }
    :deep(img) {
        transition: transform .2s linear;
    }
    &:hover :deep(img) {
        transform: scale(1.1, 1.1);
    }

    &:hover {
        transform: scale(1.01, 1.01);
        box-shadow: @box-sh-string;
    }

    .txt {
        color: @font-color;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 60%;
        >* {
            margin-top: 10px;
        }

        .el-icon {
            margin-right: 5px;
        }

        .icons {
            display: flex;
            user-select: none;

            >* {
                display: flex;
                align-items: center;
                margin-right: 5px;
            }
            .time{
                >span{
                    line-height: 20px;
                }
            }
            .tags{
                .el-tag{
                    background: none;
                    border-color: @font-color;
                    margin-right: 5px;
                }
            }
        }

        .title {
            font-size: 18px;
            letter-spacing: 2px;
            line-height: 20px;
            max-height: 40px;
            overflow: hidden;
        }

        .title2 {
            height: 20px;
            max-height: 20px;
            overflow: hidden;
            line-height: 20px;
        }

        .main-txt {
            line-height: 21px;
            max-height: 40px;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;
        }
    }
}

@media (max-width:750px) {
    .article-list-item{
        flex-direction: column;
        height: 420px;
    }
    .article-list-item>img{
        width: 75%;
        height: 50%;
        margin-top:5%;
    }
    .article-list-item .txt{
        align-items: center;
        width: 90%;
        margin-left: 0px;
    }
    .article-list-item .txt >*{
        text-align: center;
    }
}

.article-list-item-show {
    transition: transform .5s linear;
    transform: rotateX(0deg);
}

.article-list-item-limit {
    transition: transform .1s linear !important;
}
</style>