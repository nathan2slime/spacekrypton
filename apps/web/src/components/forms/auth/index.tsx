'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { KryButton, KryInput } from '@kry/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { i18n } from '@kry/i18n';
import { RiseLoader } from 'react-spinners';
import { SignUpInput } from '@kry/types';
import { useSnapshot } from 'valtio';
import * as yup from 'yup';

import { AuthFormProps } from './model';
import { styles } from './styles';

import { appProxyState } from '@/store/app.state';
import { getFieldError } from '@/utils/form';

import spacekrypton from '@/assets/svgs/spacekrypton.svg';
export type AuthFormType = {
  username: string;
  password: string;
  email: string;
};

export const AuthForm = ({
  type = 'signin',
  isLoading,
  onSubmit,
}: AuthFormProps) => {
  const style = styles({ type });

  const { lang } = useSnapshot(appProxyState);

  const loginSchema = {
    password: yup.string().required(i18n[lang].web.fieldIsRequired),
    email: yup
      .string()
      .email(i18n[lang].web.invalidEmail)
      .required(i18n[lang].web.fieldIsRequired),
  };

  const signupSchema = {
    ...loginSchema,
    username: yup.string().min(4, '').required(i18n[lang].web.fieldIsRequired),
  };

  const schemas = {
    signin: loginSchema,
    signup: signupSchema,
  };

  const schema = yup.object().shape(schemas[type]);
  const {
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const form = watch() as AuthFormType;

  const name = i18n[lang].web[type == 'signin' ? 'signIn' : 'signUp'];

  return (
    <div className={style.wrapper()}>
      <div className={style.header()}>
        <Link href="/app/space">
          <Image
            className={style.logo()}
            src={spacekrypton}
            width={90}
            height={90}
            alt="Space Krypton"
          />
        </Link>

        <h4 className={style.title()}>{name}</h4>
      </div>

      <div className={style.fields()}>
        {type == 'signup' && (
          <KryInput
            value={form.username}
            kryChange={e => setValue('username', e, { shouldValidate: true })}
            label={i18n[lang].web.username}
            message={getFieldError(errors, 'username').message}
            invalid={getFieldError(errors, 'username').error}
            type="text"
          />
        )}

        <KryInput
          value={form.email}
          kryChange={e => setValue('email', e, { shouldValidate: true })}
          message={getFieldError(errors, 'email').message}
          invalid={getFieldError(errors, 'email').error}
          label={i18n[lang].web.email}
          type="email"
        />

        <KryInput
          value={form.password}
          kryChange={e => setValue('password', e, { shouldValidate: true })}
          message={getFieldError(errors, 'password').message}
          invalid={getFieldError(errors, 'password').error}
          label={i18n[lang].web.password}
          type="password"
        />

        <div className={style.button()}>
          <KryButton
            variant="solid"
            disabled={!isValid}
            onClick={() => onSubmit(form as SignUpInput)}
          >
            {isLoading ? (
              <RiseLoader size={6} color="white" />
            ) : (
              i18n[lang].web.continue
            )}
          </KryButton>

          <div className={style.divider()} />

          <KryButton
            variant="outline"
            onClick={() =>
              signIn('discord', { redirect: true, callbackUrl: '/' })
            }
          >
            {i18n[lang].web.signInDiscord}
          </KryButton>
        </div>
      </div>

      <div className={style.footer()}>
        <div className={style.footerAction()}>
          {type == 'signin'
            ? i18n[lang].web.notHaveAnAccount
            : i18n[lang].web.alreadyHaveAnAccount}
          ,&nbsp;
          <Link
            className={style.link()}
            href={'/auth/' + (type == 'signin' ? 'signup' : 'signin')}
          >
            {i18n[lang].web[type == 'signup' ? 'signIn' : 'signUp']}
          </Link>
        </div>

        <div>
          {type == 'signin' && (
            <Link className={style.link()} href="/auth/forgot-password">
              {i18n[lang].web.forgotMyPassword}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
