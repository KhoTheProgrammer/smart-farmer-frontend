// Crops Page - Displays crop suitability recommendations
// TASK 3.3: Person 3 will complete this page

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function CropsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if location is selected
    const villageId = localStorage.getItem("selectedVillage");

    if (!villageId) {
      setError("Please select a location first");
      setLoading(false);
      return;
    }

    // TODO: Person 3 - Fetch crop suitability data from API
    // TODO: Person 3 - Display CropCard components for each crop

    // Temporary: Remove this after implementing API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="error-message">
          <h3 className="font-semibold mb-2">⚠️ {error}</h3>
          <button
            onClick={() => navigate("/location")}
            className="mt-4 btn-primary"
          >
            Select Location
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-[--color-primary] mb-4">
        Crop Recommendations
      </h1>
      <p className="text-gray-600 mb-8">
        Crops ranked by suitability for your location based on soil, elevation,
        and climate data
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TODO: Person 3 - Map through crops and display CropCard for each */}
        <div className="card text-center text-gray-500">
          <p>Crop recommendations will be displayed here</p>
          <p className="text-sm mt-2">(Person 3: Complete TASK 3.2 and 3.3)</p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">📝 For Person 3:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>1. Complete API service functions (TASK 3.1)</li>
          <li>2. Create CropCard component (TASK 3.2)</li>
          <li>3. Fetch data in useEffect</li>
          <li>4. Map through crops and display CropCard for each</li>
          <li>5. Add visual indicators (colors, stars) based on suitability</li>
        </ul>
      </div>
    </div>
  );
}

export default CropsPage;
