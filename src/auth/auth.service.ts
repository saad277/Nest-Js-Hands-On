import { Injectable } from '@nestjs/common';

import { User } from '../users/user.modal';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: String, password: String): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user && user.password == password) {
      const { password } = user;
      return user;
    }
    return null;
  }
}
