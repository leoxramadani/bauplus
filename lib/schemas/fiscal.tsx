import * as z from 'zod';
import { MRT_ColumnDef } from 'material-react-table';
import { formatDate } from '../helper/helper';
import useTranslation from '../hooks/useTranslation';

//#region  columns
export const fiscalSchema = z.object({
  nr: z.number(),
  nrExtern: z.string(),
  companyName: z.string(),
  userName: z.string(),
  dataNeDokument: z.string().transform((str) => new Date(str)),
  startDate: z.string().transform((str) => new Date(str)),
  dataKohaRec: z.string().transform((str) => new Date(str)),
  shumaPaTVSH: z.number(),
  vleraTVSH: z.number(),
  shumaTVSH: z.number(),
});

export type fiscalColumns = z.infer<typeof fiscalSchema>;

export const fiscalColumns: MRT_ColumnDef<fiscalColumns>[] = [
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
    sortingFn: 'date',
    // Filter: ({ column }) => {
    //   console.log("inside column: \n", column.getCanFilter());
    //   return (
    //     <>
    //       <LocalizationProvider dateAdapter={AdapterDayjs}>
    //         <DatePicker
    //           onChange={(newValue) => {
    //             column.setFilterValue(newValue);
    //             console.log("new values :", newValue);
    //             console.log("get :", column.getFilterValue());
    //           }}
    //           slotProps={{
    //             textField: {
    //               sx: { minWidth: "130px" },
    //               variant: "standard",
    //             },
    //           }}
    //           value={column.getFilterValue()}
    //         />
    //       </LocalizationProvider>
    //     </>
    //   );
    // },
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

export const fiscalInputSchema = z.object({
  nrExtern: z.string().length(4, {
    message: 'The extern field must have exactly 4 digits',
  }),
  komitentID: z.number(),
  shumaTVSH: z.string().transform((str) => Number(str)),
  vleraTVSH: z.string().transform((str) => Number(str)),
  shumaPaTVSH: z.number(),
  dataNeDokument: z.string().transform((str) => new Date(str)),
});

export type fiscalInputColumns = z.infer<typeof fiscalInputSchema>;

export const fiscalEditSchema = z.object({
  nrExtern: z.string().length(4, {
    message: 'The extern field must have exactly 4 digits',
  }),
  komitentID: z.number(),
  shumaPaTVSH: z.number(),
  shumaTVSH: z.number(),
  vleraTVSH: z.number(),
  dataNeDokument: z.string().transform((str) => new Date(str)),
});

export type fiscalEditColumns = z.infer<typeof fiscalEditSchema>;
