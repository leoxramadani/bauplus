import { MRT_ColumnDef } from 'material-react-table';
import * as z from 'zod';
import useTranslation from '../hooks/useTranslation';

export const activitySchema = z.object({
  nr: z.number(),
  activity: z.string(),
  act_Description: z.string(),
  userName: z.string(),
  companyName: z.string(),
  datetimeCreated: z.string(),
});

export type columns = z.infer<typeof activitySchema>;

export const columns: MRT_ColumnDef<columns>[] = [
  {
    accessorKey: 'nr',
    header: 'Number',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'activity',
    header: 'Activity',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'act_Description',
    header: 'Description',
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
    accessorKey: 'companyName',
    header: 'Company name',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: 'datetimeCreated',
    header: 'Created at',
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
];
