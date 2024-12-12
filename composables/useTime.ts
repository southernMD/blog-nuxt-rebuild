import {format} from 'timeago.js'
import dayjs from 'dayjs';
export const useTime = async(time:string)=>{
    const Atime = new Date(time).getTime()
    const now = new Date().getTime()
    if( Math.floor((now - Atime) / 1000 / 60 /60/24) <= 7){
        return format(time,'zh_CN')
    }else{
        return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    }

}
