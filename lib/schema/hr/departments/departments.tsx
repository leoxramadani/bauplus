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
import { DELETE_DEPARTMENT } from '@/lib/constants/endpoints/hr/departments';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { z } from 'zod';

export const DepartmentSchema = z.object({
  departmentId: z.string().optional(),
  departmentName: z.string({
    required_error: 'Department name is required',
  }),
  companyId: z.string({
    required_error: 'Company Id is required',
  }),
  parentDepartmentId: z.string().optional(),
  company: z
    .object({
      companyName: z.string().optional(),
    })
    .optional()
    .nullable(),
  parentDepartment: z
    .object({
      departmentName: z.string().optional(),
    })
    .optional()
    .nullable(),
});

export type IDepartment = z.infer<typeof DepartmentSchema>;

export const departmentColumnDef: ColumnDef<IDepartment>[] = [
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
  // {
  //   id: 'departmentId',
  //   header: 'Department Id',
  // },
  {
    accessorKey: 'departmentName',
    header: 'Department Name',
  },
  {
    accessorKey: 'company.companyName',
    header: 'Company Name',
  },
  {
    accessorKey: 'parentDepartment.departmentName',
    header: 'Parent Department Name',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn item={row.original} />,
  },
];

const ActionsColumn = ({ item }: { item: any }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
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
    await axios
      .delete(DELETE_DEPARTMENT + `?Id=${id}`)
      .then((res) => {
        toast.success('Successfully deleted department.');
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        router.push({
          query: {
            ...router.query,
          },
        });
      })
      .catch((error) => {
        console.log('Response after error:', error);
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
            navigator.clipboard.writeText(item.departmentId)
          }
        >
          Copy item id
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleEdit(item.departmentId)}
        >
          Edit row
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Trigger asChild>
            <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-500 outline-none transition-colors hover:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              Delete Department
            </div>
          </Modal.Trigger>
          <Modal.Content
            title="Delete Department"
            description="Are you sure you want to delete this department?"
            className="w-full max-w-lg"
          >
            <div className="flex flex-row gap-2">
              <Modal.Close asChild>
                <Button
                  variant="destructive"
                  className="w-max"
                  onClick={() => handleDelete(item.departmentId)}
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
