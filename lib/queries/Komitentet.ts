import { gql } from '@apollo/client';

export const GET_ALL_KOMITENTET = gql`
  query {
    allKomitentet {
      komintenti_ID
      company_Name
    }
  }
`;
