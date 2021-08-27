import { Verification } from 'src/users/domain/entities/Verification';

export const VERIFICATION_REPOSITORY = 'VERIFICATION_REPOSITORY';

export interface IVerificationRepository {
  save(verification: Verification): Promise<Verification>;
}
