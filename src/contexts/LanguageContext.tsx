import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "en" | "ny"; // en = English, ny = Chichewa (Nyanja)

interface Translations {
  [key: string]: {
    en: string;
    ny: string;
  };
}

const translations: Translations = {
  // Navigation
  "nav.home": { en: "Home", ny: "Poyambira" },
  "nav.location": { en: "Location", ny: "Malo" },
  "nav.calendar": { en: "Calendar", ny: "Kalendala" },
  "nav.crops": { en: "Crops", ny: "Mbewu" },

  // Home Page
  "home.title": {
    en: "Welcome to Mlimi Wanzeru",
    ny: "Takulandirani ku Mlimi Wanzeru",
  },
  "home.subtitle": {
    en: "Smart Farming Advisory for Malawi",
    ny: "Ulangizi Wanzeru wa Ulimi ku Malawi",
  },
  "home.selectLocation.title": { en: "Select Location", ny: "Sankhani Malo" },
  "home.selectLocation.desc": {
    en: "Choose your district and village to get personalized advice",
    ny: "Sankhani boma ndi mudzi wanu kuti mulandire malangizo",
  },
  "home.calendar.title": {
    en: "Planting Calendar",
    ny: "Kalendala ya Kubzala",
  },
  "home.calendar.desc": {
    en: "Know the best time to plant your crops based on rainfall data",
    ny: "Dziwani nthawi yabwino yobzalira mbewu zanu malinga ndi mvula",
  },
  "home.crops.title": { en: "Crop Recommendations", ny: "Malangizo a Mbewu" },
  "home.crops.desc": {
    en: "Discover which crops grow best in your area",
    ny: "Dziwani mbewu zomwe zimamera bwino m'dera lanu",
  },
  "home.cta.title": {
    en: "Ready to Get Started?",
    ny: "Mwakhala Okonzeka Kuyamba?",
  },
  "home.cta.desc": {
    en: "Select your location to receive personalized farming advice",
    ny: "Sankhani malo anu kuti mulandire malangizo a ulimi",
  },
  "home.cta.button": { en: "Get Started", ny: "Yambani" },
  "home.info.title": {
    en: "This application provides agricultural advisory services based on:",
    ny: "Pulogalamu iyi imapereka malangizo a ulimi malinga ndi:",
  },
  "home.info.rainfall": {
    en: "10-year rainfall analysis",
    ny: "Kusanthula mvula ya zaka 10",
  },
  "home.info.soil": {
    en: "Soil composition data",
    ny: "Chidziwitso cha nthaka",
  },
  "home.info.elevation": {
    en: "Elevation and climate information",
    ny: "Chidziwitso cha kutalika ndi nyengo",
  },
  "home.info.requirements": {
    en: "Crop-specific requirements",
    ny: "Zofunikira za mbewu",
  },

  // Calendar Page
  "calendar.title": {
    en: "Maize Planting Calendar",
    ny: "Kalendala ya Kubzala Chimanga",
  },
  "calendar.desc": {
    en: "Recommended maize planting dates based on 10-year rainfall analysis and local climate patterns",
    ny: "Masiku obzalira chimanga malinga ndi kusanthula mvula ya zaka 10 ndi nyengo ya m'derali",
  },
  "calendar.understanding.title": {
    en: "Understanding Your Planting Calendar",
    ny: "Kumvetsa Kalendala Yanu Yobzalira",
  },
  "calendar.understanding.specific": {
    en: "Maize-Specific: This calendar is optimized for maize planting in your village",
    ny: "Ya Chimanga: Kalendala iyi ndi yabwino kwambiri pobzala chimanga m'mudzi wanu",
  },
  "calendar.understanding.window": {
    en: "Planting Window: The optimal period to plant based on historical rainfall patterns",
    ny: "Nthawi Yobzalira: Nthawi yabwino yobzalira malinga ndi mbiri ya mvula",
  },
  "calendar.understanding.confidence": {
    en: "Confidence Level: How reliable this recommendation is based on data quality and consistency",
    ny: "Kudalira: Momwe malangizowa ali odalirika malinga ndi chidziwitso",
  },
  "calendar.understanding.practice": {
    en: "Best Practice: Plant at the beginning of the window for best results",
    ny: "Njira Yabwino: Bzalani kumayambiriro kwa nthawi yobzalira kuti mupeze zotsatira zabwino",
  },
  "calendar.viewCrops": {
    en: "View Crop Recommendations",
    ny: "Onani Malangizo a Mbewu",
  },
  "calendar.changeLocation": { en: "Change Location", ny: "Sinthani Malo" },

  // Crops Page
  "crops.title": { en: "Crop Recommendations", ny: "Malangizo a Mbewu" },
  "crops.desc": {
    en: "Crops ranked by suitability for your location based on soil, elevation, and climate data",
    ny: "Mbewu zosankhidwa malinga ndi nthaka, kutalika, ndi nyengo ya m'dera lanu",
  },
  "crops.search": { en: "Search Crops", ny: "Fufuzani Mbewu" },
  "crops.searchPlaceholder": {
    en: "Search by name...",
    ny: "Fufuzani ndi dzina...",
  },
  "crops.minScore": { en: "Minimum Score", ny: "Mtengo Wochepa" },
  "crops.showing": { en: "Showing", ny: "Kuwonetsa" },
  "crops.of": { en: "of", ny: "mwa" },
  "crops.cropsText": { en: "crops", ny: "mbewu" },
  "crops.noResults": {
    en: "No crops found matching your criteria.",
    ny: "Palibe mbewu zomwe zapezeka.",
  },
  "crops.clearFilters": { en: "Clear filters", ny: "Chotsani zosefera" },
  "crops.suitability": { en: "Suitability", ny: "Kuyenera" },
  "crops.scientificName": { en: "Scientific Name", ny: "Dzina la Sayansi" },
  "crops.category": { en: "Category", ny: "Gulu" },
  "crops.growingSeason": { en: "Growing Season", ny: "Nyengo Yolimira" },
  "crops.days": { en: "days", ny: "masiku" },

  // Common
  "common.loading": { en: "Loading...", ny: "Kutsitsa..." },
  "common.error": { en: "Error", ny: "Cholakwika" },
  "common.selectLocation": { en: "Select Location", ny: "Sankhani Malo" },
  "common.pleaseSelectLocation": {
    en: "Please select a location first",
    ny: "Chonde sankhani malo poyamba",
  },
  "common.failed": { en: "Failed to load", ny: "Zalephera kutsitsa" },

  // CropCard
  "cropCard.highlySuitable": { en: "Highly Suitable", ny: "Yoyenera Kwambiri" },
  "cropCard.suitable": { en: "Suitable", ny: "Yoyenera" },
  "cropCard.moderatelySuitable": {
    en: "Moderately Suitable",
    ny: "Yoyenera Pang'ono",
  },
  "cropCard.notSuitable": { en: "Not Suitable", ny: "Siyoyenera" },
  "cropCard.phRange": { en: "pH Range", ny: "Kuchuluka kwa pH" },
  "cropCard.elevation": { en: "Elevation", ny: "Kutalika" },

  // CalendarCard
  "calendarCard.general": { en: "General", ny: "Zonse" },
  "calendarCard.plantingCalendar": {
    en: "Planting Calendar",
    ny: "Kalendala ya Kubzala",
  },
  "calendarCard.plantingWindow": {
    en: "Planting Window",
    ny: "Nthawi Yobzalira",
  },
  "calendarCard.startDate": { en: "Start Date", ny: "Tsiku Loyamba" },
  "calendarCard.endDate": { en: "End Date", ny: "Tsiku Lomaliza" },
  "calendarCard.daysWindow": {
    en: "days planting window",
    ny: "masiku obzalira",
  },
  "calendarCard.confidenceLevel": { en: "Confidence Level", ny: "Kudalira" },
  "calendarCard.highConfidence": {
    en: "High Confidence",
    ny: "Kudalira Kwambiri",
  },
  "calendarCard.mediumConfidence": {
    en: "Medium Confidence",
    ny: "Kudalira Pakati",
  },
  "calendarCard.lowConfidence": {
    en: "Low Confidence",
    ny: "Kudalira Pang'ono",
  },
  "calendarCard.location": { en: "Location", ny: "Malo" },
  "calendarCard.calculatedOn": { en: "Calculated on", ny: "Kuwerengera pa" },

  // LocationPage
  "location.title": { en: "Select Your Location", ny: "Sankhani Malo Anu" },
  "location.desc": {
    en: "Choose your district and village to get personalized farming advice",
    ny: "Sankhani boma ndi mudzi wanu kuti mulandire malangizo a ulimi",
  },
  "location.district": { en: "Select District", ny: "Sankhani Boma" },
  "location.village": { en: "Select Village", ny: "Sankhani Mudzi" },
  "location.selectDistrict": {
    en: "Select a district first",
    ny: "Sankhani boma poyamba",
  },
  "location.continue": { en: "Continue", ny: "Pitirizani" },
  "location.selectBoth": {
    en: "Please select both district and village",
    ny: "Chonde sankhani boma ndi mudzi",
  },
  "location.failedDistricts": {
    en: "Failed to load districts. Please check your connection.",
    ny: "Zalephera kutsitsa maboma. Chonde onani intaneti yanu.",
  },
  "location.failedVillages": {
    en: "Failed to load villages. Please try again.",
    ny: "Zalephera kutsitsa midzi. Chonde yesaninso.",
  },
  "location.invalidSelection": {
    en: "Invalid selection. Please try again.",
    ny: "Kusankha kolakwika. Chonde yesaninso.",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved === "ny" ? "ny" : "en") as Language;
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
