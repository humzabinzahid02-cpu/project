"use client";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


interface PaymentRow {
  id: number;
  dateTime: string;
  customer: string;
  rider: string;
  amount: number;
  status: "Pending" | "Not Confirmed" | "Received by Rider" | "Confirmed Admin";
}

const initialData: PaymentRow[] = [
  {
    id: 1,
    dateTime: "12 Sep 09:15",
    customer: "Ahmed Khan",
    rider: "Ali",
    amount: 2850,
    status: "Pending",
  },
  {
    id: 2,
    dateTime: "12 Sep 09:15",
    customer: "Ahmed Khan",
    rider: "Ali",
    amount: 2850,
    status: "Not Confirmed",
  },
  {
    id: 3,
    dateTime: "12 Sep 09:15",
    customer: "Ahmed Khan",
    rider: "Ali",
    amount: 2850,
    status: "Not Confirmed",
  },
  {
    id: 4,
    dateTime: "12 Sep 09:15",
    customer: "Ahmed Khan",
    rider: "Ali",
    amount: 2850,
    status: "Received by Rider",
  },
  {
    id: 5,
    dateTime: "12 Sep 09:15",
    customer: "Ahmed Khan",
    rider: "Ali",
    amount: 2850,
    status: "Received by Rider",
  },
  {
    id: 6,
    dateTime: "12 Sep 09:15",
    customer: "Ahmed Khan",
    rider: "Ali",
    amount: 2850,
    status: "Confirmed Admin",
  },
];

export default function PaymentsDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [riderFilter, setRiderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<PaymentRow[]>(initialData);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRow | null>(
    null
  );

  const rowsPerPage = 5;

  const handleConfirmCash = (id: number) => {
    const payment = data.find((row) => row.id === id);
    if (payment) {
      setSelectedPayment(payment);
      setShowModal(true);
    }
  };

  const confirmPayment = () => {
    if (selectedPayment) {
      setData((prevData) =>
        prevData.map((row) =>
          row.id === selectedPayment.id
            ? { ...row, status: "Confirmed Admin" }
            : row
        )
      );
      setShowModal(false);
      setSelectedPayment(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  const handleSendReminder = (id: number) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, status: "Pending" } : row
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-600 border-orange-300";
      case "Not Confirmed":
        return "bg-red-100 text-red-600 border-red-300";
      case "Received by Rider":
        return "bg-blue-100 text-blue-600 border-blue-300";
      case "Confirmed Admin":
        return "bg-green-100 text-green-600 border-green-300";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  const filteredData = data.filter((row) => {
    const matchesSearch =
      row.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.rider.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRider = riderFilter
      ? row.rider.toLowerCase() === riderFilter.toLowerCase()
      : true;

    const matchesStatus =
      statusFilter === ""
        ? true
        : statusFilter === "pending"
        ? row.status === "Pending"
        : statusFilter === "not-confirmed"
        ? row.status === "Not Confirmed"
        : statusFilter === "received"
        ? row.status === "Received by Rider"
        : row.status === "Confirmed Admin";

    return matchesSearch && matchesRider && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalCollected = data.reduce((sum, row) => sum + row.amount, 0);
  const pendingTotal = data
    .filter((r) => r.status === "Pending")
    .reduce((s, r) => s + r.amount, 0);
  const notConfirmedTotal = data
    .filter((r) => r.status === "Not Confirmed")
    .reduce((s, r) => s + r.amount, 0);
  const confirmedTotal = data
    .filter((r) => r.status === "Confirmed Admin")
    .reduce((s, r) => s + r.amount, 0);

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
            Payments & Cash
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              {/* Date Filter */}
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
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  displayEmpty
                  IconComponent={KeyboardArrowDownIcon}
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
                  <MenuItem value="">Date</MenuItem>
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                </Select>
              </FormControl>

              {/* Rider Filter */}
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
                  displayEmpty
                  IconComponent={KeyboardArrowDownIcon}
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
                  <MenuItem value="">Rider</MenuItem>
                  <MenuItem value="ali">Ali</MenuItem>
                  <MenuItem value="ahmed">Ahmed</MenuItem>
                  <MenuItem value="hassan">Hassan</MenuItem>
                </Select>
              </FormControl>

              {/* Status Filter */}
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
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  displayEmpty
                  IconComponent={KeyboardArrowDownIcon}
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
                  <MenuItem value="">Status</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="not-confirmed">Not Confirmed</MenuItem>
                  <MenuItem value="received">Received</MenuItem>
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                </Select>
              </FormControl>
            </div>

          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className="border-2  rounded-lg p-3 md:p-5">
            <div className="text-xs  mb-1 md:mb-2">
              Total Collected Payments
            </div>
            <div className="text-lg md:text-3xl font-bold text-blue-400">
              Rs. {totalCollected.toLocaleString()}
            </div>
          </div>
          <div className="border-2  rounded-lg p-3 md:p-5">
            <div className="text-xs  mb-1 md:mb-2">
              Total Pending Payment
            </div>
            <div className="text-lg md:text-3xl font-bold text-orange-400">
              Rs. {pendingTotal.toLocaleString()}
            </div>
          </div>
          <div className="border-2  rounded-lg p-3 md:p-5">
            <div className="text-xs  mb-1 md:mb-2">
              Total Pending Customers
            </div>
            <div className="text-lg md:text-3xl font-bold text-gray-400">
              12
            </div>
          </div>
          <div className="border-2  rounded-lg p-3 md:p-5">
            <div className="text-xs  mb-1 md:mb-2">
              Confirmed by Admin
            </div>
            <div className="text-lg md:text-3xl font-bold text-green-400">
              Rs. {confirmedTotal.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-3 mb-6">
          {paginatedData.map((row) => (
            <div
              key={row.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {row.customer}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {row.dateTime}
                  </div>
                </div>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    row.status
                  )}`}
                >
                  {row.status.replace(" ", "\n")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                <div>
                  <span className="text-gray-500">Rider:</span>
                  <span className="ml-1 font-medium text-gray-900">
                    {row.rider}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Amount:</span>
                  <span className="ml-1 font-medium text-gray-900">
                    Rs. {row.amount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                {row.status === "Pending" && (
                  <div className="text-sm text-gray-400 text-center py-2">
                    Reminder sent
                  </div>
                )}
                {row.status === "Not Confirmed" && (
                  <button
                    onClick={() => handleSendReminder(row.id)}
                    className="w-full px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                  >
                    Send Reminder
                  </button>
                )}
                {row.status === "Received by Rider" && (
                  <button
                    onClick={() => handleConfirmCash(row.id)}
                    className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  >
                    Confirm Cash
                  </button>
                )}
                {row.status === "Confirmed Admin" && (
                  <button
                    disabled
                    className="w-full px-4 py-2 bg-gray-100 text-gray-500 text-sm font-medium rounded-md border border-gray-300 cursor-not-allowed"
                  >
                    Confirmed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Date & Time
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Rider
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Amount (Rs)
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {row.dateTime}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {row.customer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {row.rider}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {row.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {row.status === "Pending" && (
                        <button
                          disabled
                          className="px-4 py-2 bg-blue-100 text-blue-600 text-sm font-medium rounded-md border border-blue-300 cursor-not-allowed"
                        >
                          Reminder sent
                        </button>
                      )}
                      {row.status === "Not Confirmed" && (
                        <button
                          onClick={() => handleSendReminder(row.id)}
                          className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                        >
                          Send Reminder
                        </button>
                      )}
                      {row.status === "Received by Rider" && (
                        <button
                          onClick={() => handleConfirmCash(row.id)}
                          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                        >
                          Confirm Cash
                        </button>
                      )}
                      {row.status === "Confirmed Admin" && (
                        <button
                          disabled
                          className="px-4 py-2 bg-gray-100 text-gray-500 text-sm font-medium rounded-md border border-gray-300 cursor-not-allowed"
                        >
                          Confirmed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs sm:text-sm text-gray-700">
            <span className="font-semibold text-indigo-600">{currentPage}</span>{" "}
            of <span className="font-semibold">{totalPages}</span> Pages
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Confirm Cash Receipt
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Customer:</span>
                <span className="text-sm font-medium text-gray-900">
                  {selectedPayment.customer}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Rider:</span>
                <span className="text-sm font-medium text-gray-900">
                  {selectedPayment.rider}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Amount:</span>
                <span className="text-sm font-medium text-gray-900">
                  Rs. {selectedPayment.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Date & Time:</span>
                <span className="text-sm font-medium text-gray-900">
                  {selectedPayment.dateTime}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to confirm that this cash payment has been
              received?
            </p>

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmPayment}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}