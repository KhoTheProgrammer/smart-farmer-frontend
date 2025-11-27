// Home Page - Welcome screen for the Smart Farmer application
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[--color-primary] mb-4">
          Welcome to Mlimi Wanzeru
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Smart Farming Advisory for Malawi
        </p>
        <p className="text-lg text-gray-500">
          Ulangizi Wanzeru wa Ulimi ku Malawi
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div
          className="card text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
          onClick={() => navigate("/location")}
        >
          <div className="text-4xl mb-4">📍</div>
          <h3 className="text-xl font-semibold text-[--color-primary] mb-2">
            Select Location
          </h3>
          <p className="text-gray-600">
            Choose your district and village to get personalized advice
          </p>
        </div>

        <div
          className="card text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
          onClick={() => navigate("/calendar")}
        >
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-[--color-primary] mb-2">
            Planting Calendar
          </h3>
          <p className="text-gray-600">
            Know the best time to plant your crops based on rainfall data
          </p>
        </div>

        <div
          className="card text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
          onClick={() => navigate("/crops")}
        >
          <div className="text-4xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-[--color-primary] mb-2">
            Crop Recommendations
          </h3>
          <p className="text-gray-600">
            Discover which crops grow best in your area
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="card bg-gradient-to-r from-[--color-primary] to-[--color-primary-light] text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6 text-lg">
          Select your location to receive personalized farming advice
        </p>
        <button
          onClick={() => navigate("/location")}
          className="bg-white text-[--color-primary] hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
        >
          Get Started →
        </button>
      </div>

      {/* Info Section */}
      <div className="mt-12 text-center text-gray-600">
        <p className="mb-2">
          This application provides agricultural advisory services based on:
        </p>
        <ul className="inline-block text-left space-y-1">
          <li>✓ 10-year rainfall analysis</li>
          <li>✓ Soil composition data</li>
          <li>✓ Elevation and climate information</li>
          <li>✓ Crop-specific requirements</li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
