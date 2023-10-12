import { File } from 'buffer';
import * as z from 'zod';

export const leavesSchema = z.object({
  member: z.string(),
  leaveType: z.string(),
  status: z.string(),
  duration: z.string(),
  date: z.date(),
  reason: z.string(),
  // file: z.instanceof(File)
});
export type ILeaves = z.infer<typeof leavesSchema>;