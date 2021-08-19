import { Router } from 'express'

import authMiddleware from './app/middlewares/authMiddleWare';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import ProductsController from './app/controllers/ProductsController';

const routes = Router()

//Unautheticated Routes
routes.post('/users', UserController.store)
routes.post('/auth', AuthController.authenticate)

//Products Routes
routes.get('/products',authMiddleware, ProductsController.read)
routes.post('/products', authMiddleware, ProductsController.create)
routes.put('/products', authMiddleware, ProductsController.update)
routes.delete('/products', authMiddleware, ProductsController.delete)



export default routes;