"use client";
import { useEffect, useState } from "react";
import { Eye, Edit, Search, ChevronDown } from "lucide-react";
import AddCustomerModal from "../../../components/AddCustomerModal";
import { useRouter } from "next/navigation";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAllCustomersQuery } from "../../../redux/api/customerApi";

interface Customer {
  id: number;
  customer_id: number;
  name: string;
  phone: string;
  created_at: string;
  status: "Active" | "Suspended" | "Pending";
  address: string;
  bottlesAtHome: string;
  paymentPending: number;
  house?: string;
  block?: string;
  colony?: string;
  dateJoined?: string;
}

interface CustomerFormData {
  name: string;
  phone: string;
  address?: string;
}



// ✅ Confirm Modal
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  confirmColor = "red",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  confirmColor?: "red" | "green" | "blue";
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center backdrop-blur-sm z-50 transition-all duration-300 justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm rounded-md text-white ${
              confirmColor === "red"
                ? "bg-red-600 hover:bg-red-700"
                : confirmColor === "green"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const Customers = () => {
  const router = useRouter();




  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"all" | "pending">("all");
  const [sortFilter, setSortFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    "activate" | "suspend" | "unsuspend" | null
  >(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );

  
    const { data,} = useAllCustomersQuery(null);



  console.log("API response:", data);

  useEffect(() => {
    if (data && Array.isArray(data.customers)) {
      setCustomers(data.customers);}
  }, [data]);

  console.log("Customers state:", customers);

  const handleSubmit = (data: CustomerFormData) => {
  const newCustomer: Customer = {
    customer_id:
      customers.length > 0 ? Math.max(...customers.map((c) => c.customer_id)) + 1 : 1,
    id: customers.length > 0 ? Math.max(...customers.map((c) => c.customer_id)) + 1 : 1,
    name: data.name,
    phone: data.phone,
    created_at: new Date().toISOString(),
    status: "Active",
    address: data.address || "",
    bottlesAtHome: "0 Blue / 0 White",
    paymentPending: 0,
  };

  setCustomers((prev) => [...prev, newCustomer]);
  setIsModalOpen(false);
};
 const handleActivatePending = (id: number) => {
  setCustomers((prev) =>
    prev.map((c) =>
      c.customer_id === id && c.status === "Pending" ? { ...c, status: "Active" } : c
    )
  );
};

const handleToggleSuspend = (id: number) => {
  setCustomers((prev) =>
    prev.map((c) => {
      if (c.customer_id === id) {
        if (c.status === "Active") return { ...c, status: "Suspended" };
        if (c.status === "Suspended") return { ...c, status: "Active" };
      }
      return c;
    })
  );
};
const handleEdit = (customer: Customer) => {
  setEditingCustomer(customer);
  setIsEditModalOpen(true);
};
const handleEditSubmit = (data: CustomerFormData) => {
  if (!editingCustomer) return;

  setCustomers((prev) =>
    prev.map((c) =>
      c.customer_id === editingCustomer.customer_id
        ? {
            ...c,
            name: data.name,
            phone: data.phone,
            address: data.address || "",
          }
        : c
    )
  );

  setIsEditModalOpen(false);
  setEditingCustomer(null);
};
  const pendingCount = customers.filter((c) => c.status === "Pending").length;

  const itemsPerPage = 10;

  const filteredCustomers = customers.filter((c) => {
    const query = searchTerm.toLowerCase().trim();
    // const matchesSearch =
    //   c.name.toLowerCase().includes(query) ||
    //   c.address.toLowerCase().includes(query);

    // let matchesStatus = true;

    // Tab filtering
    // if (viewMode === "all") {
    //   // All Customers tab: Show Active and Suspended only
    //   matchesStatus = c.status === "Active" || c.status === "Suspended";
    // } else if (viewMode === "pending") {
    //   // Pending tab: Show only Pending
    //   matchesStatus = c.status === "Pending";
    // }

    // // Dropdown filter (only in All Customers tab)
    // if (viewMode === "all" && sortFilter !== "all") {
    //   if (sortFilter === "active") {
    //     matchesStatus = c.status === "Active";
    //   } else if (sortFilter === "suspended") {
    //     matchesStatus = c.status === "Suspended";
    //   }
    // }

    return null;
  });

  const totalPages = Math.ceil(customers.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = customers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusStyles = (status: string) => {
    const map: Record<string, string> = {
      Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Suspended: "bg-red-50 text-red-700 border-red-200",
      Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    };
    return map[status] || "";
  };

  const openConfirmModal = (
    id: number,
    action: "activate" | "suspend" | "unsuspend"
  ) => {
    setSelectedCustomerId(id);
    setConfirmAction(action);
    setConfirmModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (!selectedCustomerId || !confirmAction) return;

    if (confirmAction === "activate") {
      handleActivatePending(selectedCustomerId);
    } else {
      handleToggleSuspend(selectedCustomerId);
    }
  };

  const getConfirmModalProps = () => {
    const customer = customers.find((c) => c.id === selectedCustomerId);
    if (!customer)
      return {
        title: "",
        message: "",
        confirmText: "",
        confirmColor: "red" as const,
      };

    if (confirmAction === "activate") {
      return {
        title: "Activate Customer?",
        message: "Are you sure you want to activate this pending customer?",
        confirmText: "Yes, Activate",
        confirmColor: "blue" as const,
      };
    } else if (confirmAction === "suspend") {
      return {
        title: "Suspend Customer?",
        message: "Are you sure you want to suspend this customer?",
        confirmText: "Yes, Suspend",
        confirmColor: "red" as const,
      };
    } else {
      return {
        title: "Reactivate Customer?",
        message: "Are you sure you want to reactivate this suspended customer?",
        confirmText: "Yes, Reactivate",
        confirmColor: "green" as const,
      };
    }
  };

  const formatDateTime = (value: string) => {
  const date = new Date(value);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} | ${formattedTime}`;
};


  return (
    <div className=" min-h-screen p-2 bg-white">
      <div className="sm:p-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-black mb-4">
          Customers
        </h1>

        {/* 🔍 Search + Sort + Add */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative w-90">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by customer name / phone"
              className="w-90 pl-9 pr-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[#475569] whitespace-nowrap">
              Status
            </span>

            <FormControl
              size="small"
              sx={{
                width: 130,
                bgcolor: "white",
                borderRadius: "8px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.04)",
              }}
              disabled={viewMode === "pending"}
            >
              <Select
                value={sortFilter}
                onChange={(e: SelectChangeEvent) =>
                  setSortFilter(e.target.value)
                }
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
                    py: "9px",
                    px: "px",
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
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active </MenuItem>
                <MenuItem value="suspended">Suspended </MenuItem>
              </Select>
            </FormControl>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#5B63E5] text-white px-4 py-2 rounded-md text-md hover:bg-[#4a52d4] transition-all duration-200"
            >
              + Add Customer
            </button>
          </div>
        </div>

        {/* 🔵 Tabs */}
        <div className="flex items-center gap-2 mb-5 bg-blue-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => {
              setViewMode("all");
              setSortFilter("all");
            }}
            className={`px-4 py-1.5 rounded-lg font-medium text-xs sm:text-sm ${
              viewMode === "all"
                ? "bg-[#5B63E5] text-white"
                : "bg-transparent text-black"
            }`}
          >
            All Customers
          </button>
          <button
            onClick={() => {
              setViewMode("pending");
              setSortFilter("all");
            }}
            className={`px-4 py-1.5 rounded-lg font-medium text-xs sm:text-sm relative ${
              viewMode === "pending"
                ? "bg-[#FF7438] text-white"
                : "bg-transparent text-gray-700"
            }`}
          >
            Pending Approval
            {pendingCount > 0 && viewMode !== "pending" && (
              <span className="absolute -top-2 -right-3 bg-[#FF7438] text-white text-xs rounded-full px-2 py-0.5 font-bold">
                {pendingCount}
              </span>
            )}
          </button>
        </div>

        {/* 📋 Customers Table */}
        <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
          <div className="overflow-x-auto min-h-[300px] hidden sm:block">
            {paginatedCustomers.length > 0 ? (
              <table className="w-full">
                <thead style={{ backgroundColor: "#E5F0FE" }}>
                  <tr>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-black uppercase">
                      ID
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-black uppercase">
                      Customer
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-black uppercase">
                      Date Joined
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-black uppercase">
                      Status
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-black uppercase">
                      Address
                    </th>
                    {viewMode === "all" && (
                      <>
                        <th className="text-left py-4 px-4 text-xs font-semibold text-black uppercase">
                          Bottles at Home
                        </th>
                        <th className="text-left py-4 px-4 text-xs font-semibold text-black uppercase">
                          Payment Pending
                        </th>
                      </>
                    )}
                    <th className="text-left py-4 px-4 text-xs font-semibold text-black uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y  divide-slate-100">
                  {paginatedCustomers.map((c) => (
                    <tr key={c.customer_id}   className="hover:bg-slate-50">
                      <td className="py-4 px-4 text-sm font-medium text-indigo-600">
                        #{c.customer_id}
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="text-sm font-medium text-slate-800">
                            {c.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {c.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-slate-800">
                       {formatDateTime(c.created_at)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
                            c.status
                          )}`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 w-[140px] text-sm">
                        {c.house} {c.block} {c.colony}
                      </td>
                      {viewMode === "all" && (
                        <>
                          <td className="py-4 px-4 text-sm">
                            {c.bottlesAtHome}
                          </td>
                          <td className="py-4 px-4 text-sm text-red-600 font-semibold">
                            Rs {c.paymentPending}
                          </td>
                        </>
                      )}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-2">
                          {c.status === "Pending" ? (
                            <button
                              onClick={() => openConfirmModal(c.customer_id, "activate")}
                              className="px-3 py-1.5 bg-[#00B37A] text-white text-xs font-medium rounded-md hover:bg-[#4a52d4] transition"
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                openConfirmModal(
                                  c.id,
                                  c.status === "Active"
                                    ? "suspend"
                                    : "unsuspend"
                                )
                              }
                              className={`px-3 w-[80px] py-1.5 text-xs font-medium rounded-md border transition ${
                                c.status === "Active"
                                  ? "bg-[#E94A4C] text-white border-red-300 hover:bg-red-600"
                                  : "bg-[#00B37A] text-white border-green-300 hover:bg-green-600"
                              }`}
                            >
                              {c.status === "Active" ? "Suspend" : "Active"}
                            </button>
                          )}
                          <button
                            onClick={() => handleEdit(c)}
                            className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 flex items-center gap-1"
                          >
                            <Edit size={14} /> Edit
                          </button>
                          <button
                            onClick={() => router.push(`/customers/${c.id}`)}
                            className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 flex items-center gap-1"
                          >
                            <Eye size={14} /> View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500 text-sm">
                No customers found.
              </div>
            )}
          </div>

          {/* Mobile View */}
          <div className="sm:hidden">
            {paginatedCustomers.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {paginatedCustomers.map((c) => (
                  <li key={c.customer_id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-semibold text-slate-800">
                          {c.name}
                        </div>
                        <div className="text-xs text-slate-500">{c.phone}</div>
                      </div>
                      <div className="text-xs font-medium text-indigo-600">
                        #{c.id}
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="text-xs text-slate-500">Joined</div>
                      <div className="text-xs text-slate-800">
                        {new Date(c.dateJoined).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>

                      <div className="text-xs text-slate-500">Status</div>
                      <div>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStatusStyles(
                            c.status
                          )}`}
                        >
                          {c.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-500">Address</div>
                      <div className="text-xs text-slate-800">{c.address}</div>

                      {viewMode === "all" && (
                        <>
                          <div className="text-xs text-slate-500">Bottles</div>
                          <div className="text-xs text-slate-800">
                            {c.bottlesAtHome}
                          </div>

                          <div className="text-xs text-slate-500">Pending</div>
                          <div className="text-xs text-red-600 font-semibold">
                            Rs 
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.status === "Pending" ? (
                        <button
                          onClick={() => openConfirmModal(c.customer_id, "activate")}
                          className="px-3 py-1.5 bg-[#5B63E5] text-white text-xs font-medium rounded-md hover:bg-[#4a52d4] transition"
                        >
                          Activate
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            openConfirmModal(
                              c.id,
                              c.status === "Active" ? "suspend" : "unsuspend"
                            )
                          }
                          className={`px-3 py-1.5 text-xs font-medium rounded-md border transition ${
                            c.status === "Active"
                              ? "bg-[#E94A4C] text-white border-red-300 hover:bg-red-600"
                              : "bg-[#00B37A] text-white border-green-300 hover:bg-green-600"
                          }`}
                        >
                          {c.status === "Active" ? "Suspend" : "Reactivate"}
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(c)}
                        className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 flex items-center gap-1"
                      >
                        <Edit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => router.push(`/customers/${c.customer_id}`)}  
                        className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 flex items-center gap-1"
                      >
                        <Eye size={14} /> View
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500 text-sm">
                No customers found.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-4 bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
            <div>
              Page {currentPage} of {totalPages} — Showing {startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of{" "}
              {filteredCustomers.length} customers
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white border-transparent"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
          setSelectedCustomerId(null);
          setConfirmAction(null);
        }}
        onConfirm={handleConfirmAction}
        {...getConfirmModalProps()}
      />

      {/* Add Modal */}
      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />

      {/* Edit Modal */}
      <AddCustomerModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCustomer(null);
        }}
        onSubmit={handleEditSubmit}
        title="Edit Customer"
        initialData={
          editingCustomer
            ? {
                name: editingCustomer.name || "",
                phone: editingCustomer.phone || "",
                houseNumber:
                  editingCustomer.address?.split(",")[0]?.trim() || "",
                streetNumber:
                  editingCustomer.address?.split(",")[1]?.trim() || "",
                colony: editingCustomer.address?.split(",")[2]?.trim() || "",
                block: editingCustomer.address?.split(",")[3]?.trim() || "",
                dispenserGallon:
                  parseInt(editingCustomer.bottlesAtHome?.split("/")[0]) || 0,
                normalGallon:
                  parseInt(editingCustomer.bottlesAtHome?.split("/")[1]) || 0,
                customerName: editingCustomer.name || "",
              }
            : undefined
        }
      />
    </div>
  );
};

export default Customers;
