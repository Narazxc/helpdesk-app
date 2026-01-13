import { useRequestTypes } from "../request-type/useRequestTypes";
import { FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";

// Icon mapping for different request types
const getIconForType = (typeName: string) => {
  const name = typeName.toLowerCase();
  if (name.includes("urgent") || name.includes("priority")) {
    return AlertCircle;
  } else if (name.includes("complete") || name.includes("approved")) {
    return CheckCircle;
  } else if (name.includes("pending") || name.includes("review")) {
    return Clock;
  }
  return FileText;
};

export default function RequestTypeCards() {
  const { requestTypes, isLoading } = useRequestTypes();

  if (isLoading) return "Loading...";

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {!isLoading &&
        requestTypes.length !== 0 &&
        requestTypes.map((requestType) => {
          const Icon = getIconForType(requestType.name);

          return (
            <div
              key={requestType.id}
              className="rounded-xl border bg-card text-card-foreground shadow transition-shadow duration-300 hover:shadow-lg cursor-pointer"
            >
              <div className="p-6 pt-4 flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="tracking-tight text-sm font-medium">
                  {requestType.name}
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

// import { useRequestTypes } from "../request-type/useRequestTypes";

// export default function RequestTypeCards() {
//   const { requestTypes, isLoading } = useRequestTypes();

//   if (isLoading) return "Loading...";

//   return (
//     // <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//     //   {!isLoading &&
//     //     requestTypes.length !== 0 &&
//     //     requestTypes.map((requestType) => (
//     //       <div
//     //         key={requestType.id}
//     //         className="rounded-xl border bg-card text-card-foreground shadow"
//     //       >
//     //         <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
//     //           <div className="tracking-tight text-sm font-medium">
//     //             {requestType.name}
//     //           </div>
//     //           <svg
//     //             xmlns="http://www.w3.org/2000/svg"
//     //             viewBox="0 0 24 24"
//     //             fill="none"
//     //             stroke="currentColor"
//     //             strokeLinecap="round"
//     //             strokeLinejoin="round"
//     //             strokeWidth="2"
//     //             className="h-4 w-4 text-muted-foreground"
//     //           >
//     //             <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//     //           </svg>
//     //         </div>
//     //         <div className="p-6 pt-0">
//     //           <div className="text-2xl font-bold">+573</div>
//     //           <p className="text-xs text-muted-foreground">
//     //             +201 since last hour
//     //           </p>
//     //         </div>
//     //       </div>
//     //     ))}
//     // </div>
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//       {!isLoading &&
//         requestTypes.length !== 0 &&
//         requestTypes.map((requestType) => (
//           <div
//             key={requestType.id}
//             className="rounded-xl border bg-card text-card-foreground shadow transition-all duration-300 hover:shadow-lg hover:scale-101 hover:border-primary cursor-pointer"
//           >
//             <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
//               <div className="tracking-tight text-sm font-medium">
//                 {requestType.name}
//               </div>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:scale-110"
//               >
//                 <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//               </svg>
//             </div>
//             <div className="p-6 pt-0">
//               <div className="text-2xl font-bold">+573</div>
//               <p className="text-xs text-muted-foreground">
//                 +201 since last hour
//               </p>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }

//////////////////////////////////////////////////////////////

//   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//       <div className="rounded-xl border bg-card text-card-foreground shadow">
//   <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
//           <div className="tracking-tight text-sm font-medium">
//             Total Revenue
//           </div>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="2"
//             className="h-4 w-4 text-muted-foreground"
//           >
//             <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
//           </svg>
//         </div>
//         <div className="p-6 pt-0">
//           <div className="text-2xl font-bold">$45,231.89</div>
//           <p className="text-xs text-muted-foreground">
//             +20.1% from last month
//           </p>
//         </div>
//       </div>
//       <div className="rounded-xl border bg-card text-card-foreground shadow">
//         <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
//           <div className="tracking-tight text-sm font-medium">
//             Subscriptions
//           </div>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="2"
//             className="h-4 w-4 text-muted-foreground"
//           >
//             <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
//             <circle cx="9" cy="7" r="4"></circle>
//             <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
//           </svg>
//         </div>
//         <div className="p-6 pt-0">
//           <div className="text-2xl font-bold">+2350</div>
//           <p className="text-xs text-muted-foreground">
//             +180.1% from last month
//           </p>
//         </div>
//       </div>
//       <div className="rounded-xl border bg-card text-card-foreground shadow">
//         <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
//           <div className="tracking-tight text-sm font-medium">Sales</div>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="2"
//             className="h-4 w-4 text-muted-foreground"
//           >
//             <rect width="20" height="14" x="2" y="5" rx="2"></rect>
//             <path d="M2 10h20"></path>
//           </svg>
//         </div>
//         <div className="p-6 pt-0">
//           <div className="text-2xl font-bold">+12,234</div>
//           <p className="text-xs text-muted-foreground">+19% from last month</p>
//         </div>
//       </div>
//       <div className="rounded-xl border bg-card text-card-foreground shadow">
//         <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
//           <div className="tracking-tight text-sm font-medium">Active Now</div>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="2"
//             className="h-4 w-4 text-muted-foreground"
//           >
//             <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//           </svg>
//         </div>
//         <div className="p-6 pt-0">
//           <div className="text-2xl font-bold">+573</div>
//           <p className="text-xs text-muted-foreground">+201 since last hour</p>
//         </div>
