// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   DoubleArrowLeftIcon,
//   DoubleArrowRightIcon,
// } from '@radix-ui/react-icons';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Metadata } from '@/lib/hooks/useData';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  metadata: Metadata;
}

export function DataTablePagination<TData>({
  table,
  metadata
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      {/*  *****SELECTED ROW(S)*****  */}
      <div className="flex text-xs text-muted-foreground min-[500px]:text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {metadata?.TotalCount} row(s) selected.
      </div>

      <div className="flex items-center min-[500px]:gap-6 lg:space-x-8">
        {/*  *****ROWS PER PAGE*****  */}

        <div className="flex items-center gap-1 sm:space-x-2">
          <p className="text-xs font-medium min-[500px]:text-sm">
            Rows per page
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-12 min-[500px]:w-14 sm:w-[70px] ">
              <SelectValue
                placeholder={table.getState().pagination.pageSize}
              />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/*  *****PAGE OF*****  */}
        <div className="flex w-[100px] items-center justify-center text-xs font-medium min-[500px]:text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>

        {/*  *****ARROWS*****  */}
        <div className="flex items-center gap-1 min-[500px]:gap-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 items-center justify-center p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="flex h-8 w-8 items-center justify-center p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="flex h-8 w-8 items-center justify-center p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 items-center justify-center p-0 lg:flex"
            onClick={() =>
              table.setPageIndex(table.getPageCount() - 1)
            }
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
