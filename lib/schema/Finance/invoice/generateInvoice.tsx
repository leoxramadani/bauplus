import { z } from "zod";

// const MAX_FILE_SIZE = 500000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const generateInvoiceSchema = z.object({
  // image:z.any()
  // .refine((files) => files?.length === 0, "Image is required.") // if no file files?.length === 0, if file files?.length === 1
  // .refine((files) => files?.[0]?.size >= MAX_FILE_SIZE, `Max file size is 5MB.`) // this should be greater than or equals (>=) not less that or equals (<=)
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   ".jpg, .jpeg, .png and .webp files are accepted."
  // ),
  image:z.string().optional()
});
export type IGenerateInvoice = z.infer<typeof generateInvoiceSchema>;


export const generatedInvoice = z.object({
  address:z.string(),
  bank_accounts: z.string(),
  company_name:z.string(),
  contact_person: z.string(),
  currency:z.string(),
  date:z.coerce.date(),
  description_of_itemservice:z.string(),
  in_words: z.string(),
  invoice_number: z.string(),
  location_address: z.string(),
  organization_unit:z.string(),
  payment_due_date:z.coerce.date(),
  invoiceStatusId:z.string().optional(),
  invoiceTypeId:z.string().optional(),
  price:z.string(),
  tax_id:z.string(),
  total_amount: z.string(),
  total_in_denars: z.string(),
  total_vat:z.string(),
  treated_object: z.string(),
})

export type IgeneratedInvoice = z.infer<typeof generatedInvoice>;


// address: "Ул. Филип Втори Македонски бр. 3/11 Скопје"
// bank_accounts: "[Bank Accounts]"
// company_name: "ТХОР ИНДУСТРИЕС ДООЕЛ Скопје"
// contact_person: "Директор производство"
// currency: "MKD"
// date: "2023-07-13"
// description_of_itemservice: "Ископ на хумус"
// in_words: "X"
// invoice_number: "01/2023"
// location_address: "Ас Сењак Дооел, Кичево"
// organization_unit: "hor IINDUSTRIES"
// payment_due_date: "2023-07-28"
// price: "Vkupno"
// tax_id: "MK4080020593677"
// total_amount: "Без ДДВ"
// total_in_denars: "="
// total_vat: "18%"
// treated_object: "Ископ на материјал IV и V категорија со Додаток за ископ во карпа"