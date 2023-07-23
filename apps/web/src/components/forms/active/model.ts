export type ActiveFormProps = {
  loading: ActionLoading;
  onConfirm: (data: string[]) => void;
  onResendCode: () => void;
};

export type ActionLoading = {
  confirm: boolean;
  resend: boolean;
};
