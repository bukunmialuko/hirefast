import { Interview } from 'src/hiring/domain/interview/Interview';

export const INTERVIEWS_REPOSITORY = 'INTERVIEWS_REPOSITORY';

export interface IInterviewsRepository {
  save(interview: Interview): Promise<Interview>;
  findById(id: string): Promise<Interview>;
}
