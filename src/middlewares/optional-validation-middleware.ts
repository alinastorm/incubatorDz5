import { body } from 'express-validator';
import blogsRepository from '../repository/blogs-repository';
import { BlogViewModel } from '../types/types';


export const blogidParamValidationMiddleware = body('blogId')
    .custom(async (val, { req }) => {
        const blog = await blogsRepository.readOne<BlogViewModel>(val)
        if (!blog) throw Error('bloger not finded')
        req.body.blogName = blog.name
    })
    .exists()
    .notEmpty({ ignore_whitespace: true })
    .isString()
    .isLength({ max: 1000 })
    .optional()
    // .withMessage({ message: 'wrong content', field: "content", code: 400 })
