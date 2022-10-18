import { UserInputModel, UserViewModel, } from '../types/types';
import DataService from '../services/data-service';
import mongoDbAdapter from '../adapters/mongoDb-adapter';



const dataService = new DataService(mongoDbAdapter)


class Service {

    constructor(private collection: string) { }

    async createOne(data: UserInputModel) {
        const { login, email } = data
        const createdAt = Date.now().toString()

        const elementUser: Omit<UserViewModel, "id"> = { login, email, createdAt }
        const id: string = await dataService.createOne(this.collection, elementUser)
        const user: UserViewModel = await dataService.readOne(this.collection, id)
        return user
    }
    async deleteOne(id: string) {
        const result: boolean = await dataService.deleteOne(this.collection, id)
        return result ? true : false
    }
    async deleteAll() {
        const result = await dataService.deleteAll(this.collection)
        return result
    }
}
export default new Service('users')