"use client";
import { useState, useRef, useEffect } from "react";
import { Search, MoreVertical } from "lucide-react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import ActionButton from "../../../components/ActionButton";
import { useRouter } from "next/navigation";
type DeliveryStatus = "Pending" | "In Transit" | "Not Delivered" | "Delivered";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
type Delivery = {
  id: number;
  rider: string;
  tripLoad: string;
  customer: string;
  address: string;
  bottles: string;
  status: DeliveryStatus;
  pickup: string;
  deliveredDateTime: string;
  payment: string;
};

const mockDeliveries: Delivery[] = [
  {
    id: 1,
    rider: "-",
    tripLoad: "1",
    customer: "Ali Raza",
    address: "Block C, Al Noor Garden",
    bottles: "2 Blue, 1 White",
    status: "Pending",
    pickup: "2 Blue, 1 White",
    deliveredDateTime: "-",
    payment: "-",
  },
  {
    id: 2,
    rider: "Hamza Khan",
    tripLoad: "1",
    customer: "Murtaza",
    address: "Block C, Al Noor Garden",
    bottles: "2 Blue, 1 White",
    status: "In Transit",
    pickup: "2 Blue, 1 White",
    deliveredDateTime: "12 Aug 2025 12:45 PM",
    payment: "-",
  },
  {
    id: 3,
    rider: "Hamza Khan",
    tripLoad: "1",
    customer: "Hassan",
    address: "Block C, Al Noor Garden",
    bottles: "2 Blue, 1 White",
    status: "Not Delivered",
    pickup: "2 Blue, 1 White",
    deliveredDateTime: "12 Aug 2025 12:45 PM",
    payment: "-",
  },
  {
    id: 4,
    rider: "Hamza Khan",
    tripLoad: "1",
    customer: "Humza",
    address: "Block C, Al Noor Garden",
    bottles: "2 Blue, 1 White",
    status: "Delivered",
    pickup: "2 Blue, 1 White",
    deliveredDateTime: "12 Aug 2025 12:45 PM",
    payment: "-",
  },
  {
    id: 5,
    rider: "Hamza Khan",
    tripLoad: "1",
    customer: "Iftekhar",
    address: "Block C, Al Noor Garden",
    bottles: "2 Blue, 1 White",
    status: "Delivered",
    pickup: "2 Blue, 1 White",
    deliveredDateTime: "12 Aug 2025 12:45 PM",
    payment: "-",
  },
];

// ✅ Fixed Three Dot Dropdown Component
const ThreeDotDropdown = ({
  deliveryId,
  currentStatus,
  onStatusChange,
}: {
  deliveryId: number;
  currentStatus: DeliveryStatus;
  onStatusChange: (deliveryId: number, newStatus: DeliveryStatus) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleStatusChange = (newStatus: DeliveryStatus) => {
    onStatusChange(deliveryId, newStatus);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ✅ Corrected IconButton closing tag */}
      <IconButton size="small" onClick={handleClick}>
        <MoreVertical className="h-4 w-4" />
      </IconButton>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
            Change Status
          </div>
          <button
            onClick={() => handleStatusChange("Pending")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Pending
          </button>
          <button
            onClick={() => handleStatusChange("In Transit")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            In Transit
          </button>
          <button
            onClick={() => handleStatusChange("Not Delivered")}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors duration-200"
          >
            Not Delivered
          </button>
          <button
            onClick={() => handleStatusChange("Delivered")}
            className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-50 transition-colors duration-200"
          >
            Delivered
          </button>
        </div>
      )}
    </div>
  );
};
export default function DeliveriesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveries, setDeliveries] = useState(mockDeliveries);
  const [riderFilter, setRiderFilter] = useState("All");
  const [customerFilter, setCustomerFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      !searchQuery.trim() ||
      delivery.rider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.address.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedDeliveries = filteredDeliveries.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const getStatusBadge = (status: DeliveryStatus) => {
    const styles = {
      Pending: "bg-orange-100 text-orange-700",
      "In Transit": "bg-blue-100 text-blue-700",
      "Not Delivered": "bg-red-100 text-red-700",
      Delivered: "bg-green-100 text-green-700",
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  const handleStatusChange = (
    deliveryId: number,
    newStatus: DeliveryStatus
  ) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === deliveryId
          ? { ...delivery, status: newStatus }
          : delivery
      )
    );
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="">
        {/* Header Section */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Deliveries
        </h1>
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative md:w-96">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="w-90 pl-9 pr-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Rider */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm text-[#475569]">Rider</span>
              <FormControl
                size="small"
                sx={{
                  width: 130,
                  bgcolor: "white",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <Select
                  value={riderFilter}
                  onChange={(e) => setRiderFilter(e.target.value)}
                  IconComponent={KeyboardArrowDownIcon} // ⬇️ This gives the dropdown arrow
                  displayEmpty
                  sx={{
                    color: "#374151",
                    fontSize: 15,
                    fontWeight: 500,
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D1D5DB",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#9CA3AF",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#2563EB",
                      boxShadow: "0 0 0 3px rgba(37,99,235,0.2)",
                    },
                    "& .MuiSelect-select": {
                      py: "10px",
                      px: "14px",
                      display: "flex",
                      alignItems: "center",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#6B7280",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        mt: 1,
                        borderRadius: "18px",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.06)",
                        minWidth: "130px",
                        "& .MuiMenuItem-root": {
                          fontSize: 15,
                          fontWeight: 500,
                          color: "#374151",
                          "&.Mui-selected": {
                            backgroundColor: "#EFF6FF",
                            color: "#2563EB",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#E0ECFF",
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Hamza Khan">Hamza Khan</MenuItem>
                  <MenuItem value="Rider 2">Rider 2</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Customer */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm text-[#475569]">Customer</span>
              <FormControl
                size="small"
                sx={{
                  width: 130,
                  bgcolor: "white",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <Select
                  value={customerFilter}
                  onChange={(e) => setCustomerFilter(e.target.value)}
                  IconComponent={KeyboardArrowDownIcon}
                  displayEmpty
                  sx={{
                    color: "#374151",
                    fontSize: 15,
                    fontWeight: 500,
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D1D5DB",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#9CA3AF",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#2563EB",
                      boxShadow: "0 0 0 3px rgba(37,99,235,0.2)",
                    },
                    "& .MuiSelect-select": {
                      py: "10px",
                      px: "14px",
                      display: "flex",
                      alignItems: "center",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#6B7280",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        mt: 1,
                        borderRadius: "18px",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.06)",
                        minWidth: "130px",
                        "& .MuiMenuItem-root": {
                          fontSize: 15,
                          fontWeight: 500,
                          color: "#374151",
                          "&.Mui-selected": {
                            backgroundColor: "#EFF6FF",
                            color: "#2563EB",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#E0ECFF",
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Customer 1">Customer 1</MenuItem>
                  <MenuItem value="Customer 2">Customer 2</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Button */}
            <div className="w-full sm:w-auto">
              <ActionButton
                color="purple"
                onClick={() => router.push("/Assing-Deliveries")}
              >
                Assign Deliveries
              </ActionButton>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border hidden md:block border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm ">
              <thead>
                <tr className="bg-[#E5F0FE] border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider">
                    Rider
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider">
                    Trip/Load
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider">
                    Address
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold  uppercase tracking-wider">
                    Bottles
                  </th>
                  <th className="text-center  py-3 px-4 text-xs font-semibold  uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold  uppercase tracking-wider">
                    Pickup
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold  uppercase tracking-wider">
                    Delivered date/ time
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold  uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold  uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDeliveries.length > 0 ? (
                  filteredDeliveries.map((delivery) => (
                    <tr
                      key={delivery.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-gray-900">
                        {delivery.rider}
                      </td>
                      <td className="py-3 px-4 text-gray-900">
                        {delivery.tripLoad}
                      </td>
                      <td className="py-3 px-4 text-gray-900">
                        {delivery.customer}
                      </td>
                      <td className="py-3 px-4 text-gray-900">
                        {delivery.address}
                      </td>
                      <td className="py-3 px-4 text-gray-900">
                        {delivery.bottles}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-center">
                        {getStatusBadge(delivery.status)}
                      </td>
                      <td className="py-3 px-4 text-gray-900">
                        {delivery.pickup}
                      </td>
                      <td className="py-3 px-4 text-gray-900 text-xs">
                        {delivery.deliveredDateTime}
                      </td>
                      <td className="py-3 px-4 text-gray-900">
                        {delivery.payment}
                      </td>
                      <td className="py-3 px-4">
                        <ThreeDotDropdown
                          deliveryId={delivery.id}
                          currentStatus={delivery.status}
                          onStatusChange={handleStatusChange}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-gray-500">
                      No deliveries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredDeliveries.length > 0 ? (
            filteredDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {delivery.customer}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Rider: {delivery.rider}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(delivery.status)}
                    <ThreeDotDropdown
                      deliveryId={delivery.id}
                      currentStatus={delivery.status}
                      onStatusChange={handleStatusChange}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trip/Load:</span>
                    <span className="font-medium text-gray-900">
                      {delivery.tripLoad}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-medium text-gray-900 text-right ml-2">
                      {delivery.address}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bottles:</span>
                    <span className="font-medium text-gray-900">
                      {delivery.bottles}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pickup:</span>
                    <span className="font-medium text-gray-900">
                      {delivery.pickup}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivered:</span>
                    <span className="font-medium text-gray-900 text-xs">
                      {delivery.deliveredDateTime}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
              No deliveries found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
