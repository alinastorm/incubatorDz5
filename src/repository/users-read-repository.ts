import { BlogViewModel, LoginInputModel, Paginator, searchNameTerm, UserInputModel, UsersSearchPaginationModel, UserViewModel, } from '../types/types';
import DataService from '../services/data-service';
import mongoDbAdapter from '../adapters/mongoDb-adapter';
import authReadRepository from '../repository/auth-read-repository';

const dataService = new DataService(mongoDbAdapter)


class Service {

    constructor(private collection: string) { }

    async readAll(data: UsersSearchPaginationModel) {
        const { pageNumber, pageSize, searchEmailTerm, searchLoginTerm, sortBy, sortDirection } = data

        const search: any = {}
        searchEmailTerm ? search['searchEmailTerm'] = searchEmailTerm : 0
        searchLoginTerm ? search['searchLoginTerm'] = searchEmailTerm : 0
        const searchNameTerm: searchNameTerm = { search, strict: true }

        const result: Paginator<UserViewModel> = await dataService.readAllOrByPropPaginationSort(this.collection, pageNumber, pageSize, sortBy, sortDirection, searchNameTerm)
        return result
    }
    async readOne(id: string) {     
        const result: UserViewModel = await dataService.readOne(this.collection, id)
        return result
    }
    async createOne(data: UserInputModel) {
        const { login, password, email } = data
        const createdAt = Date.now().toString()
        const elementUser: Omit<UserViewModel & UserInputModel, "id"> = { login, password, email, createdAt }
        const id: string = await dataService.createOne(this.collection, elementUser)
        const user: UserViewModel = await dataService.readOne(this.collection, id)
        if (user) throw new Error("createOne User Error")
        const elementAuth = { login, password, userId: id }
        const auth = await authReadRepository.createOne(elementAuth)
        if (auth) throw new Error("createOne auth Error")
        // const result: UserInputModel = await dataService.readAll(this.collection, searchTerm)
        return user
    }
    async deleteOne(id: string) {
        const user: UserViewModel = await dataService.readOne(this.collection, id)
        if (!user) return false

        const result = await dataService.deleteOne(this.collection, id)
        if (!result) return false

        return true
    }
}
export default new Service('users')