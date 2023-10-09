import * as z from 'zod';

export const paymentSchema = z.object({
  project: z.string(),
  invoice: z.string(),
  paidOn: z.date(),
  amount: z.string(),
  cashStatus: z.string(),
  currency: z.string(),
  exchangeRate: z.string(),
  transactionId: z.string(),
  paymentGateway: z.string(),
  bankAccount: z.string(),
  // receipt: z.instanceof(File).optional(),
  remark: z.string(),
});
export type IPayment = z.infer<typeof paymentSchema>;
