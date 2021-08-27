import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from 'src/users/details/IUserRepository';
import { VERIFICATION_REPOSITORY } from 'src/users/details/IVerificationRepository';
import { UserStatus } from 'src/users/domain/entities/User';
import { Verification } from 'src/users/domain/entities/Verification';
import { VerificationEmail } from 'src/users/domain/entities/VerificationEmail';
import { NOTIFICATION_SERVICE } from 'src/users/services/INotificationService';
import { EmailNotFoundOrAlreadyVerifiedError } from 'src/users/usecases/send-verification-email/EmailNotFoundOrAlreadyVerified.error';
import { SendVerificationEmailUseCase } from 'src/users/usecases/send-verification-email/SendVerificationEmail.usecase';
import { SendVerificationEmailResponse } from 'src/users/usecases/send-verification-email/SendVerificationEmailResponse.dto';
import {
  MockUser,
  MockVerification,
  MockVerificationEmail,
} from 'test/users/mocks/factories';

describe('SendVerificationEmail(UseCase)', () => {
  let sendVerificationEmailUseCase: SendVerificationEmailUseCase;
  const userRepository = {
    findByEmail: (email: string) => undefined,
  };
  const verificationRepository = {
    save: (verification: Verification) => undefined,
  };
  const notificationService = {
    sendEmail: () => undefined,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendVerificationEmailUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: userRepository,
        },
        {
          provide: VERIFICATION_REPOSITORY,
          useValue: verificationRepository,
        },
        {
          provide: NOTIFICATION_SERVICE,
          useValue: notificationService,
        },
      ],
    }).compile();
    sendVerificationEmailUseCase = module.get<SendVerificationEmailUseCase>(
      SendVerificationEmailUseCase,
    );
  });

  const sendVerificationEmail = (email: string) => {
    return sendVerificationEmailUseCase.run({ email });
  };

  const assertIfVerificationCreated = (email: string) => {
    expect(Verification.createForEmail).toHaveBeenCalledWith(email);
  };

  const assertIfVerificationEmailIsCreated = (
    to: string,
    name: string,
    code: string,
  ) => {
    expect(VerificationEmail.create).toBeCalledWith(to, name, code);
  };

  const assertIfVerificationEmailIsSent = (
    verificationEmail: VerificationEmail,
  ) => {
    expect(notificationService.sendEmail).toBeCalledWith(verificationEmail);
  };

  const assertIfVerificationSaved = (verification: Verification) => {
    expect(verificationRepository.save).toBeCalledWith(verification);
  };

  it('should be defined', () => {
    expect(sendVerificationEmailUseCase).toBeDefined();
  });

  describe('when email is not found', () => {
    const mockEmail = 'mockemail@gmail.com';
    beforeEach(() => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(undefined);
    });

    it('should throw error', async () => {
      await expect(sendVerificationEmail(mockEmail)).rejects.toThrowError(
        new EmailNotFoundOrAlreadyVerifiedError(),
      );
    });
  });

  describe('when email is found', () => {
    describe('and when user is already verified', () => {
      const mockEmail = 'mockemail@gmail.com';
      const mockUser = MockUser({
        email: mockEmail,
        status: UserStatus.ACTIVE,
      });
      beforeEach(() => {
        jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(mockUser);
      });
      it('should throw error', async () => {
        await expect(sendVerificationEmail(mockEmail)).rejects.toThrowError();
      });
    });

    describe('and when user is not verified', () => {
      const mockEmail = 'mockemail@gmail.com';
      const mockUser = MockUser({
        email: mockEmail,
        status: UserStatus.NOT_VERIFIED,
      });
      const mockVerification = MockVerification();
      const mockVerificationEmail = MockVerificationEmail();
      beforeEach(() => {
        jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(mockUser);
        jest
          .spyOn(Verification, 'createForEmail')
          .mockReturnValue(mockVerification);
        jest
          .spyOn(VerificationEmail, 'create')
          .mockReturnValue(mockVerificationEmail);
        jest.spyOn(notificationService, 'sendEmail').mockResolvedValue(true);
        jest
          .spyOn(verificationRepository, 'save')
          .mockResolvedValue(mockVerificationEmail);
      });

      it('should create a verification for email', async () => {
        await sendVerificationEmail(mockEmail);
        assertIfVerificationCreated(mockEmail);
      });

      it('should save verification for email', async () => {
        await sendVerificationEmail(mockEmail);
        assertIfVerificationSaved(mockVerification);
      });

      it('should create verification email', async () => {
        await sendVerificationEmail(mockEmail);
        assertIfVerificationEmailIsCreated(
          mockUser.email,
          mockUser.fullName,
          mockVerification.code,
        );
      });

      it('should send verification email', async () => {
        await sendVerificationEmail(mockEmail);
        assertIfVerificationEmailIsSent(mockVerificationEmail);
      });

      it('should return success response', async () => {
        const response = await sendVerificationEmail(mockEmail);
        expect(response).toEqual(new SendVerificationEmailResponse());
      });
    });
  });
});
