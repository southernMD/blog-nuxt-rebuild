<template>
    <div class="block-gather" :class="{'move':showflag}">
        <div class="message" ref="message" :class="{'message-way':AppPinia.orderChange,'show':showflag,'message-l':optionDirectionFlag}">
            <slot name="message"></slot>
        </div>
        <div class="block" ref="block" @click="handleClick" @mouseover="showMessage" @mouseout="hideMessage" :class="{'bk-color':showflag}">
            <slot name="icon"></slot>
        </div>
    </div>

</template>

<script setup lang="ts">
import {useApp} from '@/stores'
const AppPinia = useApp()
let optionDirectionFlag = toRef(AppPinia,'optionDirectionFlag')
type pps = {
    height?: string
    width?: string
}

const props = withDefaults(defineProps<pps>(), {
    height: '42px',
    width: '42px'
})
const block = ref() as Ref<HTMLElement>
const message = ref() as Ref<HTMLElement>
onMounted(() => {
    // let message = $el?.refs.message as HTMLElement
    block.value!.style.width = props.width as string
    block.value!.style.height = props.height as string
})

let showflag = ref(false)
const showMessage = ()=>{
    showflag.value = true
}
const hideMessage = ()=>{
    showflag.value = false
}

const $emit = defineEmits(['block'])
const handleClick = ()=>{
    $emit('block')
}

</script>

<style scoped lang="less">
.show{
    opacity: 1 !important;
}
.move{
    transform: translateY(-3px);
}
.bk-color{
    background-color: @block-hover-bk !important;
}
.block-gather {
    display: flex;
    width: auto;
    margin-top: 10px;
    align-items: center;
    transition: transform .2s linear;
    .block {
        width: 42px;
        height: 42px;
        background-color: @background-color;
        border-radius: @border-ra;
        transition: all .2s linear;
        display: flex;
        justify-content: center;
        align-items: center;
        color: @font-color;
        cursor: pointer;
    }
    .message {
        box-sizing: border-box;
        width: 80px;
        height: 35px;
        background-color: @background-color;
        border-radius: @border-ra;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: all .2s linear;
        transform: translateX(-10px);
        :slotted(.message) {
            color: @font-color;
            font-weight: bold;
            font-size: 13px;
            user-select: none;
        }

        // top: 0;
        // bottom: 0;
    }
    .message-l{
        transform: translateX(10px);
    }
    .message-way{
        order: 2;
    }
}
</style>