import PaginationWithButton from "@/components/tables/datatables/datatabletwo/PaginationWithButton";
import {
  TableCell,
  TableBody,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { TrashBinIcon } from "@/icons";
import { PencilIcon } from "lucide-react";
import { useMemo, useState } from "react";

// Generic column configuration interface
export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  className?: string;
}

// Generic table props interface
interface TypeDataTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  showActions?: boolean;
  searchableFields?: (keyof T)[];
  initialItemsPerPage?: number;
  className?: string;
}

type SortOrder = "asc" | "desc";

export default function TypeDataTable<T extends Record<string, any>>({
  data,
  columns,
  onEdit,
  onDelete,
  showActions = true,
  searchableFields,
  initialItemsPerPage = 10,
  className = "",
}: TypeDataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");

  // Determine which fields to search in
  const fieldsToSearch = searchableFields || columns.map((col) => col.key);

  const filteredAndSortedData = useMemo(() => {
    let filtered = data;

    // Filter by search term
    if (searchTerm) {
      filtered = data.filter((item) =>
        fieldsToSearch.some((field) => {
          const value = item[field];
          return (
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
    }

    // Sort data
    // if (sortKey) {
    //   filtered = [...filtered].sort((a, b) => {
    //     const aValue = a[sortKey];
    //     const bValue = b[sortKey];

    //     // Handle numeric values (including salary-like strings)
    //     if (typeof aValue === "string" && aValue.match(/^\$?[\d,]+$/)) {
    //       const numA = Number.parseInt(aValue.replace(/\$|,/g, ""));
    //       const numB = Number.parseInt(bValue.replace(/\$|,/g, ""));
    //       return sortOrder === "asc" ? numA - numB : numB - numA;
    //     }

    //     // Handle dates
    //     if (aValue instanceof Date && bValue instanceof Date) {
    //       return sortOrder === "asc"
    //         ? aValue.getTime() - bValue.getTime()
    //         : bValue.getTime() - aValue.getTime();
    //     }

    //     // Handle strings and other types
    //     const strA = String(aValue);
    //     const strB = String(bValue);

    //     return sortOrder === "asc"
    //       ? strA.localeCompare(strB)
    //       : strB.localeCompare(strA);
    //   });
    // }

    // Sort data
    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        // 👇 explicitly cast to unknown, since TS doesn't know the type from sortKey
        const aValue = a[sortKey as keyof T] as unknown; // <-- changed
        const bValue = b[sortKey as keyof T] as unknown; // <-- changed

        // 👇 handle numeric values (like salary with $ or commas)
        if (typeof aValue === "string" && /^\$?[\d,]+$/.test(aValue)) {
          // <-- added type guard
          const numA = Number.parseInt(aValue.replace(/\$|,/g, "")); // <-- changed: safe to call .replace
          const numB = Number.parseInt((bValue as string).replace(/\$|,/g, "")); // <-- changed: cast bValue
          return sortOrder === "asc" ? numA - numB : numB - numA;
        }

        // 👇 handle dates (either Date object or ISO string)
        if (
          aValue instanceof Date || // <-- kept instanceof but after casting to unknown it's valid
          (typeof aValue === "string" && !isNaN(Date.parse(aValue))) // <-- added string date check
        ) {
          const dateA = aValue instanceof Date ? aValue : new Date(aValue); // <-- normalize to Date
          const dateB =
            bValue instanceof Date ? bValue : new Date(bValue as string); // <-- normalize to Date
          return sortOrder === "asc"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        }

        // 👇 fallback: compare as strings
        const strA = String(aValue); // <-- changed: force to string
        const strB = String(bValue); // <-- changed: force to string

        return sortOrder === "asc"
          ? strA.localeCompare(strB) // <-- changed: safe now
          : strB.localeCompare(strA);
      });
    }

    return filtered;
  }, [data, sortKey, sortOrder, searchTerm, fieldsToSearch]);

  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (key: keyof T) => {
    const column = columns.find((col) => col.key === key);
    if (!column?.sortable && column?.sortable !== undefined) return;

    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  const renderCellContent = (column: ColumnConfig<T>, item: T) => {
    const value = item[column.key];

    if (column.render) {
      return column.render(value, item);
    }

    return value;
  };

  return (
    <div
      className={`overflow-hidden rounded-lg bg-white dark:bg-white/[0.03] shadow-md ${className}`}
    >
      {/* Search and Items Per Page Controls */}
      <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-200 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none left-4 top-1/2 dark:text-gray-400">
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                fill=""
              />
            </svg>
          </span>
          <input
            // id="searchTerm"
            name="searchTerm"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-500 dark:text-gray-400"> Show </span>
          <div className="relative z-20 bg-transparent">
            <select
              name="paginationSelect"
              className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              {[5, 8, 10, 25, 50].map((value) => (
                <option
                  key={value}
                  value={value}
                  className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                >
                  {value}
                </option>
              ))}
            </select>
            <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
              <svg
                className="stroke-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <span className="text-gray-500 dark:text-gray-400"> entries </span>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <Table>
          <TableHeader className="border-t border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {columns.map(
                ({ key, label, sortable = true, className = "" }) => (
                  <TableCell
                    key={String(key)}
                    isHeader
                    className={`px-4 py-3 border text-nowrap border-gray-100 dark:border-white/[0.05] ${className}`}
                  >
                    <div
                      className={`flex items-center justify-between ${
                        sortable ? "cursor-pointer" : ""
                      }`}
                      onClick={() => sortable && handleSort(key)}
                    >
                      <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                        {label}
                      </p>
                      {sortable && (
                        <button className="flex flex-col gap-0.5">
                          <svg
                            className={`text-gray-300 dark:text-gray-700 ${
                              sortKey === key && sortOrder === "asc"
                                ? "text-brand-500"
                                : ""
                            }`}
                            width="8"
                            height="5"
                            viewBox="0 0 8 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                              fill="currentColor"
                            />
                          </svg>
                          <svg
                            className={`text-gray-300 dark:text-gray-700 ${
                              sortKey === key && sortOrder === "desc"
                                ? "text-brand-500"
                                : ""
                            }`}
                            width="8"
                            height="5"
                            viewBox="0 0 8 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </TableCell>
                )
              )}
              {showActions && (
                <TableCell
                  isHeader
                  className="px-4 py-3 max-w-[2rem] border border-gray-100 dark:border-white/[0.05]"
                >
                  <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                    Action
                  </p>
                </TableCell>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="&>tr]:odd:bg-white [&>tr]:even:bg-gray-100">
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell
                  // text-gray-800
                  className={`px-4 text-center text-gray-500 py-2 font-normal border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap`}
                >
                  No data
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell
                      key={String(column.key)}
                      className={`px-4 py-2 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ${
                        column.className || ""
                      }`}
                    >
                      {renderCellContent(column, item)}
                    </TableCell>
                  ))}
                  {showActions && (
                    <TableCell className="px-4 py-2 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                      <div className="flex items-center w-full gap-2">
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="text-error-500 hover:text-error-900 dark:text-gray-400 dark:hover:text-error-500"
                          >
                            <TrashBinIcon className="size-5" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="text-yellow-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                          >
                            <PencilIcon className="size-5" />
                          </button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {data.length === 0 ? (
        <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            <div className="pt-3 xl:pt-0">
              <p className="pt-3 text-sm font-medium text-center text-gray-500 border-t border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-t-0 xl:pt-0 xl:text-left">
                Showing {startIndex} to {endIndex} of {totalItems} entries
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            <div className="pt-3 xl:pt-0">
              <p className="pt-3 text-sm font-medium text-center text-gray-500 border-t border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-t-0 xl:pt-0 xl:text-left">
                Showing {startIndex + 1} to {endIndex} of {totalItems} entries
              </p>
            </div>

            <PaginationWithButton
              totalPages={totalPages}
              initialPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
