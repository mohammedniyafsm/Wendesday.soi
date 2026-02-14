require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let searchHistory = [];

app.get('/api/history', (req, res) => {
    res.json(searchHistory);
});

app.get('/api/weather/:city', async (req, res) => {
    const { city } = req.params;

    // Open-Meteo API does NOT require an API key
    try {
        // Step 1: Geocoding to get Lat/Lon
        // Using count=10 to increase chances of finding a match, but taking the first relevant one
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`;
        console.log(`Geocoding URL: ${geoUrl}`);
        const geoResponse = await axios.get(geoUrl);

        if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
            console.log(`City not found: ${city}`);
            return res.status(404).json({ error: `City '${city}' not found. Please check the spelling (e.g. 'Bangalore' instead of 'Banglore').` });
        }

        const { latitude, longitude, name, country_code } = geoResponse.data.results[0];

        // Step 2: Fetch current weather
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherResponse = await axios.get(weatherUrl);
        const weather = weatherResponse.data.current_weather;

        // Map WMO Weather Codes to descriptions and icons
        const getWeatherDescription = (code) => {
            if (code === 0) return { desc: 'Clear sky', icon: '01d' };
            if (code <= 3) return { desc: 'Partly cloudy', icon: '02d' };
            if (code <= 48) return { desc: 'Fog', icon: '50d' };
            if (code <= 67) return { desc: 'Rain', icon: '10d' };
            if (code <= 77) return { desc: 'Snow', icon: '13d' };
            if (code <= 82) return { desc: 'Rain showers', icon: '09d' };
            if (code <= 99) return { desc: 'Thunderstorm', icon: '11d' };
            return { desc: 'Unknown', icon: '50d' };
        };

        const condition = getWeatherDescription(weather.weathercode);

        const weatherData = {
            city: name,
            country: country_code,
            temp: Math.round(weather.temperature),
            description: condition.desc,
            humidity: 60, // Mocked as current_weather doesn't provide it
            windSpeed: weather.windspeed,
            icon: condition.icon,
            timestamp: new Date().toISOString()
        };

        // Update history (prevent duplicates at the top, limit to 5)
        searchHistory = searchHistory.filter(item => item.city.toLowerCase() !== weatherData.city.toLowerCase());
        searchHistory.unshift(weatherData);
        if (searchHistory.length > 5) {
            searchHistory.pop();
        }

        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
