import { useState, useEffect } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiFog,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiNightAltThunderstorm,
} from "react-icons/wi";
import { motion } from "framer-motion";

/* 🌦 Weather Style Map (ICON AS COMPONENT, NOT JSX) */
const weatherStyles = {
  0:  { icon: WiDaySunny, label: "Clear sky", bg: "from-sky-400 via-blue-500 to-indigo-600", card: "bg-white/80 text-gray-800" },
  1:  { icon: WiDayCloudy, label: "Mainly clear", bg: "from-blue-400 via-sky-500 to-indigo-600", card: "bg-white/80 text-gray-800" },
  2:  { icon: WiDayCloudy, label: "Partly cloudy", bg: "from-gray-300 via-blue-400 to-indigo-500", card: "bg-white/80 text-gray-800" },
  3:  { icon: WiCloud, label: "Overcast", bg: "from-gray-400 via-gray-500 to-gray-700", card: "bg-gray-200/70 text-gray-800" },
  45: { icon: WiFog, label: "Fog", bg: "from-gray-300 via-gray-400 to-gray-500", card: "bg-gray-300/70 text-gray-700" },
  61: { icon: WiRain, label: "Slight rain", bg: "from-blue-400 via-blue-600 to-indigo-700", card: "bg-blue-100/80 text-gray-800" },
  63: { icon: WiRain, label: "Moderate rain", bg: "from-slate-600 via-blue-700 to-gray-900", card: "bg-gray-100/80 text-gray-900" },
  65: { icon: WiRain, label: "Heavy rain", bg: "from-gray-700 via-slate-800 to-black", card: "bg-gray-800/70 text-white" },
  71: { icon: WiSnow, label: "Snowfall", bg: "from-blue-200 via-sky-300 to-gray-400", card: "bg-white/80 text-gray-800" },
  95: { icon: WiThunderstorm, label: "Thunderstorm", bg: "from-purple-700 via-indigo-800 to-gray-900", card: "bg-gray-800/80 text-white" },
  99: { icon: WiNightAltThunderstorm, label: "Heavy storm", bg: "from-indigo-900 via-gray-900 to-black", card: "bg-black/70 text-white" },
};

/* 🧠 Safe getter */
const getWeatherStyle = (code) =>
  weatherStyles[code] || {
    icon: WiDaySunny,
    label: "Unknown",
    bg: "from-sky-400 via-blue-500 to-indigo-600",
    card: "bg-white/80 text-gray-800",
  };

export default function WeatherModule({ onWeatherChange }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await axios.get(
        `/api/weather?city=${encodeURIComponent(city)}`
      );

      if (res.data && res.data.weathercode !== undefined) {
        setWeather(res.data);
      } else {
        setError("Invalid weather data received.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.message ||
        "Failed to fetch weather."
      );
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  /* 🌈 Background handling (SAFE FOR 0) */
  const style =
    weather && weather.weathercode !== undefined
      ? getWeatherStyle(weather.weathercode)
      : getWeatherStyle();

  const Icon = style.icon;

  useEffect(() => {
    if (weather && weather.weathercode !== undefined && onWeatherChange) {
      onWeatherChange(style.bg);
    }
  }, [weather]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full rounded-3xl p-6 sm:p-8 text-center text-white bg-gradient-to-br ${style.bg} transition-all`}
    >
      <h1 className="text-3xl font-bold mb-6">🌦 Weather Now</h1>

      {/* Search */}
      <div className="flex gap-2 mb-6 justify-center">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 sm:w-1/2 px-4 py-3 rounded-xl bg-white/80 text-gray-800 focus:outline-none"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-medium"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-white mt-6">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Fetching weather...
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="bg-red-500/30 px-4 py-3 rounded-lg text-red-200">
          {error}
        </p>
      )}

      {/* Weather Card */}
      {weather && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${style.card} rounded-2xl p-6 shadow-lg mt-6`}
        >
          <h2 className="text-2xl font-semibold mb-3">
            {weather.name}, {weather.country}
          </h2>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center mb-4"
          >
            <Icon className="text-6xl mb-2" />
            <p className="text-lg">{style.label}</p>
            <p className="text-4xl font-extrabold">
              {weather.temperature}°C
            </p>
          </motion.div>

          <div className="text-lg space-y-1">
            <p>💨 Wind Speed: <b>{weather.windspeed} km/h</b></p>
            <p>🧭 Direction: <b>{weather.winddirection}°</b></p>
          </div>

          <p className="text-sm italic mt-3 opacity-70">
            Updated: {new Date(weather.time).toLocaleString()}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
