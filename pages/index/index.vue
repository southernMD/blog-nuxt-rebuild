<template>
    <div class="home">
        <el-scrollbar>
            <div class="top">
                <div class="left rush">
                    <el-carousel trigger="click" height="300px" arrow="never" :interval="5000">
                        <el-carousel-item v-for="i in 5">
                            <NuxtImg :src="`/q${i}.webp`" format="webp"></NuxtImg>
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
            <div class="bottom">
                本站接入gravatar头像系统，只要提前在gravatar上设置头像并回复时填写email就可以显示头像。<br>
                一个可能没法成为程序员的人，个人介绍可以查看顶置文章。<br>
                图一拍自2018年6月初中<br>
                图二拍自2018年12月9日湘湖<br>
                图三拍自2016年12月3日电影院《你的名字》<br>
                图四拍自2023年4月15日第二十届icpc浙江省省赛<br>
                图五拍自2018年6月17日
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