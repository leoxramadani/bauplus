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
import {
  DELETE_CLIENT,
  GET_ALL_CLIENTS,
} from '@/lib/constants/endpoints/clients';
import useData from '@/lib/hooks/useData';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { ChevronDown, ChevronUp, Clipboard, MoreHorizontal, Pen, Trash } from 'lucide-react';
import { useRouter } from 'next/router';
import { Key, useState } from 'react';
// import { toast } from 'react-toastify';
import { toast } from 'sonner';

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
      accountNumber: z.string(),
      country: z.string().optional(),
    })
    .array(),
  clientBusinessIds: z
    .object({
      businessId: z.string(),
      country: z.string().optional(),
    })
    .array(),
  clientContactInfos: z
    .object({
      email: z.string().optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
    })
    .array()
    .optional(),
});

export type IClients = z.infer<typeof clientsSchema>;

const ActionsColumn = ({ item }: { item: any }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { refetch: refetchClients } = useData<IClients[]>(
    ['clients'],
    GET_ALL_CLIENTS
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
    setIsLoading(true);
    console.log('Delete row with id:', id);

    await axios
      .delete(DELETE_CLIENT + '/' + id)
      .then(() => {
        toast.success('Successfully deleted a client.');
        setIsLoading(false);
        refetchClients();
      })
      .catch(() => {
        toast.error('Error deleting client!');
        setIsLoading(false);
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
          className='flex items-center gap-1'
        >
           <Clipboard size={14} /> Copy item id
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={() => handleEdit(item.clientId)} className='flex gap-1 items-center'>
        <Pen size={14} /> Edit
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
        {/* Delete Modal */}
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Trigger asChild>
            <div className="relative gap-1 flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-500 outline-none transition-colors hover:bg-accent  data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <Trash size={14} /> Delete
            </div>
          </Modal.Trigger>
          <Modal.Content
            title="Delete Client"
            description="Are you sure you want to delete this client?"
            className="max-w-xl"
          >
            <div className="flex flex-row gap-2">
              <Modal.Close asChild>
                <Button
                  variant="destructive"
                  className="w-max"
                  loading={isLoading}
                  disabled={isLoading}
                  onClick={() => handleDelete(item.clientId)}
                >
                  Delete
                </Button>
              </Modal.Close>
              <Modal.Close asChild>
                <Button variant="outline" className="w-max">
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
            {row.getIsExpanded() ? (
              <ChevronUp className="text-slate-400" />
            ) : (
              <ChevronDown className="text-slate-400" />
            )}
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
        {row.original.clientAccountNumbers?.map((client, i: Key) => (
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
        {row.original.clientBusinessIds?.map((client, i: Key) => (
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
        {row.original.clientBusinessIds?.map((client, i: Key) => (
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
        {row.original.clientContactInfos?.map((client, i: Key) => (
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
        {row.original.clientContactInfos?.map((client, i: Key) => (
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
        {row.original.clientContactInfos?.map((client, i: Key) => (
          <li key={i}>{client.address}</li>
        ))}
      </ul>
    ),
  },
];

export const createClientSchema = z.object({
  clientTypeId: z.string(),
  companyName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  clientAccountNumbers: z
    .object({
      accountNumber: z
        .string()
        .length(15, {
          message:
            'The account number field must have exactly 15 digits',
        })
        .optional(),
      country: z.string().optional(),
    })
    .array()
    .optional(),
  clientBusinessIds: z
    .object({
      businessId: z.string().optional(),
      country: z.string().optional(),
    })
    .array()
    .optional(),
  clientContactInfos: z
    .object({
      email: z.string().optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
    })
    .array()
    .optional(),
});

export type ICreateClientSchema = z.infer<typeof createClientSchema>;

export const accountDetailSchema = z
  .object({
    clientAccountNumbers: z.object({
      id: z.string().optional(),
      accountNumber: z.coerce
        .string()
        // .min(1, 'Account Number is required'),
        .length(15, {
          message:
            'The account number field must have exactly 15 digits',
        }),
      country: z.string().min(1, 'Country is required'),
    }),
    accountDetails: z
      .array(
        z.object({
          id: z.string().optional(),
          accountNumber: z.string().length(15, {
            message:
              'The account number field must have exactly 15 digits',
          }),
          country: z.string(),
        })
      )
      .optional(),
  })
  .refine(
    ({ clientAccountNumbers, accountDetails }) => {
      const accountNumberExists = accountDetails?.some(
        (account) =>
          account.accountNumber ===
            String(clientAccountNumbers.accountNumber) &&
          account.id !== clientAccountNumbers.id
      );
      return !accountNumberExists;
    },
    {
      message: 'Account number must be unique',
      path: ['clientAccountNumbers', 'accountNumber'],
    }
  );

export type iCreateAccountDetail = z.infer<
  typeof accountDetailSchema
>;

export const businessDetailSchema = z
  .object({
    clientBusinessIds: z.object({
      id: z.string().optional(),
      businessId: z.coerce
        .string()
        .min(1, 'Business number is required'),
      country: z.string().min(1, 'Country is required'),
    }),
    businessDetails: z
      .array(
        z.object({
          id: z.string().optional(),
          businessId: z.string(),
          country: z.string(),
        })
      )
      .optional(),
  })
  .refine(
    ({ clientBusinessIds, businessDetails }) => {
      const accountNumberExists = businessDetails?.some(
        (account) =>
          account.businessId ===
            String(clientBusinessIds.businessId) &&
          account.id !== clientBusinessIds.id
      );
      return !accountNumberExists;
    },
    {
      message: 'Business number must be unique',
      path: ['clientBusinessIds', 'businessId'],
    }
  );

export type ICreateBusiness = z.infer<typeof businessDetailSchema>;

export const clientDetailSchema = z.object({
  clientContactInfos: z.object({
    id: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
  clientDetails: z
    .array(
      z.object({
        id: z.string().optional(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
      })
    )
    .optional(),
});

export type ICreateClientInfo = z.infer<typeof clientDetailSchema>;
