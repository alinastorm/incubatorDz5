import { Request, Response } from 'express';
import blogsRepository from '../repository/blogs-write-repository';
import postsRepository from '../repository/posts-write-repository';
import { HTTP_STATUSES } from '../types/types';


class Controller {

    async deleteAll(req: Request, res: Response) {
        await postsRepository.deleteAll()
        await blogsRepository.deleteAll()
        res.status(HTTP_STATUSES.NO_CONTENT_204).send('All data is deleted')
    }
    
    
}
export default new Controller()