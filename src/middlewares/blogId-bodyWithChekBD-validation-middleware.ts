import { body } from 'express-validator';
import blogsRepository from '../repository/blogs-repository';
import { BlogViewModel } from '../types/types';


export const blogIdBodyWithCheckBDValidationMiddleware = body('blogId')
    .exists()
    .notEmpty({ ignore_whitespace: true })
    .isString()
    .isLength({ min: '63415f046cc943bb27921167'.length, max: '63415f046cc943bb27921167'.length })
    .custom(async (val, { req }) => {
        const blog = await blogsRepository.readOne<BlogViewModel>(val)
        if (!blog) throw Error('bloger not found')
        req.body.blogName = blog.name
    })
    // .withMessage({ message: 'wrong content', field: "content", code: 400 })
