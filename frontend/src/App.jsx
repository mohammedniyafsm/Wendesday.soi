import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import HistoryList from './components/HistoryList';
import { LineShadowText } from './components/ui/line-shadow-text';
import { motion } from 'framer-motion';

function App() {
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState('');

  const fetchHistory = useCallback(async () => {
    try {
      const response = await axios.get('/api/history');
      setHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const fetchWeather = async (city, isRefresh = false) => {
    if (!city) return;
    
    if (!isRefresh) setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/weather/${city}`);
      setWeather(response.data);
      setCurrentCity(city);
      fetchHistory();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      if (!isRefresh) setLoading(false);
    }
  };

  const handleSearch = (city) => {
    fetchWeather(city);
  };

  useEffect(() => {
    let interval;
    if (currentCity) {
      interval = setInterval(() => {
        fetchWeather(currentCity, true);
      }, 15000);
    }
    return () => clearInterval(interval);
  }, [currentCity]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-background -z-20"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md space-y-8 z-10"
      >
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-6xl font-black tracking-tighter text-balance text-white leading-none">
            Weather .io
              
         </h1>

          <p className="text-lg text-muted-foreground font-medium">
            Real-time forecast & history
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="min-h-[300px] relative"> 
        {/* Consistent height container to prevent layout shifts */}
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm"
            >
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-sm font-medium text-blue-200 animate-pulse">Fetching weather data...</p>
            </motion.div>
          )}

          {error && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center shadow-lg backdrop-blur-md">
                <span className="text-3xl mb-2 block">⚠️</span>
                <p className="text-red-200 font-medium">{error}</p>
                <button 
                  onClick={() => setError(null)}
                  className="mt-4 text-xs uppercase tracking-widest text-red-300 hover:text-red-100 transition-colors"
                >
                  Dimiss
                </button>
              </div>
            </motion.div>
          )}

          {!loading && !error && weather && (
            <WeatherCard weather={weather} />
          )}
          
          {!loading && !error && !weather && (
             <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5/50">
               <p className="text-muted-foreground text-sm">Search for a city to start</p>
             </div>
          )}
        </div>

        <HistoryList history={history} onSelectCity={handleSearch} />
      </motion.div>
      
      <div className="absolute bottom-4 text-center w-full">
      </div>
    </div>
  );
}

export default App;
