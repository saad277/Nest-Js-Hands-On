import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get(':id')
  getUser(@Param() params) {
    const { id } = params;
    return this.service.getUser(id);
  }

  @Post()
  createUser(@Body() user: UserEntity) {
    return this.service.updateUser(user);
  }

  @Put()
  updateUser(@Body() user: UserEntity) {
    return this.service.updateUser(user);
  }

  @Delete()
  deleteUser(@Param() params) {
    const { id } = params;

    return this.service.deleteUser(id);
  }
}
