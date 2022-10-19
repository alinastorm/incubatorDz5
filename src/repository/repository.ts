import { IObject, Paginator, SearchPaginationModel } from '../types/types';
import DataService from '../services/data-service';
import mongoDbAdapter from '../adapters/mongoDb-adapter';
import bcrypt from "bcrypt"
import { Filter } from 'mongodb';

const dataService = new DataService(mongoDbAdapter)


class Repository {

    constructor(private collectionName: string) { }

    async readAll<T = IObject>(filter?: Filter<IObject>) {
        const result: T[] = await dataService.readAll(this.collectionName, filter)
        return result
    }
    async readAllOrByPropPaginationSort<T>(data: SearchPaginationModel) {
        const { pageNumber, pageSize, sortBy, sortDirection, filter } = data
        const result: Paginator<T[]> = await dataService.readAllOrByPropPaginationSort(this.collectionName, pageNumber, pageSize, sortBy, sortDirection, filter)
        return result
    }
    async readOne<T>(id: string) {
        const result: T = await dataService.readOne(this.collectionName, id)
        return result
    }
    async createOne<T extends IObject>(element: Omit<T, "id">): Promise<string> {
        return await dataService.createOne(this.collectionName, element)
    }
    async updateOne<T>(id: string, data: Partial<T>) {
        const result: boolean = await dataService.updateOne(this.collectionName, id, data)
        return result
    }
    async replaceOne<T extends IObject>(id: string, data: T) {
        const result = await dataService.replaceOne(this.collectionName, id, data)
        return result
    }
    async deleteOne(id: string): Promise<boolean> {
        return await dataService.deleteOne(this.collectionName, id)
    }
    async deleteAll(): Promise<boolean> {
        const result = await dataService.deleteAll(this.collectionName)
        return result
    }
}

export default Repository