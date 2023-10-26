export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const GET_ALL_NOTICES =
  BASE_URL + `/api/NoticeBoard/GetAllNotices`;

export const GET_SPECIFIC_NOTICE =
  BASE_URL + `/api/NoticeBoard/GetSpecificNotice`;

export const CREATE_NOTICE =
  BASE_URL + `/api/NoticeBoard/CreateNewNotice`;

export const UPDATE_NOTICE =
  BASE_URL + `/api/NoticeBoard/UpdateNotice`;

export const DELETE_NOTICE =
  BASE_URL + `/api/NoticeBoard/DeleteNotice`;
