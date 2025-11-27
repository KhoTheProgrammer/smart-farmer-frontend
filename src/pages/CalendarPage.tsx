
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
      <div className="calendar-page-header">
        <h1 className="text-3xl font-bold text-[--color-primary] mb-4">
          🌱 Planting Calendar
        </h1>
        <p className="calendar-page-description text-gray-600 mb-8">
          Recommended planting dates based on 10-year rainfall analysis and
          local climate patterns
        </p>
      </div>

      {calendar && <CalendarCard calendar={calendar} />}

      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <span>💡</span> Understanding Your Planting Calendar
        </h3>
        <ul className="text-sm text-blue-800 space-y-2">
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
              <strong>Location-Specific:</strong> This calendar is tailored to
              your village's unique climate conditions
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

      <div className="mt-8 flex gap-4 justify-center">
        <button
          onClick={() => navigate("/crops")}
          className="btn-primary"
        >
          View Crop Recommendations →
        </button>
        <button
          onClick={() => navigate("/location")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Change Location
        </button>
      </div>
    </div>
  );
}

export default CalendarPage;

