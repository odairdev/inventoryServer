import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { validate as isUuid } from 'uuid';

import Product from '../models/Product'

class ProductsController { 
    async create(request: Request, response: Response) {
        const repository = getRepository(Product)

        const { name, category, amount } = request.body

        if(isNaN(amount) || !Number.isInteger(amount) || amount <= 0) {
            return response.status(400).json({error: 'Product amount must be an integer above 0.'})
        }

        const productAlreadyExists = await repository.findOne({
            where: { name }
        })

        if(productAlreadyExists) { return response.status(400).json({error: 'Product already exists.'})}

        const product = repository.create({ name, category, amount })

        await repository.save(product)

        return response.status(200).json({product})
    }

    async read(request: Request, response: Response) {
        const repository = getRepository(Product)

        const products = await repository.find()

        return response.json({products})
    }

    async update(request: Request, response: Response) {
        const repository = getRepository(Product)

        const { id, name, category, amount } = request.body

        if(!isUuid(id)) { return response.status(400).json({error: 'Id not valid.'})}

        if(isNaN(amount) || !Number.isInteger(amount) || amount <= 0) {
            return response.status(400).json({error: 'Product amount must be an integer above 0.'})
        }

        const product = await repository.findOne({
            where: { id }
        })

        if(!product) { return response.status(400).json({error: 'Product not found.'})}

        await repository.update(id, { name, category, amount })

        const updatedProduct = {
            name,
            category,
            amount
        }

        return response.status(200).json({updatedProduct})
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