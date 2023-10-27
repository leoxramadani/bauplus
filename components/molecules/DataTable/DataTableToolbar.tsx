'use client';

import * as React from 'react';

import type { Table } from '@tanstack/react-table';
import { ChevronsUpDownIcon, PlusIcon, XIcon } from 'lucide-react';

import { DataTableAdvancedFilter } from '@/components/molecules/DataTable/DataTableAdvancedFilter';
import { DataTableFacetedFilter } from '@/components/molecules/DataTable/DataTableFacetedFilter';
import { DataTableViewOptions } from '@/components/molecules/DataTable/DataTableViewOptions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  DataTableFilterOption,
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from '.';
import { DataTableAdvancedFilterItem } from './DataTableAdvancedFilterItem';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchableColumns?: DataTableSearchableColumn<TData>[];
  filterableColumns?: DataTableFilterableColumn<TData>[];
  advancedFilter?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
  advancedFilter = false,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [selectedOptions, setSelectedOptions] = React.useState<
    DataTableFilterOption<TData>[]
  >([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (selectedOptions.length > 0) {
      setOpen(true);
    }
  }, [selectedOptions]);

  const options: DataTableFilterOption<TData>[] =
    React.useMemo(() => {
      const searchableOptions = searchableColumns.map((column) => ({
        label: String(column.id),
        value: column.id,
        items: [],
      }));
      const filterableOptions = filterableColumns.map((column) => ({
        label: column.title,
        value: column.id,
        items: column.options,
      }));

      return [...searchableOptions, ...filterableOptions];
    }, [filterableColumns, searchableColumns]);

  React.useEffect(() => {
    if (selectedOptions.length === 0)
    {
      setOpen(!open)
    }
  }, [selectedOptions])

  return (
    <div className="w-full space-y-2.5 overflow-auto p-1">
      <div className="flex items-center justify-between space-x-2">
        <div className="flex flex-1 items-center space-x-2">
          {searchableColumns.length > 0 &&
            searchableColumns.map(
              (column) =>
                table.getColumn(
                  column.id ? String(column.id) : ''
                ) && (
                  <Input
                    key={String(column.id)}
                    placeholder={`Filter ${column.title}...`}
                    value={
                      (table
                        .getColumn(String(column.id))
                        ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                      table
                        .getColumn(String(column.id))
                        ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                  />
                )
            )}
          {!advancedFilter &&
            filterableColumns.length > 0 &&
            filterableColumns.map(
              (column) =>
                table.getColumn(
                  column.id ? String(column.id) : ''
                ) && (
                  <DataTableFacetedFilter
                    key={String(column.id)}
                    column={table.getColumn(
                      column.id ? String(column.id) : ''
                    )}
                    title={column.title}
                    options={column.options}
                  />
                )
            )}
          {!advancedFilter && isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <XIcon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {advancedFilter ? (
            selectedOptions.length > 0 ? (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={() => setOpen(!open)}
              >
                Filter
                <ChevronsUpDownIcon
                  className="ml-2 h-4 w-4 opacity-50"
                  aria-hidden="true"
                />
              </Button>
            ) : (
              <DataTableAdvancedFilter
                options={options.filter(
                  (option) =>
                    !selectedOptions.some(
                      (selectedOption) =>
                        selectedOption.value === option.value
                    )
                )}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
            )
          ) : null}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      {advancedFilter && open ? (
        <div className="flex items-center space-x-2">
          {selectedOptions.map((selectedOption) => (
            <DataTableAdvancedFilterItem
              key={String(selectedOption.value)}
              table={table}
              selectedOption={selectedOption}
              options={options}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          ))}
          <DataTableAdvancedFilter
            options={options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          >
            <Button
              variant="outline"
              size="sm"
              role="combobox"
              className="flex items-center rounded-full"
            >
              <PlusIcon
                className="mr-2 h-4 w-4 opacity-50"
                aria-hidden="true"
              />
              Add filter
            </Button>
          </DataTableAdvancedFilter>
        </div>
      ) : null}
    </div>
  );
}
