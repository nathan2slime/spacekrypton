export type ActiveFormProps = {
  isLoading: boolean;
  onSubmit: (code: string) => void;
};

export type ActionLoading = {
  confirm: boolean;
  resend: boolean;
};
