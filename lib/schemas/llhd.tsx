import { MRT_ColumnDef } from 'material-react-table';
import * as z from 'zod';
import { formatDate } from '../helper/helper';
import useTranslation from '../hooks/useTranslation';

const columnSchema_filtered = z.object({
  nr: z.number(),
  companyName: z.string(),
  tipi: z.string(),
  shumaTVSH: z.number(),
  shumaPaTVSH: z.number(),
  vleraTVSH: z.string(),
  dataNeDokument: z.string().datetime(),
});

export type llhd_filtered = z.infer<typeof columnSchema_filtered>;

export const llhd_filtered: MRT_ColumnDef<llhd_filtered>[] = [
  {
    accessorKey: 'nr',
    header: 'Number',
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
    accessorKey: 'tipi',
    header: 'Transaction type',
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
    accessorKey: 'dataNeDokument',
    header: 'Date in document',
    Cell: ({ cell }) => formatDate(cell.getValue<string>()),
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
];
