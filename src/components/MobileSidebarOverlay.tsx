'use client';
import React from "react";

interface MobileSidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebarOverlay: React.FC<MobileSidebarOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={onClose}
    />
  );
};

export default MobileSidebarOverlay;
