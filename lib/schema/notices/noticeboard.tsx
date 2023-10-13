import * as z from 'zod';
import { ColumnDef } from '@tanstack/react-table';

export const createClientsSchema = z.object({
  companyId: z.string().optional(),
  clientId: z.string(),
  noticeTitle: z.string(),
  Department: z.string(),
  NoticeDetails: z.string(),
});
export type IcreateClientsSchema = z.infer<
  typeof createClientsSchema
>;

export const createEmployeesSchema = z.object({
  companyId: z.string().optional(),
  employeeId: z.string(),
  noticeTitle: z.string(),
  Department: z.string(),
  NoticeDetails: z.string(),
});
export type IcreateEmployeesSchema = z.infer<
  typeof createEmployeesSchema
>;
