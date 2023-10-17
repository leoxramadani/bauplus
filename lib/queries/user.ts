import { gql } from '@apollo/client';
import { z } from 'zod';

export const REGISTER_USER_QUERY = gql`
  mutation Register($entity: RegisterModelInput!) {
    register(entity: $entity) {
      status
      message
      result {
        username
      }
    }
  }
`;

export const CHANGE_PASSWORD_QUERY = gql`
  mutation changePassword(
    $username: String!
    $currentPassword: String!
    $newPassword: String!
  ) {
    changePassword(
      currentPassword: $currentPassword
      username: $username
      newPassword: $newPassword
    ) {
      status
      message
      result
    }
  }
`;

export const PASSWORD_RESET_REQUEST_EMAIL_QUERY = gql`
  mutation resetPasswordResetMail($email: String!) {
    resetPasswordResetMail(email: $email) {
      status
      message
      result
    }
  }
`;

export const PASSWORD_RESET_SUBMIT_RESET_QUERY = gql`
  mutation resetPassword(
    $email: String!
    $code: String!
    $password: String!
  ) {
    resetPassword(email: $email, code: $code, password: $password) {
      status
      message
      result
    }
  }
`;

export const GET_ALL_USERS_QUERY = gql`
  query {
    allUsers {
      firstName
      lastName
      userName
      address
      phoneNumber
      email
    }
  }
`;

export const REMOVE_USER_ROW_QUERY = gql`
  mutation RemoveArkiva($cid: Byte!) {
    removeArkiva(cid: $cid)
  }
`;

export const GET_AUTHORIZATION_CODE_QUERY = gql`
  query {
    authorizationCode {
      status
      message
      result
    }
  }
`;

export const VERIFY_CODE_QUERY = gql`
  mutation ($code: String!) {
    verifycode(code: $code) {
      status
      message
      result
    }
  }
`;

export const DISABLE_2FA_QUERY = gql`
  mutation ($password: String!) {
    disableTwoFactor(password: $password) {
      status
      message
    }
  }
`;

export const GET_SPECIFIC_USER_QUERY = gql`
  query specificUser($username: String!) {
    specificUser(username: $username) {
      result {
        user {
          firstName
          lastName
          userName
          email
          twoFactorEnabled
          phoneNumber
          adress
          active
        }
        companies {
          companyId
          companyName
          roleId
          roleName
          privileges {
            privilege_ID
            short_Description
            long_Description
          }
        }
      }
    }
  }
`;

export const UPDATE_USER_QUERY = gql`
  mutation updateUser($entity: RegisterModelInput!) {
    updateUser(entity: $entity) {
      status
      message
    }
  }
`;

export const DEACTIVATE_USER_QUERY = gql`
  mutation deactivateUser($username: String!) {
    deactivateUser(username: $username) {
      status
      message
    }
  }
`;

export const REACTIVATE_USER_QUERY = gql`
  mutation reactivateUser($username: String!) {
    reactivateUser(username: $username) {
      status
      message
    }
  }
`;
