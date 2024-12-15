import {createHttp} from './api'
import type { GetImageParams, ResOptions } from './types'
import type { Comment } from '~/types/article'
import _ from 'lodash'
import type { Song } from '~/types/song'
const Http = createHttp()
//左侧图片
export const useGetImage = async({restart}:GetImageParams) => {
    try{
        // throw createError('请使用getImage方法');
        return await Http.get('/show/img',undefined,undefined,restart)
    }catch(e){
        throw e;
    }
}

//一言
export const useGetYiYan = async()=>{
    return _.sample((await import('~/assets/yiyan.json')).default)
    // return await Http.get('https://v1.hitokoto.cn/?c=e&c=a&c=c&c=j&encode=text&max_length=15',{lazy:true})
}

//顶置文章
export const useTopArticle = async()=>{
    try {
        const result = await Http.get(`/show/top_article`)
        if(result.status == 200){
            return new Promise<any>((resolve, reject) => {
                resolve(result.result)
            }) 
        }else{
            return new Promise<any>((resolve, reject) => {
                resolve([])
            }) 
        }
    } catch (error) {
        return new Promise<any>((resolve, reject) => {
            resolve([])
        }) 
    }
}

//基本信息
export const useGetBaseMessage = async()=>{
    let result = await Http.get(`/show/base`)
        return new Promise<ResOptions<any>>((resolve, reject) => {
        resolve(result)
    })
}


export const useGetArticlesList = async(nowPage:number,pageSize:number,password:string,flag:number):Promise<ResOptions<any> | undefined>=>{
    let result:Promise<any>
    try {
        const t = new Date().getTime()
        if(import.meta.client){
            result = await Http.getHeader(`/show/article`,{nowPage,pageSize,password,flag,t},{
                'Authorization':'Bearer '+localStorage.getItem('token')
            })
        }else{
            result = await Http.get(`/show/article`,{nowPage,pageSize,password,flag,t})
        }
        // console.log(">>>>>>>>",result);
        return result
    } catch (error:any) {
        return Promise.reject(error)
    }
}

//留言板
export const useGetArticleComment = async(id:number | string):Promise<ResOptions<Comment[]>>=>{
    return await Http.get(`/show/comment/${id}`)
}

//游客jwt
export const useGetToken = async()=>{
    let result = await Http.get(`/show/tourist`)
        return new Promise<{status:number,token:string}>((resolve, reject) => {
        resolve(result)
    })
}

//发布评论
export const usePostComment = async(obj:any):Promise<ResOptions<any>>=>{
    const {ipdata} = await Http.get('https://api.vore.top/api/IPdata')
    let locationStr = `${ipdata.info1} ${ipdata.info2} ${ipdata.info3}`.trim() 
    if(locationStr.length >10){
        locationStr = ipdata.info1
    }
    obj['location'] = locationStr
    return await Http.post(`/show/comment`,obj)
}

//about
export const useAboutHtml = async()=>{
    return await Http.get(`/show/about`)
}

export const useGetArticle = async(id:number | string):Promise<ResOptions<any> | undefined>=>{
    try {
        let result
        if(import.meta.client){
            result = await Http.getHeader(`/show/article/${id}`,{},{
                'Authorization':'Bearer '+localStorage.getItem('token')
            })
        }else{
            result = await Http.get(`/show/article/${id}`,{})
        }
        return result
    } catch (error:any) {
        return Promise.reject(error)
    }
}


export const useSongList = async():Promise< Song[] | []>=>{
    try {
        const result:ResOptions<any> = await Http.get(`/show/music`)
        if(result.status == 200){
            return result.result.sort((a:Song,b:Song)=>{
                return a.order - b.order
            })
        }else{
            return Promise.resolve([])
        }

    } catch (error) {
        return Promise.resolve([])
    }
}

export const usePostAdmit = async(password:string)=>{
    return await Http.post(`/show/admit`,{admit:password})
}