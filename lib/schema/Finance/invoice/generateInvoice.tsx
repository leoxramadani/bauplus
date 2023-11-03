import { z } from "zod";

export const generateInvoiceSchema = z.object({
  
});
export type IGenerateInvoice = z.infer<typeof generateInvoiceSchema>;