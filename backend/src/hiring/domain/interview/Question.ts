import { IsInt, IsNotEmpty, IsString } from 'class-validator';

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
}
