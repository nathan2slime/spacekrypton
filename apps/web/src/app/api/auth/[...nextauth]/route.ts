import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthSocialEnum } from '@kry/types';

import { AuthServices } from '@/services/auth.services';

const authService = new AuthServices();

export const options: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
    signOut: '/',
    error: '/',
    verifyRequest: '/',
    newUser: '/',
  },
  providers: [
    CredentialsProvider({
      authorize: () => null,
      credentials: {},
    }),
    DiscordProvider({
      clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID as string,
      authorization: process.env.NEXT_PUBLIC_DISCORD_AUTHORIZATION as string,
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_SECRECT as string,
    }),
  ],
  callbacks: {
    session: async args => {
      const {
        session: { user, ...session },
        token,
      } = args;

      if (user && token) {
        const res = await authService.social({
          data: {
            username: user.name,
            email: user.email as string,
            avatar: user.image,
            secret: token.sub as string,
            type: AuthSocialEnum.Discord,
          },
        });

        return {
          ...session,
          user: res ? res.AuthSocial : undefined,
        };
      }

      return { ...session, user: undefined };
    },
    jwt: args => ({
      ...args.token,
      trigger: args.trigger,
      provider: args.account ? args.account.provider : args.token.provider,
    }),
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
