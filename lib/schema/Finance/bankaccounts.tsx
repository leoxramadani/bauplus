import Delete from '@/components/atoms/Delete';
import Modal from '@/components/atoms/Modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  DELETE_BANK_ACCOUNT,
  GET_ALL_BANKACCOUNTS,
} from '@/lib/constants/endpoints/finance';
import useData from '@/lib/hooks/useData';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as z from 'zod';

export const bankAccountSchema = z.object({
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

export type IBank = z.infer<typeof bankAccountSchema>;

const ActionsColumn = ({ item }: { item: any }) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const { refetch: bankRefetch } = useData<IBank[]>(
    ['bank_accounts'],
    GET_ALL_BANKACCOUNTS
  );

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
    setDeleting(true);
    try {
      await axios.delete(DELETE_BANK_ACCOUNT, {
        params: {
          bankAccountId: id,
        },
      });
      toast.success('Bank account deleted successfully.');
      bankRefetch();
    } catch (error) {
      console.log(error);
    }
    setDeleting(false);
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
          Edit
        </DropdownMenuItem>
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Trigger asChild>
            <div className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-500 outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              Delete
            </div>
          </Modal.Trigger>
          <Modal.Content
            title="Delete Bank Account"
            description="This will delete the selected bank account! Are you sure you want to continue?"
            className=" max-w-xl"
          >
            <Delete
              handleDelete={() => handleDelete(item.bankAccountId)}
              id={item.bankAccountId}
              deleting={deleting}
            />
          </Modal.Content>
        </Modal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const bankAccountColumnDef: ColumnDef<IBank>[] = [
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
    accessorKey: 'accountName',
    header: 'Account name',
  },
  {
    accessorKey: 'accountNumber',
    header: 'Account number',
  },
  // {
  //   accessorKey: 'bankAccountStatus.statusName',
  //   header: 'Status',
  // },
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
    accessorKey: 'bankAccountStatus.statusName',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        variant={`${
          row.original.bankAccountStatus.statusName == 'Active'
            ? 'success'
            : 'destructive'
        }`}
        className=" cursor-none"
      >
        {row.original.bankAccountStatus.statusName}
      </Badge>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn item={row.original} />,
  },
];
