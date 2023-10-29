import Modal from '@/components/atoms/Modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DELETE_BANK_ACCOUNT } from '@/lib/constants/endpoints/finance';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as z from 'zod';

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

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(DELETE_BANK_ACCOUNT, {
        params: {
          bankAccountId: id,
        },
      });
      toast.success('Successfully deleted bank account.');
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);

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
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Trigger asChild>
            <Button
              variant="destructive"
              className="flex items-center justify-center gap-1"
            >
              Delete Client
            </Button>
          </Modal.Trigger>
          <Modal.Content
            title="Delete Client"
            description="Are you sure you want to delete this client?"
          >
            <div className="flex flex-row gap-4">
              <Modal.Close asChild>
                <Button
                  variant="destructive"
                  className="w-max"
                  onClick={() => handleDelete(item.bankAccountId)}
                >
                  Delete
                </Button>
              </Modal.Close>
              <Modal.Close asChild>
                <Button variant="default" className="w-max">
                  Close
                </Button>
              </Modal.Close>
            </div>
          </Modal.Content>
        </Modal>
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
