import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import * as yup from 'yup'

import User from '../models/User'

class UserController {
    async store(request: Request, response: Response) {
        const repository = getRepository(User)

        const { name, email, password } = request.body

        const schema = yup.object().shape({
            name: yup.string().required('Nome Obrigatório'),
            email: yup.string().email().required('Email invalido'),
            password: yup.string().min(6).required('Senha Obrigaória')
        })

        try {
            await schema.validate(request.body, {abortEarly: false})
        } catch (err) {
            return response.status(400).json({error: err})
        }

        const UserAlreadyExists = await repository.findOne({
            where: { email }
        })

        if (UserAlreadyExists) { return response.status(409).json({error: 'email already in use.'})}

        const user = repository.create({ name, email, password })

        await repository.save(user)

        // @ts-expect-error
        delete user.password

        return response.status(201).json(user);
    }
}

export default new UserController();