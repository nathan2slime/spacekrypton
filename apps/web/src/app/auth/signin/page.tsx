'use client';

import { useState } from 'react';
import { SignUpInput } from '@kry/types';

import { AuthForm } from '@/components/forms/auth';
import { AuthServices } from '@/services/auth.services';
import { authProxyState } from '@/store/auth.state';
import { logout, saveUser } from '@/utils/auth';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async (payload: SignUpInput) => {
    setIsLoading(true);
    const authServices = new AuthServices();

    const data = await authServices.login({ data: payload });

    if (data) {
      const user = data.SignIn;
      await logout();

      if (user) saveUser(user);

      authProxyState.user = user;
    }

    setIsLoading(false);
  };

  return <AuthForm onSubmit={onLogin} isLoading={isLoading} type="signin" />;
};

export default Login;
