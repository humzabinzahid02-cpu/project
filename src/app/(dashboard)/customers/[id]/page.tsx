// app/customers/[id]/page.tsx
"use client";
import {
  ArrowLeft,
  Phone,
  UserX,
  Trash2,
  Package,
  CreditCard,
  ShoppingCart,
  Clock,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddCustomerModal from "../../../../components/AddCustomerModal";
import ConfirmationModal from "../../../../components/ConfirmationModal";

// Define the Customer type
interface Customer {
  id: number;
  name: string;
  phone: string;
  dateJoined: string;
  status: "Active" | "Inactive";
  address: string;
  colony: string;
  bottlesAtHome: string;
  paymentPending: number;
}

// Mock data for all customers
const mockCustomers: Record<string, Customer> = {
  "1": {
    id: 1,
    name: "Suhaiban Ol",
    phone: "+92 3174503903",
    dateJoined: "2025-08-05",
    status: "Active",
    address: "House 47, Street 4, Block C",
    colony: "Al Noor Garden",
    bottlesAtHome: "2 Blue / 1 White",
    paymentPending: 2850,
  },
  "2": {
    id: 2,
    name: "Ali Khan",
    phone: "0300-1234567",
    dateJoined: "2024-08-01",
    status: "Active",
    address: "H12, St 5, Gulshan, Block A",
    colony: "Gulshan",
    bottlesAtHome: "2 Blue / 1 White",
    paymentPending: 500,
  },
  "3": {
    id: 3,
    name: "Sara Ahmed",
    phone: "0312-9876543",
    dateJoined: "2024-07-15",
    status: "Inactive",
    address: "22, 10th Ave, Model Town",
    colony: "Model Town",
    bottlesAtHome: "0 Blue / 3 White",
    paymentPending: 1200,
  },
};

// Skeleton Loader Component
function SkeletonLoader() {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button Skeleton */}
        <div className="mb-3 sm:mb-4 md:mb-6">
          <div className="h-8 sm:h-9 w-32 sm:w-40 md:w-48 bg-white rounded-lg animate-pulse"></div>
        </div>

        {/* Customer Details Card Skeleton */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 mb-3 sm:mb-4 md:mb-6 overflow-hidden">
          <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-blue-50">
            <div className="h-5 sm:h-6 w-40 sm:w-48 bg-slate-200 rounded animate-pulse"></div>
          </div>
          <div className="p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-3 sm:h-4 w-20 sm:w-24 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-3 sm:h-4 w-24 sm:w-32 bg-slate-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Cards Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-3 sm:p-4 md:p-6"
            >
              <div className="h-3 sm:h-4 w-24 sm:w-32 bg-slate-200 rounded animate-pulse mb-2 sm:mb-3"></div>
              <div className="h-6 sm:h-8 w-16 sm:w-24 bg-slate-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Tables Skeleton */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl sm:rounded-2xl border border-slate-200"
            >
              <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-slate-200">
                <div className="h-4 sm:h-5 w-24 sm:w-32 bg-slate-200 rounded animate-pulse"></div>
              </div>
              <div className="p-3 sm:p-4 md:p-6">
                {[...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className="h-8 sm:h-10 bg-slate-100 rounded mb-2 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CustomerDetails() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const customerId = params.id as string;

  useEffect(() => {
    // Simulate API call
    const fetchCustomer = async () => {
      setLoading(true);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const customerData = mockCustomers[customerId] || null;
      setCustomer(customerData);
      setLoading(false);
    };

    if (customerId) {
      fetchCustomer();
    }
  }, [customerId]);

  const handleBack = () => {
    router.push("/customers");
  };

  const handleContact = () => {
    if (customer) {
      window.open(`tel:${customer.phone}`, "_self");
    }
  };

  const handleSuspend = () => {
    if (!customer) return;
    
    // Update customer status
    const newStatus = customer.status === "Active" ? "Inactive" : "Active";
    setCustomer({ ...customer, status: newStatus });
    
    // Here you would typically make an API call to update the status
    console.log(`Customer ${newStatus === "Active" ? "activated" : "suspended"} successfully`);
  };

  const handleEditCustomer = (updatedCustomer: Customer) => {
    if (!customer) return;
    
    // Update customer with new data
    setCustomer(updatedCustomer);
    
    // Here you would typically make an API call to update the customer
    console.log("Customer updated successfully", updatedCustomer);
  };

  // Parse bottles from "2 Blue / 1 White" format
  const parseBottles = (bottlesString: string) => {
    if (!bottlesString) return { blue: 0, white: 0 };
    const match = bottlesString.match(/(\d+)\s*Blue\s*\/\s*(\d+)\s*White/i);
    if (match) {
      return {
        blue: Number.parseInt(match[1]),
        white: Number.parseInt(match[2]),
      };
    }
    return { blue: 0, white: 0 };
  };

  // Sample orders data
  const ordersData = [
    {
      date: "30 Sep",
      orderId: "RD-254",
      blue: 2,
      white: 1,
      status: "Delivered",
      total: 290,
    },
    {
      date: "28 Sep",
      orderId: "RD-253",
      blue: 1,
      white: 2,
      status: "Delivered",
      total: 280,
    },
    {
      date: "25 Sep",
      orderId: "RD-252",
      blue: 2,
      white: 0,
      status: "Pending",
      total: 200,
    },
    {
      date: "20 Sep",
      orderId: "RD-251",
      blue: 1,
      white: 1,
      status: "Delivered",
      total: 230,
    },
  ];

  // Sample payments data
  const paymentsData = [
    { date: "30 Sep", amount: 850, method: "Cash", status: "Confirmed" },
    { date: "25 Sep", amount: 650, method: "JazzCash", status: "Confirmed" },
    { date: "20 Sep", amount: 900, method: "Cash", status: "Confirmed" },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3 sm:p-4 md:p-8 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border border-slate-200 max-w-md mx-3 sm:mx-4 w-full">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6">
            <UserX className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-600" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2 md:mb-3">
            Customer Not Found
          </h2>
          <p className="text-slate-600 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg">
            The customer you are looking for does not exist.
          </p>
          <button
            onClick={handleBack}
            className="w-full sm:w-auto px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 font-semibold text-sm md:text-base"
          >
            Back to Customers
          </button>
        </div>
      </div>
    );
  }

  const bottles = parseBottles(customer.bottlesAtHome);
  const totalBottles = bottles.blue + bottles.white;

  return (
    <div className="min-h-screen bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button and Action Buttons */}
        <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-6">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-1 py-1 text-slate-700"
          >
            <ArrowLeft size={24} className="sm:w-7 sm:h-7 md:w-9 md:h-9 bg-[#E5F0FE] p-1 rounded-full" />
            <span className="text-base sm:text-lg md:text-xl font-semibold">Customer Details</span>
          </button>
          
          {/* Action Buttons - Right Side */}
          <div className="flex gap-2">
            <button
              onClick={() => setSuspendModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF7438] text-white rounded transition-all duration-200 font-semibold text-sm md:text-base whitespace-nowrap"
            >
              <span>
                {customer.status === "Active" ? "Suspend" : "Activate"}
              </span>
            </button>
            
            <button
              onClick={() => setEditModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#5B63E5] text-white rounded transition-all duration-200 font-semibold text-sm md:text-base whitespace-nowrap"
            >
              <span>Edit Details</span>
            </button>
          </div>
        </div>

        {/* Customer Details Card */}
        <div className="rounded-2xl mb-4 md:mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Customer Info Section */}
            <div className="p-4 md:p-4 w-full rounded-xl border-2 border-[#D1DEEF]">
              <div className="grid gap-2 grid-cols-1">
                <div className="flex items-center justify-between border-b border-slate-100">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Customer Name
                  </span>
                  <span className="text-sm md:text-base font-semibold text-slate-900 text-right">
                    {customer.name}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Customer ID
                  </span>
                  <span className="text-sm md:text-base font-semibold text-indigo-600">
                    RD-{customer.id}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Status
                  </span>
                  <span
                    className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-bold ${
                      customer.status === "Active"
                        ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                        : "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {customer.status}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Joined On
                  </span>
                  <span className="text-sm md:text-base font-semibold text-slate-900 text-right">
                    {formatDate(customer.dateJoined)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Phone
                  </span>
                  <span className="text-sm md:text-base font-semibold text-slate-900">
                    {customer.phone}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Address
                  </span>
                  <span className="text-sm md:text-base font-semibold text-slate-900 text-right">
                    {customer.address}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Colony
                  </span>
                  <span className="text-sm md:text-base font-semibold text-slate-900">
                    {customer.colony}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Bottles at Home
                  </span>
                  <span className="text-sm md:text-base font-semibold text-slate-900">
                    {customer.bottlesAtHome}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-slate-200">
            <p className="tracking-wider text-slate-600 text-xs md:text-sm">
              Pending Payment
            </p>
            <p className="mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
              Rs. {customer.paymentPending.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-slate-200 p-3 sm:p-4 md:p-6">
            <p className="tracking-wide text-slate-600 text-xs md:text-sm">
              Bottles Pending Return
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mt-1 sm:mt-2">
              {totalBottles} bottles
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-slate-200 p-3 sm:p-4 md:p-6">
            <p className="tracking-wider text-slate-600 text-xs md:text-sm">
              Total Orders
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mt-1 sm:mt-2">
              {ordersData.length}
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-slate-200 p-3 sm:p-4 md:p-6">
            <p className="text-slate-600 text-xs md:text-sm">
              Last Delivery
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mt-1 sm:mt-2">
              {ordersData.length > 0 ? ordersData[0].date : "N/A"}
            </p>
          </div>
        </div>

        {/* Tables Section */}
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
          {/* Orders Summary Table */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Orders Summary
          </h3>
          <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 overflow-hidden transition-shadow duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="bg-[#D1DEEF]">
                    <th className="text-left py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-xs font-bold uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-xs font-bold uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="text-left py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-xs font-bold uppercase tracking-wider">
                      Blue
                    </th>
                    <th className="text-left py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-xs font-bold uppercase tracking-wider">
                      White
                    </th>
                    <th className="text-left py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-xs font-bold uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-xs font-bold uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ordersData.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100"
                    >
                      <td className="py-3 sm:py-4 md:py-5 px-2 sm:px-3 md:px-4 font-medium whitespace-nowrap">
                        {order.date}
                      </td>
                      <td className="py-3 sm:py-4 md:py-5 px-2 sm:px-3 md:px-4 font-semibold whitespace-nowrap">
                        {order.orderId}
                      </td>
                      <td className="py-3 sm:py-4 md:py-5 px-2 sm:px-3 md:px-4 font-medium">
                        {order.blue}
                      </td>
                      <td className="py-3 sm:py-4 md:py-5 px-2 sm:px-3 md:px-4 font-medium">
                        {order.white}
                      </td>
                      <td className="py-3 sm:py-4 md:py-5 px-2 sm:px-3 md:px-4">
                        <span
                          className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                            order.status === "Delivered"
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                              : "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 sm:py-4 md:py-5 px-2 sm:px-3 md:px-4 text-slate-900 font-bold whitespace-nowrap">
                        Rs. {order.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payments Summary Table */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mt-2 sm:mt-3">
            Payments Summary
          </h3>
          <div className="bg-white rounded-lg sm:rounded-2xl border border-slate-200 overflow-hidden transition-shadow duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="bg-[#D1DEEF]">
                    <th className="text-left py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-xs font-bold uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-xs font-bold uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="text-left py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-xs font-bold uppercase tracking-wider">
                      Method
                    </th>
                    <th className="text-left py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-xs font-bold uppercase tracking-wider">
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
                      <td className="py-3 sm:py-4 md:py-5 px-2 sm:px-3 md:px-4 text-slate-900 font-medium whitespace-nowrap">
                        {payment.date}
                      </td>
                      <td className="py-3 sm:py-4 md:py-5 px-2 sm:px-3 md:px-4 text-slate-900 font-bold whitespace-nowrap">
                        Rs. {payment.amount}
                      </td>
                      <td className="py-3 sm:py-4 md:py-5 px-2 sm:px-3 md:px-4 text-slate-900 font-medium">
                        {payment.method}
                      </td>
                      <td className="py-3 sm:py-4 md:py-5 px-2 sm:px-3 md:px-4">
                        <span className="px-2 md:px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-bold border border-green-200 whitespace-nowrap">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={suspendModalOpen}
        onClose={() => setSuspendModalOpen(false)}
        onConfirm={handleSuspend}
        title={customer.status === "Active" ? "Suspend Customer?" : "Activate Customer?"}
        message={
          customer.status === "Active"
            ? "This will suspend the customer's account and prevent new orders. You can reactivate them later."
            : "This will reactivate the customer's account and allow them to place orders again."
        }
        confirmText={customer.status === "Active" ? "Suspend" : "Activate"}
        variant="warning"
      />

      {editModalOpen && customer && (
        <AddCustomerModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title="Edit Customer"
          initialData={{
            name: customer.name,
            phone: customer.phone,
            houseNumber: customer.address.split(",")[0] || "",
            streetNumber: customer.address.split(",")[1]?.trim() || "",
            colony: customer.colony,
            block: customer.address.split(",")[2]?.trim() || "",
            dispenserGallon: parseBottles(customer.bottlesAtHome).blue,
            normalGallon: parseBottles(customer.bottlesAtHome).white,
            customerName: customer.name,
          }}
          onSubmit={(data) => {
            // Map FormData to your Customer type
            const updatedCustomer: Customer = {
              ...customer,
              name: data.name,
              phone: data.phone,
              address: `${data.houseNumber}, ${data.streetNumber}${data.block ? ", " + data.block : ""}`,
              colony: data.colony,
              bottlesAtHome: `${data.dispenserGallon} Blue / ${data.normalGallon} White`,
            };
            setCustomer(updatedCustomer);
            console.log("Customer updated successfully", updatedCustomer);
            setEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}