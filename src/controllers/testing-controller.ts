import { Request, Response } from 'express';
import authReducer from '../reducers/auth-reducer';
import blogsWriteRepository from '../repository/blogs-write-repository';
import postsWriteRepository from '../repository/posts-write-repository';
import usersWriteRepository from '../repository/users-write-repository';
import { HTTP_STATUSES, ResponseWithCode } from '../types/types';


class Controller {

    async deleteAll(req: Request, res: ResponseWithCode<204>) {
        await postsWriteRepository.deleteAll()
        await blogsWriteRepository.deleteAll()
        await usersWriteRepository.deleteAll()
        await authReducer.deleteAll()
        res.status(HTTP_STATUSES.NO_CONTENT_204).send('All data is deleted')
    }


}
export default new Controller()