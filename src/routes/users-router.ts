import express from 'express';
import usersController from "../controllers/users-controller";
import { nameBodyValidationMiddleware } from '../middlewares/name-validation-middleware';
import { youtubeUrlBodyValidationMiddleware } from '../middlewares/youtubeUrl-validation-middleware';
import { authorizationBasicMiddleware } from '../middlewares/authorization-validation-middleware';

import { mainValidator } from '../middlewares/mainValidator-middleware';
import { searchLoginTermQueryValidationMiddleware } from '../middlewares/searchLoginTerm-query-validation-middleware';
import { searchEmailTermQueryValidationMiddleware } from '../middlewares/searchEmailTerm-query-validation-middleware';
import { sortDirectionQueryValidationMiddleware } from '../middlewares/sortDirection-validation-middleware';
import { pageSizeQueryValidationMiddleware } from '../middlewares/pageSize-validation-middleware';
import { pageNumberQueryValidationMiddleware } from '../middlewares/pageNumber-validation-middleware';
import { sortByUsersQueryValidationMiddleware } from '../middlewares/sortByUsers-validation-middleware';
import { loginBodyValidationMiddleware } from '../middlewares/login-body-validation-middleware';
import { passwordBodyValidationMiddleware } from '../middlewares/password-body-validation-middleware';
import { emailBodyValidationMiddleware } from '../middlewares/email-validation-middleware';
import { userIdParamUriValidationMiddleware } from '../middlewares/userId-param-validation-middleware';


export const usersRoutes = express.Router()


usersRoutes.get(`/users`,
    searchLoginTermQueryValidationMiddleware,
    searchEmailTermQueryValidationMiddleware,
    pageNumberQueryValidationMiddleware,
    pageSizeQueryValidationMiddleware,
    sortByUsersQueryValidationMiddleware,
    sortDirectionQueryValidationMiddleware,
    mainValidator,
    usersController.readAll)

usersRoutes.post(`/users`,
    authorizationBasicMiddleware,
    loginBodyValidationMiddleware,
    passwordBodyValidationMiddleware,
    emailBodyValidationMiddleware,
    mainValidator,
    usersController.createOne)

usersRoutes.delete(`/users/:id`,
    authorizationBasicMiddleware,
    userIdParamUriValidationMiddleware,
    mainValidator,
    usersController.deleteOne)