import { z } from 'zod';

export const AttendanceSchema = z.object({
  employeeId: z.string().min(1, 'You must select an employee!'),
  employeeName: z.string(),
  date: z.date(),
  weekDay: z.string().min(1, 'Select a week day'),
  shiftId: z.string().min(1, 'You must select a shift'),
  checkIn: z.string().min(1, 'Check in is required'),
  checkOut: z.string().min(1, 'Check out is required'),
  late: z.boolean().optional(),
  earlyLeave: z.boolean().optional(),
  attended: z.boolean().optional(),
  worked: z.boolean().optional(),
  break: z.boolean().optional(),
  leaveTypeId: z.string().min(1, 'You must select a leave type!'),
});

export type IAttendance = z.infer<typeof AttendanceSchema>;

export const Shifts = z.object({
  shiftId: z.string(),
  shiftName: z.string(),
});

export type IShifts = z.infer<typeof Shifts>;

// attendance form
//   "attendanceRecordId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "employeeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "employeeName": "string",
//   "date": "2023-11-17T12:24:31.416Z",
//   "weekDay": "string",
//   "shiftId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "checkIn": "2023-11-17T12:24:31.416Z",
//   "checkOut": "2023-11-17T12:24:31.416Z",
//   "late": 0,
//   "earlyLeave": 0,
//   "attended": 0,
//   "worked": 0,
//   "break": 0,
//   "leaveTypeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "leave": 0
