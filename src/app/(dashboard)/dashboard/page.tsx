"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StatsCard from "../../../components/StatsCard";
import ActionButton from "../../../components/ActionButton";
import LiveActivity from "../../../components/LiveActivity";
import InventoryCard from "../../../components/InventoryCard";
import Link from "next/link";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState) {
      setIsCollapsed(JSON.parse(savedState));
    }
  }, []);
  return (
    <div className="bg-white">
      <div className={`min-h-screen  p-4 md:p-6`}>
        <h1 className="text-xl sm:text-2xl font-semibold  text-gray-900 mb-6 lg:mb-8">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-6">
          {/* Left Side (Stats + Actions + Live Activity) */}
          <div className="xl:col-span-8">
            {/* Stats Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <StatsCard title="Total Customers" value="152" color="purple" />
              <StatsCard
                title="Pending Customers Approval"
                value="6"
                color="orange"
              />
              <StatsCard
                title="Active Delivery boys"
                value="04"
                color="purple"
              />
              <StatsCard title="Orders Today" value="38" color="blue" />
              <StatsCard title="Pending orders" value="26" color="red" />
              <StatsCard title="Completed orders" value="12" color="green" />
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6 lg:mb-8">
              <ActionButton
                color="purple"
                onClick={() => router.push("/Assing-Deliveries")}
              >
                Assign Deliveries
              </ActionButton>
              <ActionButton
                color="orange"
                onClick={() => router.push("/customers")}
              >
                Approve New Customers
              </ActionButton>
              <ActionButton
                color="red"
                onClick={() => router.push("/Inventory")}
              >
                View Inventory
              </ActionButton>
            </div>
            <div className="relative">
              <LiveActivity height="h-[300px]" />
              <Link
                href="/Live-Activity"
                className="text-sm absolute top-0 right-1 underline text-[#5B63E5] font-semibold "
              >
                view all
              </Link>
            </div>
          </div>
          {/* Right Side (Inventory) */}
          <div className="xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 lg:gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-black text-xl font-semibold">Inventory</h2>

              <Link
                href="/Inventory"
                className="text-sm underline text-[#5B63E5] font-semibold "
              >
                view all
              </Link>
            </div>
            <InventoryCard
              title="Dispenser Gallon (Blue)"
              icon={
                <Image
                  src="/blue.png"
                  alt="Blue Water Gallon"
                  width={32}
                  height={40}
                  className="w-6 h-7 sm:w-7 sm:h-8 lg:w-8 lg:h-10"
                />
              }
              color="blue"
              totalStock={500}
              withCustomers={320}
              atShop={150}
              inTransit={30}
            />
            <InventoryCard
              title="Normal Gallon (White)"
              icon={
                <Image
                  src="/white.png"
                  alt="White Water Gallon"
                  width={32}
                  height={40}
                  className="w-6 h-7 sm:w-7 sm:h-8 lg:w-8 lg:h-10"
                />
              }
              color="gray"
              totalStock={400}
              withCustomers={250}
              atShop={120}
              inTransit={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
