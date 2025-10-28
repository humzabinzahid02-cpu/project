"use client";
import { ArrowLeft, UserX, Trash2, X, EyeOff, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Rider {
  id: number;
  name: string;
  phone: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "On Leave";
  username: string;
  password: string;
}

// Mock data for all riders
const mockRiders: Record<string, Rider> = {
  "1": {
    id: 1,
    name: "Imran",
    phone: "+923054879524",
    dateJoined: "2025-08-12",
    status: "Active",
    username: "RoyalRider01",
    password: "R!d3r@901",
  },
  "2": {
    id: 2,
    name: "Umar",
    phone: "+923054879524",
    dateJoined: "2025-08-12",
    status: "On Leave",
    username: "RoyalRider02",
    password: "Umar#4521",
  },
  "3": {
    id: 3,
    name: "Hasde",
    phone: "+923054879524",
    dateJoined: "2025-08-12",
    status: "Active",
    username: "RoyalRider03",
    password: "Hsd@2025",
  },
  "4": {
    id: 4,
    name: "Imran",
    phone: "+923054879524",
    dateJoined: "2025-08-12",
    status: "Active",
    username: "RoyalRider04",
    password: "ImR@N884",
  },
  "5": {
    id: 5,
    name: "Ahsan",
    phone: "+923001112223",
    dateJoined: "2025-09-01",
    status: "Active",
    username: "RoyalRider05",
    password: "Ah$an@992",
  },
  "6": {
    id: 6,
    name: "Bilal",
    phone: "+923004445556",
    dateJoined: "2025-09-05",
    status: "On Leave",
    username: "RoyalRider06",
    password: "BiL@l321!",
  },
  "7": {
    id: 7,
    name: "Danish",
    phone: "+923007778889",
    dateJoined: "2025-09-10",
    status: "Inactive",
    username: "RoyalRider07",
    password: "D@nish#44",
  },
  "8": {
    id: 8,
    name: "Faizan",
    phone: "+923009990001",
    dateJoined: "2025-09-12",
    status: "Active",
    username: "RoyalRider08",
    password: "FzN@7788",
  },
  "9": {
    id: 9,
    name: "Hamza",
    phone: "+923012223334",
    dateJoined: "2025-09-15",
    status: "Active",
    username: "RoyalRider09",
    password: "Hz@!9933",
  },
  "10": {
    id: 10,
    name: "Hassan",
    phone: "+923015556667",
    dateJoined: "2025-09-18",
    status: "On Leave",
    username: "RoyalRider10",
    password: "HsN#2205",
  },
  "11": {
    id: 11,
    name: "Ali",
    phone: "+923018889990",
    dateJoined: "2025-09-20",
    status: "Inactive",
    username: "RoyalRider11",
    password: "Al!_0087",
  },
  "12": {
    id: 12,
    name: "Ahmed",
    phone: "+923020001112",
    dateJoined: "2025-09-22",
    status: "Active",
    username: "RoyalRider12",
    password: "Ahm@221!",
  },
  "13": {
    id: 13,
    name: "Zain",
    phone: "+923023334445",
    dateJoined: "2025-09-24",
    status: "Active",
    username: "RoyalRider13",
    password: "Zn#9920@",
  },
  "14": {
    id: 14,
    name: "Umar",
    phone: "+923026667778",
    dateJoined: "2025-09-26",
    status: "On Leave",
    username: "RoyalRider14",
    password: "Um@r!729",
  },
};

function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="h-9 w-48 bg-white rounded-lg animate-pulse"></div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 mb-6 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-blue-50">
            <div className="h-6 w-48 bg-slate-200 rounded animate-pulse"></div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-slate-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 p-6"
            >
              <div className="h-4 w-32 bg-slate-200 rounded animate-pulse mb-3"></div>
              <div className="h-8 w-24 bg-slate-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Edit Modal Component
function EditRiderModal({
  isOpen,
  onClose,
  rider,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  rider: Rider;
  onSave: (updated: Rider) => void;
}) {
  const [formData, setFormData] = useState<Rider>(rider);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    setFormData(rider);
  }, [rider]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Edit Rider</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-[#F8FAFC] focus:ring-2 focus:ring-[#5B63E5] outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Phone no
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+92 123456789"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-[#F8FAFC] focus:ring-2 focus:ring-[#5B63E5] outline-none"
            />
          </div>

          {/* Small note */}
          <p className="text-xs text-blue-600 font-medium">
            For login Delivery APP
          </p>

          {/* Username & Password */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-[#F8FAFC] focus:ring-2 focus:ring-[#5B63E5] outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Set Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-[#F8FAFC] focus:ring-2 focus:ring-[#5B63E5] outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Status
            </label>
            <div className="flex gap-4">
              {["Active", "Inactive", "Suspend"].map((status) => (
                <label
                  key={status}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition ${
                    formData.status === status
                      ? "border-[#5B63E5] bg-[#EEF0FF] text-[#5B63E5]"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    value={status}
                    checked={formData.status === status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as Rider["status"],
                      })
                    }
                    className="hidden"
                  />
                  <span className="text-sm">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition mr-3"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(formData);
              // toast.success("Rider details updated");
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-[#5B63E5] text-white font-medium hover:bg-[#4149e4] transition"
          >
            Save Rider
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RiderDetails() {
  const [rider, setRider] = useState<Rider | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [riderId, setRiderId] = useState<string>("");
  
  useEffect(() => {
    const id = window.location.pathname.split("/").pop() || "1";
    setTimeout(() => {
      setRider(mockRiders[id]);
      setLoading(false);
    }, 500);
  }, []);

  const handleBack = () => window.history.back();

  const handleSave = (updated: Rider) => {
    setRider(updated);
    toast.success("Rider details updated", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    // Extract rider ID from URL
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const id = path.split("/").pop() || "";
      setRiderId(id);
    }
  }, []);

  useEffect(() => {
    const fetchRider = async () => {
      if (!riderId) return;

      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Try to get from sessionStorage first (data from delivery boys page)
      let riderData: Rider | null = null;

      if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem(`rider-${riderId}`);
        if (stored) {
          riderData = JSON.parse(stored);
        }
      }

      // Fallback to mock data
      if (!riderData) {
        riderData = mockRiders[riderId] || null;
      }

      setRider(riderData);
      setLoading(false);
    };

    if (riderId) {
      fetchRider();
    }
  }, [riderId]);

  const handleSuspend = () => {
    if (!rider) return;
    setShowSuspendModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    toast.success("Rider deleted successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: "#EF4444",
        color: "#fff",
        fontWeight: "500",
        borderRadius: "8px",
      },
    });
    handleBack();
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const deliveriesData = [
    {
      customerName: "Suhaiban Ol",
      address: "House 47, Street 4, Block C, Al Noor Garden",
      blue: 2,
      white: 1,
      status: "Delivered",
      cashCollected: 290,
      dateTime: "30 Sep, 10:30 AM",
      tripNumber: "T-124",
    },
    {
      customerName: "Ali Khan",
      address: "H12, St 5, Gulshan, Block A",
      blue: 1,
      white: 2,
      status: "Delivered",
      cashCollected: 280,
      dateTime: "30 Sep, 11:15 AM",
      tripNumber: "T-124",
    },
    {
      customerName: "Sara Ahmed",
      address: "22, 10th Ave, Model Town",
      blue: 2,
      white: 0,
      status: "Pending",
      cashCollected: 0,
      dateTime: "30 Sep, 02:00 PM",
      tripNumber: "T-125",
    },
  ];

  const paymentsData = [
    { date: "30 Sep", amount: 570, method: "Cash", status: "Confirmed" },
    { date: "29 Sep", amount: 720, method: "Cash", status: "Confirmed" },
    { date: "28 Sep", amount: 850, method: "Cash", status: "Confirmed" },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const totalBottlesDelivered = deliveriesData.reduce(
    (sum, d) => sum + d.blue + d.white,
    0
  );
  const totalBottlesReturned = 45;
  const totalTrips = new Set(deliveriesData.map((d) => d.tripNumber)).size;
  const totalCashCollected = deliveriesData.reduce(
    (sum, d) => sum + d.cashCollected,
    0
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!rider) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-12 border border-slate-200 max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserX className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Rider Not Found
          </h2>
          <p className="text-slate-600 mb-8 text-lg">
            The rider youre looking for doesnt exist.
          </p>
          <button
            onClick={handleBack}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 font-semibold"
          >
            Back to Riders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white rounded-2xl p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button and Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-1 py-1 text-slate-700"
          >
            <ArrowLeft size={35} className="bg-[#E5F0FE] p-1 rounded-full" />
            <span className="text-xl font-semibold">Rider Details</span>
          </button>
          
          {/* Action Buttons - Right Side */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowEditModal(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#5B63E5] text-white rounded transition-all duration-200 font-semibold text-sm whitespace-nowrap"
            >
              <span>Edit Details</span>
            </button>

            <button
              onClick={handleSuspend}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF7438] text-white rounded transition-all duration-200 font-semibold text-sm whitespace-nowrap"
            >
              <span>
                {rider.status === "Active" ? "Suspend" : "Activate"}
              </span>
            </button>
          </div>
        </div>

        <div className="rounded-2xl">
          <div className="flex flex-wrap gap-4 px-6 py-4 border-slate-200">
            {/* Rider Details Card */}
            <div className="w-full lg:w-full p-4 rounded-xl border-2 border-[#D1DEEF] bg-white">
              <div className="grid gap-2 grid-cols-1">
                <div className="flex items-center justify-between border-b border-slate-100">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Rider Name
                  </span>
                  <span className="text-base font-semibold text-slate-900">
                    {rider.name}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Rider ID
                  </span>
                  <span className="text-base font-semibold text-indigo-600">
                    RD-{rider.id}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Status
                  </span>
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                      rider.status === "Active"
                        ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                        : "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {rider.status}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Joined On
                  </span>
                  <span className="text-base font-semibold text-slate-900">
                    {formatDate(rider.dateJoined)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Phone
                  </span>
                  <span className="text-base font-semibold text-slate-900">
                    {rider.phone}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Username
                  </span>
                  <span className="text-base font-semibold text-slate-900">
                    {rider.username}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Password
                  </span>
                  <span className="text-base font-semibold text-slate-900">
                    {rider.password}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
            <p className="text-sm tracking-wider text-slate-600">
              Total Bottles Delivered
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {totalBottlesDelivered}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
            <p className="text-sm tracking-wider text-slate-600">
              Total Bottles Returned
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {totalBottlesReturned}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
            <p className="text-sm tracking-wider text-slate-600">Total Trips</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {totalTrips}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
            <p className="text-sm tracking-wider text-slate-600">
              Total Cash Collected
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              Rs. {totalCashCollected.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 p-4 md:p-6">
          <h3 className="text-2xl font-semibold">Deliveries Summary</h3>
          <div className="bg-white rounded border border-slate-200 overflow-hidden transition-shadow duration-300">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#D1DEEF]">
                    <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider">
                      Address
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider">
                      Blue
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider">
                      White
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider">
                      Cash Collected
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider">
                      Trip #
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deliveriesData.map((delivery, index) => (
                    <tr key={index} className="border-b border-slate-100">
                      <td className="py-5 px-4 font-semibold">
                        {delivery.customerName}
                      </td>
                      <td className="py-5 px-4 font-medium">
                        {delivery.address}
                      </td>
                      <td className="py-5 px-4 font-medium">{delivery.blue}</td>
                      <td className="py-5 px-4 font-medium">
                        {delivery.white}
                      </td>
                      <td className="py-5 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            delivery.status === "Delivered"
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                              : "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200"
                          }`}
                        >
                          {delivery.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-900 font-bold">
                        Rs. {delivery.cashCollected}
                      </td>
                      <td className="py-5 px-4 font-medium">
                        {delivery.dateTime}
                      </td>
                      <td className="py-5 px-4 font-semibold text-indigo-600">
                        {delivery.tripNumber}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {deliveriesData.map((delivery, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-slate-600">
                        Customer
                      </p>
                      <p className="font-semibold text-slate-900">
                        {delivery.customerName}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        delivery.status === "Delivered"
                          ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                          : "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200"
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-slate-600">
                        Address
                      </p>
                      <p className="font-medium text-slate-900">
                        {delivery.address}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-slate-600">
                          Blue
                        </p>
                        <p className="font-medium text-slate-900">
                          {delivery.blue}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-slate-600">
                          White
                        </p>
                        <p className="font-medium text-slate-900">
                          {delivery.white}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-slate-600">
                          Trip #
                        </p>
                        <p className="font-semibold text-indigo-600">
                          {delivery.tripNumber}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-slate-600">
                          Cash Collected
                        </p>
                        <p className="font-bold text-slate-900">
                          Rs. {delivery.cashCollected}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-slate-600">
                          Date & Time
                        </p>
                        <p className="font-medium text-slate-900">
                          {delivery.dateTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-2xl font-semibold">Payments Collected</h3>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-shadow duration-300">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#D1DEEF]">
                    <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider">
                      Method
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paymentsData.map((payment, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100 hover:bg-indigo-50/30 transition-colors duration-150"
                    >
                      <td className="py-5 px-4 text-slate-900 font-medium">
                        {payment.date}
                      </td>
                      <td className="py-5 px-4 text-slate-900 font-bold">
                        Rs. {payment.amount}
                      </td>
                      <td className="py-5 px-4 text-slate-900 font-medium">
                        {payment.method}
                      </td>
                      <td className="py-5 px-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-bold border border-green-200">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {paymentsData.map((payment, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-slate-600">
                        Date
                      </p>
                      <p className="font-medium text-slate-900">
                        {payment.date}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-bold border border-green-200">
                      {payment.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-slate-600">
                        Amount
                      </p>
                      <p className="font-bold text-slate-900">
                        Rs. {payment.amount}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-slate-600">
                        Method
                      </p>
                      <p className="font-medium text-slate-900">
                        {payment.method}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditRiderModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          rider={rider}
          onSave={handleSave}
        />
      )}
      {showSuspendModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {rider.status === "Active" ? "Suspend Rider" : "Activate Rider"}
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to{" "}
              {rider.status === "Active" ? "suspend" : "activate"} this rider?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowSuspendModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSuspendModal(false);
                  if (rider.status === "Active") {
                    toast.error("Rider suspended successfully", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "colored",
                      style: { backgroundColor: "#dc2626", color: "#fff" },
                    });
                  } else {
                    toast.success("Rider activated successfully", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "colored",
                      style: { backgroundColor: "#16a34a", color: "#fff" },
                    });
                  }
                }}
                className={`px-4 py-2 text-white rounded-lg transition-colors ${
                  rider.status === "Active"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {rider.status === "Active" ? "Suspend" : "Activate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}