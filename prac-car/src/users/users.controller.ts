import { Controller, Post, Body, Get, Patch, Param, Query, Delete, NotFoundException, Session } from '@nestjs/common';
import { createUserDTO } from './dtos/creat-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService, private authSerivce: AuthService) { }

  @Get('/whoami')
  whoAmI(@Session() session: any) {
    return this.usersService.findOne(session.userId);
  }

  @Post('/signout')
  SignOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: createUserDTO, @Session() session: any) {
    const user = await this.authSerivce.signup(body.email, body.password)
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: createUserDTO, @Session() session: any) {
    const user = await this.authSerivce.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
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
