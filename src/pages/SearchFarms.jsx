import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchFarms() {
  const [address, setAddress] = useState('');
  const [useLocation, setUseLocation] = useState(false);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!useLocation && !address.trim()) {
      setError("Please enter an address or enable location.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Mock response
      setFarms([
        { id: 1, name: "Green Valley Farms", distance: "3.2 km", type: "Organic Vegetables" },
        { id: 2, name: "Sunny Hill Dairy", distance: "5.1 km", type: "Dairy Products" },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Find Nearby Farms</h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={useLocation}
            onChange={(e) => setUseLocation(e.target.checked)}
            className="rounded text-green-600 focus:ring-green-500"
          />
          <span>Use my current location</span>
        </label>

        {!useLocation && (
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Search
            </button>
          </div>
        )}

        {useLocation && (
          <button
            onClick={handleSearch}
            className="w-full py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition-colors"
          >
            Find Farms Near Me
          </button>
        )}
      </div>

      {loading && <p>Loading farms...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {farms.map((farm) => (
          <div key={farm.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{farm.name}</h3>
            <p>Type: {farm.type}</p>
            <p>Distance: {farm.distance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
