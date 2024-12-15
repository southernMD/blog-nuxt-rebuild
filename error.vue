<template>
  <Head>
    <Title>出错了 - {{ error!.statusCode }}</Title>
    <Meta name="author" content="southernMD">
    </Meta>
    <Meta name="keywords" content="南山有壶酒,未定义人生,南山有壶酒的blog">
    </Meta>
    <Meta name="viewport" content="width=device-width,initial-scale=1">
    </Meta>
    <Meta name="description" content="欢迎来到我的世界">
    </Meta>
  </Head>
  <NuxtLayout name="maintemplate">
    <template #default>
      <div class="error">
        <div>你触发了一个{{ error!.statusCode }}错误</div>
        <div style="font-size: 18px;">{{ error!.message }}</div>
        <el-button @click="navigateTo('/')" type="primary">返回首页</el-button>
      </div>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
defineProps({
  error: Object
})
</script>

<style scoped lang="less">
.error{
  width: 80%;
  height: calc(100vh - 55px - 20px - 20px);
  margin:calc(55px + 20px) auto 0 auto ;
  background-color: @background-color-op;
  border-radius: @border-ra;
  color: @font-color;
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  word-break: break-all;
  >*{
    margin-top: 10px;
  }
}
</style>