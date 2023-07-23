'use client';

import * as yup from 'yup';
import { RiseLoader } from 'react-spinners';
import Image from 'next/image';
import { KryButton, KryCode } from '@kry/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { i18n } from '@kry/i18n';
import { useSnapshot } from 'valtio';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

import { appProxyState } from '@/store/app.state';
import { authProxyState } from '@/store/auth.state';

import { ActionLoading, ActiveFormProps } from './model';
import { styles } from './styles';

import spacekrypton from '@/assets/svgs/spacekrypton.svg';
import { AuthServices } from '@/services/auth.services';

export const ActiveForm = ({}: ActiveFormProps) => {
  const [loading, setLoading] = useState<ActionLoading>({
    confirm: false,
    resend: false,
  });
  const { lang } = useSnapshot(appProxyState);
  const { user } = useSnapshot(authProxyState);

  const style = styles();
  const schema = yup.object().shape({
    data: yup.array().of(yup.string().required()).length(6),
  });

  const {
    formState: { isValid },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      data: [],
    },
  });

  const form = watch();

  const web = i18n[lang].web;

  const onConfirm = async () => {
    setLoading({ ...loading, confirm: true });
    const secret = form.data;

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
    <div className={style.wrapper()}>
      <div className={style.header()}>
        <Image
          className={style.logo()}
          src={spacekrypton}
          width={90}
          height={90}
          alt="Space Krypton"
        />

        <h4 className={style.title()}>Space Krypton</h4>
        <div className={style.divider()} />

        <p className={style.subtitle()}>
          {web.confirmYourEmail}&nbsp;
          <b className={style.email()}>{user && user.email}</b>
        </p>
      </div>

      <KryCode
        size={6}
        value={form.data}
        kryChange={e => setValue('data', e, { shouldValidate: true })}
      />

      <div className={style.footer()}>
        <KryButton onClick={onConfirm} disabled={!isValid}>
          {loading.confirm ? (
            <RiseLoader size={6} color="white" />
          ) : (
            web.continue
          )}
        </KryButton>
        <KryButton onClick={onResendCode} variant="outline">
          {loading.resend ? (
            <RiseLoader size={6} color="white" />
          ) : (
            web.resendCode
          )}
        </KryButton>
      </div>
    </div>
  );
};
