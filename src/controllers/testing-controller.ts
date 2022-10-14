import { Request, Response } from 'express';
import blogsRepository from '../repository/blogs-write-repository';
import postsRepository from '../repository/posts-write-repository';
import usersRepository from '../repository/users-read-repository';
import authRepository from '../repository/auth-read-repository';
import { HTTP_STATUSES } from '../types/types';


class Controller {

    async deleteAll(req: Request, res: Response) {
        await postsRepository.deleteAll()
        await blogsRepository.deleteAll()
        await usersRepository.deleteAll()
        await authRepository.deleteAll()
        res.status(HTTP_STATUSES.NO_CONTENT_204).send('All data is deleted')
    }
    
    
}
export default new Controller()