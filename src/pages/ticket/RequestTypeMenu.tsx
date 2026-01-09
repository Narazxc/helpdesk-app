// import { useRequestTypes } from "@/features/request-type/useRequestTypes";

import { useState } from "react";
import { Link } from "react-router";

// export default function RequestTypeMenu() {
//   const { requestTypes } = useRequestTypes();
//   return <div>RequestTypeMenu</div>;
// }

///////////////////////
// import { useRequestTypes } from "@/features/request-type/useRequestTypes";
// import {
//   Home,
//   ShoppingCart,
//   User,
//   Settings,
//   Bell,
//   Heart,
//   Search,
//   Mail,
//   Calendar,
//   Camera,
//   Music,
//   FileText,
// } from "lucide-react";

interface RequestTypeMenuProps {
  selectedMenu: string;
  setSelectedMenu: (type: string) => void;
}

export default function RequestTypeMenu({
  selectedMenu,
  setSelectedMenu,
}: RequestTypeMenuProps) {
  //   // Uncomment this line in your actual app:
  //   const { requestTypes } = useRequestTypes();

  //   // Mock data for demonstration - remove this in your app
  //   //   const requestTypes = [
  //   //     {
  //   //       id: 1,
  //   //       requestTypeCode: "HOME",
  //   //       name: "Home Request",
  //   //       description: "",
  //   //       createdAt: "",
  //   //       updatedAt: "",
  //   //       status: true,
  //   //       createdBy: null,
  //   //       updatedBy: null,
  //   //     },
  //   //     {
  //   //       id: 2,
  //   //       requestTypeCode: "SHOP",
  //   //       name: "Shopping Request",
  //   //       description: "",
  //   //       createdAt: "",
  //   //       updatedAt: "",
  //   //       status: true,
  //   //       createdBy: null,
  //   //       updatedBy: null,
  //   //     },
  //   //     {
  //   //       id: 3,
  //   //       requestTypeCode: "USER",
  //   //       name: "User Request",
  //   //       description: "",
  //   //       createdAt: "",
  //   //       updatedAt: "",
  //   //       status: true,
  //   //       createdBy: null,
  //   //       updatedBy: null,
  //   //     },
  //   //     {
  //   //       id: 4,
  //   //       requestTypeCode: "SETTINGS",
  //   //       name: "Settings Request",
  //   //       description: "",
  //   //       createdAt: "",
  //   //       updatedAt: "",
  //   //       status: true,
  //   //       createdBy: null,
  //   //       updatedBy: null,
  //   //     },
  //   //     {
  //   //       id: 5,
  //   //       requestTypeCode: "BELL",
  //   //       name: "Notification Request",
  //   //       description: "",
  //   //       createdAt: "",
  //   //       updatedAt: "",
  //   //       status: true,
  //   //       createdBy: null,
  //   //       updatedBy: null,
  //   //     },
  //   //     {
  //   //       id: 6,
  //   //       requestTypeCode: "HEART",
  //   //       name: "Favorites Request",
  //   //       description: "",
  //   //       createdAt: "",
  //   //       updatedAt: "",
  //   //       status: true,
  //   //       createdBy: null,
  //   //       updatedBy: null,
  //   //     },
  //   //   ];

  //   const iconMap = {
  //     Home,
  //     ShoppingCart,
  //     User,
  //     Settings,
  //     Bell,
  //     Heart,
  //     Search,
  //     Mail,
  //     Calendar,
  //     Camera,
  //     Music,
  //     FileText,
  //   };

  //   if (!requestTypes || requestTypes.length === 0) {
  //     return (
  //       <div className="p-8 text-center text-gray-600">
  //         No request types available
  //       </div>
  //     );
  //   }

  //   return (
  //     // bg-gradient-to-br from-gray-50 to-gray-100
  //     <div className="h-screen p-8 flex flex-col">
  //       <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
  //         Request Type Menu
  //       </h1>

  //       <div className="grid h-64 grid-cols-4 gap-6">
  //         {requestTypes.map((requestType) => {
  //           const Icon = iconMap[requestType.requestTypeCode] || FileText;
  //           const colors = [
  //             "bg-blue-500",
  //             "bg-green-500",
  //             "bg-purple-500",
  //             "bg-gray-500",
  //             "bg-yellow-500",
  //             "bg-red-500",
  //             "bg-indigo-500",
  //             "bg-pink-500",
  //           ];
  //           const color = colors[requestType.id % colors.length];

  //           return (
  //             <div
  //               key={requestType.id}
  //               className="bg-white rounded-md shadow hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer p-6 flex flex-col items-center space-y-4"
  //             >
  //               <h2 className="text-xl font-semibold text-gray-800 w-full text-center">
  //                 {requestType.name}
  //               </h2>
  //               <div className="flex-1 flex items-center justify-center">
  //                 <div className={`${color} rounded-full p-4`}>
  //                   <Icon className="w-8 h-8 text-white" />
  //                 </div>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // }

  const [hoveredCard, setHoveredCard] = useState(null);

  // const menuItems = [
  //   {
  //     id: 1,
  //     title: "Technical Issue",
  //     description: "Report technical problems, bugs, or system errors",
  //     icon: "Wrench",
  //     color: "emerald",
  //     bgGradient: "from-emerald-500 to-emerald-600",
  //   },
  //   {
  //     id: 2,
  //     title: "Network Problem",
  //     description: "Submit connectivity or network-related issues",
  //     icon: "Wifi",
  //     color: "purple",
  //     bgGradient: "from-purple-500 to-purple-600",
  //   },
  //   {
  //     id: 3,
  //     title: "Letter Request",
  //     description: "Request official letters or documentation",
  //     icon: "Mail",
  //     color: "slate",
  //     bgGradient: "from-slate-500 to-slate-600",
  //   },
  //   {
  //     id: 4,
  //     title: "New Development",
  //     description: "Propose new features or development ideas",
  //     icon: "Lightbulb",
  //     color: "amber",
  //     bgGradient: "from-amber-500 to-amber-600",
  //   },
  //   // {
  //   //   id: 4,
  //   //   title: "New Development",
  //   //   description: "Propose new features or development ideas",
  //   //   icon: "Lightbulb",
  //   //   color: "amber",
  //   //   bgGradient: "from-amber-500 to-amber-600",
  //   // },
  //   // {
  //   //   id: 4,
  //   //   title: "New Development",
  //   //   description: "Propose new features or development ideas",
  //   //   icon: "Lightbulb",
  //   //   color: "amber",
  //   //   bgGradient: "from-amber-500 to-amber-600",
  //   // },
  //   // {
  //   //   id: 4,
  //   //   title: "New Development",
  //   //   description: "Propose new features or development ideas",
  //   //   icon: "Lightbulb",
  //   //   color: "amber",
  //   //   bgGradient: "from-amber-500 to-amber-600",
  //   // },
  //   // {
  //   //   id: 4,
  //   //   title: "New Development",
  //   //   description: "Propose new features or development ideas",
  //   //   icon: "Lightbulb",
  //   //   color: "amber",
  //   //   bgGradient: "from-amber-500 to-amber-600",
  //   // },
  // ];

  const menuItems = [
    {
      id: 1,
      title: "Technical Issue",
      description: "Report technical problems, bugs, or system errors",
      icon: "Wrench",
      image: "/building-business-finance-svgrepo-com.svg",
      color: "emerald",
      bgGradient: "from-emerald-500 to-emerald-600",
    },
    {
      id: 2,
      title: "Network Problem",
      description: "Submit connectivity or network-related issues",
      icon: "Wifi",
      image: "/chat-mail-message-svgrepo-com.svg",
      color: "purple",
      bgGradient: "from-purple-500 to-purple-600",
    },
    {
      id: 3,
      title: "Letter Request",
      description: "Request official letters or documentation",
      icon: "Mail",
      image: "/configuration-gear-options-svgrepo-com.svg",
      color: "slate",
      bgGradient: "from-slate-500 to-slate-600",
    },
    {
      id: 4,
      title: "New Development",
      description: "Propose new features or development ideas",
      icon: "Lightbulb",
      image: "/down-arrow-download-svgrepo-com.svg",
      color: "amber",
      bgGradient: "from-amber-500 to-amber-600",
    },
  ];

  return (
    // bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Ticket</h1>
          <p className="text-gray-600 mt-2 text-sm">
            Select ticket request type
          </p>
        </div>

        <nav className="self-start">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90">
              /<span className="page-title-text">Office Group</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* min-h-screen */}
      <div className="p-8 md:p-12 md:pb-0">
        <div className="max-w-7xl mx-auto">
          {/* <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12 drop-shadow-lg">
          Request Type Menu
        </h1> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6 lg:gap-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isHovered = hoveredCard === item.id;

              return (
                <button
                  onClick={() => setSelectedMenu(item.id)}
                  key={item.id}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  // rounded-2xl
                  className={`relative bg-white rounded-lg p-8 text-center transition-all duration-300 ease-out
                  ${
                    isHovered
                      ? "transform -translate-y-1 shadow-lg"
                      : "shadow-lg"
                  }
                  hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50
                  group overflow-hidden`}
                >
                  {/* Top accent bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                      item.bgGradient
                    } 
                  transform origin-left transition-transform duration-300
                  ${isHovered ? "scale-x-100" : "scale-x-0"}`}
                  />

                  {/* Icon wrapper */}
                  <div
                    className={`w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-r ${
                      item.bgGradient
                    } 
                  flex items-center justify-center transition-all duration-300
                  ${isHovered ? "transform rotate-6 scale-110" : ""}`}
                  >
                    {/* <Icon className="w-10 h-10 text-white" strokeWidth={2} /> */}
                    <img src={item.image} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Hover arrow indicator */}
                  <div
                    className={`mt-4 text-${
                      item.color
                    }-600 font-medium text-sm transition-all duration-300
                  ${
                    isHovered
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2"
                  }`}
                  >
                    Select →
                  </div>
                </button>
              );
            })}
          </div>

          {/* Info text */}
          {/* <p className="text-center text-black text-opacity-90 mt-12 text-sm">
          Select a request type to get started with your submission
        </p> */}
        </div>
      </div>
    </div>
  );
}
