<template>
  <Head>
    <Title>南山有壶酒</Title>
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
      <el-scrollbar ref="scrollbarRef" @scroll="barScroll" >
        <NuxtLayout name="base-look">
          <template #right>
            <LazyNuxtPage></LazyNuxtPage>
          </template>
        </NuxtLayout>
      </el-scrollbar>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { ScrollbarInstance } from 'element-plus';
const scrollbarRef = ref<ScrollbarInstance | null>(null)
const AppPinia = useApp() 
watch(()=>scrollbarRef,()=>{
  AppPinia.scrollbarRef = unref(scrollbarRef)
},{immediate:true,deep:true})

const barScroll = (scrollObj: any) => {
    AppPinia.scrollbarVal = scrollObj.scrollTop
}
</script>


<style lang="less">
.el-drawer__body {
  padding: 0 !important;
  background-image: url(/tamaonsen.jpeg);
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position-x: -150px;
  min-height: 358px;
  height: 1000px;
  overflow: hidden;

  &::before {
    content: '';
    background: @background-modle;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
}

.ltr {
  .el-image {
    width: 100% !important;
  }

  .el-input {
    width: 100% !important;
  }

  &::before {
    content: '';
    background: @background-color-op;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

}

body {
  width: 100% !important;
  scroll-behavior: smooth;

  &::before {
    content: '';
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -5;
    background: url(/tamaonsen.jpeg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}

.option {
  width: 60%;
  display: flex;
  justify-content: space-between;
  color: @font-color;
  user-select: none;
  position: relative;
  z-index: 0;
  margin: 0 auto;
  margin-top: 5px;
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
</style>