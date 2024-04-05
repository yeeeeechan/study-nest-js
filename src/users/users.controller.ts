import { Controller, Post, Body } from '@nestjs/common';
import { createUserDTO } from './dtos/creat-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('/signup')
  createUser(@Body() body: createUserDTO) {
    this.usersService.create(body.email, body.password);
  }
}
