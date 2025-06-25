"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCheckboxBlankLine,
  RiCheckboxFill,
  RiSearchLine,
  RiFilter2Line,
} from "@remixicon/react";
import { Button } from "@tremor/react";
import { cn } from "@/lib/utils";

// Tipos para la tabla
interface GascoDataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  enableRowSelection?: boolean;
  enableFiltering?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  className?: string;
  emptyMessage?: string;
}

export function GascoDataTable<TData>({
  columns,
  data,
  onRowClick,
  enableRowSelection = false,
  enableFiltering = true,
  enableSorting = true,
  enablePagination = true,
  pageSize = 10,
  className,
  emptyMessage = "No hay datos disponibles",
}: GascoDataTableProps<TData>) {
  // Estados para la tabla
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  // Configuración de la tabla
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
    enableRowSelection,
    enableSorting,
    enableFiltering,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  return (
    <div className="space-y-4">
      {/* Barra de herramientas */}
      {(enableFiltering || enableRowSelection) && (
        <div className="flex items-center justify-between gap-2">
          {/* Búsqueda global */}
          {enableFiltering && (
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1">
                <RiSearchLine className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  placeholder="Buscar..."
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className={cn(
                    "h-9 w-full rounded-tremor-default border border-tremor-border pl-9 pr-3 text-tremor-default",
                    "bg-tremor-background placeholder:text-tremor-content-subtle dark:border-dark-tremor-border dark:bg-dark-tremor-background",
                    "focus:border-tremor-brand-subtle focus:ring-2 focus:ring-tremor-brand-muted dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted"
                  )}
                />
              </div>
              {table.getSelectedRowModel().rows.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {table.getSelectedRowModel().rows.length} seleccionados
                  </span>
                  <Button
                    variant="secondary"
                    size="xs"
                    onClick={() => setRowSelection({})}
                  >
                    Limpiar
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tabla */}
      <div className="relative overflow-hidden rounded-tremor-default border border-tremor-border dark:border-dark-tremor-border">
        <div className="overflow-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-tremor-border bg-tremor-background-subtle dark:border-dark-tremor-border dark:bg-dark-tremor-background-subtle"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-sm font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={cn("flex items-center gap-2", {
                            "cursor-pointer select-none":
                              header.column.getCanSort(),
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <RiArrowUpSLine className="h-4 w-4 text-tremor-content-subtle" />
                            ),
                            desc: (
                              <RiArrowDownSLine className="h-4 w-4 text-tremor-content-subtle" />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "border-b border-tremor-border transition-colors hover:bg-tremor-background-muted dark:border-dark-tremor-border dark:hover:bg-dark-tremor-background-muted",
                      {
                        "cursor-pointer": onRowClick,
                        "bg-tremor-background-muted dark:bg-dark-tremor-background-muted":
                          row.getIsSelected(),
                      }
                    )}
                    onClick={() => {
                      if (enableRowSelection) {
                        row.toggleSelected();
                      }
                      if (onRowClick) {
                        onRowClick(row.original);
                      }
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 text-sm text-tremor-content dark:text-dark-tremor-content"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-sm text-tremor-content-subtle"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {enablePagination && (
          <div className="flex items-center justify-between border-t border-tremor-border bg-tremor-background px-4 py-3 dark:border-dark-tremor-border dark:bg-dark-tremor-background">
            <div className="flex items-center gap-2 text-sm text-tremor-content">
              <span>
                Página {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount()}
              </span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="rounded-tremor-default border border-tremor-border bg-tremor-background px-2 py-1 text-sm dark:border-dark-tremor-border dark:bg-dark-tremor-background"
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize} por página
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="xs"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <Button
                variant="secondary"
                size="xs"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 