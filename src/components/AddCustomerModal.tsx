"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void> | void;
  initialData?: Partial<FormData>; // ✅ for edit mode
  title?: string; // ✅ dynamic modal title
}

interface FormData {
  name: string;
  phone: string;
  houseNumber: string;
  streetNumber: string;
  colony: string;
  block?: string;
  dispenserGallon: number;
  normalGallon: number;
  customerName: string;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      phone: "",
      houseNumber: "",
      streetNumber: "",
      colony: "",
      block: "",
      dispenserGallon: 0,
      normalGallon: 0,
      customerName: "",
    },
  });

  // ✅ Automatically fill all fields when editing
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        phone: initialData.phone || "",
        houseNumber: initialData.houseNumber || "",
        streetNumber: initialData.streetNumber || "",
        colony: initialData.colony || "",
        block: initialData.block || "",
        dispenserGallon: initialData.dispenserGallon || 0,
        normalGallon: initialData.normalGallon || 0,
        customerName: initialData.customerName || "",
      });
    }
  }, [initialData, reset]);

  const submitHandler = async (data: FormData) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-black mb-6">
          {title || "Add Customer"}
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Name + Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter customer name"
                className="w-full text-xs p-2 text-black border border-gray-300 focus:outline-none rounded-md"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^0\d{10}$/,
                    message: "Format: 03XXXXXXXXX",
                  },
                })}
                placeholder="03XXXXXXXXX"
                className="w-full text-black p-2 border text-xs border-gray-300 rounded-md focus:outline-none"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Address</h3>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <input
                  type="text"
                  {...register("houseNumber", {
                    required: "House number is required",
                  })}
                  placeholder="House number"
                  className="w-full p-2 border border-gray-300 text-black rounded-md text-xs focus:outline-none"
                />
                {errors.houseNumber && (
                  <p className="text-red-500 text-xs">
                    {errors.houseNumber.message}
                  </p>
                )}
              </div>
              <div>
                <select
                  {...register("colony", { required: "Colony is required" })}
                  className="w-full p-2 border border-gray-300 rounded-md text-xs focus:outline-none"
                >
                  <option value="">Select Colony</option>
                  <option value="Colony A">Colony A</option>
                  <option value="Colony B">Colony B</option>
                </select>
                {errors.colony && (
                  <p className="text-red-500 text-xs">
                    {errors.colony.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                {...register("streetNumber")}
                placeholder="Street number"
                className="w-full p-2 border border-gray-300 text-black rounded-md text-xs focus:outline-none"
              />
              <input
                type="text"
                {...register("block")}
                placeholder="Block"
                className="w-full p-2 border border-gray-300 text-black rounded-md text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Bottle Balance */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Initial Bottle Balance (optional)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Dispenser Gallon
                </label>
                <input
                  type="number"
                  {...register("dispenserGallon", { min: 0 })}
                  placeholder="Enter Dispenser Gallon"
                  className="w-full p-2 border border-gray-300 text-black rounded-md text-xs focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Normal Gallon (White)
                </label>
                <input
                  type="number"
                  {...register("normalGallon", { min: 0 })}
                  placeholder="Enter Normal Gallon (White)"
                  className="w-full p-2 border border-gray-300 text-black rounded-md text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#5B63E5] text-white py-2 rounded-md hover:bg-[#4a52ed] focus:outline-none font-medium mt-4"
          >
            {title?.includes("Edit") ? "Save Changes" : "Add Customer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;