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
