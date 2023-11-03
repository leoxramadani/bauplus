import { z } from "zod";

export const generateInvoiceSchema = z.object({
  image:z.string().optional()
});
export type IGenerateInvoice = z.infer<typeof generateInvoiceSchema>;