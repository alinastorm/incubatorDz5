import express from 'express';
import authController from "../controllers/auth-controller";
import { nameBodyValidationMiddleware } from '../middlewares/name-validation-middleware';
import { youtubeUrlBodyValidationMiddleware } from '../middlewares/youtubeUrl-validation-middleware';
import { authorizationBasicMiddleware } from '../middlewares/authorization-validation-middleware';

import { mainValidator } from '../middlewares/mainValidator-middleware';
import { loginBodyValidationMiddleware } from '../middlewares/login-body-validation-middleware';
import { passwordBodyValidationMiddleware } from '../middlewares/password-body-validation-middleware';


export const authRoutes = express.Router()


authRoutes.post(`/auth/login`,
    loginBodyValidationMiddleware,
    passwordBodyValidationMiddleware,
    mainValidator,
    authController.readOne)

