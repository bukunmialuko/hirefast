import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from 'src/users/details/IUserRepository';
import { User } from 'src/users/domain/entities/User';
import { EmailAlreadyInUseError } from 'src/users/usecases/register-user/EmailAlreadyInUse.error';
import { RegisterUserUseCase } from 'src/users/usecases/register-user/RegisterUser.usecase';
import { RegisterUserInput } from 'src/users/usecases/register-user/RegisterUserInput.dto';
import { RegisterUserResponse } from 'src/users/usecases/register-user/RegisterUserResponse.dto';
import { SendVerificationEmailUseCase } from 'src/users/usecases/send-verification-email/SendVerificationEmail.usecase';
import { SendVerificationEmailInput } from 'src/users/usecases/send-verification-email/SendVerificationEmailInput.dto';
import { SendVerificationEmailResponse } from 'src/users/usecases/send-verification-email/SendVerificationEmailResponse.dto';
import { MockRegisterUserInput, MockUser } from 'test/users/mocks/factories';

describe('RegisterUser(UseCase)', () => {
  let registerUserUseCase;
  const sendVerificationEmailUseCase = {
    run: () => undefined,
  };
  const userRepository = {
    findByEmail: (email: string) => undefined,
    save: (input: User) => undefined,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserUseCase,
        {
          provide: SendVerificationEmailUseCase.name,
          useValue: sendVerificationEmailUseCase,
        },
        {
          provide: USER_REPOSITORY,
          useValue: userRepository,
        },
      ],
    }).compile();
    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
  });

  it('should be defined', () => {
    expect(registerUserUseCase).toBeDefined();
  });

  const registerUser = (input: RegisterUserInput) => {
    return registerUserUseCase.run(input);
  };

  const assertIfSearchedForEmail = (email: string) => {
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
  };

  describe('when email is found', () => {
    let user;
    const registerInput = MockRegisterUserInput();
    beforeEach(() => {
      user = MockUser();
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);
    });

    it('should throw error', async () => {
      await expect(registerUser(registerInput)).rejects.toThrowError(
        new EmailAlreadyInUseError(),
      );
      assertIfSearchedForEmail(registerInput.email);
    });
  });

  describe('when email is unique', () => {
    const registerInput = MockRegisterUserInput();
    const verificationEmailResponse = new SendVerificationEmailResponse();
    const mockUser = MockUser();
    beforeEach(() => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);
      jest.spyOn(User, 'register').mockReturnValue(mockUser);
    });

    const assertIfNewUserCreated = (input: RegisterUserInput) => {
      expect(User.register).toHaveBeenCalledWith(input);
    };

    const assertIfNewUserSaved = (input: User) => {
      expect(userRepository.save).toHaveBeenCalledWith(input);
    };

    const assertIfVerificationEmailSendTried = (
      input: SendVerificationEmailInput,
    ) => {
      expect(sendVerificationEmailUseCase.run).toHaveBeenCalledWith(input);
    };

    it('should create new user', async () => {
      await registerUser(registerInput);
      assertIfNewUserCreated(registerInput);
    });

    it('should save new user', async () => {
      await registerUser(registerInput);
      assertIfNewUserSaved(mockUser);
    });

    it('should return success response', async () => {
      const response = await registerUser(registerInput);
      expect(response).toEqual(new RegisterUserResponse());
      assertIfSearchedForEmail(registerInput.email);
    });

    describe('when verification email successfully send', () => {
      beforeEach(() => {
        jest
          .spyOn(sendVerificationEmailUseCase, 'run')
          .mockResolvedValue(verificationEmailResponse);
      });

      it('should return success response', async () => {
        const response = await registerUser(registerInput);
        expect(response).toEqual(new RegisterUserResponse());
        assertIfVerificationEmailSendTried({ email: registerInput.email });
      });
    });

    describe('when verification email sending failed', () => {
      beforeEach(() => {
        jest
          .spyOn(sendVerificationEmailUseCase, 'run')
          .mockRejectedValueOnce(new Error());
      });

      it('should return success response', async () => {
        const response = await registerUser(registerInput);
        expect(response).toEqual(new RegisterUserResponse());
        assertIfVerificationEmailSendTried({ email: registerInput.email });
      });
    });
  });
});
