import { Request, Response, NextFunction } from 'express';
export interface BlogInputModel {
    name: string//    maxLength: 15
    youtubeUrl: string // maxLength: 100     pattern: ^ https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
}
export interface BlogPostInputModel {
    title: string//    maxLength: 30
    shortDescription: string//    maxLength: 100
    content: string//    maxLength: 1000
}
export interface PostInputModel {
    title: string//    maxLength: 30
    shortDescription: string//    maxLength: 100
    content: string//maxLength: 1000
    blogId: string
}
export interface BlogViewModel {
    id?: string
    name: string// max 15
    youtubeUrl: string
    createdAt: string
}
export interface PostViewModel {
    id?: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}
export interface APIErrorResult {
    errorsMessages: FieldError[]
}
export interface FieldError {
    message?: string | null// nullable: true,    Message with error explanation for certain field
    field?: string | null//    nullable: true,    What field / property of input model has error  
}
export interface Paginator<T> {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: T[]
}


export interface AdapterType {
    connect(): any
    readAll(collectionName: string, searchNameTerm?: searchNameTerm, sortBy?: string, sortDirection?: number): any
    readAllOrByPropPaginationSort(collectionName: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: 1 | -1, searchNameTerm?: IObject): any
    readCount(collectionName: string, searchNameTerm?: searchNameTerm): any
    readOne(collectionName: string, id: string): any
    createOne(collectionName: string, element: IObject): any
    updateOne(collectionName: string, id: string, data: IObject): any
    replaceOne(collectionName: string, id: string, data: IObject): any
    deleteOne(collectionName: string, id: string): any
    deleteAll(collectionName: string): any
}

export interface searchNameTerm {
    search: IObject
    strict: boolean
}
export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,// Если был создан ресурс, то серверу следует вернуть ответ 201 (Created) с указанием URI нового ресурса в заголовке Location.
    NO_CONTENT_204 = 204,
    BAD_REQUEST_400 = 400,
    UNAUTHORIZED_401 = 401,
    NOT_FOUND_404 = 404,
    SERVER_ERROR_500 = 500
}
export type RequestWithParams<P> = Request<P>
export type RequestWithQuery<Q> = Request<{}, {}, {}, Q>
export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestWithQueryBody<Q, B> = Request<{}, {}, B, Q>
export type RequestWithParamsQuery<P, Q> = Request<P, {}, {}, Q>
export type RequestWithParamsBody<P, B> = Request<P, {}, B>
export type RequestWithParamsQueryBody<P, Q, B> = Request<P, {}, B, Q>

export enum SortDirections {
    asc = 1,
    desc = -1,
}
export interface LoginInputModel {
    // login: string
    password: string
}
export interface UsersSearchPaginationModel {
    /**Search term for user Login: Login should contains this term in any position
     * Default value : null
     */
    searchLoginTerm: string
    /**Search term for user Email: Email should contains this term in any position
     * Default value : null
     */
    searchEmailTerm: string
    /**PageNumber is number of portions that should be returned.
     * Default value : 1
     */
    pageNumber: number
    /**PageSize is portions size that should be returned
     * Default value : 10
     */
    pageSize: number
    /** Sorting term
     * Default value : createdAt
     */
    sortBy: string
    /** Sorting direction
     * Default value: desc
     */
    sortDirection: 1 | -1
}
// export interface readAllOrByPropPaginationSortType {
//     collection:string
//     pageNumber:number
//     pageSize:number
//     sortBy:string
//     sortDirection: 1 | -1
//     searchNameTerm:searchNameTerm

// }
export interface AuthInputModel {
    userId:string
    // login: string // maxLength: 10 minLength: 3
    password: string // maxLength: 20 minLength: 6
}
export interface AuthViewModel {
    id: string
    userId:string
    // login: string // maxLength: 10 minLength: 3
    password: string // maxLength: 20 minLength: 6
    createdAt:string
}
export interface UserInputModel {
    login: string // maxLength: 10 minLength: 3
    password: string // maxLength: 20 minLength: 6
    email: string // pattern: ^ [\w -\.] +@([\w -] +\.) +[\w -]{ 2, 4 } $
}
export interface UserViewModel {
    id: string
    login: string
    email: string
    createdAt: string //	string($date-time)
}
export interface IObject { [key: string]: any }

export interface Dictionary {
    [key: string]: string
}