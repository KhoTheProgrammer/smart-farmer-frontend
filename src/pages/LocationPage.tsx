import { useNavigate } from "react-router-dom";
import LocationSelector from "../components/LocationSelector";
import "./LocationPage.css";

function LocationPage() {
  const navigate = useNavigate();

  const handleLocationSelected = () => {
    // Navigate to calendar page after location is selected
    navigate("/calendar");
  };

  return (
    <div className="location-page">
      <div className="container">
        <h1>Select Your Location</h1>
        <p className="instructions">
          Choose your district and village to get personalized farming advice
          for your area.
        </p>

        <LocationSelector onLocationSelected={handleLocationSelected} />
      </div>
    </div>
  );
}

export default LocationPage;
