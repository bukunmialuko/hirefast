import { Inject, Injectable } from '@nestjs/common';
import { hasValue } from 'src/@shared/core/HasValue';
import { UseCase } from 'src/@shared/core/UseCase';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/users/details/IUserRepository';
import { User } from 'src/users/domain/entities/User';
import { EmailAlreadyInUseError } from 'src/users/usecases/register-user/EmailAlreadyInUse.error';
import { RegisterUserInput } from 'src/users/usecases/register-user/RegisterUserInput.dto';
import { RegisterUserResponse } from 'src/users/usecases/register-user/RegisterUserResponse.dto';
import { SendVerificationEmailUseCase } from 'src/users/usecases/send-verification-email/SendVerificationEmail.usecase';

@Injectable()
export class RegisterUserUseCase extends UseCase<
  RegisterUserInput,
  RegisterUserResponse
> {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
    private sendVerificationEmailUseCase: SendVerificationEmailUseCase,
  ) {
    super();
  }

  async run(input: RegisterUserInput): Promise<RegisterUserResponse> {
    const foundUser = await this.userRepository.findByEmail(input.email);
    if (hasValue(foundUser)) {
      throw new EmailAlreadyInUseError();
    }

    const user = User.register(input);

    await this.userRepository.save(user);

    try {
      await this.sendVerificationEmailUseCase.run({ email: input.email });
    } catch (e) {}

    return new RegisterUserResponse();
  }
}
