<template>
    <div style="height:100vh;">
        <NuxtLayout name="container">
            <template #left>
                <div v-show="activeComp">
                    <KeepAlive :include='["MyMessage", "TagList"]'>
                        <Component :is="comps[flag]"></Component>
                    </KeepAlive>
                </div>
                <div v-show="!activeComp">
                    <div class="title">分类</div>
                    <el-scrollbar>
                        <ul class="list">
                            <li v-for="val in AppPinia.tags_list_years" @click="searchByTag(val)">
                                <span>{{ val }} </span>
                            </li>
                            <li v-show="AppPinia.tags_list_years.length == 0">
                                <span style="cursor: default; ">暂无内容</span>
                            </li>
                        </ul>
                    </el-scrollbar>
                </div>
            </template>
            <template #option>
                <div class="option" v-show="activeComp">
                    <div v-for="(val, index) in tagslen" @click=" flag = index" :class="{ active: flag == index }"
                        :key="index">
                        {{ tags[index] }}
                    </div>
                </div>
            </template>
            <template #right>
                <slot name="right"></slot>
            </template>
        </NuxtLayout>
        <el-drawer v-model="AppPinia.SearchDrawerFlag" :append-to-body="true" v-if="activeComp"
            :show-close="false" :with-header="false" direction="ltr" size="70%">
            <el-scrollbar>
                <div id="left-drawer">
                    <my-search-input></my-search-input>
                    <KeepAlive :include='["MyMessage", "TagList"]'>
                        <Component :is="comps[flag]"></Component>
                    </KeepAlive>
                    <div class="option">
                        <div v-for="(val, index) in tagslen" @click="flag = index" :class="{ active: flag == index }"
                            :key="val">{{ tags[index] }}</div>
                    </div>
                </div>
            </el-scrollbar>
        </el-drawer>
        <el-drawer v-if="AppPinia.activeBlock == '十年'" direction="ltr" v-model="AppPinia.SearchDrawerFlag"
            :append-to-body="true" :show-close="false" :with-header="false" size="70%">
            <my-search-input></my-search-input>
            <div class="drawer-ltr-bk">
                <div class="title">分类</div>
                <el-scrollbar>
                    <ul class="list">
                        <li v-for="val in AppPinia.tags_list_years" @click="searchByTag(val)">
                            <span>{{ val }} </span>
                        </li>
                        <li v-show="AppPinia.tags_list_years.length == 0">
                            <span style="cursor: default;">暂无内容</span>
                        </li>
                    </ul>
                </el-scrollbar>
            </div>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { useApp } from '@/stores'

const AppPinia = useApp()

const comps = shallowRef([
    resolveComponent('MyMessage'),
    resolveComponent('TagList'),
    resolveComponent('Directory')
])
const tags = ref(['站点信息', '标签云', '目录'])
const tagslen = ref(2)
let flag = ref(0)

const directory = toRef(AppPinia, 'directory')
watch(directory, () => {
    if (directory.value == -1) {
        flag.value = 0
        tagslen.value = 2
    } else {
        flag.value = 2
        tagslen.value = 3
    }
}, { immediate: true })

const nowPage = toRef(AppPinia, 'nowPage')
const searchByTag = async (key: string) => {
    nowPage.value = 1
    navigateTo({
        path: '/years',
        query: {
            searchType: 'tag',
            searchKey: key
        }
    })
    AppPinia.changeSearchDrawerState(false)
    
}

const activeComp = computed(()=>{
    return AppPinia.activeBlock != '十年' || AppPinia.activeBlock == '十年' && AppPinia.directory != -1
})
</script>

<style scoped lang="less">
.option {
    width: 60%;
    display: flex;
    justify-content: space-between;
    color: @font-color;
    user-select: none;
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

//开始过度
.switch-enter-from {
    opacity: 0;
}

//开始过度了
.switch-enter-active {
    transition: all .2s linear;
}

//过度完成
.switch-enter-to {
    opacity: 1;
}

.title {
    font-size: 20px;
    color: @font-color;
    margin-top: 10px;
    margin-left: 10px;
    user-select: none;
}


.list {
    width: 100%;
    min-height: 300px;
    height: auto;
    margin-top: 10px;

    li {
        width: 100%;
        user-select: none;
        height: 40px;
        line-height: 40px;

        >span {
            cursor: pointer;
            color: @font-color;
            padding-left: 20px;

            &:hover {
                color: @font-color-hover;
            }
        }

    }
}


.drawer-ltr-bk {
    height: 500px;
    position: relative;
    z-index: 3;
}
</style>