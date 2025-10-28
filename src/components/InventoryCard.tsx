"use client";
import React from "react";

type InventoryCardProps = {
  title: string;
  icon: React.ReactNode;
  totalStock: number;
  withCustomers: number;
  atShop: number;
  inTransit: number;
  color?: "blue" | "gray" | "green" | "orange";
};

const colorMap: Record<string, string> = {
  blue: "bg-blue-100",
  gray: "bg-gray-100",
  green: "bg-green-100",
  orange: "bg-orange-100",
};

const InventoryCard: React.FC<InventoryCardProps> = ({
  title,
  icon,
  totalStock,
  withCustomers,
  atShop,
  inTransit,
  color = "gray",
}) => {
  return (
    <div className="bg-white border rounded-lg border-[#D1DEEF] p-3 sm:p-4 lg:p-5 shadow-sm  transition-shadow duration-200 w-full max-w-full sm:max-w-md lg:max-w-lg xl:max-w-none h-auto min-h-[240px] sm:min-h-[250px] lg:min-h-[260px]">
      {/* Icon and Title */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg leading-tight">
          {title}
        </h3>
      </div>

      {/* Stats Box */}
      <div
        className="rounded-md p-2.5 sm:p-3 lg:p-4 border-[#D1DEEF] border space-y-2 sm:space-y-2.5 text-xs sm:text-sm"
        style={{ backgroundColor: "#F5FAFF" }}
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total stock</span>
          <span className="text-gray-900 font-semibold">{totalStock}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">With customers</span>
          <span className="text-gray-900 font-semibold">{withCustomers}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">At shop</span>
          <span className="text-gray-900 font-semibold">{atShop}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">In transit</span>
          <span className="text-gray-900 font-semibold">{inTransit}</span>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
