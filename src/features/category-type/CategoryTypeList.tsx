// Icon
import { Link } from "react-router";
import {
  FolderOpenDot,
  // Old Icon
  // Computer
} from "lucide-react";

// Component
import RequestTypeListSkeleton from "../request-type/RequestTypeListSkeleton";

// Hook
import { useCategoryTypes } from "./useCategoryTypes";
import { useAssetTypes } from "../asset-type/useAssetTypes";

export default function CategoryTypeList() {
  const { categoryTypes, isLoading } = useCategoryTypes();
  const { assetTypes } = useAssetTypes();

  if (isLoading) return <RequestTypeListSkeleton />;

  return (
    <ul className="grid md:grid-cols-4 place-content-center gap-x-8 gap-y-8 sm:grid-cols-2 grid-cols-1">
      {categoryTypes.map((categoryType) => {
        // Count how many categories belong to this requestType
        const assetCount = assetTypes.filter(
          (asset) => asset.categoryTypeCode === categoryType.categoryTypeCode
        ).length;

        return (
          <li
            key={categoryType.categoryTypeCode}
            className="dark:border-gray-700 transition-[border-color] duration-300 hover:dark:border-gray-100/60 dark:bg-[#171e2e] bg-white group hover:bg-[#1864ab]  lg:min-w-[9rem] flex-1 rounded-md shadow-md border-1 border-gray-200 px-4 py-3 cursor-pointer hover:shadow-lg text-nowrap"
          >
            <Link to={`/category-types/${categoryType.id}`}>
              <div>
                <div className="mb-3 flex items-center justify-center">
                  {/* <Computer
                    size={48}
                    strokeWidth={1.2}
                    className="group-hover:stroke-white dark:stroke-gray-100/90"
                  /> */}
                  <FolderOpenDot
                    size={48}
                    strokeWidth={1.2}
                    className="group-hover:stroke-white dark:stroke-gray-100/90"
                  />
                </div>

                <div>
                  <p className="text-wrap dark:text-white/90 text-sm font-medium text-black group-hover:text-white">
                    {categoryType.name}
                  </p>
                  <p className="text-xs text-gray-500 group-hover:text-gray-100/80">
                    Asset <span>{assetCount}</span>
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

{
  /* <ul className="grid md:grid-cols-4 place-content-center gap-x-8 gap-y-8 sm:grid-cols-2 grid-cols-1">
  {categoryTypes.map((categoryType) => (
    <Link key={categoryType.name} to={`/category-type/${categoryType.id}`}>
      <li className="bg-white group hover:bg-[#1864ab] h-[100px] lg:min-w-[9rem] flex-1 rounded-md shadow-md border-1 border-gray-200 px-3 py-1.5 cursor-pointer hover:shadow-lg text-nowrap">
        <p className="text-wrap text-sm font-medium text-black group-hover:text-white">
          {categoryType.name}
        </p>
        <p className="text-xs text-gray-500 group-hover:text-gray-100/80">
          Asset <span>N</span>
        </p>
      </li>
    </Link>
  ))}
</ul> */
}
