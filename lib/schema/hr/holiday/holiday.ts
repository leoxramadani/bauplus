import * as z from 'zod';

export const holidaySchema = z.object({
  holidayId: z.string().optional(),
  name: z.string(),
  holidayType: z.boolean().optional(),
  startDate: z.date(),
  nrDays: z.coerce.number(),
  repeatAnnually: z.boolean().optional(),
});

export type IHoliday = z.infer<typeof holidaySchema>;
