'use client';
import React, { useState, useEffect } from 'react';
import { Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  phone: string;
  dateJoined: string;
  status: "Active" | "Inactive";
  address: string;
  bottlesAtHome: string;
  paymentPending: number;
}

const sampleCustomers: Customer[] = [
  {
    id: 1,
    name: "Ali Khan",
    phone: "0300-1234567",
    dateJoined: "2024-08-01",
    status: "Active",
    address: "H12, St 5, Gulshan, Block A",
    bottlesAtHome: "2 Blue / 1 White",
    paymentPending: 500,
  },
  {
    id: 2,
    name: "Sara Ahmed",
    phone: "0312-9876543",
    dateJoined: "2024-07-15",
    status: "Inactive",
    address: "22, 10th Ave, Model Town",
    bottlesAtHome: "0 Blue / 3 White",
    paymentPending: 1200,
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    phone: "0321-1111111",
    dateJoined: "2024-06-20",
    status: "Active",
    address: "Block B, House 45, DHA Phase 2",
    bottlesAtHome: "3 Blue / 2 White",
    paymentPending: 800,
  },
  {
    id: 4,
    name: "Fatima Khan",
    phone: "0333-2222222",
    dateJoined: "2024-09-10",
    status: "Active",
    address: "Street 12, Model Town, Block C",
    bottlesAtHome: "1 Blue / 1 White",
    paymentPending: 450,
  },
  {
    id: 5,
    name: "Omar Sheikh",
    phone: "0345-3333333",
    dateJoined: "2024-05-15",
    status: "Inactive",
    address: "House 67, Ali Garden, Block D",
    bottlesAtHome: "4 Blue / 0 White",
    paymentPending: 1500,
  },
  {
    id: 6,
    name: "Zainab Ali",
    phone: "0301-4444444",
    dateJoined: "2024-04-22",
    status: "Active",
    address: "House 89, Johar Town, Block E",
    bottlesAtHome: "2 Blue / 2 White",
    paymentPending: 650,
  },
  {
    id: 7,
    name: "Hassan Sheikh",
    phone: "0315-5555555",
    dateJoined: "2024-03-18",
    status: "Active",
    address: "Flat 23, Green City, Block F",
    bottlesAtHome: "1 Blue / 3 White",
    paymentPending: 900,
  },
  {
    id: 8,
    name: "Aisha Khan",
    phone: "0322-6666666",
    dateJoined: "2024-02-14",
    status: "Inactive",
    address: "House 56, Canal View, Block G",
    bottlesAtHome: "0 Blue / 1 White",
    paymentPending: 300,
  },
  {
    id: 9,
    name: "Muhammad Ali",
    phone: "0334-7777777",
    dateJoined: "2024-01-10",
    status: "Active",
    address: "Street 34, Liberty, Block H",
    bottlesAtHome: "3 Blue / 1 White",
    paymentPending: 750,
  },
  {
    id: 10,
    name: "Khadija Ahmed",
    phone: "0346-8888888",
    dateJoined: "2023-12-25",
    status: "Active",
    address: "House 78, Garden Town, Block I",
    bottlesAtHome: "2 Blue / 2 White",
    paymentPending: 1100,
  },
  {
    id: 11,
    name: "Usman Malik",
    phone: "0302-9999999",
    dateJoined: "2023-11-30",
    status: "Inactive",
    address: "Flat 12, Defense, Block J",
    bottlesAtHome: "1 Blue / 0 White",
    paymentPending: 400,
  },
  {
    id: 12,
    name: "Rabia Hassan",
    phone: "0317-0000000",
    dateJoined: "2023-10-15",
    status: "Active",
    address: "House 90, Model Colony, Block K",
    bottlesAtHome: "4 Blue / 1 White",
    paymentPending: 1300,
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadCustomers = () => {
      setLoading(true);
      setTimeout(() => {
        setCustomers(sampleCustomers);
        setLoading(false);
      }, 1000);
    };

    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter ? customer.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const getStatusStyles = (status: string) => {
    const statusConfig: { [key: string]: string } = {
      'Active': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Inactive': 'bg-red-50 text-red-700 border-red-200',
    };
    
    return statusConfig[status] || statusConfig['Active'];
  };

  const handleViewDetails = (customerId: number) => {
    alert(`View details for customer ${customerId}`);
  };

  const handleToggleStatus = (customerId: number) => {
    setCustomers(customers.map(c => 
      c.id === customerId 
        ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' }
        : c
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="p-4 sm:p-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Customers</h1>
            <p className="text-sm sm:text-base text-slate-500">Manage and track all customer information</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 border border-slate-200">
            <div className="animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
              <div className="h-10 bg-slate-200 rounded w-full"></div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
            <div className="animate-pulse p-4 sm:p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-slate-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Customers</h1>
          <p className="text-sm sm:text-base text-slate-500">Manage and track all customer information</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="text-blue-600 text-xs sm:text-sm font-medium">Total Customers</div>
            <div className="text-xl sm:text-2xl font-bold text-blue-700">{customers.length}</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="text-green-600 text-xs sm:text-sm font-medium">Active Customers</div>
            <div className="text-xl sm:text-2xl font-bold text-green-700">
              {customers.filter(c => c.status === 'Active').length}
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <div className="text-red-600 text-xs sm:text-sm font-medium">Inactive Customers</div>
            <div className="text-xl sm:text-2xl font-bold text-red-700">
              {customers.filter(c => c.status === 'Inactive').length}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 border border-slate-200">
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Search Bar */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name / phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-white outline-none text-slate-700 placeholder-slate-400 text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 whitespace-nowrap">Status</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-slate-700 text-sm flex-1 sm:flex-none"
                style={{ backgroundColor: '#E5F0FE' }}
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* No Results Message */}
        {filteredCustomers.length === 0 && !loading && (
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-slate-200 text-center">
            <div className="text-slate-400 mb-2 text-sm">No customers found</div>
            <div className="text-xs sm:text-sm text-slate-500">
              Try adjusting your search criteria or filters
            </div>
          </div>
        )}

        {/* Customers Table - Desktop */}
        {filteredCustomers.length > 0 && (
          <div className="hidden sm:block bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ backgroundColor: '#E5F0FE' }}>
                  <tr>
                    <th className="text-left py-4 px-3 sm:px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">ID</th>
                    <th className="text-left py-4 px-3 sm:px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer</th>
                    <th className="text-left py-4 px-3 sm:px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Date Joined</th>
                    <th className="text-left py-4 px-3 sm:px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                    <th className="text-left py-4 px-3 sm:px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Address</th>
                    <th className="text-left py-4 px-3 sm:px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Bottles</th>
                    <th className="text-left py-4 px-3 sm:px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Payment</th>
                    <th className="text-left py-4 px-3 sm:px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedCustomers.map((customer, index) => (
                    <tr 
                      key={customer.id} 
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'} hover:bg-slate-50 transition-colors duration-200`}
                    >
                      <td className="py-4 px-3 sm:px-4 text-sm font-medium text-indigo-600">
                        #{customer.id}
                      </td>
                      <td className="py-4 px-3 sm:px-4">
                        <div>
                          <div className="text-sm font-medium text-slate-800">{customer.name}</div>
                          <div className="text-xs text-slate-500">{customer.phone}</div>
                        </div>
                      </td>
                      <td className="py-4 px-3 sm:px-4">
                        <div className="text-sm font-medium text-slate-800">{customer.dateJoined}</div>
                      </td>
                      <td className="py-4 px-3 sm:px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(customer.status)}`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="py-4 px-3 sm:px-4">
                        <div className="text-sm font-medium text-slate-800">{customer.address}</div>
                      </td>
                      <td className="py-4 px-3 sm:px-4 text-sm font-semibold text-slate-700">
                        {customer.bottlesAtHome}
                      </td>
                      <td className="py-4 px-3 sm:px-4 text-sm font-semibold text-red-600">
                        Rs {customer.paymentPending.toLocaleString()}
                      </td>
                      <td className="py-4 px-3 sm:px-4">
                        <div className="flex items-center gap-1 flex-wrap">
                          <button 
                            className="inline-flex items-center gap-1 px-2 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-lg whitespace-nowrap"
                            onClick={() => handleViewDetails(customer.id)}
                          >
                            <Eye className="h-3 w-3 flex-shrink-0" />
                            <span>View</span>
                          </button>
                          <button 
                            className={`inline-flex items-center gap-1 px-2 py-1.5 text-white text-xs font-medium rounded-md hover:scale-105 focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-lg whitespace-nowrap ${
                              customer.status === 'Active' 
                                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                                : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                            }`}
                            onClick={() => handleToggleStatus(customer.id)}
                          >
                            {customer.status === 'Active' ? 'Reject' : 'Approve'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers Cards - Mobile */}
        {filteredCustomers.length > 0 && (
          <div className="sm:hidden space-y-4">
            {paginatedCustomers.map((customer) => (
              <div key={customer.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-sm font-bold text-indigo-600">#{customer.id}</div>
                    <div className="text-base font-semibold text-slate-800">{customer.name}</div>
                    <div className="text-xs text-slate-500">{customer.phone}</div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyles(customer.status)}`}>
                    {customer.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Date Joined:</span>
                    <span className="font-medium text-slate-800">{customer.dateJoined}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Address:</span>
                    <span className="font-medium text-slate-800 text-right">{customer.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Bottles:</span>
                    <span className="font-semibold text-slate-700">{customer.bottlesAtHome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Payment:</span>
                    <span className="font-semibold text-red-600">Rs {customer.paymentPending.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 transition-all duration-200 shadow-sm"
                    onClick={() => handleViewDetails(customer.id)}
                  >
                    <Eye className="h-3 w-3" />
                    <span>View</span>
                  </button>
                  <button 
                    className={`flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-white text-xs font-medium rounded-md transition-all duration-200 shadow-sm ${
                      customer.status === 'Active' 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    onClick={() => handleToggleStatus(customer.id)}
                  >
                    {customer.status === 'Active' ? 'Reject' : 'Approve'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredCustomers.length > 0 && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 sm:p-6 border-t border-slate-100 bg-slate-50 rounded-b-xl mt-0 -mx-4 sm:-mx-6 sm:mt-0">
            <div className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} customers
            </div>
            <div className="flex items-center space-x-2 flex-wrap justify-center">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center px-2 sm:px-3 py-2 border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-500 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>
              
              <div className="flex items-center space-x-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 ${
                      currentPage === i + 1
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center px-2 sm:px-3 py-2 border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-500 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;