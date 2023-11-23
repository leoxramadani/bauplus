import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import * as z from 'zod';

export const reportsSchema = z.object({
  reportId: z.string().optional(),
  fullName: z.string(),
  dateOfBirth: z.string(),
  department: z.string(),
  employeeId: z.string({
    required_error: 'An employee is required to create a leave!',
  }),
  employeeType: z.string(),
  email: z.string(),
});

export type IReports = z.infer<typeof reportsSchema>;

export const reportsColumnDefBuilder = (
  setisAdding: any
): ColumnDef<IReports>[] => {
  const reportsColumnDef: ColumnDef<IReports>[] = [
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
      accessorKey: 'fullName',
      header: 'Full Name',
    },
    {
      accessorKey: 'department',
      header: 'Department',
    },
    {
      accessorKey: 'employeeType',
      header: 'Type',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'dateOfBirth',
      header: 'Date of Birth',
    },
    {
      id: 'viewDetails',
      header: 'More Details',
      cell: ({ row }) => (
        <Button
          variant="default"
          className="flex w-fit items-center gap-2"
          onClick={() => {
            setisAdding(true);
          }}
        >
          More Details
        </Button>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return reportsColumnDef;
};
