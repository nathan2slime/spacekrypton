'use client';

import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { toast } from 'react-hot-toast';
import { i18n } from '@kry/i18n';

import { ActiveForm } from '@/components/forms/active';
import { ActionLoading } from '@/components/forms/active/model';

import { AuthServices } from '@/services/auth.services';

import { authProxyState } from '@/store/auth.state';
import { appProxyState } from '@/store/app.state';

const Active = () => {
  const { user } = useSnapshot(authProxyState);
  const { lang } = useSnapshot(appProxyState);

  const [loading, setLoading] = useState<ActionLoading>({
    confirm: false,
    resend: false,
  });

  const web = i18n[lang].web;

  const onConfirm = async (secret: string[]) => {
    setLoading({ ...loading, confirm: true });

    if (user && secret) {
      const authServices = new AuthServices({
        lang,
      });

      const res = await authServices.confirm({
        data: {
          secret: secret.join(''),
          user: parseInt(user.id),
        },
      });

      if (res) {
        const user = res.ConfirmAccount;
        authProxyState.user = user;
        toast.success(web.emailHasBeenConfirmed);
      }
    }

    setLoading({ ...loading, confirm: false });
  };

  const onResendCode = async () => {
    setLoading({ ...loading, resend: true });

    if (user) {
      const authServices = new AuthServices({
        lang,
      });

      const res = await authServices.sendEmailCode({
        data: {
          user: parseInt(user.id),
        },
      });

      if (res) toast.success(web.codeHasBeenSent);
    }

    setLoading({ ...loading, resend: false });
  };

  return (
    <ActiveForm
      loading={loading}
      onConfirm={onConfirm}
      onResendCode={onResendCode}
    />
  );
};

export default Active;
