import { z } from 'zod';

export const databaseColumnsSchema = z.object({
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
  person_id: z.string(),
  depart: z.string(),
  timeIn: z.string(),
  shifts: z.string(),
  statuses: z.string(),
  name: z.string(),
  dates: z.string(),
  timeOut: z.string(),
  attend: z.string(),
  notes: z.string(),
});

export type IDatabaseColumnsSchema = z.infer<
  typeof databaseColumnsSchema
>;

// export const systemColumnsSchema = z.object({
//   personId: z.string(),
//   department: z.string(),
//   checkIn: z.string(),
//   shift: z.string(),
//   status: z.string(),
//   fullName: z.string(),
//   date: z.string(),
//   checkOut: z.string(),
//   attended: z.string(),
//   note: z.string(),
// });

// export type ISystemColumnsSchema = z.infer<
//   typeof systemColumnsSchema
// >;
