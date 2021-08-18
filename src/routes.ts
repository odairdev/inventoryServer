import { Router } from 'express'

import authMiddleware from './app/middlewares/authMiddleWare';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

const routes = Router()

routes.post('/users', authMiddleware, UserController.store)
routes.post('/auth', AuthController.authenticate)

routes.get('/users', authMiddleware,  UserController.index)

export default routes;