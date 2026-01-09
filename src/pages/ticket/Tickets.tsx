import KanbanBoard from "@/features/ticket/kanban/KanbanBoard";
import RequestTypeCards from "@/features/ticket/RequestTypeCards";
import { Link } from "react-router";

export default function Tickets() {
  return (
    <>
      {/* <div>Tickets</div> */}
      <div>
        <Link className="inline-block mb-4" to="/tickets/create">
          {/* mb-4 */}
          <button className="bg-[#4264eb] hover:bg-[#5b78ed] border-[2px] flex flex-col justify-center h-9 transition-colors duration-150 hover:border-[#4b6cee] border-[#a0afee] text-sm dark:text-white text-white px-4 py-2 rounded-md">
            Add New
          </button>
        </Link>
      </div>
      <div className="">
        <RequestTypeCards />
        <KanbanBoard />
      </div>
    </>
  );
}
