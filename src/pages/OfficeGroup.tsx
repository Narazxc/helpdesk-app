// React router
import { Link, useParams } from "react-router";

// Type
import type { OfficeGroup, UpdateOfficeGroup } from "@/types/office-group";
import { Pencil, Trash2 } from "lucide-react";

// Hook
import { useState } from "react";
import { useAgentGroupsByOfficeGroupCode } from "@/features/agent-group/useAgentGroupsByOfficeGroupCode";
import { useAllUsers } from "@/features/auth/useAllUsers";
import { useDeleteOfficeGroup } from "@/features/office-group/useDeleteOfficeGroup";
import { useOfficeGroupById } from "@/features/office-group/useOfficeGroup";
import { useModal } from "@/hook/useModal";

// import { useAgentGroupsByOfficeGroupCode } from "@/features/agent-group/useAgentGroupsByOfficeGroupCode";

// Component
import DeliveryActivityTable from "@/features/office-group/AgentGroupTable";
import UpdateOfficeGroupForm from "@/features/office-group/UpdateOfficeGroupForm";
import PageMeta from "@/components/common/PageMeta";
import DeleteConfirmationBox from "@/components/DeleteConfirmationBox";
import { ModalWithAnimation } from "@/components/ModalWithAnimation";

export default function OfficeGroup() {
  const { id } = useParams();
  const { users } = useAllUsers();
  const { officeGroup, isLoading: isOfficeGroupLoading } = useOfficeGroupById(
    id?.toString() || ""
  );
  const { deleteOfficeGroup } = useDeleteOfficeGroup();
  const [updateData, setUpdateData] = useState<UpdateOfficeGroup>();

  const { agentGroupsByOfficeGroupCode, isLoading: isAgentGroupsLoading } =
    useAgentGroupsByOfficeGroupCode(officeGroup?.officeGroupCode || "");

  // Modal
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

  function handleDelete() {
    if (id) {
      deleteOfficeGroup(id, {
        onSuccess: () => {
          console.log("Deleted successfully!");
          closeDeleteModal();
        },
      });
    }
  }

  // function handleUpdate() {
  //   if (officeGroup) {
  //     const user = users.find(
  //       (user) => user.userName === officeGroup.chiefOfficeName
  //     );

  //     if (!user) {
  //       console.error(
  //         "User not found for chiefOfficeName:",
  //         officeGroup.chiefOfficeName
  //       );
  //       return; // Exit early if user is not found
  //     }

  //     const updateData: UpdateOfficeGroup = {
  //       id: officeGroup.id.toString(),
  //       newOfficeGroupData: {
  //         officeName: officeGroup.officeName,
  //         userCode: user.userCode,
  //       },
  //     };

  //     setUpdateData(updateData);
  //   }
  // }

  function handleUpdate() {
    if (officeGroup) {
      const user = users.find(
        (user) => user.username === officeGroup.chiefOfficeName
      );

      if (!user) {
        console.error(
          "User not found for chiefOfficeName:",
          officeGroup.chiefOfficeName
        );

        const updateData: UpdateOfficeGroup = {
          id: officeGroup.id.toString(),
          newOfficeGroupData: {
            officeName: officeGroup.officeName,
            userCode: "", // Default value when user not found
          },
        };

        setUpdateData(updateData);
        return; // Exit after handling the not-found case
      }

      const updateData: UpdateOfficeGroup = {
        id: officeGroup.id.toString(),
        newOfficeGroupData: {
          officeName: officeGroup.officeName,
          userCode: user.userCode,
        },
      };

      setUpdateData(updateData);
    }
  }

  return (
    <>
      <PageMeta
        title="React.js E-commerce Single Transaction  | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js E-commerce Single Transaction  page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      {/* <InvoiceListTable /> */}
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
          <h1 className="text-2xl text-color font-bold">Office Group Detail</h1>

          {/* Breadcrumb */}
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
              <span className="text-gray-500">/</span>
              <li className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400">
                <Link to="/office-groups">Office Group</Link>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90">
                <span className="text-gray-500 dark:text-gray-400">/</span>

                <span className="page-title-text">
                  {officeGroup?.officeName}
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Office group detail section */}
        <div className="shadow-sm lg:items-start lg:justify-between flex flex-col justify-between gap-6 rounded-2xl border border-gray-200 bg-white px-6 py-5 sm:flex-row sm:items-center dark:border-gray-800 dark:bg-white/3">
          <div className="flex flex-col gap-2.5 divide-gray-300 sm:flex-row sm:divide-x dark:divide-gray-700">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[150px_1fr] lg:gap-4 2xl:gap-x-8">
              <div>
                <p className="text-sm text-color font-semibold ">Office Name</p>
              </div>
              <div>
                <p className="text-sm text-color font-normal">
                  {officeGroup?.officeName}
                </p>
              </div>
              <div>
                <p className="text-sm text-color font-semibold">Office Chief</p>
              </div>
              <div>
                <p className="text-sm text-color font-normal">
                  {officeGroup?.chiefOfficeName}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                openEditModal();
                handleUpdate();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <Pencil size={18} />
              Edit
            </button>

            <button
              onClick={openDeleteModal}
              className="flex w-full items-center justify-center bg-white text-gray-700 hover:text-gray-800 hover:bg-gray-50 gap-2 rounded-full border border-gray-300 px-3 py-2 text-sm font-medium shadow-theme-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>

          <ModalWithAnimation
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            className="max-w-[584px] p-5 lg:p-7"
          >
            <UpdateOfficeGroupForm
              officeGroupData={updateData!}
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

        {/* {isOfficeGroupLoading || isAgentGroupsLoading ? (
          <div>Loading...</div>
        ) : agentGroupsByOfficeGroupCode?.length > 0 ? (
          <DeliveryActivityTable
            agentGroupsByOfficeGroupCode={agentGroupsByOfficeGroupCode ?? []}
          />
        ) : (
          <div>No agent groups found</div>
        )} */}

        {isOfficeGroupLoading || isAgentGroupsLoading ? (
          <div>Loading...</div>
        ) : (
          <DeliveryActivityTable
            agentGroupsByOfficeGroupCode={agentGroupsByOfficeGroupCode ?? []}
          />
        )}
      </div>
    </>
  );

  {
    /* Left buttons */
  }
  {
    /* <div className="flex gap-3">
            <button className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition">
              View Receipt
            </button>
            <button className="shadow-theme-xs inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]">
              Refund
            </button>
          </div> */
  }

  // return (
  //   <>
  //     <PageMeta
  //       title="React.js E-commerce Single Transaction  | TailAdmin - React.js Admin Dashboard Template"
  //       description="This is React.js E-commerce Single Transaction  page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
  //     />
  //     <PageBreadcrumb pageTitle="Single Transaction" />
  //     <div className="space-y-6">
  //       <TransactionHeader />

  //       <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
  //         <div className="lg:col-span-8 2xl:col-span-9">
  //           <OrderDetailsTable />
  //         </div>
  //         <div className="space-y-6 lg:col-span-4 2xl:col-span-3">
  //           <CustomerDetails />
  //           <OrderHistory />
  //         </div>
  //       </div>
  //     </div>
  //   </>
}
