const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const LOGIN = BASE_URL + `/api/AuthController/Auth/Login`;

export const REGISTER =
  BASE_URL + `/api/AuthController/Auth/Register`;

export const REFRESH_TOKEN =
  BASE_URL + `/api/AuthController/Auth/RefreshToken`;

export const RESET_USER_PASSWORD =
  BASE_URL + `/api/AuthController/Auth/ResetUserPassword`;

export const DISABLE_TWO_FACTOR =
  BASE_URL + `/api/AuthController/Auth/DisableTwoFactor`;

export const PRE_AUTH = BASE_URL + `/api/AuthController/Auth/PreAuth`;

export const GET_AUTHORIZATION_CODE =
  BASE_URL + `/api/AuthController/Auth/GetAuthorizationCode`;
