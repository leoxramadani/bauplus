import * as z from 'zod';
import { ColumnDef } from '@tanstack/react-table';

export const invoiceSchema = z.object({
  accountName: z.string(),
  accountNumber: z.string(),
  bankAccountStatus: z.object({
    statusName: z.string(),
  }),
  bankAccountType: z.object({
    bankAccountTypeName: z.string(),
  }),
  bankName: z.string(),
  currency: z.object({
    currencyCode: z.string(),
    currencyName: z.string(),
  }),
  balance: z.number(),
});

export type IInvoice = z.infer<typeof invoiceSchema>;

export const financeColumnDef: ColumnDef<IInvoice>[] = [
  {
    accessorKey: 'accountName',
    header: 'Account name',
  },
  {
    accessorKey: 'accountNumber',
    header: 'Account number',
  },
  {
    accessorKey: 'bankAccountStatus.statusName',
    header: 'Status',
  },
  {
    accessorKey: 'bankAccountType.bankAccountTypeName',
    header: 'Bank account type',
  },
  {
    accessorKey: 'bankName',
    header: 'Bank name',
  },
  {
    accessorKey: 'currency.currencyCode',
    header: 'Currency code',
  },
  {
    accessorKey: 'currency.currencyName',
    header: 'Currency name',
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
  },
];
