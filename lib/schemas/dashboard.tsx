import * as z from "zod";
import { MRT_ColumnDef } from "material-react-table";
import { formatDate } from "../helper/helper";
import useTranslation from "../hooks/useTranslation";
import { Box } from "@mui/material";
//*  ***** OUTFLOW
const outflowColumnSchema_filtered = z.object({
  nr: z.number(),
  companyName: z.string(),
  userName: z.string(),
  dataNeDokument: z.string().datetime(),
  tipi: z.string(),
  shumaTVSH: z.number(),
  vleraTVSH: z.number(),
  shumaPaTVSH: z.number(),
});

export type outflowColumns_filtered = z.infer<
  typeof outflowColumnSchema_filtered
>;

export const outflowColumns_filtered: MRT_ColumnDef<outflowColumns_filtered>[] =
  [
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
      accessorKey: "userName",
      header: "Username",
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

//*  ***** INFLOW
export const inflowColumnSchema_filtered = z.object({
  nr: z.number(),
  companyName: z.string(),
  nrFatures: z.string(),
  dataNeDokument: z.string().datetime(),
  afatiPageses: z.string().transform((str) => new Date(str)),
  statusiPageses: z.string(),
});
export type inflowColumns_filtered = z.infer<
  typeof inflowColumnSchema_filtered
>;

export const inflowColumns_filtered: MRT_ColumnDef<inflowColumns_filtered>[] = [
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
    accessorKey: "nrFatures",
    header: "Invoice number",
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
    accessorKey: "afatiPageses",
    header: "Payment deadline",
    Cell: ({ cell }) => formatDate(cell.getValue<string>()),
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "statusiPageses",
    header: "Payment status",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
    Cell: ({ cell }) => (
      <Box
        component="span"
        sx={(theme) => ({
          backgroundColor:
            cell.getValue<string>() == "unpaid"
              ? theme.palette.error.light
              : cell.getValue<string>() == "semi-paid"
              ? theme.palette.warning.light
              : cell.getValue<string>() == "paid"
              ? theme.palette.success.light
              : theme.palette.warning.light,
          borderRadius: "0.25rem",
          color: "#fff",
          maxWidth: "9ch",
          p: "0.25rem",
        })}
      >
        {cell.getValue<number>()?.toLocaleString?.("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </Box>
    ),
  },
];

//* ***** Llogarit hyrese-dalese

const llogHyreseDaleseColumnSchema_filtered = z.object({
  nr: z.number(),
  companyName: z.string(),
  tipi: z.string(),
  shumaTVSH: z.number(),
  shumaPaTVSH: z.number(),
  vleraTVSH: z.string(),
  dataNeDokument: z.string().datetime(),
});

export type llhdColumns_filtered = z.infer<
  typeof llogHyreseDaleseColumnSchema_filtered
>;

export const llhdColumns_filtered: MRT_ColumnDef<llhdColumns_filtered>[] = [
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
  {
    accessorKey: "dataNeDokument",
    header: "Date in document",
    Cell: ({ cell }) => formatDate(cell.getValue<string>()),
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
];
