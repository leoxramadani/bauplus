const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const GET_ALL_CLIENTS =
  BASE_URL + `/api/Client/GetAllClients`;

  export const DELETE_CLIENT = 
  BASE_URL + `/api/Client/`