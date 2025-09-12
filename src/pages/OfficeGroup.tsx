import SingleTransaction from "@/components/testingui/SingleTransaction";
import DeliveryActivityTable from "@/features/office-group/DeliveriesActivityTable";
import { useOfficeGroupById } from "@/features/office-group/useOfficeGroup";
import { useParams } from "react-router";

export default function OfficeGroup() {
  const { id } = useParams();
  const { officeGroup } = useOfficeGroupById(id?.toString() || "");

  console.log("Office group", officeGroup);

  return (
    <div>
      {/* <InvoiceListTable /> */}
      <div className="space-y-6">
        <SingleTransaction />
        <DeliveryActivityTable />
      </div>
    </div>
  );

  // return (
  //   <>
  //     <PageMeta
  //       title="React.js E-commerce Single Transaction  | TailAdmin - React.js Admin Dashboard Template"
  //       description="This is React.js E-commerce Single Transaction  page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
  //     />
  //     <PageBreadcrumb pageTitle="Single Transaction" />
  //     <div className="space-y-6">
  //       <TransactionHeader />

  //       <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
  //         <div className="lg:col-span-8 2xl:col-span-9">
  //           <OrderDetailsTable />
  //         </div>
  //         <div className="space-y-6 lg:col-span-4 2xl:col-span-3">
  //           <CustomerDetails />
  //           <OrderHistory />
  //         </div>
  //       </div>
  //     </div>
  //   </>
}
