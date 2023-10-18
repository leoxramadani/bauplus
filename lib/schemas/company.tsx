import * as z from 'zod';
import { MRT_ColumnDef } from 'material-react-table';
import useTranslation from '../hooks/useTranslation';
const columnsSchema = z.object({
  komintenti_ID: z.number(),
  company_Name: z.string(),
  adresa: z.string(),
  email: z.string(),
  celular: z.string(),
  embs: z.string(),
  nrTatimore: z.string(),
  zhiroLlogaria1: z.string(),
});

type komitentetColumns = z.infer<typeof columnsSchema>;

export const komitentetColumns: MRT_ColumnDef<komitentetColumns>[] = [
  {
    accessorKey: 'komintenti_ID',
    header: 'Company ID',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'company_Name',
    header: 'Company name',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'adresa',
    header: 'Address',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'celular',
    header: 'Cellular',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'embs',
    header: 'UINS',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'nrTatimore',
    header: 'UTN',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'zhiroLlogaria1',
    header: 'Тransaction account 1',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
];

export const komitentetColumnsSchema = z.object({
  company_Name: z.string(),
  adresa: z.string(),
  tel: z
    .string()
    .refine(
      (v) => /^\d+$/.test(v),
      'This should only contain numbers'
    )
    .or(z.literal('')),
  celular: z
    .string()
    .refine(
      (v) => /^\d+$/.test(v),
      'This should only contain numbers'
    )
    .or(z.literal('')),
  email: z
    .string()
    .email('Please provide a valid email address')
    .or(z.literal('')),
  web: z.string().or(z.literal('')),
  nrTatimore: z
    .string()
    .refine(
      (v) => /^\d+$/.test(v),
      'This should only contain numbers'
    )
    .or(z.literal('')),
  zhiroLlogaria1: z
    .string()
    .refine(
      (v) => /^\d+$/.test(v),
      'This should only contain numbers'
    )
    .or(z.literal('')),
  zhiroLlogaria2: z
    .string()
    .refine(
      (v) => /^\d+$/.test(v),
      'This should only contain numbers'
    )
    .or(z.literal('')),
  embs: z
    .string()
    .refine(
      (v) => /^\d+$/.test(v),
      'This should only contain numbers'
    )
    .or(z.literal('')),
});

export type KomitentetInput = z.infer<typeof komitentetColumnsSchema>;
