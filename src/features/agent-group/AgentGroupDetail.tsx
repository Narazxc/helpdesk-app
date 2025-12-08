import PageMeta from "@/components/common/PageMeta";
import { Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { useAgentGroupById } from "./useAgentGroup";
import AgentGroupMembersTable from "./AgentGroupMembersTable";
import { useModal } from "@/hook/useModal";
import { ModalWithAnimation } from "@/components/ModalWithAnimation";
import DeleteConfirmationBox from "@/components/DeleteConfirmationBox";
import toast from "react-hot-toast";
import { useDeleteAgentGroup } from "./useDeleteAgentGroup";
import UpdateAgentGroupForm from "./UpdateAgentGroupForm";
import type { AgentGroup, UpdateAgentGroup } from "@/types/agent-group";
import { useState } from "react";
import { useOfficeGroups } from "../office-group/useOfficeGroups";
import { useGroupLevels } from "./useGroupLevels";
import { useAllActiveUsers } from "../auth/useAllActiveUsers";

export default function AgentGroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agentGroup } = useAgentGroupById(id || "");

  // data for compare
  const { users } = useAllActiveUsers();
  const { officeGroups } = useOfficeGroups();
  const { groupLevels } = useGroupLevels();

  const [itemToUpdate, setItemToUpdate] = useState<{
    id: string;
    newAgentGroupData: UpdateAgentGroup;
  }>();

  const { deleteAgentGroup } = useDeleteAgentGroup();

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
    // console.log("itemToDelete", itemToDelete);
    if (agentGroup) {
      deleteAgentGroup(agentGroup?.id.toString(), {
        onSuccess: () => {
          closeDeleteModal();
          navigate("/agent-groups");
          toast.success("Agent Group successfully deleted"); // Shows on new page
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  }

  // This feature not yet implemented
  function handleUpdate(rowItem: AgentGroup) {
    if (rowItem) {
      const leader = users.find((user) => user.username === rowItem.leaderName);

      if (!leader) {
        console.error("User not found for leaderName:", rowItem.leaderName);
        // return; // Exit early if user is not found
      }

      const initialGroupLevel = groupLevels.find(
        (groupLevel) => groupLevel.groupLevelName === rowItem.levelName
      );

      if (!initialGroupLevel) {
        console.error(
          "Group level not found for group level:",
          rowItem.levelName
        );
        // return;
      }

      const initialOfficeGroup = officeGroups.find(
        (officeGroup) => officeGroup.officeName === rowItem.officeName
      );

      if (!initialOfficeGroup) {
        console.error(
          "Office group not found for office group:",
          rowItem.officeName
        );
      }

      // let initialMembers: string[] = [];
      // rowItem.memberNames.forEach((memberName) => {
      //   users.forEach((user) => {
      //     if (memberName === user.userName) {
      //       initialMembers.push(user.userCode);
      //     }
      //   });
      // });
      // Build a map for quick lookup
      const userMap = new Map(
        users.map((user) => [user.username, user.userCode])
      );

      // Map member names to codes
      const initialMembers = rowItem.memberNames
        .map((memberName) => userMap.get(memberName))
        .filter((code): code is string => Boolean(code)); // filter out undefined

      const updateData: {
        id: string;
        newAgentGroupData: UpdateAgentGroup;
      } = {
        id: rowItem.id.toString(), // Fixed: Added colon instead of space
        newAgentGroupData: {
          agentName: rowItem.agentName,
          leaderCode: leader?.userCode ?? null,
          groupLevel: initialGroupLevel?.groupLevelCode ?? null,
          officeGroupCode: initialOfficeGroup?.officeGroupCode ?? null,
          memberCodes: initialMembers,
          // memberRole:
        },
      };

      // export interface UpdateAgentGroup {
      //   moduleName: string;
      //   leaderName: string;
      //   groupLevel: string;
      //   officeGroupCode: string;
      //   memberRole: string[];
      // }

      setItemToUpdate(updateData);
    }

    openEditModal();
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
          <h1 className="text-2xl text-color font-bold">Agent Group Detail</h1>

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
                <Link to="/agent-groups">Agent Group</Link>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90">
                <span className="text-gray-500 dark:text-gray-400">/</span>

                <span className="page-title-text">{agentGroup?.agentName}</span>
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
                  {agentGroup?.officeName}
                </p>
              </div>
              <div>
                <p className="text-sm text-color font-semibold ">
                  Agent Group Name
                </p>
              </div>
              <div>
                <p className="text-sm text-color font-normal">
                  {agentGroup?.agentName}
                </p>
              </div>
              <div>
                <p className="text-sm text-color font-semibold">
                  Agent Group Leader
                </p>
              </div>
              <div>
                <p className="text-sm text-color font-normal">
                  {agentGroup?.leaderName}
                </p>
              </div>
              <div>
                <p className="text-sm text-color font-semibold">Group Level</p>
              </div>
              <div>
                <p className="text-sm text-color font-normal">
                  {agentGroup?.levelName}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                openEditModal();
                handleUpdate(agentGroup!);
              }}
              disabled={!agentGroup}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <Pencil size={18} />
              Edit
            </button>
            <button
              onClick={() => {
                openDeleteModal();
              }}
              className="flex w-full items-center justify-center bg-white text-gray-700 hover:text-gray-800 hover:bg-gray-50 gap-2 rounded-full border border-gray-300 px-3 py-2 text-sm font-medium shadow-theme-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>

          {/* Left buttons */}
          {/* <div className="flex gap-3">
            <button className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition">
              View Receipt
            </button>
            <button className="shadow-theme-xs inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]">
              Refund
            </button>
          </div> */}
        </div>

        {/* Agent Group Members Table */}
        <AgentGroupMembersTable
          agentGroupMembers={agentGroup?.memberNames ?? []}
        />

        {/* Update Modal */}
        {itemToUpdate && (
          <ModalWithAnimation
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            className="max-w-[584px] p-5 lg:p-7"
          >
            <UpdateAgentGroupForm
              initialData={itemToUpdate}
              closeModal={closeEditModal}
            />
          </ModalWithAnimation>
        )}

        {/* Delete Modal */}
        <ModalWithAnimation
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          className="max-w-[584px] p-5 lg:p-7"
        >
          <DeleteConfirmationBox
            headerText={`Are you sure?`}
            descriptionText={`Deleting agent group`}
            onClose={closeDeleteModal}
            onDelete={handleDelete}
          />
        </ModalWithAnimation>
      </div>
    </>
  );
}
