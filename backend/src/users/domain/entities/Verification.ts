import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class Verification {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  expiresAt: string;

  public static createForEmail(_email: string): Verification {
    return new Verification();
  }
}
