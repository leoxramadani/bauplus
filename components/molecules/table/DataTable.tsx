import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { ContextMenuShortcut } from '@/components/ui/context-menu';
import { Input } from '@/components/ui/input';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@radix-ui/react-context-menu';
import { DataTableColumnHeader } from './DataTableColumnHeader';
import { DataTablePagination } from './DataTablePagination';
import { DataTableViewOptions } from './DataTableViewOptions';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchVal?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchVal,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  console.log(data)

  return (
    <div className="my-3 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex w-full flex-row items-center gap-2">
          {/* Input for filterin are here */}
          <Input
            placeholder="Search"
            value={
              (table
                .getColumn(searchVal ?? 'id')
                ?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table
                .getColumn(searchVal ?? 'id')
                ?.setFilterValue(event.target.value)
            }
            className="max-w-xl"
          />
          {/* dropdown view columns select */}
          {/* <DataTableColumnSearch table={table} /> */}
        </div>
        {/* dropdown view columns select */}
        <DataTableViewOptions table={table} />
      </div>
      {/* The table component is here */}
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      <DataTableColumnHeader
                        column={header.column}
                        title={
                          header.column.columnDef.header as string
                        }
                      />
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <ContextMenu key={row.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="rounded-lg border bg-white p-1 text-slate-900 shadow-md shadow-slate-300/30">
                    <ContextMenuItem className="flex w-60 cursor-pointer items-center justify-between rounded-md px-3 py-2 transition-colors duration-75 hover:bg-slate-200">
                      Copy ID
                      <ContextMenuShortcut>
                        &#8984;C
                      </ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                  </ContextMenuContent>
                </ContextMenu>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Buttons for pages are here */}
      <DataTablePagination table={table} />
    </div>
  );
}
