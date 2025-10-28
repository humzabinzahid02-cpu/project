"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type MenuItemType = {
  name: string;
  path: string;
  icon: string;
};

export interface SidebarProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  toggleCollapse?: () => void;
  toggleMobile?: () => void;
  onMobileClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed = false,
  isMobileOpen = false,
  toggleCollapse = () => {},
  toggleMobile = () => {},
  onMobileClose = () => {},
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems: MenuItemType[] = [
    { name: "Dashboard", path: "/dashboard", icon: "/01.png" },
    { name: "Orders", path: "/orders", icon: "/02.png" },
    { name: "Customers", path: "/customers", icon: "/03.png" },
    { name: "Colonies", path: "/colonies", icon: "/12.png" },
    { name: "Deliveries", path: "/deliveries-d", icon: "/04.png" },
    { name: "Rider", path: "/Delivery-Boy", icon: "/05.png" },
    { name: "Trips", path: "/trips", icon: "/13.png" },
    { name: "Inventory", path: "/Inventory", icon: "/06.png" },
    { name: "Payments & Cash", path: "/payments-cash", icon: "/07.png" },
    { name: "Reports", path: "/Reports", icon: "/08.png" },
    { name: "Expenses", path: "/Expenses", icon: "/09.png" },
    { name: "Settings", path: "/Settings", icon: "/10.png" },
  ];

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  const handleNavClick = (item: MenuItemType) => {
    router.push(item.path);
    onMobileClose();
  };

  const renderNavItems = () => (
    <ul className="space-y-1">
      {menuItems.map((item, index) => {
        const isActive = pathname === item.path;
        const showDividerAfter = index === 0 || index === 5 || index === 8;

        return (
          <React.Fragment key={item.name}>
            <li>
              <button
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  isActive
                    ? "bg-[#5B63E5] text-white font-extralight shadow-md"
                    : "text-gray-700 hover:bg-blue-50 hover:text-[#5B63E5]"
                }`}
              >
                <Image
                  src={item.icon}
                  alt={`${item.name} icon`}
                  width={20}
                  height={20}
                  className={`mr-3 ${isActive ? "brightness-0 invert" : ""}`}
                />
                {item.name}
              </button>
            </li>
            {showDividerAfter && (
              <li className="py-2">
                <div className="border-t border-gray-300"></div>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 ${
          isCollapsed ? "w-20" : "w-64"
        } border-r border-gray-200 flex-col bg-[#F6FAFE] hidden md:flex transition-all duration-300`}
      >
        <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200">
          <Image
            src="/logo.png"
            alt="Royal Water POS"
            width={60}
            height={20}
            className="object-contain"
          />
        </div>
        <nav className="flex-1 py-4 overflow-y-auto px-3 scrollbar-custom">
          {renderNavItems()}
        </nav>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#F6FAFE] border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex-1 flex justify-center">
            <Image
              src="/logo.png"
              alt="Royal Water POS"
              width={70}
              height={30}
              className="object-contain"
            />
          </div>
          <button
            onClick={onMobileClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto px-3 scrollbar-custom">
          {renderNavItems()}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;