import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { NextFunction, Response } from 'express'
import { AuthService } from 'src/auth/auth.service'
import { UserService } from '../../users/users.service'
import { RequestModel } from '../types/request.type'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    async use(req: RequestModel, _: Response, next: NextFunction) {
        try {
            const token = req.cookies?.jwt?.tokens.accessToken
            if (!token) {
                throw new UnauthorizedException('USER_NOT_AUTHORIZED')
            }

            const decodedToken = await this.authService.verifyToken(token)
            const user = await this.userService.findByEmail(decodedToken.email)

            if (!user) {
                throw new UnauthorizedException('USER_NOT_AUTHORIZED')
            }

            req.user = user
            next()
        } catch (error) {
            throw new UnauthorizedException('USER_NOT_AUTHORIZED')
        }
    }
}
