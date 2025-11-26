// Header component - navigation bar shown on all pages
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  useEffect(() => {
    // Get selected location from localStorage
    const villageName = localStorage.getItem("selectedVillageName");
    const districtName = localStorage.getItem("selectedDistrictName");

    if (villageName && districtName) {
      setSelectedLocation(`${villageName}, ${districtName}`);
    }
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className="text-white shadow-lg"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo/Title */}
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-bold hover:text-green-200 transition-colors"
            >
              🌾 Mlimi Wanzeru
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-2 md:gap-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/") ? "bg-white font-semibold" : "hover:opacity-80"
              }`}
              style={
                isActive("/") ? { color: "var(--color-primary)" } : undefined
              }
            >
              Home
            </Link>
            <Link
              to="/location"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/location")
                  ? "bg-white font-semibold"
                  : "hover:opacity-80"
              }`}
              style={
                isActive("/location")
                  ? { color: "var(--color-primary)" }
                  : undefined
              }
            >
              Location
            </Link>
            <Link
              to="/calendar"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/calendar")
                  ? "bg-white font-semibold"
                  : "hover:opacity-80"
              }`}
              style={
                isActive("/calendar")
                  ? { color: "var(--color-primary)" }
                  : undefined
              }
            >
              Calendar
            </Link>
            <Link
              to="/crops"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/crops")
                  ? "bg-white font-semibold"
                  : "hover:opacity-80"
              }`}
              style={
                isActive("/crops")
                  ? { color: "var(--color-primary)" }
                  : undefined
              }
            >
              Crops
            </Link>
          </nav>

          {/* Selected Location Display */}
          {selectedLocation && (
            <div
              className="text-sm px-4 py-2 rounded-lg"
              style={{ backgroundColor: "var(--color-primary-light)" }}
            >
              📍 {selectedLocation}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
