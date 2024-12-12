import { hash } from 'ohash'
import type { ResOptions } from './types'
const fetch = (url: string, options?: any,lazy = false,restart = true): Promise<any> => {
  const { public: { baseUrl } } = useRuntimeConfig()
  const reqUrl = url.includes('http')?url: baseUrl + url
  // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
  const key = hash(JSON.stringify(options) + url)
  console.log(reqUrl);
  return new Promise((resolve, reject) => {
    useFetch(reqUrl, {
        ...options,
        lazy,
        ...(restart ? {} : { key }),
        onRequestError: (err: any) => {
          // console.log('err',err)
          reject(err)
        },
      }).then(({ data, error }) => {
      if (error.value) {
        reject(error.value)
        return
      }
      const value: ResOptions<any> = data.value as  ResOptions<any>
      console.log(value?.status,"api获取value");
      
      if (String(value?.status).startsWith('2') || url.includes('http')) {
        // 这里处理错你自定义的错误，例如code !== 1
        resolve(value)
      } else {
        reject(value)
      }
    }).catch((err: any) => {
      // console.log('err)(*YY(&^&',reqUrl);
      // console.log(err)
      reject(err)
    })
  })
}

export default class Http {

  get(url: string, params?: any,lazy?:boolean,restart?:boolean){
    return fetch(url, { method: 'get', params },lazy,restart)
  }

  post(url: string, body?: any,lazy?:boolean,restart?:boolean){
    return fetch(url, { method: 'post', body },lazy,restart)
  }

  put(url: string, body?: any,lazy?:boolean,restart?:boolean){
    return fetch(url, { method: 'put', body },lazy,restart)
  }

  delete(url: string, body?: any,lazy?:boolean,restart?:boolean){
    return fetch(url, { method: 'delete', body },lazy,restart)
  }
  getHeader(url: string, params?: any,headers?:any){
    return fetch(url, { method: 'get', params,headers })
  }
}

export const createHttp = ()=>{
  return new Http()
}