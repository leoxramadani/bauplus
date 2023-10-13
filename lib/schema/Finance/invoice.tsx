import * as z from 'zod';

export const invoiceSchema = z.object({
  invoiceNumber: z
    .string()
    .max(20, {
      message:
        'The length of your invoice number must not exceeded 20 digits',
    })
    .min(1, {
      message:
        'You must have at least a digit for your invoice number',
    }),
  invoiceFor: z.coerce.number(),
  dateInTheDocument: z.coerce.date(),
  sumWithTax: z.coerce.number(),
  taxValue: z.coerce.number(),
  sumWithoutTax: z.coerce.number(),
  dueDate: z.coerce.date(),
  status: z.string(),
  dossier: z.string().max(20, {
    message:
      "The length of 'dossier' must be 20 characters or shorter",
  }),
  description: z.string().max(150, {
    message:
      'The length of description must be 150 characters or shorter',
  }),
});

export type IInvoice = z.infer<typeof invoiceSchema>;
