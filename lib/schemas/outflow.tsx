import * as z from "zod";
import { MRT_ColumnDef } from "material-react-table";
import useTranslation from "../hooks/useTranslation";
import { formatDate } from "../helper/helper";

export const outflowSchema = z.object({
  nr: z.number(),
  companyName: z.string(),
  komitentID: z.number(),
  dataNeDokument: z.string().transform((str) => new Date(str)),
  shumaTVSH: z.number(),
  vleraTVSH: z.number(),
  shumaPaTVSH: z.number(),
  tipi: z.string(),
});

export type outflowColumns = z.infer<typeof outflowSchema>;

export const outflowColumns: MRT_ColumnDef<outflowColumns>[] = [
  {
    accessorKey: "nr",
    header: "Number",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "companyName",
    header: "Company name",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "dataNeDokument",
    header: "Date in document",
    Cell: ({ cell }) => formatDate(cell.getValue<string>()),
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "tipi",
    header: "Transaction type",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "shumaPaTVSH",
    header: "Sum without TAX",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "vleraTVSH",
    header: "Value of TAX",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "shumaTVSH",
    header: "Sum with TAX",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
];
