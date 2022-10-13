import express from 'express';
import postsController from "../controllers/posts-controller"
import { titleBodyValidationMiddleware } from '../middlewares/title-validation-middleware';
import { postIdParamValidationMiddleware } from '../middlewares/postIdParam-validation-middleware';
import { contentBodyValidationMiddleware } from '../middlewares/content-validation-middleware';
import { shortdescriptionBodyValidationMiddleware } from '../middlewares/shortdescription-validation-middleware';
import { authorizationBasicMiddleware } from '../middlewares/authorization-validation-middleware';
import { checkValidationMiddleware } from '../middlewares/checkValidation-middleware';
import { pageNumberQueryValidationMiddleware } from '../middlewares/pageNumber-validation-middleware';
import { pageSizeQueryValidationMiddleware } from '../middlewares/pageSize-validation-middleware';
import { sortByPostsQueryValidationMiddleware } from '../middlewares/sortByPosts-validation-middleware';
import { sortDirectionQueryValidationMiddleware } from '../middlewares/sortDirection-validation-middleware';
import { postParamIdInBDValidationMiddleware } from '../middlewares/PostsIdInBDParam-validation-middleware copy';
import { blogIdBodyWithCheckBDValidationMiddleware } from '../middlewares/blogId-bodyWithChekBD-validation-middleware';

const mainRoute = 'posts'

export const postsRoutes = express.Router()

postsRoutes.get(`/${mainRoute}`,
    pageNumberQueryValidationMiddleware,
    pageSizeQueryValidationMiddleware,
    sortByPostsQueryValidationMiddleware,
    sortDirectionQueryValidationMiddleware,
    checkValidationMiddleware,
    postsController.readAllPaginationSort)

postsRoutes.post(`/${mainRoute}`,
    authorizationBasicMiddleware,
    titleBodyValidationMiddleware,
    shortdescriptionBodyValidationMiddleware,
    contentBodyValidationMiddleware,
    blogIdBodyWithCheckBDValidationMiddleware,
    checkValidationMiddleware,
    // bloggerBodyIdInBDValidationMiddleware,
    postsController.createOne)

postsRoutes.get(`/${mainRoute}/:postId`,
    postIdParamValidationMiddleware,
    checkValidationMiddleware,
    postParamIdInBDValidationMiddleware,
    postsController.readOne)

postsRoutes.put(`/${mainRoute}/:postId`,
    authorizationBasicMiddleware,
    postIdParamValidationMiddleware,
    titleBodyValidationMiddleware,
    shortdescriptionBodyValidationMiddleware,
    contentBodyValidationMiddleware,
    blogIdBodyWithCheckBDValidationMiddleware,
    checkValidationMiddleware,
    postParamIdInBDValidationMiddleware,
    // bloggerBodyIdInBDValidationMiddleware,
    postsController.updateOne)

postsRoutes.delete(`/${mainRoute}/:postId`,
    authorizationBasicMiddleware,
    postIdParamValidationMiddleware,
    checkValidationMiddleware,
    postParamIdInBDValidationMiddleware,
    postsController.deleteOne)



