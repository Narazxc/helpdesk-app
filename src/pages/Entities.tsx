import { useEntities } from "@/features/entities/useEntities";
import TypeDataTable, {
  type ColumnConfig,
} from "@/features/request-type/TypeDataTable";
import type { Entity } from "@/types/entity";
import { Link } from "react-router";

export default function Entities() {
  const { entities } = useEntities();

  const entityTypeColumn: ColumnConfig<Entity>[] = [
    {
      key: "businessId",
      label: "BU ID",
      render: (businessId: string) => (
        <div className="flex h-6 items-center">
          <p>{businessId}</p>
        </div>
      ),
    },
    {
      key: "operatingId",
      label: "OU ID",
      render: (operatingId: string) => <p>{operatingId}</p>,
    },
    {
      key: "shortName",
      label: "Short Name",
      render: (shortName: string) => <p>{shortName}</p>,
    },
    {
      key: "longName",
      label: "Long Description",
      // render: (longName: string, entity: Entity) => <p>{longName}</p>,
      render: (longName: string) => <p>{longName}</p>,
    },
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
        <TypeDataTable
          initialItemsPerPage={50}
          className={`shadow-none`}
          data={entities}
          columns={entityTypeColumn}
          showActions={false}
          // enableSorting={true}
          // enableSearch={true}
        />
      </div>
    </>
  );
}
