import { DefaultSession } from 'next-auth';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface ICompany {
    companyId: string | undefined;
    companyName: string | undefined;
    logo: string | undefined;
    privileges: string[] | undefined | null;
  }

  interface ArkivaUser {
    firstName: string;
    lastName: string;
    username: string | undefined;
    email: string;
    companies: ICompany[];
  }

  interface Session extends DefaultSession {
    accessToken: string;
    acessTokenExpires: number;
    user?: ArkivaUser | any;
  }

  interface User {
    accessToken: string;
    accessTokenExpires: string;
    user?: ArkivaUser | any;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string;
    accessTokenExpires: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
