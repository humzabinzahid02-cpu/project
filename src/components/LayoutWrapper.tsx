'use client';
import { useState } from "react";
// import Sidebar from "./Sidebar";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
   const [isCollapsed, setIsCollapsed] = useState(false); // desktop sidebar
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile sidebar

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  const toggleMobile = () => setIsMobileOpen((prev) => !prev);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        toggleCollapse={toggleCollapse}
        toggleMobile={toggleMobile}
         onMobileClose={() => setIsMobileOpen(false)}
      />

      <div className="flex flex-col flex-1">
        {/* Header */}
       <Header
  isCollapsed={isCollapsed}
  toggleCollapse={toggleCollapse}   
  toggleMobile={toggleMobile}  
       
  onMobileMenuClick={toggleMobile}  
/>

        {/* Page content */}
        <main
          className={`flex-1 overflow-auto bg-gray-50 transition-all duration-300 pt-16 
          hidden md:block ${isCollapsed ? "ml-16" : "ml-64"}`}
        >
          {children}
        </main>

        {/* Mobile content (full width) */}
        <main className="flex-1 overflow-auto bg-gray-50 pt-16 md:hidden">
          {children}
        </main>
      </div>
    </div>
  );
}