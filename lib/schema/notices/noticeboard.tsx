import * as z from 'zod';

export const noticeSchema = z.object({
  noticeId: z.string().optional(),
  // dateCreated: z.string(),
  noticeTitle: z.string(),
  noticeText: z.string(),
  isRead: z.boolean().default(false),
  employeeId: z
    .string()
    .default('758BB06E-DE5A-4FAD-B084-03FB2A283FD8'),
  companyId: z
    .string()
    .default('145D8D93-7FF7-4A24-A184-AA4E010E7F37'),
  departmentId: z.string(),
});

export type InoticeSchema = z.infer<typeof noticeSchema>;
