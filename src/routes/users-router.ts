import express from 'express';
import usersController from "../controllers/users-controller";
import { nameBodyValidationMiddleware } from '../middlewares/name-validation-middleware';
import { youtubeUrlBodyValidationMiddleware } from '../middlewares/youtubeUrl-validation-middleware';
import { authorizationBasicMiddleware } from '../middlewares/authorization-validation-middleware';

import { checkValidationMiddleware } from '../middlewares/checkValidation-middleware';


export const usersRoutes = express.Router()


usersRoutes.get(`/users`,
    authorizationBasicMiddleware,
    nameBodyValidationMiddleware,
    youtubeUrlBodyValidationMiddleware,
    checkValidationMiddleware,
    usersController.readAll)

usersRoutes.post(`/users`,
    authorizationBasicMiddleware,
    nameBodyValidationMiddleware,
    youtubeUrlBodyValidationMiddleware,
    checkValidationMiddleware,
    usersController.createOne)

usersRoutes.delete(`/users/:id`,
    authorizationBasicMiddleware,
    nameBodyValidationMiddleware,
    youtubeUrlBodyValidationMiddleware,
    checkValidationMiddleware,
    usersController.deleteOne)