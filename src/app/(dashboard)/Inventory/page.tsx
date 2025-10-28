"use client";
import React, { useState } from "react";
import { Search, ChevronDown, Plus, AlertTriangle } from "lucide-react";
import { FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const InventoryDashboard = () => {
  const statsCards = [
    { title: "Total Bottles in Stock", value: "1,200", color: "text-blue-600" },
    { title: "Blue Bottles Available", value: "800", color: "text-blue-600" },
    { title: "White Bottles Available", value: "1,500", color: "text-black" },
    { title: "Lost/Damaged Bottles", value: "02", color: "text-red-600" },
    { title: "Bottles in Transit", value: "250", color: "text-green-600" },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("  All Days");
  const [bottleType, setBottleType] = useState("All");

  const tableData = [
    { type: "Blue Bottle", total: 800, withCustomers: 600, unitPrice: 100, availableStock: 1080 },
    { type: "White Bottle", total: 1500, withCustomers: 300, unitPrice: 70, availableStock: 840 },
  ];

  const table = [
    { date: "02 Oct", action: "Added", type: "Blue", qty: 250, reason: "New stock arrival" },
    { date: "03 Oct", action: "Removed", type: "White", qty: -15, reason: "Broken during transport" },
  ];

  const actionButtons = [
    { label: "Adjust Inventory", color: "bg-[#E94A4C] hover:bg-red-700" },
    { label: "Export Report", color: "bg-[#00B37A] hover:bg-green-700" },
  ];

  const handleExportReport = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      
      const doc = new jsPDF("p", "pt", "a4");
      const pageWidth = doc.internal.pageSize.width;
      const margin = 40;
      let yPosition = 40;

      const reportDate = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      doc.setFillColor(37, 99, 235);
      doc.rect(0, 0, pageWidth, 80, 'F');
      
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text("ROYAL DRINKING WATER", pageWidth / 2, 35, { align: "center" });
      
      doc.setFontSize(16);
      doc.text("INVENTORY MANAGEMENT REPORT", pageWidth / 2, 55, { align: "center" });

      yPosition = 120;

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "normal");
      doc.text(`Report Generated: ${reportDate}`, margin, yPosition);
      doc.text(`Date Filter: ${dateFilter}`, margin, yPosition + 15);
      doc.text(`Bottle Type Filter: ${bottleType}`, margin, yPosition + 30);
      doc.text(`Report ID: INV-${new Date().getTime()}`, pageWidth - margin, yPosition, { align: "right" });

      yPosition += 60;

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.text("EXECUTIVE SUMMARY", margin, yPosition);
      yPosition += 30;

      doc.setFillColor(59, 130, 246);
      doc.rect(margin, yPosition, pageWidth - (margin * 2), 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text("METRIC", margin + 10, yPosition + 16);
      doc.text("VALUE", pageWidth - margin - 60, yPosition + 16, { align: "right" });

      yPosition += 25;

      statsCards.forEach((card, index) => {
        const isEven = index % 2 === 0;
        if (isEven) {
          doc.setFillColor(245, 249, 255);
          doc.rect(margin, yPosition, pageWidth - (margin * 2), 20, 'F');
        }
        
        doc.setTextColor(50, 50, 50);
        doc.setFontSize(9);
        doc.text(card.title, margin + 10, yPosition + 13);
        doc.text(card.value, pageWidth - margin - 10, yPosition + 13, { align: "right" });
        
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition + 20, pageWidth - margin, yPosition + 20);
        
        yPosition += 20;
      });

      yPosition += 30;

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.text("CURRENT BOTTLE INVENTORY", margin, yPosition);
      yPosition += 30;

      const inventoryColumns = [
        { title: "BOTTLE TYPE", width: 150 },
        { title: "TOTAL BOTTLES", width: 100 },
        { title: "WITH CUSTOMERS", width: 100 },
        { title: "UNIT PRICE (Rs)", width: 100 },
        { title: "AVAILABLE STOCK", width: 100 }
      ];

      doc.setFillColor(59, 130, 246);
      doc.rect(margin, yPosition, pageWidth - (margin * 2), 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);

      let xPosition = margin;
      inventoryColumns.forEach(column => {
        doc.text(column.title, xPosition + 5, yPosition + 16);
        xPosition += column.width;
      });

      yPosition += 25;

      tableData.forEach((row, index) => {
        const isEven = index % 2 === 0;
        if (isEven) {
          doc.setFillColor(245, 249, 255);
          doc.rect(margin, yPosition, pageWidth - (margin * 2), 20, 'F');
        }

        doc.setTextColor(50, 50, 50);
        doc.setFontSize(9);

        xPosition = margin;
        doc.text(row.type, xPosition + 5, yPosition + 13);
        xPosition += inventoryColumns[0].width;
        doc.text(row.total.toString(), xPosition + 5, yPosition + 13);
        xPosition += inventoryColumns[1].width;
        doc.text(row.withCustomers.toString(), xPosition + 5, yPosition + 13);
        xPosition += inventoryColumns[2].width;
        doc.text(`Rs ${row.unitPrice}`, xPosition + 5, yPosition + 13);
        xPosition += inventoryColumns[3].width;
        doc.text(row.availableStock.toString(), xPosition + 5, yPosition + 13);

        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition + 20, pageWidth - margin, yPosition + 20);
        
        yPosition += 20;
      });

      yPosition += 30;

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.text("STOCK MOVEMENT HISTORY", margin, yPosition);
      yPosition += 30;

      const movementColumns = [
        { title: "DATE", width: 80 },
        { title: "ACTION", width: 80 },
        { title: "BOTTLE TYPE", width: 100 },
        { title: "QUANTITY", width: 80 },
        { title: "REASON", width: 150 }
      ];

      doc.setFillColor(59, 130, 246);
      doc.rect(margin, yPosition, pageWidth - (margin * 2), 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);

      xPosition = margin;
      movementColumns.forEach(column => {
        doc.text(column.title, xPosition + 5, yPosition + 16);
        xPosition += column.width;
      });

      yPosition += 25;

      table.forEach((row, index) => {
        const isEven = index % 2 === 0;
        if (isEven) {
          doc.setFillColor(245, 249, 255);
          doc.rect(margin, yPosition, pageWidth - (margin * 2), 20, 'F');
        }

        doc.setFontSize(9);

        xPosition = margin;
        doc.setTextColor(50, 50, 50);
        doc.text(row.date, xPosition + 5, yPosition + 13);
        xPosition += movementColumns[0].width;
        doc.text(row.action, xPosition + 5, yPosition + 13);
        xPosition += movementColumns[1].width;
        doc.text(`${row.type} Bottle`, xPosition + 5, yPosition + 13);
        xPosition += movementColumns[2].width;
        
        const quantityColor = row.qty > 0 ? [34, 197, 94] : [239, 68, 68];
        doc.setTextColor(quantityColor[0], quantityColor[1], quantityColor[2]);
        doc.setFont("helvetica", "bold");
        doc.text(row.qty > 0 ? `+${row.qty}` : row.qty.toString(), xPosition + 5, yPosition + 13);
        
        xPosition += movementColumns[3].width;
        doc.setTextColor(50, 50, 50);
        doc.setFont("helvetica", "normal");
        doc.text(row.reason, xPosition + 5, yPosition + 13);

        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition + 20, pageWidth - margin, yPosition + 20);
        
        yPosition += 20;
      });

      yPosition += 40;

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.text("REPORT SUMMARY", margin, yPosition);
      
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      
      const totalBottles = tableData.reduce((sum, row) => sum + row.total, 0);
      const totalWithCustomers = tableData.reduce((sum, row) => sum + row.withCustomers, 0);
      const totalAvailable = tableData.reduce((sum, row) => sum + row.availableStock, 0);
      
      doc.text(`• Total Bottles in System: ${totalBottles.toLocaleString()}`, margin, yPosition + 20);
      doc.text(`• Total Bottles with Customers: ${totalWithCustomers.toLocaleString()}`, margin, yPosition + 35);
      doc.text(`• Total Available Stock: ${totalAvailable.toLocaleString()}`, margin, yPosition + 50);
      doc.text(`• Total Stock Movements Tracked: ${table.length}`, margin, yPosition + 65);

      const pageHeight = doc.internal.pageSize.height;
      doc.setFillColor(37, 99, 235);
      doc.rect(0, pageHeight - 40, pageWidth, 40, 'F');
      
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "normal");
      doc.text(`Confidential - For Internal Use Only | Generated by Royal Drinking Water Inventory System`, pageWidth / 2, pageHeight - 25, { align: "center" });
      doc.text(`© ${new Date().getFullYear()} Aqua Pure Water Solutions. All rights reserved.`, pageWidth / 2, pageHeight - 10, { align: "center" });

      const fileName = `Inventory_Report_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF report. Please try again.');
    }
  };

  const handleConfirmAdjustments = () => {
    console.log("Adjustments confirmed ✅");
  };

  return (
    <div className="bg-white">
      <div className="min-h-screen p-2 sm:p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-4">Inventory Management</h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
          <div className="relative w-full">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-90 pl-9 pr-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm"
            />
          </div>

  
</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {statsCards.map((card, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-medium text-gray-600 text-sm mb-1">{card.title}</h3>
              <p className={`text-2xl sm:text-3xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6 lg:mb-8">
          {actionButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => {
                if (index === 0) setIsModalOpen(true);
                if (index === 1) handleExportReport();
              }}
              className={`${button.color} text-white font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm whitespace-nowrap`}
            >
              {index === 0 && <Plus size={18} />}
              {button.label}
            </button>
          ))}
        </div>

        {/* Current Bottle Inventory Table */}
        <div className="flex justify-between mb-3 h-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 lg:mb-5">Current Bottle Inventory</h2>

           <div className="flex items-center h-auto gap-3">
      <span className="text-sm text-[#475569] whitespace-nowrap">Type</span>
     <FormControl
              size="small"
              sx={{
                minWidth: 120,
                bgcolor: "white",
                borderRadius: "8px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Select
                value={bottleType}
                onChange={(e: SelectChangeEvent) =>
                  setBottleType(e.target.value)
                }
                IconComponent={KeyboardArrowDownIcon}
                displayEmpty
                renderValue={(value) => {
                  if (value === "") return "All Types";
                  if (value === "Blue Gallon") return "Blue Gallon";
                  if (value === "Green Gallon") return "Green Gallon";
                 
                  return value;
                }}
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
                <MenuItem value="All">All</MenuItem>

                <MenuItem value="Blue Gallon">Blue Gallon</MenuItem>
                <MenuItem value="White Gallon">White Gallon</MenuItem>
             
              </Select>
            </FormControl>
    </div>
        </div>
        
        <div className="bg-white rounded-xl overflow-hidden border border-slate-200 mb-6 lg:mb-8">
          <div className="overflow-x-auto hidden sm:block">
            <table className="w-full">
              <thead style={{ backgroundColor: "#E5F0FE" }}>
                <tr>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-black uppercase">Bottle Type</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-black uppercase">Total Bottles</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-black uppercase">With Customers</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-black uppercase">Unit Price (Rs)</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-black uppercase">Available Stock</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {tableData.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm font-medium text-slate-800">{row.type}</td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-slate-800">{row.total}</td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-slate-800">{row.withCustomers}</td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-slate-800">Rs {row.unitPrice}</td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-slate-800">{row.availableStock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden">
            <ul className="divide-y divide-slate-100">
              {tableData.map((row, index) => (
                <li key={index} className="p-4">
                  <div className="text-sm font-semibold text-slate-800 mb-3">{row.type}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-xs text-slate-500">Total Bottles</div>
                    <div className="text-xs text-slate-800 font-medium">{row.total}</div>
                    
                    <div className="text-xs text-slate-500">With Customers</div>
                    <div className="text-xs text-slate-800 font-medium">{row.withCustomers}</div>
                    
                    <div className="text-xs text-slate-500">Unit Price</div>
                    <div className="text-xs text-slate-800 font-medium">Rs {row.unitPrice}</div>
                    
                    <div className="text-xs text-slate-500">Available Stock</div>
                    <div className="text-xs text-slate-800 font-medium">{row.availableStock}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stock Movement History Table */}
       <div className="flex justify-between mb-3 h-auto">
         <h2 className="text-lg sm:text-xl font-semibold mb-4 lg:mb-5">Stock Movement History</h2>
    <div className="flex items-center gap-3">
      <span className="text-sm text-[#475569] whitespace-nowrap">Date</span>
        <FormControl
              size="small"
              sx={{
                minWidth: 120,
                bgcolor: "white",
                borderRadius: "8px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Select
                value={dateFilter}
                onChange={(e: SelectChangeEvent) =>
                  setDateFilter(e.target.value)
                }
                IconComponent={KeyboardArrowDownIcon}
                displayEmpty
                renderValue={(value) => {
                  if (value === "") return "Date";
                  if (value === "all") return "All Day";
                  if (value === "today") return "Today";
                  if (value === "week") return "This Week";
                  if (value === "month") return "This Month";
                  return value;
                }}
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
                <MenuItem value="all">All Day</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
              </Select>
            </FormControl>
    </div>
       </div>
     
        <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
          <div className="overflow-x-auto hidden sm:block">
            <table className="w-full">
              <thead style={{ backgroundColor: "#E5F0FE" }}>
                <tr>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-black uppercase">Date</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-black uppercase">Action</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-black uppercase">Type</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-black uppercase">Qty</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-black uppercase">Reason</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {table.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-slate-800">{row.date}</td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-slate-800">{row.action}</td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-slate-800">{row.type}</td>
                    <td className={`px-4 lg:px-6 py-3 lg:py-4 text-sm font-semibold ${row.qty > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {row.qty > 0 ? `+${row.qty}` : row.qty}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-slate-800">{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden">
            <ul className="divide-y divide-slate-100">
              {table.map((row, index) => (
                <li key={index} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{row.action}</div>
                      <div className="text-xs text-slate-500 mt-1">{row.date}</div>
                    </div>
                    <div className={`text-sm font-bold ${row.qty > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {row.qty > 0 ? `+${row.qty}` : row.qty}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-xs text-slate-500">Type</div>
                    <div className="text-xs text-slate-800 font-medium">{row.type}</div>
                    
                    <div className="text-xs text-slate-500">Reason</div>
                    <div className="text-xs text-slate-800">{row.reason}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-6">
              Adjust Stock Quantity
            </h2>

            <div className="space-y-4">
              <div className="hidden sm:grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
                <span>Product</span>
                <span>Current Stock</span>
                <span>Adjustment Type</span>
                <span>Adjustment Qty</span>
              </div>

              <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-4 items-start sm:items-center text-sm border-b sm:border-0 pb-4 sm:pb-0">
                <span className="text-gray-800 font-medium block sm:inline">White Bottle</span>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 sm:hidden">Current Stock</label>
                  <input
                    type="number"
                    value="120"
                    readOnly
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 sm:hidden">Adjustment Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Increase</option>
                    <option>Decrease</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 sm:hidden">Adjustment Qty</label>
                  <input
                    type="number"
                    placeholder="Enter qty"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-4 items-start sm:items-center text-sm">
                <span className="text-gray-800 font-medium block sm:inline">Blue Bottle</span>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 sm:hidden">Current Stock</label>
                  <input
                    type="number"
                    value="85"
                    readOnly
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 sm:hidden">Adjustment Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Increase</option>
                    <option>Decrease</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 sm:hidden">Adjustment Qty</label>
                  <input
                    type="number"
                    placeholder="Enter qty"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Blue Bottle Row */}
              <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-4 items-start sm:items-center text-sm">
                <span className="text-gray-800 font-medium block sm:inline">Blue Bottle</span>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 sm:hidden">Current Stock</label>
                  <input
                    type="number"
                    value="85"
                    readOnly
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 sm:hidden">Adjustment Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Increase</option>
                    <option>Decrease</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 sm:hidden">Adjustment Qty</label>
                  <input
                    type="number"
                    placeholder="Enter qty"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 sm:mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setIsModalOpen(false);
            setIsConfirmModalOpen(true);
          }}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Confirm Adjustments
        </button>
      </div>
    </div>
  </div>
)}
  {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              {/* ⚠️ icon */}
              <AlertTriangle className="text-yellow-500 w-7 h-7" />
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              You are about to update inventory.
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Please double-check all quantities before confirming. These changes will be
              logged individually per product.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleConfirmAdjustments();
                  setIsConfirmModalOpen(false);
                }}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Confirm Adjustments
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryDashboard;