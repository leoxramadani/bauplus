import { z } from 'zod';

export const databaseColumnsSchema = z.object({
  employeeId: z.string(),
  date: z.string(),
  shiftId: z.string(),
  timeIn: z.string(),
  timeOut: z.string(),
  status: z.string(),
  note: z.string(),
});

export type IDatabaseColumnsSchema = z.infer<
  typeof databaseColumnsSchema
>;
