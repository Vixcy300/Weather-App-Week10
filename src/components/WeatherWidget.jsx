import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Loader2, Droplets, Wind, Gauge, Eye, Sunrise, Sunset, MapPin, AlertCircle, Clock, Sun, Moon, Zap } from 'lucide-react';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentCities, setRecentCities] = useState([]);
  const [theme, setTheme] = useState('dark');

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'cc95d932d5a45d33a9527d5019475f2c'; 
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const getWeather = async (searchCity) => {
    const trimmedCity = (searchCity || city).trim();

    if (!trimmedCity) {
      setError('Please enter a city name.');
      setWeatherData(null);
      return;
    }

    if (!API_KEY) {
      setError('API key is missing. Please check your .env file.');
      setWeatherData(null);
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const url = `${API_URL}?q=${trimmedCity}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      
      setWeatherData(response.data);

      setRecentCities((prev) => {
        const updated = [
          trimmedCity,
          ...prev.filter(
            (item) => item.toLowerCase() !== trimmedCity.toLowerCase()
          ),
        ];
        return updated.slice(0, 5); 
      });

    } catch (err) {
      setWeatherData(null);
      
      if (err.response && err.response.status === 404) {
        setError('City not found. Please enter a valid city name.');
      } else {
        setError('Failed to fetch weather data. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      getWeather();
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);

    let bgGradient = theme === 'dark' 
      ? "linear-gradient(-45deg, #0f172a, #1e293b, #0f172a)"
      : "linear-gradient(-45deg, #e2e8f0, #f8fafc, #e2e8f0)";

    if (weatherData) {
      const main = weatherData.weather[0].main.toLowerCase();
      const hour = new Date().getHours();
      const isNight = hour < 6 || hour > 18;

      if (theme === 'dark') {
        if (main.includes('clear')) {
          bgGradient = isNight 
            ? "linear-gradient(-45deg, #1e1b4b, #312e81, #0f172a)" 
            : "linear-gradient(-45deg, #0ea5e9, #38bdf8, #0284c7)";
        } else if (main.includes('cloud')) {
          bgGradient = isNight 
            ? "linear-gradient(-45deg, #1e293b, #334155, #1e293b)" 
            : "linear-gradient(-45deg, #64748b, #94a3b8, #475569)";
        } else if (main.includes('rain') || main.includes('drizzle')) {
          bgGradient = "linear-gradient(-45deg, #1e293b, #3b82f6, #1e293b)";
        } else if (main.includes('thunder')) {
          bgGradient = "linear-gradient(-45deg, #2e1065, #4c1d95, #1e1b4b)";
        } else if (main.includes('snow')) {
          bgGradient = "linear-gradient(-45deg, #cbd5e1, #f1f5f9, #94a3b8)";
        }
      } else {
        // Light theme dynamic backgrounds
        if (main.includes('clear')) {
          bgGradient = "linear-gradient(-45deg, #38bdf8, #bae6fd, #7dd3fc)";
        } else if (main.includes('cloud')) {
          bgGradient = "linear-gradient(-45deg, #94a3b8, #cbd5e1, #e2e8f0)";
        } else if (main.includes('rain') || main.includes('drizzle')) {
          bgGradient = "linear-gradient(-45deg, #60a5fa, #93c5fd, #bfdbfe)";
        } else if (main.includes('thunder')) {
          bgGradient = "linear-gradient(-45deg, #4f46e5, #818cf8, #a5b4fc)";
        } else if (main.includes('snow')) {
          bgGradient = "linear-gradient(-45deg, #e2e8f0, #f8fafc, #ffffff)";
        }
      }
    }

    document.body.style.background = bgGradient;
    document.body.style.backgroundSize = "400% 400%";
    document.body.style.animation = "gradientBG 15s ease infinite";
    document.body.style.transition = "background 1s ease";
  }, [weatherData, theme]);

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="weather-dashboard">
      
      {/* Top Layout Grid linking the green spaces */}
      <div className="top-layout-manager animate-fade-in">
        
        {/* Left Side: Live Connect Module */}
        <div className="top-side left-side">
          <div className="live-module glass-panel hover-scale">
            <Zap size={16} className="live-icon" />
            <span>Telemetry Online</span>
          </div>
        </div>

        {/* Center: Search/Brand module */}
        <div className="dashboard-header center-body">
          <h1 className="brand-title">ATMOS</h1>
          <div className="search-bar glass-panel">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search global locations..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="button" onClick={() => getWeather()} disabled={isLoading}>
              {isLoading ? <Loader2 className="spinner" size={18} /> : "Scan"}
            </button>
          </div>
          
          {recentCities.length > 0 && (
            <div className="recent-cities-row animate-fade-in">
              <Clock size={14} className="recent-icon" /> 
              {recentCities.map((recentCity, idx) => (
                <button 
                  key={idx} 
                  className="recent-pill hover-scale" 
                  onClick={() => {
                    setCity(recentCity);
                    getWeather(recentCity);
                  }}
                >
                  {recentCity}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Theme Switch */}
        <div className="top-side right-side">
          <button className="theme-toggle glass-panel hover-scale" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} className="theme-icon" /> : <Moon size={20} className="theme-icon" />}
          </button>
        </div>

      </div>

      {error && (
        <div className="error-banner animate-shake">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Empty State with NO quote */}
      {!weatherData && !error && !isLoading && (
        <div className="empty-state glass-panel animate-scale-in">
          <h2>Enter a city to begin.</h2>
          <p>Real-time atmospheric telemetry globally.</p>
        </div>
      )}

      {weatherData && (
        <div className="dashboard-grid">
          {/* Main Hero Card */}
          <div className="hero-card glass-panel animate-scale-in">
            <div className="hero-header">
              <div className="location-tag">
                <MapPin size={18} />
                <h2>{weatherData.name}, {weatherData.sys.country}</h2>
              </div>
              <p className="date-display">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
            </div>
            
            <div className="hero-body">
              <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} 
                alt={weatherData.weather[0].description} 
                className="weather-icon-large"
              />
              <div className="temperature-block">
                <div className="temp-display">{Math.round(weatherData.main.temp)}°</div>
                <div className="condition-display">{weatherData.weather[0].main}</div>
                <div className="feels-like">Feels like {Math.round(weatherData.main.feels_like)}°C</div>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="metrics-grid">
            <div className="metric-card glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="metric-header"><Droplets size={20} /> Humidity</div>
              <div className="metric-value">{weatherData.main.humidity}%</div>
            </div>
            
            <div className="metric-card glass-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="metric-header"><Wind size={20} /> Wind</div>
              <div className="metric-value">{weatherData.wind.speed} <span>m/s</span></div>
            </div>

            <div className="metric-card glass-panel animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="metric-header"><Gauge size={20} /> Pressure</div>
              <div className="metric-value">{weatherData.main.pressure} <span>hPa</span></div>
            </div>

            <div className="metric-card glass-panel animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="metric-header"><Eye size={20} /> Visibility</div>
              <div className="metric-value">{(weatherData.visibility / 1000).toFixed(1)} <span>km</span></div>
            </div>
          </div>

          {/* Time/Astronomy Card */}
          <div className="astro-card glass-panel animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="astro-item">
              <Sunrise className="astro-icon" size={32} color="#fcd34d" />
              <div className="astro-data">
                <span>Sunrise</span>
                <strong>{formatTime(weatherData.sys.sunrise)}</strong>
              </div>
            </div>
            <div className="astro-divider"></div>
            <div className="astro-item">
              <Sunset className="astro-icon" size={32} color="#fb923c" />
              <div className="astro-data">
                <span>Sunset</span>
                <strong>{formatTime(weatherData.sys.sunset)}</strong>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
