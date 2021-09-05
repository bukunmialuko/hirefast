import { User, UserStatus } from 'src/users/domain/entities/User';
import { Verification } from 'src/users/domain/entities/Verification';
import { VerificationEmail } from 'src/users/domain/entities/VerificationEmail';
import { LoginUserInput } from 'src/users/usecases/login-user/LoginUserInput.dto';
import { RegisterUserInput } from 'src/users/usecases/register-user/RegisterUserInput.dto';

export const MockRegisterUserInput = (
  values?: Partial<RegisterUserInput>,
): RegisterUserInput => {
  const defaultValues: RegisterUserInput = {
    email: 'vikassandhu999@gmail.com',
    fullName: 'Vikas',
    password: 'whywetypepassword',
  };

  return { ...defaultValues, ...values };
};

export const MockUser = (values?: Partial<User>): User => {
  const defaultValues = {
    id: 'sadfkasjdkfljas;ldfjaskdf',
    email: 'vikassandhu999@gmail.com',
    fullName: 'Vikas',
    password: 'whywetypepassword',
    status: UserStatus.NOT_VERIFIED,
    createdAt: '2021-08-25T04:18:36.037Z',
    updatedAt: '2021-08-25T04:18:36.037Z',
    ...values,
  };

  const user = new User();
  user.id = defaultValues.id;
  user.email = defaultValues.email;
  user.fullName = defaultValues.fullName;
  user.password = defaultValues.password;
  user.status = defaultValues.status;
  user.createdAt = defaultValues.createdAt;
  user.updatedAt = defaultValues.updatedAt;
  return user;
};

export const MockVerification = (
  values?: Partial<Verification>,
): Verification => {
  const defaultValues: Verification = {
    id: 'sadfkasjdkfljas;ldfjaskdf',
    email: 'vikassandhu999@gmail.com',
    code: 'sdfgj;ldsajfbv;ldafjgv;ljas',
    createdAt: '2021-08-25T04:18:36.037Z',
    expiresAt: '2021-08-25T04:18:36.037Z',
  };

  return { ...defaultValues, ...values };
};

export const MockVerificationEmail = (
  values?: Partial<VerificationEmail>,
): VerificationEmail => {
  const defaultValues: VerificationEmail = {
    to: 'touser@gmail.com',
    senderProvider: 'contacts@hirefast.com',
    title: 'Verify your email at Hirefast!',
    body: 'this is mock body',
  };

  return { ...defaultValues, ...values };
};

export const MockLoginUserInput = (
  values?: Partial<LoginUserInput>,
): LoginUserInput => {
  const defaultValues: LoginUserInput = {
    email: 'mockuser@gmail.com',
    password: 'whywetypepasswords',
    ...values,
  };

  const mock = new LoginUserInput();
  mock.email = defaultValues.email;
  mock.password = defaultValues.password;

  return mock;
};
