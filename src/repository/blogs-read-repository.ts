import { BlogViewModel, Paginator } from '../types/types';
import DataService from '../services/data-service';
import mongoDbAdapter from '../adapters/mongoDb-adapter';

const dataService = new DataService(mongoDbAdapter)


class Service {

    constructor(private collection: string) { }

    async readAll() {
        const result: BlogViewModel[] = await dataService.readAll(this.collection)
        return result
    }
    async readAllByNameWithPaginationAndSort(pageNumber: number, pageSize: number, sortBy: keyof BlogViewModel, sortDirection: 1 | -1, searchNameTerm: string) {

        let blogs: Paginator<BlogViewModel[]>
        let count: number
        if (searchNameTerm) {
            blogs = await dataService.readAllOrByPropPaginationSort(this.collection, pageNumber, pageSize, sortBy, sortDirection, { search: { name: searchNameTerm }, strict: false })
            // count = await dataService.readCount(this.collection, { search: { name: searchNameTerm }, strict: false })
            // const result: Paginator<BlogViewModel> = {
            //     "pagesCount": Math.ceil(count / pageSize),
            //     "page": pageNumber,
            //     "pageSize": pageSize,
            //     "totalCount": count,
            //     "items": blogs
            // }
            return blogs
        }
        blogs = await dataService.readAllOrByPropPaginationSort(this.collection, pageNumber, pageSize, sortBy, sortDirection)
        // count = await dataService.readCount(this.collection)
        // const result: Paginator<BlogViewModel> = {
        //     "pagesCount": Math.ceil(count / pageSize),
        //     "page": pageNumber,
        //     "pageSize": pageSize,
        //     "totalCount": count,
        //     "items": blogs
        // }
        return blogs

    }

    async readOne(id: string) {
        const result: BlogViewModel = await dataService.readOne(this.collection, id)
        return result
    }
}
export default new Service('blogs')