import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DateAndTime } from 'src/@shared/core/DateAndTime';
import { PasswordHasher } from 'src/@shared/core/PasswordHasher';
import { UuidUtils } from 'src/@shared/core/UuidUtils';
import { RegisterUserInput } from 'src/users/usecases/register-user/RegisterUserInput.dto';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
  NOT_VERIFIED = 'NOT_VERIFIED',
}

export class User {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  status: UserStatus;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;

  public static register(input: RegisterUserInput): User {
    const user = new User();
    user.id = UuidUtils.random();
    user.password = PasswordHasher.hash(input.password);
    user.status = UserStatus.NOT_VERIFIED;
    user.email = input.email;
    user.fullName = input.fullName;
    const currentDate = DateAndTime.getCurrentDateString();
    user.createdAt = currentDate;
    user.updatedAt = currentDate;
    return user;
  }

  public isActive(): boolean {
    return this.status === UserStatus.ACTIVE;
  }

  public isVerified(): boolean {
    return this.status !== UserStatus.NOT_VERIFIED;
  }

  public isDeactivated(): boolean {
    return this.status === UserStatus.DEACTIVATED;
  }
}
