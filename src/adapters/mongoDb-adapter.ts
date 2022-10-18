import { Collection, MongoClient, Document, ObjectId, Filter } from 'mongodb'
import { AdapterType, IObject, Paginator, searchNameTerm } from '../types/types';

//Query Builder
// Connection URL
const url = 'mongodb+srv://AlexGr:mth0F2JOfBhmJlk4@cluster0.ojk6ayv.mongodb.net/?retryWrites=true&w=majority' || process.env.mongoURI || 'mongodb://127.0.0.1:27017' || 'строковое подключение к кластеру в атласе'
const clientMongo = new MongoClient(url)
// Database Name
const dbName = process.env.mongoDbName || 'learning';
const database = clientMongo.db(dbName);
//Connect to Database
// const connect = await new Promise<any>

class DbMongo implements AdapterType {

    async connect() {
        try {
            // connect the client
            await clientMongo.connect();
            console.log('Connected successfully to db-server');

            //connect db and verify connection    
            database.command({ ping: 1 })
            console.log(`Connected successfully to database: ${dbName}`);
        } catch (error) {
            console.log('mongo:', error);
            //close client when error
            await clientMongo.close()
        }
    }
    async disconnect() {
        await clientMongo.close();
    }
    async readAll(collectionName: string, searchNameTerm?: searchNameTerm, sortBy = "_id", sortDirection: 1 | -1 = 1) {

        const collection: Collection<Document> = database.collection(collectionName)
        if (searchNameTerm) {
            let find: Filter<any> = {}
            for (const key in searchNameTerm.search) {

                const element = searchNameTerm.search[key];
                searchNameTerm.strict ?
                    find[key] = element :
                    find[key] = { $regex: element, $options: 'i' }
            }
            return (await collection
                .find(find)
                .sort({ [sortBy]: sortDirection })
                .toArray())
                .map((elem) => {
                    const { _id, ...other } = elem
                    return { id: _id, ...other }
                })
        }
        return (await collection
            .find()
            .sort({ [sortBy]: sortDirection })
            .toArray())
            .map((elem) => {
                const { _id, ...other } = elem
                return { id: _id, ...other }
            })
    }
    // async readAll(collectionName: string, searchNameTerm?: string) {
    //     const collection: Collection<Document> = database.collection(collectionName)
    //     return searchNameTerm ?
    //         (await collection.find({ $regex: searchNameTerm }).toArray()).map((elem) => {
    //             const { _id, ...other } = elem
    //             return { id: _id, ...other }
    //         }) :
    //         (await collection.find().toArray()).map((elem) => {
    //             const { _id, ...other } = elem
    //             return { id: _id, ...other }
    //         })
    // }
    async readCount(collectionName: string, searchNameTerm?: searchNameTerm) {
        const collection: Collection<Document> = database.collection(collectionName)
        let filter: Filter<any> = {}
        // const filter = searchNameTerm ? searchNameTerm : ""
        if (searchNameTerm) {
            for (const key in searchNameTerm.search) {

                const element = searchNameTerm.search[key];
                searchNameTerm.strict ?
                    filter[key] = element :
                    filter[key] = { $regex: element, $options: 'i' }
            }
        }
        return await collection.countDocuments(filter)
    }
    async readAllOrByPropPaginationSort(collectionName: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: 1 | -1, searchNameTerm?: searchNameTerm) {

        const setPaginator = async (items: any) => {
            const count = await this.readCount(collectionName, searchNameTerm)
            const result: Paginator<any> = {
                "pagesCount": Math.ceil(count / pageSize),
                "page": pageNumber,
                "pageSize": pageSize,
                "totalCount": count,
                items
            }
            return result
        }


        const collection: Collection<Document> = database.collection(collectionName)
        if (searchNameTerm) {
            let find: Filter<any> = {}
            for (const key in searchNameTerm.search) {

                const element = searchNameTerm.search[key];
                searchNameTerm.strict ?
                    find[key] = element :
                    find[key] = { $regex: element, $options: 'i' }
            }
            const items = (await collection
                .find(find)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .sort({ [sortBy]: sortDirection })
                .toArray())
                .map((elem) => {
                    const { _id, ...other } = elem
                    return { id: _id, ...other }
                })
            const result = setPaginator(items)

            return result
        }
        const items = (await collection
            .find()
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .sort({ [sortBy]: sortDirection })
            .toArray())
            .map((elem) => {
                const { _id, ...other } = elem
                return { id: _id, ...other }
            })
        const result = setPaginator(items)

        return result
    }
    async readOne(collectionName: string, id: string) {
        const collection: Collection<Document> = database.collection(collectionName)
        const result: any = await collection.findOne({ _id: new ObjectId(id) })
        if (!result) return result
        const { _id, ...other } = result
        return { id: _id, ...other }
    }
    async createOne(collectionName: string, element: Document) {
        const collection: Collection<Document> = database.collection(collectionName)
        // const id = uuidv4()
        // element.id = id
        const result = (await collection.insertOne(element)).insertedId.toString()
        // if (result) return id
        return result
    }
    async updateOne(collectionName: string, id: string, data: any) {
        const collection: Collection<Document> = database.collection(collectionName)
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: data })
        return result.modifiedCount === 1
    }
    async replaceOne(collectionName: string, id: string, element: IObject) {
        const collection: Collection<Document> = database.collection(collectionName)
        const result = collection.replaceOne({ _id: new ObjectId(id) }, element)
        return result
    }
    async deleteOne(collectionName: string, id: string) {
        const collection: Collection<Document> = database.collection(collectionName)
        const result = await collection.deleteOne({ _id: new ObjectId(id) })
        return result.deletedCount === 1
    }
    async deleteAll(collectionName: string) {
        const collection: Collection<Document> = database.collection(collectionName)
        const result = await collection.deleteMany({})
        return result.acknowledged
    }
}

export default new DbMongo()