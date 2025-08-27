// React router
import { Link } from "react-router";

// Component
import CreateAssetTypeForm from "@/features/asset-type/CreateAssetTypeForm";
// import AssetTypeList from "@/features/asset-type/AssetTypeList";
import { ModalWithAnimation } from "@/components/ModalWithAnimation";
// import TypeDataTable from "@/features/request-type/TypeDataTable";

// Hook
// import { useAssetTypes } from "@/features/asset-type/useAssetTypes";
import { useModal } from "@/hook/useModal";

// Type
// import type { AssetType } from "@/types/asset-type";
// import type { ColumnConfig } from "@/features/request-type/TypeDataTable";
import AssetTypeTable from "@/features/asset-type/AssetTypeTable";

export default function AssetTypes() {
  const { isOpen, closeModal, openModal } = useModal();
  // const { assetTypes } = useAssetTypes();

  // const assetTypeColumns: ColumnConfig<AssetType>[] = [
  //   {
  //     key: "name",
  //     label: "Asset Name",
  //     render: (name: string, asset: AssetType) => (
  //       <Link
  //         to={`/asset-type/${asset.id}`} // or wherever you want to link
  //         className="text-blue-600 hover:text-blue-800 hover:underline"
  //       >
  //         {name}
  //       </Link>
  //     ),
  //   },
  // ];

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h1 className="text-2xl text-color font-bold">Asset Type</h1>

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
              /<span className="page-title-text">Asset Type</span>
            </li>
          </ol>
        </nav>
      </div>
      <button
        onClick={openModal}
        // bg-[#4263eb]
        className="bg-[#4264eb] hover:bg-[#5b78ed] border-[2px] flex flex-col justify-center h-9 transition-colors duration-150 hover:border-[#4b6cee] border-[#a0afee] mb-4 text-sm dark:text-white text-white px-4 py-2 rounded-md"
      >
        Add New
      </button>
      {/* <AssetTypeList /> */}
      {/* border-blue-400 */}
      <div className="border-1 dark:bg-gray-900 dark:border-gray-800 p-6 rounded-md bg-white shadow-md">
        <AssetTypeTable />
      </div>
      {/* <TypeDataTable
        data={assetTypes}
        columns={assetTypeColumns}
        showActions={!!assetTypes.length}
      /> */}
      <ModalWithAnimation
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-7"
      >
        <CreateAssetTypeForm closeModal={closeModal} />
      </ModalWithAnimation>
    </div>
  );
}
