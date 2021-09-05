import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from 'src/users/details/IUserRepository';
import { UserStatus } from 'src/users/domain/entities/User';
import { LoginUserUseCase } from 'src/users/usecases/login-user/LoginUser.usecase';
import { LoginUserInput } from 'src/users/usecases/login-user/LoginUserInput.dto';
import { UserEmailOrPasswordDoesNotMatchError } from 'src/users/usecases/login-user/UserEmailOrPasswordDoesNotMatch.error';
import { MockLoginUserInput, MockUser } from 'test/users/mocks/factories';

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

  const loginUser = (input: LoginUserInput) => {
    return loginUserUseCase.run(input);
  };

  const assertIfSearchedForEmail = (email: string) => {
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
  };

  describe('should search for user email', () => {
    describe('when user email is not found', () => {
      let loginUserInput;
      beforeEach(() => {
        jest.clearAllMocks();
        loginUserInput = MockLoginUserInput();
        jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(undefined);
      });
      it('should throw error', async () => {
        await expect(loginUser(loginUserInput)).rejects.toThrowError(
          new UserEmailOrPasswordDoesNotMatchError(),
        );
        assertIfSearchedForEmail(loginUserInput.email);
      });
    });

    describe('when user email is found', () => {
      const mockEmail = 'mockemailuser@gmail.com';
      let loginUserInput;
      let user;
      beforeEach(() => {
        jest.clearAllMocks();
        loginUserInput = MockLoginUserInput({ email: mockEmail });
      });

      afterEach(() => {
        assertIfSearchedForEmail(loginUserInput.email);
      });

      describe('when user is not active', () => {
        let user;
        beforeEach(() => {
          user = MockUser({
            email: mockEmail,
            status: UserStatus.NOT_VERIFIED,
          });
          jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);
        });
        it('should throw error', async () => {
          await expect(loginUser(loginUserInput)).rejects.toThrowError();
        });
      });
    });
  });
});
