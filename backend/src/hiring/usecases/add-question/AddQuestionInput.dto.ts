import { IsEnum, IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { QuestionResponse } from 'src/hiring/domain/interview/Question';

export class AddQuestionInput {
  @IsUUID()
  @IsNotEmpty()
  panelistId: string;

  @IsUUID()
  @IsNotEmpty()
  interviewId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(QuestionResponse)
  responseType: QuestionResponse;

  @IsInt()
  @IsNotEmpty()
  timeAllowedInMinutes: number;
}
