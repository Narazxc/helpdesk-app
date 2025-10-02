import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
  columns: Array<{
    key: string;
    label: string;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
  }>;
  rows?: number;
  showActions?: boolean;
  className?: string;
  actionColumnWidth?: string;
}

export function TableSkeleton({
  columns,
  rows = 8,
  showActions = false,
  className = "",
  actionColumnWidth = "120px",
}: TableSkeletonProps) {
  const getWidthStyle = (
    width?: string,
    minWidth?: string,
    maxWidth?: string
  ) => ({
    width,
    minWidth,
    maxWidth,
  });

  const calculateTableWidth = () => {
    let totalWidth = 0;
    columns.forEach((column) => {
      if (column.width && column.width.endsWith("px")) {
        totalWidth += parseInt(column.width);
      } else {
        totalWidth += 150; // Default width
      }
    });
    if (showActions) {
      totalWidth += parseInt(actionColumnWidth || "120");
    }
    return `${totalWidth}px`;
  };

  return (
    <div
      className={`overflow-hidden rounded-lg bg-white dark:bg-white/[0.03] ${className}`}
    >
      {/* Search and Items Per Page Controls Skeleton */}
      <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-200 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Skeleton className="h-11 xl:w-[300px] w-full" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-4 w-14" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="w-full overflow-x-auto custom-scrollbar">
        <Table
          className="table-fixed"
          style={{
            tableLayout: "fixed",
            width: calculateTableWidth(),
            minWidth: "100%",
          }}
        >
          <TableHeader className="border-t border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className="px-4 py-3 border text-nowrap border-gray-100 dark:border-white/[0.05]"
                  style={getWidthStyle(
                    column.width,
                    column.minWidth,
                    column.maxWidth
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-4 ml-2" />
                  </div>
                </TableCell>
              ))}
              {showActions && (
                <TableCell
                  className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
                  style={getWidthStyle(actionColumnWidth)}
                >
                  <Skeleton className="h-4 w-12" />
                </TableCell>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="[&>tr]:odd:bg-white [&>tr]:odd:dark:bg-gray-900 [&>tr]:even:bg-gray-100 [&>tr]:even:dark:bg-gray-800">
            {Array.from({ length: rows }).map((_, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    key={`${index}-${column.key}`}
                    className="px-4 py-2 font-normal border border-gray-100 dark:border-white/[0.05] overflow-hidden"
                    style={getWidthStyle(
                      column.width,
                      column.minWidth,
                      column.maxWidth
                    )}
                  >
                    <div className="truncate overflow-hidden">
                      <Skeleton className="h-4 w-full max-w-[200px]" />
                    </div>
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell
                    className="px-4 py-2 font-normal border border-gray-100 dark:border-white/[0.05] whitespace-nowrap"
                    style={getWidthStyle(actionColumnWidth)}
                  >
                    <div className="flex items-center w-full gap-2">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-5 w-5" />
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer Skeleton */}
      <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
          <div className="pt-3 xl:pt-0">
            <Skeleton className="h-4 w-48 pt-3 border-t border-gray-100 dark:border-gray-800 xl:border-t-0 xl:pt-0" />
          </div>
          <div className="flex items-center gap-2 mt-3 xl:mt-0">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
