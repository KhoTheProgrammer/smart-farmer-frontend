// Location Page - Allows users to select their district and village
// TASK 1.4: Person 1 will complete this page

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LocationPage() {
  const navigate = useNavigate();
  const [locationSelected, setLocationSelected] = useState(false);

  // TODO: Person 1 - Import and use LocationSelector component here
  // TODO: Person 1 - Handle location selection

  const handleContinue = () => {
    if (locationSelected) {
      navigate("/calendar");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-[--color-primary] mb-4">
        Select Your Location
      </h1>
      <p className="text-gray-600 mb-8">
        Choose your district and village to get personalized farming advice for
        your area.
      </p>

      <div className="card">
        {/* TODO: Person 1 - Add LocationSelector component here */}
        <div className="text-center text-gray-500 py-8">
          <p>Location selector component will go here</p>
          <p className="text-sm mt-2">(Person 1: Complete TASK 1.3 first)</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!locationSelected}
          className="btn-primary"
        >
          Continue to Calendar →
        </button>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">📝 For Person 1:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>1. Complete LocationSelector component (TASK 1.3)</li>
          <li>2. Import it in this file</li>
          <li>3. Handle the onSelect callback</li>
          <li>4. Enable the Continue button when location is selected</li>
        </ul>
      </div>
    </div>
  );
}

export default LocationPage;
