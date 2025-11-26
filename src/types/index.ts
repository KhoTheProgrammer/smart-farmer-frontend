// TypeScript type definitions for the Smart Farmer app

export interface District {
  id: string;
  name: string;
  name_chichewa: string;
}

export interface Village {
  id: string;
  name: string;
  name_chichewa: string;
  district: string;
  district_name: string;
  latitude: number;
  longitude: number;
  elevation: number | null;
}

export interface PlantingCalendar {
  id: string;
  village: string;
  village_name: string;
  village_name_chichewa: string;
  crop: string | null;
  crop_name: string | null;
  crop_name_chichewa: string | null;
  start_date: string;
  end_date: string;
  confidence_level: number;
  calculated_at: string;
}

export interface Crop {
  id: string;
  name: string;
  name_chichewa: string;
  scientific_name: string;
  min_ph: number;
  max_ph: number;
  min_clay_content: number;
  max_clay_content: number;
  min_organic_carbon: number;
  min_rainfall: number;
  max_rainfall: number;
  min_temperature: number;
  max_temperature: number;
  min_elevation: number;
  max_elevation: number;
  growing_season_days: number;
}

export interface CropSuitability {
  crop_id: string;
  name: string;
  name_chichewa: string;
  scientific_name: string;
  suitability_score: number;
  soil_requirements: {
    min_ph: number;
    max_ph: number;
    min_clay_content: number;
    max_clay_content: number;
    min_organic_carbon: number;
  };
  elevation_requirements: {
    min_elevation: number;
    max_elevation: number;
  };
}
