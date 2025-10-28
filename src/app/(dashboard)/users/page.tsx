"use client";

import { useEffect, useState } from "react";
import AddCustomerModal from "../../../components/AddCustomerModal";
// import AddCustomerModal, { Form } from "../../../components/AddCustomerModal";

type User = {
  id: number;
  customerName: string;
  houseNumber: string;
  streetNumber: string;
  colony: string;
  created_at: string;
  remark?: string;
  password?: string;
  phone?: string;
  isVerified?: number;
};
type FormData = {
  customerName: string;
  houseNumber: string;
  streetNumber: string;
  colony: string;
  phone: string;
};


export default function CustomersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (data: FormData) => {
    console.log("Submitted:", data);
    // Handle form submission (e.g., API call)
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAction = async (id: number, action: "approve" | "reject") => {
    try {
      setLoadingId(id);
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log(data.message);
        setUsers((prev) => {
          if (action === "approve") {
            return prev.map((u) => (u.id === id ? { ...u, isVerified: 1 } : u));
          } else if (action === "reject") {
            return prev.filter((u) => u.id !== id);
          }
          return prev;
        });
      }
    } catch (error) {
      console.error("Action error:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <div className="p-6 flex-1 w-full bg-white rounded-lg shadow-md ">
        {/* Header Section */}
        <h1 className="text-xl sm:text-2xl font-semibold text-black mb-4 sm">
          Customers
        </h1>

        {/* Search + Tabs + Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search by customer name / phone"
                className="border border-blue-300 rounded-lg px-4 py-2 pl-10 text-black w-full text-sm"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg width="18" height="18" fill="none" stroke="currentColor">
                  <circle cx="8" cy="8" r="7" strokeWidth="2" />
                  <path
                    d="M17 17L13 13"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>

            {/* Tabs */}
          </div>

          {/* Sort + Add */}
          <div className="flex items-center gap-2 flex-wrap">
            <label className="text-gray-600 text-xs sm:text-sm mr-2">
              Sort by
            </label>
            <select className="border rounded-lg border-blue-100 px-3 py-2 bg-blue-50 text-gray-700 text-xs sm:text-sm">
              <option>All Customers</option>
              <option>Active</option>
              <option>Pending</option>
            </select>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Customer
            </button>
            <AddCustomerModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleSubmit}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0 bg-blue-100 p-2  mb-5 rounded-lg w-fit ">
          <button className="px-4 py-1 rounded-lg bg-blue-600 text-white font-medium text-xs sm:text-sm">
            Active
          </button>
          <button className="px-4 py-1 rounded-lg bg-transparent text-gray-700 font-medium text-xs sm:text-sm relative">
            Pending
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
              8
            </span>
          </button>
        </div>

        {/* Table (Desktop) */}
        <div className="hidden sm:block overflow-x-auto">
          <div className="min-w-[700px] grid grid-cols-8 items-center bg-blue-100 border border-gray-200 shadow-sm px-4 py-3 rounded-t-lg font-semibold text-gray-700 text-sm">
            <div>Customer ID</div>
            <div>Customer</div>
            <div>Address</div>
            <div>Date Joined</div>
            <div>Bottles at Home</div>
            <div>Payment Pending</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          <div className="flex flex-col">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  className="min-w-[700px] grid grid-cols-8 items-center bg-white border-b border-gray-200 px-4 py-3 text-sm"
                >
                  <div className="font-semibold text-gray-700">#{user.id}</div>
                  <div className="text-black">{user.customerName}</div>
                  <div className="text-black">
                    {user.colony}, House {user.houseNumber}, Street{" "}
                    {user.streetNumber}
                  </div>
                  <div className="text-black">
                    {new Date(user.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-gray-700">--</div>
                  <div className="text-gray-700">--</div>
                  <div>
                    {user.isVerified === 1 ? (
                      <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        Approved
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                        Pending
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      className="px-3 py-1 bg-yellow-600 text-white rounded-md disabled:opacity-50 text-sm"
                      onClick={() => handleAction(user.id, "approve")}
                      disabled={loadingId === user.id}
                    >
                      {loadingId === user.id ? "..." : "Approve"}
                    </button>
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded-md disabled:opacity-50 text-sm"
                      onClick={() => handleAction(user.id, "reject")}
                      disabled={loadingId === user.id}
                    >
                      {loadingId === user.id ? "..." : "Reject"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No customers found
              </div>
            )}
          </div>
        </div>

        {/* Cards (Mobile) */}
        <div className="sm:hidden flex flex-col gap-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold text-gray-800">
                    #{user.id} - {user.customerName}
                  </h3>
                  {user.isVerified === 1 ? (
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      Approved
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                      Pending
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600">
                  {user.colony}, House {user.houseNumber}, Street{" "}
                  {user.streetNumber}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Joined: {new Date(user.created_at).toLocaleDateString()}
                </p>
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    className="px-2 py-1 bg-yellow-600 text-white rounded-md text-xs disabled:opacity-50"
                    onClick={() => handleAction(user.id, "approve")}
                    disabled={loadingId === user.id}
                  >
                    {loadingId === user.id ? "..." : "Approve"}
                  </button>
                  <button
                    className="px-2 py-1 bg-blue-600 text-white rounded-md text-xs disabled:opacity-50"
                    onClick={() => handleAction(user.id, "reject")}
                    disabled={loadingId === user.id}
                  >
                    {loadingId === user.id ? "..." : "Reject"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              No customers found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
