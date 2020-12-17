import { Injectable, Inject } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getUsers(user: UserEntity): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async getUser(_id: number): Promise<UserEntity[]> {
    return await this.usersRepository.find({
      select: ['fullName', 'birthday', 'isActive'],
      where: [{ id: _id }],
    });
  }

  async updateUser(user: UserEntity) {
    this.usersRepository.save(user);
  }

  async deleteUser(user: UserEntity) {
    this.usersRepository.delete(user);
  }
}
