<template>
    <div class="home">
        <el-scrollbar>
            <div class="top">
                <div class="left rush">
                    <el-carousel trigger="click" height="300px" arrow="never" :interval="5000">
                        <el-carousel-item v-for="item in bannerList">
                            <NuxtImg :src="item.imgUrl" format="webp"></NuxtImg>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="right">
                    <div class="to-top" v-for="(i,index) in topList" @click="goArticles(i.id)">
                        <div class="ding">顶置</div>
                        <div class="card-face front" :style="{backgroundImage:`url(${i.imgUrl})`}">{{ i.title }}</div>
                        <div class="card-face back">{{ i.title2 }}</div>
                    </div>
                </div>
            </div>
            <div class="bottom" v-dompurify-html="defaultMsg">
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
let topList = await useTopArticle()
const goArticles = (id:number)=>{
    navigateTo({
        path:`/articles/${id}`
    })
}
const bannerList = ref()
const defaultMsg = ref(``)
try{
    bannerList.value = (await useGetBanner()).result
    defaultMsg.value = (await useGetIndexMsg()).result
}catch(e){
    bannerList.value = []

}




</script>

<style scoped lang="less">
.home {
    width: 100%;
    height: 570px;
    background-color: @background-color-op;
    border-radius: @border-ra;
    display: flex;
    flex-direction: column;
    .top{
        display: flex;
        flex-direction: row;
        .rush {
            width: 50%;
            margin-left: 20px;
            margin-top: 20px;

            img {
                height: 100%;
                width: 100%;
                border-radius: @border-ra;
                object-fit: cover;
            }
        }
        .right{
            width: calc(50% - 10px);
            margin-left: 20px;
            margin-top: 20px;
            color: @font-color;
            line-height: 20px;
            letter-spacing:5px;
            .to-top{
                width: calc(100% - 20px);
                height: calc(50% - 10px);
                border-radius: .2em;
                transition: transform 0.6s;
                transform-style: preserve-3d;
                user-select: none;
                position: relative;
                cursor: pointer;
                .ding{
                    position: absolute;
                    z-index: 2;
                    right: 0;
                    top: 0;
                    backface-visibility: hidden;
                    transform: rotate(40deg) translateX(10px);
                    font-weight: bold;
                    color: black;
                }
                .card-face {
                    width: 100%;
                    height: 100%;
                    border-radius: .2em;
                    position: absolute;
                    backface-visibility: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 24px;
                    font-weight: bold;
                }
                .front {
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                    background-color: rgba(255, 255, 255, 0.5);
                    background-blend-mode: screen; 
                    color: black;
                }
                .back {
                    color: @font-color;
                    transform: rotateY(180deg);
                    background-color:@background-color;
                }
            }
            .to-top:hover{
                transform: rotateY(180deg);
            }
            :first-child{
                margin-bottom: 20px;
            }
        }
    }
    .bottom{
        margin-left: 20px;
        margin-top: 20px;
        color: @font-color;
        font-size: 18px;
        line-height: 20px;
    }
}
@media (max-width:750px){
    .top{
        flex-direction: column !important;
    }
    .rush{
        width: calc(100% - 40px) !important;
    }
    .right{
        height: 200px !important;
        width: calc(100% - 20px) !important;
        margin-top: 20px;
    }
    .bottom{
        width: 90%;
    }
}
</style>