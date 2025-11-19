// React router
import { Link } from "react-router";

// Lucide icon
import { SquarePen, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

// Type
import type { OfficeGroup, UpdateOfficeGroup } from "@/types/office-group";

// Hook
import { useDeleteOfficeGroup } from "./useDeleteOfficeGroup";
import { useOfficeGroups } from "./useOfficeGroups";
import { useAllUsers } from "../auth/useAllUsers";
import { useModal } from "@/hook/useModal";

// Component
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { ModalWithAnimation } from "@/components/ModalWithAnimation";
import DeleteConfirmationBox from "@/components/DeleteConfirmationBox";
import UpdateOfficeGroupForm from "./UpdateOfficeGroupForm";
import toast from "react-hot-toast";

// const officeGroups: OfficeGroup[] = [
//   {
//     id: 1,
//     officeName: "OAA",
//     chiefOfficeName: "John Smith",
//     createdAt: "2025-01-15T10:30:00Z",
//     updatedAt: "2025-03-10T14:45:00Z",
//     status: true,
//     createdBy: "admin",
//     updatedBy: "manager",
//   },
//   {
//     id: 2,
//     officeName: "OPGS",
//     chiefOfficeName: "Emma Brown",
//     createdAt: "2025-01-18T09:15:00Z",
//     updatedAt: "2025-03-12T11:25:00Z",
//     status: true,
//     createdBy: "admin",
//     updatedBy: "emma",
//   },
//   {
//     id: 3,
//     officeName: "OQM",
//     chiefOfficeName: "David Johnson",
//     createdAt: "2025-02-01T12:00:00Z",
//     updatedAt: "2025-03-15T09:35:00Z",
//     status: false,
//     createdBy: "john",
//     updatedBy: "david",
//   },
//   {
//     id: 4,
//     officeName: "OHD",
//     chiefOfficeName: "Sophia Carter",
//     createdAt: "2025-02-05T08:20:00Z",
//     updatedAt: "2025-03-18T13:55:00Z",
//     status: true,
//     createdBy: "admin",
//     updatedBy: "sophia",
//   },
//   {
//     id: 5,
//     officeName: "OFA",
//     chiefOfficeName: "Michael Davis",
//     createdAt: "2025-02-10T14:10:00Z",
//     updatedAt: "2025-03-20T10:40:00Z",
//     status: true,
//     createdBy: "michael",
//     updatedBy: "manager",
//   },
//   {
//     id: 6,
//     officeName: "OIM",
//     chiefOfficeName: "Isabella Moore",
//     createdAt: "2025-02-15T15:30:00Z",
//     updatedAt: "2025-03-22T16:05:00Z",
//     status: false,
//     createdBy: "admin",
//     updatedBy: "isabella",
//   },
//   {
//     id: 7,
//     officeName: "OCM",
//     chiefOfficeName: "William Harris",
//     createdAt: "2025-02-18T07:25:00Z",
//     updatedAt: "2025-03-24T09:50:00Z",
//     status: true,
//     createdBy: "william",
//     updatedBy: "admin",
//   },
//   {
//     id: 8,
//     officeName: "OII",
//     chiefOfficeName: "Olivia Walker",
//     createdAt: "2025-02-20T11:45:00Z",
//     updatedAt: "2025-03-26T12:35:00Z",
//     status: true,
//     createdBy: "admin",
//     updatedBy: "olivia",
//   },
//   {
//     id: 9,
//     officeName: "OIS",
//     chiefOfficeName: "James Wilson",
//     createdAt: "2025-02-25T09:40:00Z",
//     updatedAt: "2025-03-28T10:15:00Z",
//     status: false,
//     createdBy: "james",
//     updatedBy: "admin",
//   },
//   {
//     id: 10,
//     officeName: "OSD",
//     chiefOfficeName: "Mia Thompson",
//     createdAt: "2025-03-01T13:55:00Z",
//     updatedAt: "2025-03-30T14:20:00Z",
//     status: true,
//     createdBy: "mia",
//     updatedBy: "manager",
//   },
// ];

// interface Transaction {
//   id: number;
//   orderId: string;
//   customer: string;
//   email: string;
//   amount: number;
//   amountDisplay: string;
//   status: "Completed" | "Pending" | "Failed";
//   dueDate: string;
//   officeName?: string;
// }

// const initialTransactions: Transaction[] = [
//   {
//     id: 1,
//     orderId: "#323534",
//     customer: "Lindsey Curtis",
//     email: "lindsey@example.com",
//     amount: 699,
//     amountDisplay: "$699",
//     status: "Completed",
//     dueDate: "12 Feb, 2027",
//     officeName: "OAA",
//   },
//   {
//     id: 2,
//     orderId: "#323535",
//     customer: "Kaiya George",
//     email: "kaiya@example.com",
//     amount: 1579,
//     amountDisplay: "$1,579",
//     status: "Failed",
//     dueDate: "13 Mar, 2027",
//     officeName: "OPGS",
//   },
//   {
//     id: 3,
//     orderId: "#323536",
//     customer: "Zain Geidt",
//     email: "zain787@example.com",
//     amount: 1039,
//     amountDisplay: "$1,039",
//     status: "Pending",
//     dueDate: "19 Mar, 2027",
//     officeName: "OQM",
//   },
//   {
//     id: 4,
//     orderId: "#323537",
//     customer: "Abram Schleifer",
//     email: "abram@example.com",
//     amount: 43999,
//     amountDisplay: "$43,999",
//     status: "Completed",
//     dueDate: "25 Apr, 2027",
//     officeName: "OHD",
//   },
//   {
//     id: 5,
//     orderId: "#323538",
//     customer: "Carla George",
//     email: "carla65@example.com",
//     amount: 919,
//     amountDisplay: "$919",
//     status: "Completed",
//     dueDate: "11 May, 2027",
//     officeName: "OFA",
//   },
//   {
//     id: 6,
//     orderId: "#323539",
//     customer: "Emery Culhane",
//     email: "emery09@example.com",
//     amount: 839,
//     amountDisplay: "$839",
//     status: "Completed",
//     dueDate: "29 Jun, 2027",
//     officeName: "OIM",
//   },
//   {
//     id: 7,
//     orderId: "#323540",
//     customer: "Livia Donin",
//     email: "livia343@example.com",
//     amount: 1769,
//     amountDisplay: "$1,769",
//     status: "Failed",
//     dueDate: "22 Jul, 2027",
//     officeName: "OCM",
//   },
//   {
//     id: 8,
//     orderId: "#323541",
//     customer: "Miracle Bator",
//     email: "miracle@example.com",
//     amount: 7349,
//     amountDisplay: "$7,349",
//     status: "Completed",
//     dueDate: "05 Aug, 2027",
//     officeName: "OII",
//   },
//   {
//     id: 9,
//     orderId: "#323542",
//     customer: "Lincoln Herwitz",
//     email: "lincoln@example.com",
//     amount: 849,
//     amountDisplay: "$849",
//     status: "Completed",
//     dueDate: "09 Sep, 2027",
//     officeName: "OIS",
//   },
//   {
//     id: 10,
//     orderId: "#323543",
//     customer: "Ekstrom Bothman",
//     email: "ekstrom@example.com",
//     amount: 679,
//     amountDisplay: "$679",
//     status: "Completed",
//     dueDate: "15 Nov, 2027",
//     officeName: "OSD",
//   },
// ];

interface SortState {
  key: "chiefOfficeName" | "officeName"; // Fixed: Updated to match OfficeGroup properties
  asc: boolean;
}

function OfficeGroupTable() {
  const { officeGroups } = useOfficeGroups();
  const { users } = useAllUsers();
  const { deleteOfficeGroup } = useDeleteOfficeGroup();

  console.log("officeGroups", officeGroups);

  const {
    isOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  // const [transactions] = React.useState<Transaction[]>(initialTransactions);
  // const [selected, setSelected] = React.useState<number[]>([]);
  const [sort, setSort] = useState<SortState>({
    key: "chiefOfficeName", // Fixed: Updated to match OfficeGroup property
    asc: true,
  });

  const [itemToDelete, setItemToDelete] = useState("");
  const [itemToUpdate, setItemToUpdate] = useState<UpdateOfficeGroup | null>(
    null
  );

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  // const [filterDays, setFilterDays] = useState<string>("Last 7 Days");
  const perPage: number = 10;

  const sortedRows: OfficeGroup[] = useMemo(() => {
    return [...officeGroups].sort((a, b) => {
      let valA = a[sort.key];
      let valB = b[sort.key];

      // Fixed: Added proper null/undefined handling and optional chaining
      if (typeof valA === "string") valA = valA?.toLowerCase() || "";
      if (typeof valB === "string") valB = valB?.toLowerCase() || "";

      // Handle null/undefined values
      if (!valA && !valB) return 0;
      if (!valA) return sort.asc ? -1 : 1;
      if (!valB) return sort.asc ? 1 : -1;

      if (valA < valB) return sort.asc ? -1 : 1;
      if (valA > valB) return sort.asc ? 1 : -1;
      return 0;
    });
  }, [officeGroups, sort]);

  const filteredRows: OfficeGroup[] = useMemo(() => {
    return sortedRows.filter(
      (row) =>
        row.chiefOfficeName
          ?.toLowerCase()
          .includes(search?.toLowerCase() || "") ||
        false ||
        row.officeName?.toLowerCase().includes(search?.toLowerCase() || "") ||
        false
    );
  }, [sortedRows, search]);

  // Fixed: Calculate totalPages based on filteredRows, not transactions
  const totalPages: number = Math.ceil(filteredRows.length / perPage) || 1;
  const startEntry: number =
    filteredRows.length === 0 ? 0 : (page - 1) * perPage + 1;
  const endEntry: number = Math.min(page * perPage, filteredRows.length);

  const paginatedRows: OfficeGroup[] = filteredRows.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // const toggleSelectAll = (): void => {
  //   if (selected.length === paginatedRows.length) {
  //     setSelected([]);
  //   } else {
  //     setSelected(paginatedRows.map((row) => row.id));
  //   }
  // };

  // const updateSelectAll = (): void => {
  //   const allSelected = paginatedRows.every((row) => selected.includes(row.id));
  //   if (allSelected && selected.length !== paginatedRows.length) {
  //     setSelected(paginatedRows.map((row) => row.id));
  //   }
  // };

  // const toggleRow = (id: number): void => {
  //   setSelected((prev) =>
  //     prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  //   );
  //   updateSelectAll();
  // };

  // Fixed: Updated parameter type to match SortState

  const sortBy = (key: "officeName" | "chiefOfficeName"): void => {
    setSort((prev) => ({
      key,
      asc: prev.key === key ? !prev.asc : true,
    }));
    setPage(1);
  };

  const goToPage = (n: number): void => {
    if (n >= 1 && n <= totalPages) setPage(n);
  };

  // const handleViewMore = () => {
  //   //logic will be there
  // };

  // function handleUpdate(rowItem: OfficeGroup) {
  //   if (rowItem) {
  //     const user = users.find(
  //       (user) => user.userName === rowItem.chiefOfficeName
  //     );

  //     if (!user) {
  //       console.error(
  //         "User not found for chiefOfficeName:",
  //         rowItem.chiefOfficeName
  //       );
  //       return; // Exit early if user is not found
  //     }

  //     const updateData: UpdateOfficeGroup = {
  //       id: rowItem.id.toString(), // Fixed: Added colon instead of space
  //       newOfficeGroupData: {
  //         officeName: rowItem.officeName,
  //         userCode: user?.userCode, // Now guaranteed to be string
  //       },
  //     };

  //     setItemToUpdate(updateData);
  //     console.log("updateData", updateData);
  //   }

  //   openEditModal();
  // }

  function handleUpdate(rowItem: OfficeGroup) {
    if (rowItem) {
      const user = users.find(
        (user) => user.username === rowItem.chiefOfficeName
      );

      if (!user) {
        console.error(
          "User not found for chiefOfficeName:",
          rowItem.chiefOfficeName
        );

        const updateData: UpdateOfficeGroup = {
          id: rowItem.id.toString(),
          newOfficeGroupData: {
            officeName: rowItem.officeName,
            userCode: "", // Default value when user not found
          },
        };

        setItemToUpdate(updateData);
        openEditModal();
        return; // Exit after handling the not-found case
      }

      const updateData: UpdateOfficeGroup = {
        id: rowItem.id.toString(),
        newOfficeGroupData: {
          officeName: rowItem.officeName,
          userCode: user.userCode, // user is guaranteed to exist here
        },
      };

      setItemToUpdate(updateData);
      console.log("updateData", updateData);
    }

    openEditModal();
  }

  function handleDelete() {
    deleteOfficeGroup(itemToDelete, {
      onSuccess: () => {
        toast.success("Office group deleted successfully");
        closeDeleteModal();
      },
    });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
        {/* <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Transactions
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your most recent transactions list
          </p>
        </div> */}
        <div></div>

        {/* Search bar */}
        <div className="flex gap-3.5">
          <div className="hidden flex-col gap-3 sm:flex sm:flex-row sm:items-center">
            <div className="relative">
              <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
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
                type="text"
                placeholder="Search..."
                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="custom-scrollbar overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200 dark:divide-gray-800 dark:border-gray-800">
              <th className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                <div
                  className="flex cursor-pointer items-center gap-3"
                  onClick={() => sortBy("officeName")}
                >
                  <p className="text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                    Office Group
                  </p>
                  <span className="flex flex-col gap-0.5">
                    <svg
                      className={
                        sort.key === "officeName" && sort.asc
                          ? "text-gray-800 dark:text-gray-400"
                          : "text-gray-300"
                      }
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
                      className={
                        sort.key === "officeName" && !sort.asc
                          ? "text-gray-800 dark:text-gray-400"
                          : "text-gray-300"
                      }
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
                  </span>
                </div>
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                <div
                  className="flex cursor-pointer items-center gap-3"
                  onClick={() => sortBy("chiefOfficeName")} // Fixed: Updated to chiefOfficeName
                >
                  <p className="text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                    Chief Office
                  </p>
                  <span className="flex flex-col gap-0.5">
                    <svg
                      className={
                        sort.key === "chiefOfficeName" && sort.asc // Fixed: Updated to chiefOfficeName
                          ? "text-gray-800 dark:text-gray-400"
                          : "text-gray-300"
                      }
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
                      className={
                        sort.key === "chiefOfficeName" && !sort.asc // Fixed: Updated to chiefOfficeName
                          ? "text-gray-800 dark:text-gray-400"
                          : "text-gray-300"
                      }
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
                  </span>
                </div>
              </th>
              <th className="p-4 text-center text-xs font-medium  text-gray-500 dark:text-gray-400">
                Actions
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                <div className="relative">
                  <span className="sr-only">Action</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-x divide-y divide-gray-200 dark:divide-gray-800">
            {paginatedRows.map((row: OfficeGroup) => (
              <tr
                key={row.id}
                className="transition hover:bg-gray-50 dark:hover:bg-gray-900 group"
              >
                <td className="p-4 whitespace-nowrap">
                  <Link
                    className="group-hover:underline underline-offset-4"
                    to={`/office-groups/${row.id}`}
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                      {row.officeName}
                    </span>
                  </Link>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {row.chiefOfficeName}
                  </p>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <div className="flex gap-6 justify-center text-gray-500">
                    <Tooltip>
                      <TooltipTrigger>
                        <div
                          onClick={() => {
                            handleUpdate(row);
                          }}
                          className="text-gray-500 h-[25px] hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                        >
                          <SquarePen className="size-5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>Edit</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger>
                        <div
                          onClick={() => {
                            openDeleteModal();
                            setItemToDelete(row.id.toString());
                          }}
                          className="text-gray-500 hover:text-error-500 dark:hover:text-error-500 h-[25px] dark:text-gray-400"
                        >
                          <Trash2 className="size-5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Delete</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <div className="relative inline-block">
                    {/* TableDropdown component would go here */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table footer */}
      <div className="border-t border-gray-200 px-5 py-4 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="hidden sm:block">
            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="text-gray-800 dark:text-white/90">
                {startEntry}
              </span>{" "}
              to{" "}
              <span className="text-gray-800 dark:text-white/90">
                {endEntry}
              </span>{" "}
              of{" "}
              <span className="text-gray-800 dark:text-white/90">
                {filteredRows.length}
              </span>
            </span>
          </div>

          {/* Pagination buttons */}
          <div className="flex w-full items-center justify-between gap-2 rounded-lg bg-gray-50 p-4 sm:w-auto sm:justify-normal sm:rounded-none sm:bg-transparent sm:p-0 dark:bg-gray-900 dark:sm:bg-transparent">
            <button
              className={`shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 hover:text-gray-800 sm:p-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={page === 1}
              onClick={() => page > 1 && setPage(page - 1)}
            >
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
                  d="M2.58203 9.99868C2.58174 10.1909 2.6549 10.3833 2.80152 10.53L7.79818 15.5301C8.09097 15.8231 8.56584 15.8233 8.85883 15.5305C9.15183 15.2377 9.152 14.7629 8.85921 14.4699L5.13911 10.7472L16.6665 10.7472C17.0807 10.7472 17.4165 10.4114 17.4165 9.99715C17.4165 9.58294 17.0807 9.24715 16.6665 9.24715L5.14456 9.24715L8.85919 5.53016C9.15199 5.23717 9.15184 4.7623 8.85885 4.4695C8.56587 4.1767 8.09099 4.17685 7.79819 4.46984L2.84069 9.43049C2.68224 9.568 2.58203 9.77087 2.58203 9.99715C2.58203 9.99766 2.58203 9.99817 2.58203 9.99868Z"
                  fill=""
                />
              </svg>
            </button>
            <span className="block text-sm font-medium text-gray-700 sm:hidden dark:text-gray-400">
              Page {page} of {totalPages}
            </span>
            <ul className="hidden items-center gap-0.5 sm:flex">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <li key={n}>
                  <button
                    onClick={() => goToPage(n)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium ${
                      page === n
                        ? "bg-brand-500 text-white"
                        : "text-gray-700 hover:bg-brand-500 hover:text-white dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    {n}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className={`shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 hover:text-gray-800 sm:p-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 ${
                page === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={page === totalPages}
              onClick={() => page < totalPages && setPage(page + 1)}
            >
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
                  d="M17.4165 9.9986C17.4168 10.1909 17.3437 10.3832 17.197 10.53L12.2004 15.5301C11.9076 15.8231 11.4327 15.8233 11.1397 15.5305C10.8467 15.2377 10.8465 14.7629 11.1393 14.4699L14.8594 10.7472L3.33203 10.7472C2.91782 10.7472 2.58203 10.4114 2.58203 9.99715C2.58203 9.58294 2.91782 9.24715 3.33203 9.24715L14.854 9.24715L11.1393 5.53016C10.8465 5.23717 10.8467 4.7623 11.1397 4.4695C11.4327 4.1767 11.9075 4.17685 12.2003 4.46984L17.1578 9.43049C17.3163 9.568 17.4165 9.77087 17.4165 9.99715C17.4165 9.99763 17.4165 9.99812 17.4165 9.9986Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ModalWithAnimation
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        className="max-w-[584px] p-5 lg:p-7"
      >
        <UpdateOfficeGroupForm
          officeGroupData={itemToUpdate!}
          closeModal={closeEditModal}
        />
      </ModalWithAnimation>

      <ModalWithAnimation
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        className="max-w-[584px] p-5 lg:p-7"
      >
        <DeleteConfirmationBox
          headerText={`Are you sure?`}
          descriptionText={`Are you sure you want to delete this item`}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      </ModalWithAnimation>
    </div>
  );
}

export default OfficeGroupTable;

//  <div className="flex justify-center pb-4 sm:hidden">
//    <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
//      Showing{" "}
//      <span className="text-gray-800 dark:text-white/90">{startEntry}</span> to{" "}
//      <span className="text-gray-800 dark:text-white/90">{endEntry}</span> of{" "}
//      <span className="text-gray-800 dark:text-white/90">
//        {filteredRows.length}
//      </span>
//    </span>
//  </div>;
