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
import {
  DELETE_ATTENDANCE,
  GET_ALL_ATTENDANCE,
} from '@/lib/constants/endpoints/hr/attendance';
import useData from '@/lib/hooks/useData';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { format } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IAttendance, NEWIAttendance } from './attendance';

const ActionsColumn = ({ item }: { item: any }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refetch: refetchClients } = useData<IAttendance[]>(
    ['attendance'],
    GET_ALL_ATTENDANCE
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

    await axios
      .delete(DELETE_ATTENDANCE + '?id=' + id)
      .then(() => {
        toast.success(
          'Successfully deleted the selected attendance.'
        );
        setIsLoading(false);
        refetchClients();
      })
      .catch(() => {
        toast.error('Error deleting client!');
        setIsLoading(false);
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
          onClick={() => navigator.clipboard.writeText(item.clientId)}
        >
          Copy item id
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleEdit(item.attendanceRecordId)}
        >
          Edit row
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Delete Modal */}
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Trigger asChild>
            <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-500 outline-none transition-colors data-[disabled]:pointer-events-none  data-[disabled]:opacity-50 hover:bg-accent">
              Delete Employee
            </div>
          </Modal.Trigger>
          <Modal.Content
            title="Delete Employee"
            description="This will delete the selected employee! Are you sure you want to continue?"
            className="max-w-xl"
          >
            <Delete
              handleDelete={() =>
                handleDelete(item.attendanceRecordId)
              }
              id={item.attendanceRecordId}
              deleting={isLoading}
            />
          </Modal.Content>
        </Modal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const attendanceColumnDef: ColumnDef<IAttendance>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean) =>
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
  },
  {
    accessorKey: 'employeeName',
    header: 'Employee Name',
  },
  {
    accessorKey: 'weekDay',
    header: 'Weekday',
  },
  {
    accessorKey: 'checkIn',
    header: 'Check in',
    cell: ({ row }) =>
      format(new Date(`1970-01-01T${row.original.checkIn}`), 'HH:mm'),
  },
  {
    accessorKey: 'checkOut',
    header: 'Check out',
    cell: ({ row }) =>
      format(
        new Date(`1970-01-01T${row.original.checkOut}`),
        'HH:mm'
      ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn item={row.original} />,
  },
];

export const NEWattendanceColumnDef: ColumnDef<NEWIAttendance>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean) =>
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
  },
  {
    accessorKey: 'employeeName',
    header: 'Employee Name',
  },
  {
    accessorKey: 'date',
    header: 'date',
  },

  {
    accessorKey: 'checkIn',
    header: 'Check in',
    // cell: ({ row }) =>
    //   format(new Date(`1970-01-01T${row.original.checkIn}`), 'HH:mm'),
  },
  {
    accessorKey: 'checkOut',
    header: 'Check out',
    // cell: ({ row }) =>
    //   format(
    //     new Date(`1970-01-01T${row.original.checkOut}`),
    //     'HH:mm'
    //   ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn item={row.original} />,
  },
];
