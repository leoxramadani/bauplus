import React from 'react';
import { FileInput, Plus } from 'lucide-react';
import { DataTable } from '@/components/molecules/table/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTableColumnHeader } from '@/components/molecules/table/DataTableColumnHeader';
const BankAccounts = () => {
  const data: Payment[] = [
    {
      id: '264d5734-66fc-445d-ad5c-2e89c784327a',
      amount: 99,
      status: 'success',
      email: 'gcrinion0@de.vu',
    },
    {
      id: '0efa920e-3da9-4f32-aa76-130328e3b02d',
      amount: 244,
      status: 'processing',
      email: 'fbogeys1@princeton.edu',
    },
    {
      id: '8f36a8b8-fcdd-474a-a361-8cf4e090b9fa',
      amount: 162,
      status: 'pending',
      email: 'gabbiss2@altervista.org',
    },
    {
      id: '0301d3fe-fece-48af-a477-48872658e0b6',
      amount: 195,
      status: 'failed',
      email: 'cmant3@amazon.de',
    },
    {
      id: 'cc78c1b8-b1b4-4454-871b-982ce9d9022e',
      amount: 717,
      status: 'processing',
      email: 'ggewer4@mediafire.com',
    },
  ];
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-row gap-2">
        <Button variant="destructive" className="flex gap-1">
          <Plus size={20} /> <span>Add Bank Account</span>
        </Button>
        <Button variant="outline" className="flex gap-1">
          <FileInput />
          <span>Export</span>
        </Button>
      </div>
      <DataTable data={data} columns={columns} />
    </section>
  );
};

export default BankAccounts;

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
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
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return (
        <div className="text-right font-medium">{formatted}</div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(payment.id)
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


