import { PnlTable } from '@/components/molecules/table/PnlTable';
import { IPNL, pnlColumnDef } from '@/lib/schema/pnl/pnl';

const pnl = () => {
  return (
    <div>
      {data && (
        <PnlTable
          data={data}
          columns={pnlColumnDef}
          showPagination={false}
          showViewoptions={false}
          showSearchBar={false}
          showTitle={true}
        />
      )}
    </div>
  );
};

export default pnl;

const data: IPNL[] = [
  {
    netSales: 'development',
    grossMargin: 'Product Launch',
    SGA: 'in progress',
    EBITDA: '€250,000',
    EBIT: '€180,000',
    EBT: '€180,000',
    netIncome: '€180,000',
  },
  {
    netSales: 'development',
    grossMargin: 'Product Launch',
    SGA: 'in progress',
    EBITDA: '€250,000',
    EBIT: '€180,000',
    EBT: '€180,000',
    netIncome: '€180,000',
  },
  {
    netSales: 'development',
    grossMargin: 'Product Launch',
    SGA: 'in progress',
    EBITDA: '€250,000',
    EBIT: '€180,000',
    EBT: '€180,000',
    netIncome: '€180,000',
  },
  {
    netSales: 'development',
    grossMargin: 'Product Launch',
    SGA: 'in progress',
    EBITDA: '€250,000',
    EBIT: '€180,000',
    EBT: '€180,000',
    netIncome: '€180,000',
  },
];
