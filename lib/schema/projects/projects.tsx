import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef, Row } from '@tanstack/react-table';
import { ProgressBar } from '@tremor/react';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';
import * as z from 'zod';

export const projectSchema = z.object({
  projectId: z.string(),
  projectName: z.string(),
  projectType: z.string(),
  projectStatus: z.string(),
  projectIncome: z.string(),
  projectOutcome: z.string(),
  projectCompletion: z.coerce.number(),
});

export type IProject = z.infer<typeof projectSchema>;

export const projectColumnDef: ColumnDef<IProject>[] = [
  {
    accessorKey: 'projectName',
    header: 'Project Name',
  },
  {
    accessorKey: 'projectType',
    header: 'Project Type',
  },
  {
    accessorKey: 'projectStatus',
    header: 'Status',
  },
  {
    accessorKey: 'projectIncome',
    header: 'Income',
  },
  {
    accessorKey: 'projectOutcome',
    header: 'Outcome',
  },
  {
    accessorKey: 'projectCompletion',
    header: 'Completion',
    cell: (cell) => {
      const row = cell.row as Row<IProject>;
      const completion = row.original.projectCompletion;
      let color: 'green' | 'red' | 'orange' | 'blue' = 'green'; // Default to green

      if (completion < 25) {
        color = 'red';
      } else if (completion < 50) {
        color = 'orange';
      } else if (completion < 75) {
        color = 'blue';
      }

      return (
        <div className="flex flex-col items-center gap-1">
          {completion}%
          <ProgressBar
            value={completion}
            color={color}
            className=""
          />
        </div>
      );
    },
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
            navigator.clipboard.writeText(item.projectId)
          }
        >
          Copy item id
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleEdit(item.projectId)}>
          Edit row
        </DropdownMenuItem>

        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
