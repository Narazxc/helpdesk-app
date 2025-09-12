// import { SidebarProvider, useSidebar } from "../context/SidebarContext";
// import { Outlet } from "react-router";
// import AppHeader from "./AppHeader";
// import Backdrop from "./Backdrop";
// import MyAppSidebar2 from "./MyAppSidebar2";
// // import MyAppSidebar from "./MyAppSidebar";

// const LayoutContent: React.FC = () => {
//   const { isExpanded, isHovered, isMobileOpen } = useSidebar();

//   return (
//     <div className="min-h-screen xl:flex">
//       <div>
//         {/* <MyAppSidebar /> */}
//         <MyAppSidebar2 />
//         <Backdrop />
//       </div>
//       <div
//         // bg-gray-200
//         className={`flex-1 transition-all duration-300 ease-in-out ${
//           isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
//         } ${isMobileOpen ? "ml-0" : ""}`}
//       >
//         <AppHeader />
//         <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
//           {/* <div className="p-4 mx-auto max-w-[78rem] md:p-6"> */}
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// const AppLayout: React.FC = () => {
//   return (
//     <SidebarProvider>
//       <LayoutContent />
//     </SidebarProvider>
//   );
// };

// export default AppLayout;

import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, useLocation } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
// import MyAppSidebar2 from "./MyAppSidebar2";
import MyAppSidebar2Test from "./MyAppSidebar2test";
import { useState } from "react";
// import MyAppSidebar2 from "./MyAppSidebar2";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const location = useLocation();

  // toggle sidebar logo
  const [isToggleLogo, setIsToggleLogo] = useState(false);

  // Example: assuming dashboard route is "/dashboard"
  const isDashboard = location.pathname === "/";
  const isEntities = location.pathname === "/entity";

  function handleToggleSidebarLogo() {
    console.log("isToggleLogo state", isToggleLogo);
    setIsToggleLogo((prev) => !prev);
  }

  return (
    // bg-[#f8fafc]
    //
    <div className="min-h-screen xl:flex dark:bg-gray-900 bg-[#f9fafc]">
      <div>
        <MyAppSidebar2Test isToggleLogo={isToggleLogo} />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader onToggleSidebarLogo={handleToggleSidebarLogo} />
        <div
          className={
            isDashboard || isEntities
              ? "p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6"
              : "p-4 mx-auto max-w-[78rem] md:p-6"
          }
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
