import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])], //repo가 자동으로 생성됨
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
