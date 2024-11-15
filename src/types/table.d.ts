import type {
  ColumnDef as TanstackColumnDef,
  Row,
  Table,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table"

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends Record<string, any> = {}> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

declare global {
  type ColumnDef<TData, TValue = unknown> = TanstackColumnDef<TData, TValue>
  type TableRow<TData> = Row<TData>
  type DataTable<TData> = Table<TData>
  type TableSortingState = SortingState
  type TableColumnFiltersState = ColumnFiltersState
  type TableVisibilityState = VisibilityState
}

export {}
