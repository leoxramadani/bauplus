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

export const category = z.object({
  categoryName: z.string(),
});

export type ICategory = z.infer<typeof category>;

export const subcategory = z.object({
  subCategoryName: z.string(),
  parentCategory: z.string(),
});

export type ISubCategory = z.infer<typeof subcategory>;
