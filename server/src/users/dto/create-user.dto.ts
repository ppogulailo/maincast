import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'
export class CreateUserDto {
    @IsString()
    name: string
    @IsEmail()
    email: string
    @IsString()
    @MinLength(8)
    password: string
    @IsOptional()
    @IsString()
    refreshToken: string
}
