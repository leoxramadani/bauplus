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
import { DELETE_LEAVE } from '@/lib/constants/endpoints/hr/leaves';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';
import * as z from 'zod';


const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export enum leaveType {
  casual = "Casual",
  sick = "Sick",
  earned = "Earned",
}
export enum leaveStatus{
  pending="Pending",
  approved="Approved"
}

export enum duration{
  full="Full day",
  multiple="Multiple days",
  fh="First Half",
  sh="Second Half" 
}

export const leavesSchema = z.object({
  // member: z.string(),
  // leaveType: z.string(),
  // status: z.string(),
  // duration: z.string(),
  // date: z.date(),
  // reason: z.string(),
  // // file: z.instanceof(File)
  leaveId: z.string().optional(),
  date: z.coerce.date(),
  employeeId: z.string({required_error:"An employee is required to create a leave!"}),
  employee:z.object({
    firstName: z.string(),
    lastName:z.string(),
  }).optional(),
  leaveType: z.string(),
  leaveStatus:z.string(),
  duration: z.string(),
  reason: z.string(),
  filePath: z.string().optional(),
  companyId:z.string().optional(),
  company:z.object({
    companyId: z.string(),
    companyName:z.string(),
  }).optional(),
  fileAttached: z.string().optional(),
  // file: z
  // .any()
  // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 20MB.`)
  // .refine(
  //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //   "Only .jpg, .jpeg, .png and .webp formats are supported."
  // ).optional(),
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
    accessorKey: 'employee.firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'employee.lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'company.companyName',
    header: 'Company name',
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
  // {
  //   accessorKey: 'employeeId',
  //   header: 'Employee ID',
  // },
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
  // {
  //   accessorKey: 'filePath',
  //   header: 'File Path',
  // },
  // {
  //   accessorKey: 'companyId',
  //   header: 'Company ID',
  // },
  // {
  //   accessorKey: 'isDeleted',
  //   header: 'Is Deleted',
  // },
  // {
  //   accessorKey: 'fileAttached',
  //   header: 'File Attached',
  // },
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
        .delete(DELETE_LEAVE+ `?LeaveI  d=${id}`)
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
            navigator.clipboard.writeText(item.leaveId)
          }
        >
          Copy item id
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleEdit(item.leaveId)}
        >
          Edit row
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleDelete(item.leaveId)}
        >
          Delete Row
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
