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
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';
import * as z from 'zod';

export const leavesSchema = z.object({
  // member: z.string(),
  // leaveType: z.string(),
  // status: z.string(),
  // duration: z.string(),
  // date: z.date(),
  // reason: z.string(),
  // // file: z.instanceof(File)
  leaveId: z.string(),
  date: z.string(),
  employeeId: z.string(),
  leaveType: z.string(),
  leaveStatus: z.string(),
  duration: z.string(),
  reason: z.string(),
  filePath: z.string(),
  companyId: z.string(),
  isDeleted: z.string(),
  fileAttached: z.string(),
});
export type ILeaves = z.infer<typeof leavesSchema>;

export const leavesColumnDef: ColumnDef<ILeaves>[] = [
  // {
  //   accessorKey: 'LeaveId',
  //   header: 'Leave ID',
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
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'employeeId',
    header: 'Employee ID',
  },
  {
    accessorKey: 'leaveType',
    header: 'Leave Type',
  },
  {
    accessorKey: 'leaveStatus',
    header: 'Leave Status',
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
  },
  {
    accessorKey: 'filePath',
    header: 'File Path',
  },
  {
    accessorKey: 'companyId',
    header: 'Company ID',
  },
  {
    accessorKey: 'isDeleted',
    header: 'Is Deleted',
  },
  {
    accessorKey: 'fileAttached',
    header: 'File Attached',
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
    // if (confirmDelete) {
    //   console.log('Delete row with id:', id);

    //   await axios
    //     .delete(DELETE_DEPARTMENT + `?Id=${id}`)
    //     .then((res) => {
    //       console.log('response after delete success =>', res);
    //     })
    //     .catch((error) => {
    //       console.log('Response after error:', error);
    //     });
    // }
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
