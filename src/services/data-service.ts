import { AdapterType, IObject, Paginator, searchNameTerm } from "../types/types"


class DataService implements AdapterType {
    constructor(private dbAdapter: AdapterType) { }
    async connect() { return await this.dbAdapter.connect() }
    async readCount(collectionName: string, searchNameTerm?: searchNameTerm) { return await this.dbAdapter.readCount(collectionName, searchNameTerm) }
    async readAll(collectionName: string, searchNameTerm?: searchNameTerm, sortBy?: string, sortDirection?: number): Promise<Array<any>> { return await this.dbAdapter.readAll(collectionName, searchNameTerm, sortBy, sortDirection) }
    async readAllOrByPropPaginationSort(collectionName: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: 1 | -1, searchNameTerm?: searchNameTerm): Promise<Paginator<any>> { return await this.dbAdapter.readAllOrByPropPaginationSort(collectionName, pageNumber, pageSize, sortBy, sortDirection, searchNameTerm) }
    async readOne(collectionName: string, id: string) { return await this.dbAdapter.readOne(collectionName, id) }
    async createOne(collectionName: string, element: IObject) { return await this.dbAdapter.createOne(collectionName, element) }
    async updateOne(collectionName: string, id: string, data: IObject) { return await this.dbAdapter.updateOne(collectionName, id, data) }
    async replaceOne(collectionName: string, id: string, data: IObject) { return await this.dbAdapter.replaceOne(collectionName, id, data) }
    async deleteOne(collectionName: string, id: string) { return await this.dbAdapter.deleteOne(collectionName, id) }
    async deleteAll(collectionName: string) { return await this.dbAdapter.deleteAll(collectionName) }
}


export default DataService