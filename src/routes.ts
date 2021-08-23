import { Router } from 'express'

import authMiddleware from './app/middlewares/authMiddleWare';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import ProductsController from './app/controllers/ProductsController';
import InventoryOrdersController from './app/controllers/InventoryOrdersController';

const routes = Router()

//Unautheticated Routes
routes.post('/users', UserController.store)
routes.post('/auth', AuthController.authenticate)

//Products Routes
routes.get('/products',authMiddleware, ProductsController.read)
routes.post('/products', authMiddleware, ProductsController.create)
routes.put('/products', authMiddleware, ProductsController.update)
routes.delete('/products/:id', authMiddleware, ProductsController.delete)

//Inventory Routes
routes.get('/inventory',authMiddleware, InventoryOrdersController.read)
routes.post('/inventory', authMiddleware, InventoryOrdersController.create)
routes.put('/inventory', authMiddleware, InventoryOrdersController.update)
routes.delete('/inventory/:id', authMiddleware, InventoryOrdersController.delete)

export default routes;