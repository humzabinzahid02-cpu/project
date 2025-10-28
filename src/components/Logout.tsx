"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <>
      {/* 🔴 Logout Button */}
     
      <button
      onClick={() => setIsModalOpen(true)}
       className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>

     {/* ⚪ Confirmation Modal */}
{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 transition-all duration-300">
    <div className="bg-white backdrop-blur-md rounded-2xl shadow-2xl p-6 w-80 border border-gray-200 transform scale-100 animate-fadeIn">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
        Confirm Logout
      </h2>
      <p className="text-sm text-gray-700 mb-6 text-center">
        Are you sure you want to log out of your account?
      </p>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-150"
        >
          Cancel
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 hover:scale-105 transition-transform duration-150 shadow-md"
        >
          Yes, Logout
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}
