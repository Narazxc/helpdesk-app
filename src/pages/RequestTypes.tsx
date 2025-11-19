// React router
import { Link } from "react-router";

// Component
import CreateRequestTypeForm from "../features/request-type/CreateRequestTypeForm";
import RequestTypeList from "@/features/request-type/RequestTypeList";
import RequestTypeListSkeleton from "@/features/request-type/RequestTypeListSkeleton";
import { ModalWithAnimation } from "@/components/ModalWithAnimation";

// Hook
import { useModal } from "../hook/useModal";
import { useRequestTypes } from "../features/request-type/useRequestTypes";

export default function RequestTypes() {
  const { requestTypes, isLoading: isLoadingRequestTypes } = useRequestTypes();
  const { isOpen, openModal, closeModal } = useModal();

  console.log("requestType", requestTypes);

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h1 className="text-2xl text-color font-bold">Request Type</h1>

        {/* Breadcrumb */}
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                className={`flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90">
              /<span className="page-title-text">Request Type</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Create Button */}
      <button
        onClick={openModal}
        className="bg-[#4263eb] mb-4 text-sm dark:text-white text-white px-4 py-2 rounded-md"
      >
        Add New
      </button>

      {/* List */}
      <div className="border-1 dark:bg-gray-900 dark:border-gray-800 border-blue-400 p-8 rounded-md bg-white shadow-md">
        {isLoadingRequestTypes ? (
          <RequestTypeListSkeleton />
        ) : (
          <RequestTypeList requestTypes={requestTypes || []} />
        )}
      </div>

      {/* Create RequestType Modal */}
      <ModalWithAnimation
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-7"
      >
        <CreateRequestTypeForm closeModal={closeModal} />
      </ModalWithAnimation>
    </div>
  );
}

// <ul className="grid md:grid-cols-4 place-content-center gap-x-8 gap-y-8 sm:grid-cols-2 grid-cols-1">
//   {requestTypes1.map((requestType) => (
//     <Link key={requestType.name} to={`/request-type/${requestType.id}`}>
//       <li className="bg-white group hover:bg-[#1864ab] h-[100px] lg:min-w-[9rem] flex-1 rounded-md shadow-md border-1 border-gray-200 px-3 py-1.5 cursor-pointer hover:shadow-lg text-nowrap">
//         <p className="text-wrap text-sm font-medium text-black group-hover:text-white">
//           {requestType.name}
//         </p>
//         <p className="text-xs group-hover:text-gray-100/80">
//           Category <span>N</span>
//         </p>
//       </li>
//     </Link>
//   ))}
//   {/* text-gray-500 */}

//   {/* For hardcoded data */}
//   {/* {requestTypes.map((requestType) => (
//     <Link
//       key={requestType.reqTypeName}
//       to={`/request-type/${requestType.reqTypeName}`}
//     >
//       <li className="bg-white h-[100px] lg:min-w-[9rem] flex-1 rounded-md shadow-md border-1 border-gray-200 px-3 py-1.5 cursor-pointer hover:shadow-lg text-nowrap">
//         <p className="text-wrap text-sm font-medium">
//           {requestType.reqTypeDescription}
//         </p>
//         <p className="text-xs text-gray-500">
//           <span>{requestType.categoryTypeCount}</span> Category
//         </p>
//       </li>
//     </Link>
//   ))} */}
// </ul>;

// Old, Test data
// // Example hardcoded data
// const [ requestTypes, setRequestTypes ] = useState(requestTypesArr);
// export interface IRequestType {
//   reqTypeName: string;
//   reqTypeDescription: string;
//   categoryTypeCount: number;
// }

// const requestTypesArr: IRequestType[] = [
//   {
//     reqTypeName: "Issue Request",
//     reqTypeDescription: "abc",
//     categoryTypeCount: 3,
//   },
//   {
//     reqTypeName: "Network problem",
//     reqTypeDescription: "abc",
//     categoryTypeCount: 3,
//   },
//   {
//     reqTypeName: "Letter request",
//     reqTypeDescription: "abc",
//     categoryTypeCount: 3,
//   },
//   {
//     reqTypeName: "Development",
//     reqTypeDescription: "abc",
//     categoryTypeCount: 3,
//   },
// ];
