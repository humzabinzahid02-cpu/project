// app/colonies/[id]/page.tsx
"use client";
import { ArrowLeft, Users, Package, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Colony {
  id: number;
  name: string;
  area: string;
  totalCustomers: number;
  activeCustomers: number;
  dateCreated: string;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  status: "Active" | "Inactive";
  bottlesAtHome: string;
  paymentPending: number;
}

interface Order {
  date: string;
  orderId: string;
  customerName: string;
  blue: number;
  white: number;
  status: "Delivered" | "Pending" | "Cancelled";
  total: number;
}

const mockColonies: Record<string, Colony> = {
  "1": {
    id: 1,
    name: "Al Noor Garden",
    area: "Block A, Street 1-5",
    totalCustomers: 45,
    activeCustomers: 38,
    dateCreated: "2024-01-15",
  },
  "2": {
    id: 2,
    name: "Gulshan",
    area: "Block A-C, Street 1-10",
    totalCustomers: 62,
    activeCustomers: 55,
    dateCreated: "2024-02-20",
  },
  "3": {
    id: 3,
    name: "Model Town",
    area: "Block D-F, Street 1-8",
    totalCustomers: 38,
    activeCustomers: 30,
    dateCreated: "2024-03-10",
  },
};

const mockCustomersData: Customer[] = [
  {
    id: 1,
    name: "Suhaiban Ol",
    phone: "+92 3174503903",
    address: "House 47, Street 4, Block C",
    status: "Active",
    bottlesAtHome: "2 Blue / 1 White",
    paymentPending: 2850,
  },
  {
    id: 2,
    name: "Ali Khan",
    phone: "0300-1234567",
    address: "H12, St 5, Block A",
    status: "Active",
    bottlesAtHome: "2 Blue / 1 White",
    paymentPending: 500,
  },
  {
    id: 3,
    name: "Sara Ahmed",
    phone: "0312-9876543",
    address: "22, 10th Ave",
    status: "Inactive",
    bottlesAtHome: "0 Blue / 3 White",
    paymentPending: 1200,
  },
  {
    id: 4,
    name: "Hassan Raza",
    phone: "0321-5551234",
    address: "15, Street 2, Block B",
    status: "Active",
    bottlesAtHome: "1 Blue / 2 White",
    paymentPending: 750,
  },
];

const mockOrdersData: Order[] = [
  {
    date: "30 Sep",
    orderId: "RD-254",
    customerName: "Suhaiban Ol",
    blue: 2,
    white: 1,
    status: "Delivered",
    total: 290,
  },
  {
    date: "28 Sep",
    orderId: "RD-253",
    customerName: "Ali Khan",
    blue: 1,
    white: 2,
    status: "Delivered",
    total: 280,
  },
  {
    date: "25 Sep",
    orderId: "RD-252",
    customerName: "Sara Ahmed",
    blue: 2,
    white: 0,
    status: "Pending",
    total: 200,
  },
  {
    date: "20 Sep",
    orderId: "RD-251",
    customerName: "Hassan Raza",
    blue: 1,
    white: 1,
    status: "Delivered",
    total: 230,
  },
];

function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
      <div className="">
        <div className="mb-6">
          <div className="h-9 w-48 bg-slate-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 mb-6 p-6">
          <div className="h-6 w-48 bg-slate-200 rounded animate-pulse mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-slate-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ColonyDetails() {
  const params = useParams();
  const router = useRouter();
  const [colony, setColony] = useState<Colony | null>(null);
  const [loading, setLoading] = useState(true);

  const colonyId = params.id as string;

  useEffect(() => {
    const fetchColony = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const colonyData = mockColonies[colonyId] || null;
      setColony(colonyData);
      setLoading(false);
    };

    if (colonyId) {
      fetchColony();
    }
  }, [colonyId]);

  const handleBack = () => {
    router.push("/colonies");
  };

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

  if (!colony) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-6 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-6 md:p-12 border border-slate-200 max-w-md w-full">
          <div className="w-16 md:w-20 h-16 md:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 md:w-10 h-8 md:h-10 text-red-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Colony Not Found
          </h2>
          <p className="text-slate-600 mb-8 text-sm md:text-lg">
            The colony you are looking for does not exist.
          </p>
          <button
            onClick={handleBack}
            className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 font-semibold text-sm md:text-base"
          >
            Back to Colonies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 px-1 py-1 text-slate-700 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={32} className="bg-[#E5F0FE] p-1 rounded-full" />
          <span className="text-xl sm:text-2xl font-semibold">Colony Details</span>
        </button>
      </div>

      {/* Colony Details Card */}
      <div className="mb-8">
        <div className="w-full border-2 rounded-2xl p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-slate-100">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-600">
                  Colony Name
                </span>
                <span className="text-base font-semibold text-slate-900">
                  {colony.name}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-slate-100">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-600">
                  Colony ID
                </span>
                <span className="text-base font-semibold text-indigo-600">
                  COL-{colony.id}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-slate-100">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-600">
                  Area
                </span>
                <span className="text-base font-semibold text-slate-900">
                  {colony.area}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-slate-100">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-600">
                  Date Created
                </span>
                <span className="text-base font-semibold text-slate-900">
                  {formatDate(colony.dateCreated)}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-slate-100">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-600">
                  Total Customers
                </span>
                <span className="text-base font-semibold text-slate-900">
                  {colony.totalCustomers}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-600">
                  Active Customers
                </span>
                <span className="text-base font-semibold text-green-600">
                  {colony.activeCustomers}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">
          Customers
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* Mobile View */}
          <div className="md:hidden">
            {mockCustomersData.map((customer) => (
              <div key={customer.id} className="border-b border-slate-100 p-4 last:border-b-0">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-semibold text-slate-900">{customer.name}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      customer.status === "Active"
                        ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                        : "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {customer.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Phone:</span>
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Address:</span>
                    <span className="text-right">{customer.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Bottles:</span>
                    <span>{customer.bottlesAtHome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Payment Pending:</span>
                    <span className="font-bold text-slate-900">Rs. {customer.paymentPending.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#D1DEEF]">
                  <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-700">
                    Customer Name
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-700">
                    Phone
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-700">
                    Address
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-700">
                    Bottles at Home
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-700">
                    Payment Pending
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockCustomersData.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="py-4 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      {customer.name}
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700 whitespace-nowrap">
                      {customer.phone}
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700">
                      {customer.address}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          customer.status === "Active"
                            ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                            : "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700 whitespace-nowrap">
                      {customer.bottlesAtHome}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">
                      Rs. {customer.paymentPending.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">
          Orders
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* Mobile View */}
          <div className="md:hidden">
            {mockOrdersData.map((order, index) => (
              <div key={index} className="border-b border-slate-100 p-4 last:border-b-0">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="font-semibold text-slate-900">{order.orderId}</span>
                    <div className="text-xs text-slate-500 mt-1">{order.date}</div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      order.status === "Delivered"
                        ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                        : order.status === "Pending"
                        ? "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200"
                        : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Customer:</span>
                    <span>{order.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Blue:</span>
                    <span>{order.blue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">White:</span>
                    <span>{order.white}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-slate-900">Rs. {order.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#D1DEEF]">
                  <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-700">
                    Date
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-700">
                    Order ID
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-700">
                    Customer Name
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-700">
                    Blue
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-700">
                    White
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-700">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockOrdersData.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="py-4 px-4 font-medium text-slate-700 whitespace-nowrap">
                      {order.date}
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      {order.orderId}
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700 whitespace-nowrap">
                      {order.customerName}
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700">
                      {order.blue}
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700">
                      {order.white}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === "Delivered"
                            ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                            : order.status === "Pending"
                            ? "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200"
                            : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">
                      Rs. {order.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}