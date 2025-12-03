// Main App component - sets up routing for the Smart Farmer application
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LocationPage from "./pages/LocationPage";
import CalendarPage from "./pages/CalendarPage";
import CropsPage from "./pages/CropsPage";
import Header from "./components/Header";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/location" element={<LocationPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/crops" element={<CropsPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
