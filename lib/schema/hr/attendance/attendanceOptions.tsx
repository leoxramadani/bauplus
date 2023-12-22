import { z } from 'zod';

export const attendanceOptionsSchema = z.object({
  employeeId: z.string(),
  department: z.string(),
  checkIn: z.string(),
  shift: z.string(),
  status: z.string(),
  fullName: z.string(),
  date: z.string(),
  checkOut: z.string(),
  attended: z.string(),
  note: z.string(),
});

export type IAttendanceOptionsSchema = z.infer<
  typeof attendanceOptionsSchema
>;
