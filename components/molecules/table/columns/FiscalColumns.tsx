import { ColumnDef } from '@tanstack/react-table';

export type TFiscalColumns = {
  // id: string;
  // amount: number;
  // status: 'pending' | 'processing' | 'success' | 'failed';
  // email: string;
  nr:number;
  userName:string;
  companyName:string;
  dataNeDokument:string;
  shumaPaTVSH : number;
  vleraTVSH : number;
  shumaTVSH : number;
  nrLHD:number,
  dataKohaRec:string;
  nrExtern:string;
};

export const FiscalColumns: ColumnDef<TFiscalColumns>[] = [ 
  {
    accessorKey: 'nr',
    header: 'Number',
  },
  {
    accessorKey: 'userName',
    header: 'Username',
  },
  {
    accessorKey: 'nrExtern',
    header: 'Extern number',
  },
  {
    accessorKey: 'companyName',
    header: 'Company Name',
  },
  {
    accessorKey: 'dataNeDokument',
    header: 'Data',
  },
  {
    accessorKey: 'shumaPaTVSH',
    header: 'Sum without tax',
  },
  {
    accessorKey: 'vleraTVSH',
    header: 'Value of tax',
  },
  {
    accessorKey: 'shumaTVSH',
    header: 'Sum with tax',
  },
  {
    accessorKey: 'nrLHD',
    header: 'Number of LHD',
  },
  {
    accessorKey: 'dataKohaRec',
    header: 'Recorded date time',
  },
]
