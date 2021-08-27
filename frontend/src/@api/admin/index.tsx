import {
  ForgotPasswordProps,
  RegisterProps,
  SignInProps
} from '@api/admin/types';
import { client } from '@api/client';

// eslint-disable-next-line consistent-return
export async function register(props: RegisterProps): Promise<any> {
  return client.post('/auth/register', props);
}

export async function signIn(props: SignInProps): Promise<any> {
  return props;
}

export async function forgotPassword(props: ForgotPasswordProps): Promise<any> {
  return props;
}
