import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import CalendarCard from "../components/CalendarCard";
import { getPlantingCalendar } from "../services/api";
import type { PlantingCalendar } from "../types";
import "../styles/CalendarPage.css";

function CalendarPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [calendar, setCalendar] = useState<PlantingCalendar | null>(null);

  useEffect(() => {
    const villageId = localStorage.getItem("selectedVillage");

    if (!villageId) {
      setError("Please select a location first");
      setLoading(false);
      return;
    }

    const fetchCalendar = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getPlantingCalendar(villageId);
        setCalendar(data);
      } catch (err) {
        console.error("Error fetching planting calendar:", err);
        setError(
          "Failed to load planting calendar. Please try again later or select a different location."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 max-sm:px-2">
        <div className="error-message">
          <h3 className="font-semibold mb-2 max-sm:text-sm">⚠️ {error}</h3>
          <button
            onClick={() => navigate("/location")}
            className="mt-4 btn-primary max-sm:w-full max-sm:text-sm"
          >
            Select Location
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 max-sm:px-2">
      <div className="calendar-page-header max-sm:mb-6">
        <h1 className="text-3xl font-bold text-[--color-primary] mb-4 max-sm:text-2xl max-sm:mb-3">
          🌱 Maize Planting Calendar
        </h1>
        <p className="calendar-page-description text-gray-600 mb-8 max-sm:text-sm max-sm:mb-6">
          Recommended maize planting dates based on 10-year rainfall analysis
          and local climate patterns
        </p>
      </div>

      {calendar && <CalendarCard calendar={calendar} />}

      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200 max-sm:p-4 max-sm:mt-6">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2 max-sm:text-sm">
          <span>💡</span> Understanding Your Planting Calendar
        </h3>
        <ul className="text-sm text-blue-800 space-y-2 max-sm:text-xs max-sm:space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>
              <strong>Maize-Specific:</strong> This calendar is optimized for
              maize planting in your village
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>
              <strong>Planting Window:</strong> The optimal period to plant
              based on historical rainfall patterns
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>
              <strong>Confidence Level:</strong> How reliable this
              recommendation is based on data quality and consistency
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>
              <strong>Best Practice:</strong> Plant at the beginning of the
              window for best results
            </span>
          </li>
        </ul>
      </div>

      <div className="mt-8 flex gap-4 justify-center max-sm:flex-col max-sm:mt-6 max-sm:gap-3">
        <button
          onClick={() => navigate("/crops")}
          className="btn-primary max-sm:w-full max-sm:text-sm max-sm:py-2.5"
        >
          View Crop Recommendations →
        </button>
        <button
          onClick={() => navigate("/location")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200 max-sm:w-full max-sm:text-sm max-sm:py-2.5 max-sm:px-4"
        >
          Change Location
        </button>
      </div>
    </div>
  );
}

export default CalendarPage;
