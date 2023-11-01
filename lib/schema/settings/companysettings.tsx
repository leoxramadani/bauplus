import { ColumnDef } from '@tanstack/react-table';
import * as z from 'zod';

export const companySettingsSchema = z.object({
  companyId: z.string(),
  companyName: z.string(),
  contactEmail: z.string(),
  contactPhone: z.coerce.number(),
  website: z.string(),
});

export type ICompanySettings = z.infer<typeof companySettingsSchema>;

export const companySettingsDef: ColumnDef<ICompanySettings>[] = [
  {
    accessorKey: 'companyName',
    header: 'Company Name',
  },
  {
    accessorKey: 'contactEmail',
    header: 'Company Email',
  },
  {
    accessorKey: 'contactPhone',
    header: 'Company Phone',
  },
  {
    accessorKey: 'website',
    header: 'Company Website',
  },
];
