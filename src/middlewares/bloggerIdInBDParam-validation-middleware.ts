import { NextFunction, Request, Response } from 'express';
import blogsReadRepository from '../repository/blogs-read-repository';
import { HTTP_STATUSES } from '../types/types';




export const bloggerParamIdInBDValidationMiddleware = async (req: any, res: Response, next: NextFunction) => {
    const blogId = req.params.blogId
    const blog = await blogsReadRepository.readOne(blogId)
    if (!blog) {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
    // req.params.blogName = blog.name
    next()
}