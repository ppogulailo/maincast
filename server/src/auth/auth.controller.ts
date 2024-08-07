import { Response } from 'express'
import { Body, Controller, ForbiddenException, Get, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RequestModel } from '../common/types/request.type'
import { COOKIE_DENIED, JWT_DENIED } from './auth.constants'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../decorators/user.decorator'
import { UserEntity } from '../users/users.entity'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        const jwt = await this.authService.signUp(createUserDto)
        this.setJwtCookie(response, jwt)
    }

    @Post('signin')
    async signIn(@Body() data: AuthDto, @Res({ passthrough: true }) response: Response) {
        const jwt = await this.authService.signIn(data)
        this.setJwtCookie(response, jwt)
    }

    @Get('logout')
    async logout(@Res({ passthrough: true }) response: Response, @User() user: UserEntity) {
        response.clearCookie('jwt', { path: '/' })
        await this.authService.logout(user.id)
        return 'Logout successful'
    }

    @Get('refresh')
    async refreshTokens(@Req() request: RequestModel, @Res({ passthrough: true }) response: Response) {
        if (!request.cookies.jwt) {
            throw new ForbiddenException(COOKIE_DENIED)
        }
        const jwt = await this.authService.refreshTokens(
            request.cookies.jwt.id,
            request.cookies.jwt.tokens.refreshToken,
        )
        if (!jwt) {
            throw new ForbiddenException(JWT_DENIED)
        }
        this.setJwtCookie(response, jwt)
    }

    private setJwtCookie(response: Response, jwt): void {
        response.cookie('jwt', jwt, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
    }
}
