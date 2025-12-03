import { useLanguage } from "../contexts/LanguageContext";

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          language === "en"
            ? "bg-white text-[--color-primary] shadow-sm font-semibold"
            : "text-white/90 hover:bg-white/10"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("ny")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          language === "ny"
            ? "bg-white text-[--color-primary] shadow-sm font-semibold"
            : "text-white/90 hover:bg-white/10"
        }`}
        aria-label="Switch to Chichewa"
      >
        NY
      </button>
    </div>
  );
}

export default LanguageSwitcher;