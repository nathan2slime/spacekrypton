import { FieldErrors } from 'react-hook-form';

export const getFieldError = (errors: FieldErrors, name: string) => {
  const message = errors[name]?.message as string;

  return { error: !!message, message };
};
