import { useState, useMemo, useEffect } from "react";

// Component
import { ModalWithAnimation } from "@/components/ModalWithAnimation";
import DeleteConfirmationBox from "@/components/DeleteConfirmationBox";
import AdminResetPasswordForm from "../auth/AdminResetPasswordForm";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button/Button";
import PaginationWithButton from "@/components/tables/datatables/datatabletwo/PaginationWithButton";
import { TableCell } from "@/components/ui/table";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@/components/ui/table/index";

// Date fns
import { format, parseISO } from "date-fns";

// Icon
import { TrashBinIcon } from "@/icons";
import {
  Download,
  LockKeyhole,
  LockKeyholeOpen,
  PencilIcon,
  RotateCcwKey,
  Upload,
} from "lucide-react";

// Toast
import toast from "react-hot-toast";

// Type
import type { User4 } from "@/types/user";

// Hook
import { useModal } from "@/hook/useModal";
import { useNavigate } from "react-router";
import { useAllUsers } from "./useAllUsers";
import { useDeleteUser } from "./useDeleteUser";
import { useUnlockUser } from "../auth/useUnlockUser";
import { exportUsersCsv } from "@/services/apiUser";
import FileDropZone from "@/components/experimental/FileDropZone";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useImportUsersCsv } from "./useImportUsersCsv";
import type { ApiResponse } from "@/types/api";
import { API_URL } from "@/config";
import { api } from "@/services/axios";

// const tableRowData = [
//   {
//     id: 1,
//     name: "Abram Schleifer",
//     position: "Sales Assistant",
//     location: "Edinburgh",
//     age: 57,
//     date: "25 Apr, 2027",
//     salary: "$89,500",
//   },
//   {
//     id: 2,
//     name: "Charlotte Anderson",
//     position: "Marketing Manager",
//     location: "London",
//     age: 42,
//     date: "12 Mar, 2025",
//     salary: "$105,000",
//   },
//   {
//     id: 3,
//     name: "Ethan Brown",
//     position: "Software Engineer",
//     location: "San Francisco",
//     age: 30,
//     date: "01 Jan, 2024",
//     salary: "$120,000",
//   },
//   {
//     id: 4,
//     name: "Sophia Martinez",
//     position: "Product Manager",
//     location: "New York",
//     age: 35,
//     date: "15 Jun, 2026",
//     salary: "$95,000",
//   },
//   {
//     id: 5,
//     name: "James Wilson",
//     position: "Data Analyst",
//     location: "Chicago",
//     age: 28,
//     date: "20 Sep, 2025",
//     salary: "$80,000",
//   },
//   {
//     id: 6,
//     name: "Olivia Johnson",
//     position: "HR Specialist",
//     location: "Los Angeles",
//     age: 40,
//     date: "08 Nov, 2026",
//     salary: "$75,000",
//   },
//   {
//     id: 7,
//     name: "William Smith",
//     position: "Financial Analyst",
//     location: "Seattle",
//     age: 38,
//     date: "03 Feb, 2026",
//     salary: "$88,000",
//   },
//   {
//     id: 8,
//     name: "Isabella Davis",
//     position: "UI/UX Designer",
//     location: "Austin",
//     age: 29,
//     date: "18 Jul, 2025",
//     salary: "$92,000",
//   },
//   {
//     id: 9,
//     name: "Liam Moore",
//     position: "DevOps Engineer",
//     location: "Boston",
//     age: 33,
//     date: "30 Oct, 2024",
//     salary: "$115,000",
//   },
//   {
//     id: 10,
//     name: "Mia Garcia",
//     position: "Content Strategist",
//     location: "Denver",
//     age: 27,
//     date: "12 Dec, 2027",
//     salary: "$70,000",
//   },
// ];

// const tableRowData = [
//   {
//     id: 1,
//     userCode: "USR_20251006_11645b3a",
//     userName: "Khen Sreymom",
//     userId: "sreymom.khen",
//     telegramId: "1234567",
//     phoneNumber: "010999888",
//     email: "khen.sreymom@fmis.gov.kh",
//     operatingId: "1032-GDPFMIT",
//     roleName: ["Frontdesk"],
//     requestTypeName: [
//       "New Development",
//       "Issue Request",
//       "Network Problem",
//       "Letter Request",
//     ],
//     status: true,
//     createdAt: "2025-10-06T16:17:37.168567",
//     updatedAt: "2025-10-08T11:33:22.87195",
//   },
//   {
//     id: 2,
//     userCode: "USR_20251006_b2615d35",
//     userName: "testing",
//     userId: "testing.123",
//     telegramId: "121456",
//     phoneNumber: "010202032",
//     email: "chief.ofa@fmish.gov.kh",
//     operatingId: "BUI_20250912_343f4c74",
//     roleName: ["new user role123"],
//     requestTypeName: [
//       "New Development",
//       "Issue Request",
//       "Network Problem",
//       "Letter Request",
//     ],
//     status: true,
//     createdAt: "2025-10-06T16:18:49.48355",
//     updatedAt: "2025-10-08T21:36:06.641085",
//   },
//   {
//     id: 3,
//     userCode: "USR_20251006_747aecca",
//     userName: "Sen Chhutra",
//     userId: "sen.chhutra",
//     telegramId: "1114567",
//     phoneNumber: "010999888",
//     email: "sen.chhutra@fmis.gov.kh",
//     operatingId: "1032-GDPFMIT",
//     roleName: ["Frontdesk"],
//     requestTypeName: [
//       "New Development",
//       "Issue Request",
//       "Network Problem",
//       "Letter Request",
//     ],
//     status: true,
//     createdAt: "2025-10-06T16:19:43.603897",
//     updatedAt: "2025-10-08T08:16:50.365356",
//   },
//   {
//     id: 4,
//     userCode: "USR_20251006_11827f02",
//     userName: "Yin Sreynoch",
//     userId: "yin.sreynoch",
//     telegramId: "1111567",
//     phoneNumber: "010999888",
//     email: "yin.sreynoch@fmis.gov.kh",
//     operatingId: "1032-GDPFMIT",
//     roleName: ["Frontdesk"],
//     requestTypeName: [
//       "New Development",
//       "Issue Request",
//       "Network Problem",
//       "Letter Request",
//     ],
//     status: true,
//     createdAt: "2025-10-06T16:20:22.529832",
//     updatedAt: "2025-10-08T08:16:50.493328",
//   },
//   {
//     id: 5,
//     userCode: "USR_20251006_3677a466",
//     userName: "Lay Samean",
//     userId: "lay.samean",
//     telegramId: "1111167",
//     phoneNumber: "010999888",
//     email: "lay.samean@fmis.gov.kh",
//     operatingId: "1032-GDPFMIT",
//     roleName: ["Frontdesk"],
//     requestTypeName: [
//       "New Development",
//       "Issue Request",
//       "Network Problem",
//       "Letter Request",
//     ],
//     status: true,
//     createdAt: "2025-10-06T16:20:49.721271",
//     updatedAt: "2025-10-08T08:16:50.62134",
//   },
//   {
//     id: 6,
//     userCode: "USR_20251006_404f50f8",
//     userName: "Duk Manic",
//     userId: "duk.manic",
//     telegramId: "1111117",
//     phoneNumber: "010999888",
//     email: "duk.manic@fmis.gov.kh",
//     operatingId: "1032-GDPFMIT",
//     roleName: ["Frontdesk"],
//     requestTypeName: [
//       "New Development",
//       "Issue Request",
//       "Network Problem",
//       "Letter Request",
//     ],
//     status: true,
//     createdAt: "2025-10-06T16:21:32.171055",
//     updatedAt: "2025-10-08T08:16:50.744332",
//   },
//   {
//     id: 7,
//     userCode: "USR_20251006_f4a41567",
//     userName: "Ha Sokun",
//     userId: "ha.sokun",
//     telegramId: "1111111",
//     phoneNumber: "010999888",
//     email: "ha.sokun@fmis.gov.kh",
//     operatingId: "1032-GDPFMIT",
//     roleName: ["Frontdesk"],
//     requestTypeName: [
//       "New Development",
//       "Issue Request",
//       "Network Problem",
//       "Letter Request",
//     ],
//     status: true,
//     createdAt: "2025-10-06T16:22:30.682055",
//     updatedAt: "2025-10-08T08:16:50.86634",
//   },
//   {
//     id: 8,
//     userCode: "USR_20251006_f1fa7205",
//     userName: "Choub Chanrasmey",
//     userId: "choub.chanrasmey",
//     telegramId: "2111111",
//     phoneNumber: "010999888",
//     email: "choub.chanrasmey@fmis.gov.kh",
//     operatingId: "1032-GDPFMIT",
//     roleName: ["Frontdesk"],
//     requestTypeName: [
//       "New Development",
//       "Issue Request",
//       "Network Problem",
//       "Letter Request",
//     ],
//     status: true,
//     createdAt: "2025-10-06T16:25:25.343911",
//     updatedAt: "2025-10-08T08:16:50.98834",
//   },
//   {
//     id: 9,
//     userCode: "USR_20251006_ad9f873a",
//     userName: "Mao Theary",
//     userId: "mao.theary",
//     telegramId: "2211111",
//     phoneNumber: "010999888",
//     email: "mao.theary@fmis.gov.kh",
//     operatingId: "1032-GDPFMIT",
//     roleName: ["Frontdesk"],
//     requestTypeName: [
//       "New Development",
//       "Issue Request",
//       "Network Problem",
//       "Letter Request",
//     ],
//     status: true,
//     createdAt: "2025-10-06T16:26:55.226057",
//     updatedAt: "2025-10-08T08:16:51.115358",
//   },
//   {
//     id: 11,
//     userCode: "USR_20251006_36b3562f",
//     userName: "Sort Reaksmey",
//     userId: "sort.reaksmey",
//     telegramId: "2222111",
//     phoneNumber: "010999888",
//     email: "sort.reaksmey@fmis.gov.kh",
//     operatingId: "1032-GDPFMIT",
//     roleName: ["Frontdesk"],
//     requestTypeName: [
//       "New Development",
//       "Issue Request",
//       "Network Problem",
//       "Letter Request",
//     ],
//     status: true,
//     createdAt: "2025-10-06T16:28:42.639399",
//     updatedAt: "2025-10-08T08:16:51.368366",
//   },
//   {
//     id: 12,
//     userCode: "USR_20251006_42622364",
//     userName: "Sun Nimol",
//     userId: "sun.nimol",
//     telegramId: "2222211",
//     phoneNumber: "010999888",
//     email: "sun.nimol@fmis.gov.kh",
//     operatingId: "1032-GDPFMIT",
//     roleName: ["Frontdesk"],
//     requestTypeName: [
//       "New Development",
//       "Issue Request",
//       "Network Problem",
//       "Letter Request",
//     ],
//     status: true,
//     createdAt: "2025-10-06T16:29:33.719998",
//     updatedAt: "2025-10-08T08:16:51.492334",
//   },
//   {
//     id: 13,
//     userCode: "USR_20251006_a3f1bf75",
//     userName: "Phoung Vanny",
//     userId: "phoung.vanny",
//     telegramId: "2222221",
//     phoneNumber: "010999888",
//     email: "phoung.vanny@fmis.gov.kh",
//     operatingId: "1032-GDPFMIT",
//     roleName: ["Frontdesk"],
//     requestTypeName: [
//       "New Development",
//       "Issue Request",
//       "Network Problem",
//       "Letter Request",
//     ],
//     status: true,
//     createdAt: "2025-10-06T16:30:21.954137",
//     updatedAt: "2025-10-08T08:16:51.612334",
//   },
//   {
//     id: 14,
//     userCode: "USR_20251006_12d4dd69",
//     userName: "Reoun Chanry",
//     userId: "reoun.chanry",
//     telegramId: "2222222",
//     phoneNumber: "010999888",
//     email: "reoun.chanry@fmis.gov.kh",
//     operatingId: "1032-GDPFMIT",
//     roleName: ["Frontdesk"],
//     requestTypeName: [
//       "New Development",
//       "Issue Request",
//       "Network Problem",
//       "Letter Request",
//     ],
//     status: true,
//     createdAt: "2025-10-06T16:31:13.002819",
//     updatedAt: "2025-10-08T08:16:51.73434",
//   },
//   {
//     id: 15,
//     userCode: "USR_20251008_f3879187",
//     userName: "John Son",
//     userId: "john.son",
//     telegramId: "1234067",
//     phoneNumber: "010999888",
//     email: "john.son@fmis.gov.kh",
//     operatingId: "1032-GDPFMIT",
//     roleName: ["new user role123"],
//     requestTypeName: [
//       "Network Problem",
//       "Issue Request",
//       "test123",
//       "new req type",
//     ],
//     status: true,
//     createdAt: "2025-10-08T21:35:41.734099",
//     updatedAt: "2025-10-08T21:35:41.734099",
//   },
// ];

// type SortKey = "name" | "position" | "location" | "age" | "date" | "salary";
type SortKey =
  | "username"
  | "userId"
  | "roleName"
  | "operatingId"
  | "status"
  | "createdAt";
type SortOrder = "asc" | "desc";

interface UsersTableProps {
  filterStatus: string;
  dates?: Date[] | null; // Accept array of any length
}

// type UserStatus = "all" | "active" | "inactive";
// type UserStatus = "active" | "inactive";

export default function UsersTable({ filterStatus, dates }: UsersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>("username");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<User4>();
  // Option 1: Only call the hook when selectedItem exists
  // Only call the hook when selectedItem exists
  const [userToDisplayInProfileModal, setUserToDisplayInProfileModal] =
    useState<User4>();

  // Extract dates from props

  // 20251218 Filter by date range
  // Handle dates safely
  // const startDate = dates?.[0] || null;
  // const endDate = dates?.[1] || dates?.[0] || null; // If only 1 date, use it as both start and end

  // const { users: tableRowData = [], isLoading: isLoadingAllUsers } =
  //   useAllActiveUsers();
  // const [filterStatus, setFilterStatus] = useState();
  const { users, isLoading: isLoadingAllUsers } = useAllUsers();
  const { deleteUser } = useDeleteUser();
  const {
    unlockUser,
    // isLoading: isUnlockingUser
  } = useUnlockUser();
  const navigate = useNavigate();
  const {
    isOpen: isUpdatePasswordModalOpen,
    openModal: openUpdatePasswordModal,
    closeModal: closeUpdatePasswordModal,
  } = useModal();
  // const [isUploading, setIsUploading] = useState(false);
  const { importUsersCsv, isLoading: isUploading } = useImportUsersCsv();

  const handleFileImport = (file: File) => {
    // This function receives each file that's added
    console.log("File received:", file);

    // You can process the file here
    // For example, upload it to a server, read it, etc.
    // setIsUploading(true);
    // importUsersCsv(file);

    // Simulate upload or processing
    // setTimeout(() => {
    //   setIsUploading(false);
    // }, 2000);

    // Return a Promise that wraps the mutation
    return new Promise<void>((resolve, reject) => {
      // importUsersCsv(file, {
      //   onSuccess: () => {
      //     toast.success("CSV imported successfully");
      //     resolve(); // Tell FileDropZone it succeeded
      //     closeImportModal();
      //   },
      //   onError: (error) => {
      //     toast.error("CSV import failed");
      //     reject(error); // Tell FileDropZone it failed
      //   },
      // });

      importUsersCsv(file, {
        onSuccess: (data) => {
          // data is the direct response, check its structure
          if (data.failureCount > 0) {
            toast.error(
              `CSV import completed with errors: ${data.failureCount} of ${data.totalRecords} records failed`
            );
            reject(new Error("Partial import failure"));
          } else {
            toast.success("CSV imported successfully");
            resolve();
          }
          closeImportModal();
        },
        onError: (error) => {
          toast.error("CSV import failed");
          reject(error);
        },
      });
    });
  };

  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const {
    isOpen: isOpenImportModal,
    openModal: openImportModal,
    closeModal: closeImportModal,
  } = useModal();

  const activeUsersColumn = [
    { key: "userName", label: "Username" },
    { key: "userId", label: "User ID" },
    { key: "roleName", label: "User Role" },
    { key: "operatingId", label: "Entity" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Created Date" },
  ];

  const inactiveUsersColumn = [
    { key: "userName", label: "Username" },
    { key: "userId", label: "User ID" },
    { key: "roleName", label: "User Role" },
    { key: "operatingId", label: "Entity" },
    { key: "createdAt", label: "Created Date" },
    { key: "inactiveDate", label: "Inactive Date" },
  ];

  const columns =
    filterStatus === "active" ? activeUsersColumn : inactiveUsersColumn;

  console.log(`${filterStatus} columns: `, columns);

  const activeUsers = users?.filter((user) => user.status === true) || [];
  const inactiveUsers = users?.filter((user) => user.status === false) || [];

  const tableRowData = filterStatus === "active" ? activeUsers : inactiveUsers;

  // // Original
  // const filteredAndSortedData = useMemo(() => {
  //   return tableRowData
  //     .filter((item) =>
  //       Object.values(item).some(
  //         (value) =>
  //           typeof value === "string" &&
  //           value.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     )
  //     .sort((a, b) => {
  //       // if (sortKey === "salary") {
  //       //   const salaryA = Number.parseInt(a[sortKey].replace(/\$|,/g, ""));
  //       //   const salaryB = Number.parseInt(b[sortKey].replace(/\$|,/g, ""));
  //       //   return sortOrder === "asc" ? salaryA - salaryB : salaryB - salaryA;
  //       // }
  //       return sortOrder === "asc"
  //         ? String(a[sortKey]).localeCompare(String(b[sortKey]))
  //         : String(b[sortKey]).localeCompare(String(a[sortKey]));
  //     });
  // }, [sortKey, sortOrder, searchTerm, tableRowData]);

  const filteredAndSortedData = useMemo(() => {
    return tableRowData
      .filter((item) => {
        // Text search filter
        const matchesSearch = Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Date range filter
        const matchesDateRange = (() => {
          if (!dates || dates.length !== 2) return true; // No filter applied

          const itemDate = new Date(item.createdAt);
          return itemDate >= dates[0] && itemDate <= dates[1];
        })();

        return matchesSearch && matchesDateRange;
      })
      .sort((a, b) => {
        return sortOrder === "asc"
          ? String(a[sortKey]).localeCompare(String(b[sortKey]))
          : String(b[sortKey]).localeCompare(String(a[sortKey]));
      });
  }, [sortKey, sortOrder, searchTerm, tableRowData, dates]);

  // const filteredAndSortedData = useMemo(() => {
  //   return tableRowData
  //     .filter((item) => {
  //       const matchesSearch = Object.values(item).some(
  //         (value) =>
  //           typeof value === "string" &&
  //           value.toLowerCase().includes(searchTerm.toLowerCase())
  //       );

  //       // Only apply date filter if we have both dates
  //       let matchesDateRange = true;
  //       // If dates is empty array or has only 1 element, show all records
  //       if (!dates || dates.length === 0 || dates.length === 1) {
  //         matchesDateRange = true;
  //       }

  //       if (dates && dates.length === 2) {
  //         const createdDate = new Date(item.createdAt);
  //         matchesDateRange = createdDate >= dates[0] && createdDate <= dates[1];
  //       }

  //       return matchesSearch && matchesDateRange;
  //     })
  //     .sort((a, b) => {
  //       return sortOrder === "asc"
  //         ? String(a[sortKey]).localeCompare(String(b[sortKey]))
  //         : String(b[sortKey]).localeCompare(String(a[sortKey]));
  //     });
  // }, [sortKey, sortOrder, searchTerm, tableRowData, dates]);

  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (key: SortKey) => {
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

  function handleDelete() {
    if (!selectedItem) return;

    deleteUser(selectedItem.id.toString(), {
      onSuccess: () => {
        toast.success("User deleted successfully");
        closeDeleteModal();
      },
    });
  }

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  const handleUpdate = (user: User4) => {
    navigate("/users/update", { state: { id: user.id } });
  };

  // function handleUpdateUserPassword(user: User4) {
  //   navigate("/admin/users/reset-password", { state: { user: user } });
  // }

  async function handleExportUsersCsv() {
    try {
      const data = await exportUsersCsv(filterStatus);

      const url = window.URL.createObjectURL(
        new Blob([data], { type: "text/csv" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.error("Export failed:", e);
    }
  }

  // User detail modal
  const {
    isOpen: isUserDetailModalOpen,
    openModal: openUserDetailModal,
    closeModal: closeUserDetailModal,
  } = useModal();

  // const userData = {
  //   username: "Jane Smith",
  //   userId: "jane.smith",
  //   telegramId: "1080080100",
  //   phoneNumber: "",
  //   email: "jane.smith@fmis.gov.kh",
  //   entity:
  //     "1032 - General Department of Public Financial Management of Information Technology",
  //   roles: ["Admin", "Front Desk Agent"],
  //   requestTypes: [
  //     "Issue Request",
  //     "New Development",
  //     "Network Problem",
  //     "Letter Request",
  //   ],
  //   profileImage: "", // Leave empty to show initials, or add image URL
  // };

  useEffect(() => {
    if (!selectedItem) return;

    const fetchUser = async () => {
      try {
        const res = await api.get<ApiResponse<User4>>(
          `${API_URL}/users/get-user-by-id/${selectedItem.id}`
        );
        // Handle the response here
        setUserToDisplayInProfileModal(res.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [selectedItem]);

  if (isLoadingAllUsers) {
    return <div className="p-4 text-gray-500">Loading users...</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]">
      <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 dark:text-gray-400">Show </span>
          <div className="relative z-20 bg-transparent">
            <select
              className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              {[5, 8, 10].map((value) => (
                <option
                  key={value}
                  value={value}
                  className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                >
                  {value}
                </option>
              ))}
            </select>
            <span className="absolute z-30 pointer-events-none text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
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

        <div className="flex gap-3">
          {/* <div className="hidden h-11 items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 lg:inline-flex dark:bg-gray-900">
            <button
              onClick={() => {
                setFilterStatus("All");
                setCurrentPage(1);
              }}
              className={`text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white ${
                filterStatus === "All"
                  ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => {
                setFilterStatus("Unpaid");
                setCurrentPage(1);
              }}
              className={`text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white ${
                filterStatus === "Unpaid"
                  ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Inactive
            </button>
          </div> */}

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
            <div className="flex gap-2 items-center justify-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => {
                openImportModal();
              }}
              variant="outline"
              size="sm"
            >
              Import
              {/* <svg
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
                  d="M10.0018 14.083C9.7866 14.083 9.59255 13.9924 9.45578 13.8472L5.61586 10.0097C5.32288 9.71688 5.32272 9.242 5.61552 8.94902C5.90832 8.65603 6.3832 8.65588 6.67618 8.94868L9.25182 11.5227L9.25182 3.33301C9.25182 2.91879 9.5876 2.58301 10.0018 2.58301C10.416 2.58301 10.7518 2.91879 10.7518 3.33301L10.7518 11.5193L13.3242 8.94866C13.6172 8.65587 14.0921 8.65604 14.3849 8.94903C14.6777 9.24203 14.6775 9.7169 14.3845 10.0097L10.5761 13.8154C10.4385 13.979 10.2323 14.083 10.0018 14.083ZM4.0835 13.333C4.0835 12.9188 3.74771 12.583 3.3335 12.583C2.91928 12.583 2.5835 12.9188 2.5835 13.333V15.1663C2.5835 16.409 3.59086 17.4163 4.8335 17.4163H15.1676C16.4102 17.4163 17.4176 16.409 17.4176 15.1663V13.333C17.4176 12.9188 17.0818 12.583 16.6676 12.583C16.2533 12.583 15.9176 12.9188 15.9176 13.333V15.1663C15.9176 15.5806 15.5818 15.9163 15.1676 15.9163H4.8335C4.41928 15.9163 4.0835 15.5806 4.0835 15.1663V13.333Z"
                  fill="currentColor"
                />
              </svg> */}
              <Upload strokeWidth={2} size={18} />
            </Button>
            <Button onClick={handleExportUsersCsv} variant="outline" size="sm">
              {filterStatus === "active" ? "Export Active" : "Export Inactive"}
              {/* <svg
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
                  d="M10.0018 14.083C9.7866 14.083 9.59255 13.9924 9.45578 13.8472L5.61586 10.0097C5.32288 9.71688 5.32272 9.242 5.61552 8.94902C5.90832 8.65603 6.3832 8.65588 6.67618 8.94868L9.25182 11.5227L9.25182 3.33301C9.25182 2.91879 9.5876 2.58301 10.0018 2.58301C10.416 2.58301 10.7518 2.91879 10.7518 3.33301L10.7518 11.5193L13.3242 8.94866C13.6172 8.65587 14.0921 8.65604 14.3849 8.94903C14.6777 9.24203 14.6775 9.7169 14.3845 10.0097L10.5761 13.8154C10.4385 13.979 10.2323 14.083 10.0018 14.083ZM4.0835 13.333C4.0835 12.9188 3.74771 12.583 3.3335 12.583C2.91928 12.583 2.5835 12.9188 2.5835 13.333V15.1663C2.5835 16.409 3.59086 17.4163 4.8335 17.4163H15.1676C16.4102 17.4163 17.4176 16.409 17.4176 15.1663V13.333C17.4176 12.9188 17.0818 12.583 16.6676 12.583C16.2533 12.583 15.9176 12.9188 15.9176 13.333V15.1663C15.9176 15.5806 15.5818 15.9163 15.1676 15.9163H4.8335C4.41928 15.9163 4.0835 15.5806 4.0835 15.1663V13.333Z"
                  fill="currentColor"
                />
              </svg> */}
              {/* <FolderUp strokeWidth={2} size={19} /> */}
              <Download strokeWidth={2} size={18} />
            </Button>
          </div>
        </div>
      </div>
      {/*min-w-max  */}
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div>
          <Table>
            {/* <div className="min-w-full inline-block align-middle">
          <Table className="min-w-full"> */}
            {/* <TableHeader className="border-t border-gray-100 dark:border-white/[0.05]"> */}
            <TableHeader className="px-6 py-3 border-t border-gray-100 border-y bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
              <TableRow>
                {
                  // [
                  //   { key: "name", label: "User" },
                  //   { key: "position", label: "Position" },
                  //   { key: "location", label: "Office" },
                  //   { key: "age", label: "Age" },
                  //   { key: "date", label: "Start Date" },
                  //   { key: "salary", label: "Salary" },
                  // ]

                  columns.map(({ key, label }) => (
                    <TableCell
                      key={key}
                      className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => handleSort(key as SortKey)}
                      >
                        <p className="font-bold uppercase text-gray-700 text-theme-sm dark:text-gray-400">
                          {label}
                        </p>

                        {key === "status" ? null : (
                          <button className="flex flex-col gap-0.5">
                            <svg
                              className={`text-gray-300 dark:text-gray-700  ${
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
                              className={`text-gray-300 dark:text-gray-700  ${
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
                  ))
                }
                {filterStatus === "active" ? (
                  <TableCell className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                    <p className="font-bold uppercase text-gray-700 text-theme-sm dark:text-gray-400">
                      Actions
                    </p>
                  </TableCell>
                ) : null}
              </TableRow>
            </TableHeader>
            {filterStatus === "active" ? (
              /* Active users table body */
              <TableBody>
                {currentData.map((item, i) => (
                  <TableRow key={i + 1} className="group">
                    <TableCell className="px-4 py-4 font-medium text-gray-800 border border-gray-100 dark:border-white/[0.05] dark:text-white text-theme-sm whitespace-nowrap">
                      <span
                        className="hover:cursor-pointer group-hover:underline group-hover:underline-offset-2"
                        onClick={() => {
                          setSelectedItem(item);
                          openUserDetailModal();
                        }}
                      >
                        {item.username}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                      {item.userId}
                    </TableCell>
                    <TableCell className="max-w-xs px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                      <div className="max-w-[16rem] flex gap-2 flex-wrap">
                        {item.roleName.map((role) => (
                          <Badge
                            key={role}
                            variant="secondary"
                            className="bg-blue-500 text-white dark:bg-blue-600"
                          >
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border dark:border-white/[0.05] border-gray-100 text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                      {item.operatingId}
                    </TableCell>
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100  dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                      <div className="flex justify-center items-center">
                        {!item.accountLocked ? (
                          <LockKeyholeOpen className="text-[#40c057] hover:text-[#69db7c] active:text-[#2f9e44] hover:cursor-pointer" />
                        ) : (
                          <LockKeyhole
                            onClick={() => unlockUser(item.id.toString())}
                            className="text-[#e5ab2c] hover:text-[#ffd43b] active:text-[#c69020]  hover:cursor-pointer"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100  dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                      {format(
                        parseISO(item.createdAt.slice(0, 23)),
                        "EEE, dd-MMM-yyyy"
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap ">
                      <div className="flex items-center w-full gap-4">
                        <Tooltip>
                          <TooltipTrigger>
                            <div
                              onClick={() => {
                                openDeleteModal();
                                setSelectedItem(item);
                              }}
                              className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                            >
                              <TrashBinIcon className="size-5" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>Delete</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger>
                            <div className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                              <PencilIcon
                                onClick={() => handleUpdate(item)}
                                className="size-5"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger>
                            <div className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                              <RotateCcwKey
                                onClick={() => {
                                  setSelectedItem(item);
                                  openUpdatePasswordModal();
                                }}
                                className="size-5"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>Reset Password</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              /* Inactive users table body */
              <TableBody>
                {currentData.map((item, i) => (
                  <TableRow key={i + 1}>
                    <TableCell className="px-4 py-4 font-medium text-gray-800 border border-gray-100 dark:border-white/[0.05] dark:text-white text-theme-sm whitespace-nowrap ">
                      <span
                        onClick={() => {
                          setSelectedItem(item);
                          openUserDetailModal();
                        }}
                      >
                        {item.username}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                      {item.userId}
                    </TableCell>
                    <TableCell className="max-w-xs px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                      <div className="max-w-[16rem] flex gap-2 flex-wrap">
                        {item.roleName.map((role) => (
                          <Badge
                            key={role}
                            variant="secondary"
                            className="bg-blue-500 text-white dark:bg-blue-600"
                          >
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border dark:border-white/[0.05] border-gray-100 text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                      {item.operatingId}
                    </TableCell>
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100  dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                      {format(
                        parseISO(item.createdAt.slice(0, 23)),
                        "EEE, dd-MMM-yyyy"
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100  dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                      {item.inactiveDate
                        ? format(
                            parseISO(item.inactiveDate.slice(0, 23)),
                            "EEE, dd-MMM-yyyy"
                          )
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </div>
      <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
          {/* Left side: Showing entries */}
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

      <ModalWithAnimation
        isOpen={isUpdatePasswordModalOpen}
        onClose={closeUpdatePasswordModal}
        className="max-w-[584px] p-5 lg:p-7"
      >
        {/* <DeleteConfirmationBox
          headerText={`Are you sure?`}
          descriptionText={`Are you sure you want to delete user: ${itemToDelete?.username}`}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        /> */}

        <AdminResetPasswordForm
          user={selectedItem}
          closeModal={closeUpdatePasswordModal}
        />
      </ModalWithAnimation>

      <ModalWithAnimation
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        className="max-w-[584px] p-5 lg:p-7"
      >
        <DeleteConfirmationBox
          headerText={`Are you sure?`}
          // descriptionText={`Are you sure you want to delete user: ${itemToDelete?.username}`}
          descriptionText={
            <>
              Are you sure you want to delete user:{" "}
              <b>{selectedItem?.username}</b>
            </>
          }
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      </ModalWithAnimation>

      <ModalWithAnimation
        isOpen={isOpenImportModal}
        onClose={closeImportModal}
        className="max-w-[584px] p-5 lg:p-7"
      >
        <FileDropZone
          onImport={handleFileImport}
          isUploading={isUploading}
          // onImport={files}
        />
      </ModalWithAnimation>

      <ModalWithAnimation
        isOpen={isUserDetailModalOpen}
        onClose={closeUserDetailModal}
        // className="max-w-[584px]"
        className="max-w-2xl"
      >
        {/* <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50"> */}
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-xl font-semibold text-gray-900">
              User Profile
            </h2>
            {/* <button
              // onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button> */}
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto overflow-x-hidden flex-1">
            <div className="px-8 py-8">
              {/* Profile Section */}
              <div className="flex items-center space-x-4 pb-8 mb-8 border-b border-gray-100">
                {userToDisplayInProfileModal?.base64Data ? (
                  <img
                    src={userToDisplayInProfileModal?.base64Data}
                    alt={userToDisplayInProfileModal?.username}
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0">
                    {userToDisplayInProfileModal?.username
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 break-words">
                    {userToDisplayInProfileModal?.username}
                  </h3>
                  <p className="text-sm text-gray-500 break-words">
                    @{userToDisplayInProfileModal?.userId}
                  </p>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-6">
                  Personal information
                </h3>

                <div className="space-y-6">
                  {/* Username and User ID */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="min-w-0">
                      <label className="block text-xs lg:text-sm text-gray-500 mb-2">
                        Username
                      </label>
                      <p className="text-sm lg:text-base text-gray-900 break-words">
                        {userToDisplayInProfileModal?.username}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <label className="block text-xs lg:text-sm text-gray-500 mb-2">
                        User ID
                      </label>
                      <p className="text-sm lg:text-base text-gray-900 break-words">
                        {userToDisplayInProfileModal?.userId}
                      </p>
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="min-w-0">
                      <label className="block text-xs lg:text-sm text-gray-500 mb-2">
                        Email address
                      </label>
                      <p className="text-sm lg:text-base text-gray-900 break-words">
                        {userToDisplayInProfileModal?.email}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <label className="block text-xs lg:text-sm text-gray-500 mb-2">
                        Phone
                      </label>
                      <p className="text-sm lg:text-base text-gray-400 italic break-words">
                        {userToDisplayInProfileModal?.phoneNumber ||
                          "Not provided"}
                      </p>
                    </div>
                  </div>

                  {/* Telegram ID */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="min-w-0">
                      <label className="block text-xs lg:text-sm text-gray-500 mb-2">
                        Telegram ID
                      </label>
                      <p className="text-sm lg:text-base text-gray-900 break-words">
                        {userToDisplayInProfileModal?.telegramId}
                      </p>
                    </div>
                  </div>

                  {/* Entity */}
                  <div>
                    <label className="block text-xs lg:text-sm text-gray-500 mb-2">
                      Entity
                    </label>
                    <p className="text-sm lg:text-base text-gray-900 break-words">
                      {userToDisplayInProfileModal?.operatingId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Roles & Permissions Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-6">
                  Roles & Permissions
                </h3>

                <div className="space-y-6">
                  {/* Roles */}
                  <div>
                    <label className="block text-xs lg:text-sm text-gray-500 mb-3">
                      Assigned Roles
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {userToDisplayInProfileModal?.roleName.map((role) => (
                        <span
                          key={role}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Request Types */}
                  <div>
                    <label className="block text-xs lg:text-sm text-gray-500 mb-3">
                      Request Types
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {userToDisplayInProfileModal?.requestTypeName.map(
                        (type) => (
                          <span
                            key={type}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                          >
                            {type}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 px-8 py-5 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={closeUserDetailModal}
              className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Close
            </button>
            {/* <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
              Edit Profile
            </button> */}
          </div>
        </div>
        {/* </div> */}
      </ModalWithAnimation>
    </div>
  );
}

// {
//   /* Active column  */
// }
// <TableBody>
//   {currentData.map((item, i) => (
//     <TableRow key={i + 1}>
//       <TableCell className="px-4 py-4 font-medium text-gray-800 border border-gray-100 dark:border-white/[0.05] dark:text-white text-theme-sm whitespace-nowrap ">
//         {item.username}
//       </TableCell>
//       <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
//         {item.userId}
//       </TableCell>
//       <TableCell className="max-w-xs px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
//         {/* {item.roleName.map((role) => (
//                       <Badge className="mr-2" variant="secondary">
//                         {role}
//                       </Badge>
//                     ))} */}
//         <div className="max-w-[16rem] flex gap-2 flex-wrap">
//           {item.roleName.map((role) => (
//             <Badge
//               key={role}
//               // variant="secondary"
//               variant="secondary"
//               className="bg-blue-500 text-white dark:bg-blue-600"
//             >
//               {role}
//             </Badge>
//           ))}
//         </div>
//       </TableCell>
//       <TableCell className="px-4 py-4 font-normal text-gray-800 border dark:border-white/[0.05] border-gray-100 text-theme-sm dark:text-gray-400 whitespace-nowrap ">
//         {item.operatingId}
//       </TableCell>
//       <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100  dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
//         {/* {item.status} */}
//         <div className="flex justify-center items-center">
//           {!item.accountLocked ? (
//             // color="#ffc038" original
//             // dark #2f9e44
//             // dark #f08c00
//             <LockKeyholeOpen
//               // color=""
//               className="text-[#40c057] hover:text-[#69db7c] active:text-[#2f9e44] hover:cursor-pointer"
//             />
//           ) : (
//             <LockKeyhole
//               onClick={() => unlockUser(item.id.toString())}
//               // color="#e5ab2c"
//               className="text-[#e5ab2c] hover:text-[#ffd43b] active:text-[#c69020]  hover:cursor-pointer"
//             />
//           )}
//         </div>
//       </TableCell>
//       <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100  dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
//         {format(parseISO(item.createdAt.slice(0, 23)), "EEE, dd-MMM-yyyy")}
//         {/* HH:mm:ss */}
//       </TableCell>
//       <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap ">
//         <div className="flex items-center w-full gap-4">
//           <Tooltip>
//             <TooltipTrigger>
//               <div
//                 onClick={() => {
//                   openDeleteModal();
//                   setItemToDelete(item);
//                 }}
//                 className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
//               >
//                 <TrashBinIcon className="size-5" />
//               </div>
//             </TooltipTrigger>
//             <TooltipContent>Delete</TooltipContent>
//           </Tooltip>

//           <Tooltip>
//             <TooltipTrigger>
//               <div className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
//                 <PencilIcon
//                   // onClick={() => navigate("/users/update")}
//                   onClick={() => handleUpdate(item)}
//                   className="size-5"
//                 />
//               </div>
//             </TooltipTrigger>
//             <TooltipContent>Edit</TooltipContent>
//           </Tooltip>

//           {/* Admin feature */}
//           <Tooltip>
//             <TooltipTrigger>
//               <div className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
//                 <RotateCcwKey
//                   // onClick={() => handleUpdateUserPassword(item)}
//                   onClick={() => {
//                     setItemToDelete(item);
//                     openUpdatePasswordModal();
//                   }}
//                   className="size-5"
//                 />
//               </div>
//             </TooltipTrigger>
//             <TooltipContent>Reset Password</TooltipContent>
//           </Tooltip>

//           {/*  */}
//         </div>
//       </TableCell>
//     </TableRow>
//   ))}
// </TableBody>;

// Should be inside table row
{
  /* <TableCell className="px-4 py-4 font-medium text-gray-800 border border-gray-100 dark:border-white/[0.05] dark:text-white text-theme-sm whitespace-nowrap ">
                    {item.name}
                  </TableCell>
                  <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                    {item.position}
                  </TableCell>
                  <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                    {item.location}
                  </TableCell>
                  <TableCell className="px-4 py-4 font-normal text-gray-800 border dark:border-white/[0.05] border-gray-100 text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                    {item.age}
                  </TableCell>
                  <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100  dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                    {item.date}
                  </TableCell>
                  <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100  dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                    {item.salary}
                  </TableCell> */
}
{
  /* //   type SortKey =
                  //     | "userName"
                  //     | "userId"
                  //     | "roleName"
                  //     | "operatingId"
                  //     | "status"
                  //     | "createdAt"; */
}
{
  /* New cell based on user model/type */
}

////////////////////////////////////////////////////////////////
