import { IObject } from "../types/types";


class DbInMemory {
    data: IObject = {}
    readAll(entityName: string) {
        return this.data[entityName]
    }

    readOne(entityName: string, id: number) {
        return this.data[entityName].find((elem: any) => id === elem.id)
    }

    createOne(entityName: string, element: any) {
        return this.data[entityName].push(element)
    }

    updateOne(entityName: string, id: number, item: any) {
        return this.data[entityName].find((elem: any, index: number) => {
            if (id === elem.id) {
                this.data[entityName][index] = item
            }
        })
    }

    deleteOne(entityName: string, id: number) {
        return this.data[entityName].find((elem: any, index: number) => {
            if (id === elem.id) {
                this.data[entityName].splice(index, 1)
                return true
            }
        })
    }

    deleteAll(entityName: string) { return this.data[entityName] = [] }

}

export default new DbInMemory()