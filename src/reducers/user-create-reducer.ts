import usersWriteRepository from '../repository/users-write-repository';
import { AuthInputModel, UserInputModel } from '../types/types';
import { generateHash } from '../services/crypto-service';
import authReducer from './auth-reducer';

// const reducer = {
//     add(a: any, b: any, c: any) { }
// }
// reducer.add("user", usersWriteRepository, authWriteRepository)



export const userCreateReducer = async (data: UserInputModel) => {
    const userQuery: UserInputModel = { ...data }
    const user = await usersWriteRepository.createOne(userQuery)

    const passwordHash = await generateHash(data.password)

    const authQuery: AuthInputModel = { passwordHash, userId: user.id }
    const auth = await authReducer.createOne(authQuery)

    return user
}













