import { Controller, Post, Body, Get, Patch, Param, Query, Delete, NotFoundException } from '@nestjs/common';
import { createUserDTO } from './dtos/creat-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('/signup')
  createUser(@Body() body: createUserDTO) {
    this.usersService.create(body.email, body.password);
  }

  @Get('/:id') //url로 들어오는 건 string이다.(Nest에서 자동으로 변환해주지 않음)
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) { throw new NotFoundException('user not found') }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body)
  }
}
