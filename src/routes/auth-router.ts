import express from 'express';
import authController from "../controllers/auth-controller";
import { nameBodyValidationMiddleware } from '../middlewares/name-validation-middleware';
import { youtubeUrlBodyValidationMiddleware } from '../middlewares/youtubeUrl-validation-middleware';
import { authorizationBasicMiddleware } from '../middlewares/authorization-validation-middleware';

import { checkValidationMiddleware } from '../middlewares/checkValidation-middleware';
import { searchNameTermQueryValidationMiddleware } from '../middlewares/searchNameTerm-validation-middleware';
import { pageNumberQueryValidationMiddleware } from '../middlewares/pageNumber-validation-middleware';
import { sortByBlogsQueryValidationMiddleware } from '../middlewares/sortByBlogs-validation-middleware';
import { pageSizeQueryValidationMiddleware } from '../middlewares/pageSize-validation-middleware';
import { sortDirectionQueryValidationMiddleware } from '../middlewares/sortDirection-validation-middleware';
import { blogIdParamUriValidationMiddleware } from '../middlewares/blogId-param-validation-middleware';
import { titleBodyValidationMiddleware } from '../middlewares/title-validation-middleware';
import { shortdescriptionBodyValidationMiddleware } from '../middlewares/shortdescription-validation-middleware';
import { contentBodyValidationMiddleware } from '../middlewares/content-validation-middleware';
import { bloggerParamIdInBDValidationMiddleware } from '../middlewares/bloggerIdInBDParam-validation-middleware';
import { sortByPostsQueryValidationMiddleware } from '../middlewares/sortByPosts-validation-middleware';

export const authRoutes = express.Router()


authRoutes.post(`/login`,
    authorizationBasicMiddleware,
    nameBodyValidationMiddleware,
    youtubeUrlBodyValidationMiddleware,
    checkValidationMiddleware,
    authController.readOne)

