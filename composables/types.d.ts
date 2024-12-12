export interface ResOptions<T> {
    status?: number
    message?: string
    result?:T
}

export interface BaseReqParams{
    restart?:boolean
    lazy?:boolean
}

export interface GetImageParams extends Omit<BaseReqParams, 'lazy'> {}