// src/components/HeaderWrapper.tsx
'use client';

import { useState } from "react";
import Header from "./Header";

export default function HeaderWrapper() {
   const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const toggleMobile = () => {
    setIsMobileOpen((prev) => !prev);
  };


  

  return (
    <Header
 isCollapsed={isCollapsed}
      toggleCollapse={toggleCollapse}
      toggleMobile={toggleMobile}
      onMobileMenuClick={toggleMobile}
    />
  );
}
