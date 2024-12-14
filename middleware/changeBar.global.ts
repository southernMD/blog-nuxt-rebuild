import { useApp } from '@/stores'

export default defineNuxtRouteMiddleware((to, from) => {
    // console.log(to.path,from.path);
    const AppPinia = useApp()
    // const oneArticle = useOneArticle()
    // console.log('我是文章的id',to.params.id);
    // AppPinia.articleId = +to.params.id
    // if(to.path !== from.path){
    //     AppPinia.toTopFlagim = true
    // }
    switch (to.path) {
        case '/':
            AppPinia.activeBlock = '首页'
            break;
        case '/articles':
            AppPinia.activeBlock = '文章'
            break;
        case '/board':
            AppPinia.activeBlock = '留言板'
            break;
        // case '/experiment':
        //     AppPinia.activeBlock = '实验室'
        //     break;
        case '/years':
            AppPinia.activeBlock = '十年'
            break;
        case '/about':
            AppPinia.activeBlock = '关于'
            break;
    }
    AppPinia.nowPage = 1
    if(to.path.includes('articles') && to.params.id == undefined){
        AppPinia.directory = -1
    }else if(to.path.includes('articles')){
        if(from.path.includes('years')){
            AppPinia.activeBlock = '十年'
        }else{
            AppPinia.activeBlock = '文章'
        }
        AppPinia.directory = Number(to.params.id)
    }else if(!to.path.includes('articles')){
        AppPinia.directory = -1
    }
    // AppPinia.SearchDrawerFlag = false
})