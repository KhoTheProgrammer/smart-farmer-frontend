// API service for communicating with the backend
import axios from "axios";
import type {
  District,
  Village,
  PlantingCalendar,
  Crop,
  CropSuitability,
} from "../types";

// Get API base URL from environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================
// LOCATION ENDPOINTS
// ============================================

/**
 * Fetch all districts in Malawi
 */
export const getAllDistricts = async (): Promise<District[]> => {
  try {
    const response = await api.get("/locations/districts/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch districts:", error);
    throw error;
  }
};

/**
 * Fetch all villages in a specific district
 */
export const getVillagesByDistrict = async (
  districtId: string
): Promise<Village[]> => {
  try {
    const response = await api.get(
      `/locations/districts/${districtId}/villages/`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch villages:", error);
    throw error;
  }
};

/**
 * Fetch details of a specific village
 */
export const getVillageDetails = async (
  villageId: string
): Promise<Village> => {
  try {
    const response = await api.get(`/locations/villages/${villageId}/`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch village details:", error);
    throw error;
  }
};

// ============================================
// AGRICULTURAL ADVISORY ENDPOINTS
// ============================================

/**
 * Fetch all available crops
 */
export const getAllCrops = async (): Promise<Crop[]> => {
  try {
    const response = await api.get("/advisory/crops/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch crops:", error);
    throw error;
  }
};

/**
 * Fetch planting calendar for a specific location
 * @param villageId - UUID of the village
 * @param cropId - Optional UUID of specific crop
 */
export const getPlantingCalendar = async (
  villageId: string,
  cropId?: string
): Promise<PlantingCalendar> => {
  try {
    const params: any = { location: villageId };
    if (cropId) {
      params.crop = cropId;
    }

    const response = await api.get("/advisory/planting-calendar/", { params });
    if (response.data.length === 0) {
      throw new Error("No planting calendar data available");
    }

    // Multiply the confidence_level by 100 to make it readable
    const newConfidenceLevel = response.data.confidence_level * 100;
    response.data.confidence_level = newConfidenceLevel
    return response.data;
  } catch (error) {
    console.error("Failed to fetch planting calendar:", error);
    throw error;
  }
};

/**
 * Fetch crop suitability rankings for a specific location
 * @param villageId - UUID of the village
 */
export const getCropSuitability = async (
  villageId: string
): Promise<CropSuitability[]> => {
  try {
    const response = await api.get("/advisory/crop-suitability/", {
      params: { location: villageId },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch crop suitability:", error);
    throw error;
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if the backend API is reachable
 */
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    await api.get("/locations/districts/");
    return true;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
};

export default api;
