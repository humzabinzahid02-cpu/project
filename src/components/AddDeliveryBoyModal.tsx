"use client";

import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

interface AddDeliveryBoyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (boy: {
    name: string;
    phone: string;
    username: string;
    password: string;
  }) => void;
}

export default function AddDeliveryBoyModal({
  isOpen,
  onClose,
  onAdd,
}: AddDeliveryBoyModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = { name: "", phone: "", username: "", password: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^03[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number (e.g. 03001234567)";
      isValid = false;
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onAdd(formData);
    setFormData({ name: "", phone: "", username: "", password: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-lg w-[500px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-6">Add Delivery Boy</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter delivery boy name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Phone no
              </label>
              <input
                name="phone"
                placeholder="03xxxxxxxxx"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <p className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
            For login Delivery APP
          </p>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Username
              </label>
              <input
                name="username"
                type="text"
                placeholder="RoyalRider01"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Set Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[32px] text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm"
          >
            Add Delivery Boy
          </button>
        </form>
      </div>
    </div>
  );
}
