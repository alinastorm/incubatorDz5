import { NextFunction, Request, Response } from 'express';
import blogsReadRepository from '../repository/blogs-read-repository';
import postsReadRepository from '../repository/posts-read-repository';
import { HTTP_STATUSES } from '../types/types';




export const postParamIdInBDValidationMiddleware = async (req: any, res: Response, next: NextFunction) => {
    const val = req.params.postId
    const post = await postsReadRepository.readOne(val)
    
    if (!post) {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
    next()
}