// Calendar Page - Displays planting calendar for selected location
// TASK 2.3: Person 2 will complete this page

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function CalendarPage() {
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

    // TODO: Person 2 - Fetch planting calendar data from API
    // TODO: Person 2 - Display CalendarCard component with data

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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[--color-primary] mb-4">
        Planting Calendar
      </h1>
      <p className="text-gray-600 mb-8">
        Recommended planting dates based on 10-year rainfall analysis
      </p>

      <div className="card">
        {/* TODO: Person 2 - Display CalendarCard component here */}
        <div className="text-center text-gray-500 py-8">
          <p>Calendar data will be displayed here</p>
          <p className="text-sm mt-2">(Person 2: Complete TASK 2.2 and 2.3)</p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">📝 For Person 2:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>1. Complete API service functions (TASK 2.1)</li>
          <li>2. Create CalendarCard component (TASK 2.2)</li>
          <li>3. Fetch data in useEffect</li>
          <li>4. Display CalendarCard with fetched data</li>
          <li>5. Handle loading and error states</li>
        </ul>
      </div>
    </div>
  );
}

export default CalendarPage;
