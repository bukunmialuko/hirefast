import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export enum QuestionResponse {
  TEXT = 'TEXT',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export class Question {
  @IsInt()
  @IsNotEmpty()
  sequenceNumber: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  responseType: QuestionResponse;
}
