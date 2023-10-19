import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@radix-ui/react-checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import * as z from 'zod';

export const estimatesSchema = z.object({
  id: z.string().optional(),
  estimateNumber: z.coerce.number(),
  validTill: z.date({
    required_error: 'A date is required.',
  }),
  currency: z.string(),
  client: z.string(),
  calculateTax: z.string(),
  description: z.string(),
  product: z.string(),

  // purchaseDate: z.string(),
  // employee: z.string({
  //   required_error: 'Please select an employee.',
  // }),
  // project: z.string(),
  // expenseCategory: z.string(),
  // purchasedFrom: z.string(),
  // bankAccount: z.string(),
});
export type estimatesType = z.infer<typeof estimatesSchema>;

export const estimatesDef: ColumnDef<estimatesType>[] = [
  {
    id: 'id',
  },
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
    accessorKey: 'estimateNumber',
    header: 'Estimate Number',
  },
  {
    accessorKey: 'validTill',
    header: 'Valid Till',
    cell({ row }) {
      const formattedDate = new Date(
        row.getValue('validTill')
      ).toLocaleDateString('en-GB');
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
  },
  {
    accessorKey: 'client',
    header: 'Client',
  },
  {
    accessorKey: 'calculateTax',
    header: 'Calculate Tax',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'product',
    header: 'Product',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const estimate = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 items-center justify-center p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(estimate.id!)
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
