import NextAuth from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { type GetServerSidePropsContext } from 'next';
import { getServerSession, type NextAuthOptions } from 'next-auth';

import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '@/lib/schemas/auth';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from '@apollo/client';
import { LOGIN_QUERY } from '@/lib/queries/auth';
import { LOGIN } from '@/lib/constants/endpoints';

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql/`,
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
});

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {},
      authorize: async (credentials) => {
        try {
          const { username, password } =
            await loginSchema.parseAsync(credentials);

          const response = await fetch(
            LOGIN + `?Username=${username}&Password=${password}`,
            {
              method: 'POST',
            }
          )
            .then(async (data) => {
              return await data.json();
            })
            .catch((error) => {
              console.error("Couldn't log in.\n", error);
              return Promise.reject(
                new Error('There was something wrong.')
              );
            });

          return {
            id: '',
            refreshToken: '',
            accessToken: response.result.jwt,
            accessTokenExpires: '',
            user: {
              username: response.result.username,
              email: response.result.email,
              firstName: response.result.firstName,
              lastName: response.result.lastName,
            },
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async (data) => {
      const { token, user } = data;
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }: any) => {
      // Send properties to the client, e.g. accessToken and user from the provider
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.user = token.user;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

export default async function auth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await NextAuth(req, res, authOptions);
}
