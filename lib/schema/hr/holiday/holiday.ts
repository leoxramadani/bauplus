import * as z from 'zod';

export const holidaySchema = z.object({
  holidayId: z.string(),
  name: z.string(),
  holidayType: z.boolean(),
  startDate: z.date(),
  nrDays: z.coerce.number(),
  repeatAnnually: z.boolean(),
});

export type IHoliday = z.infer<typeof holidaySchema>;
