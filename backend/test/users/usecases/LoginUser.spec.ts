import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from 'src/users/details/IUserRepository';
import { LoginUserUseCase } from 'src/users/usecases/login-user/LoginUser.usecase';

describe('LoginUser(UseCase)', () => {
  let loginUserUseCase;
  const userRepository = {
    findByEmail: (email: string) => undefined,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUserUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: userRepository,
        },
      ],
    }).compile();
    loginUserUseCase = module.get<LoginUserUseCase>(LoginUserUseCase);
  });

  it('should be defined', () => {
    expect(loginUserUseCase).toBeDefined();
  });
});
