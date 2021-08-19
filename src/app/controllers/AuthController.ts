import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User'

class AuthController {
    async authenticate(request: Request, response: Response) {
        const repository = getRepository(User)

        const { email, password } = request.body

        const user = await repository.findOne({
            where: { email }
        })

        if (!user) { return response.status(401).json({error: 'Email invalid.'})}

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) { return response.status(401).json({error: 'Password invalid.'})}

        const token = jwt.sign( {id: user.id}, `${process.env.JWT_SECRET}`, {expiresIn: '1d'} )

        // @ts-expect-error
        delete user.password

        return response.json({
            user,
            token
        })
        
    }
}

export default new AuthController();