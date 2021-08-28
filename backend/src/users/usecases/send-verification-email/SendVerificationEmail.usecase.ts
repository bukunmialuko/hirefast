import { Inject, Injectable } from '@nestjs/common';
import { hasValue } from 'src/@shared/core/HasValue';
import { UseCase } from 'src/@shared/core/UseCase';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/users/details/IUserRepository';
import {
  IVerificationRepository,
  VERIFICATION_REPOSITORY,
} from 'src/users/details/IVerificationRepository';
import { UserStatus } from 'src/users/domain/entities/User';
import { Verification } from 'src/users/domain/entities/Verification';
import { VerificationEmail } from 'src/users/domain/entities/VerificationEmail';
import {
  INotificationService,
  NOTIFICATION_SERVICE,
} from 'src/users/services/INotificationService';
import { EmailNotFoundOrAlreadyVerifiedError } from 'src/users/usecases/send-verification-email/EmailNotFoundOrAlreadyVerified.error';
import { SendVerificationEmailInput } from 'src/users/usecases/send-verification-email/SendVerificationEmailInput.dto';
import { SendVerificationEmailResponse } from 'src/users/usecases/send-verification-email/SendVerificationEmailResponse.dto';

@Injectable()
export class SendVerificationEmailUseCase extends UseCase<
  SendVerificationEmailInput,
  SendVerificationEmailResponse
> {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
    @Inject(VERIFICATION_REPOSITORY)
    private verificationRepository: IVerificationRepository,
    @Inject(NOTIFICATION_SERVICE)
    private notificationService: INotificationService,
  ) {
    super();
  }

  async run(
    input: SendVerificationEmailInput,
  ): Promise<SendVerificationEmailResponse> {
    const email = input.email;

    const user = await this.userRepository.findByEmail(email);

    const userDoesNotExist = !hasValue(user);
    if (userDoesNotExist) {
      throw new EmailNotFoundOrAlreadyVerifiedError();
    }

    if (user.isVerified()) {
      throw new EmailNotFoundOrAlreadyVerifiedError();
    }

    const verification = Verification.createForEmail(email);

    await this.verificationRepository.save(verification);

    const verificationEmail = VerificationEmail.create(
      user.email,
      user.fullName,
      verification.code,
    );

    await this.notificationService.sendEmail(verificationEmail);

    return new SendVerificationEmailResponse();
  }
}
