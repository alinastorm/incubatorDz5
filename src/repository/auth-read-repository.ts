import { AuthInputModel, AuthViewModel, BlogViewModel, LoginInputModel, searchNameTerm, UserInputModel, UserViewModel, } from '../types/types';
import DataService from '../services/data-service';
import mongoDbAdapter from '../adapters/mongoDb-adapter';

const dataService = new DataService(mongoDbAdapter)


class Service {

    constructor(private collection: string) { }

    async readOne(data: LoginInputModel) {
        const { password } = data
        const searchTerm: searchNameTerm = { search: { password }, strict: true }
        const element: UserInputModel = await dataService.readAll(this.collection, searchTerm)
        const result = element ? true : false
        return result
    }
    async createOne(data: AuthInputModel) {
        const { userId, password } = data
        const createdAt = Date.now().toString()
        const auth: Omit<AuthViewModel, "id">  = { userId, password, createdAt }
        const id: string = await dataService.createOne(this.collection, auth)
        const result: AuthViewModel = await dataService.readOne(this.collection, id)
        return result ? true : false
    }
    async deleteAll() {
        const result = await dataService.deleteAll(this.collection)
        return result
    }
}
export default new Service('auth')