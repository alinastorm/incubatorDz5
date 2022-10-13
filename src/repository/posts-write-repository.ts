import { PostInputModel, PostViewModel } from '../types/types';
import DataService from '../services/data-service';
import dbMongoService from '../adapters/mongoDb-adapter';
import blogsWriteRepository from './blogs-write-repository';
import blogsReadRepository from './blogs-read-repository';


const dataService = new DataService(dbMongoService)


class Service {

    constructor(private collection: string) { }


    async createOne(data: PostInputModel & { blogName: string }) {

        // const { name } = await blogsReadRepository.readOne(data.blogId)
        const element: PostViewModel = {
            ...data,
            createdAt: new Date().toISOString()
        }
        const id: string = await dataService.createOne(this.collection, element)
        const result: PostViewModel = await dataService.readOne(this.collection, id)
        return result
    }
    async updateOne(id: string, data: Partial<PostViewModel>) {
        const result = await dataService.updateOne(this.collection, id, data)
        return result
    }
    async replaceOne(id: string, data: PostViewModel) {
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
export default new Service('posts')

