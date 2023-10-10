import * as z from 'zod';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

export const expensesSchema = z.object({
  itemName: z.string(),
  currency: z.string(),
  exchangeRate: z.coerce.number(),
  price: z.coerce.number(),
  purchaseDate: z.string(),
  employee: z.string({
    required_error: 'Please select an employee.',
  }),
  project: z.string(),
  expenseCategory: z.string(),
  purchasedFrom: z.string(),
  bankAccount: z.string(),
  description: z.string(),
});
export type expensesType = z.infer<typeof expensesSchema>;

export const expensesDef: ColumnDef<expensesType>[] = [
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
    accessorKey: 'itemName',
    header: 'Item Name',
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
  },
  {
    accessorKey: 'exchangeRate',
    header: 'Exchange Rate',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'purchaseDate',
    header: 'Purchase Date',
  },
  {
    accessorKey: 'employee',
    header: 'Employee',
  },
  {
    accessorKey: 'project',
    header: 'Project',
  },
  {
    accessorKey: 'expenseCategory',
    header: 'Expense Category',
  },
  {
    accessorKey: 'purchasedFrom',
    header: 'Purchased From',
  },
  {
    accessorKey: 'bankAccount',
    header: 'Bank Account',
  },
  {
    accessorKey: 'description',
    header: 'Description',
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
                navigator.clipboard.writeText(payment.itemName)
              }
            >
              Copy item name
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
