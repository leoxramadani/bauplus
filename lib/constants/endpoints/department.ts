export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const GET_ALL_DEPARTMENTS =
  BASE_URL + `/api/Department/GetAllDepartments`;

export const CREATE_DEPARTMENT =
  BASE_URL + `/api/Department/CreateDepartment`;
export const DELETE_DEPARTMENT =
  BASE_URL + `/api/Department/DeleteDepartment`;
export const UPDATE_DEPARTMENT =
  BASE_URL + `/api/Department/UpdateDepartment`;
export const GET_SPECIFIC_DEPARTMENT =
  BASE_URL + `/api/Department/GetSpecificDepartment`;

export const GET_ALL_DEPATRMENTS_OF_COMAPNY =
  BASE_URL + `/api/Department/GetAllDepartmentsOfCompany`;
export const GET_ALL_SUBDEPARTMENTS =
  BASE_URL + `/api/Department/GetAllSubDepartments`;
