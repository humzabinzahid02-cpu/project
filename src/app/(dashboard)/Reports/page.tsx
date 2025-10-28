"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { FormControl, Select, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";

interface PaymentRow {
  id: number;
  date: string;
  colony: string;
  deliveryBoy: string;
  bottlesDelivered: number;
  bottlesPicked: number;
  revenue: number;
  pending: number;
}

const initialData: PaymentRow[] = [
  {
    id: 1,
    date: "12 Sep",
    colony: "Al Noor Garden",
    deliveryBoy: "Ali",
    bottlesDelivered: 40,
    bottlesPicked: 35,
    revenue: 3500,
    pending: 500,
  },
  {
    id: 2,
    date: "12 Sep",
    colony: "Ali Garden",
    deliveryBoy: "Ali",
    bottlesDelivered: 40,
    bottlesPicked: 35,
    revenue: 3500,
    pending: 500,
  },
  {
    id: 3,
    date: "12 Sep",
    colony: "Ghalib City",
    deliveryBoy: "Ali",
    bottlesDelivered: 40,
    bottlesPicked: 35,
    revenue: 30,
    pending: 500,
  },
  {
    id: 4,
    date: "12 Sep",
    colony: "Eden Garden",
    deliveryBoy: "Ali",
    bottlesDelivered: 40,
    bottlesPicked: 35,
    revenue: 30,
    pending: 500,
  },
  {
    id: 5,
    date: "13 Sep",
    colony: "Al Noor Garden",
    deliveryBoy: "Hassan",
    bottlesDelivered: 45,
    bottlesPicked: 40,
    revenue: 40,
    pending: 600,
  },
  {
    id: 6,
    date: "13 Sep",
    colony: "Ali Garden",
    deliveryBoy: "Hassan",
    bottlesDelivered: 38,
    bottlesPicked: 33,
    revenue: 30,
    pending: 450,
  },
];

const dailyDeliveriesData = [
  { date: "01 Oct", blue: 25, white: 15, total: 40 },
  { date: "02 Oct", blue: 30, white: 20, total: 50 },
  { date: "03 Oct", blue: 20, white: 30, total: 50 },
  { date: "04 Oct", blue: 35, white: 25, total: 60 },
  { date: "05 Oct", blue: 30, white: 10, total: 40 },
  { date: "06 Oct", blue: 40, white: 20, total: 60 },
  { date: "07 Oct", blue: 35, white: 15, total: 50 },
  { date: "08 Oct", blue: 28, white: 12, total: 40 },
  { date: "09 Oct", blue: 38, white: 22, total: 60 },
  { date: "10 Oct", blue: 20, white: 15, total: 35 },
];

const weeklyDeliveriesData = [
  { label: "Wk 39", blue: 210, white: 140, total: 350 },
  { label: "Wk 40", blue: 245, white: 155, total: 400 },
  { label: "Wk 41", blue: 260, white: 160, total: 420 },
  { label: "Wk 42", blue: 230, white: 150, total: 380 },
];

const monthlyDeliveriesData = [
  { label: "Jul 25", blue: 980, white: 720, total: 1700 },
  { label: "Aug 25", blue: 1050, white: 780, total: 1830 },
  { label: "Sep 25", blue: 1120, white: 820, total: 1940 },
  { label: "Oct 25", blue: 1080, white: 790, total: 1870 },
];

const bottleDistributionData = [
  { name: "Blue Bottles", value: 5000, color: "#3BA7FF" },
  { name: "White Bottles", value: 3500, color: "#D1DEEF" },
  { name: "Empty Bottles", value: 1500, color: "#FF7438" },
];

const revenueTrendData = [
  { month: "01/25", revenue: 3200 },
  { month: "02/25", revenue: 3800 },
  { month: "03/25", revenue: 3500 },
  { month: "04/25", revenue: 4200 },
  { month: "05/25", revenue: 4800 },
  { month: "06/25", revenue: 5200 },
  { month: "07/25", revenue: 4900 },
  { month: "08/25", revenue: 5500 },
  { month: "09/25", revenue: 5800 },
  { month: "10/25", revenue: 5400 },
];

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [riderFilter, setRiderFilter] = useState("");
  const [data, setData] = useState<PaymentRow[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("day");

  const selectedData =
    timeRange === "day"
      ? dailyDeliveriesData
      : timeRange === "week"
      ? weeklyDeliveriesData
      : monthlyDeliveriesData;

  const xAxisKey = timeRange === "day" ? "date" : "label";

  const filteredData = data.filter((row) => {
    const matchesSearch =
      row.colony.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.deliveryBoy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRider = riderFilter
      ? row.deliveryBoy.toLowerCase() === riderFilter.toLowerCase()
      : true;
    return matchesSearch && matchesRider;
  });

  const totalBottles = data.reduce((sum, row) => sum + row.bottlesDelivered, 0);
  const totalOrders = data.length;
  const totalRevenue = data.reduce((sum, row) => sum + row.revenue, 0);
  const activeRiders = new Set(data.map((row) => row.deliveryBoy)).size;

  return (
    <div className="bg-white">
      <div className="min-h-screen p-4 md:p-6">
      {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4">Reports</h1>

          {/* Search + Filters */}
          <div className="flex  flex-col lg:flex-row lg:items-center lg:justify-between gap-4 flex-wrap">
            <div className="relative w-full sm:w-90">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-90 sm:w-full pl-9 pr-4 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
                 <div className="relative w-full md:w-40">
      <FormControl
        size="small"
 sx={{
              width: 165,
              bgcolor: "#F5FAFF",
              borderRadius: "8px",
 boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.04)",            }}      >
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
                        minWidth: "180px",
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
          <MenuItem value="">Date Range</MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="7days">7 Days</MenuItem>
          <MenuItem value="month">Month</MenuItem>
        </Select>
      </FormControl>
    </div>

            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="border-2 text-[#3BA7FF] border-[#D1DEEF]  rounded-xl p-4">
            <div className="text-sm text-[#4A5565] font-medium mb-2">
              Total Deliveries
            </div>
            <div className="text-xl sm:text-3xl  font-bold">
              {totalBottles}{" "}
              <span className="text-lg">bottles</span>
            </div>
          </div>
          <div className="border-2 text-[#00B37A] border-[#D1DEEF]  rounded-xl p-4">
            <div className="text-sm text-[#4A5565] font-medium  mb-2">
              Bottles Picked Up
            </div>
            <div className="text-2xl sm:text-3xl  font-bold ">
              {totalOrders}
            </div>
          </div>
          <div className="border-2  text-[#5B63E5] border-[#D1DEEF]  rounded-xl p-4">
            <div className="text-sm text-[#4A5565] font-medium  mb-2">
              Total Revenue Collected
            </div>
            <div className="text-2xl sm:text-3xl  font-bold">
              Rs {totalRevenue.toLocaleString()}
            </div>
          </div>
          <div className="border-2 border-[#D1DEEF] text-[#4A5565]  rounded-xl p-4">
            <div className="text-sm font-medium mb-2">
              Pending Payments
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#FF7438]">
              {activeRiders}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-4 lg:gap-6 mb-6 lg:mb-8">
          {/* Bar Chart */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden sm:p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
              <h3 className="text-lg font-semibold">
                Total Deliveries
              </h3>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden w-full sm:w-auto">
                {["day", "week", "month"].map((range) => (
                  <button
                    key={range}
                    onClick={() =>
                      setTimeRange(range as "day" | "week" | "month")
                    }
                    className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                      timeRange === range
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey={xAxisKey}
                    tick={{ fontSize: 11 }}
                    stroke="#6b7280"
                  />
                  <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      fontSize: "12px",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="blue" fill="#3B82F6" name="Blue" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="white" fill="#E5E7EB" name="White" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="total" fill="#8B5CF6" name="Total" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden sm:p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Bottle Distribution
            </h3>
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bottleDistributionData}
                    dataKey="value"
                    cx="50%"
                    cy="45%"
                    outerRadius="65%"
                  >
                    {bottleDistributionData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      fontSize: "12px",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={40}
                    iconType="circle"
                    wrapperStyle={{ fontSize: "11px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white border border-slate-200 rounded-xl sm:p-4 mb-6 lg:mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue Trend
          </h3>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A5B4FC" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#A5B4FC" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  stroke="#6b7280"
                />
                <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    fontSize: "12px",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366F1"
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="sm:p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Detailed Reports
            </h3>

            {/* Desktop Table */}
            <div className="overflow-x-auto hidden sm:block">
              <table className="w-full text-sm">
                <thead className="bg-[#E5F0FE]">
                  <tr>
                    {[
                      "Date",
                      "Colony",
                      "Rider",
                      "Delivered",
                      "Picked",
                      "Revenue",
                      "Pending",
                      "Actions",
                    ].map((col) => (
                      <th
                        key={col}
                        className="py-3 px-4 text-left text-xs font-semibold text-black uppercase"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm text-slate-800">
                        {row.date}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-800">
                        {row.colony}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-800">
                        {row.deliveryBoy}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-800">
                        {row.bottlesDelivered}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-800">
                        {row.bottlesPicked}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-800">
                        Rs {row.revenue.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-800">
                        Rs {row.pending.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-xs font-medium hover:bg-indigo-700">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden">
              <ul className="divide-y divide-slate-100">
                {filteredData.map((row) => (
                  <li key={row.id} className="py-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-800">
                          {row.colony}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {row.date} • {row.deliveryBoy}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="text-xs text-slate-500">Delivered</div>
                      <div className="text-xs text-slate-800 font-medium">
                        {row.bottlesDelivered}
                      </div>

                      <div className="text-xs text-slate-500">Picked</div>
                      <div className="text-xs text-slate-800 font-medium">
                        {row.bottlesPicked}
                      </div>

                      <div className="text-xs text-slate-500">Revenue</div>
                      <div className="text-xs text-slate-800 font-medium">
                        Rs {row.revenue.toLocaleString()}
                      </div>

                      <div className="text-xs text-slate-500">Pending</div>
                      <div className="text-xs text-slate-800 font-medium">
                        Rs {row.pending.toLocaleString()}
                      </div>
                    </div>
                    <button className="w-full px-3 py-2 bg-indigo-600 text-white rounded-md text-xs font-medium hover:bg-indigo-700">
                      View Details
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t">
              <span className="text-xs sm:text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}