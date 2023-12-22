import { BASE_URL } from '..';

export const GET_ALL_SHIFTS = BASE_URL + `/api/Shift/GetAllShift`;
export const CREATE_ATTENDANCE =
  BASE_URL + `/api/AttendanceRecord/Add`;
export const UPDATE_ATTENDANCE =
  BASE_URL + `/api/AttendanceRecord/Update`;
export const DELETE_ATTENDANCE =
  BASE_URL + `/api/AttendanceRecord/Delete`;
export const GET_ALL_ATTENDANCE =
  BASE_URL + `/api/AttendanceRecord/GetAllAttendanceRecord`;
export const GET_SPECIFIC_ATTENDANCE =
  BASE_URL + `/api/AttendanceRecord/GetSpecificAttendance`;


/** Attendance Mapping */
export const CREATE_ATTENDANCE_MAPPING =
  BASE_URL + `/api/AttendanceMapping/Create`;
export const UPDATE_ATTENDANCE_MAPPING =
  BASE_URL + `/api/AttendanceMapping/Update`;
