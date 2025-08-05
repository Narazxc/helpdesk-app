import { Link, useParams } from "react-router";

let categoryTypesArr = [
  {
    catTypeName: "Request Permission",
    catTypeDescription: "abc",
  },
  {
    catTypeName: "Transaction Issue",
    catTypeDescription: "abc",
  },
  {
    catTypeName: "Password Issue",
    catTypeDescription: "abc",
  },
  {
    catTypeName: "Hardware Issue",
    catTypeDescription: "abc",
  },
  {
    catTypeName: "Add/Update Supplier",
    catTypeDescription: "abc",
  },
  {
    catTypeName: "Master Data",
    catTypeDescription: "abc",
  },
  {
    catTypeName: "Microsoft Office Window",
    catTypeDescription: "abc",
  },
  {
    catTypeName: "Network Problem",
    catTypeDescription: "abc",
  },
  {
    catTypeName: "Hardware Request",
    catTypeDescription: "abc",
  },
  {
    catTypeName: "User Management",
    catTypeDescription: "abc",
  },
  {
    catTypeName: "Request VPN",
    catTypeDescription: "abc",
  },
  {
    catTypeName: "Enhancement FMIS",
    catTypeDescription: "abc",
  },
  {
    catTypeName: "Enhancement Report",
    catTypeDescription: "abc",
  },
];

export default function CategoryType() {
  const { id } = useParams();

  return (
    <>
      <div>Detail for request type with ID: {id}</div>
      <div className="border-1 border-blue-400 p-8 rounded-md bg-white shadow-md">
        <ul className="grid grid-cols-4 gap-x-8 gap-y-8">
          {categoryTypesArr.map((categoryType) => (
            <Link
              key={categoryType.catTypeName}
              to={`/category-type/${categoryType.catTypeName}`}
            >
              <li className="bg-white h-[100px] flex-1 rounded-md shadow-md border-1 border-gray-200 px-3 py-1.5 cursor-pointer hover:shadow-lg text-nowrap">
                <p>{categoryType.catTypeName}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
