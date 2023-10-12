const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const GET_ALL_EMPLOYEES =
  BASE_URL + `/api/HREmployee/HRGetAllEmployees`;

export const CREATE_EMPLOYEES =
  BASE_URL + `/api/HREmployee/HRCreateEmployee`;
export const DELETE_EMPLOYEES =
  BASE_URL + `/api/HREmployee/HRDeleteEmploye`;
export const UPDATE_EMPLOYEES =
  BASE_URL + `/api/HREmployee/HRUpdateEmployee`;
