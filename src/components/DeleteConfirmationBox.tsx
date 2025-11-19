import type { ReactNode } from "react";

interface DeleteConfirmationBoxProps {
  onDelete: () => void; // function with no arguments
  onClose: () => void; // function with no arguments
  headerText: string;
  descriptionText?: ReactNode; // optional prop
}

export default function DeleteConfirmationBox({
  onDelete,
  onClose,
  headerText,
  descriptionText,
}: DeleteConfirmationBoxProps) {
  return (
    <div>
      <h2 className="font-semibold text-lg mb-4">{headerText}</h2>
      <p className="text-sm text-gray-500 mb-6">{descriptionText}</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            onClose();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          Cancel
        </button>
        <button
          onClick={() => onDelete()}
          className="flex w-full items-center justify-center bg-red-500 text-gray-200 hover:text-gray-800 hover:bg-gray-50 gap-2 rounded-full border border-gray-300 px-3 py-2 text-sm font-medium shadow-theme-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
