import { Inject, Injectable } from '@nestjs/common';
import { isNullOrUndefined } from 'src/@shared/core/IsNullOrUndefined';
import { PasswordHasher } from 'src/@shared/core/PasswordHasher';
import { UseCase } from 'src/@shared/core/UseCase';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/users/details/IUserRepository';
import { UserStatus } from 'src/users/domain/entities/User';
import { LoginUserInput } from 'src/users/usecases/login-user/LoginUserInput.dto';
import { LoginUserResponse } from 'src/users/usecases/login-user/LoginUserResponse.dto';
import { UserEmailNotVerifiedError } from 'src/users/usecases/login-user/UserEmailNotVerified.error';
import { UserEmailOrPasswordDoesNotMatchError } from 'src/users/usecases/login-user/UserEmailOrPasswordDoesNotMatch.error';
import { UserIsDeactivatedError } from 'src/users/usecases/login-user/UserIsDeactivated.error';

const MAP_STATUS_TO_ERROR = {
  [UserStatus.NOT_VERIFIED]: UserEmailNotVerifiedError,
  [UserStatus.DEACTIVATED]: UserIsDeactivatedError,
};

@Injectable()
export class LoginUserUseCase extends UseCase<
  LoginUserInput,
  LoginUserResponse
> {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
  ) {
    super();
  }

  async run(input: LoginUserInput): Promise<LoginUserResponse> {
    const { email, password } = input;

    const user = await this.userRepository.findByEmail(email);
    if (isNullOrUndefined(user)) {
      throw new UserEmailOrPasswordDoesNotMatchError();
    }

    const UserStatusError = MAP_STATUS_TO_ERROR[user.status];
    if (UserStatusError) {
      throw new UserStatusError();
    }

    const passwordMatch = PasswordHasher.compare(password, user.password);
    if (!passwordMatch) {
      throw new UserEmailOrPasswordDoesNotMatchError();
    }

    return Promise.resolve(undefined);
  }
}
