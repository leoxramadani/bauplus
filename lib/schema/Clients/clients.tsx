import Modal from '@/components/atoms/Modal';
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
import { DELETE_CLIENT } from '@/lib/constants/endpoints/clients';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';
import { Key, useState } from 'react';
import { toast } from 'react-toastify';
import * as z from 'zod';

export const clientsSchema = z.object({
  clientId: z.string().optional(),
  clientType: z.object({
    clientTypeName: z.string().optional(),
  }),
  firstName: z.string(),
  lastName: z.string(),
  companyName: z.string(),
  clientAccountNumbers: z
    .object({
      accountNumber: z.string().optional(),
      country: z.string().optional(),
    })
    .array(),
  clientBusinessIds: z
    .object({
      businessId: z.string().optional(),
      country: z.string().optional(),
    })
    .array(),
  clientContactInfos: z
    .object({
      email: z.string().optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
    })
    .array(),
});

export type IClients = z.infer<typeof clientsSchema>;

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
    console.log('Delete row with id:', id);

    await axios
      .delete(DELETE_CLIENT + '/' + id)
      .then((res) => {
        toast.success('Successfully deleted a client.');
        console.log('response after delete success =>', res);
      })
      .catch((error) => {
        console.log('Response after error:', error);
      });
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
          onClick={() => navigator.clipboard.writeText(item.clientId)}
        >
          Copy item id
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleEdit(item.clientId)}>
          Edit row
        </DropdownMenuItem>
        <DropdownMenuSeparator />
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
              <Button
                variant="destructive"
                className="w-max"
                onClick={() => handleDelete(item.clientId)}
              >
                Delete
              </Button>
              <Modal.Close asChild>
                <Button variant="default" className="w-max">
                  Close
                </Button>
              </Modal.Close>
            </div>
          </Modal.Content>
        </Modal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const clientsColumnDef: ColumnDef<IClients>[] = [
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
      <div className="flex items-center justify-center gap-2">
        {row.getCanExpand() ? (
          <button
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: 'pointer' },
            }}
          >
            {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
          </button>
        ) : (
          '🔵'
        )}

        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) =>
            row.toggleSelected(!!value)
          }
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'companyName',
    header: 'Company Name',
  },
  {
    accessorKey: 'clientType.clientTypeName',
    header: 'Client Type Name',
  },
  {
    accessorKey: 'clientAccountNumbers.accountNumber',
    header: 'Account Number',
    cell: ({ row }) => (
      <ul>
        {row.original.clientAccountNumbers.map((client, i: Key) => (
          <li key={i}>{client.accountNumber}</li>
        ))}
      </ul>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn item={row.original} />,
  },
];

export const clientSubColumnDef: ColumnDef<IClients>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'clientAccountNumbers.country',
    header: 'Account country',

    cell: ({ row }) => (
      <ul>
        {row.original.clientAccountNumbers.map((client, i: Key) => (
          <li key={i}>{client.country}</li>
        ))}
      </ul>
    ),
  },
  {
    accessorKey: 'clientBusinessIds.businessId',
    header: 'Business Id',

    cell: ({ row }) => (
      <ul>
        {row.original.clientBusinessIds.map((client, i: Key) => (
          <li key={i}>{client.businessId}</li>
        ))}
      </ul>
    ),
  },
  {
    accessorKey: 'clientBusinessIds.country',
    header: 'Business country',

    cell: ({ row }) => (
      <ul>
        {row.original.clientBusinessIds.map((client, i: Key) => (
          <li key={i}>{client.country}</li>
        ))}
      </ul>
    ),
  },
  {
    accessorKey: 'clientContactInfos.email',
    header: 'Email',
    cell: ({ row }) => (
      <ul>
        {row.original.clientContactInfos.map((client, i: Key) => (
          <li key={i}>{client.email}</li>
        ))}
      </ul>
    ),
  },
  {
    accessorKey: 'clientContactInfos.phone',
    header: 'Phone',
    cell: ({ row }) => (
      <ul>
        {row.original.clientContactInfos.map((client, i: Key) => (
          <li key={i}>{client.phone}</li>
        ))}
      </ul>
    ),
  },
  {
    accessorKey: 'clientContactInfos.address',
    header: 'Address',
    cell: ({ row }) => (
      <ul>
        {row.original.clientContactInfos.map((client, i: Key) => (
          <li key={i}>{client.address}</li>
        ))}
      </ul>
    ),
  },
];

export const createClientSchema = z.object({
  clientTypeId: z.string().optional(),
  companyName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  clientAccountNumbers: z.object({
    accountNumber: z.string().optional(),
    country: z.string().optional(),
  }),
  clientBusinessIds: z.object({
    businessId: z.string().optional(),
    country: z.string().optional(),
  }),
  clientContactInfos: z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

export type ICreateClientSchema = z.infer<typeof createClientSchema>;
