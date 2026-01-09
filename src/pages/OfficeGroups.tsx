// React router
import { Link } from "react-router";

// Component
import { ModalWithAnimation } from "@/components/ModalWithAnimation";
import CreateOfficeGroupForm from "@/features/office-group/CreateOfficeGroupForm";
import OfficeGroupTable from "@/features/office-group/OfficeGroupTable";

// Hook
import { useModal } from "@/hook/useModal";

export default function OfficeGroups() {
  const { isOpen, closeModal, openModal } = useModal();

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h1 className="text-2xl text-color font-bold">Office Group</h1>

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
              /<span className="page-title-text">Office Group</span>
            </li>
          </ol>
        </nav>
      </div>

      <button
        onClick={openModal}
        className="bg-[#4264eb] hover:bg-[#5b78ed] border-[2px] flex flex-col justify-center h-9 transition-colors duration-150 hover:border-[#4b6cee] border-[#a0afee] mb-4 text-sm dark:text-white text-white px-4 py-2 rounded-md"
      >
        Add New
      </button>

      <div className="border-1 dark:bg-gray-900 dark:border-gray-800 p-6 rounded-md bg-white shadow-md">
        <OfficeGroupTable />
      </div>

      {/* Create Office Group modal */}
      <ModalWithAnimation
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-7"
      >
        <CreateOfficeGroupForm closeModal={closeModal} />
      </ModalWithAnimation>
    </div>
  );
}
