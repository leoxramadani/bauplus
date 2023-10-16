import * as z from 'zod';

// Define static values
const employeeID = '758BB06E-DE5A-4FAD-B084-03FB2A283FD8';
const companyID = '145D8D93-7FF7-4A24-A184-AA4E010E7F37';
const departmentID = '0134A47A-29DD-4CCD-8D64-4A381A960EA4';

export const noticeSchema = z.object({
  noticeId: z.string(),
  dateCreated: z.string(),
  noticeTitle: z.string(),
  noticeText: z.string(),
  isRead: z.boolean(),
  employeeId: z
    .string()
    .refine((val) => val === employeeID, {
      message: 'Invalid employee ID',
    }),
  companyId: z
    .string()
    .refine((val) => val === companyID, {
      message: 'Invalid company ID',
    }),
  Department: z
    .string()
    .refine((val) => val === departmentID, {
      message: 'Invalid department ID',
    }),
  NoticeDetails: z.string(),
});

export type INoticeSchema = z.infer<typeof noticeSchema>;
