import { AuthViewModel, BlogViewModel, LoginInputModel, Paginator, searchNameTerm, UserInputModel, UsersSearchPaginationModel, UserViewModel, } from '../types/types';
import DataService from '../services/data-service';
import mongoDbAdapter from '../adapters/mongoDb-adapter';


const dataService = new DataService(mongoDbAdapter)


class Service {

    constructor(private collection: string) { }
    
    async readAll(searchNameTerm?: searchNameTerm, sortBy?: string, sortDirection?: number) {
        const result: UserViewModel[] = await dataService.readAll(this.collection,searchNameTerm, sortBy, sortDirection)
        return result
    }
    async readAllPagination(data: UsersSearchPaginationModel) {
        const { pageNumber, pageSize, searchEmailTerm, searchLoginTerm, sortBy, sortDirection } = data

        const search: any = {}
        searchEmailTerm ? search['searchEmailTerm'] = searchEmailTerm : 0
        searchLoginTerm ? search['searchLoginTerm'] = searchEmailTerm : 0
        const searchNameTerm: searchNameTerm = { search, strict: false }

        const result: Paginator<UserViewModel> = await dataService.readAllOrByPropPaginationSort(this.collection, pageNumber, pageSize, sortBy, sortDirection, searchNameTerm)
        return result
    }
    async readOne(id: string) {
        const result: UserViewModel = await dataService.readOne(this.collection, id)
        return result
    }

}
export default new Service('users')