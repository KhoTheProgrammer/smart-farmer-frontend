// // Crops Page - Displays crop suitability recommendations
// // TASK 3.3: Person 3 will complete this page

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import LoadingSpinner from "../components/LoadingSpinner";

// function CropsPage() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // Check if location is selected
//     const villageId = localStorage.getItem("selectedVillage");

//     if (!villageId) {
//       setError("Please select a location first");
//       setLoading(false);
//       return;
//     }

//     // TODO: Person 3 - Fetch crop suitability data from API
//     // TODO: Person 3 - Display CropCard components for each crop

//     // Temporary: Remove this after implementing API call
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   }, []);

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return (
//       <div className="max-w-2xl mx-auto">
//         <div className="error-message">
//           <h3 className="font-semibold mb-2">⚠️ {error}</h3>
//           <button
//             onClick={() => navigate("/location")}
//             className="mt-4 btn-primary"
//           >
//             Select Location
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold text-[--color-primary] mb-4">
//         Crop Recommendations
//       </h1>
//       <p className="text-gray-600 mb-8">
//         Crops ranked by suitability for your location based on soil, elevation,
//         and climate data
//       </p>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* TODO: Person 3 - Map through crops and display CropCard for each */}
//         <div className="card text-center text-gray-500">
//           <p>Crop recommendations will be displayed here</p>
//           <p className="text-sm mt-2">(Person 3: Complete TASK 3.2 and 3.3)</p>
//         </div>
//       </div>

//       <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
//         <h3 className="font-semibold text-blue-900 mb-2">📝 For Person 3:</h3>
//         <ul className="text-sm text-blue-800 space-y-1">
//           <li>1. Complete API service functions (TASK 3.1)</li>
//           <li>2. Create CropCard component (TASK 3.2)</li>
//           <li>3. Fetch data in useEffect</li>
//           <li>4. Map through crops and display CropCard for each</li>
//           <li>5. Add visual indicators (colors, stars) based on suitability</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default CropsPage;


"use client"

// Crops Page - Displays crop suitability recommendations
// Completed by Person 3

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import CropCard from "../components/CropCard"
import { getCropSuitability } from "../services/api"
import type { CropSuitability } from "../types"

function CropsPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [crops, setCrops] = useState<CropSuitability[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [minScore, setMinScore] = useState(0)

  useEffect(() => {
    // Check if location is selected
    const villageId = localStorage.getItem("selectedVillage")

    if (!villageId) {
      setError("Please select a location first")
      setLoading(false)
      return
    }

    // Fetch crop suitability data from API
    const fetchCrops = async () => {
      try {
        setLoading(true)
        const data = await getCropSuitability(villageId)
        // Sort by suitability score (highest first)
        const sorted = data.sort((a, b) => b.suitability_score - a.suitability_score)
        setCrops(sorted)
        setError("")
      } catch (err) {
        console.error("Failed to fetch crop suitability:", err)
        setError("Failed to load crop recommendations. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchCrops()
  }, [])

  // Filter crops based on search term and minimum score
  const filteredCrops = crops.filter((crop) => {
    const matchesSearch =
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.name_chichewa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.scientific_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesScore = crop.suitability_score >= minScore
    return matchesSearch && matchesScore
  })

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
          <span className="text-2xl">⚠️</span> {error}
          <button
            onClick={() => navigate("/location")}
            className="mt-4 btn-primary block mx-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Select Location
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Crop Recommendations</h1>
        <p className="text-gray-600">
          Crops ranked by suitability for your location based on soil, elevation, and climate data
        </p>
      </div>

      {/* Search and filter controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Crops
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Minimum score filter */}
          <div className="md:w-64">
            <label htmlFor="minScore" className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Score: {minScore}%
            </label>
            <input
              id="minScore"
              type="range"
              min="0"
              max="100"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mt-3">
          Showing {filteredCrops.length} of {crops.length} crops
        </p>
      </div>

      {/* Crops grid */}
      {filteredCrops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <CropCard key={crop.crop_id} crop={crop} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No crops found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm("")
              setMinScore(0)
            }}
            className="mt-4 text-green-600 hover:text-green-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

export default CropsPage
