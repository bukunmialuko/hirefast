import { Candidate } from 'src/hiring/domain/interview/Candidate';

export class AddCandidateResponse {
  status = 'ok';
  constructor(public candidate: Candidate) {}
}
