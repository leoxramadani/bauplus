import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
  query login($username: String!, $password: String!) {
    login(entity: { username: $username, password: $password }) {
      status
      message
      result {
        jwt
        username
        email
        firstName
        lastName
        companies {
          roleId
          roleName
          companyId
          companyName
          privileges
        }
      }
    }
  }
`;

export const LOGIN_WITH_2FA_QUERY = gql`
  mutation ($code: String!, $username: String!) {
    login2Factor(code: $code, username: $username) {
      status
      message
      result
    }
  }
`;

export const PRE_AUTH_QUERY = gql`
  query ($username: String!, $password: String!) {
    preAuth(entity: { username: $username, password: $password }) {
      status
      message
      result {
        username
        twoFactorEnabled
      }
    }
  }
`;
