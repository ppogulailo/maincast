import * as argon2 from 'argon2'
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { AuthDto } from './dto/auth.dto'
import { ACCESS_DENIED, ALREADY_USER_ERROR, USER_NOT_FOUND, USER_WRONG_PASSWORD } from './auth.constants'
import { UserService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        const userExists = await this.userService.findByEmail(createUserDto.email)
        if (userExists) {
            throw new BadRequestException(ALREADY_USER_ERROR)
        }
        const hash = await argon2.hash(createUserDto.password)
        const newUser = await this.userService.createUser({
            ...createUserDto,
            password: hash,
        })
        const tokens = await this.getTokens(newUser.id, newUser.email)
        await this.updateRefreshToken(newUser.id, tokens.refreshToken)
        return { tokens: tokens, id: newUser.id }
    }

    async signIn(data: AuthDto) {
        const user = await this.userService.findByEmail(data.email)
        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND)
        }
        const passwordMatches = await argon2.verify(user.password, data.password)
        if (!passwordMatches) {
            throw new UnauthorizedException(USER_WRONG_PASSWORD)
        }
        const tokens = await this.getTokens(user.id, user.email)
        await this.updateRefreshToken(user.id, tokens.refreshToken)
        return { tokens: tokens, id: user.id }
    }

    async logout(userId: number) {
        return await this.updateRefreshToken(userId, null)
    }

    async refreshTokens(userId: number, refreshToken: string) {
        const user = await this.userService.getOneUser(userId)
        if (!user || !user.refreshToken) {
            throw new ForbiddenException(ACCESS_DENIED)
        }
        const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken)
        if (!refreshTokenMatches) {
            throw new ForbiddenException(ACCESS_DENIED)
        }
        const tokens = await this.getTokens(user.id, user.email)
        await this.updateRefreshToken(user.id, tokens.refreshToken)
        return { tokens: tokens, id: user.id }
    }

    async verifyToken(authToken: string) {
        return await this.jwtService.verifyAsync(authToken, {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        })
    }

    private async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await argon2.hash(refreshToken)
        await this.userService.updateUser({
            id: userId,
            refreshToken: hashedRefreshToken,
        })
    }

    private async getTokens(userId: number, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                { sub: userId, email },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: this.configService.get('JWT_ACCESS_EXPIRED'),
                },
            ),
            this.jwtService.signAsync(
                { sub: userId, email },
                {
                    secret: this.configService.get('JWT_REFRESH_SECRET'),
                    expiresIn: this.configService.get('JWT_REFRESH_EXPIRED'),
                },
            ),
        ])
        return {
            accessToken,
            refreshToken,
        }
    }
}
