import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { validate as isUuid } from 'uuid';

import InvetoryOrders from '../models/InventoryOrder'
import Product from '../models/Product';

class InventoryOrders { 
    async create(request: Request, response: Response) {
        const inventoryRepository = getRepository(InvetoryOrders)
        const productsRepository = getRepository(Product)

        const { productId, type, order_amount } = request.body

        if(!isUuid(productId)) { return response.status(400).json({error: 'Id not valid.'})}

        if(type !== 'in' && type !== 'out') {return response.status(400).json({error: 'Order type must be in or out only.'})}
        if(isNaN(order_amount) || !Number.isInteger(order_amount) || order_amount <= 0) {
            return response.status(400).json({error: 'Order amount must be an integer above 0.'})
        }

        const product = await productsRepository.findOne({ id: productId})

        if(!product) { return response.status(404).json({error: 'Product not found.'})}

        if(type === 'out' && product.amount < order_amount) {
            return response.status(400).json({error: 'Order amount not available in inventory.'})
        }

        let finalProductAmount = product.amount;

        if(type === 'in') {
            finalProductAmount += order_amount
        } else {
            finalProductAmount -= order_amount
        }

        await productsRepository.update(productId, { amount: finalProductAmount })

        const order = inventoryRepository.create({ type, order_amount, product:productId })

        await inventoryRepository.save(order)

        return response.status(200).json({
            order,
            finalProductAmount
        })
    }

    async read(request: Request, response: Response) {
        const repository = getRepository(InvetoryOrders)

        const orders = await repository.find()

        return response.json(orders)
    }

    async update(request: Request, response: Response) {
        const inventoryRepository = getRepository(InvetoryOrders)
        const productsRepository = getRepository(Product)

        const { id, type, order_amount } = request.body

        if(!isUuid(id)) { return response.status(400).json({error: 'Id not valid.'})}

        if(type !== 'in' && type !== 'out') {return response.status(400).json({error: 'Order type must be in or out only.'})}
        if(isNaN(order_amount) || !Number.isInteger(order_amount) || order_amount <= 0) {
            return response.status(400).json({error: 'Order amount must be an integer above 0.'})
        }

        const order = await inventoryRepository.findOne({
            where: { id }
        })

        if(!order) { return response.status(400).json({error: 'Order not found.'})}

        const product = await productsRepository.findOne({ id: order.product.id})

        if(!product) { return response.status(404).json({error: 'Product not found.'})}

        if(type === 'out' && product.amount < order_amount) {
            return response.status(400).json({error: 'Order amount not available in inventory.'})
        }

        let finalProductAmount = product.amount;

        if(type === 'in') {
            finalProductAmount += order_amount
        } else {
            finalProductAmount -= order_amount
        }

        await productsRepository.update(order.product.id, { amount: finalProductAmount })

        await inventoryRepository.update(id, { type, order_amount })

        order.type = type
        order.order_amount = order_amount

        return response.status(200).json({
            order,
            finalProductAmount
        })
    }

    async delete(request: Request, response: Response) {
        const ordersRepository = getRepository(InvetoryOrders)
        const productsRepository = getRepository(Product)
        
        const { id } = request.body

        if(!isUuid(id)) { return response.status(400).json({error: 'Id not valid.'})}

        const order = await ordersRepository.findOne({
            where: { id }
        })

        if(!order) { return response.status(400).json({error: 'Order not found.'})}

        await ordersRepository.remove(order)

        return response.status(200).json({message: 'Order deleted.'})
    }
}

export default new InventoryOrders();