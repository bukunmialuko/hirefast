import { DateAndTime } from 'src/@shared/core/DateAndTime';
import { PasswordHasher } from 'src/@shared/core/PasswordHasher';
import { UuidUtils } from 'src/@shared/core/UuidUtils';
import { User, UserStatus } from 'src/users/domain/entities/User';
import { MockRegisterUserInput } from 'test/users/mocks/factories';

describe('User(Entity)', () => {
  describe('register', () => {
    let registerUserInput;
    const mockId = 'asdfaskldfjl;asdf;lsadf';
    const mockPasswordHash = 'askjdvasjdfv;sajdvl;jadfvjhasdlvasvjas;ldf';
    const mockDateString = 'sadfjas;ldjals;djflask;jdf';
    beforeEach(() => {
      registerUserInput = MockRegisterUserInput();
      jest.spyOn(UuidUtils, 'random').mockReturnValue(mockId);
      jest.spyOn(PasswordHasher, 'hash').mockReturnValue(mockPasswordHash);
      jest
        .spyOn(DateAndTime, 'getCurrentDateString')
        .mockReturnValue(mockDateString);
    });

    const assertIfIdPresent = (user: User, id: string) => {
      expect(user.id).toEqual(id);
    };

    const assertIfIdGenerated = () => {
      expect(UuidUtils.random).toHaveBeenCalledWith();
    };

    const assertIfPasswordPresent = (user: User, hash: string) => {
      expect(user.password).toEqual(hash);
    };

    const assertIfPasswordHashed = (plainPassword: string) => {
      expect(PasswordHasher.hash).toHaveBeenCalledWith(plainPassword);
    };

    it('should create id', () => {
      const user = User.register(registerUserInput);
      assertIfIdGenerated();
      assertIfIdPresent(user, mockId);
    });

    it('should encode password', () => {
      const user = User.register(registerUserInput);
      assertIfPasswordHashed(registerUserInput.password);
      assertIfPasswordPresent(user, mockPasswordHash);
    });

    it('should set status to NOT_VERIFIED', () => {
      const user = User.register(registerUserInput);
      expect(user.status).toEqual(UserStatus.NOT_VERIFIED);
    });

    it('should set email and fullName', () => {
      const user = User.register(registerUserInput);
      expect(user.email).toEqual(registerUserInput.email);
      expect(user.fullName).toEqual(registerUserInput.fullName);
    });

    it('should set createdAt and updatedAt', () => {
      const user = User.register(registerUserInput);
      expect(user.createdAt).toEqual(mockDateString);
      expect(user.updatedAt).toEqual(mockDateString);
    });
  });
});
