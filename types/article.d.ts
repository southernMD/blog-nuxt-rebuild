import { ResOptions } from "../composables/types";
interface getArticleListRes extends ResOptions<Article[]> {
    totalPages:number
}

interface Article{
    id:number
    title: string ;
    title2:string;
    time: string;
    text: string;
    gather: any;
    tags: string;
    state:string;
    imgUrl: string;
    ifpublic: string;
    delTime?:string
    restOfTime?:15
    comments:number
    click:number
}

interface Comment{
    id: number,
    master: 0 | 1,
    time: string,
    timestamp: number,
    nickname: string,
    email: string,
    _host: string,
    _text: string,
    article_id:number,
    parent_id: null | number,
    location: string,
    browser: string,
    OS:string
}
interface ArticleListHttp<T> extends ResOptions<T>{
    totalPages:number
}
