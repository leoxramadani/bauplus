import * as z from 'zod';
import { ColumnDef } from '@tanstack/react-table';

export const expensesSchema = z.object({
  itemName: z.string(),
  currency: z.string(),
  exchangeRate: z.coerce.number(),
  price: z.coerce.number(),
  purchaseDate: z.string(),
  employee: z.string({
    required_error: 'Please select an employee.',
  }),
  project: z.string(),
  expenseCategory: z.string(),
  purchasedFrom: z.string(),
  bankAccount: z.string(),
  description: z.string(),
});
export type expensesType = z.infer<typeof expensesSchema>;

export const expensesDef: ColumnDef<expensesType>[] = [
  {
    accessorKey: 'itemName',
    header: 'Item Name',
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
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'purchaseDate',
    header: 'Purchase Date',
  },
  {
    accessorKey: 'employee',
    header: 'Employee',
  },
  {
    accessorKey: 'project',
    header: 'Project',
  },
  {
    accessorKey: 'expenseCategory',
    header: 'Expense Category',
  },
  {
    accessorKey: 'purchasedFrom',
    header: 'Purchased From',
  },
  {
    accessorKey: 'bankAccount',
    header: 'Bank Account',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
];
