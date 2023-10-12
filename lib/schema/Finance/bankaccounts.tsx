import * as z from 'zod';
import { ColumnDef } from '@tanstack/react-table';

export const invoiceSchema = z.object({
  accountName: z.string(),
  accountNumber: z.string(),
  statusName: z.string(),
  bankAccountTypeName: z.string(),
  bankName: z.string(),
  currencyCode: z.string(),
  currencyName: z.string(),
  balance: z.number(),
});

export type IInvoiceSchema = z.infer<typeof invoiceSchema>;

export const financeColumnDef: ColumnDef<IInvoiceSchema>[] = [
  {
    accessorKey: 'accountName',
    header: 'Account name',
  },
  {
    accessorKey: 'accountNumber',
    header: 'Account number',
  },
  {
    accessorKey: 'statusName',
    header: 'Status',
  },
  {
    accessorKey: 'bankAccountTypeName',
    header: 'Bank account type',
  },
  {
    accessorKey: 'bankName',
    header: 'Bank name',
  },
  {
    accessorKey: 'currencyCode',
    header: 'Currency code',
  },
  {
    accessorKey: 'currencyName',
    header: 'Currency name',
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
  },
];
