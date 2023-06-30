'use client';

import { SignUpInput } from '@kry/types';
import { useState } from 'react';

import { AuthForm } from '@/components/forms/auth';
import { AuthServices } from '@/services/auth.services';
import { authProxyState } from '@/store/auth.state';
import { logout, saveUser } from '@/utils/auth';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSignup = async (payload: SignUpInput) => {
    setIsLoading(true);
    const authServices = new AuthServices();

    const data = await authServices.signup({ data: payload });

    if (data) {
      const user = data.SignUp;
      await logout();

      if (user) saveUser(user);

      authProxyState.user = user;
    }

    setIsLoading(false);
  };

  return <AuthForm type="signup" isLoading={isLoading} onSubmit={onSignup} />;
};

export default Signup;
