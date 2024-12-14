<template>
  <div class="catalog-1">
    <el-scrollbar>
      <div class="catalog">
        <MdCatalog editorId="MD" 
        :scrollElement="scrollElement"
        :theme="theme"/>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ElScrollbar } from 'element-plus';
import { MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import type { Themes } from 'md-editor-v3';
import { useApp } from '~~/stores';
import 'md-editor-v3/lib/style.css';
const AppPinia = useApp()
const theme = toRef(AppPinia, 'theme') as Ref<Themes>

const scrollElement = ref('.maintemplate .el-scrollbar .el-scrollbar__wrap')

</script>

<style scoped lang="less">
.catalog-1 {
  order: 2;
}

.catalog {
  height: 461px;
  min-height: 461px;
  width: 200px;
  margin: 0 auto;
}
</style>