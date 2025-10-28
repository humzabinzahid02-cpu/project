"use client";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import AssignModal from "../../../components/modal";
interface DeliveryItemNumeric {
  location: string;
  ordersToday: number;
  blueBottles: number;
  whiteBottles: number;
  assignedTo: string | null;
}
interface DeliveryItemString {
  location: string;
  ordersToday: number;
  blueBottles: string;
  whiteBottles: string;
  assignedTo: string | null;
}
// modal.tsx
type Delivery = DeliveryItemNumeric | DeliveryItemString;
const Delivery: NextPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      location: "Ali Garden",
      ordersToday: 45,
      blueBottles: 100,
      whiteBottles: 60,
      assignedTo: null,
    },
    {
      location: "Al-Noor Garden",
      ordersToday: 86,
      blueBottles: 125,
      whiteBottles: 34,
      assignedTo: "Ali",
    },
    {
      location: "Qalib City",
      ordersToday: 45,
      blueBottles: "6 Blue + 9 White",
      whiteBottles: "3 Blue + 2 White",
      assignedTo: null,
    },
    {
      location: "Al-Noor Garden",
      ordersToday: 45,
      blueBottles: "6 Blue + 9 White",
      whiteBottles: "3 Blue + 2 White",
      assignedTo: null,
    },
  ]);
  const handleAssign = (location: string, rider: string) => {
    setDeliveries((prev) =>
      prev.map((d) =>
        d.location === location ? { ...d, assignedTo: rider } : d
      )
    );
  };
  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl text-black font-bold mb-6">Assign Deliveries</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {deliveries.map((delivery, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center mb-4">
              <span className="text-orange-500 mr-2 text-xl">
                <Image
                  src="/map-pin.png"
                  alt="Location Icon"
                  width={20}
                  height={20}
                />
              </span>
              <h3 className="text-lg text-black font-semibold">
                {delivery.location}
              </h3>
            </div>
            {/* Orders */}
            <div className="flex justify-between items-center border-gray-200 pt-2 pb-2">
              <span className="text-black text-xl font-semibold">
                Orders Today
              </span>
              <span className="text-black font-semibold">
                {delivery.ordersToday}
              </span>
            </div>
            {/* Bottles */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-2 pb-2">
              <span className="text-gray-600 text-sm">Blue Bottles</span>
              <span className="text-black">{delivery.blueBottles}</span>
            </div>
            <div className="flex justify-between items-center border-gray-200 pt-2 pb-2">
              <span className="text-gray-600 text-sm">White Bottles</span>
              <span className="text-black">{delivery.whiteBottles}</span>
            </div>
            {/* Assigned To */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-2 pb-4">
              <span className="text-black font-semibold text-xl">
                Assigned To
              </span>
              <span className="text-black font-medium">
                {delivery.assignedTo || "-"}
              </span>
            </div>
            {/* Button */}
            <div className="flex gap-5">
              <button
                onClick={() => router.push(`/colonies/1`)} // 👈 dynamic route
                className="bg-[#D1DEEF] mt-3 w-full py-2 rounded-lg hover:bg-[#b9cde6] transition"
              >
                View Colony details
              </button>
              <button
                onClick={() => {
                  setSelectedDelivery(delivery);
                  setOpen(true);
                }}
                className={`mt-3 w-full py-2 rounded-lg ${
                  delivery.assignedTo
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-red-500 hover:bg-red-600"
                } text-white`}
              >
                {delivery.assignedTo ? "Change Rider" : "Assign Rider"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      <AssignModal
        open={open}
        onClose={() => setOpen(false)}
        delivery={selectedDelivery}
        onAssign={handleAssign}
      />
    </div>
  );
};
export default Delivery;
