"use client"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

type Trip = {
  id: number
  rider: string
  tripLoad: string
  startTime: string
  colony: string
  orderCustomers: number
  totalBottles: number
  bottlesDelivered: number
  status: "Not Started" | "Started" | "Completed"
  phone?: string
  details?: string
  bottles?: string
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
    details: "All deliveries completed successfully",
    bottles: "80 Blue, 50 White"
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
    status: "Completed",
    phone: "+923009876543",
    details: "4 bottles pending delivery",
    bottles: "80 Blue, 42 White"
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
    status: "Completed",
    phone: "+923005555555",
    details: "Trip just started, deliveries in progress",
    bottles: "80 Blue, 42 White"
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
    details: "Awaiting rider to start the trip",
    bottles: "80 Blue, 50 White"
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
    details: "14 bottles remaining to be delivered",
    bottles: "80 Blue, 50 White"
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
    details: "All orders delivered successfully",
    bottles: "80 Blue, 50 White"
  },
]

export default function TripDetailsPage() {
  const router = useRouter()
  const { id } = useParams()
  const trip = mockTrips.find((t) => t.id === Number(id))

  if (!trip) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p>Trip not found.</p>
        <button onClick={() => router.back()} className="mt-4 text-indigo-600 hover:underline">
          ← Back
        </button>
      </div>
    )
  }

  const getStatusBadgeColor = (status: Trip["status"]) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-100 text-gray-700"
      case "Started":
        return "bg-yellow-100 text-yellow-700"
      case "Completed":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="bg-white min-h-screen p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Trip Details</h1>
        </div>

        {/* Rider Info */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-gray-600">Rider</p>
              <p className="text-lg font-semibold text-gray-900">{trip.rider}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Phone no</p>
              <p className="text-lg font-semibold text-gray-900">{trip.phone}</p>
            </div>
          </div>
        </div>

        {/* Trips Today Section */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Trips Today</h2>

        {/* Trip Cards */}
        <div className="space-y-4">
          {[trip].map((t, idx) => (
            <div key={t.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Trip Header */}
              <div className="bg-white px-6 py-3 flex justify-between items-center border-b border-gray-200">
                <p className="text-sm font-medium text-gray-700">Trip/Load no</p>
                <p className="text-sm font-semibold text-gray-900">
                  {String(idx + 1).padStart(2, "0")}
                </p>
              </div>

              {/* Trip Details */}
              <div className="px-6 py-4 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <p className="text-sm text-gray-600">Trip ID</p>
                  <p className="text-sm font-medium text-gray-900">{t.tripLoad}</p>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <p className="text-sm text-gray-600">Trip start time</p>
                  <p className="text-sm font-medium text-gray-900">{t.startTime}</p>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <p className="text-sm text-gray-600">Colony</p>
                  <p className="text-sm font-medium text-gray-900">{t.colony}</p>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <p className="text-sm text-gray-600">Order Customers</p>
                  <p className="text-sm font-medium text-gray-900">{t.orderCustomers}</p>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <p className="text-sm text-gray-600">Total Bottles</p>
                  <p className="text-sm font-medium text-gray-900">{t.bottles}</p>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <p className="text-sm text-gray-600">Bottles Delivered</p>
                  <p className="text-sm font-medium text-gray-900">
                    {t.bottlesDelivered} Blue, 50 White
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                      t.status,
                    )}`}
                  >
                    {t.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}