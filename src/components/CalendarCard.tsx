// CalendarCard Component - Displays planting calendar information
// Task 2.2: Person 2 - Calendar Card Component

import type { PlantingCalendar } from "../types";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/CalendarPage.css";

interface CalendarCardProps {
  calendar: PlantingCalendar;
}

function CalendarCard({ calendar }: CalendarCardProps) {
  const { t, language } = useLanguage();

  // Format dates nicely (e.g., "November 15")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = language === "ny" ? "en-US" : "en-US"; // Keep English date format for now
    return date.toLocaleDateString(locale, {
      month: "long",
      day: "numeric",
    });
  };

  // Get confidence color based on confidence level
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "confidence-high";
    if (confidence >= 60) return "confidence-medium";
    return "confidence-low";
  };

  // Get confidence label
  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 80) return t("calendarCard.highConfidence");
    if (confidence >= 60) return t("calendarCard.mediumConfidence");
    return t("calendarCard.lowConfidence");
  };

  // Calculate days in planting window
  const calculateDaysInWindow = () => {
    const start = new Date(calendar.start_date);
    const end = new Date(calendar.end_date);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="calendar-card">
      {/* Header with icon and crop name */}
      <div className="calendar-card-header">
        <span className="calendar-icon">📅</span>
        <h2 className="calendar-title">
          {language === "ny" && calendar.crop_name_chichewa
            ? calendar.crop_name_chichewa
            : calendar.crop_name || t("calendarCard.general")}{" "}
          {t("calendarCard.plantingCalendar")}
        </h2>
      </div>

      {/* Crop name in alternate language if available */}
      {language === "ny" && calendar.crop_name && (
        <p className="calendar-subtitle">{calendar.crop_name}</p>
      )}
      {language === "en" && calendar.crop_name_chichewa && (
        <p className="calendar-subtitle">{calendar.crop_name_chichewa}</p>
      )}

      {/* Planting Window Section */}
      <div className="planting-window-section">
        <h3 className="section-title">🌱 {t("calendarCard.plantingWindow")}</h3>
        <div className="date-range">
          <div className="date-item">
            <span className="date-label">{t("calendarCard.startDate")}</span>
            <span className="date-value">
              {formatDate(calendar.start_date)}
            </span>
          </div>
          <div className="date-separator">→</div>
          <div className="date-item">
            <span className="date-label">{t("calendarCard.endDate")}</span>
            <span className="date-value">{formatDate(calendar.end_date)}</span>
          </div>
        </div>
        <p className="window-duration">
          {calculateDaysInWindow()} {t("calendarCard.daysWindow")}
        </p>
      </div>

      {/* Confidence Level Section */}
      <div className="confidence-section">
        <h3 className="section-title">
          📊 {t("calendarCard.confidenceLevel")}
        </h3>
        <div className="confidence-display">
          <div className="confidence-percentage">
            {calendar.confidence_level.toFixed(2)}%
          </div>
          <div className="confidence-bar-container">
            <div
              className={`confidence-bar ${getConfidenceColor(
                calendar.confidence_level
              )}`}
              style={{ width: `${calendar.confidence_level}%` }}
            ></div>
          </div>
          <div
            className={`confidence-label ${getConfidenceColor(
              calendar.confidence_level
            )}`}
          >
            {getConfidenceLabel(calendar.confidence_level)}
          </div>
        </div>
      </div>

      {/* Location Information */}
      <div className="location-section">
        <h3 className="section-title">📍 {t("calendarCard.location")}</h3>
        <div className="location-info">
          <p className="location-name">
            {language === "ny" && calendar.village_name_chichewa
              ? calendar.village_name_chichewa
              : calendar.village_name}
          </p>
          {language === "ny" && calendar.village_name && (
            <p className="location-name-chichewa">{calendar.village_name}</p>
          )}
          {language === "en" && calendar.village_name_chichewa && (
            <p className="location-name-chichewa">
              {calendar.village_name_chichewa}
            </p>
          )}
        </div>
      </div>

      {/* Calculation Date Footer */}
      <div className="calendar-footer">
        <p className="calculation-date">
          {t("calendarCard.calculatedOn")}:{" "}
          {new Date(calendar.calculated_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}

export default CalendarCard;
