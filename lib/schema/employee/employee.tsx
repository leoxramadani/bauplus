import * as z from 'zod';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';

export const employeeSchema = z.object({
  employeeId: z.string().optional(),
  companyId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  dateOfBirth: z.date(),
  departmentId: z.string(),
});

export type EmployeeType = z.infer<typeof employeeSchema>;

const ActionsColumn = ({ expenses }: { expenses: any }) => {
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
          className="h-8 w-8 p-0 flex items-center justify-center"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(expenses.employeeId)
          }
        >
          Copy item id
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleEdit(expenses.employeeId)}
        >
          Edit row
        </DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const employeeDef: ColumnDef<EmployeeType>[] = [
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
    accessorKey: 'employeeId',
    header: 'Employee ID',
  },
  {
    accessorKey: 'companyId',
    header: 'Company ID',
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
    accessorKey: 'departmentId',
    header: 'Department ID',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn expenses={row.original} />,
  },
];
