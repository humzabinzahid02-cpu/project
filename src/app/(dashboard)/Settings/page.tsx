"use client";
import { useState, useEffect } from "react";
import BottlePrices from "../../../components/BottlePrices";
import AccountSecurity from "../../../components/AccountSecurity";
import Notifications from "../../../components/Notifications";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General Settings");

  // ✅ Load saved tab from localStorage on mount
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) setActiveTab(savedTab);
  }, []);

  // ✅ Save tab in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const tabs = [
    "General Settings",
    "Bottle Prices",
    "Notifications",
    "Account & Security",
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white text-black">
      {/* Sidebar */}
      <div className="w-full lg:w-64 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Settings</h2>
        <ul className="flex lg:flex-col flex-wrap gap-2 sm:gap-3">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer text-xs sm:text-sm px-3 py-2 rounded-md transition ${
                activeTab === tab
                  ? "text-[#5B63E5] bg-blue-50 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-10 mt-2 lg:mt-5">
        {activeTab === "General Settings" && <GeneralSettings />}
        {activeTab === "Bottle Prices" && <BottlePrices />}
        {activeTab === "Notifications" && <Notifications />}
        {activeTab === "Account & Security" && <AccountSecurity />}
      </div>
    </div>
  );
}

function GeneralSettings() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactNumber: "",
    email: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
  setIsEditing(true);
};

  const handleCancel = () => {
    setFormData({
      businessName: "",
      contactNumber: "",
      email: "",
      address: "",
    });
    setIsEditing(false);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // ✅ Validation: All fields required
  const { businessName, contactNumber, email, address } = formData;
  if (!businessName || !contactNumber || !email || !address) {
    setError("⚠️ Please fill all fields before saving.");
    return;
  }

  setError("");
  setIsEditing(false);
  console.log("✅ Saved data:", formData);
};

  return (
    <div className="max-w-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
        General Settings
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="block font-medium text-sm mb-1">Business Name</label>
          <input
            name="businessName"
            type="text"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Enter business name"
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-1">Contact Number</label>
          <input
            name="contactNumber"
            type="text"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="+92 123456789"
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-1">Address</label>
          <input
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* ✅ Show buttons only when user is editing */}
        {isEditing && (
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-[#5B63E5] rounded-md hover:bg-[#4f57eb] w-full sm:w-auto"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}