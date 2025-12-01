// CropCard Component - Displays individual crop suitability information
// Created by Person 3 for the Crop Recommendations feature

import type { CropSuitability } from "../types"

interface CropCardProps {
    crop: CropSuitability
}

function CropCard({ crop }: CropCardProps) {
    // Get color classes based on suitability score
    const getSuitabilityColor = (score: number) => {
        if (score >= 80) return "bg-green-100 border-green-500 text-green-900"
        if (score >= 60) return "bg-yellow-100 border-yellow-500 text-yellow-900"
        if (score >= 40) return "bg-orange-100 border-orange-500 text-orange-900"
        return "bg-red-100 border-red-500 text-red-900"
    }

    // Get badge color for the score
    const getBadgeColor = (score: number) => {
        if (score >= 80) return "bg-green-500"
        if (score >= 60) return "bg-yellow-500"
        if (score >= 40) return "bg-orange-500"
        return "bg-red-500"
    }

    // Get suitability label text
    const getSuitabilityLabel = (score: number) => {
        if (score >= 80) return "Highly Suitable"
        if (score >= 60) return "Suitable"
        if (score >= 40) return "Moderately Suitable"
        return "Not Suitable"
    }

    // Generate star rating (out of 5)
    const getStarRating = (score: number) => {
        const stars = Math.round((score / 100) * 5)
        return { filled: stars, empty: 5 - stars }
    }

    // Get crop emoji based on crop name
    const getCropEmoji = (name: string) => {
        const lowerName = name.toLowerCase()
        if (lowerName.includes("maize") || lowerName.includes("corn")) return "🌽"
        if (lowerName.includes("rice")) return "🌾"
        if (lowerName.includes("wheat")) return "🌾"
        if (lowerName.includes("tomato")) return "🍅"
        if (lowerName.includes("potato")) return "🥔"
        if (lowerName.includes("bean") || lowerName.includes("soy")) return "🫘"
        if (lowerName.includes("groundnut") || lowerName.includes("peanut")) return "🥜"
        if (lowerName.includes("cassava")) return "🍠"
        if (lowerName.includes("banana")) return "🍌"
        if (lowerName.includes("mango")) return "🥭"
        if (lowerName.includes("orange") || lowerName.includes("citrus")) return "🍊"
        if (lowerName.includes("cabbage")) return "🥬"
        if (lowerName.includes("onion")) return "🧅"
        if (lowerName.includes("pepper") || lowerName.includes("chili")) return "🌶️"
        if (lowerName.includes("sugar")) return "🎋"
        if (lowerName.includes("tobacco")) return "🍃"
        if (lowerName.includes("cotton")) return "🌿"
        if (lowerName.includes("tea")) return "🍵"
        if (lowerName.includes("coffee")) return "☕"
        return "🌱"
    }

    const stars = getStarRating(crop.suitability_score)

    return (
        <div
            className={`card border-l-4 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ${getSuitabilityColor(
                crop.suitability_score,
            )}`}
        >
            {/* Header with crop name and emoji */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCropEmoji(crop.name)}</span>
                    <div>
                        <h3 className="text-lg font-bold">{crop.name}</h3>
                        <p className="text-sm opacity-75">{crop.name_chichewa}</p>
                    </div>
                </div>
                {/* Score badge */}
                <div className={`${getBadgeColor(crop.suitability_score)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                    {Math.round(crop.suitability_score)}%
                </div>
            </div>

            {/* Scientific name */}
            <p className="text-sm italic text-gray-600 mb-3">{crop.scientific_name}</p>

            {/* Star rating */}
            <div className="flex items-center gap-1 mb-2">
                {[...Array(stars.filled)].map((_, i) => (
                    <span key={`filled-${i}`} className="text-yellow-500">
                        ⭐
                    </span>
                ))}
                {[...Array(stars.empty)].map((_, i) => (
                    <span key={`empty-${i}`} className="text-gray-300">
                        ☆
                    </span>
                ))}
            </div>

            {/* Suitability label */}
            <p className="font-semibold mb-3">{getSuitabilityLabel(crop.suitability_score)}</p>

            {/* Requirements section */}
            <div className="border-t pt-3 mt-3 text-sm space-y-1 opacity-80">
                <p>
                    <span className="font-medium">pH Range:</span> {crop.soil_requirements.min_ph.toFixed(1)} -{" "}
                    {crop.soil_requirements.max_ph.toFixed(1)}
                </p>
                <p>
                    <span className="font-medium">Elevation:</span> {crop.elevation_requirements.min_elevation}m -{" "}
                    {crop.elevation_requirements.max_elevation}m
                </p>
            </div>
        </div>
    )
}

export default CropCard
