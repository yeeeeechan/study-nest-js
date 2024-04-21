import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // 의존성 주입을 위한 fake users service copy
    // Partial<UsersService> : UsersService 내 정의된 메소드의 반환 타입과 일치하는지 체크해 주는 헬퍼
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User) // User Entity처럼 취급해라
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService
        } // UsersService를 요청할 경우, fakeUsersService 값을 제공한다.
      ]
    }).compile();

    service = module.get(AuthService); // DI container 생성
  })

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  })

  it('create a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@asdf.com', 'asdf');
    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  })

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.find = () => Promise.resolve([{
      id: 1,
      email: 'a',
      password: '1'
    } as User])
    await expect(service.signup('test@asdf.com', 'asdf')).rejects.toThrow(BadRequestException);
  })

  it('throws if signin is called with an unused email', async () => {
    await expect(service.signin('weqweq@dfsfd.com', 'qweqweasd')).rejects.toThrow(NotFoundException);
  })
})