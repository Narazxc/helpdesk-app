// Component
import { Skeleton } from "@/components/ui/skeleton";

export default function RequestTypeListSkeleton() {
  return (
    <ul className="grid md:grid-cols-4 place-content-center gap-x-8 gap-y-8 sm:grid-cols-2 grid-cols-1">
      {Array.from({ length: 8 }).map((_, index) => (
        <li
          key={index}
          className="bg-white h-[100px] lg:min-w-[9rem] flex-1 rounded-md shadow-md border-1 border-gray-200 px-3 py-1.5"
        >
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </li>
      ))}
    </ul>
  );
}
