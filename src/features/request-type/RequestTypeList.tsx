// Type
import type { RequestType } from "@/types/request-type";

// React router
import { Link } from "react-router";

// Icon
import { FolderOpen } from "lucide-react";

// Hook
import { useCategoryTypes } from "../category-type/useCategoryTypes";

interface RequestTypeListProps {
  requestTypes: RequestType[];
  // categoryTypeCount: number;
}

export default function RequestTypeList({
  requestTypes,
}: RequestTypeListProps) {
  const { categoryTypes } = useCategoryTypes();

  // New with category count
  return (
    <ul className="grid md:grid-cols-4 place-content-center gap-x-8 gap-y-8 sm:grid-cols-2 grid-cols-1">
      {requestTypes.map((requestType) => {
        // Count how many categories belong to this requestType (loop count on frontend)
        const categoryCount = categoryTypes.filter(
          (cat) => cat.requestTypeCode === requestType.requestTypeCode
        ).length;

        return (
          <li
            key={requestType.requestTypeCode}
            className="dark:border-gray-700 transition-[border-color] duration-300 hover:dark:border-gray-100/60 dark:bg-[#171e2e] dark:text-white/90 bg-white group hover:bg-[#1864ab] lg:min-w-[9rem] flex-1 rounded-md shadow-md border-1 border-gray-200 px-4 py-3 cursor-pointer hover:shadow-lg text-nowrap"
          >
            <Link to={`/request-types/${requestType.id}`}>
              <div>
                <div className="mb-3 flex items-center justify-center">
                  <FolderOpen
                    size={48}
                    strokeWidth={1.2}
                    className="group-hover:stroke-white dark:stroke-gray-100/90"
                  />
                </div>

                <div>
                  <p className="text-wrap dark:text-white/90 text-sm font-medium text-black group-hover:text-white">
                    {requestType.name}
                  </p>
                  <p className="text-xs text-gray-500 group-hover:text-gray-100/80">
                    Category <span>{categoryCount}</span>
                  </p>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// Old but working fine
// return (
//   <ul className="grid md:grid-cols-4 place-content-center gap-x-8 gap-y-8 sm:grid-cols-2 grid-cols-1">
//     {requestTypes.map((requestType) => (
//       <Link key={requestType.name} to={`/request-type/${requestType.id}`}>
//         {/* h-[100px] */}
//         <li className="bg-white group hover:bg-[#1864ab]  lg:min-w-[9rem] flex-1 rounded-md shadow-md border-1 border-gray-200 px-4 py-3 cursor-pointer hover:shadow-lg text-nowrap">
//           <div>
//             <div className="mb-3 flex items-center justify-center">
//               <Mail
//                 size={48}
//                 strokeWidth={1.2}
//                 className="group-hover:stroke-white"
//               />
//             </div>

//             <div>
//               <p className="text-wrap text-sm font-medium text-black group-hover:text-white">
//                 {requestType.name}
//               </p>
//               <p className="text-xs text-gray-500 group-hover:text-gray-100/80">
//                 Category <span>N</span>
//               </p>
//             </div>
//           </div>
//         </li>
//       </Link>
//     ))}
//   </ul>
// );

// Extra old
// return (
//   <ul className="grid md:grid-cols-4 place-content-center gap-x-8 gap-y-8 sm:grid-cols-2 grid-cols-1">
//     {requestTypes.map((requestType) => (
//       <Link key={requestType.name} to={`/request-type/${requestType.id}`}>
//         <li className="bg-white group hover:bg-[#1864ab] h-[100px] lg:min-w-[9rem] flex-1 rounded-md shadow-md border-1 border-gray-200 px-3 py-1.5 cursor-pointer hover:shadow-lg text-nowrap">

//             <p className="text-wrap text-sm font-medium text-black group-hover:text-white">
//               {requestType.name}
//             </p>
//             <p className="text-xs text-gray-500 group-hover:text-gray-100/80">
//               Category <span>N</span>
//             </p>
//         </li>
//       </Link>
//     ))}
//   </ul>
