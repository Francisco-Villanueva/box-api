import {
	Injectable,
	NestMiddleware,
	UnauthorizedException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

Injectable()
export class ValidateCarrierMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: NextFunction) {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			throw new UnauthorizedException('Token no encontrado')
		}
		const [bearer, token] = authHeader.split(' ')
		if (bearer !== 'Bearer' || !token) {
			throw new UnauthorizedException('Error en el token encontrado')
		}

		try {
			const payload = jwt.verify(token, process.env.SECRET_PASSWORD) as {
				role: string
			}
			if (!payload || payload.role !== 'CARRIER') {
				throw new UnauthorizedException('Usuario no autorizado')
			}
		} catch (error) {
			throw new UnauthorizedException('Token inválido')
		}

		next()
	}
}
