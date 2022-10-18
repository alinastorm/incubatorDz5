import { AuthInputModel, AuthViewModel, BlogViewModel, IObject, LoginInputModel, searchNameTerm, UserInputModel, UserViewModel, } from '../types/types';
import DataService from '../services/data-service';
import mongoDbAdapter from '../adapters/mongoDb-adapter';
import bcrypt from "bcrypt"

const dataService = new DataService(mongoDbAdapter)


class Repository {

    constructor(private collection: string) { }

    protected async readAll_protected<T = IObject>(searchTerm: searchNameTerm<Partial<T>, true>) {
        const result: T[] = await dataService.readAll(this.collection, searchTerm)
        return result
    }
    protected async readOne_protected<T>(id: string) {
        const result: T[] = await dataService.readOne(this.collection, id)
        return result
    }
    protected async createOne_protected<T extends IObject>(element: T): Promise<string> {
        return await dataService.createOne(this.collection, element)
    }
    protected async deleteOne_protected(id: string): Promise<boolean> {
        return await dataService.deleteOne(this.collection, id)
    }
    protected async deleteAll_protected(): Promise<boolean> {
        const result = await dataService.deleteAll(this.collection)
        return result
    }
}

export default Repository