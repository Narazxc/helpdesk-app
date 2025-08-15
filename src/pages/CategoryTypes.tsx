// Component
import CategoryTypeList from "@/features/category-type/CategoryTypeList";
import CreateCategoryTypeForm from "@/features/category-type/CreateCategoryTypeForm";
import { ModalWithAnimation } from "@/features/request-type/ModalWithAnimation";

// Hook
import { useModal } from "@/hook/useModal";

// React router
import { Link } from "react-router";

export default function CategoryTypes() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h1 className="text-2xl text-color font-semibold">Category Type</h1>

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
              /<span className="page-title-text">Category Type</span>
            </li>
          </ol>
        </nav>
      </div>
      <button
        onClick={openModal}
        className="bg-[#4263eb] mb-4 text-sm dark:text-white text-white px-4 py-2 rounded-md"
      >
        Add new
      </button>

      <div className="border-1 dark:bg-gray-900 dark:border-gray-800 border-blue-400 p-8 rounded-md bg-white shadow-md">
        <CategoryTypeList />
      </div>

      <ModalWithAnimation
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-7"
      >
        <CreateCategoryTypeForm closeModal={closeModal} />
      </ModalWithAnimation>
    </div>
  );
}
