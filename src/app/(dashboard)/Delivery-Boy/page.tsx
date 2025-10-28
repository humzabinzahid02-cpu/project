"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, MoreVertical, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import AddDeliveryBoyModal from "../../../components/AddDeliveryBoyModal";
import { KeyboardArrowDown } from "@mui/icons-material"; // 👈 use same arrow as your colonies dropdown
import { FormControl, Select, MenuItem } from "@mui/material";

type DeliveryBoy = {
  id: number;
  name: string;
  phone: string;
  dateJoined: string;
  username: string;
  password: string;
  status: "Active" | "Inactive" | "On Leave";
};

export default function DeliveryBoys() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deliveryBoys, setDeliveryBoys] = useState<DeliveryBoy[]>([
    {
      id: 1,
      name: "Imran",
      phone: "03054879524",
      dateJoined: "12 Aug 2025",
      username: "RoyalRider01",
      password: "********",
      status: "Active",
    },
    {
      id: 2,
      name: "Umar",
      phone: "03051234567",
      dateJoined: "14 Aug 2025",
      username: "RoyalRider02",
      password: "********",
      status: "On Leave",
    },
    {
      id: 3,
      name: "hasde",
      phone: "+923054879524",
      dateJoined: "12 Aug 2025",
      username: "RoyalRider03",
      password: "********",
      status: "Active",
    },
    {
      id: 4,
      name: "Imran",
      phone: "+923054879524",
      dateJoined: "12 Aug 2025",
      username: "RoyalRider04",
      password: "********",
      status: "Active",
    },
    {
      id: 5,
      name: "Ahsan",
      phone: "+923001112223",
      dateJoined: "01 Sep 2025",
      username: "RoyalRider05",
      password: "********",
      status: "Active",
    },
    {
      id: 6,
      name: "Bilal",
      phone: "+923004445556",
      dateJoined: "05 Sep 2025",
      username: "RoyalRider06",
      password: "********",
      status: "On Leave",
    },
    {
      id: 7,
      name: "Danish",
      phone: "+923007778889",
      dateJoined: "10 Sep 2025",
      username: "RoyalRider07",
      password: "********",
      status: "Inactive",
    },
    {
      id: 8,
      name: "Faizan",
      phone: "+923009990001",
      dateJoined: "12 Sep 2025",
      username: "RoyalRider08",
      password: "********",
      status: "Active",
    },
    {
      id: 9,
      name: "Hamza",
      phone: "+923012223334",
      dateJoined: "15 Sep 2025",
      username: "RoyalRider09",
      password: "********",
      status: "Active",
    },
    {
      id: 10,
      name: "Hassan",
      phone: "+923015556667",
      dateJoined: "18 Sep 2025",
      username: "RoyalRider10",
      password: "********",
      status: "On Leave",
    },
    {
      id: 11,
      name: "Ali",
      phone: "+923018889990",
      dateJoined: "20 Sep 2025",
      username: "RoyalRider11",
      password: "********",
      status: "Inactive",
    },
  ]);

  const handleAddDeliveryBoy = (boy: {
    name: string;
    phone: string;
    username: string;
    password: string;
  }) => {
    const newBoy: DeliveryBoy = {
      id: Date.now(),
      name: boy.name,
      phone: boy.phone,
      dateJoined: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      username: boy.username,
      password: "********",
      status: "Active",
    };

    setDeliveryBoys([...deliveryBoys, newBoy]);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("All Deliveries");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDeliveryBoys = useMemo(() => {
    return deliveryBoys.filter((boy) => {
      const matchesSearch =
        boy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        boy.phone.includes(searchTerm) ||
        boy.username.toLowerCase().includes(searchTerm.toLowerCase());

      if (sortBy === "All Deliveries") return matchesSearch;
      return matchesSearch && boy.status === sortBy;
    });
  }, [deliveryBoys, searchTerm, sortBy]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredDeliveryBoys.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = useMemo(
    () => filteredDeliveryBoys.slice(startIndex, endIndex),
    [filteredDeliveryBoys, startIndex, endIndex]
  );

  const handleDeliverySummary = (boyId: number) => {
    setOpenDropdown(null);
    router.push(`/Delivery-Boy/${boyId}`);
  };

  const [statusDropdown, setStatusDropdown] = useState<number | null>(null);

  const handleChangeStatus = (
    boyId: number,
    newStatus: DeliveryBoy["status"]
  ) => {
    setDeliveryBoys((prev) =>
      prev.map((boy) =>
        boy.id === boyId ? { ...boy, status: newStatus } : boy
      )
    );
    setStatusDropdown(null);
    setOpenDropdown(null);
  };

  return (
    <div className="bg-white">
      <div className="min-h-screen p-4 md:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
          Riders
        </h1>

        {/* Controls Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 lg:mb-8">
          {/* Search Bar */}
          <div className="relative w-90">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name, phone, or username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-90 pl-9 pr-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm"
            />
          </div>

          {/* Sort + Add Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Sort by */}
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
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        IconComponent={KeyboardArrowDown} // ✅ same arrow as colonies
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
            py: "8px",
            px: "14px",
            display: "flex",
            alignItems: "center",
          },
          "& .MuiSvgIcon-root": {
            color: "#6B7280", // 👈 arrow color
            fontSize: "1.4rem", // 👈 adjust arrow size if needed
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
        <MenuItem value="All Deliveries">All Deliveries</MenuItem>
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="On Leave">On Leave</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </Select>
    </FormControl>
 

            {/* Add Delivery Boy Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 px-7 py-2 bg-[#5B63E5] text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors w-full sm:w-auto"
            >
              Add Rider
            </button>
          </div>
        </div>

        {/* Desktop Table - Hidden on mobile */}
        <div className="hidden md:block bg-white rounded-xl overflow-hidden border border-gray-200 mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#E5F0FE] border-b border-blue-200">
                <tr>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-800">
                    Name / Phone
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-800">
                    Date Joined
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-800">
                    Username
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-800">
                    Password
                  </th>
                  <th className="text-center py-4 px-4 text-xs font-semibold text-gray-800">
                    Status
                  </th>
                  <th className="text-center py-4 px-4 text-xs font-semibold text-gray-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((boy) => (
                  <tr
                    key={boy.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-sm text-gray-900">
                          {boy.name}
                        </p>
                        <p className="text-xs text-gray-500">{boy.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {boy.dateJoined}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {boy.username}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {boy.password}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            boy.status === "Active"
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : boy.status === "On Leave"
                              ? "bg-orange-100 text-orange-700 border border-orange-200"
                              : "bg-red-100 text-red-700 border border-red-200"
                          }`}
                        >
                          {boy.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 relative">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === boy.id ? null : boy.id
                            )
                          }
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <MoreVertical className="h-5 w-5 text-gray-500" />
                        </button>

                        {openDropdown === boy.id && (
                          <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-8 w-52 bg-white rounded-md shadow-lg border border-gray-200 z-20"
                          >
                            <div className="py-2">
                              <div className="px-4 py-2 text-xs font-semibold text-gray-600 uppercase">
                                Change Status
                              </div>
                              <button
                                onClick={() =>
                                  handleChangeStatus(boy.id, "Active")
                                }
                                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                                  boy.status === "Active"
                                    ? "bg-green-50 text-green-700 font-medium"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {boy.status === "Active" ? "✓ " : ""}Active
                              </button>
                              <button
                                onClick={() =>
                                  handleChangeStatus(boy.id, "On Leave")
                                }
                                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                                  boy.status === "On Leave"
                                    ? "bg-orange-50 text-orange-700 font-medium"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {boy.status === "On Leave" ? "✓ " : ""}On Leave
                              </button>
                              <button
                                onClick={() =>
                                  handleChangeStatus(boy.id, "Inactive")
                                }
                                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                                  boy.status === "Inactive"
                                    ? "bg-red-50 text-red-700 font-medium"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {boy.status === "Inactive" ? "✓ " : ""}Inactive
                              </button>
                              <div className="border-t border-gray-200 my-1"></div>
                              <button
                                onClick={() => handleDeliverySummary(boy.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                 Delivery Summary
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="md:hidden space-y-3 mb-6">
          {currentItems.map((boy) => (
            <div
              key={boy.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start gap-3 mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{boy.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{boy.phone}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    boy.status === "Active"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : boy.status === "On Leave"
                      ? "bg-orange-100 text-orange-700 border border-orange-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {boy.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Date Joined:
                  </span>
                  <span>{boy.dateJoined}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Username:</span>
                  <span>{boy.username}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setStatusDropdown(statusDropdown === boy.id ? null : boy.id)
                  }
                  className="flex-1 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Change Status
                </button>
                <button
                  onClick={() => handleDeliverySummary(boy.id)}
                  className="flex-1 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Summary
                </button>
              </div>

              {statusDropdown === boy.id && (
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-xs font-semibold text-gray-600 mb-2">
                    Select Status:
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleChangeStatus(boy.id, "Active")}
                      className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        boy.status === "Active"
                          ? "bg-green-100 text-green-700 font-medium"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {boy.status === "Active" ? "✓ " : ""}Active
                    </button>
                    <button
                      onClick={() => handleChangeStatus(boy.id, "On Leave")}
                      className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        boy.status === "On Leave"
                          ? "bg-orange-100 text-orange-700 font-medium"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {boy.status === "On Leave" ? "✓ " : ""}On Leave
                    </button>
                    <button
                      onClick={() => handleChangeStatus(boy.id, "Inactive")}
                      className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        boy.status === "Inactive"
                          ? "bg-red-100 text-red-700 font-medium"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {boy.status === "Inactive" ? "✓ " : ""}Inactive
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 px-4 py-3 md:py-4 flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-b-lg">
          <div className="text-sm">
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredDeliveryBoys.length)} of{" "}
            {filteredDeliveryBoys.length} entries
          </div>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <AddDeliveryBoyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddDeliveryBoy}
      />
    </div>
  );
}