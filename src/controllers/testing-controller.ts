import { Request } from 'express';
import authRepository from '../repository/auth-repository';
import blogsRepository from '../repository/blogs-repository';
import postsRepository from '../repository/posts-repository';
import usersRepository from '../repository/users-repository';


import { HTTP_STATUSES, ResponseWithCode } from '../types/types';


class Controller {

    async deleteAll(req: Request, res: ResponseWithCode<204>) {
        await postsRepository.deleteAll()
        await blogsRepository.deleteAll()
        await usersRepository.deleteAll()
        await authRepository.deleteAll()
        res.status(HTTP_STATUSES.NO_CONTENT_204).send('All data is deleted')
    }


}
export default new Controller()