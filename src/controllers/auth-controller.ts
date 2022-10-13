import { Response } from 'express';



import { BlogViewModel, HTTP_STATUSES, RequestWithBody, LoginInputModel } from '../types/types';
import authReadRepository from '../repository/auth-read-repository';


class Controller {


    async readOne(
        req: RequestWithBody<LoginInputModel>,
        res: Response<BlogViewModel>
    ) {
        const { password } = req.body
        const element: LoginInputModel = { password }
        const result: boolean = await authReadRepository.readOne(element)
        if (!result) res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }


}
export default new Controller()