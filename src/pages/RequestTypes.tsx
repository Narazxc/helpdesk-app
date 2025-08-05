// import { useState } from "react";
// // import { RequestTypeModal } from "./RequestTypeModal";
// // import Button from "../../components/ui/button/Button";
// // import Label from "../../components/form/Label";
// // import { Modal } from "../../components/ui/modal";
// // import DataTableTwo from "../../components/tables/datatables/datatabletwo/DataTableTwo";
// import { Link } from "react-router";
// import { useModal } from "../hook/useModal";
// import { ModalWithAnimation } from "../features/request-type/ModalWithAnimation";
// import RequestTypeForm from "../features/request-type/RequestTypeForm";

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

// export default function RequestTypes() {
//   const [requestTypes, setRequestTypes] = useState(requestTypesArr);
//   const [reqTypeName, setReqTypeName] = useState("");
//   const [reqTypeDescription, setReqTypeDescription] = useState("");
//   const { isOpen, openModal, closeModal } = useModal();
//   // const { isLoading, posts, error } = usePosts();

//   // const handleSave = () => {
//   //   // Handle save logic here
//   //   console.log("Saving changes...");
//   //   closeModal();
//   // };

//   // console.log("In Request type page", posts);

//   // console.log("requestType", requestTypes);

//   // e: React.FormEvent<HTMLFormElement>;

//   // function handleSubmit(e: any) {
//   //   e.preventDefault();
//   //   e.stopPropagation(); // Add this line

//   //   console.log(e); // Add this line

//   //   const data = {
//   //     reqTypeName,
//   //     reqTypeDescription,
//   //   };

//   //   console.log(data);

//   //   // if success
//   //   setReqTypeName("");
//   //   setReqTypeDescription("");
//   //   closeModal();
//   // }

//   return (
//     <div>
//       <h1 className="text-2xl text-color font-bold mb-4">Request Type</h1>
//       <button
//         onClick={openModal}
//         className="bg-[#4263eb] text-sm dark:text-white text-white px-4 py-2 rounded-md"
//       >
//         Add new
//       </button>
//       {/* <div className="border-1 border-blue-600 rounded-lg shadow-lg">
//         <ul className="w-full flex justify-between px-6 py-8">
//           {requestTypes.map((requestType) => (
//             <li
//               className="w-[14rem] bg-blue-500 text-white dark:text-white h-[8rem] rounded-lg flex items-center justify-center"
//               id={requestType.id.toString}
//             >
//               {requestType.title}
//             </li>
//           ))}
//         </ul>
//       </div> */}
//       {/* <Button size="sm">Open Modal</Button> */}

//       <div className="border-1 border-blue-400 p-8 rounded-md bg-white shadow-md">
//         <ul className="grid md:grid-cols-4 place-content-center gap-x-8 gap-y-8 sm:grid-cols-2 grid-cols-1">
//           {requestTypes.map((requestType) => (
//             <Link
//               key={requestType.reqTypeName}
//               to={`/request-type/${requestType.reqTypeName}`}
//             >
//               <li className="bg-white h-[100px] lg:min-w-[9rem] flex-1 rounded-md shadow-md border-1 border-gray-200 px-3 py-1.5 cursor-pointer hover:shadow-lg text-nowrap">
//                 <p className="text-wrap text-base font-medium">
//                   {requestType.reqTypeName}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   <span>{requestType.categoryTypeCount}</span> Category
//                 </p>
//               </li>
//             </Link>
//           ))}
//         </ul>
//       </div>
//       {/* <div className="border border-blue-400 p-8 rounded-md bg-white shadow-md">
//         <ul className="grid grid-cols-4 gap-x-8 gap-y-8">
//           {requestTypes.map((requestType) => (
//             <li key={requestType.reqTypeName} className="flex justify-center">
//               <Link
//                 to={`/request-type/${requestType.reqTypeName}`}
//                 className="bg-white h-[200px] w-[200px] rounded-2xl shadow-md border border-gray-200 px-3 py-1.5 cursor-pointer hover:shadow-lg whitespace-nowrap flex items-center justify-center"
//               >
//                 <p>{requestType.reqTypeName}</p>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div> */}

//       <ModalWithAnimation
//         isOpen={isOpen}
//         onClose={closeModal}
//         className="max-w-[584px] p-5 lg:p-7"
//       >
//         <RequestTypeForm
//           setRequestTypes={setRequestTypes}
//           // handleSubmit={handleSubmit}
//           setReqTypeName={setReqTypeName}
//           setReqDescription={setReqTypeDescription}
//           reqTypeName={reqTypeName} // Add this
//           reqTypeDescription={reqTypeDescription} // Add this
//           openModal={openModal}
//           closeModal={closeModal}
//         />
//       </ModalWithAnimation>
//       {/* <DataTableTwo /> */}
//     </div>
//   );
// }

import { useState } from "react";
import { Link } from "react-router";
import { useModal } from "../hook/useModal";
import { ModalWithAnimation } from "../features/request-type/ModalWithAnimation";
import RequestTypeForm from "../features/request-type/RequestTypeForm";

export interface IRequestType {
  reqTypeName: string;
  reqTypeDescription: string;
  categoryTypeCount: number;
}

const requestTypesArr: IRequestType[] = [
  {
    reqTypeName: "Issue Request",
    reqTypeDescription: "abc",
    categoryTypeCount: 3,
  },
  {
    reqTypeName: "Network problem",
    reqTypeDescription: "abc",
    categoryTypeCount: 3,
  },
  {
    reqTypeName: "Letter request",
    reqTypeDescription: "abc",
    categoryTypeCount: 3,
  },
  {
    reqTypeName: "Development",
    reqTypeDescription: "abc",
    categoryTypeCount: 3,
  },
];

export default function RequestTypes() {
  const [requestTypes, setRequestTypes] = useState(requestTypesArr);
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <h1 className="text-2xl text-color font-bold mb-4">Request Type</h1>
      <button
        onClick={openModal}
        className="bg-[#4263eb] text-sm dark:text-white text-white px-4 py-2 rounded-md"
      >
        Add new
      </button>

      <div className="border-1 border-blue-400 p-8 rounded-md bg-white shadow-md">
        <ul className="grid md:grid-cols-4 place-content-center gap-x-8 gap-y-8 sm:grid-cols-2 grid-cols-1">
          {requestTypes.map((requestType) => (
            <Link
              key={requestType.reqTypeName}
              to={`/request-type/${requestType.reqTypeName}`}
            >
              <li className="bg-white h-[100px] lg:min-w-[9rem] flex-1 rounded-md shadow-md border-1 border-gray-200 px-3 py-1.5 cursor-pointer hover:shadow-lg text-nowrap">
                <p className="text-wrap text-base font-medium">
                  {requestType.reqTypeName}
                </p>
                <p className="text-xs text-gray-500">
                  <span>{requestType.categoryTypeCount}</span> Category
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <ModalWithAnimation
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-7"
      >
        <RequestTypeForm
          setRequestTypes={setRequestTypes}
          closeModal={closeModal}
        />
      </ModalWithAnimation>
    </div>
  );
}
