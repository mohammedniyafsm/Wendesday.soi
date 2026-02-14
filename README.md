# Weather Web App

A minimal full-stack weather application built with Node.js/Express and React/Vite.

## Features
- Search for any city.
- Real-time weather data (Temperature, Condition, Wind, Humidity).
- Search history (Last 5 cities).
- Auto-refresh every 15 seconds.
- Clean glassmorphism UI.

## Setup Instructions

1.  **Configure API Key**
    -   Go to `backend/.env`.
    -   Replace `YOUR_OPENWEATHER_API_KEY_HERE` with your actual OpenWeatherMap API key.

2.  **Start the Application**
    -   Run `run_app.bat` (Windows)
    -   Or manually:
        -   **Backend:** `cd backend && npm run dev`
        -   **Frontend:** `cd frontend && npm run dev`

3.  **Access**
    -   Open `http://localhost:5173` in your browser.
