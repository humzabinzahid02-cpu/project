'use client';
import React, { useState } from 'react';
import {
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import { Search } from 'lucide-react';

const mockDeliveries = [
  {
    id: 1,
    name: 'Imran',
    phone: '+923004879624',
    dateJoined: '12 Aug 2025',
    trip: 'Trip #2',
    bottlesInTransit: '16B / 24W',
    assignedColony: 'Ghalib City',
    status: 'Active' as const,
  },
  {
    id: 2,
    name: 'Ahmed Hassan',
    phone: '+923001234567',
    dateJoined: '15 Aug 2025',
    trip: '-',
    bottlesInTransit: '-',
    assignedColony: '-',
    status: 'On Leave' as const,
  },
  {
    id: 3,
    name: 'Ali Khan',
    phone: '+923009876543',
    dateJoined: '08 Aug 2025',
    trip: 'Trip #3',
    bottlesInTransit: '8B / 12W',
    assignedColony: 'Model Town',
    status: 'Active' as const,
  },
  {
    id: 4,
    name: 'Hassan Sheikh',
    phone: '+923005555444',
    dateJoined: '20 Aug 2025',
    trip: '-',
    bottlesInTransit: '-',
    assignedColony: '-',
    status: 'Active' as const,
  },
  {
    id: 5,
    name: 'Omar Malik',
    phone: '+923007777888',
    dateJoined: '05 Aug 2025',
    trip: 'Trip #1',
    bottlesInTransit: '10B / 35W',
    assignedColony: 'Al-Noor Garden',
    status: 'Active' as const,
  },
  {
    id: 6,
    name: 'Fahad Ahmad',
    phone: '+923003333222',
    dateJoined: '18 Aug 2025',
    trip: 'Trip #2',
    bottlesInTransit: '12B / 28W',
    assignedColony: 'Ali Garden',
    status: 'Active' as const,
  },
];

type DeliveryStatus = 'Active' | 'On Leave';

const DeliveriesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Active Today');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const filteredDeliveries = mockDeliveries.filter((delivery) => {
    if (!searchQuery.trim()) return true;

    const searchLower = searchQuery.toLowerCase().trim();
    return (
      delivery.name.toLowerCase().includes(searchLower) ||
      delivery.phone.toLowerCase().includes(searchLower) ||
      (delivery.assignedColony !== '-' &&
        delivery.assignedColony.toLowerCase().includes(searchLower))
    );
  });

  const getStatusChip = (status: DeliveryStatus) => {
    return (
      <Chip
        label={status}
        color={status === 'Active' ? 'success' : 'error'}
        size="small"
        sx={{ fontWeight: 500, fontSize: '0.75rem', height: '24px' }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* ---------- Header ---------- */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl  font-bold text-gray-900 mb-4">
            Deliveries
          </h1>

          <div className="flex justify-between">
            {/* Search */}
             <div className="w-90 relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 whitespace-nowrap">
                Sort by
              </span>
              <FormControl size="small" sx={{ minWidth: 130 }}>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  sx={{
                    backgroundColor: '#E5F0FE',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d1d5db' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#3b82f6' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3b82f6' },
                  }}
                >
                  <MenuItem value="Active Today">Active Today</MenuItem>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="On Leave">On Leave</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        {/* ---------- Desktop Table ---------- */}
        <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#E5F0FE] border-b">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Name / Phone
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Date Joined
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Trip # / Load
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Bottles In Transit
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Assigned Colony
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDeliveries.length > 0 ? (
                  filteredDeliveries.map((delivery, i) => (
                    <tr
                      key={delivery.id}
                      className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-5 0'} hover:bg-gray-50`}
                    >
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-gray-900">{delivery.name}</div>
                        <div className="text-xs text-gray-500">{delivery.phone}</div>
                      </td>
                      <td className="py-4 px-6 text-sm">{delivery.dateJoined}</td>
                      <td className="py-4 px-6 text-sm">{delivery.trip}</td>
                      <td className="py-4 px-6 text-sm font-medium">{delivery.bottlesInTransit}</td>
                      <td className="py-4 px-6 text-sm">{delivery.assignedColony}</td>
                      <td className="py-4 px-6">{getStatusChip(delivery.status)}</td>
                      <td className="py-4 px-6">
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: '#5B63E5',
                            '&:hover': { backgroundColor: '#2563eb' },
                            textTransform: 'none',
                            borderRadius: '6px',
                          }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      No deliveries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages} • Showing {filteredDeliveries.length} deliveries
            </span>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="small"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                sx={{ textTransform: 'none', borderRadius: '6px' }}
              >
                Prev
              </Button>
              <Button
                variant="contained"
                size="small"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                sx={{
                  backgroundColor: '#3b82f6',
                  '&:hover': { backgroundColor: '#2563eb' },
                  textTransform: 'none',
                  borderRadius: '6px',
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* ---------- Mobile Card View ---------- */}
        <div className="md:hidden space-y-4">
          {filteredDeliveries.length > 0 ? (
            filteredDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="bg-white border rounded-lg shadow-sm p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{delivery.name}</h3>
                    <p className="text-sm text-gray-500">{delivery.phone}</p>
                  </div>
                  {getStatusChip(delivery.status)}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date Joined:</span>
                    <span className="font-medium">{delivery.dateJoined}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trip / Load:</span>
                    <span className="font-medium">{delivery.trip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bottles:</span>
                    <span className="font-medium">{delivery.bottlesInTransit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Colony:</span>
                    <span className="font-medium">{delivery.assignedColony}</span>
                  </div>
                </div>

                <Button
                  fullWidth
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: '#3b82f6',
                    '&:hover': { backgroundColor: '#2563eb' },
                    textTransform: 'none',
                    borderRadius: '6px',
                  }}
                >
                  View Details
                </Button>
              </div>
            ))
          ) : (
            <div className="bg-white border rounded-lg p-8 text-center text-gray-500">
              No deliveries found
            </div>
          )}

          {/* Mobile Pagination */}
          <div className="bg-white border rounded-lg p-4 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <span>{filteredDeliveries.length} deliveries</span>
            </div>
            <div className="flex gap-2">
              <Button
                fullWidth
                variant="outlined"
                size="small"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                sx={{ textTransform: 'none', borderRadius: '6px' }}
              >
                Prev
              </Button>
              <Button
                fullWidth
                variant="contained"
                size="small"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                sx={{
                  backgroundColor: '#3b82f6',
                  '&:hover': { backgroundColor: '#2563eb' },
                  textTransform: 'none',
                  borderRadius: '6px',
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveriesPage;