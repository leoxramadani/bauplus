import * as z from "zod";
import { MRT_ColumnDef } from "material-react-table";
import { formatDate } from "../helper/helper";
import useTranslation from "../hooks/useTranslation";
const options: Intl.DateTimeFormatOptions = {
  month: "2-digit", // 2-digit representation of the month
  day: "2-digit", // 2-digit representation of the day
  year: "numeric", // 4-digit representation of the year
};

export const archiveSchema = z.object({
  nr: z.number(),
  osnovenBr: z.string(),
  predmet: z.string(),
  podBroevi: z.string(),
  datumPriem: z.string().transform((str) => formatDate(str)),
  ispracac: z.string(),
  broj: z.string(),
  datum: z.string().transform((str) => formatDate(str)),
  organEdinica_ID: z.string(),
  razvodDatum: z.string().transform((str) => formatDate(str)),
  oznaka_ID: z.string(),
  userName: z.string(),
});

export const createArchiveSchema = z
  .object({
    broj: z.string().max(255).nonempty("Number is required"),
    predmet: z.string().max(255).nonempty("Subject is required"),
    podBroevi: z
      .string()
      .transform((str) => parseInt(str, 10))
      .refine((value) => value >= 1 && value <= 255, {
        message: "Under-numbers must be between 1 and 255",
      }),
    datumPriem: z
      .string()
      .nonempty("Recieving date is required")
      .transform((str) => new Date(str).toLocaleDateString("en-US", options)),
    datum: z
      .string()
      .nonempty("Date is required")
      .transform((str) => new Date(str).toLocaleDateString("en-US", options)),
    ispracac: z.string().max(255).nonempty("Sender is required"),

    organEdinica_ID: z.string(),
    razvojDatum: z
      .string()
      .nonempty("Sending date is required")
      .transform((str) => new Date(str).toLocaleDateString("en-US", options)),
    oznaka_ID: z.string(),
    nr_LlHD: z.number().optional().default(0),
    imageName: z.string().optional().default(""),
    myFile: z.string().optional().default(""),
  })
  .refine(
    (data) => {
      const datumPriemDate = new Date(data.datumPriem);
      const razvojDatumDate = new Date(data.razvojDatum);
      const datumDate = new Date(data.datum);
      return datumPriemDate >= razvojDatumDate && datumPriemDate >= datumDate;
    },
    {
      message: "'Recieving date' must be bigger than 'Sending date' and 'Date'",
      path: ["datumPriem"],
    }
  );
export type CreateArchive = z.infer<typeof createArchiveSchema>;

export const EditArchiveSchema = z
  .object({
    nr: z.string().optional(),
    broj: z.string().nonempty("Number is required"),
    predmet: z.string().max(255).nonempty("Subject is required"),
    podBroevi: z
      .string()
      .min(1)
      .max(255)
      .transform((val) => parseFloat(val)),
    datumPriem: z.string().nonempty("Recieving date is required"),
    datum: z.string().nonempty("Date is required"),
    ispracac: z.string().max(255).nonempty("Sender is required"),
    organEdinica_ID: z.string(),
    razvodDatum: z.string().nonempty("Sending date is required"),
    oznaka_ID: z.string(),
    nr_LLHD: z.number(),
    imageName: z.string(),
    myFile: z.string(),
    osnovenBr: z.string().optional(),
  })
  .refine(
    (data) => {
      const datumPriemDate = new Date(data.datumPriem);
      const razvodDatumDate = new Date(data.razvodDatum);
      const datumDate = new Date(data.datum);
      return datumPriemDate >= razvodDatumDate && datumPriemDate >= datumDate;
    },
    {
      message: "'Recieving date' must be bigger than 'Sending date' and 'Date'",
      path: ["datumPriem"],
    }
  );

export type EditArchive = z.infer<typeof EditArchiveSchema>;

// input fields for the form for add archives page/ archivesFormm component
export const inputFields = [
  { label: "Предмет", name: "predmet", type: "text" },
  { label: "Број", name: "broj", type: "number" },
  { label: "Под Броеви", name: "podBroevi", type: "number" },
  { label: "Датум на Прием", name: "datumPriem", type: "date" },
  { label: "Испраќач", name: "ispracac", type: "text" },
  { label: "Датум", name: "datum", type: "date" },
  { label: "Развод Датум", name: "razvojDatum", type: "date" },
] as const;

export const EditInputFields = [
  { label: "Број", name: "broj", type: "number" },
  { label: "Предмет", name: "predmet", type: "text" },
  { label: "Под Броеви", name: "podBroevi", type: "number" },
  { label: "Датум на Прием", name: "datumPriem", type: "date" },
  { label: "Испраќач", name: "ispracac", type: "text" },
  { label: "Датум", name: "datum", type: "date" },
  { label: "Развод Датум", name: "razvodDatum", type: "date" },
] as const;

export type archieveColumns = z.infer<typeof archiveSchema>;

export const archieveColumns: MRT_ColumnDef<archieveColumns>[] = [
  {
    accessorKey: "nr",
    header: "Number",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "osnovenBr",
    header: "Основен Број",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "predmet",
    header: "Предмет",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "podBroevi",
    header: "Под Броеви",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "datumPriem",
    header: "Датум на Прием",
    Cell: ({ cell }) => formatDate(cell.getValue<string>()),
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "ispracac",
    header: "Испраќач",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "broj",
    header: "Број",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "datum",
    header: "Датум",
    Cell: ({ cell }) => formatDate(cell.getValue<string>()),
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "organEdinica_ID",
    header: "OrganEdinica",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "razvodDatum",
    header: "Развод Датум",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "oznaka_ID",
    header: "Развод Ознака",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
  {
    accessorKey: "userName",
    header: "User",
    Header: ({ header }) => {
      const { t } = useTranslation();
      return <p>{t(header.column.columnDef.header)}</p>;
    },
  },
];

export const lihd_columnss = [
  { field: "nr", headerName: "NR", flex: 1 },
  { field: "imageName", headerName: "Image Name", flex: 2 },
  { field: "shumaTVSH", headerName: "Shuma TVSH" },
  { field: "shumaPaTVSH", headerName: "Shuma Pa TVSH" },
  { field: "vleraTVSH", headerName: "Vlera TVSH" },
  { field: "userName", headerName: "Username" },
  { field: "dataNeDokument", headerName: "Data ne Dokument", flex: 2 },
  { field: "dosja", headerName: "Dosja" },
  { field: "created", headerName: "Krijuar me", flex: 2 },
];
