# Team Task Breakdown - 3 Members

This document provides detailed tasks for each team member with specific files to work on and step-by-step instructions.

## 🎯 Overview

The frontend is **80% complete**. Each person has specific components and pages to finish. All the infrastructure (routing, API setup, styling) is already done.

### What's Already Done ✅

- ✅ Project setup (React, TypeScript, Vite, Tailwind)
- ✅ Routing configured (`src/App.tsx`)
- ✅ API service with all endpoints (`src/services/api.ts`)
- ✅ TypeScript types defined (`src/types/index.ts`)
- ✅ Header component with navigation (`src/components/Header.tsx`)
- ✅ Footer component (`src/components/Footer.tsx`)
- ✅ LoadingSpinner component (`src/components/LoadingSpinner.tsx`)
- ✅ Home page complete (`src/pages/HomePage.tsx`)
- ✅ Styling system with Tailwind CSS

### What Needs to Be Done 🚧

- 🚧 **Person 1**: Location selector page
- 🚧 **Person 2**: Planting calendar page
- 🚧 **Person 3**: Crop recommendations page

---

## 👤 Person 1: Location Selection

**Responsibility**: Complete the location selection functionality

### Files You'll Work With

- **Main file**: `src/pages/LocationPage.tsx` (needs to be created)
- **Component**: `src/components/LocationSelector.tsx` (needs to be created)
- **API**: `src/services/api.ts` (already has the functions you need)
- **Types**: `src/types/index.ts` (already defined)

### Task 1.1: Create LocationSelector Component

**File**: `src/components/LocationSelector.tsx`

Create a component with two dropdowns: one for districts, one for villages.

**What to do:**

1. Create the file `src/components/LocationSelector.tsx`
2. Import necessary hooks and types:

   ```typescript
   import { useState, useEffect } from "react";
   import { getAllDistricts, getVillagesByDistrict } from "../services/api";
   import type { District, Village } from "../types";
   ```

3. Create state variables:

   ```typescript
   const [districts, setDistricts] = useState<District[]>([]);
   const [villages, setVillages] = useState<Village[]>([]);
   const [selectedDistrict, setSelectedDistrict] = useState("");
   const [selectedVillage, setSelectedVillage] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   ```

4. Fetch districts when component mounts:

   ```typescript
   useEffect(() => {
     const fetchDistricts = async () => {
       try {
         setLoading(true);
         const data = await getAllDistricts();
         setDistricts(data);
       } catch (err) {
         setError("Failed to load districts");
       } finally {
         setLoading(false);
       }
     };
     fetchDistricts();
   }, []);
   ```

5. Fetch villages when district is selected:

   ```typescript
   useEffect(() => {
     if (!selectedDistrict) return;

     const fetchVillages = async () => {
       try {
         setLoading(true);
         const data = await getVillagesByDistrict(selectedDistrict);
         setVillages(data);
       } catch (err) {
         setError("Failed to load villages");
       } finally {
         setLoading(false);
       }
     };
     fetchVillages();
   }, [selectedDistrict]);
   ```

6. Create the JSX with two dropdowns:

   - District dropdown (select element)
   - Village dropdown (select element, disabled until district is selected)
   - Submit button

7. When user clicks submit:
   - Save to localStorage: `selectedDistrict`, `selectedVillage`, `selectedDistrictName`, `selectedVillageName`
   - Call `onLocationSelected()` prop to notify parent

**Example structure:**

```typescript
interface LocationSelectorProps {
  onLocationSelected: () => void;
}

function LocationSelector({ onLocationSelected }: LocationSelectorProps) {
  // State and useEffect hooks here

  const handleSubmit = () => {
    if (!selectedDistrict || !selectedVillage) return;

    // Find selected items
    const district = districts.find((d) => d.id === selectedDistrict);
    const village = villages.find((v) => v.id === selectedVillage);

    // Save to localStorage
    localStorage.setItem("selectedDistrict", selectedDistrict);
    localStorage.setItem("selectedVillage", selectedVillage);
    localStorage.setItem("selectedDistrictName", district?.name || "");
    localStorage.setItem("selectedVillageName", village?.name || "");

    // Notify parent
    onLocationSelected();
  };

  return (
    <div className="card">
      {/* District dropdown */}
      {/* Village dropdown */}
      {/* Submit button */}
    </div>
  );
}
```

### Task 1.2: Create LocationPage

**File**: `src/pages/LocationPage.tsx`

This page uses the LocationSelector component.

**What to do:**

1. Create the file `src/pages/LocationPage.tsx`
2. Import LocationSelector and useNavigate:

   ```typescript
   import { useNavigate } from "react-router-dom";
   import LocationSelector from "../components/LocationSelector";
   ```

3. Create the page component:

   ```typescript
   function LocationPage() {
     const navigate = useNavigate();

     const handleLocationSelected = () => {
       // Navigate to calendar page after selection
       navigate("/calendar");
     };

     return (
       <div className="max-w-2xl mx-auto">
         <h1 className="text-3xl font-bold text-[--color-primary] mb-4">
           Select Your Location
         </h1>
         <p className="text-gray-600 mb-8">
           Choose your district and village to get personalized farming advice
         </p>

         <LocationSelector onLocationSelected={handleLocationSelected} />
       </div>
     );
   }

   export default LocationPage;
   ```

### Task 1.3: Add Route to App.tsx

**File**: `src/App.tsx`

Add the route for LocationPage (it might already be there, just verify).

**What to do:**

1. Open `src/App.tsx`
2. Import LocationPage:

   ```typescript
   import LocationPage from "./pages/LocationPage";
   ```

3. Add route in the Routes section:
   ```typescript
   <Route path="/location" element={<LocationPage />} />
   ```

### Testing Your Work

1. Start the dev server: `pnpm dev`
2. Click "Get Started" on home page
3. You should see district dropdown
4. Select a district → villages should load
5. Select a village → click submit
6. Should navigate to calendar page
7. Check browser localStorage (F12 → Application → Local Storage) - should see saved values

### Styling Tips

Use these Tailwind classes for consistency:

- Dropdowns: `input-field` class (already defined in CSS)
- Buttons: `btn-primary` class (already defined in CSS)
- Cards: `card` class (already defined in CSS)
- Errors: `error-message` class (already defined in CSS)

---

## 👤 Person 2: Planting Calendar

**Responsibility**: Complete the planting calendar page

### Files You'll Work With

- **Main file**: `src/pages/CalendarPage.tsx` (already exists, needs completion)
- **Component**: `src/components/CalendarCard.tsx` (needs to be created)
- **API**: `src/services/api.ts` (already has `getPlantingCalendar` function)
- **Types**: `src/types/index.ts` (already has `PlantingCalendar` type)

### Task 2.1: Understand the API

**File**: `src/services/api.ts` (read only)

The function you'll use:

```typescript
export const getPlantingCalendar = async (
  villageId: string,
  cropId?: string
): Promise<PlantingCalendar> => {
  // Returns planting calendar data
};
```

**PlantingCalendar type** (from `src/types/index.ts`):

```typescript
interface PlantingCalendar {
  id: string;
  village: string;
  village_name: string;
  crop_name: string | null;
  start_date: string; // Format: "YYYY-MM-DD"
  end_date: string; // Format: "YYYY-MM-DD"
  confidence_level: number; // 0-100
  calculated_at: string;
}
```

### Task 2.2: Create CalendarCard Component

**File**: `src/components/CalendarCard.tsx`

Create a component to display planting calendar information.

**What to do:**

1. Create the file `src/components/CalendarCard.tsx`
2. Import the type:

   ```typescript
   import type { PlantingCalendar } from "../types";
   ```

3. Create the component:

   ```typescript
   interface CalendarCardProps {
     calendar: PlantingCalendar;
   }

   function CalendarCard({ calendar }: CalendarCardProps) {
     // Format dates nicely
     const formatDate = (dateString: string) => {
       const date = new Date(dateString);
       return date.toLocaleDateString("en-US", {
         month: "long",
         day: "numeric",
       });
     };

     // Get confidence color
     const getConfidenceColor = (confidence: number) => {
       if (confidence >= 80) return "text-green-600 bg-green-50";
       if (confidence >= 60) return "text-yellow-600 bg-yellow-50";
       return "text-red-600 bg-red-50";
     };

     return (
       <div className="card">
         {/* Display crop name */}
         {/* Display planting window (start_date to end_date) */}
         {/* Display confidence level with color */}
         {/* Display village name */}
       </div>
     );
   }

   export default CalendarCard;
   ```

4. Design the card to show:
   - Crop name (if available) or "General Planting Calendar"
   - Planting window: "Plant between [start_date] and [end_date]"
   - Confidence level with visual indicator (progress bar or badge)
   - Village name
   - Icon: 📅 or 🌱

**Example layout:**

```
┌─────────────────────────────────────┐
│ 📅 Maize Planting Calendar          │
│                                     │
│ Planting Window:                    │
│ November 15 - December 31           │
│                                     │
│ Confidence: ████████░░ 85%          │
│                                     │
│ Location: Lilongwe Village          │
└─────────────────────────────────────┘
```

### Task 2.3: Complete CalendarPage

**File**: `src/pages/CalendarPage.tsx` (already exists)

**What to do:**

1. Open `src/pages/CalendarPage.tsx`
2. Import your CalendarCard and API function:

   ```typescript
   import CalendarCard from "../components/CalendarCard";
   import { getPlantingCalendar } from "../services/api";
   import type { PlantingCalendar } from "../types";
   ```

3. Add state for calendar data:

   ```typescript
   const [calendar, setCalendar] = useState<PlantingCalendar | null>(null);
   ```

4. Replace the TODO comment in useEffect with actual API call:

   ```typescript
   useEffect(() => {
     const villageId = localStorage.getItem("selectedVillage");

     if (!villageId) {
       setError("Please select a location first");
       setLoading(false);
       return;
     }

     const fetchCalendar = async () => {
       try {
         setLoading(true);
         const data = await getPlantingCalendar(villageId);
         setCalendar(data);
         setError("");
       } catch (err) {
         setError("Failed to load planting calendar");
       } finally {
         setLoading(false);
       }
     };

     fetchCalendar();
   }, []);
   ```

5. Replace the placeholder div with CalendarCard:

   ```typescript
   {
     calendar && <CalendarCard calendar={calendar} />;
   }
   ```

6. Remove the blue instruction box at the bottom

### Task 2.4: Add Season Filter (Optional Enhancement)

If you finish early, add a season filter:

1. Add state: `const [season, setSeason] = useState("rainy");`
2. Add dropdown for season selection (rainy/dry)
3. Pass season to API: `getPlantingCalendar(villageId, undefined, season)`
4. Refetch when season changes

### Testing Your Work

1. Start dev server: `pnpm dev`
2. Select a location first (use Person 1's work or manually set localStorage)
3. Navigate to Calendar page
4. Should see loading spinner
5. Should see calendar card with planting dates
6. Check that dates are formatted nicely
7. Check confidence level displays correctly

---

## 👤 Person 3: Crop Recommendations

**Responsibility**: Complete the crop recommendations page

### Files You'll Work With

- **Main file**: `src/pages/CropsPage.tsx` (already exists, needs completion)
- **Component**: `src/components/CropCard.tsx` (needs to be created)
- **API**: `src/services/api.ts` (already has `getCropSuitability` function)
- **Types**: `src/types/index.ts` (already has `CropSuitability` type)

### Task 3.1: Understand the API

**File**: `src/services/api.ts` (read only)

The function you'll use:

```typescript
export const getCropSuitability = async (
  villageId: string
): Promise<CropSuitability[]> => {
  // Returns array of crops with suitability scores
};
```

**CropSuitability type** (from `src/types/index.ts`):

```typescript
interface CropSuitability {
  crop_id: string;
  name: string;
  name_chichewa: string;
  scientific_name: string;
  suitability_score: number; // 0-100
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
```

### Task 3.2: Create CropCard Component

**File**: `src/components/CropCard.tsx`

Create a component to display crop information with suitability score.

**What to do:**

1. Create the file `src/components/CropCard.tsx`
2. Import the type:

   ```typescript
   import type { CropSuitability } from "../types";
   ```

3. Create the component:

   ```typescript
   interface CropCardProps {
     crop: CropSuitability;
   }

   function CropCard({ crop }: CropCardProps) {
     // Get color based on suitability score
     const getSuitabilityColor = (score: number) => {
       if (score >= 80) return "bg-green-100 border-green-500 text-green-900";
       if (score >= 60)
         return "bg-yellow-100 border-yellow-500 text-yellow-900";
       if (score >= 40)
         return "bg-orange-100 border-orange-500 text-orange-900";
       return "bg-red-100 border-red-500 text-red-900";
     };

     // Get suitability label
     const getSuitabilityLabel = (score: number) => {
       if (score >= 80) return "Highly Suitable";
       if (score >= 60) return "Suitable";
       if (score >= 40) return "Moderately Suitable";
       return "Not Suitable";
     };

     // Generate star rating (out of 5)
     const getStarRating = (score: number) => {
       const stars = Math.round((score / 100) * 5);
       return "⭐".repeat(stars) + "☆".repeat(5 - stars);
     };

     return (
       <div
         className={`card border-l-4 ${getSuitabilityColor(
           crop.suitability_score
         )}`}
       >
         {/* Display crop name */}
         {/* Display scientific name (smaller, italic) */}
         {/* Display suitability score as percentage */}
         {/* Display star rating */}
         {/* Display suitability label */}
         {/* Display requirements (optional) */}
       </div>
     );
   }

   export default CropCard;
   ```

4. Design the card to show:
   - Crop name (English)
   - Crop name (Chichewa) - smaller text
   - Scientific name - italic, gray
   - Suitability score: Large percentage (e.g., "85%")
   - Star rating: ⭐⭐⭐⭐☆
   - Suitability label: "Highly Suitable" / "Suitable" / etc.
   - Icon: 🌱 or crop-specific emoji

**Example layout:**

```
┌─────────────────────────────────────┐
│ 🌽 Maize                            │
│ Chimanga                            │
│ Zea mays                            │
│                                     │
│        85%                          │
│    ⭐⭐⭐⭐☆                          │
│  Highly Suitable                    │
│                                     │
│ pH: 5.5-7.0                         │
│ Elevation: 500-1500m                │
└─────────────────────────────────────┘
```

### Task 3.3: Complete CropsPage

**File**: `src/pages/CropsPage.tsx` (already exists)

**What to do:**

1. Open `src/pages/CropsPage.tsx`
2. Import your CropCard and API function:

   ```typescript
   import CropCard from "../components/CropCard";
   import { getCropSuitability } from "../services/api";
   import type { CropSuitability } from "../types";
   ```

3. Add state for crops data:

   ```typescript
   const [crops, setCrops] = useState<CropSuitability[]>([]);
   ```

4. Replace the TODO comment in useEffect with actual API call:

   ```typescript
   useEffect(() => {
     const villageId = localStorage.getItem("selectedVillage");

     if (!villageId) {
       setError("Please select a location first");
       setLoading(false);
       return;
     }

     const fetchCrops = async () => {
       try {
         setLoading(true);
         const data = await getCropSuitability(villageId);
         // Sort by suitability score (highest first)
         const sorted = data.sort(
           (a, b) => b.suitability_score - a.suitability_score
         );
         setCrops(sorted);
         setError("");
       } catch (err) {
         setError("Failed to load crop recommendations");
       } finally {
         setLoading(false);
       }
     };

     fetchCrops();
   }, []);
   ```

5. Replace the placeholder div with mapped CropCards:

   ```typescript
   {
     crops.map((crop) => <CropCard key={crop.crop_id} crop={crop} />);
   }
   ```

6. Remove the blue instruction box at the bottom

### Task 3.4: Add Filtering (Optional Enhancement)

If you finish early, add filtering options:

1. Add state: `const [minScore, setMinScore] = useState(0);`
2. Add slider or buttons to filter by minimum suitability score
3. Filter crops: `crops.filter(c => c.suitability_score >= minScore)`
4. Add search by crop name

### Testing Your Work

1. Start dev server: `pnpm dev`
2. Select a location first
3. Navigate to Crops page
4. Should see loading spinner
5. Should see grid of crop cards
6. Crops should be sorted by suitability (best first)
7. Colors should match suitability levels
8. Check that all information displays correctly

---

## 🔄 Integration & Testing

Once all three people complete their tasks:

### Integration Checklist

1. **Person 1** → **Person 2**: Location selection should work, then calendar loads
2. **Person 1** → **Person 3**: Location selection should work, then crops load
3. **Header component**: Should show selected location (already implemented)

### Full User Flow Test

1. Start on Home page
2. Click "Get Started"
3. Select district and village
4. Click submit → goes to Calendar page
5. See planting calendar for selected location
6. Click "Crops" in navigation
7. See crop recommendations for selected location
8. Click "Location" in navigation
9. Change location
10. Verify calendar and crops update

### Common Issues & Solutions

**Issue**: "Please select a location first" error

- **Solution**: Make sure localStorage has `selectedVillage` key
- **Check**: Open DevTools (F12) → Application → Local Storage

**Issue**: API calls failing

- **Solution**: Make sure backend is running at `http://localhost:8000`
- **Check**: Open `http://localhost:8000/api/` in browser

**Issue**: CORS errors

- **Solution**: Backend needs CORS enabled for `http://localhost:5173`
- **Check**: Backend `settings.py` should have CORS configuration

**Issue**: TypeScript errors

- **Solution**: Make sure you're using the correct types from `src/types/index.ts`
- **Check**: Import types: `import type { TypeName } from "../types";`

**Issue**: Styling looks wrong

- **Solution**: Use the predefined classes: `card`, `btn-primary`, `input-field`
- **Check**: See `src/index.css` for available classes

---

## 📚 Resources

### Files Reference

- **API Functions**: `src/services/api.ts`
- **Types**: `src/types/index.ts`
- **Styling**: `src/index.css` (custom classes)
- **Routing**: `src/App.tsx`
- **Backend API Docs**: `../smart-farmer-backend/API_README.md`

### Useful Commands

```bash
# Start development server
pnpm dev

# Check for errors
pnpm lint

# Build for production
pnpm build
```

### Getting Help

1. Check the browser console (F12) for errors
2. Read the error messages carefully
3. Check the API documentation: `../smart-farmer-backend/API_README.md`
4. Test API endpoints directly: `http://localhost:8000/api/docs/`
5. Ask your teammates for help

---

## ✅ Definition of Done

### Person 1 - Location Selection

- [ ] LocationSelector component created
- [ ] District dropdown works
- [ ] Village dropdown loads based on district
- [ ] Selection saves to localStorage
- [ ] Navigation to calendar works
- [ ] Error handling implemented
- [ ] Loading states shown

### Person 2 - Planting Calendar

- [ ] CalendarCard component created
- [ ] API call fetches calendar data
- [ ] Dates formatted nicely
- [ ] Confidence level displayed with color
- [ ] Error handling implemented
- [ ] Loading states shown
- [ ] Works with selected location

### Person 3 - Crop Recommendations

- [ ] CropCard component created
- [ ] API call fetches crop data
- [ ] Crops sorted by suitability
- [ ] Color coding by suitability level
- [ ] Star rating displayed
- [ ] Error handling implemented
- [ ] Loading states shown
- [ ] Works with selected location

---

**Good luck! 🌱 Remember: The infrastructure is done, you just need to connect the pieces!**
