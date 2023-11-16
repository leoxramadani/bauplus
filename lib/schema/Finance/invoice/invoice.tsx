import Delete from '@/components/atoms/Delete';
import Modal from '@/components/atoms/Modal';
import PDFRenderer from '@/components/atoms/invoice-pdf-creation';
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
import { INVOICE_DELETE } from '@/lib/constants/endpoints/finance/invoice';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as z from 'zod';

export const invoiceSchema = z.object({
  invoiceNumber: z.string(),
  invoiceId: z.string().optional(),
  clientId: z.string(),
  clientCompanyName: z.string().optional(),
  invoiceTypeId: z.string({
    invalid_type_error: 'Invoice Type is required',
    required_error: 'Invoice Type is required',
  }),
  invoiceTypeName: z.string().optional(),
  invoiceDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  totalAmount: z.coerce.number({
    invalid_type_error: 'Total Amount is required',
    required_error: 'Total Amount is required',
  }),
  paidAmount: z.coerce.number({
    invalid_type_error: 'Paid Amount is required',
    required_error: 'Paid Amount is required',
  }),
  invoiceStatusId: z.string({
    invalid_type_error: 'Invoice Status is required',
    required_error: 'Invoice Status is required',
  }),
  invoiceStatusName: z.string().optional(),
  paymentMethodId: z.string({
    invalid_type_error: 'Payment Method is required',
    required_error: 'Payment Method is required',
  }),
  paymentMethodName: z.string().optional(),
  // transactionId: z.string().optional(), //this is the id for the transaction this invoice was created from
});
export type IInvoice = z.infer<typeof invoiceSchema>;

export const invoiceColumnDef: ColumnDef<IInvoice>[] = [
  // {
  //   accessorKey: 'invoiceId',
  //   header: 'Invoice Id',
  // },
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
    accessorKey: 'clientCompanyName',
    header: 'Client',
  },
  {
    accessorKey: 'invoiceNumber',
    header: 'Invoice Number',
  },
  {
    accessorKey: 'invoiceTypeName',
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
    accessorKey: 'invoiceStatusName',
    header: 'Invoice Status',
  },
  {
    accessorKey: 'paymentMethodName',
    header: 'Payment Method',
  },
  // {
  //   accessorKey: 'transactionId',
  //   header: 'transaction Id',
  // },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn item={row.original} />,
  },
];

const ActionsColumn = ({ item }: { item: any }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
    await axios
      .delete(INVOICE_DELETE + `?invoiceId=${id}`)
      .then((res) => {
        if (res.data == false) {
          toast.info("Can't delete a Paid / Partially Paid Invoice");
        } else {
          toast.success('Successfully deleted invoice.');
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        router.push({
          query: {
            ...router.query,
          },
        });
        setDeleting(false);
        setConfirm(false);
      })
      .catch((error) => {
        setDeleting(false);
        toast.error('Error deleting invoice!');
        console.log('Response after error:', error);
        setConfirm(false);
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
        {/* <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(item.invoiceId)
          }
        >
          Copy item id
        </DropdownMenuItem> 
        <DropdownMenuSeparator />*/}
        <DropdownMenuItem onClick={() => handleEdit(item.invoiceId)}>
          Edit row
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Delete Modal */}
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Trigger asChild>
            <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-500 outline-none transition-colors hover:bg-accent  data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              Delete Invoice
            </div>
          </Modal.Trigger>
          <Modal.Content
            title="Delete Invoice"
            description="This will delete the selected invoice! Are you sure you want to continue?"
            className="max-w-xl"
          >
            <Delete
              handleDelete={() => handleDelete(item.invoiceId)}
              deleting={deleting}
              id="id"
            />
          </Modal.Content>
        </Modal>
        <DropdownMenuSeparator />
        <PDFRenderer
          invoiceNumber={item.invoiceNumber}
          companyName={String(item.clientCompanyName)}
          totalAmount={String(item.totalAmount)}
          invoiceDate={new Date(item.invoiceDate)}
          dueDate={new Date(item.dueDate)}
          content="Create as PDF"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
