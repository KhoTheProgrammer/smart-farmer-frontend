import { useState, useEffect } from "react";
import { getAllDistricts, getVillagesByDistrict } from "../services/api";
import type { District, Village } from "../types";
import LoadingSpinner from "./LoadingSpinner";
import { useLanguage } from "../contexts/LanguageContext";

interface LocationSelectorProps {
  onLocationSelected: () => void;
}

function LocationSelector({ onLocationSelected }: LocationSelectorProps) {
  const { t, language } = useLanguage();
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
        setError(t("location.failedDistricts"));
        console.error("Error fetching districts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDistricts();
  }, [t]);

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
        setError(t("location.failedVillages"));
        console.error("Error fetching villages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVillages();
  }, [selectedDistrict, t]);

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
      setError(t("location.selectBoth"));
      return;
    }

    // Find selected items
    const district = districts.find((d) => d.id === selectedDistrict);
    const village = villages.find((v) => v.id === selectedVillage);

    if (!district || !village) {
      setError(t("location.invalidSelection"));
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
            {t("location.district")}
          </label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={loading || districts.length === 0}
            className="location-select"
            required
          >
            <option value="">-- {t("location.district")} --</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {language === "ny" ? district.name_chichewa : district.name} (
                {language === "ny" ? district.name : district.name_chichewa})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="village" className="form-label">
            <span className="label-icon">🏘️</span>
            {t("location.village")}
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
                ? `-- ${t("location.village")} --`
                : `-- ${t("location.selectDistrict")} --`}
            </option>
            {villages.map((village) => (
              <option key={village.id} value={village.id}>
                {language === "ny" ? village.name_chichewa : village.name} (
                {language === "ny" ? village.name : village.name_chichewa})
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="loading-container">
            <LoadingSpinner />
            <span className="loading-text">{t("common.loading")}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!selectedDistrict || !selectedVillage || loading}
          className="submit-button"
        >
          {loading ? t("common.loading") : `${t("location.continue")} →`}
        </button>
      </form>
    </div>
  );
}

export default LocationSelector;
