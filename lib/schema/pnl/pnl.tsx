import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import * as z from 'zod';

export const pnlSchema = z.object({
  netSales: z.string(),
  grossMargin: z.string(),
  SGA: z.string(),
  EBITDA: z.string(),
  EBIT: z.string(),
  EBT: z.string(),
  netIncome: z.string(),
});

export type IPNL = z.infer<typeof pnlSchema>;

export const pnlColumnDef: ColumnDef<IPNL>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean) =>
          // table.toggleAllPageRowsSelected(!!value) //This one only selects the rows of one table
          table.toggleAllRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        {row.getCanExpand() ? (
          <button
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: 'pointer' },
            }}
          >
            {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
          </button>
        ) : (
          '🔵'
        )}

        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) =>
            row.toggleSelected(!!value)
          }
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'grossMargin',
    header: 'Gross Margin',
  },
  {
    accessorKey: 'SGA',
    header: 'SGA',
  },
  {
    accessorKey: 'EBITDA',
    header: 'EBITDA',
  },
  {
    accessorKey: 'EBIT',
    header: 'EBIT',
  },
  {
    accessorKey: 'EBT',
    header: 'EBT',
  },
  {
    accessorKey: 'netIncome',
    header: 'Net Income',
  },
];
