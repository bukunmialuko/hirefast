import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { AddQuestionInput } from 'src/hiring/usecases/add-question/AddQuestionInput.dto';

export enum QuestionResponse {
  TEXT = 'TEXT',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export class Question {
  @IsInt()
  sequenceNumber: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  responseType: QuestionResponse;

  @IsInt()
  @IsNotEmpty()
  timeAllowedInMinutes: number;

  public static create(input: AddQuestionInput): Question {
    return new Question();
  }
}
