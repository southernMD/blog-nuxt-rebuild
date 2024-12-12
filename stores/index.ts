import type { ScrollbarInstance } from "element-plus";
import { defineStore } from "pinia";
export const useApp = defineStore("app", {
  state: () => {
    return {
      windowWidth: 1200,
      theme: 'light',
      optionDirectionFlag: false,
      hideFlag: true,
      orderChange: false,
      scrollbarVal: 0,
      activeBlock: '首页',
      directory: -1,
      SearchDrawerFlag: false,
      ArticlesList: null,
      ArticlesListYear: null,
      articleId: -1,
      author: '',
      totalPages: 0,
      nowPage: 1,
      repaly: {
        user: '',
        text: '',
        id: 0
      },
      imgObj: {},
      result: {},
      yiyan: {},
      navMessage: new Array(),
      music: true,
      musicList: <{
        id: number
        name: string
        ar: string
        al: string
        songUrl: string
        coverUrl: string
        ifScroll: boolean
        lrc: string
        ifTranslate: boolean
        translate: string
        order: number
      }[]>[],
      oneLineSongLrc: '',
      twoLineSongLrc: '',
      twoLineSongLrcTra: '',
      ifOneLine: true,
      playIndex: 0,
      lrcArray: <{ time: number; lyric: any }[]>[],
      traArray: <{ time: number; lyric: any }[]>[],
      songTime: 0,
      songDuration: 0,
      next: 0,
      chagnePlay: true,
      scrollbarRef: null as ScrollbarInstance | null
    };
  },
  actions: {
    changeSearchDrawerState(state:boolean = false) {
      this.SearchDrawerFlag = state
    },
  },
  persist: [{
    pick: ['theme', 'optionDirectionFlag', 'hideFlag', 'orderChange',
      'ArticlesList', 'ArticlesListYear', 'imgObj', 'result', 'yiyan', 'navMessage', 'music', 'playIndex',"nowPage"]
  }]
});

export const useOneArticle = defineStore("oneArticle", {
  state: () => {
    return {
      ss: {
        id: 0,
        article: '',
        msg: {},
        Text: '',
        tags: [],
        list: [],
      },
      tags_list: [],
      tags_list_years: []
    }
  },
  actions: {

  },
  persist: [{
    pick: ['ss', 'tags_list', 'tags_list_years'],
  }]
})
