// Icon
import { Trash2 } from "lucide-react";

// React router
import { Link, useParams } from "react-router";

// Hook
import { useModal } from "../../hook/useModal";
import { useAssetType } from "./useAssetType";
import { useDeleteAssetType } from "./useDeleteAssetType";

// Component
import { Skeleton } from "@/components/ui/skeleton";
import UpdateAssetTypeForm from "./UpdateAssetTypeForm";
import { ModalWithAnimation } from "@/components/ModalWithAnimation";

// Shadcn

export default function AssetTypeDetail() {
  const { id } = useParams();
  const { assetType, isLoading, error } = useAssetType(id?.toString() || "");
  const { deleteAssetType } = useDeleteAssetType();

  // Separate modal states
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

  // if (!requestType) {
  //   return <div>Invalid request type ID</div>;
  // }

  // console.log("Inside detail page", requestType);

  // if (!requestType || requestType.status === false) {
  //   return <div>Request type not found</div>;
  // }

  // Check for invalid ID first
  // if (!id) {
  //   return <div>Invalid request type ID</div>;
  // }

  //   function handleDeleteRequestType() {
  //     deleteRequestType(requestType.id.toString());
  //     openDeleteModal();
  //   }

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="flex flex-col gap-12">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <Skeleton className="h-8 w-48" /> {/* Title skeleton */}
            <nav>
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Skeleton className="h-4 w-12" />
                </li>
                <li className="flex items-center gap-1.5">
                  <span>/</span>
                  <Skeleton className="h-4 w-24" />
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-gray-500 dark:text-gray-400">/</span>
                  <Skeleton className="h-4 w-20" />
                </li>
              </ol>
            </nav>
          </div>

          <div className="rounded-lg min-h-[10rem] m-[1px] p-4 bg-white shadow-sm border-1 border-gray-200 relative dark:bg-[#171e2e] dark:border-white/[0.05]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[150px_1fr] lg:gap-7 2xl:gap-x-8">
                  <div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div>
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Skeleton className="h-9 w-16" />
                <Skeleton className="h-9 w-18" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Check for errors
  if (error) {
    return <div>Error loading asset type: {error.message}</div>;
  }

  // Now check if assetType exists or has invalid status
  if (!assetType || assetType.status === false) {
    return <div>Asset type not found</div>;
  }

  function handleDeleteAssetType() {
    openDeleteModal();
  }

  return (
    <div className="flex flex-col gap-12">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl text-color font-bold">Asset Type Detail</h1>
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
                <Link to="/asset-types">Asset Type</Link>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90">
                <span className="text-gray-500 dark:text-gray-400">/</span>

                <span className="page-title-text">{assetType?.name}</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Detail for request type with ID: {id} */}

        <div className="rounded-lg min-h-[10rem] m-[1px] p-4 bg-white shadow-sm border-1 border-gray-200 relative dark:bg-[#171e2e] dark:border-white/[0.05]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="w-[80%]">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[150px_1fr] lg:gap-7 2xl:gap-x-8">
                <div>
                  <p className="text-sm text-color font-semibold">
                    Request Type
                  </p>
                </div>
                <div>
                  <p className="text-sm text-color font-normal">
                    {assetType.requestName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-color font-semibold">
                    Category Type
                  </p>
                </div>
                <div>
                  <p className="text-sm text-color font-normal">
                    {assetType.categoryName}
                  </p>
                </div>
                <div>
                  {/* text-gray-800 dark:text-white/90 */}
                  <p className="text-sm text-color font-semibold ">
                    Asset Type
                  </p>
                </div>
                <div>
                  {/* text-gray-800 dark:text-white/90 */}
                  <p className="text-sm text-color font-normal">
                    {assetType.name}
                  </p>
                </div>
                <div>
                  {/* text-gray-800 dark:text-white/90 */}
                  <p className="text-sm text-color font-semibold">
                    Description
                  </p>
                </div>
                <div className="w-full text-wrap">
                  {/* text-gray-800 dark:text-white/90 */}
                  <p className="text-sm text-color font-normal">
                    {assetType.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={openEditModal}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                    fill=""
                  ></path>
                </svg>
                Edit
              </button>

              {/* bg-white
                    text-gray-700
                    hover:text-gray-800
                    hover:bg-gray-50
                  */}
              {/* <button onClick={() => deleteRequestType(requestType.id.toString())} className="flex w-full items-center justify-center bg-white text-gray-700 hover:text-gray-800 hover:bg-gray-50 gap-2 rounded-full border border-gray-300 px-3 py-2 text-sm font-medium shadow-theme-xs  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
                  <Trash2 size={18} />
                  Delete
                </button> */}
              <button
                onClick={handleDeleteAssetType}
                className="flex w-full items-center justify-center bg-white text-gray-700 hover:text-gray-800 hover:bg-gray-50 gap-2 rounded-full border border-gray-300 px-3 py-2 text-sm font-medium shadow-theme-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
              >
                <Trash2 size={18} />
                Delete
              </button>

              <ModalWithAnimation
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                className="max-w-[584px] p-5 lg:p-7"
              >
                {/* Delete request type */}
                <h2 className="font-semibold text-lg mb-4">Are you sure?</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Are you sure you want to delete asset type?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      console.log("close modal worked!");
                      closeDeleteModal();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      deleteAssetType(assetType.id.toString());
                      closeEditModal();
                    }}
                    className="flex w-full items-center justify-center bg-red-500 text-gray-200 hover:text-gray-800 hover:bg-gray-50 gap-2 rounded-full border border-gray-300 px-3 py-2 text-sm font-medium shadow-theme-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                  >
                    Delete
                  </button>
                </div>
              </ModalWithAnimation>

              <ModalWithAnimation
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                className="max-w-[584px] p-5 lg:p-7"
              >
                <UpdateAssetTypeForm
                  assetType={assetType}
                  closeModal={closeEditModal}
                />
              </ModalWithAnimation>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
