import Delete from '@/components/atoms/Delete';
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
import { DELETE_EMPLOYEES } from '@/lib/constants/endpoints/employee';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as z from 'zod';

const NAME_REGEX = new RegExp('/^[A-Za-z]+$/'); // only letters

export const employeeSchema = z.object({
  employeeId: z.string().optional(),
  companies: z.object({
    companyName: z.string().optional(),
  }),
  firstName: z
    .string()
    .regex(NAME_REGEX)
    .refine(
      (v) => NAME_REGEX.test(v),
      'First name should only contain letters'
    ),
  lastName: z
    .string()
    .regex(NAME_REGEX)
    .refine(
      (v) => NAME_REGEX.test(v),
      'Last name should only contain letters'
    ),
  email: z.string().email({ message: 'Invalid email address' }),
  dateOfBirth: z.coerce.date(),
  departmentId: z.string(),
  department: z
    .object({
      departmentName: z.string().optional(),
    })
    .optional(),
});

export type IEmployee = z.infer<typeof employeeSchema>;

export const employeeColumnDef: ColumnDef<IEmployee>[] = [
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
  // {
  //   accessorKey: 'employeeId',
  //   header: 'Employee ID',
  // },
  {
    accessorKey: 'companies.companyName',
    header: 'Company Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Date of Birth',
    cell({ row }) {
      const formattedDate = new Date(
        row.getValue('dateOfBirth')
      ).toLocaleDateString('en-US');
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'department.departmentName',
    header: 'Department',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn item={row.original} />,
  },
];

const ActionsColumn = ({ item }: { item: any }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
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
      .delete(DELETE_EMPLOYEES + `?employeeId=${id}`)
      .then((res) => {
        toast.success('Successfully deleted employee.');
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        router.push({
          query: {
            ...router.query,
          },
        });
      })
      .catch((error) => {
        toast.error(
          'There was an error deleting employee! Please try again.'
        );
      });
    setDeleting(false);
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
        <DropdownMenuSeparator />
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Trigger asChild>
            <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-500 outline-none transition-colors hover:bg-accent  data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              Delete Employee
            </div>
          </Modal.Trigger>
          <Modal.Content
            title="Delete Employee"
            description="This will delete the selected employee! Are you sure you want to continue?"
            className="max-w-xl"
          >
            <Delete
              handleDelete={() => handleDelete(item.employeeId)}
              id={item.employeeId}
              deleting={deleting}
            />
          </Modal.Content>
        </Modal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const createEmployeeSchema = z.object({
  employeeId: z.string().optional(),
  companyId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  dateOfBirth: z.coerce.date(),
  departmentId: z.string(),
});

export type ICreateEmployee = z.infer<typeof createEmployeeSchema>;
