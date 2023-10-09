import * as z from 'zod';
import { ColumnDef } from '@tanstack/react-table';

export const estimatesSchema = z.object({
  estimateNumber: z.coerce.number(),
  validTill: z.date({
    required_error: 'A date is required.',
  }),
  currency: z.string(),
  client: z.string(),
  calculateTax: z.string(),
  description: z.string(),
  product: z.string(),

  // purchaseDate: z.string(),
  // employee: z.string({
  //   required_error: 'Please select an employee.',
  // }),
  // project: z.string(),
  // expenseCategory: z.string(),
  // purchasedFrom: z.string(),
  // bankAccount: z.string(),
});
export type estimatesType = z.infer<typeof estimatesSchema>;
