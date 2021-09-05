import { Candidate } from 'src/hiring/domain/interview/Candidate';
import {
  Interview,
  InterviewStatus,
} from 'src/hiring/domain/interview/Interview';
import { Question } from 'src/hiring/domain/interview/Question';

export const INTERVIEWS_REPOSITORY = 'INTERVIEWS_REPOSITORY';

export interface IInterviewsRepository {
  save(interview: Interview): Promise<Interview>;
  findById(id: string): Promise<Interview | undefined>;
  addQuestion(interviewId: string, question: Question): Promise<Interview>;
  updateInterviewStatus(
    id: string,
    status: InterviewStatus,
  ): Promise<Interview>;
  findCandidateByEmail(email: string): Promise<Candidate | undefined>;
  addCandidate(candidate: Candidate): Promise<Candidate>;
}
