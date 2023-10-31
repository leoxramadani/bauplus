import { ColumnDef } from '@tanstack/react-table';
import * as z from 'zod';

export const companySettingsSchema = z.object({
  companyId: z.string(),
  companyName: z.string(),
  companyEmail: z.string(),
  companyPhone: z.coerce.number(),
  companyWebsite: z.string(),
});

export type ICompanySettings = z.infer<typeof companySettingsSchema>;

export const companySettingsDef: ColumnDef<ICompanySettings>[] = [
  {
    accessorKey: 'companyName',
    header: 'Company Name',
  },
  {
    accessorKey: 'companyEmail',
    header: 'Company Email',
  },
  {
    accessorKey: 'companyPhone',
    header: 'Company Phone',
  },
  {
    accessorKey: 'companyWebsite',
    header: 'Company Website',
  },
];
