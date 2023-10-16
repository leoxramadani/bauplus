import { BASE_URL } from '..';

export const GET_ALL_DEPARTMENTS =
  BASE_URL + `/api/DepartmentController/Department/GetAllDepartments`;

export const GET_SPECIFIC_DEPARTMENT =
  BASE_URL +
  `/api/DepartmentController/Department/GetSpecificDepartment`;

export const CREATE_DEPARTMENT =
  BASE_URL + `/api/DepartmentController/Department/CreateDepartment`;

export const UPDATE_DEPARTMENT =
  BASE_URL + `/api/DepartmentController/Department/UpdateDepartment`;
