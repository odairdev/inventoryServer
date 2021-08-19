import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { validate as isUuid } from 'uuid';

import Product from '../models/Product'

class ProductsController { 
    async create(request: Request, response: Response) {
        const repository = getRepository(Product)

        const { name, category } = request.body

        const productAlreadyExists = await repository.findOne({
            where: { name }
        })

        if(productAlreadyExists) { return response.status(400).json({error: 'Product already exists.'})}

        const product = repository.create({ name, category })

        await repository.save(product)

        return response.status(200).json({message: 'Product created successfully.'})
    }

    async read(request: Request, response: Response) {
        const repository = getRepository(Product)

        const products = await repository.find()

        return response.json(products)
    }

    async update(request: Request, response: Response) {
        const repository = getRepository(Product)

        const { id, name, category } = request.body

        if(!isUuid(id)) { return response.status(400).json({error: 'Id not valid.'})}

        const product = await repository.findOne({
            where: { id }
        })

        if(!product) { return response.status(400).json({error: 'Product not found.'})}

        await repository.update(id, { name, category })

        product.name = name
        product.category = category

        return response.status(200).json(product)
    }

    async delete(request: Request, response: Response) {
        const repository = getRepository(Product)

        const { id } = request.body

        if(!isUuid(id)) { return response.status(400).json({error: 'Id not valid.'})}

        const product = await repository.findOne({
            where: { id }
        })

        if(!product) { return response.status(400).json({error: 'Product not found.'})}

        await repository.remove(product)

        return response.status(200).json({message: 'Product deleted.'})
    }
}

export default new ProductsController();