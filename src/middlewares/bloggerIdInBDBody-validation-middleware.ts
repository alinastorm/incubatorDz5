import { NextFunction, Request, Response } from 'express';
import blogsReadRepository from '../repository/blogs-read-repository';
import { HTTP_STATUSES } from '../types/types';




export const bloggerBodyIdInBDValidationMiddleware = async (req: any, res: Response, next: NextFunction) => {
    const val = req.body.blogId
    const blog = await blogsReadRepository.readOne(val)
    if (!blog) {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
    // req.body.blogName = blog.name
    next()
}