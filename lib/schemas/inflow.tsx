import { Box } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import * as z from 'zod';
import { formatDate } from '../helper/helper';
import useTranslation from '../hooks/useTranslation';
export const inflowSchema = z.object({
  nr: z.number(),
  userName: z.string(),
  companyName: z.string(),
  nrFatures: z.string(),
  dataNeDokument: z.string().datetime(),
  shumaTVSH: z.number(),
  vleraTVSH: z.number(),
  shumaPaTVSH: z.number(),
  afatiPageses: z.string().transform((str) => new Date(str)),
  dosja: z.string(),
  statusiPageses: z.string(),
  shenim: z.string(),
});

export type inflowColumns = z.infer<typeof inflowSchema>;

export const inflowColumns: MRT_ColumnDef<inflowColumns>[] = [
  {
    accessorKey: 'nr',
    header: 'Number',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'nrFatures',
    header: 'Invoice number',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'companyName',
    header: 'Company name',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'userName',
    header: 'Username',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'shumaPaTVSH',
    header: 'Sum without TAX',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'vleraTVSH',
    header: 'Value of TAX',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'shumaTVSH',
    header: 'Sum with TAX',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'afatiPageses',
    header: 'Payment deadline',
    Cell: ({ cell }) => formatDate(cell.getValue<string>()),
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'statusiPageses',
    header: 'Payment status',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
    Cell: ({ cell }) => (
      <Box
        component="span"
        sx={(theme) => ({
          backgroundColor:
            cell.getValue<string>() == 'unpaid'
              ? theme.palette.error.light
              : cell.getValue<string>() == 'semi-paid'
              ? theme.palette.warning.light
              : cell.getValue<string>() == 'paid'
              ? theme.palette.success.light
              : theme.palette.warning.light,
          borderRadius: '0.25rem',
          color: '#fff',
          maxWidth: '9ch',
          p: '0.25rem',
        })}
      >
        {cell.getValue<number>()?.toLocaleString?.('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </Box>
    ),
  },
];

//* This is completed
export enum status {
  paid = 'paid',
  unpaid = 'unpaid',
  semi = 'semi-paid',
}

export const inflowInputSchema = z
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
    statusiPagese: z.nativeEnum(status),
    dosja: z.string().max(20, {
      message: 'The length of dosja must be 20 characters or shorter',
    }),
    shenim: z.string().max(150, {
      message:
        "The length of 'shenim' must be 150 characters or shorter",
    }),
  })
  .refine(
    (data) => {
      const dataNeDokumentDate = new Date(data.dataNeDokument);
      const afatiPagesesDate = new Date(data.afatiPageses);
      return dataNeDokumentDate <= afatiPagesesDate;
    },
    {
      message:
        "The 'Date in document' date must not be after the 'Payment deadline' date",
      path: ['dataNeDokument'],
    }
  );

export type inflowInputColumns = z.infer<typeof inflowInputSchema>;

export const inflowEditSchema = z
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
    komitentiID: z.number(),
    dataNeDokument: z.string().transform((str) => new Date(str)),
    shumaTVSH: z.number(),
    vleraTVSH: z.number(),
    shumaPaTVSH: z.number(),
    afatiPageses: z.string().transform((str) => new Date(str)),
    statusiPageses: z.string(),
    dosja: z.string().max(20, {
      message: 'The length of dosja must be 20 characters or shorter',
    }),
    shenim: z.string().max(150, {
      message:
        "The length of 'shenim' must be 150 characters or shorter",
    }),
  })
  .refine(
    (data) => {
      const dataNeDokumentDate = new Date(data.dataNeDokument);
      const afatiPagesesDate = new Date(data.afatiPageses);
      return dataNeDokumentDate <= afatiPagesesDate;
    },
    {
      message:
        "The 'Date in document' date must not be after the 'Payment deadline' date",
      path: ['dataNeDokument'],
    }
  );

export type inflowEditColumns = z.infer<typeof inflowEditSchema>;
