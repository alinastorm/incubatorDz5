import { NextFunction, Response } from 'express';
import postsRepository from '../repository/posts-repository';
import { HTTP_STATUSES } from '../types/types';




export const postParamIdInBDValidationMiddleware = async (req: any, res: Response, next: NextFunction) => {
    const val = req.params.postId
    const post = await postsRepository.readOne(val)
    
    if (!post) {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
    next()
}