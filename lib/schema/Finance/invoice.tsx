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
  invoiceId: z.string(),
  invoiceType: z.string(),
  invoiceNumber: z
    .string()
    .max(20, {
      message:
        'The length of your invoice number must not exceeded 20 digits',
    })
    .min(1, {
      message:
        'You must have at least a digit for your invoice number',
    }),
  invoiceFor: z.coerce.number(),
  dateInDocument: z.coerce.date(),
  sumWithTax: z.coerce.number(),
  taxValue: z.coerce.number(),
  sumWithoutTax: z.coerce.number(),
  dueDate: z.coerce.date(),
  invoiceStatus: z.string(),
  dossier: z.string().max(20, {
    message:
      "The length of 'dossier' must be 20 characters or shorter",
  }),
  description: z.string().max(150, {
    message:
      'The length of description must be 150 characters or shorter',
  }),
});

export type IInvoice = z.infer<typeof invoiceSchema>;

export const invoiceColumnDef: ColumnDef<IInvoice>[] = [
  {
    accessorKey: 'invoiceNumber',
    header: 'Invoice Number',
  },
  {
    accessorKey: 'invoiceType',
    header: 'Invoice Type',
  },
  {
    accessorKey: 'dateInTheDocument',
    header: 'Date in document',
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
    accessorKey: 'invoiceFor',
    header: 'Invoice For',
  },
  {
    accessorKey: 'sumWithTax',
    header: 'Sum With Tax',
  },
  {
    accessorKey: 'taxValue',
    header: 'Tax Value',
  },
  {
    accessorKey: 'sumWithoutTax',
    header: 'Sum Without Tax',
  },
  {
    accessorKey: 'invoiceStatus',
    header: 'Invoice Status',
  },
  {
    accessorKey: 'dossier',
    header: 'Dossier',
  },
  {
    accessorKey: 'description',
    header: 'Description',
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
