import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './users.entity'
import { UserService } from './users.service'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService],
    exports: [UserService],
})
export class UsersModule {}
