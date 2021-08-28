import { Interview } from 'src/hiring/domain/interview/Interview';
import { Question } from 'src/hiring/domain/interview/Question';

export const INTERVIEWS_REPOSITORY = 'INTERVIEWS_REPOSITORY';

export interface IInterviewsRepository {
  save(interview: Interview): Promise<Interview>;
  findById(id: string): Promise<Interview | undefined>;
  addQuestion(interviewId: string, question: Question): Promise<Interview>;
}
