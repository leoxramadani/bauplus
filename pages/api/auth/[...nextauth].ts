import type { NextApiRequest, NextApiResponse } from 'next';
import { type GetServerSidePropsContext } from 'next';
import NextAuth, {
  getServerSession,
  type NextAuthOptions,
} from 'next-auth';

import { LOGIN, REFRESH_TOKEN } from '@/lib/constants/endpoints';
import { loginSchema } from '@/lib/schemas/auth';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

const refreshAccessToken = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<JWT> => {
  // console.log('REFRESHING TOKEN');
  const response = await axios
    .post(
      REFRESH_TOKEN,
      {},
      {
        withCredentials: true,
        headers: {
          cookie: req.headers.cookie,
        },
      }
    )
    .catch((error) => {
      console.log("Couldn't refresh token.", error.response.data);
      return null;
    });
  
  const cookies = response?.headers['set-cookie'];
  res.setHeader('Set-Cookie', cookies!);

  // console.log('REFRESHED WITH: ', response?.data.refreshToken)

  return {
    cookies: response?.headers['set-cookie'],
    accessToken: response?.data.accessToken,
    accessTokenExpires: response?.data.accessTokenExpires,
  };
};

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions = (req: any, res: any): NextAuthOptions => {
  return {
    providers: [
      Credentials({
        name: 'credentials',
        credentials: {},
        authorize: async (credentials) => {
          try {
            const { username, password } =
              await loginSchema.parseAsync(credentials);

            const response = await axios
              .post(
                LOGIN + `?Username=${username}&Password=${password}`
              )
              .catch((error) => {
                console.error("Couldn't log in.\n", error);
                return Promise.reject(
                  new Error('There was something wrong.')
                );
              });

            res.setHeader(
              'Set-Cookie',
              response.headers['set-cookie']
            );

            return {
              id: '', // somehow implicit in JWT type, not really needed here
              accessToken: response.data.accessToken,
              accessTokenExpires: response.data.accessTokenExpires,
              user: response.data.user,
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
        const { token, user, account, trigger } = data;

        // User and account are available only when passed from the authorize() function above or at any provider signIn
        if (user && account) {
          token.accessToken = user.accessToken;
          token.accessTokenExpires = user.accessTokenExpires;
          token.user = user.user;
          token.email = user.email;
        }

        // Check if token is expired
        if (Date.now() < Date.parse(token.accessTokenExpires)) {
          return token;
        }

        const refreshedToken = await refreshAccessToken(req, res);

        token.accessToken = refreshedToken.accessToken;
        token.accessTokenExpires = refreshedToken.accessTokenExpires;

        return token;
      },
      session: async ({ session, token }: any) => {
        // Session goes to the client, be careful what you send
        // Send properties to the client, e.g. accessToken and user from the provider
        if (token) {
          session.accessToken = token.accessToken;
          session.accessTokenExpires = token.accessTokenExpires;
          session.refreshToken = token.refreshToken;
          session.user = token.user;
        }

        if (token.accessToken == null)
          return null;

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
  return getServerSession(
    ctx.req,
    ctx.res,
    authOptions(ctx.req, ctx.res)
  );
};

export default async function auth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await NextAuth(req, res, authOptions(req, res));
}
