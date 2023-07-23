import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { envs } from '@kry/envs';
import { AuthSocialEnum } from '@kry/types';

import { AuthServices } from '@/services/auth.services';

const authService = new AuthServices();

export const options: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
    error: '/',
    verifyRequest: '/',
    newUser: '/',
  },
  providers: [
    DiscordProvider({
      clientId: envs.DISCORD_CLIENT_ID,
      authorization: envs.DISCORD_AUTHORIZATION,
      clientSecret: envs.DISCORD_SECRET,
    }),
  ],
  secret: envs.NEXTAUTH_SECRET,
  callbacks: {
    session: async args => {
      const {
        session: { user, ...session },
        token,
      } = args;
      console.log(args);

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
        console.log(res);

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
