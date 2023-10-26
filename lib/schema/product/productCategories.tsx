import z from 'zod';
export const categorySchema = z.object({
  categoryId: z.string(),
  categoryName: z.string(),
  companyId: z.string(),
  company: z.object({
    companyId: z.string(),
    companyName: z.string(),
  }),
});

export type ICategories = z.infer<typeof categorySchema>;
