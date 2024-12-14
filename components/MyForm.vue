<template>
    <div class="comment" id="callComment">
        <div class="title">评论</div>
        <el-divider></el-divider>
        <div class="callback-bk" v-show="repalyFlag">
            <div class="callback">
                <div>回复 {{ repaly.user }}：</div>
                <div>{{ repaly.text }}</div>
            </div>
            <i class="iconfont icon-cha" @click="closeRepaly"></i>
        </div>
        <el-form ref="ruleFormRef" :model="inpts" :rules="rules" class="form">
            <el-form-item :label="inptsDetail[index]" v-for="(val, index) in 3" :prop="inptsDetailen[index]">
                <div class="line">
                    <el-input v-model="(inpts[inptsDetailen[index]])" :placeholder="placeholder[index]"></el-input>
                </div>
            </el-form-item>
            <el-form-item prop="txt" label="评论">
                <div class="txt">
                    <el-input v-model="inpts['txt']" :rows="4" type="textarea" placeholder="说点什么" resize="none"
                        maxlength="125" show-word-limit />
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="submitForm(ruleFormRef)">提交评论</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { useApp } from '~~/stores';
import { ElForm, ElFormItem, ElButton, ElInput, ElMessage,ElDivider, type FormInstance, type FormRules } from 'element-plus';
const AppPinia = useApp()
const inptsDetail = ref(['昵称', '邮箱', '网站'])
const inptsDetailen = ref(['nickname', 'email', 'host']) as Ref<['nickname', 'email', 'host']>
const placeholder = ref(['输入你的昵称', '不填写将收不到回复', '可选'])
const ruleFormRef = ref<FormInstance>()
const inpts = reactive({
    nickname: '',
    email: '',
    host: '',
    txt: ''
})

const props = defineProps<{
    article_id: number
}>()

const rules = reactive<FormRules>({
    nickname: [
        { required: true, message: '请填写昵称', trigger: 'blur' },
        { max: 8, message: '昵称长度不超过8位', trigger: 'blur' }
    ],
    email: [
        {
            validator: (rule: any, value: any, callback: any) => {
                if (/^[0-9A-Za-z]+@[a-z0-9]+.[a-z]+$/.test(value) || value.length == 0) {
                    callback()
                } else {
                    callback(new Error('请输入正确格式的邮箱'))
                }
            }
        }],
    host: [],
    txt: [
        { required: true, message: '请输入文本', trigger: 'blur' }
    ]
})
const repalyFlag = ref(false)
const repaly = toRef(AppPinia, 'repaly')

// const list = toRef(OneArticle.ss,'list')
const $emit = defineEmits(['insert'])
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const obj = {
                time: new Date().toLocaleString(),
                timestamp:new Date().getTime(),
                nickname: inpts.nickname,
                email: inpts.email,
                _host: inpts.host,
                _text: inpts.txt,
                article_id: props.article_id,
                parent_id: null as any
            }
            if (repalyFlag.value) {
                obj.parent_id = repaly.value.id
            }
            try {
               const result = await usePostComment(obj)
                ElMessage({
                    message: '发布成功',
                    type: 'success',
                    duration: 1000,
                    onClose() {
                        repalyFlag.value = false
                        $emit('insert',result.result)
                        initinpts()
                        // OneArticle.ss.msg.comments++
                    }
                })
            } catch (error) {
                ElMessage({
                    message: `发生错误${error}`,
                    type: 'error',
                })
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}

watch(repaly, () => {
    if (repaly.value.id != 0) {
        repalyFlag.value = true
    }
}, { deep: true })

const closeRepaly = () => {
    repaly.value.id = 0
    repaly.value.text = ''
    repaly.value.user = ''
    repalyFlag.value = false
}

const initinpts = ()=>{
    inpts.nickname = ''
    inpts.email = ''
    inpts.host = ''
    inpts.txt = ''
}
</script>

<style scoped lang="less">
.comment {
    width: 100%;
    min-height: 400px;
    background-color: @background-color-op;
    border-radius: @border-ra;
    margin-top: 10px;
    color: @font-color;
    .title {
        font-size: 18px;
        display: flex;
        height: 40px;
        line-height: 40px;
        margin-left: 20px;
    }

    .el-divider {
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
        width: 99%;
    }

    .form {
        margin-left: 20px;
    }

    :deep(label) {
        color: @font-color;
        user-select: none;
        padding-left: 15px;
        position: relative;

        &::before {
            position: absolute;
            left: 5px;
        }
    }

    .line {
        display: flex;
        height: 30px;
        line-height: 30px;

        :deep(.el-input) {
            height: 30px;
            background: none;
            margin-bottom: 20px;
            width: 280px;
            border-radius: @border-ra;

            .el-input__wrapper {
                height: 30px;
                background-color: @background-color-op;
            }

            input {
                color: @font-color;
            }
        }
    }

    // .line-none {
    //   :deep(.el-input__wrapper) {
    //     box-shadow: 0 0 0 1px red;
    //   }
    // }

    .txt {
        width: 80%;
        display: flex;

        .detail {
            width: 40px;
            user-select: none;
        }

        // .detail::before {
        //   content: '*';
        //   color: red;
        //   margin-right: 5px;
        // }

        :deep(.el-textarea) {
            background-color: @background-color-op;

            textarea {
                box-sizing: border-box;
                background: none !important;
                color: @font-color;
            }

            .el-input__count {
                background: none;
            }
        }
    }

    // .txt-none {
    //   :deep(.el-textarea__inner) {
    //     box-shadow: 0 0 0 1px red;
    //   }
    // }

    .el-button {
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: rgb(102, 204, 255);
        border: none;

        &:hover {
            background-color: rgba(102, 204, 255, .8);
        }
    }

    .callback-bk {
        min-height: 40px;
        margin-left: 20px;
        width: 95%;
        line-height: 20px;
        margin-bottom: 10px;
        letter-spacing: 2px;
        background-color: @background-color-op;
        border-radius: @border-ra;
        position: relative;

        &:first-child {
            margin-bottom: 8px;
        }

        .callback {
            padding: 15px 15px;
            height: 100%;
        }

        i {
            position: absolute;
            right: 20px;
            top: 20px;
            user-select: none;
            cursor: pointer;
        }
    }
}
</style>