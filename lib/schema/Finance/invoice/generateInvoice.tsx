import { z } from 'zod';

// const MAX_FILE_SIZE = 500000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const generateInvoiceSchema = z.object({
  image: z.string().optional(),
});
export type IGenerateInvoice = z.infer<typeof generateInvoiceSchema>;

export const generatedInvoice = z.object({
  invoiceTypeId: z.string({
    invalid_type_error: 'Invoice Type is required',
    required_error: 'Invoice Type is required',
  }),
  invoiceStatusId: z.string({
    invalid_type_error: 'Invoice Status is required',
    required_error: 'Invoice Status is required',
  }),
  address: z.string().optional(),
  bank_accounts: z.string().optional(),
  company_name: z.string().optional(),
  contact_person: z.string().optional(),
  currency: z.string().optional(),
  date: z.coerce.date({
    invalid_type_error: 'Date is required is required',
    required_error: 'Date is required is required',
  }),
  description_of_itemservice: z.string().optional(),
  in_words: z.string().optional(),
  invoice_number: z.string(),
  location_address: z.string().optional(),
  organization_unit: z.string().optional(),
  payment_due_date: z.coerce.date(),
  price: z.string().optional(),
  tax_id: z.string().optional(),
  total_amount: z.coerce.number({
    invalid_type_error: 'Total amount is required is required',
    required_error: 'Total amount is required is required',
  }),
  total_in_denars: z.string().optional(),
  total_vat: z.string(),
  treated_object: z.string().optional(),
});

export type IgeneratedInvoice = z.infer<typeof generatedInvoice>;
