import { Computer } from "lucide-react";
import { Link } from "react-router";
import RequestTypeListSkeleton from "../request-type/RequestTypeListSkeleton";
import { useAssetTypes } from "./useAssetTypes";

export default function AssetTypeList() {
  const { assetTypes, isLoading } = useAssetTypes();

  console.log(assetTypes);

  if (isLoading) return <RequestTypeListSkeleton />;

  return (
    <ul className="grid md:grid-cols-4 place-content-center gap-x-8 gap-y-8 sm:grid-cols-2 grid-cols-1">
      {assetTypes.map((assetType) => (
        <li
          key={assetType.id}
          className="bg-white group hover:bg-[#1864ab]  lg:min-w-[9rem] flex-1 rounded-md shadow-md border-1 border-gray-200 px-4 py-3 cursor-pointer hover:shadow-lg text-nowrap"
        >
          <Link to={`/asset-types/${assetType.id}`}>
            <div>
              <div className="mb-3 flex items-center justify-center">
                <Computer
                  size={48}
                  strokeWidth={1.2}
                  className="group-hover:stroke-white"
                />
              </div>

              <div>
                <p className="text-wrap text-sm font-medium text-black group-hover:text-white">
                  {assetType.name}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
