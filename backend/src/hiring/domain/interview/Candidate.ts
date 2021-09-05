import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AddCandidateInput } from 'src/hiring/usecases/add-candidate/AddCandidateInput.dto';

export class Candidate {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  interviewId: string;

  @IsString()
  @MaxLength(30)
  @MinLength(2)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;

  public static create(input: AddCandidateInput): Candidate {
    return new Candidate();
  }
}
