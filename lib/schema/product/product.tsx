import z from 'zod';

export const product = z.object({
    productName: z.string(),
    price: z.coerce.number(),
    productCategory: z.string(),
    productSubCategory: z.string(),
    tax: z.string(),
    hsnSac: z.string(),
    unitType: z.string(),
    description: z.string(),

  });
  
  export type IProduct = z.infer<typeof product>;