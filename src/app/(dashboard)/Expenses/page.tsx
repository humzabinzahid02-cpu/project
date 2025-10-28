"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddExpenseModal from "../../../components/AddExpenseModal";
import { ChevronDown, Plus, Search } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

interface Expense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  paymentType: string;
  status: "Approved" | "Pending";
}

const ExpensesManagement: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      date: "12 Sep",
      category: "Electricity",
      description: "WAPDA Bill – Oct",
      amount: 120000,
      paymentType: "Bank Transfer",
      status: "Pending",
    },
    {
      id: 2,
      date: "12 Sep",
      category: "Fuel",
      description: "Petrol for Delivery Van",
      amount: 2200,
      paymentType: "Cash",
      status: "Approved",
    },
    {
      id: 3,
      date: "12 Sep",
      category: "Electricity",
      description: "WAPDA Bill – Sept",
      amount: 120000,
      paymentType: "Bank Transfer",
      status: "Pending",
    },
    {
      id: 4,
      date: "12 Sep",
      category: "Salary",
      description: "Delivery Boy – Ali",
      amount: 25000,
      paymentType: "Cash",
      status: "Approved",
    },
    {
      id: 5,
      date: "12 Sep",
      category: "Other",
      description: "Rickshaw Maintenance",
      amount: 120000,
      paymentType: "Cash",
      status: "Pending",
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const itemsPerPage = 4;

  const handleAddExpense = (newExpense: Expense) => {
    if (editingExpense) {
      setExpenses((prev) =>
        prev.map((e) => (e.id === editingExpense.id ? newExpense : e))
      );
      setEditingExpense(null);
    } else {
      setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setOpenModal(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setExpenses((prev) => prev.filter((e) => e.id !== deleteId));
      setDeleteId(null);
      setOpenDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setOpenDeleteModal(false);
  };

  const filteredExpenses = expenses.filter(
    (e) =>
      e.description.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter === "" || e.category === categoryFilter) &&
      (dateFilter === "" || e.date === dateFilter)
  );

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const currentExpenses = filteredExpenses.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const electricityBill = expenses
    .filter((e) => e.category === "Electricity")
    .reduce((sum, e) => sum + e.amount, 0);
  const fuelExpense = expenses
    .filter((e) => e.category === "Fuel")
    .reduce((sum, e) => sum + e.amount, 0);
  const salaries = expenses
    .filter((e) => e.category === "Salary")
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="bg-white min-h-screen p-4 md:p-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 lg:mb-8">
        Expenses Management
      </h1>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-between items-start sm:items-center mb-6 lg:mb-8">
        <div className="relative w-full sm:w-auto">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name or description"
            className="w-full sm:w-80 pl-9 pr-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full sm:w-auto">
          <div className="flex gap-2 w-full sm:w-auto">
            {/* Date Filter */}
            <div className="relative w-full sm:w-40">
              <button
                onClick={() => setIsDateOpen(!isDateOpen)}
                className="w-full px-3.5 py-2 border border-blue-200 rounded-lg text-sm font-medium text-gray-700 flex items-center justify-between hover:border-blue-300 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.2)] transition"
              >
                <span>{dateFilter || "Date"}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    isDateOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDateOpen && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 overflow-hidden">
                  {["Date", "12 Sep", "13 Sep"].map((date) => (
                    <button
                      key={date}
                      onClick={() => {
                        setDateFilter(date === "Date" ? "" : date);
                        setIsDateOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition ${
                        (dateFilter || "Date") === date
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative w-full sm:w-40">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full px-3.5 py-2 border border-blue-200 rounded-lg text-sm font-medium text-gray-700 flex items-center justify-between hover:border-blue-300 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.2)] transition"
              >
                <span>{categoryFilter || "Category"}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isCategoryOpen && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 overflow-hidden">
                  {["Category", "Electricity", "Fuel", "Salary", "Other"].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCategoryFilter(cat === "Category" ? "" : cat);
                          setIsCategoryOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-medium transition ${
                          (categoryFilter || "Category") === cat
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setEditingExpense(null);
              setOpenModal(true);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-[#5B63E5] text-white rounded-lg hover:bg-indigo-700 transition-colors w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Add Expense
          </button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AddExpenseModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingExpense(null);
        }}
        onSave={handleAddExpense}
        initialData={editingExpense}
      />

      {/* Delete Modal */}
      <Dialog open={openDeleteModal} onClose={cancelDelete}>
        <DialogTitle className="text-lg font-bold text-black">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this expense? <br /> This action
            cannot be undone.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-8 gap-4">
        {[
          { label: "Total Expense", value: totalExpense },
          { label: "Electricity Bill", value: 87200 },
          { label: "Fuel Expense", value: fuelExpense },
          { label: "Salaries", value: salaries },
          { label: "Net Profit", value: 50000 },
          { label: "Other", value: 3000 },
          { label: "Maintenance", value: 20000 },
        ].map((item, idx) => {
          // Define text colors by label
          const colorMap: Record<string, string> = {
            "Total Expense": "text-[#ee4141]",
            "Electricity Bill": "text-yellow-600",
            "Fuel Expense": "text-orange-600",
            Salaries: "text-blue-600",
            "Net Profit": "text-green-600",
            Other: "text-purple-600",
            Maintenance: "text-pink-600",
          };

          const valueColor = colorMap[item.label] || "text-gray-700";

          return (
            <Card
              key={idx}
              className="border-2 border-[#D1DEEF]"
              sx={{
                borderRadius: 4,
                boxShadow: "none",
              }}
            >
              <CardContent>
                <p className="text-black text-sm">{item.label}</p>
                <h2 className={`text-xl md:text-2xl font-bold ${valueColor}`}>
                  Rs. {item.value.toLocaleString()}
                </h2>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Monthly Income vs Expenses Chart */}
      <Card
        className="border-2 border-[#D1DEEF] mb-8"
        sx={{ borderRadius: 4, boxShadow: "none" }}
      >
        <CardContent>
          <h2 className="text-lg md:text-xl font-semibold text-black mb-4">
            Monthly Income vs Expenses
          </h2>
          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { month: "Jan", income: 180000, expense: 150000 },
                  { month: "Feb", income: 210000, expense: 170000 },
                  { month: "Mar", income: 240000, expense: 180000 },
                  { month: "Apr", income: 220000, expense: 190000 },
                  { month: "May", income: 250000, expense: 200000 },
                  { month: "Jun", income: 230000, expense: 210000 },
                  { month: "Jul", income: 260000, expense: 230000 },
                  { month: "Aug", income: 270000, expense: 250000 },
                  { month: "Sep", income: 280000, expense: 260000 },
                  { month: "Oct", income: 300000, expense: 280000 },
                  { month: "Nov", income: 290000, expense: 275000 },
                  { month: "Dec", income: 310000, expense: 290000 },
                ]}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#374151" />
                <YAxis stroke="#374151" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="income" fill="#5B63E5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expense" fill="#FF6B6B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Table Section */}
      <div className="hidden lg:block mt-8 bg-white rounded-xl overflow-hidden border border-slate-200 mb-6 lg:mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: "#E5F0FE" }}>
              <tr>
                {[
                  "Date",
                  "Category",
                  "Description",
                  "Amount (Rs)",
                  "Payment Type",
                  "Status",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    className="py-4 px-4 text-left text-xs font-semibold text-black uppercase"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentExpenses.map((exp) => (
                <tr
                  key={exp.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm font-medium text-slate-800">
                    {exp.date}
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-slate-800">
                    {exp.category}
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-700">
                    {exp.description}
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-slate-800">
                    Rs. {exp.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-slate-700">
                    {exp.paymentType}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        exp.status === "Approved"
                          ? "text-green-700 border-green-300 bg-green-50"
                          : "text-amber-700 border-amber-300 bg-amber-50"
                      }`}
                    >
                      {exp.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(exp)}
                        className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(exp.id)}
                        className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-md hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentExpenses.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-24 text-center text-sm text-slate-500"
                  >
                    No expenses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3 mb-6 lg:mb-8">
        {currentExpenses.map((exp) => (
          <div
            key={exp.id}
            className="border border-slate-200 rounded-lg p-3 sm:p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-start gap-2 mb-2">
              <div>
                <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                  {exp.category}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {exp.description}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                  exp.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {exp.status}
              </span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-slate-700 mb-3 pt-2 border-t border-slate-100">
              <span>{exp.date}</span>
              <span className="font-semibold">
                Rs. {exp.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(exp)}
                className="flex-1 py-2 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(exp.id)}
                className="flex-1 py-2 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 sm:p-4 border-t border-gray-200 bg-gray-50 rounded-lg">
        <div className="text-xs sm:text-sm text-gray-600">
          Showing {(page - 1) * itemsPerPage + 1}-
          {Math.min(page * itemsPerPage, filteredExpenses.length)} of{" "}
          {filteredExpenses.length}
        </div>

        <div className="flex gap-1 overflow-x-auto w-full sm:w-auto">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 border border-gray-300 rounded-lg text-xs sm:text-sm bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg border transition-colors whitespace-nowrap ${
                page === i + 1
                  ? "bg-indigo-600 text-white border-transparent"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm rounded-lg disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpensesManagement;
