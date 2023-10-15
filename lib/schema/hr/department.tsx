import { ColumnDef } from '@tanstack/react-table';
import * as z from 'zod';

export const departmentSchema = z.object({
  departmentId: z.string(),
  departmentName: z.string(),
  companyId: z.string(),
  parentDepartmentId: z.string(),
});

export type IDepartment = z.infer<typeof departmentSchema>;

export const departmentColumnDef: ColumnDef<IDepartment>[] = [
  {
    accessorKey: 'departmentId',
    header: 'Department ID',
  },
  {
    accessorKey: 'departmentName',
    header: 'Department Name',
  },
  {
    accessorKey: 'companyId',
    header: 'Company ID',
  },
  {
    accessorKey: 'parentDepartmentId',
    header: 'Parent Department ID',
  },
];
