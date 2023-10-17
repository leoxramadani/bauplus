import * as z from 'zod';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
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
import axios from 'axios';
import { DELETE_BANK_ACCOUNT } from '@/lib/constants/endpoints/finance';

export const invoiceSchema = z.object({
  accountName: z.string(),
  accountNumber: z.string(),
  bankAccountStatus: z.object({
    statusName: z.string(),
  }),
  bankAccountType: z.object({
    bankAccountTypeName: z.string(),
  }),
  bankName: z.string(),
  currency: z.object({
    currencyCode: z.string(),
    currencyName: z.string(),
  }),
  balance: z.number(),
});

export type IInvoice = z.infer<typeof invoiceSchema>;

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
          className="h-8 w-8 p-0 flex items-center justify-center"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(item.bankAccountId)
          }
        >
          Copy item id
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleEdit(item.bankAccountId)}
        >
          Edit row
        </DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const financeColumnDef: ColumnDef<IInvoice>[] = [
  {
    accessorKey: 'accountName',
    header: 'Account name',
  },
  {
    accessorKey: 'accountNumber',
    header: 'Account number',
  },
  {
    accessorKey: 'bankAccountStatus.statusName',
    header: 'Status',
  },
  {
    accessorKey: 'bankAccountType.bankAccountTypeName',
    header: 'Bank account type',
  },
  {
    accessorKey: 'bankName',
    header: 'Bank name',
  },
  {
    accessorKey: 'currency.currencyCode',
    header: 'Currency code',
  },
  {
    accessorKey: 'currency.currencyName',
    header: 'Currency name',
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn item={row.original} />,
  },
];
