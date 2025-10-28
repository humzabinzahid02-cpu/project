"use client";
import type React from "react";
import { useEffect, useMemo, useState, useRef } from "react";
import { Search, Eye, ChevronDown } from "lucide-react";
import { 
  FormControl, 
  MenuItem, 
  Select, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button 
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  colony: string;
  block: string;
  houseStreet: string;
  bottlesRequested: string;
  pickup: string;
  paymentRemaining: string;
  assignedTo: string;
  status: "Active" | "Pending" | "Delivered" | "Not Delivered";
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Ahmed Hassan",
    customerPhone: "+92 300 1234567",
    date: "2025-09-20",
    time: "10:30 AM",
    colony: "Ali Garden",
    block: "Block A",
    houseStreet: "House 123",
    bottlesRequested: "2B / 1W",
    pickup: "1B / 1W",
    paymentRemaining: "Rs 900",
    assignedTo: "Ali",
    status: "Active",
  },
  {
    id: "ORD-002",
    customerName: "Fatima Khan",
    customerPhone: "+92 301 2345678",
    date: "2025-09-20",
    time: "11:15 AM",
    colony: "DHA Phase 2",
    block: "Block C",
    houseStreet: "Street 45",
    bottlesRequested: "3B / 2W",
    pickup: "1B / 1W",
    paymentRemaining: "Rs 1350",
    assignedTo: "Hassan",
    status: "Delivered",
  },
  {
    id: "ORD-003",
    customerName: "Muhammad Ali",
    customerPhone: "+92 302 3456789",
    date: "2025-09-20",
    time: "09:45 AM",
    colony: "Gulberg",
    block: "Block D",
    houseStreet: "House 67",
    bottlesRequested: "1B / 1W",
    pickup: "1B / 1W",
    paymentRemaining: "Rs 450",
    assignedTo: "Ahmed",
    status: "Delivered",
  },
  {
    id: "ORD-004",
    customerName: "Sara Ahmed",
    customerPhone: "+92 303 4567890",
    date: "2025-09-19",
    time: "02:20 PM",
    colony: "Ali Garden",
    block: "Block B",
    houseStreet: "House 89",
    bottlesRequested: "4B / 0W",
    pickup: "1B / 1W",
    paymentRemaining: "Rs 1800",
    assignedTo: "Ali",
    status: "Not Delivered",
  },
  {
    id: "ORD-005",
    customerName: "Omar Sheikh",
    customerPhone: "+92 304 5678901",
    date: "2025-09-19",
    time: "03:45 PM",
    colony: "Model Town",
    block: "Block E",
    houseStreet: "Street 12",
    bottlesRequested: "2B / 3W",
    pickup: "1B / 1W",
    paymentRemaining: "Rs 1125",
    assignedTo: "Hassan",
    status: "Active",
  },
];

const MoreVertIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-gray-600"
  >
    <circle cx="12" cy="6" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="12" cy="18" r="1.5" />
  </svg>
);

const IconButton: React.FC<{
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
    type="button"
    aria-label="More options"
  >
    {children}
  </button>
);

const Chip: React.FC<{
  label: string;
  status: "Active" | "Pending" | "Delivered" | "Not Delivered";
}> = ({ label, status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-300";
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-300";
      case "Not Delivered":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles()}`}
    >
      {label}
    </span>
  );
};

const Menu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  onStatusChange: (
    status: "Active" | "Pending" | "Delivered" | "Not Delivered"
  ) => void;
}> = ({ isOpen, onClose, anchorEl, onStatusChange }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[160px] z-50"
      style={{
        top: `${rect.bottom + 8}px`,
        left: `${rect.left - 120}px`,
      }}
    >
      <button
        onClick={() => onStatusChange("Active")}
        className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-green-50 transition-colors text-left flex items-center gap-2"
        type="button"
      >
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        Active
      </button>
      <button
        onClick={() => onStatusChange("Pending")}
        className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-amber-50 transition-colors text-left flex items-center gap-2"
        type="button"
      >
        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
        Pending
      </button>
      <button
        onClick={() => onStatusChange("Delivered")}
        className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-green-50 transition-colors text-left flex items-center gap-2"
        type="button"
      >
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        Delivered
      </button>
      <button
        onClick={() => onStatusChange("Not Delivered")}
        className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 transition-colors text-left flex items-center gap-2"
        type="button"
      >
        <span className="w-2 h-2 rounded-full bg-red-500"></span>
        Not Delivered
      </button>
    </div>
  );
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("All Days");
  const [colonyFilter, setColonyFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  
  // Confirmation modal state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<
    "Active" | "Pending" | "Delivered" | "Not Delivered" | null
  >(null);
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);

  const itemsPerPage = 10;

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    orderId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    if (!isConfirmOpen) {
      setSelectedOrderId(null);
    }
  };

  const handleStatusChange = (
    newStatus: "Active" | "Pending" | "Delivered" | "Not Delivered"
  ) => {
    setPendingStatus(newStatus);
    setPendingOrderId(selectedOrderId);
    setIsConfirmOpen(true);
    handleMenuClose();
  };

  const handleConfirmStatusChange = () => {
    if (pendingOrderId && pendingStatus) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === pendingOrderId
            ? { ...order, status: pendingStatus }
            : order
        )
      );
    }
    setIsConfirmOpen(false);
    setPendingStatus(null);
    setPendingOrderId(null);
    setSelectedOrderId(null);
  };

  const handleCancelStatusChange = () => {
    setIsConfirmOpen(false);
    setPendingStatus(null);
    setPendingOrderId(null);
    setSelectedOrderId(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const getStatusStyles = (status: string): string => {
    const statusConfig: { [k: string]: string } = {
      Active: "bg-green-50 text-green-700 border-green-200",
      Pending: "bg-amber-50 text-amber-700 border-amber-200",
      Delivered: "bg-green-50 text-green-700 border-green-200",
      "Not Delivered": "bg-red-50 text-red-700 border-red-200",
    };
    return statusConfig[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerPhone.includes(searchQuery);
      const matchesColony = colonyFilter ? order.colony === colonyFilter : true;
      return matchesSearch && matchesColony;
    });
  }, [orders, searchQuery, colonyFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
    if (currentPage < 1) setCurrentPage(1);
  }, [totalPages, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, dateFilter, colonyFilter]);

  const paginatedOrders = useMemo(
    () => filteredOrders.slice(startIndex, startIndex + itemsPerPage),
    [filteredOrders, startIndex, itemsPerPage]
  );

  return (
    <div className="min-h-screen p-2 md:p-6 bg-white">
      <div className="">
        <div className="mb-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-black">
            Orders
          </h1>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 lg:gap-6 justify-between items-start lg:items-center">
          <div className="w-90 relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B63E5] bg-white text-sm"
            />
          </div>

          <div className="flex flex-row gap-4 w-full lg:w-auto">
            {/* Date Filter */}
            <FormControl
              size="small"
              sx={{
                minWidth: 120,
                bgcolor: "white",
                borderRadius: "8px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                displayEmpty
                className="border border-gray-300 rounded-lg"
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
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      mt: 1,
                      borderRadius: "18px",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.06)",
                      minWidth: "180px",
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
                <MenuItem value="all">All Days</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
              </Select>
            </FormControl>

            {/* Colony Filter */}
            <FormControl
              size="small"
              sx={{
                minWidth: 120,
                bgcolor: "white",
                borderRadius: "8px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Select
                value={colonyFilter}
                onChange={(e) => setColonyFilter(e.target.value)}
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
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      mt: 1,
                      borderRadius: "18px",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.06)",
                      minWidth: "180px",
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
                <MenuItem value="">All Colonies</MenuItem>
                <MenuItem value="Ali Garden">Ali Garden</MenuItem>
                <MenuItem value="DHA Phase 2">DHA Phase 2</MenuItem>
                <MenuItem value="Gulberg">Gulberg</MenuItem>
                <MenuItem value="Model Town">Model Town</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Mobile-friendly card list view */}
        <div className="md:hidden space-y-3 mb-6">
          {paginatedOrders.map((order) => (
            <div
              key={order.id}
              className="border border-slate-200 rounded-xl bg-white p-4"
            >
              <div className="flex justify-between items-start">
                <div className="text-sm font-medium text-slate-800">
                  {order.id}
                </div>
                <Chip label={order.status} status={order.status} />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-slate-500">Customer</div>
                  <div className="text-sm font-medium text-slate-800">
                    {order.customerName}
                  </div>
                  <div className="text-xs text-slate-500">
                    {order.customerPhone}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Date & Time</div>
                  <div className="text-sm font-medium text-slate-800">
                    {formatDate(order.date)}
                  </div>
                  <div className="text-xs text-slate-500">{order.time}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Address</div>
                  <div className="text-sm font-medium text-slate-800">
                    {order.colony}
                  </div>
                  <div className="text-xs text-slate-500">
                    {order.block}, {order.houseStreet}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Bottles</div>
                  <div className="text-sm font-semibold text-slate-700">
                    {order.bottlesRequested}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Payment</div>
                  <div className="text-sm font-semibold text-red-600">
                    {order.paymentRemaining}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Assigned</div>
                  <div className="text-sm font-medium text-slate-700">
                    {order.assignedTo}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <IconButton onClick={(e) => handleMenuOpen(e, order.id)}>
                  <MoreVertIcon />
                </IconButton>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between mb-2 p-1">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Prev
              </button>
              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="hidden md:block bg-white rounded-xl overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full ">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Date & Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Bottles Requested
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Payment Remain
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Assigned To
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customerName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.customerPhone}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(order.date)}
                      </div>
                      <div className="text-xs text-gray-500">{order.time}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {order.colony}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.block}, {order.houseStreet}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                      {order.bottlesRequested}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-red-600">
                      {order.paymentRemaining}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      {order.assignedTo}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Chip label={order.status} status={order.status} />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <IconButton onClick={(e) => handleMenuOpen(e, order.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Desktop Pagination */}
        <div className="hidden md:flex items-center justify-between mt-4">
          <span className="text-sm text-gray-600">
            Showing {startIndex + 1}–
            {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              type="button"
              aria-label="Next page"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>

        <Menu
          isOpen={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorEl={anchorEl}
          onStatusChange={handleStatusChange}
        />

        {/* Confirmation Modal */}
        <Dialog
          open={isConfirmOpen}
          onClose={handleCancelStatusChange}
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
        >
          <DialogTitle id="confirm-dialog-title">
            Confirm Status Change
          </DialogTitle>
          <DialogContent>
            <p id="confirm-dialog-description">
              Are you sure you want to change status?
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelStatusChange} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmStatusChange}
              color="primary"
              variant="contained"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Orders;
