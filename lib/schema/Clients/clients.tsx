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
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';
import { Key } from 'react';
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
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this client?'
    );
    if (confirmDelete) {
      console.log('Delete row with id:', id);

      await axios
        .delete(DELETE_CLIENT + '/'+id)
        .then((res) => {
          toast.success("Successfully deleted a client.");
          console.log('response after delete success =>', res);
        })
        .catch((error) => {
          console.log('Response after error:', error);
        });
    }
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
            navigator.clipboard.writeText(item.clientId)
          }
        >
          Copy item id
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleEdit(item.clientId)}>
          Edit row
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleDelete(item.clientId)}
        >
          Delete Row
        </DropdownMenuItem>
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
    accessorKey: 'clientAccountNumbers.country',
    header: 'Country',

    cell: ({ row }) => (
      <ul>
        {row.original.clientAccountNumbers.map((client, i: Key) => (
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
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn item={row.original} />,
  },
];

export const createClientSchema = z.object({
  clientTypeId: z.string().optional(),
  companyName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  accountNumber: z.string().optional(),
  country: z.string().optional(),
  email:z.string().optional(),
  phone:z.string().optional(),
  address:z.string().optional()
});

export type ICreateClientSchema = z.infer<
typeof createClientSchema>;
