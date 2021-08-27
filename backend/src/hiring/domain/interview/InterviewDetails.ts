import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class InterviewDetails {
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  jobDescription: string;

  @IsDateString()
  @IsNotEmpty()
  deadlineDate: string;
}
