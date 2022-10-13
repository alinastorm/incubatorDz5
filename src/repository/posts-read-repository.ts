import { IObject, Paginator, PostInputModel, PostViewModel, searchNameTerm } from '../types/types';
import DataService from '../services/data-service';
import dbMongoService from '../adapters/mongoDb-adapter';
import blogsWriteRepository from './blogs-write-repository';
import blogsReadRepository from './blogs-read-repository';

const dataService = new DataService(dbMongoService)


class Service {

    constructor(private collection: string) { }

    async readAll() {
        const result: PostViewModel[] = await dataService.readAll(this.collection)
        return result
    }
    async readAllWithPaginationAndSort(pageNumber: number, pageSize: number, sortBy: keyof PostViewModel, sortDirection: 1 | -1) {
        const posts:  PostViewModel[] = await dataService.readAllOrByPropPaginationSort(
            this.collection,
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        )
        const count = await dataService.readCount(this.collection)

        const result: Paginator<PostViewModel> = {
            "pagesCount": Math.ceil(count / pageSize),
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": count,
            "items": posts
        }
        return result
    }
    async readAllPostsByBlogIdWithPaginationAndSort(pageNumber: number, pageSize: number, sortBy: keyof PostViewModel, sortDirection: 1 | -1, blogId: string) {
        const posts: PostViewModel[] = await dataService.readAllOrByPropPaginationSort(
            this.collection,
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            { search: { blogId }, strict: true }
        )
        const count = await dataService.readCount(this.collection, { search: { blogId }, strict: true })

        const result: Paginator<PostViewModel> = {
            "pagesCount": Math.ceil(count / pageSize),
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": count,
            "items": posts
        }
        return result
    }
    async readOne(id: string) {
        const result: PostViewModel = await dataService.readOne(this.collection, id)
        return result
    }
}
export default new Service('posts')