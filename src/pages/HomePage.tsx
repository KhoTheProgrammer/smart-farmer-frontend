// Home Page - Welcome screen for the Smart Farmer application
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

function HomePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[--color-primary] mb-4">
          {t("home.title")}
        </h1>
        <p className="text-xl text-gray-600">{t("home.subtitle")}</p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div
          className="card text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
          onClick={() => navigate("/location")}
        >
          <div className="text-4xl mb-4">📍</div>
          <h3 className="text-xl font-semibold text-[--color-primary] mb-2">
            {t("home.selectLocation.title")}
          </h3>
          <p className="text-gray-600">{t("home.selectLocation.desc")}</p>
        </div>

        <div
          className="card text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
          onClick={() => navigate("/calendar")}
        >
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-[--color-primary] mb-2">
            {t("home.calendar.title")}
          </h3>
          <p className="text-gray-600">{t("home.calendar.desc")}</p>
        </div>

        <div
          className="card text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
          onClick={() => navigate("/crops")}
        >
          <div className="text-4xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-[--color-primary] mb-2">
            {t("home.crops.title")}
          </h3>
          <p className="text-gray-600">{t("home.crops.desc")}</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="card bg-gradient-to-r from-[--color-primary] to-[--color-primary-light] text-white text-center">
        <h2 className="text-2xl font-bold mb-4">{t("home.cta.title")}</h2>
        <p className="mb-6 text-lg">{t("home.cta.desc")}</p>
        <button
          type="button"
          onClick={() => navigate("/location")}
          className="bg-white text-[--color-primary] hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
        >
          {t("home.cta.button")} →
        </button>
      </div>

      {/* Info Section */}
      <div className="mt-12 text-center text-gray-600">
        <p className="mb-2">{t("home.info.title")}</p>
        <ul className="inline-block text-left space-y-1">
          <li>✓ {t("home.info.rainfall")}</li>
          <li>✓ {t("home.info.soil")}</li>
          <li>✓ {t("home.info.elevation")}</li>
          <li>✓ {t("home.info.requirements")}</li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
