import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useCompany } from './hooks/useCompany';

type WithAuthorization<P = Record<string, unknown>> = (
  Component: FC,
  allowedPrefix?: string
) => FC<P>;

export const withAuthorization: WithAuthorization = (
  Component,
  allowedPrefix
): FC => {
  const WithAuthorizationComponent: FC = (props) => {
    const { startsWith } = useCompany();
    const { status } = useSession();

    const router = useRouter();

    // if (allowedPrefix) {
    //   if (!startsWith(allowedPrefix!)) return <Forbidden />;
    // } else {
    //   if (status === "unauthenticated")
    //     router.push(`/login?callbackUrl=${router.pathname}`);
    // }

    return <Component {...props} />;
  };

  return WithAuthorizationComponent;
};
