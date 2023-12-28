import { z } from 'zod';

export const mappingColumnsSchema = z.object({
  columns: z
    .object({
      systemColumnName: z
        .string()
        .min(1, 'Please enter your employee ID column name'),
      databaseColumnName: z.string(),
    })
    .array()
    .optional(),
});

export type IMappingColumnsSchema = z.infer<
  typeof mappingColumnsSchema
>;

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

export const attendanceOptionsSchema = z.object({
  checkInOutId: z.string().optional(),
  employeeId: z.string().optional(),
  checkType: z.string(),
  checkTime: z.string(),
  dataSource: z.string(),
  // timeOut: z.string(),
  // workType: z.string(),
  checkPoint: z.string(),
});

export type IAttendanceOptionsSchema = z.infer<
  typeof attendanceOptionsSchema
>;

export const objMappingAttendance = z
  .object({
    templateAttendanceMappingId: z.string(),
    systemColumnName: z.string(),
    databaseColumnName: z.string(),
    branchId: z.string(),
  })
  .array();

export type IobjMappingAttendance = z.infer<
  typeof objMappingAttendance
>;
