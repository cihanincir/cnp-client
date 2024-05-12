export type IUseFetchProps<T> = string | {
    method?: IFetchMethod,
    endpoint: string,
    body?: any,
    headers?: { [key: string]: string },
    effectsFetch?: boolean,
    loader?: boolean,
    stopLoader?: boolean,
    delay?: number,
    errorAlert?: boolean,
    condition?: boolean,
    onComplete?: (data: T) => void,
    onError?: (error: string) => void
}

export enum IFetchMethod {
    Get = "get",
    Post = "post",
    Put = "put",
    Delete = "delete",
    Patch = "patch"
}