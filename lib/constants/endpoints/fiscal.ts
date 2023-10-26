export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const GET_ONE_FISKALE_HYRESE =
  BASE_URL + `/api/FiskaleHyreseController/FiskaleHyrese/Get`;

export const GET_ALL_FISKALE_HYRESE =
  BASE_URL + `/api/FiskaleHyreseController/FiskaleHyrese/GetAll`;

export const GET_ALL_FILTERED_FISKALE_HYRESE =
  BASE_URL +
  `/api/FiskaleHyreseController/FiskaleHyrese/GetAllFilteredByDate`;

export const UPDATE_FISKALE_HYRESE =
  BASE_URL + `/api/FiskaleHyreseController/FiskaleHyrese/Update`;

export const CREATE_FISKALE_HYRESE =
  BASE_URL + `/api/FiskaleHyreseController/FiskaleHyrese/Create`;

export const DELETE_FISKALE_HYRESE =
  BASE_URL + `/api/FiskaleHyreseController/FiskaleHyrese/Delete`;
