import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from 'src/users/details/IUserRepository';
import { RegisterUserUseCase } from 'src/users/usecases/register-user/RegisterUser.usecase';

describe('RegisterUser(UseCase)', () => {
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
