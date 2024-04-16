import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // Repository<User> 제네릭 타입을 사용하기 위해 @InjectRepository를 사용
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  create(email: string, password: string) {
    const user = this.repo.create({ email, password })
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } })
  }

  // Partial: typeScript에 정의되어 있는 type helper, attrs가 User 클래스에 있는 어떤 속성도 될 수 있다.
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found')
    }
    return this.repo.remove(user);
  }
}
