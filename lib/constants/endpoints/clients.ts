const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const GET_ALL_CLIENTS =
  BASE_URL + `/api/Client/GetAllClients`;

  export const DELETE_CLIENT = 
  BASE_URL + `/api/Client`

  export const GET_ALL_CLIENT_TYPES = 
  BASE_URL + `/api/Clienttype/GetallClientType`;

  export const UPDATE_CLIENTS =
  BASE_URL + `/api/Clienttype`;

  export const CREATE_CLIENTS = 
  BASE_URL + `/api/Client/add`;

  export const GET_SPECIFIC_CLIENT = 
  BASE_URL + `/api/Client/`;

  export const UPDATE_SPECIFIC_CLIENTS = 
  BASE_URL + `/api/Client/ClientWithHisInfos`;