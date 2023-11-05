import * as z from 'zod';

export const noticeSchema = z.object({
  noticeId: z.string().optional(),
  dateCreated: z.string().optional(),
  noticeTitle: z.string(),
  noticeText: z.string(),
  isRead: z.boolean().default(false),
  employeeId: z
    .string()
    .default('f760cd7b-5cf0-4440-aea5-1f6d488876e8'),
  companyId: z
    .string()
    .default('145D8D93-7FF7-4A24-A184-AA4E010E7F37'),
  departmentId: z.string(),
});

export type InoticeSchema = z.infer<typeof noticeSchema>;
