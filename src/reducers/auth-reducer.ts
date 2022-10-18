import Repository from '../repository/repository';
import usersReadRepository from '../repository/users-read-repository';
import { AuthInputModel, AuthViewModel, LoginInputModel, searchNameTerm } from '../types/types';
import { checkHash } from '../services/crypto-service';


class AuthReducer extends Repository {
    constructor() {
        super('auth')
    }
    async login(data: LoginInputModel): Promise<boolean> {
        const { login, password } = data
        //получаем user
        const users = await usersReadRepository.readAll({ search: { login }, strict: true })
        if (!users.length) return false
        //получаем auth
        const userId = users[0].id
        const auths = await super.readAll_protected<AuthViewModel>({ search: { userId }, strict: true })
        if (!auths.length) return false
        //проверяем hash
        const hash = auths[0].passwordHash
        const isEqual = await checkHash(hash, password)
        if (!isEqual) return false

        return true
    }
    //переписать readAll
    async readAll(searchNameTerm: searchNameTerm<Partial<AuthViewModel>, true>) {
        const result: AuthViewModel[] = await super.readAll_protected<AuthViewModel>(searchNameTerm)
        return result
    }
    async createOne(data: AuthInputModel) {

        const { userId, passwordHash } = data
        const createdAt = Date.now().toString()
        const element: Omit<AuthViewModel, "id"> = { createdAt, passwordHash, userId }
        const id: string = await super.createOne_protected(element)
        return id ? true : false

    }
    async readOne(id: string) { return super.readOne_protected(id) }
    async deleteOne(id: string) { return super.deleteOne_protected(id) }
    async deleteAll() { return super.deleteAll_protected() }
}


export default new AuthReducer()
