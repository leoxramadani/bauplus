import * as z from 'zod';

export const inflowInputSchema = z.object({
  inflow: z
    .object({
      nrFatures: z
        .string()
        .max(20, {
          message:
            'The length of your invoice number must not exceeded 20 digits',
        })
        .min(1, {
          message:
            'You must have at least a digit for your invoice number',
        }),

      komitentID: z.number(),
      dataNeDokument: z.string().transform((str) => new Date(str)),
      shumaTVSH: z.string().transform((str) => Number(str)),
      vleraTVSH: z.string().transform((str) => Number(str)),
      shumaPaTVSH: z.number(),
      afatiPageses: z.string().transform((str) => new Date(str)),
      statusiPagese: z.string(),
      dosja: z.string().max(20, {
        message:
          "The length of 'dossier' must be 20 characters or shorter",
      }),
      shenim: z.string().max(150, {
        message:
          "The length of 'description' must be 150 characters or shorter",
      }),
    })
    .superRefine(
      (
        arg: any,
        ctx: any
      ): arg is {
        shumaTVSH: number;
        vleraTVSH: number;
        shumaPaTSH: number;
        afatiPageses: Date;
        dataNeDokument: Date;
      } => {
        const { vleraTVSH, shumaTVSH, dataNeDokument, afatiPageses } =
          arg;

        if (vleraTVSH > shumaTVSH) {
          ctx.addIssue({
            code: 'custom',
            message:
              "'Value of TAX' must be smaller than 'Sum with TAX'",
            path: ['vleraTVSH'],
          });
          if (dataNeDokument >= afatiPageses) {
            ctx.addIssue({
              code: 'custom',
              message:
                'Date in document must be smaller than Payment deadline',
              path: ['dataNeDokument'],
            });
            return false;
          }
          return false;
        }

        if (dataNeDokument >= afatiPageses) {
          ctx.addIssue({
            code: 'custom',
            message:
              'Date in document must be smaller than Payment deadline',
            path: ['dataNeDokument'],
          });
          return false;
        }

        return true;
      }
    ),
  archive: z
    .object({
      broj: z.string().max(255).nonempty('Number is required'),
      predmet: z.string().max(255).nonempty('Subject is required'),
      podBroevi: z
        .string()
        .transform((str) => parseInt(str, 10))
        .refine((value) => value >= 1 && value <= 255, {
          message: 'Under-numbers must be between 1 and 255',
        }),
      datumPriem: z.string().nonempty('Recieving date is required'),
      datum: z.string().nonempty('Date is required'),
      ispracac: z.string().max(255).nonempty('Sender is required'),

      organEdinica_ID: z.string(),
      razvodDatum: z.string().nonempty('Sending date is required'),
      oznaka_ID: z.string(),
    })
    .refine(
      (data) => {
        const datumPriemDate = new Date(data.datumPriem);
        const razvojDatumDate = new Date(data.razvodDatum);
        const datumDate = new Date(data.datum);
        return (
          datumPriemDate >= razvojDatumDate &&
          datumPriemDate >= datumDate
        );
      },
      {
        message:
          "'Recieving date' must be bigger than 'Sending date' and 'Date'",
        path: ['datumPriem'],
      }
    )
    .optional(),
});

export type inflowInputColumns = z.infer<typeof inflowInputSchema>;

export const invoiceSchema = z.object({
  invoiceNumber: z.number(),
  invoiceDate: z.date(),
  dueDate: z.date(),
  currency: z.string(),
  exchangeRate: z.string(),
  client: z.string(),
  project: z.string(),
  calculateTax: z.string(),
  bankAccount: z.string(),
  billingAddress: z.string(),
  shippingAddress: z.string(),
  generatedBy: z.string(),
});

export type IInvoiceSchema = z.infer<typeof invoiceSchema>;
