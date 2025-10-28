"use client";

import React, { useState, useMemo } from "react";
import { Search, RefreshCw, ChevronLeft, Menu, X } from "lucide-react";
import { FormControl, Select, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Types
interface ActivityDetail {
  id: string;
  time: string;
  description: string;
  rider?: string;
  details?: string;
  status?: string;
  customerName?: string;
  customerPhone?: string;
}

interface DateSection {
  date: string;
  label: string;
  activities: ActivityDetail[];
}

const LiveActivityPage: React.FC = () => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("today");
  const [riderFilter, setRiderFilter] = useState("all");
  const [colonyFilter, setColonyFilter] = useState("all");
  const [activityType, setActivityType] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Sample data
  const activityData: DateSection[] = [
    {
      date: "2025-10-13",
      label: "13 Oct 2025 (Today)",
      activities: [],
    },
    {
      date: "2025-10-12",
      label: "12 Oct 2025",
      activities: [
        {
          id: "1",
          time: "12:30 PM",
          description: "All Khan requested 2 Rk.ur Gallons",
          customerName: "All Khan",
          customerPhone: "+92300123456",
        },
        {
          id: "2",
          time: "12:30 PM",
          description: "All Khan requested 2 Rk.ur Gallons",
          customerName: "All Khan",
          customerPhone: "+92300123456",
        },
      ],
    },
    {
      date: "2025-10-11",
      label: "11 Oct 2025",
      activities: [
        {
          id: "3",
          time: "12:02 PM",
          description: "Loaded into Rider Ali (Trip #1)",
          rider: "Ali Khan",
          details: "30 blue, 20 white",
          status: "Ali Garden delivery",
          customerName: "Ali Khan",
          customerPhone: "+92301234567",
        },
        {
          id: "4",
          time: "12:00 PM",
          description: "Empty bottles picked up from Customer Bilal",
          rider: "Rider Imran",
          details: "30 blue, 20 white",
          status: "Returned bottles",
          customerName: "Bilal",
          customerPhone: "+92302345678",
        },
        {
          id: "5",
          time: "12:35 PM",
          description: "Empty bottles picked up from Customer Bilal",
          rider: "Rider Imran",
          details: "30 blue, 20 white",
          status: "Returned bottles",
          customerName: "Bilal",
          customerPhone: "+92302345678",
        },
        {
          id: "6",
          time: "12:30 PM",
          description: "Loaded into Rider Ali (Trip #1)",
          rider: "Ali Khan",
          details: "30 blue, 20 white",
          status: "Ali Garden delivery",
          customerName: "Ali Khan",
          customerPhone: "+92301234567",
        },
      ],
    },
  ];

  // Filter activities based on search query
  const filteredActivityData = useMemo(() => {
    if (!searchQuery.trim()) {
      return activityData;
    }

    const query = searchQuery.toLowerCase();

    return activityData.map((section) => ({
      ...section,
      activities: section.activities.filter((activity) => {
        const customerName = activity.customerName?.toLowerCase() || "";
        const customerPhone = activity.customerPhone?.toLowerCase() || "";
        const description = activity.description.toLowerCase();
        const rider = activity.rider?.toLowerCase() || "";

        return (
          customerName.includes(query) ||
          customerPhone.includes(query) ||
          description.includes(query) ||
          rider.includes(query)
        );
      }),
    }));
  }, [searchQuery, activityData]);

  const handleRefresh = () => {
    console.log("Refreshing...");
  };

  const selectSx = {
    fontSize: 14,
    borderRadius: "8px",
    backgroundColor: "white",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#d1d5db",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#a855f7",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#a855f7",
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white px-2 md:px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 ">
        <button className="text-gray-600 hover:text-gray-900 ">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl font-semibold">Live Activity</h1>
      </div>

      {/* Controls */}
      <div className=" px-2 sm:px-5 py-3 sm:py-4">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative min-w-0">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 flex-shrink-0"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by customer name / phone"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-90 pl-9 pr-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ">
            <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
              <span>Auto Refresh</span>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`w-10 h-6 rounded-full transition-colors relative ${
                  autoRefresh ? "bg-[#5B63E5]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    autoRefresh ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
              <span>5s</span>
            </div>

            <button
              onClick={handleRefresh}
              className="p-1.5 text-gray-600 hover:text-gray-900 flex-shrink-0"
            >
              <RefreshCw size={20} />
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden p-1.5 text-gray-600 hover:text-gray-900 flex-shrink-0"
            >
              {showFilters ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Auto Refresh Toggle Mobile */}
        <div className="sm:hidden flex items-center gap-2 text-xs text-gray-600 mb-4">
          <span>Auto Refresh</span>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`w-10 h-6 rounded-full transition-colors relative ${
              autoRefresh ? "bg-[#5B63E5]" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                autoRefresh ? "right-0.5" : "left-0.5"
              }`}
            />
          </button>
          <span>5s</span>
        </div>

        {/* Filters */}
        <div className={`${showFilters ? "block" : "hidden"} sm:block`}>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
           {/* Date Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-600">Date</span>
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
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                IconComponent={KeyboardArrowDownIcon}
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
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="yesterday">Yesterday</MenuItem>
                <MenuItem value="last7days">Last 7 days</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Rider Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-600">Rider</span>
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
                onChange={(e) => setRiderFilter(e.target.value)}
                IconComponent={KeyboardArrowDownIcon}
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
                <MenuItem value="all">All Riders</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Colony Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-600">Colony</span>
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
                value={colonyFilter}
                onChange={(e) => setColonyFilter(e.target.value)}
                IconComponent={KeyboardArrowDownIcon}
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
                <MenuItem value="all">All Colonies</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Activity Type */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-600">Activity Type</span>
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
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                IconComponent={KeyboardArrowDownIcon}
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
                <MenuItem value="all">All</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-600">Status</span>
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                IconComponent={KeyboardArrowDownIcon}
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
                <MenuItem value="all">All</MenuItem>
              </Select>
            </FormControl>
          </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 mb-5 sm:p-5 m-4 sm:m-5 rounded-2xl bg-[#D1DEEF]">
        {filteredActivityData.map((section) => (
          <div key={section.date} className="mb-3">
            <h2 className="text-base sm:text-lg font-semibold mb-2 py-2">
              {section.label}
            </h2>

            {section.activities.length === 0 ? (
              <div className="bg-white rounded-lg p-3 text-center text-sm text-gray-600">
                No Activity
              </div>
            ) : (
              <div className="space-y-2">
                {section.activities.map((activity) => (
                  <div key={activity.id} className="flex gap-2 sm:gap-3">
                    <div className="text-blue-500 text-xs font-medium min-w-[50px] sm:min-w-[60px] flex-shrink-0">
                      {activity.time}
                    </div>
                    <div className="bg-white rounded-lg p-3 sm:p-4 flex-1 min-w-0">
                      <div className="flex flex-col gap-2 text-xs sm:text-sm">
                        <span className="text-gray-700">
                          {activity.description}
                        </span>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 flex-wrap">
                          {activity.rider && (
                            <span className="text-gray-900 font-medium">
                              {activity.rider}
                            </span>
                          )}
                          {activity.details && (
                            <span className="text-gray-700">
                              {activity.details}
                            </span>
                          )}
                          {activity.status && (
                            <span className="text-gray-700">
                              {activity.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveActivityPage;