import z from 'zod';
export const categorySchema = z.object({
  categoryId: z.string().optional(),
  categoryName: z.string(),
  companyId: z.string().default("145d8d93-7ff7-4a24-a184-aa4e010e7f37"),
  company: z.object({
    companyId: z.string(),
    companyName: z.string(),
  }).optional(),
});

export type ICategories = z.infer<typeof categorySchema>;
