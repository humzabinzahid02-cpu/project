"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { Button, Card } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Search } from "lucide-react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Colony {
  id: number;
  name: string;
  rider: string;
  customers: number;
  ordersToday: number;
  lastUpdated: string;
}

function generateDummyColonies(): Colony[] {
  const names = [
    "Model Town",
    "Faisal Town",
    "Johar Town",
    "DHA Phase 1",
    "DHA Phase 2",
    "Gulberg",
    "Allama Iqbal Town",
    "Wapda Town",
    "Bahria Town",
    "Shadman",
    "Garden Town",
    "Cantt",
    "North Nazimabad",
    "Clifton",
    "PECHS",
    "Korangi",
    "Gulistan-e-Johar",
    "Gulshan-e-Iqbal",
    "Saddar",
    "Defense View",
  ];
  const riders = [
    "Ali",
    "Bilal",
    "Hassan",
    "Usman",
    "Ahmed",
    "Zain",
    "Hamza",
    "Fahad",
    "Saad",
    "Kashif",
  ];
  const today = new Date();
  return names.map((name, idx) => {
    const customers = 20 + ((idx * 7) % 30);
    const ordersToday = 3 + (idx % 12);
    const d = new Date(today);
    d.setDate(today.getDate() - (idx % 7));
    return {
      id: idx + 1,
      name,
      rider: riders[idx % riders.length],
      customers,
      ordersToday,
      lastUpdated: d.toISOString().slice(0, 10),
    };
  });
}

const ColoniesManagement: React.FC = () => {
  const [colonies, setColonies] = useState<Colony[]>(generateDummyColonies());
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newColonyName, setNewColonyName] = useState("");
  const router = useRouter();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [assignmentFilter, setAssignmentFilter] = useState<
    "all" | "assigned" | "unassigned"
  >("all");

  // Filter + paginate
  const filteredColonies = colonies.filter((c) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.rider.toLowerCase().includes(q);
    const isAssigned = c.rider !== "Unassigned";
    const matchesAssignment =
      assignmentFilter === "all"
        ? true
        : assignmentFilter === "assigned"
        ? isAssigned
        : !isAssigned;
    return matchesQuery && matchesAssignment;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredColonies.length / itemsPerPage)
  );
  const start = (page - 1) * itemsPerPage;
  const paginatedColonies = filteredColonies.slice(start, start + itemsPerPage);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [totalPages, page]);

  const handleAddColony = () => {
    const name = newColonyName.trim();
    if (!name) return;
    const today = new Date().toISOString().slice(0, 10);
    setColonies((prev) => [
      {
        id: prev.length ? Math.max(...prev.map((c) => c.id)) + 1 : 1,
        name,
        rider: "Unassigned",
        customers: 0,
        ordersToday: 0,
        lastUpdated: today,
      },
      ...prev,
    ]);
    setPage(1);
    setNewColonyName("");
    setIsAddOpen(false);
  };

  return (
    <div className="bg-white">
      <div className="min-h-screen p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-semibold text-black mb-4">
          Colonies Management
        </h1>

        {/* Search + Filter + Add Colony - Responsive Layout */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 lg:mb-8">
          {/* Search Bar */}
          <div className="relative w-90">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search Colony..."
              className="w-full pl-9 pr-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Filter + Add Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4 w-full lg:w-auto">
            {/* Filter */}
            <div className="flex items-center gap-3 flex-1 sm:flex-none">
              <span className="text-sm text-[#475569] whitespace-nowrap">
                Colonies
              </span>
<FormControl
  size="small"
  sx={{
    width: 130,
    bgcolor: "white",
    borderRadius: "8px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.04)",
  }}
 
>
  <Select
    value={assignmentFilter}
    onChange={(e) => {
      const v = e.target.value as "all" | "assigned" | "unassigned";
      setAssignmentFilter(v);
      setPage(1);
    }}
    IconComponent={KeyboardArrowDownIcon} // same dropdown arrow
    displayEmpty
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
        py: "9px",
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
          minWidth: "130px",
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
    <MenuItem value="all">All Colonies</MenuItem>
    <MenuItem value="assigned">Assigned</MenuItem>
    <MenuItem value="unassigned">Unassigned</MenuItem>
  </Select>
</FormControl>

            </div>

            {/* Add Button */}
            <button
              className="bg-[#5B63E5] text-white px-7 py-2.5 rounded-md text-sm font-medium w-full sm:w-auto"
              onClick={() => setIsAddOpen(true)}
            >
              Add Colony
            </button>
          </div>
        </div>

        {/* Table - Desktop View */}
        <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
          <div className="overflow-x-auto min-h-[300px] hidden sm:block">
            {paginatedColonies.length > 0 ? (
              <table className="w-full">
                <thead style={{ backgroundColor: "#E5F0FE" }}>
                  <tr>
                    {[
                      "#",
                      "Colony Name",
                      "Assigned Rider",
                      "Total Customers",
                      "Orders Today",
                      "Last Updated",
                      "Action",
                    ].map((header) => (
                      <th
                        key={header}
                        className="text-left px-4 py-4 text-xs font-semibold text-black uppercase"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedColonies.map((colony) => (
                    <tr key={colony.id} className="hover:bg-slate-50">
                      <td className="py-4 px-4 text-sm font-medium text-indigo-600">
                        #{colony.id}
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-800">
                        {colony.name}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-800">
                        {colony.rider}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-800">
                        {colony.customers}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-800">
                        {colony.ordersToday}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-800">
                        {new Date(colony.lastUpdated).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700"
                          onClick={() => router.push(`/colonies/${colony.id}`)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500 text-sm">
                No colonies found.
              </div>
            )}
          </div>

          {/* Mobile View */}
          <div className="sm:hidden">
            {paginatedColonies.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {paginatedColonies.map((colony) => (
                  <li key={colony.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-800">
                          {colony.name}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Rider: {colony.rider}
                        </div>
                      </div>
                      <div className="text-xs font-medium text-indigo-600">
                        #{colony.id}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="text-xs text-slate-500">Customers</div>
                      <div className="text-xs text-slate-800 font-medium">
                        {colony.customers}
                      </div>

                      <div className="text-xs text-slate-500">Orders Today</div>
                      <div className="text-xs text-slate-800 font-medium">
                        {colony.ordersToday}
                      </div>

                      <div className="text-xs text-slate-500">Last Updated</div>
                      <div className="text-xs text-slate-800">
                        {new Date(colony.lastUpdated).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    <button
                      className="w-full px-3 py-2 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700"
                      onClick={() => router.push(`/colonies/${colony.id}`)}
                    >
                      View Details
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500 text-sm">
                No colonies found.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-4 bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
            <div className="text-xs sm:text-sm">
              Page {page} of {totalPages} — Showing {start + 1}-
              {Math.min(start + itemsPerPage, filteredColonies.length)} of{" "}
              {filteredColonies.length} colonies
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-end flex-wrap">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Prev
              </button>
              <div className="flex items-center gap-1 sm:gap-2">
                {[...Array(totalPages)].slice(0, 5).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors ${
                      page === i + 1
                        ? "bg-indigo-600 text-white border-transparent"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                {totalPages > 5 && <span className="text-gray-500">...</span>}
              </div>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Colony Modal */}
      {isAddOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-colony-title"
        >
          <Card className="relative p-6 w-[32rem] max-w-[95vw] mx-4">
            <button
              aria-label="Close"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 text-xl"
              onClick={() => setIsAddOpen(false)}
            >
              ×
            </button>

            <h2
              id="add-colony-title"
              className="text-xl font-semibold text-black mb-4"
            >
              Add New Colony
            </h2>

            <label
              htmlFor="colony-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Colony Name
            </label>
            <input
              id="colony-name"
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#5B63E5]"
              placeholder="Enter colony name"
              value={newColonyName}
              onChange={(e) => setNewColonyName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddColony();
              }}
            />

            <button
              className="w-full bg-[#5B63E5] text-white rounded-lg py-2.5 text-sm font-medium disabled:opacity-50 hover:bg-[#4a52d4] transition-colors"
              disabled={!newColonyName.trim()}
              onClick={handleAddColony}
            >
              Add Colony
            </button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ColoniesManagement;