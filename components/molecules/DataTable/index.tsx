import {
  Row,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import {
  ComponentType,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

import { DataTablePagination } from '@/components/molecules/DataTable/DataTablePagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Metadata } from '@/lib/hooks/useData';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { DataTableColumnHeader } from './DataTableColumnHeader';
import { DataTableColumnSearch } from './DataTableColumnSearch';
import { DataTableViewOptions } from './DataTableViewOptions';

export type Option = {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
};

export interface DataTableFilterOption<TData> {
  label: string;
  value: keyof TData | string;
  items: Option[];
  isAdvanced?: boolean;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  subcolumns?: ColumnDef<TData, TValue>[];
  data: TData[];
  metadata: Metadata;
  searchVal?: string;
  getRowCanExpand?: (row: Row<TData>) => boolean;
  renderSubComponent?: (props: { row: Row<TData> }) => ReactElement;
  showPagination?: boolean;
  showViewoptions?: boolean;
  showSearchBar?: boolean;
  showTitle?: boolean;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  advancedFilter?: boolean;
}

export function DataTable<TData, TValue = any>({
  columns,
  data,
  metadata,
  searchVal,
  subcolumns,
  getRowCanExpand,
  renderSubComponent,
  showPagination = true,
  showViewoptions = true,
  showSearchBar = true,
  showTitle = false,
  filterableColumns = [],
  searchableColumns = [],
  advancedFilter = false,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Search params
  const page =
    searchParams?.get('page') ?? metadata?.CurrentPage ?? '1';
  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const per_page = searchParams?.get('per_page') ?? '10';
  const perPageAsNumber = Number(per_page);
  const fallbackPerPage = isNaN(perPageAsNumber)
    ? 10
    : perPageAsNumber;
  const sort = searchParams?.get('sort');
  const [column, order] = sort?.split('.') ?? [];

  // Create query string
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(
        searchParams?.toString()
      );

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Table states
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([]);

  // server-side pagination
  const [{ pageIndex, pageSize }, setPagination] =
    useState<PaginationState>({
      pageIndex: fallbackPage - 1,
      pageSize: fallbackPerPage,
    });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  useEffect(() => {
    setPagination({
      pageIndex: fallbackPage - 1,
      pageSize: fallbackPerPage,
    });
  }, [fallbackPage, fallbackPerPage]);

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        ...router.query,
        page: pageIndex + 1,
        per_page: pageSize,
      })}`,
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize]);

  // Handle server-side sorting
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: column ?? '',
      desc: order === 'desc',
    },
  ]);

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page,
        sort: sorting[0]?.id
          ? `${sorting[0]?.id}.${sorting[0]?.desc ? 'desc' : 'asc'}`
          : null,
      })}`,
      undefined,
      { shallow: true }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  // server-side filtering
  const debouncedSearchableColumnFilters = JSON.parse(
    useDebounce(
      JSON.stringify(
        columnFilters.filter((filter) => {
          return searchableColumns.find(
            (column) => column.id === filter.id
          );
        })
      ),
      500
    )
  ) as ColumnFiltersState;

  const filterableColumnFilters = columnFilters.filter((filter) => {
    return filterableColumns.find(
      (column) => column.id === filter.id
    );
  });

  useEffect(() => {
    for (const column of debouncedSearchableColumnFilters) {
      if (typeof column.value === 'string') {
        router.push(
          `${pathname}?${createQueryString({
            page: 1,
            [column.id]:
              typeof column.value === 'string' ? column.value : null,
          })}`,
          undefined,
          {
            shallow: true
          }
        );
      }
    }
    //@ts-ignore
    for (const key of searchParams.keys()) {
      if (
        searchableColumns.find((column) => column.id === key) &&
        !debouncedSearchableColumnFilters.find(
          (column) => column.id === key
        )
      ) {
        router.push(
          `${pathname}?${createQueryString({
            page: 1,
            [key]: null,
          })}`,
          undefined,
          {
            shallow: true
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(debouncedSearchableColumnFilters)]);

  useEffect(() => {
    for (const column of filterableColumnFilters) {
      if (
        typeof column.value === 'object' &&
        Array.isArray(column.value)
      ) {
        router.push(
          `${pathname}?${createQueryString({
            page: 1,
            [column.id]: column.value.join('.'),
          })}`,
          undefined,
          {
            shallow: true
          }
        );
      }
    }
    //@ts-ignore
    for (const key of searchParams.keys()) {
      if (
        filterableColumns.find((column) => column.id === key) &&
        !filterableColumnFilters.find((column) => column.id === key)
      ) {
        router.push(
          `${pathname}?${createQueryString({
            page: 1,
            [key]: null,
          })}`,
          undefined,
          {
            shallow: true
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filterableColumnFilters)]);

  const table = useReactTable({
    data,
    columns,
    pageCount: metadata.TotalPages,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    getRowCanExpand,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getExpandedRowModel: getExpandedRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  const subtable = useReactTable({
    data,
    columns: subcolumns ? subcolumns : columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div
      className={`flex flex-col
    ${!showSearchBar ? `` : 'my-3 gap-3'}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex w-full flex-row items-center gap-2">
          {/* dropdown view columns select */}
          {showSearchBar && <DataTableColumnSearch table={table} />}
        </div>
        {/* dropdown view columns select */}
        {showViewoptions && <DataTableViewOptions table={table} />}
      </div>
      {/* The table component is here */}
      <div className="rounded-md border bg-white shadow-sm">
        {showTitle && (
          <h1 className="p-4 text-xl font-medium">Projects</h1>
        )}
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
                    <>
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
                      {row.getIsExpanded() && (
                        <TableRow className=" bg-gray-100">
                          <TableCell
                            className="w-full"
                            colSpan={columns.length}
                          >
                            <Table>
                              <TableHeader>
                                {subtable
                                  .getHeaderGroups()
                                  .map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                      {headerGroup.headers.map(
                                        (header) => (
                                          <TableHead key={header.id}>
                                            <DataTableColumnHeader
                                              column={header.column}
                                              title={
                                                header.column
                                                  .columnDef
                                                  .header as string
                                              }
                                            />
                                          </TableHead>
                                        )
                                      )}
                                    </TableRow>
                                  ))}
                              </TableHeader>
                              <TableBody>
                                {subtable.getRowModel().rows
                                  ?.length ? (
                                  subtable
                                    .getRowModel()
                                    .rows.filter(
                                      (rov) => rov.id === row.id
                                    ) // Filter only the selected row
                                    .map((selectedRow) => (
                                      <TableRow key={selectedRow.id}>
                                        {selectedRow
                                          .getVisibleCells()
                                          .map((cell) => (
                                            <TableCell key={cell.id}>
                                              {flexRender(
                                                cell.column.columnDef
                                                  .cell,
                                                cell.getContext()
                                              )}
                                            </TableCell>
                                          ))}
                                      </TableRow>
                                    ))
                                ) : (
                                  <TableRow>
                                    <TableCell
                                      colSpan={
                                        subcolumns
                                          ? subcolumns.length
                                          : columns.length
                                      }
                                      className="h-24 text-center"
                                    >
                                      No results.
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
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
      <DataTablePagination table={table} metadata={metadata} />
    </div>
  );
}
