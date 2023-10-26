import z from 'zod';
export const categorySchema = z.object({
  categoryName: z.string(),
});

export type ICategories = z.infer<typeof categorySchema>;
