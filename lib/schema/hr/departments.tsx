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
import * as z from 'zod';

export const DepartmentSchema = z.object({
  departmentId: z.string().optional(),
  departmentName: z.string({
    required_error: 'Department name is required',
  }),
  companyId: z.string({
    required_error: 'Company Id is required',
  }),
  parentDepartmentId: z.string(),
  company: z
    .object({
      companyName: z.string().optional(),
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
    accessorKey: 'parentDepartmentId',
    header: 'Parent Department Id',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn item={row.original} />,
  },
];

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
      'Are you sure you want to delete this invoice?'
    );
    if (confirmDelete) {
      console.log('Delete row with id:', id);

      await axios
        .delete(DELETE_DEPARTMENT + `?Id=${id}`)
        .then((res) => {
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
        <DropdownMenuItem
          onClick={() => handleDelete(item.departmentId)}
        >
          Delete Row
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
