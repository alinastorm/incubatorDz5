import { BlogInputModel, BlogViewModel } from '../types/types';
import DataService from '../services/data-service';
import mongoDbAdapter from '../adapters/mongoDb-adapter';

const dataService = new DataService(mongoDbAdapter)


class Service {

    constructor(private collection: string) { }


    async createOne(data: BlogInputModel) {
        const element: BlogViewModel = {
            ...data,
            createdAt: new Date().toISOString()
        }
        const id: string = await dataService.createOne(this.collection, element)
        const result: BlogViewModel = await dataService.readOne(this.collection, id)
        return result
    }

    async updateOne(id: string, data: Partial<BlogViewModel>) {
        const result = await dataService.updateOne(this.collection, id, data)
        return result
    }
    async replaceOne(id: string, data: BlogViewModel) {
        const result = await dataService.replaceOne(this.collection, id, data)
        return result
    }
    async deleteOne(id: string) {
        const result = await dataService.deleteOne(this.collection, id)
        return result
    }
    async deleteAll() {
        const result = await dataService.deleteAll(this.collection)
        return result
    }
}
export default new Service('blogs')