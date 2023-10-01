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
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        try {
          const { username, password } =
            await loginSchema.parseAsync(credentials);

          const { data, loading, error } = await client.query({
            query: LOGIN_QUERY,
            variables: { username, password },
          });

          if (!loading && (!data || error)) {
            return null;
          }

          if (data.login.status !== 200) {
            return null;
          } else
            return {
              refreshToken: '',
              accessToken: data.login.result.jwt,
              accessTokenExpires: '',
              user: data.login.result,
              id: data.login.result.username,
              username: data.login.result.username,
              firstName: data.login.result.firstName,
              lastName: data.login.result.lastName,
              companies: data.login.result.companies,
              email: data.login.result.email,
            };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.username = user.user.username;
        token.email = user.email;
        token.firstName = user.user.firstName;
        token.lastName = user.user.lastName;
        token.companies = user.user.companies;
      }

      return token;
    },
    // session: async ({ session, token }) => {
    //   if (token) {
    //     session.accessToken = token.accessToken;
    //     session.user.username = token.username;
    //     session.user.email = token.email;
    //     session.user.firstName = token.firstName;
    //     session.user.lastName = token.lastName;
    //     session.user.companies = token.companies;
    //   }
    //   return session;
    // },
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
