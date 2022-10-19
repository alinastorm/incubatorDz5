import { AuthViewModel } from '../types/types';
import authRepository from './auth-repository';
import Repository from './repository';
import { Filter } from 'mongodb';



class UserRepository extends Repository {
    constructor() { super('users') }

    async deleteOne(id: string) {
        // Удаляем users        
        const isDeleted = await super.deleteOne(id)
        if (!isDeleted) return false
        // Удаляем auth
        const filter: Filter<AuthViewModel> = { userId: id }
        const auths = await authRepository.readAll(filter)
        auths.forEach((auth) => {
            authRepository.deleteOne(auth.id)
        })
        return true

    }
}


export default new UserRepository()







