import React, { useState } from "react";

interface Bottle {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  color: string;
  isEditing: boolean;
}
export default function BottlePrices() {
  const [bottles, setBottles] = useState<Bottle[]>([
    {
      id: 1,
      name: "Dispenser Gallon (Blue)",
      description: "For water dispensers",
      price: 100,
      image: "/blue.png",
      color: "bg-white",
      isEditing: false,
    },
    {
      id: 2,
      name: "Normal Gallon (White)",
      description: "For normal use",
      price: 50,
      image: "/white.png",
      color: "bg-gray-100",
      isEditing: false,
    },
  ]);

  const [editValues, setEditValues] = useState<Record<number, number>>({});

  const handleEdit = (id: number): void => {
    setBottles((prev) =>
      prev.map((bottle) =>
        bottle.id === id ? { ...bottle, isEditing: true } : bottle
      )
    );
    const bottle = bottles.find((b) => b.id === id);
    if (bottle) {
      setEditValues((prev) => ({
        ...prev,
        [id]: bottle.price,
      }));
    }
  };

  const handleSave = (id: number): void => {
    setBottles((prev) =>
      prev.map((bottle) =>
        bottle.id === id
          ? { ...bottle, price: editValues[id], isEditing: false }
          : bottle
      )
    );
  };

  const handleCancel = (id: number): void => {
    setBottles((prev) =>
      prev.map((bottle) =>
        bottle.id === id ? { ...bottle, isEditing: false } : bottle
      )
    );
    setEditValues((prev) => {
      const newValues = { ...prev };
      delete newValues[id];
      return newValues;
    });
  };

  const handlePriceChange = (id: number, value: string): void => {
    const numValue = parseFloat(value) || 0;
    setEditValues((prev) => ({
      ...prev,
      [id]: numValue,
    }));
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 text-center sm:text-left">
        Bottle Prices
      </h1>

      <div className="space-y-4 sm:space-y-5">
        {bottles.map((bottle) => (
          <div
            key={bottle.id}
            className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
              {/* Bottle Info Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 w-full">
                {/* Bottle Image */}
                <div
                  className={`${bottle.color} w-24 h-24 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center mx-auto sm:mx-0`}
                >
                  <img
                    src={bottle.image}
                    alt={bottle.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Bottle Text Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                    {bottle.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {bottle.description}
                  </p>

                  {/* Price Section */}
                  <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-sm text-gray-600">Rs.</span>
                    {bottle.isEditing ? (
                      <input
                        type="number"
                        value={editValues[bottle.id] || ""}
                        onChange={(e) =>
                          handlePriceChange(bottle.id, e.target.value)
                        }
                        className="w-24 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      />
                    ) : (
                      <span className="text-xl sm:text-2xl font-bold text-gray-800">
                        {bottle.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
                {bottle.isEditing ? (
                  <>
                    <button
                      onClick={() => handleSave(bottle.id)}
                      className="px-3 py-2 sm:px-4 bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-medium rounded-lg transition"
                    >
                      Update & Save
                    </button>
                    <button
                      onClick={() => handleCancel(bottle.id)}
                      className="px-3 py-2 sm:px-4 bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium rounded-lg border border-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(bottle.id)}
                    className="px-6 sm:px-8 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
