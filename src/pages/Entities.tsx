import EntitiesTable, {
  type ColumnConfig2,
} from "@/features/entities/EntitiesTable";
import { TableSkeleton } from "@/features/entities/EntitiesTableSkeleton";
import { useEntities } from "@/features/entities/useEntities";
import type { Entity2 } from "@/types/entity";
// import TypeDataTable, {
//   type ColumnConfig,
// } from "@/features/request-type/TypeDataTable";

import { Link } from "react-router";

export default function Entities() {
  const { entities, isLoading } = useEntities();

  console.log("In entity page", entities);

  // const entityTypeColumn: ColumnConfig<Entity>[] = [
  //   {
  //     key: "businessId",
  //     label: "BU ID",
  //     render: (businessId: string) => (
  //       <div className="flex h-6 items-center">
  //         <p>{businessId}</p>
  //       </div>
  //     ),
  //   },
  //   {
  //     key: "operatingId",
  //     label: "OU ID",
  //     render: (operatingId: string) => <p>{operatingId}</p>,
  //   },
  //   {
  //     key: "shortName",
  //     label: "Short Name",
  //     render: (shortName: string) => <p>{shortName}</p>,
  //   },
  //   {
  //     key: "longName",
  //     label: "Long Description",
  //     // render: (longName: string, entity: Entity) => <p>{longName}</p>,
  //     render: (longName: string) => <p>{longName}</p>,
  //   },
  // ];

  // Example usage
  // const columns: ColumnConfig2<Entity>[] = [
  //   {
  //     key: "businessId",
  //     label: "BU ID",
  //     width: "100px", // Fixed width
  //     minWidth: "80px",
  //     sortable: true,
  //   },
  //   {
  //     key: "operatingId",
  //     label: "OU ID",
  //     width: "120px", // Fixed width
  //     minWidth: "120px",
  //     sortable: true,
  //   },
  //   {
  //     key: "shortName",
  //     label: "Short Name",
  //     width: "150px",
  //     minWidth: "150px",
  //     sortable: true,
  //   },
  //   {
  //     key: "longName",
  //     label: "Long Description",
  //     width: "500px",
  //     // maxWidth: "200px", // Maximum width
  //     sortable: true,
  //   },
  // ];

  // const columns: ColumnConfig2<Entity>[] = [
  //   {
  //     key: "businessId",
  //     label: "Business Unit",
  //     width: "6.25rem", // 100px ÷ 16 = 6.25rem
  //     minWidth: "5rem", // 80px ÷ 16 = 5rem
  //     sortable: true,
  //   },
  //   {
  //     key: "operatingId",
  //     label: "Operating Unit",
  //     width: "7.5rem", // 120px ÷ 16 = 7.5rem
  //     minWidth: "7.5rem", // 120px ÷ 16 = 7.5rem
  //     sortable: true,
  //   },
  //   {
  //     key: "shortName",
  //     label: "Short Name",
  //     width: "9.375rem", // 150px ÷ 16 = 9.375rem
  //     minWidth: "9.375rem", // 150px ÷ 16 = 9.375rem
  //     sortable: true,
  //   },
  //   {
  //     key: "longName",
  //     label: "Long Name",
  //     width: "31.25rem", // 500px ÷ 16 = 31.25rem
  //     sortable: true,
  //   },
  // ];

  const columns: ColumnConfig2<Entity2>[] = [
    {
      key: "businessUnit",
      label: "Business Unit",
      width: "6.25rem", // 100px ÷ 16 = 6.25rem
      minWidth: "5rem", // 80px ÷ 16 = 5rem
      sortable: true,
    },
    {
      key: "operatingUnit",
      label: "Operating Unit",
      width: "7.5rem", // 120px ÷ 16 = 7.5rem
      minWidth: "7.5rem", // 120px ÷ 16 = 7.5rem
      sortable: true,
    },
    {
      key: "enShortName",
      label: "Short Name",
      width: "9.375rem", // 150px ÷ 16 = 9.375rem
      minWidth: "9.375rem", // 150px ÷ 16 = 9.375rem
      sortable: true,
    },
    {
      key: "enLongName",
      label: "Long Name",
      width: "31.25rem", // 500px ÷ 16 = 31.25rem
      sortable: true,
    },
  ];

  // Define your columns (same structure as your main table)
  const columns2 = [
    { key: "name", label: "Name", width: "200px" },
    { key: "email", label: "Email", width: "250px" },
    { key: "status", label: "Status", width: "120px" },
    { key: "createdAt", label: "Created At", width: "150px" },
  ];

  return (
    <>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h1 className="text-2xl text-color font-bold">Entity</h1>

        <nav>
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90">
              /<span className="page-title-text">Entity</span>
            </li>
          </ol>
        </nav>
      </div>
      <div className="border-1 dark:bg-gray-900 dark:border-gray-800 p-6 rounded-md bg-white shadow-md">
        {/* <EntitiesTable
          initialItemsPerPage={50}
          className={`shadow-none`}
          data={entities}
          columns={entityTypeColumn}
          showActions={false}
          // enableSorting={true}
          // enableSearch={true}
        /> */}

        {isLoading ? (
          <TableSkeleton
            columns={columns2}
            rows={25} // Number of skeleton rows to show
            showActions={true} // Show action column skeleton
            actionColumnWidth="120px" // Match your action column width
          />
        ) : (
          <EntitiesTable
            data={entities}
            columns={columns}
            initialItemsPerPage={25}
            actionColumnWidth="100px" // Fixed width for action column
            showActions={false}
          />
        )}
      </div>
    </>
  );
}
