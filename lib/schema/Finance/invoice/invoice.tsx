import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';
import * as z from 'zod';

export const invoiceSchema = z.object({
  invoiceId: z.string().optional(),
  clientId: z.string(),
  // companyID: z.string(), // this is the id for the company
  companyName: z.string().optional(),
  invoiceTypeId: z.string(), //this is the id for the invoice type
  // invoiceTypeName: z.string().optional(),
  invoiceDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  totalAmount: z.coerce.number(),
  paidAmount: z.coerce.number(),
  invoiceStatusId: z.string(), //this is the id for the invoice type
  // invoiceStatus: z.string().optional(),
  paymentMethodId: z.string(), //this is the id for the payment method
  paymentMethod: z.string().optional(),
  // transactionId: z.string().optional(), //this is the id for the transaction this invoice was created from
});
export type IInvoice = z.infer<typeof invoiceSchema>;

export const invoiceColumnDef: ColumnDef<IInvoice>[] = [
  {
    accessorKey: 'invoiceID',
    header: 'Invoice Id',
  },
  {
    accessorKey: 'clientId',
    header: 'Client Id',
  },
  {
    accessorKey: 'invoiceType',
    header: 'Invoice Type',
  },
  {
    accessorKey: 'invoiceDate',
    header: 'Invoice Date',
    cell({ row }) {
      const formatedDate = new Date(
        row.getValue('invoiceDate')
      ).toLocaleDateString('en-GB');
      return <div>{formatedDate}</div>;
    },
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell({ row }) {
      const formatedDate = new Date(
        row.getValue('dueDate')
      ).toLocaleDateString('en-GB');
      return <div>{formatedDate}</div>;
    },
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Amount',
  },
  {
    accessorKey: 'paidAmount',
    header: 'Paid Amount',
  },
  {
    accessorKey: 'invoiceStatusId',
    header: 'invoice Status Id',
  },
  {
    accessorKey: 'paymentMethodId',
    header: 'payment Method Id',
  },
  {
    accessorKey: 'transactionId',
    header: 'transaction Id',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn item={row.original} />,
  },
];

const ActionsColumn = ({ item }: { item: any }) => {
  const router = useRouter();

  const handleEdit = (id: string) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    router.push({
      query: {
        ...router.query,
        id: id,
      },
    });
  };

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
            navigator.clipboard.writeText(item.invoiceId)
          }
        >
          Copy item id
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleEdit(item.invoiceId)}>
          Edit row
        </DropdownMenuItem>

        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
