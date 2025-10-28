import { X, MapPin } from "lucide-react";
import { useState } from "react";
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
type Delivery = DeliveryItemNumeric | DeliveryItemString;
interface AssignModalProps {
  open: boolean;
  onClose: () => void;
  delivery: Delivery | null;
  onAssign: (location: string, rider: string) => void;
}
export default function AssignModal({ open, onClose, delivery, onAssign }: AssignModalProps) {
  const [selectedRider, setSelectedRider] = useState("");
  if (!open || !delivery) return null;
  const handleConfirm = () => {
    if (selectedRider && selectedRider !== "Select") {
      onAssign(delivery.location, selectedRider);
      setSelectedRider("");
      onClose();
    }
  };
  // Helper function to safely get bottle count
  const getBottleCount = (bottles: number | string): number => {
    if (typeof bottles === 'number') {
      return bottles;
    }
    // For string format like "6 Blue + 9 White", extract and sum numbers
    const matches = bottles.match(/\d+/g);
    if (matches) {
      return matches.reduce((sum, num) => sum + parseInt(num), 0);
    }
    return 0;
  };
  const blueCount = getBottleCount(delivery.blueBottles);
  const whiteCount = getBottleCount(delivery.whiteBottles);
  const totalBottles = blueCount + whiteCount;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[400px] rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-orange-500" size={20} />
            <h2 className="text-lg text-black font-semibold">
              Assign {delivery.location}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        {/* Orders Today */}
        <div className="flex justify-between items-center px-4 py-3">
          <span className="text-black font-medium">Orders Today</span>
          <span className="text-black font-medium text-sm">{delivery.ordersToday}</span>
        </div>
        <div className="border-b border-gray-200 mx-4"></div>
        {/* Select Delivery Boy */}
        <div className="px-4 py-3">
          <label className="block text-black font-semibold text-sm mb-1">
            Select Delivery Boy
          </label>
          <select
            className="w-full text-black border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            value={selectedRider}
            onChange={(e) => setSelectedRider(e.target.value)}
          >
            <option>Select</option>
            <option>Ali</option>
            <option>Hamza</option>
            <option>Ahmed</option>
          </select>
        </div>
        <div className="border-b border-gray-200 mx-4"></div>
        {/* Estimated Bottles */}
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-black font-semibold text-sm">Estimated Bottles</span>
            <span className="text-black text-sm font-semibold">{totalBottles}</span>
          </div>
          <div className=" rounded-lg bg-blue-50 border-blue-400 border-2">
            <div className="flex justify-between items-center px-3 py-2">
              <span className="text-black">Blue Bottles</span>
              <span className="text-black text-sm">{delivery.blueBottles}</span>
            </div>
            <div className="flex justify-between items-center px-3 py-2">
              <span className="text-black">White Bottles</span>
              <span className="text-black text-sm">{delivery.whiteBottles}</span>
            </div>
          </div>
        </div>
        {/* Confirm Button */}
        <div className="p-4">
          <button
            onClick={handleConfirm}
            disabled={!selectedRider || selectedRider === "Select"}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Confirm Assign
          </button>
        </div>
      </div>
    </div>
  );
}