import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddCandidateInput {
  @IsUUID()
  @IsNotEmpty()
  interviewId: string;

  @IsUUID()
  @IsNotEmpty()
  panelistId: string;

  @IsString()
  @MaxLength(30)
  @MinLength(2)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;
}
