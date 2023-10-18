import * as z from 'zod';
import { MRT_ColumnDef } from 'material-react-table';
import { formatDate } from '../helper/helper';
import useTranslation from '../hooks/useTranslation';
import { Box } from '@mui/material';

const columnsSchema = z.object({
  nr: z.number(),
  nrExtern: z.string(),
  userName: z.string(),
  companyName: z.string(),
  dataNeDokument: z.string().datetime(),
  dataKohaRec: z.string().datetime(),
  shumaTVSH: z.number(),
  vleraTVSH: z.number(),
  shumaPaTVSH: z.number(),
  statusiPageses: z.string(),
  afatiPageses: z.string().datetime(),
});

export type incomeColumns = z.infer<typeof columnsSchema>;

export const incomeColumns: MRT_ColumnDef<incomeColumns>[] = [
  {
    accessorKey: 'nr',
    header: 'Number',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'nrExtern',
    header: 'Extern number',
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
    accessorKey: 'dataNeDokument',
    header: 'Date in document',
    Cell: ({ cell }) => formatDate(cell.getValue<string>()),
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
    accessorKey: 'dataKohaRec',
    header: 'Reg. date',
    Cell: ({ cell }) => formatDate(cell.getValue<string>()),
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
];

//* This is completed
export enum status {
  paid = 'paid',
  unpaid = 'unpaid',
  semi = 'semi-paid',
}

//* for the input form
export const incomeInputSchema = z
  .object({
    nrExtern: z
      .string()
      .max(20, {
        message:
          'The length of your extern number must not exceeded 20 digits',
      })
      .min(1, {
        message:
          'You must have at least one digit for your extern number',
      }),
    komitentID: z.number(),
    dataNeDokument: z.string().transform((str) => new Date(str)),
    shumaTVSH: z.string().transform((str) => Number(str)),
    vleraTVSH: z.string().transform((str) => Number(str)),
    shumaPaTVSH: z.string().transform((str) => Number(str)),
    statusiPagese: z.string(),
    afatiPageses: z.string().transform((str) => new Date(str)),
    dosja: z.string().max(20, {
      message:
        "The length of 'dosja' must be 20 characters or shorter",
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

export type incomeInputColumns = z.infer<typeof incomeInputSchema>;

//* for the edit form
export const incomeEditSchema = z
  .object({
    nrExtern: z
      .string()
      .max(20, {
        message:
          'The length of your extern number must not exceeded 20 digits',
      })
      .min(1, {
        message:
          'You must have at least one digit for your extern number',
      }),
    komitentID: z.number(),
    dataNeDokument: z.string().transform((str) => new Date(str)),
    shumaTVSH: z.number(),
    vleraTVSH: z.number(),
    shumaPaTVSH: z.number(),
    statusiPageses: z.string(),
    afatiPageses: z.string().transform((str) => new Date(str)),
    // imageName: z.string().max(20, {
    //   message: "The length of the image name must be 100 characters or shorter",
    // }),
    imageName: z.string(),
    myFile: z.string(),
    dosja: z.string().max(20, {
      message:
        "The length of 'dosja' must be 20 characters or shorter",
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

export type incomeEditColumns = z.infer<typeof incomeEditSchema>;
