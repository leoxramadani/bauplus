'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import { ListFilter } from 'lucide-react';
import { useState } from 'react';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableColumnSearch<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const tableColumns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== 'undefined' &&
        column.getCanHide()
    )
    .map((column) => ({
      id: column.id,
      header: column.columnDef.header,
    }));

  const [filterColumn, setFilterColumn] = useState<string>(
    tableColumns[0].id!
  );
  return (
    <>
      {/* Input for filterin are here */}
      <Input
        placeholder="Search"
        value={
          (table
            .getColumn(filterColumn)
            ?.getFilterValue() as string) ?? ''
        }
        onChange={(event) =>
          table
            .getColumn(filterColumn)
            ?.setFilterValue(event.target.value)
        }
        className="max-w-xl"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex gap-2 p-2"
          >
            <div className="flex items-center">
              <ListFilter className="h-4 w-4" />
            </div>
            Filter by
          </Button>
        </DropdownMenuTrigger>

        {/* This is the Popover body */}
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={filterColumn}
            onValueChange={setFilterColumn}
            onChange={() =>
              table.getColumn(filterColumn)?.setFilterValue('')
            }
          >
            {tableColumns.map((column: any) => {
              return (
                <DropdownMenuRadioItem
                  key={column.id}
                  className="capitalize"
                  value={column.id}
                >
                  {column.header}
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
  // return (
  //   <DropdownMenu>
  //     <DropdownMenuTrigger asChild>
  //       <Button variant="outline">Open</Button>
  //     </DropdownMenuTrigger>
  //     <DropdownMenuContent className="w-56">
  //       <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
  //       <DropdownMenuSeparator />
  //       <DropdownMenuRadioGroup>
  //         {tableColumns.map((column: any) => {
  //           return (
  //             <DropdownMenuRadioItem
  //               key={column.id}
  //               className="capitalize"
  //               value={column.columnDef.header?.toString()}
  //               // checked={column.getIsVisible()}
  //               // onCheckedChange={(value: any) =>
  //               //   column.toggleVisibility(!!value)
  //               // }
  //             >
  //               {column.columnDef.header?.toString()}
  //             </DropdownMenuRadioItem>
  //           );
  //         })}
  //       </DropdownMenuRadioGroup>
  //     </DropdownMenuContent>
  //   </DropdownMenu>
  // );
}