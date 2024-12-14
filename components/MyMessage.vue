<template>
    <div class="MyMessage">
        <NuxtImg v-if="imageSrc" format="webp" :src="imageSrc" height="200" width="300"></NuxtImg>
        <img class="header" draggable="false"
            src="https://gravatar.loli.net/avatar/e6b6cb8333565fd6cff15e3c8ba8ade1?s=80" alt="">
        <h1 class="name">南山有壶酒</h1>
        <div class="yiyan">
            <span>{{ AppPinia.yiyan }}</span>
        </div>
        <div class="nav-list">
            <div class="nav" v-for="(val, index) in AppPinia.navMessage" :key="val">
                <div class="nav-item">
                    <div class="title">{{ navTitle[index] }}</div>
                    <div class="number">{{ val }}</div>
                </div>
            </div>
        </div>
        <div class="link">
            <NuxtLink to="https://github.com/southernMD" target="_blank">
                <div class="github">
                    <i class="iconfont icon-github"></i>
                    <span>gihub</span>
                </div>
            </NuxtLink>
            <NuxtLink to="https://gitee.com/southernMD" target="_blank">
                <div class="gitee">
                    <i class="iconfont icon-gitee"></i>
                    <span>gitee</span>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useApp } from '~~/stores';
const navTitle = ['文章', '分类', '标签']
const AppPinia = useApp()
const imageSrc = ref<string | null>(null);
AppPinia.imgObj = await useGetImage({ restart: false });
imageSrc.value = AppPinia.imgObj?.result?.[0];
const AppResult = (await useGetBaseMessage())!.result!;
AppPinia.yiyan = await useGetYiYan() as string;
let { base_message, tags_list, tags_list_years } = AppResult as { base_message: { tags_number: number, gather_number: number, article_number: number }, tags_list: string[], tags_list_years: string[] };
AppPinia.navMessage = [base_message.article_number, base_message.gather_number, base_message.tags_number];
AppPinia.tags_list = tags_list as any
AppPinia.tags_list_years = tags_list_years as any
// if(!flag.value){
//     AppPinia.imgObj = await useGetImage()
//     AppPinia.result = (await useGetBaseMessage())!.result!
//     AppPinia.yiyan =  await useGetYiYan() as string
//     // AppPinia.MessageFlag = false
//     let {base_message,tags_list,tags_list_years} = AppPinia.result as {base_message:{tags_number:number,gather_number:number,article_number:number},tags_list:string[],tags_list_years:string[]}
//     const { public: { VITE_PACK_ENV } } = useRuntimeConfig() // 3.0正式版环境变量要从useRuntimeConfig里的public拿
//     const OneArticle = useOneArticle()
//     OneArticle.tags_list = tags_list as any
//     OneArticle.tags_list_years = tags_list_years as any
//     navMessage.value = [base_message.article_number,base_message.gather_number,base_message.tags_number]
//     flag.value = true
// }

</script>

<style scoped lang="less">
.MyMessage {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 461px;
    order: 2;

    >*:not(:first-child) {
        position: relative;
        z-index: 0;
        margin-top: 20px;
    }
    >img:first-child{
        border-radius: .5em;
        object-fit:cover;
    }
}

.el-image {
    border-radius: @border-ra;
    user-select: none;
    margin-top: 0px;

    img {
        user-select: none;
    }
}

.header {
    margin-top: -50px !important;
    user-select: none;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    box-shadow: @box-sh;
}

.name {
    width: 125px;
    color: @font-color;
    font-weight: bolder;
    font-size: 25px;
    user-select: none;
}

.yiyan {
    width: 100%;

    >span {
        display: inline-block;
        width: 100%;
        text-align: center;
        color: @font-color;
    }
}

.nav-list {
    height: 40px;
    width: 125px;
    display: flex;

    .nav {
        display: flex;

        &:not(:last-child)::after {
            content: '';
            margin: 0 6px;
            height: 80%;
            width: 0px;
            border-right: 1px solid @split-color;
        }
    }

    .nav-item {
        display: flex;
        flex-direction: column;
        width: 32px;
        justify-content: center;
        align-items: center;
        color: @font-color;
        position: relative;
        z-index: 0;

        .title {
            width: 100%;
            user-select: none;
        }

        .number {
            user-select: none;
            height: 20px;
            margin-top: 5px;
        }
    }
}

.link {
    display: flex;
    position: relative;
    z-index: 0;

    a {
        margin: 0 5px;

        div {
            display: flex;

            i,
            span {
                color: @font-color;
                display: inline-flex;
                user-select: none;
            }

            i {
                margin-right: 5px;
            }
        }

    }

}
</style>