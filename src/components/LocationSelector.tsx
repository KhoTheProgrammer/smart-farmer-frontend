import { useState, useEffect } from "react";
import { getAllDistricts, getVillagesByDistrict } from "../services/api";
import type { District, Village } from "../types";
import LoadingSpinner from "./LoadingSpinner";

interface LocationSelectorProps {
  onLocationSelected: () => void;
}

function LocationSelector({ onLocationSelected }: LocationSelectorProps) {
  const [districts, setDistricts] = useState<District[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch districts when component mounts
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getAllDistricts();
        setDistricts(data);
      } catch (err) {
        setError("Failed to load districts. Please check your connection.");
        console.error("Error fetching districts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDistricts();
  }, []);

  // Fetch villages when district is selected
  useEffect(() => {
    if (!selectedDistrict) {
      setVillages([]);
      setSelectedVillage("");
      return;
    }

    const fetchVillages = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getVillagesByDistrict(selectedDistrict);
        setVillages(data);
      } catch (err) {
        setError("Failed to load villages. Please try again.");
        console.error("Error fetching villages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVillages();
  }, [selectedDistrict]);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedVillage(""); // Reset village selection
  };

  const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVillage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDistrict || !selectedVillage) {
      setError("Please select both district and village");
      return;
    }

    // Find selected items
    const district = districts.find((d) => d.id === selectedDistrict);
    const village = villages.find((v) => v.id === selectedVillage);

    if (!district || !village) {
      setError("Invalid selection. Please try again.");
      return;
    }

    // Save to localStorage
    localStorage.setItem("selectedDistrict", selectedDistrict);
    localStorage.setItem("selectedVillage", selectedVillage);
    localStorage.setItem("selectedDistrictName", district.name);
    localStorage.setItem("selectedVillageName", village.name);

    // Notify parent
    onLocationSelected();
  };

  return (
    <div className="location-selector">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="district" className="form-label">
            <span className="label-icon">📍</span>
            Select District
          </label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={loading || districts.length === 0}
            className="location-select"
            required
          >
            <option value="">-- Choose a district --</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name} ({district.name_chichewa})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="village" className="form-label">
            <span className="label-icon">🏘️</span>
            Select Village
          </label>
          <select
            id="village"
            value={selectedVillage}
            onChange={handleVillageChange}
            disabled={!selectedDistrict || loading || villages.length === 0}
            className="location-select"
            required
          >
            <option value="">
              {selectedDistrict
                ? "-- Choose a village --"
                : "-- Select a district first --"}
            </option>
            {villages.map((village) => (
              <option key={village.id} value={village.id}>
                {village.name} ({village.name_chichewa})
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="loading-container">
            <LoadingSpinner />
            <span className="loading-text">Loading...</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!selectedDistrict || !selectedVillage || loading}
          className="submit-button"
        >
          {loading ? "Loading..." : "Continue to Calendar →"}
        </button>
      </form>
    </div>
  );
}

export default LocationSelector;
