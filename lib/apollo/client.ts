import {
  ApolloClient,
  from,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql`,
  credentials: 'include',
});

/** The header is attached to the client here, after getting the session from NextAuth,
 * 	the token is stored directly inside the session object as 'accessToken'
 */
const authLink = setContext(async (operation, { headers }) => {
  const session = await getSession();

  const companyInLocalStorage = localStorage.getItem('company');

  const companyId = companyInLocalStorage
    ? JSON.parse(companyInLocalStorage).companyId
    : null;

  const header = {
    headers: {
      ...headers,
      authorization: session?.accessToken
        ? `Bearer ${session.accessToken}`
        : '',
      companyId: companyId,
    },
  };
  return header;
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
