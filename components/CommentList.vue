<template>
    <div class="list">
        <div class="title">评论列表（{{ (list.length) }}）</div>
        <el-divider></el-divider>
        <C1 :message="showList" :deep="1" :key="nanoid(5)" :list></C1>
    </div>
</template>

<script setup lang="ts">
import { ElDivider } from 'element-plus';
import { nanoid } from 'nanoid';
import type { Comment } from '~/types/article';
const props = defineProps<{
    list: Comment[]
}>()
const showList = ref([]) as Ref<any>
watch(()=>props.list, () => {
    const tList = []
    for (let i = 0; i < props.list.length; i++) {
        if (props.list[i].parent_id == null) {
            tList.push(props.list[i])
        }
    }
    showList.value = tList
}, { immediate: true,deep:true })



</script>

<style scoped lang="less">
.list {
    width: 100%;
    min-height: 400px;
    background-color: @background-color-op;
    border-radius: @border-ra;
    margin-top: 10px;
    color: @font-color;
    padding-bottom: 20px;

    .title {
        font-size: 18px;
        display: flex;
        height: 40px;
        line-height: 40px;
        margin-left: 20px;
        user-select: none;
    }

    .el-divider {
        margin-top: 0;
    }
}
</style>