import * as z from 'zod';
import { ColumnDef } from '@tanstack/react-table';

export const invoiceSchema = z.object({
  invoiceNumber: z.number(),
  invoiceDate: z.date(),
  dueDate: z.date(),
  currency: z.string(),
  exchangeRate: z.string(),
  client: z.string(),
  project: z.string(),
  calculateTax: z.string(),
  bankAccount: z.string(),
  billingAddress: z.string(),
  shippingAddress: z.string(),
  generatedBy: z.string(),
});
export type IInvoiceSchema = z.infer<typeof invoiceSchema>;

export const financeColumnDef: ColumnDef<IInvoiceSchema>[] = [
  {
    accessorKey: 'invoiceNumber',
    header: 'Invoice Number',
  },
  {
    accessorKey: 'invoiceDate',
    header: 'Invoice Date',
    cell({ row }) {
      const formatedDate = new Date(
        row.getValue('invoiceDate')
      ).toLocaleDateString('en-GB');
      return <div>{formatedDate}</div>;
    },
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell({ row }) {
      const formatedDate = new Date(
        row.getValue('dueDate')
      ).toLocaleDateString('en-GB');
      return <div>{formatedDate}</div>;
    },
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
  },
  {
    accessorKey: 'exchangeRate',
    header: 'Exchange Rate',
  },
  {
    accessorKey: 'client',
    header: 'Client',
  },
  {
    accessorKey: 'project',
    header: 'Project',
  },
  {
    accessorKey: 'calculateTax',
    header: 'Calculate Tax',
  },
  {
    accessorKey: 'bankAccount',
    header: 'Bank Account',
  },
  {
    accessorKey: 'billingAddress',
    header: 'Billing Address',
  },
  {
    accessorKey: 'shippingAddress',
    header: 'Shipping Address',
  },
  {
    accessorKey: 'generatedBy',
    header: 'Generated By',
  },
];
