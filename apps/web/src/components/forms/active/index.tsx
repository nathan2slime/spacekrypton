'use client';

import * as yup from 'yup';
import { RiseLoader } from 'react-spinners';
import Image from 'next/image';
import { KryButton, KryCode } from '@kry/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { i18n } from '@kry/i18n';
import { useSnapshot } from 'valtio';

import { appProxyState } from '@/store/app.state';
import { authProxyState } from '@/store/auth.state';

import { ActiveFormProps } from './model';
import { styles } from './styles';

import spacekrypton from '@/assets/svgs/spacekrypton.svg';

export const ActiveForm = ({
  loading,
  onConfirm,
  onResendCode,
}: ActiveFormProps) => {
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
        <KryButton
          onClick={() => form.data && onConfirm(form.data)}
          disabled={!isValid}
        >
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
