import { Injectable } from '@nestjs/common';
import { User } from './user.modal';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { userId: 1, username: 'John', password: 'changeme' },
    { userId: 2, username: 'maria', password: 'guess' },
  ];

  async findOne(username: String): Promise<User | undefined> {
    return this.users.find((user) => user.username == username);
  }
}
