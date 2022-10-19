import authRepository from '../repository/auth-repository';
import usersRepository from '../repository/users-repository';
import { checkHash } from '../services/crypto-service';
import { HTTP_STATUSES, RequestWithBody, LoginInputModel, ResponseWithCode, AuthViewModel, UserViewModel } from '../types/types';


class Controller {

    async readAll(
        req: RequestWithBody<LoginInputModel>,
        res: ResponseWithCode<204 | 401>
    ) {
        const { login, password } = req.body
        // user
        const users = await usersRepository.readAll<UserViewModel>({ login })
        if (!users.length) return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
        // auth
        const userId = users[0].id
        const auths = await authRepository.readAll<AuthViewModel>({  userId })
        if (!auths.length) return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
        // hash
        const hash = auths[0].passwordHash
        const isEqual = await checkHash(hash, password)
        if (!isEqual) return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)

        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }

}
export default new Controller()