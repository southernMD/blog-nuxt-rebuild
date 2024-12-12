<template>
  <div class="C1" :key="nanoid(5)" v-for="(val,index) in messageLength" :class="{C1ss:message[index].parent_id == null}">
    <div class="main">
      <div class="header">
        <el-avatar :src="(imgUrl.get(message[index].id) as string)"></el-avatar>
        <div class="timeAndNickname">
          <div class="nickname" :id="`id${message[index].id}`">{{ message[index].nickname }} <span class="back"
              v-if="!(message[index].parent_id == null)">回复
              {{ fatherArr[0].nickname }}</span></div>
          <div class="time">{{ showTime.get(message[index].id) }}</div>
        </div>
        <div class="host" v-if="message[index].master == 1">博主</div>
      </div>
      <div class="txt-bk">
        <div class="txt">
          {{ message[index]._text }}
        </div>
        <div class="op">
          <div class="location">
            <i class="iconfont location-icon icon-weibiaoti-3"></i>
            <div class="location-message">{{ message[index].location }}</div>
          </div>
          <div class="browser">
            <i class="iconfont browser-icon" :class="onBrowserIcon(message[index].browser)"></i>
            <div class="browser-message">{{ message[index].browser }}</div>
          </div>
          <div class="OS">
            <i class="iconfont OS-icon" :class="onOSIcon(message[index].OS)"></i>
            <div class="OS-message">{{ message[index].OS }}</div>
          </div>
          <div class="call" @click="onCall(message[index])">
            <div class="huifu">[回复]</div>
          </div>
        </div>
      </div>
    </div>
    <C1 :message="arr[index]" :deep="deep+1" :key="nanoid(5)" :list></C1>
  </div>
  <el-divider v-if="(deep == 1)"></el-divider>
</template>

<script setup lang="ts">
import { ElAvatar, ElDivider } from 'element-plus';
import { useApp,useOneArticle } from '~~/stores';
import {nanoid} from 'nanoid'
import gravatar from 'gravatar'
const AppPinia = useApp()
const props = defineProps<{
  message: any[]
  deep:number
  list:any[]
}>()
const message = toRef(props,'message')
const messageLength = ref(message.value.length)

const emails = ref([]) as Ref<any>
const showTime = ref(new Map<string,string>())
const imgUrl = ref(new Map<string,string>())

watch(message,async()=>{
  messageLength.value = message.value.length
  for(let i = 0 ;i<message.value.length;i++){
    emails.value.push({email:message.value[i].email,id:props.message[i].id})
    emails.value.forEach((emailObj: { id: string; email: string; }) => {
      imgUrl.value.set(emailObj.id,gravatar.url(emailObj.email, { cdn: 'https://gravatar.loli.net', d: 'retro' }))
    });
    const t = await useTime(message.value[i].time)
    showTime.value.set(message.value[i].id,t)
  }
},{immediate:true})

//['404', 'mp', 'identicon', 'monsterid', 'wavatar', 'retro', 'robohash', 'blank']
const arr = ref([]) as Ref<any[][]>
const fatherArr = ref([]) as Ref<any[]>
message.value.forEach((message)=>{
  const t = props.list.filter((element : any) => {
    return element.parent_id == message.id
  })
  arr.value.push(t)
  if (!(message.parent_id == null)) {
    fatherArr.value = props.list.filter((element: any) => {
      return element.id == message.parent_id
    })
  }
})

const onBrowserIcon = (browser:string) => {
  if (browser) {
    if (browser.includes('IE')) {
      return 'icon-IE'
    } else if (browser.includes('Safari') || browser.includes('safari')) {
      return 'icon-safari'
    } else if (browser.includes('Chrome') || browser.includes('chrome')) {
      return 'icon-chrome'
    } else if (browser.includes('opera') || browser.includes('Opera')) {
      return 'icon-opera'
    } else if (browser.includes('firefox') || browser.includes('Firefox')) {
      return 'icon-firefox'
    } else if (browser.includes('edge') || browser.includes('Edge')) {
      return 'icon-edge'
    } else {
      return 'icon-liulanqi'
    }
  } else {
    return 'icon-liulanqi'
  }

}

const onOSIcon = (OS:string) => {
  if (OS) {
    if (OS.includes('Windows') || OS.includes('windows')) {
      return 'icon-windows'
    } else if (OS.includes('Mac OS') || OS.includes('macOS') || OS.includes('IOS') || OS.includes('ios')) {
      return 'icon-ios'
    } else if (OS.includes('Linux') || OS.includes('linux')) {
      return 'icon-linux'
    } else if (OS.includes('Android') || OS.includes('android')) {
      return 'icon-android'
    } else {
      return 'icon-PC'
    }
  } else {
    return 'icon-PC'
  }

}

const onCall = (message:any) => {
  document.querySelector(`#callComment`)!.scrollIntoView()
  AppPinia.repaly.text = message._text
  AppPinia.repaly.user = message.nickname
  AppPinia.repaly.id = message.id
}
</script>

<style scoped lang="less">
.C1 {
  margin-left: 15px;
  padding-left: 5px;
  border-left: 1px var(--el-border-color) var(--el-border-style);
  width: auto;
  box-sizing: border-box;

  .main {
    margin-bottom: 10px;
  }

  .header {
    display: flex;
    align-items: center;

    .timeAndNickname {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      line-height: 18px;

      .time {
        font-size: 13px;
      }
    }
    .host{
      border: 1px solid @font-color;
      padding: 2px 5px 2px 5px;
      margin-left: 10px;
      border-radius: @border-ra;
    }
  }

  .txt-bk {
    min-height: 60px;
    background-color: @background-color-op;
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    flex-direction: column;
    border-radius: @border-ra;

    .txt {
      margin: 5px 5px;
      line-height: 20px;
      min-height: calc(100% - 10px);
      min-width: calc(100% - 10px);
      margin-left: 15px;
    }

    .op {
      min-width: calc(100% - 10px);
      margin-bottom: 5px;
      display: flex;
      margin-left: 10px;
      >div {
        display: flex;
        margin-right: 10px;
        align-items: center;

        i {
          margin-right: 5px;
        }

        div {
          font-size: 12px;
        }
      }

      .huifu {
        user-select: none;
        cursor: pointer;

        &:hover {
          color: @font-color-hover;
        }
      }
    }
  }

}
@media (max-width:600px) {
  .C1{
    margin-left: 0;
  }
  .C1ss{
    margin-left: 20px;
  }
}

.el-divider {
  margin: 15px auto;
  width: 97%;
}
</style>