import { User } from 'src/users/domain/entities/User';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
