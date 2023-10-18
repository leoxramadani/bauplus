import { BASE_URL } from '..';

export const GET_ALL_DEPARTMENTS =
  BASE_URL + `/api/Department/Departments`;
export const CREATE_DEPARTMENT = BASE_URL + `/api/Department/Create`;
export const DELETE_DEPARTMENT = BASE_URL + `/api/Department/Delete`;
export const UPDATE_DEPARTMENT = BASE_URL + `/api/Department/Update`;
export const GET_SPECIFIC_DEPARTMENT =
  BASE_URL + `/api/Department/Department`;

export const GET_ALL_DEPATRMENTS_OF_COMAPNY =
  BASE_URL + `/api/Department/GetAllDepartmentsOfCompany`;
export const GET_ALL_SUBDEPARTMENTS =
  BASE_URL + `/api/Department/GetAllSubDepartments`;
