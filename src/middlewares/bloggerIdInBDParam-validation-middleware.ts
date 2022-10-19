import { NextFunction, Response } from 'express';
import blogsRepository from '../repository/blogs-repository';
import { HTTP_STATUSES } from '../types/types';




export const bloggerParamIdInBDValidationMiddleware = async (req: any, res: Response, next: NextFunction) => {
    const blogId = req.params.blogId
    const blog = await blogsRepository.readOne(blogId)
    if (!blog) {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
    // req.params.blogName = blog.name
    next()
}