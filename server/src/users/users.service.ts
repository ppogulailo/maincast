import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UserEntity } from './users.entity'
import { USER_NOT_FOUND } from './user.contstant'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(createUserInput: CreateUserDto): Promise<UserEntity> {
        return await this.userRepository.save({ ...createUserInput })
    }
    async getOneUser(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne({ where: { id: id } })
    }
    async findByEmail(email: string) {
        return await this.userRepository.findOne({ where: { email: email } })
    }
    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find()
    }
    async removeUser(id: number): Promise<number> {
        const user = await this.userRepository.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException(USER_NOT_FOUND)
        }
        await this.userRepository.delete({ id })
        return id
    }
    async updateUser(updateUserInput: Partial<UserEntity>): Promise<UserEntity> {
        await this.userRepository.update({ id: updateUserInput.id }, { ...updateUserInput })
        return await this.getOneUser(updateUserInput.id)
    }
}
