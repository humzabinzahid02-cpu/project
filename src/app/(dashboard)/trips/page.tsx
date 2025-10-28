"use client"
import { useState, useMemo, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MoreVertical, Plus, Search } from "lucide-react"
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
type Trip = {
  id: number
  rider: string
  tripLoad: string
  startTime: string
  colony: string
  orderCustomers: number
  totalBottles: number
  bottlesDelivered: number
  status: "Not Started" | "Started"
  phone?: string
  details?: string
}

const mockTrips: Trip[] = [
  {
    id: 1,
    rider: "Imran",
    tripLoad: "TR-001",
    startTime: "09:30 AM",
    colony: "Gulshan Block A",
    orderCustomers: 12,
    totalBottles: 48,
    bottlesDelivered: 48,
    status: "Started",
    phone: "+923001234567",
    details: "All deliveries completed successfully"
  },
  {
    id: 2,
    rider: "Umar",
    tripLoad: "TR-002",
    startTime: "10:15 AM",
    colony: "Defence Phase 2",
    orderCustomers: 8,
    totalBottles: 32,
    bottlesDelivered: 28,
    status: "Started",
    phone: "+923009876543",
    details: "4 bottles pending delivery"
  },
  {
    id: 3,
    rider: "Hasde",
    tripLoad: "TR-003",
    startTime: "11:00 AM",
    colony: "Cantonment Road",
    orderCustomers: 15,
    totalBottles: 60,
    bottlesDelivered: 0,
    status: "Started",
    phone: "+923005555555",
    details: "Trip just started, deliveries in progress"
  },
  {
    id: 4,
    rider: "Imran",
    tripLoad: "TR-004",
    startTime: "08:00 AM",
    colony: "F-Block Civil Lines",
    orderCustomers: 10,
    totalBottles: 40,
    bottlesDelivered: 0,
    status: "Not Started",
    phone: "+923001234567",
    details: "Awaiting rider to start the trip"
  },
  {
    id: 5,
    rider: "Ahsan",
    tripLoad: "TR-005",
    startTime: "02:30 PM",
    colony: "Mall Road",
    orderCustomers: 14,
    totalBottles: 56,
    bottlesDelivered: 42,
    status: "Started",
    phone: "+923007777777",
    details: "14 bottles remaining to be delivered"
  },
  {
    id: 6,
    rider: "Bilal",
    tripLoad: "TR-006",
    startTime: "01:00 PM",
    colony: "Race Course",
    orderCustomers: 11,
    totalBottles: 44,
    bottlesDelivered: 44,
    status: "Started",
    phone: "+923008888888",
    details: "All orders delivered successfully"
  },
]

export default function TripsApp() {
  const router = useRouter()
  const [trips] = useState<Trip[]>(mockTrips)
  const [searchTerm, setSearchTerm] = useState("")
  const [riderFilter, setRiderFilter] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const itemsPerPage = 10

  const riderOptions = useMemo(() => {
    return ["All"].concat(Array.from(new Set(trips.map((t) => t.rider))))
  }, [trips])

  useEffect(() => {
    if (!riderOptions.includes(riderFilter)) {
      setRiderFilter("All")
    }
  }, [riderOptions, riderFilter])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.rider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.tripLoad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.colony.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRider = riderFilter === "All" || trip.rider === riderFilter

    return matchesSearch && matchesRider
  })

  const totalPages = Math.ceil(filteredTrips.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = useMemo(() => filteredTrips.slice(startIndex, endIndex), [filteredTrips, startIndex, endIndex])

  const getStatusColor = (status: Trip["status"]) => {
    switch (status) {
      case "Not Started":
        return "bg-red-50 text-red-700 border-red-200"
      case "Started":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const handleViewTrip = (tripId: number) => {
    router.push(`/trips/${tripId}`)
    setOpenDropdown(null)
  }

  return (
    <div className="bg-white min-h-screen p-4 md:p-6">
      <div className="">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl sm:text-2xl font-semibold">Trips</h1>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 lg:gap-6 justify-between items-start lg:items-center">
          {/* Search Bar */}
          <div className="w-90 relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by rider or trip"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-9 pr-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B63E5] bg-white text-sm"
            />
          </div>

          {/* Right side controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Rider Dropdown */}
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
    value={riderFilter}
    onChange={(e) => {
      setRiderFilter(e.target.value);
      setCurrentPage(1);
    }}
    IconComponent={KeyboardArrowDownIcon} // 👈 custom arrow (same as Colonies dropdown)
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
        py: "10px",
        px: "14px",
        display: "flex",
        alignItems: "center",
      },
      "& .MuiSvgIcon-root": {
        color: "#6B7280", // 👈 arrow color (same gray)
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
    {riderOptions.map((rider) => (
      <MenuItem key={rider} value={rider}>
        {rider}
      </MenuItem>
    ))}
  </Select>
</FormControl>

            {/* Assign Rider Button */}
            <button className="flex items-center justify-center gap-2 px-4 py-[9px] bg-[#5B63E5] text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Assign Rider
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl overflow-hidden border border-gray-200 mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className=" border-b bg-[#E5F0FE] border-gray-300">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Rider</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Current Trip Load</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Trip start time</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Colony</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Order Customers</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((trip) => (
                  <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-gray-900">{trip.rider}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700 font-medium">{trip.tripLoad}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{trip.startTime}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{trip.colony}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{trip.orderCustomers}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          trip.status,
                        )}`}
                      >
                        {trip.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 relative">
                      <div className="flex justify-center">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === trip.id ? null : trip.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <MoreVertical className="h-5 w-5 text-gray-500" />
                        </button>

                        {openDropdown === trip.id && (
                          <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-8 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20"
                          >
                            <div className="py-2">
                              <button 
                                onClick={() => handleViewTrip(trip.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                View
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3 mb-6">
          {currentItems.map((trip) => (
            <div key={trip.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-start gap-3 mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{trip.rider}</h3>
                  <p className="text-sm text-gray-500 mt-1">{trip.tripLoad}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${getStatusColor(
                    trip.status,
                  )}`}
                >
                  {trip.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Time:</span>
                  <span>{trip.startTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Colony:</span>
                  <span>{trip.colony}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Customers:</span>
                  <span>{trip.orderCustomers}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleViewTrip(trip.id)}
                  className="flex-1 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                >
                  View
                </button>
              
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 px-4 py-3 md:py-4 flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-b-lg">
          <div className="text-sm">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredTrips.length)} of {filteredTrips.length} entries
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">
              {currentPage} of {totalPages > 0 ? totalPages : 1} Pages
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                Prev
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}