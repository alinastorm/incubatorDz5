import authReducer from '../reducers/auth-reducer';
import { HTTP_STATUSES, RequestWithBody, LoginInputModel, searchNameTerm, AuthViewModel, ResponseWithCode } from '../types/types';


class Controller {


    async login(
        req: RequestWithBody<LoginInputModel>,
        res: ResponseWithCode<204 | 401>
    ) {
        const { login, password } = req.body
        const query: LoginInputModel = { login, password }
        const result =  await authReducer.login(query)
        

        if (!result) return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }


}
export default new Controller()