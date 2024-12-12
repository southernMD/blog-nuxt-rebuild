<template>
<Head>
    <Title>南山有壶酒-留言板-世纪末的一方净土</Title>
    <Meta name="description" content="留言板"></Meta>
    <Meta name="keywords" content="南山有壶酒-世纪末的一方净土">
    </Meta>
  </Head>
  <div class="board">
    <div class="title">
        <h3>留言板</h3>
        <span>世纪末的一方净土</span>
    </div>
    <MyForm :article_id="-1" @insert="insert"></MyForm>
    <CommentList :list="list"></CommentList>
  </div>
</template>

<script setup lang="ts">
const list = ref<any>([])

const { data: boardComment} = useAsyncData('boardComment', async () => {
    const HttpRequestArticlesList = (await useGetArticleComment(-1))
    return HttpRequestArticlesList.result
});

watch(boardComment, (newData) => {
    if (newData) {
        list.value = newData
    }
}, { immediate: true });

onMounted(() => {
    const hash = window.location.hash;
    if(hash){
        const dom = document.querySelector(hash)
        if(dom){
            dom.scrollIntoView()
        }
    }
})

const insert = (obj:any)=>{
    list.value.unshift(obj)
}
</script>

<style scoped lang="less">
.board{
    width: 100%;
    .title{
        background-color: @background-color-op;
        height: 100px;
        border-radius: @border-ra;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: @title-font-color;
        h3{
            font-size: 25px;
            margin-bottom: 10px;
        }
    }
}
</style>