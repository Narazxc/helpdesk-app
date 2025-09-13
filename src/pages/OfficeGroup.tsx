import PageMeta from "@/components/common/PageMeta";
import { useAgentGroupsByOfficeGroupCode } from "@/features/agent-group/useAgentGroupsByOfficeGroupCode";
// import { useAgentGroupsByOfficeGroupCode } from "@/features/agent-group/useAgentGroupsByOfficeGroupCode";
import DeliveryActivityTable from "@/features/office-group/DeliveriesActivityTable";
import { useOfficeGroupById } from "@/features/office-group/useOfficeGroup";
import { Link, useParams } from "react-router";

export default function OfficeGroup() {
  const { id } = useParams();
  const { officeGroup } = useOfficeGroupById(id?.toString() || "");
  console.log("Office group", officeGroup);

  // const { agentGroups } = useAgentGroups();
  // console.log("inside office group detail, agent group", agentGroups);

  // categoryTypes data under this requestType, to pass into TypeDataTable
  // const { categoryTypes } = useCategoryByRequestTypeCode(
  //   requestType?.requestTypeCode || "" // Can pass empty string now
  // );

  const { agentGroupsByOfficeGroupCode } = useAgentGroupsByOfficeGroupCode(
    officeGroup?.officeGroupCode || ""
  );
  console.log("useAgentGroupsByOfficeGroupCode", agentGroupsByOfficeGroupCode);

  return (
    <>
      <PageMeta
        title="React.js E-commerce Single Transaction  | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js E-commerce Single Transaction  page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      {/* <InvoiceListTable /> */}
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
          <h1 className="text-2xl text-color font-bold">Office Group Detail</h1>

          {/* Breadcrumb */}
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <span className="text-gray-500">/</span>
              <li className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400">
                <Link to="/office-groups">Office Group</Link>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90">
                <span className="text-gray-500 dark:text-gray-400">/</span>

                <span className="page-title-text">
                  {officeGroup?.officeName}
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Office group detail section */}
        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-gray-200 bg-white px-6 py-5 sm:flex-row sm:items-center dark:border-gray-800 dark:bg-white/3">
          <div className="flex flex-col gap-2.5 divide-gray-300 sm:flex-row sm:divide-x dark:divide-gray-700">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[150px_1fr] lg:gap-4 2xl:gap-x-8">
              <div>
                <p className="text-sm text-color font-semibold ">Office Name</p>
              </div>
              <div>
                <p className="text-sm text-color font-normal">
                  {officeGroup?.officeName}
                </p>
              </div>
              <div>
                <p className="text-sm text-color font-semibold">Office Chief</p>
              </div>
              <div>
                <p className="text-sm text-color font-normal">
                  {officeGroup?.chiefOfficeName}
                </p>
              </div>
            </div>
          </div>

          {/* Left buttons */}
          <div className="flex gap-3">
            <button className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition">
              View Receipt
            </button>
            <button className="shadow-theme-xs inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]">
              Refund
            </button>
          </div>
        </div>

        {/* Agent Group table */}
        <DeliveryActivityTable
        // agentGroupsByOfficeGroupCode={agentGroupsByOfficeGroupCode}
        />
      </div>
    </>
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
