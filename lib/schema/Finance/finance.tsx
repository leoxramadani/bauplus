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
  invoiceNumber: z.number(),
  invoiceDate: z.date(),
  dueDate: z.date(),
  currency: z.string(),
  exchangeRate: z.string(),
  client: z.string(),
  project: z.string(),
  calculateTax: z.string(),
  bankAccount: z.string(),
  billingAddress: z.string(),
  shippingAddress: z.string(),
  generatedBy: z.string(),
});

export type IInvoiceSchema = z.infer<typeof invoiceSchema>;

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
            navigator.clipboard.writeText(item.employeeId)
          }
        >
          Copy item id
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleEdit(item.employeeId)}>
          Edit row
        </DropdownMenuItem>

        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const financeColumnDef: ColumnDef<IInvoiceSchema>[] = [
  {
    accessorKey: 'invoiceNumber',
    header: 'Invoice Number',
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
    accessorKey: 'currency',
    header: 'Currency',
  },
  {
    accessorKey: 'exchangeRate',
    header: 'Exchange Rate',
  },
  {
    accessorKey: 'client',
    header: 'Client',
  },
  {
    accessorKey: 'project',
    header: 'Project',
  },
  {
    accessorKey: 'calculateTax',
    header: 'Calculate Tax',
  },
  {
    accessorKey: 'bankAccount',
    header: 'Bank Account',
  },
  {
    accessorKey: 'billingAddress',
    header: 'Billing Address',
  },
  {
    accessorKey: 'shippingAddress',
    header: 'Shipping Address',
  },
  {
    accessorKey: 'generatedBy',
    header: 'Generated By',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn item={row.original} />,
  },
];
export const createBankAccountSchema = z.object({
  companyId: z.string().optional(),
  employeeId: z.string(),
  currencyId: z.string(), // Remove .optional() here
  bankAccountTypeId: z.string(),
  bankAccountStatusId: z.string(),
  accountName: z.string(),
  bankName: z.string(),
  accountNumber: z.string(),
  balance: z.coerce.number(),
});

export type IcreateBankAccountSchema = z.infer<
  typeof createBankAccountSchema
>;

export const bankAccountSchemaCash = z.object({
  cashAccountHolderName: z.string(),
  cashCurrency: z.string(),
  cashContactNumber: z.string(),
  cashOpeningBalance: z.number(),
  cashStatus: z.string(),
});
export type IBankAccountCash = z.infer<typeof bankAccountSchemaCash>;
