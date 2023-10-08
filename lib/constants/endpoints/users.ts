const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const GET_ALL_USERS = BASE_URL + `/api/Users/GetAllUsers`;

export const GET_SPECIFIC_USER =
  BASE_URL + `/api/Users/GetSpecificUser`;
