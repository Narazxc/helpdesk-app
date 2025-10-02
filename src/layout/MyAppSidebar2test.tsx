import { useCallback, useEffect, useRef, useState } from "react";

// React router
import { Link, useLocation } from "react-router";

// Icon
import {
  // BoxCubeIcon,
  // ChatIcon,
  ChevronDownIcon,
  // CalenderIcon,
  // DocsIcon,
  GridIcon,
  HorizontaLDots,
  // HorizontaLDots,
  ListIcon,
  // PlugInIcon,
  // MailIcon,
  // PageIcon,
  // PieChartIcon,
  // PlugInIcon,
  // TableIcon,
  // TaskIcon,
  // UserCircleIcon,
} from "../icons";
// import GearIcon from "../../icons/GearIcon";
// import { GearIcon } from "../icons/GearIcon";

// Component
// import SidebarWidget from ".././SidebarWidget";

// Hook
import { useSidebar } from "../context/SidebarContext";

// Lucide icon
import {
  BadgeAlert,
  FolderCog,
  Landmark,
  Tag,
  User,
  UserRoundCog,
} from "lucide-react";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    name: string;
    icon?: React.ReactNode; // Add icon property to subItems
    path: string;
    pro?: boolean;
    new?: boolean;
  }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <ListIcon />,
    name: "Settings",
    subItems: [
      // { name: "User", path: "/users" },
      // { name: "User Role", path: "/user-role" },
      // { name: "Agent Group", path: "/agent-group" },
      // { name: "Request Type", path: "/request-type" },
      // { name: "Enity", path: "/entity" },
      // { name: "Category Type", path: "/category" },
      // { name: "Asset Type", path: "/asset type" },
      { icon: <User size={20} />, name: "User", path: "/users" },
      {
        icon: <UserRoundCog size={20} />,
        name: "User Role",
        path: "/user-roles",
      },
      {
        icon: <User size={20} />,
        name: "Office Group",
        path: "/office-groups",
      },
      { icon: <User size={20} />, name: "Agent Group", path: "/agent-groups" },
      { icon: <Landmark size={20} />, name: "Entity", path: "/entity" },
      {
        icon: <BadgeAlert size={20} />,
        name: "Request Type",
        path: "/request-types",
      },
      {
        icon: <Tag size={20} />,
        name: "Category Type",
        path: "/category-types",
      },
      {
        icon: <FolderCog size={20} />,
        name: "Asset Type",
        path: "/asset-types",
      },
    ],
  },
];

const othersItems: NavItem[] = [
  // {
  //   icon: <PieChartIcon />,
  //   name: "Charts",
  //   subItems: [
  //     { name: "Line Chart", path: "/line-chart", pro: true },
  //     { name: "Bar Chart", path: "/bar-chart", pro: true },
  //     { name: "Pie Chart", path: "/pie-chart", pro: true },
  //   ],
  // },
  // {
  //   icon: <BoxCubeIcon />,
  //   name: "UI Elements",
  //   subItems: [
  //     { name: "Alerts", path: "/alerts", pro: false },
  //     { name: "Avatar", path: "/avatars", pro: false },
  //     { name: "Badge", path: "/badge", pro: false },
  //     { name: "Breadcrumb", path: "/breadcrumb", pro: true },
  //     { name: "Buttons", path: "/buttons", pro: false },
  //     { name: "Buttons Group", path: "/buttons-group", pro: true },
  //     { name: "Cards", path: "/cards", pro: true },
  //     { name: "Carousel", path: "/carousel", pro: true },
  //     { name: "Dropdowns", path: "/dropdowns", pro: true },
  //     { name: "Images", path: "/images", pro: false },
  //     { name: "Links", path: "/links", pro: true },
  //     { name: "List", path: "/list", pro: true },
  //     { name: "Modals", path: "/modals", pro: true },
  //     { name: "Notification", path: "/notifications", pro: true },
  //     { name: "Pagination", path: "/pagination", pro: true },
  //     { name: "Popovers", path: "/popovers", pro: true },
  //     { name: "Progressbar", path: "/progress-bar", pro: true },
  //     { name: "Ribbons", path: "/ribbons", pro: true },
  //     { name: "Spinners", path: "/spinners", pro: true },
  //     { name: "Tabs", path: "/tabs", pro: true },
  //     { name: "Tooltips", path: "/tooltips", pro: true },
  //     { name: "Videos", path: "/videos", pro: false },
  //   ],
  // },
  // {
  //   icon: <PlugInIcon />,
  //   name: "Authentication",
  //   subItems: [
  //     { name: "Sign In", path: "/signin", pro: false },
  //     { name: "Sign Up", path: "/signup", pro: false },
  //     { name: "Reset Password", path: "/reset-password", pro: true },
  //     {
  //       name: "Two Step Verification",
  //       path: "/two-step-verification",
  //       pro: true,
  //     },
  //   ],
  // },
];

const supportItems: NavItem[] = [
  // {
  //   icon: <ChatIcon />,
  //   name: "Chat",
  //   path: "/chat",
  // },
  // {
  //   icon: <MailIcon />,
  //   name: "Email",
  //   subItems: [
  //     { name: "Inbox", path: "/inbox" },
  //     { name: "Details", path: "/inbox-details" },
  //   ],
  // },
  // {
  //   icon: <DocsIcon />,
  //   name: "Invoice",
  //   path: "/invoice",
  // },
];

interface MyAppSidebar2TestProps {
  isToggleLogo: boolean;
}

const MyAppSidebar2Test: React.FC<MyAppSidebar2TestProps> = ({
  isToggleLogo,
}) => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  // console.log("=======================");
  // console.log("isExpanded", isExpanded);
  // console.log("isMobileOpen", isMobileOpen);
  // console.log("isHovered", isHovered);
  // console.log("=======================");

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "support" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Updated isActive function to handle both exact matches and path prefixes
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  // New function to check if any subitem matches the current path or path prefix
  const isSubMenuActive = useCallback(
    (
      subItems: { name: string; path: string; pro?: boolean; new?: boolean }[]
    ) => {
      return subItems.some((subItem) => {
        // Check for exact match first
        if (location.pathname === subItem.path) return true;

        // Check if current path starts with the subitem path (for nested routes)
        // Only if the subitem path is not the root path "/"
        if (
          subItem.path !== "/" &&
          location.pathname.startsWith(subItem.path)
        ) {
          // Make sure it's actually a sub-route by checking for additional segments
          const relativePath = location.pathname.slice(subItem.path.length);
          return relativePath.startsWith("/") || relativePath === "";
        }

        return false;
      });
    },
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    // ["main", "support", "others"].forEach((menuType) => {
    ["main"].forEach((menuType) => {
      const items =
        menuType === "main"
          ? navItems
          : menuType === "support"
          ? supportItems
          : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems && isSubMenuActive(nav.subItems)) {
          setOpenSubmenu({
            type: menuType as "main" | "support" | "others",
            index,
          });
          submenuMatched = true;
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isSubMenuActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "support" | "others"
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  // Updated function to check if subitem should be highlighted
  const isSubItemActive = useCallback(
    (path: string) => {
      // Check for exact match first
      if (location.pathname === path) return true;

      // Check if current path starts with the subitem path (for nested routes)
      // Only if the subitem path is not the root path "/"
      if (path !== "/" && location.pathname.startsWith(path)) {
        // Make sure it's actually a sub-route by checking for additional segments
        const relativePath = location.pathname.slice(path.length);
        return relativePath.startsWith("/") || relativePath === "";
      }

      return false;
    },
    [location.pathname]
  );

  const renderMenuItems = (
    items: NavItem[],
    menuType: "main" | "support" | "others"
  ) => (
    <ul className="flex flex-col gap-1">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isSubItemActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      <span>{subItem.icon}</span>
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isSubItemActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}

                        {/* Nav item label */}
                        {/* {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isSubItemActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )} */}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  // <div className="px-4 pt-4">
  //         <img
  //           className="dark:hidden w-32"
  //           src="/images/brand/logo-fmis-3d-for-web-1.png"
  //           alt="Logo"
  //         />

  //         {/* <img
  //           className="hidden dark:block"
  //           src="/images/logo/logo-dark.svg"
  //           alt="Logo"
  //           width={150}
  //           height={40}
  //         /> */}

  //         <img
  //           className="hidden dark:block w-32"
  //           src="/images/brand/logo-fmis-3d-for-web-1.png"
  //           alt="Logo"
  //           // width={150}
  //           // height={40}
  //         />
  //       </div>

  return (
    <aside
      // bg-[#192436]
      // bg-[#1f2e44]
      // bg-[#3e5b87]

      //20250811
      //

      // bg-white
      //
      //  bg-[#4f73aa]
      className={`fixed mt-12 flex flex-col lg:mt-0 top-0 left-0
   bg-white
          dark:bg-gray-900 dark:border-gray-800 text-gray-900 dark:text-gray-100 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
  ${
    isExpanded || isMobileOpen
      ? "w-[290px]"
      : isHovered
      ? "w-[290px]"
      : "w-[90px]"
  }
  ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0`}
      // className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-[#3e5b87] dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
      //   ${
      //     isExpanded || isMobileOpen
      //       ? "w-[290px]"
      //       : isHovered
      //       ? "w-[290px]"
      //       : "w-[90px]"
      //   }
      //   ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      //   lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* pb-6 */}
      <div
        className={`hidden md:flex bg-[#06457e] ${
          //

          //
          !isToggleLogo && isExpanded ? "pt-5 pb-6 mb-4" : "py-2 mb-4"
        }  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-center"
        } ${!isExpanded && !isHovered && "h-[60px] p-2 m-0"}`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              {/* px-4 py-4 */}
              <div className="">
                <div className="flex items-center gap-3">
                  {!isToggleLogo ? (
                    <>
                      <img
                        className="dark:hidden w-40"
                        src="/images/logo/Helpdesk-horizontal-logo.png"
                        alt="Logo"
                      />
                      <img
                        className="hidden dark:block w-40"
                        src="/images/logo/Helpdesk-horizontal-logo.png"
                        alt="Logo"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        className="dark:hidden w-28"
                        src="/images/logo/FMIS-Helpdesk_2.webp"
                        alt="Logo"
                      />
                      <img
                        className="hidden dark:block w-28"
                        src="/images/logo/FMIS-Helpdesk_2.webp"
                        alt="Logo"
                      />
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            // <img
            //   src="/images/logo/logo-icon.svg"
            //   alt="Logo"
            //   width={32}
            //   height={32}
            // />
            <img
              className="w-18"
              src="images/brand/logo-fmis-3d-for-web-1.png"
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div className="px-4.5">
              <h2
                // mt-4
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? null : ( // "Menu"
                  <HorizontaLDots className="size-6" />
                )}

                {(isExpanded || isHovered || isMobileOpen) && "Menu"}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            {/* <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Support"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(supportItems, "support")}
            </div> */}
            {/* <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div> */}
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default MyAppSidebar2Test;

// Original
//  <Link to="/">
//    {isExpanded || isHovered || isMobileOpen ? (
//      <>
//        {/* <img
//             className="dark:hidden"
//             src="/images/logo/logo.svg"
//             alt="Logo"
//             width={150}
//             height={40}
//           /> */}

//        <div className="px-4 pt-1">
//          {/* <img
//               className="dark:hidden w-28"
//               src="/images/logo/FMIS-Helpdesk_2.webp"
//               alt="Logo"
//             /> */}
//          <div className="flex items-center gap-3">
//            <img
//              className="dark:hidden w-20"
//              src="/images/brand/logo-fmis-3d-for-web-1.png"
//              alt="Logo"
//            />
//            <p className="font-bold text-2xl mt-1 text-white">Helpdesk</p>
//          </div>

//          {/* <img
//               className="hidden dark:block"
//               src="/images/logo/logo-dark.svg"
//               alt="Logo"
//               width={150}
//               height={40}
//             /> */}

//          <img
//            className="hidden dark:block w-28"
//            src="/images/logo/FMIS-Helpdesk_2.svg"
//            alt="Logo"
//            // width={150}
//            // height={40}
//          />
//        </div>
//      </>
//    ) : (
//      <img
//        src="/images/logo/logo-icon.svg"
//        alt="Logo"
//        width={32}
//        height={32}
//      />
//    )}
//  </Link>;
