export interface RegisterProps {
  email: string;
  name: string;
  companyName: string;
  password: string;
  confirmPassword: string;
}

export interface SignInProps {
  email: string;
  password: string;
}

export interface ForgotPasswordProps {
  email: string;
}
