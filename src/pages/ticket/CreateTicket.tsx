import { useState } from "react";
import RequestTypeMenu from "./RequestTypeMenu";
import CustomizedInput from "@/components/form/input/CustomizedInput";

export default function CreateTicket() {
  const [selectedMenu, setSeletedMenu] = useState("0");
  //   return <div>ABC</div>;

  console.log("setSelectedMenu", selectedMenu);

  return (
    // <div className="p-4 rounde-md bg-gray-100">
    <>
      {selectedMenu.toString() === "1" ? (
        <CreateTicketForm />
      ) : (
        <RequestTypeMenu
          selectedMenu={selectedMenu}
          setSelectedMenu={setSeletedMenu}
        />
      )}
    </>

    // </div>
  );
}

export function CreateTicketForm() {
  return (
    <div className="bg-white shadow-sm rounded-md">
      <div className="gap-4 p-4 pb-0 grid grid-cols-2">
        <CustomizedInput className="bg-white" />
        <CustomizedInput className="bg-white" />
      </div>

      <div className="gap-2 p-4 grid">
        <CustomizedInput className="bg-white" />
      </div>
    </div>
  );
}
