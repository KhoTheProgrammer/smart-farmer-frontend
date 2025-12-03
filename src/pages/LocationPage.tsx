import { useNavigate } from "react-router-dom";
import LocationSelector from "../components/LocationSelector";
import { useLanguage } from "../contexts/LanguageContext";
import "./LocationPage.css";

function LocationPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLocationSelected = () => {
    // Navigate to calendar page after location is selected
    navigate("/calendar");
  };

  return (
    <div className="location-page">
      <div className="container">
        <h1>{t("location.title")}</h1>
        <p className="instructions">{t("location.desc")}</p>

        <LocationSelector onLocationSelected={handleLocationSelected} />
      </div>
    </div>
  );
}

export default LocationPage;
