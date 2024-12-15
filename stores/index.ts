import type { ScrollbarInstance } from "element-plus";
import { defineStore, type StoreDefinition } from "pinia";
import type { Song } from "~/types/song";
export const useApp: StoreDefinition<'app', AppState> = defineStore("app", {
  state: (): AppState => {
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
      totalPages: 0,
      nowPage: 1,
      repaly: {
        user: '',
        text: '',
        id: 0
      },
      scrollbarRef: null as ScrollbarInstance | null,
      tags_list: [],
      tags_list_years: []
    };
  },
  actions: {
    changeSearchDrawerState(state: boolean = false) {
      this.SearchDrawerFlag = state
    },
  },
  persist: [{
    pick: ['theme', 'optionDirectionFlag', 'hideFlag', 'orderChange',
      "nowPage"]
  }]
});


interface AppState {
  windowWidth: number;
  theme: string;
  optionDirectionFlag: boolean;
  hideFlag: boolean;
  orderChange: boolean;
  scrollbarVal: number;
  activeBlock: string;
  directory: number;
  SearchDrawerFlag: boolean;
  totalPages: number;
  nowPage: number;
  repaly: {
    user: string;
    text: string;
    id: number;
  };

  scrollbarRef: ScrollbarInstance | null;
  tags_list: any[];
  tags_list_years: any[];
}

export const useMusic = defineStore("music", {
  state: () => ({
    music: false,
    playIndex: 0,
    musicList: <Song[]>[],
    ifOneLine: true,
    lrcArray: <{ time: number; lyric: any }[]>[],
    traArray: <{ time: number; lyric: any }[]>[],
    songTime: 0,
    songDuration: 0,
    next: 0,
    chagnePlay: true,
    lrc_state: 0
  }),
  persist: [{
    pick: ["music", "playIndex", "lrc_state"]
  }]
})