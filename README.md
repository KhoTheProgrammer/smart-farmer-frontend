# Mlimi Wanzeru - Frontend

A React web application that provides agricultural advisory services for smallholder farmers in Malawi.

## 🌾 About

This application helps farmers make informed agricultural decisions by providing:

- **Location Selection** - Choose your district and village
- **Planting Calendar** - View optimal planting and harvesting dates for crops
- **Crop Recommendations** - Discover which crops grow best in your area based on soil, weather, and elevation data

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** 18 or higher - [Download](https://nodejs.org)
- **pnpm** - Install with: `npm install -g pnpm`
- **Git** - [Download](https://git-scm.com)

### Installation

#### Windows

```powershell
# 1. Clone the repository
git clone <repository-url>
cd smart-farmer-frontend

# 2. Install dependencies
pnpm install

# 3. Create environment file
copy .env.example .env

# 4. Start the development server
pnpm dev
```

#### Linux/macOS

```bash
# 1. Clone the repository
git clone <repository-url>
cd smart-farmer-frontend

# 2. Install dependencies
pnpm install

# 3. Create environment file
cp .env.example .env

# 4. Start the development server
pnpm dev
```

The application will open at: <http://localhost:5173>

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

**Important**: The frontend requires the backend API to be running. Make sure to start the backend server first.

## 🔧 Backend Setup

The frontend needs the backend API to function. In a separate terminal:

#### Windows

```powershell
cd ..\smart-farmer-backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

#### Linux/macOS

```bash
cd ../smart-farmer-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

Backend will run at: <http://localhost:8000>

See [../smart-farmer-backend/README.md](../smart-farmer-backend/README.md) for detailed backend setup instructions.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation bar
│   ├── Footer.tsx      # Footer component
│   └── LoadingSpinner.tsx
│
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page with location selector
│   ├── CalendarPage.tsx # Planting calendar
│   └── CropsPage.tsx   # Crop recommendations
│
├── services/           # API communication
│   └── api.ts          # Axios API client
│
├── types/              # TypeScript type definitions
│   └── index.ts
│
├── App.tsx             # Main app component with routing
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind config
```

## 🛠️ Available Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linter
pnpm lint
```

## 🎨 Design System

### Colors

The application uses a green color scheme representing agriculture:

- **Primary Green**: `#2D5016` - Main brand color
- **Light Green**: `#4A7C2C` - Hover states and accents
- **Dark Green**: `#1A3009` - Text on light backgrounds

### Typography

- System fonts for optimal performance and native feel
- Clear hierarchy with appropriate font sizes
- Mobile-first responsive design

### Components

Custom utility classes are defined in `src/index.css`:

- `.btn-primary` - Primary action buttons
- `.card` - Content cards with shadow
- `.input-field` - Form inputs
- `.error-message` - Error notifications
- `.success-message` - Success notifications

## 🔌 API Integration

The frontend communicates with the backend API using Axios. All API calls are centralized in `src/services/api.ts`.

### Main Endpoints Used

```
GET /api/locations/districts/                    # List districts
GET /api/locations/districts/{id}/villages/      # List villages in district
GET /api/weather/planting-calendar/              # Get planting calendar
GET /api/weather/crops/                          # List all crops
GET /api/weather/crops/{id}/suitability/         # Get crop suitability
```

### Example API Call

```typescript
import api from "./services/api";

// Get all districts
const response = await api.get("/locations/districts/");
const districts = response.data;
```

## 🐛 Troubleshooting

### "Cannot find module" or "Module not found"

```bash
# Reinstall dependencies
pnpm install
```

### "Port 5173 already in use"

```bash
# Use a different port
pnpm dev --port 5174
```

### "API call failed" or "Network Error"

1. Make sure the backend server is running at `http://localhost:8000`
2. Check that `.env` file has the correct `VITE_API_BASE_URL`
3. Verify CORS is enabled in backend settings

### "Failed to fetch" or CORS errors

The backend must have CORS enabled. Check `smart-farmer-backend/mlimi_wanzeru/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

### Styles not loading

```bash
# Clear cache and restart
rm -rf node_modules/.vite
pnpm dev
```

## 📱 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Production Build

### Build the Application

```bash
pnpm build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
pnpm preview
```

### Deploy

The `dist/` folder contains static files that can be deployed to any web hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static file hosting

**Important**: Update the `VITE_API_BASE_URL` in your production environment to point to your production backend API.

## 🧪 Development

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable and function names

### State Management

- Local state with `useState` for component-specific data
- `localStorage` for persisting user selections (selected location)
- Consider adding React Query or SWR for advanced data fetching

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Header.tsx`

### Adding New API Calls

Add new functions to `src/services/api.ts`:

```typescript
export const getWeatherData = async (locationId: number) => {
  const response = await api.get(`/weather/data/?location=${locationId}`);
  return response.data;
};
```

## 📖 Learning Resources

- [React Documentation](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vite.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/en/main)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Commit with clear messages
5. Push and create a pull request

## 📄 License

Educational project for agricultural development in Malawi.

## 🆘 Need Help?

- Check the browser console for errors (F12)
- Review the [Backend API Documentation](../smart-farmer-backend/API_README.md)
- Ensure backend is running and accessible
- Verify environment variables are set correctly

---

**Happy Coding! 🌱**
