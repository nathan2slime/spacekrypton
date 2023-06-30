import { SignUpInput } from '@kry/types';

export type AuthFormProps = {
  type?: 'signup' | 'signin';
  isLoading: boolean;
  onSubmit: (form: SignUpInput) => void;
};
