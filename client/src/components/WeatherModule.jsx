import { useState, useEffect } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiFog,
  WiRain,
  WiShowers,
  WiThunderstorm,
  WiSnow,
  WiNightAltThunderstorm,
} from "react-icons/wi";
import { motion } from "framer-motion";

// 🎨 Weather mappings: icon + gradient + card color
const weatherStyles = {
  0:  { icon: <WiDaySunny className="text-yellow-300" />, label: "Clear sky", bg: "from-sky-400 via-blue-500 to-indigo-600", card: "bg-white/80 text-gray-800" },
  1:  { icon: <WiDayCloudy className="text-yellow-200" />, label: "Mainly clear", bg: "from-blue-400 via-sky-500 to-indigo-600", card: "bg-white/80 text-gray-800" },
  2:  { icon: <WiDayCloudy className="text-gray-300" />, label: "Partly cloudy", bg: "from-gray-300 via-blue-400 to-indigo-500", card: "bg-white/80 text-gray-800" },
  3:  { icon: <WiCloud className="text-gray-400" />, label: "Overcast", bg: "from-gray-400 via-gray-500 to-gray-700", card: "bg-gray-200/70 text-gray-800" },
  45: { icon: <WiFog className="text-gray-300" />, label: "Fog", bg: "from-gray-300 via-gray-400 to-gray-500", card: "bg-gray-300/70 text-gray-700" },
  61: { icon: <WiRain className="text-blue-400" />, label: "Slight rain", bg: "from-blue-400 via-blue-600 to-indigo-700", card: "bg-blue-100/80 text-gray-800" },
  63: { icon: <WiRain className="text-blue-500" />, label: "Moderate rain", bg: "from-slate-600 via-blue-700 to-gray-900", card: "bg-gray-100/80 text-gray-900" },
  65: { icon: <WiRain className="text-blue-600" />, label: "Heavy rain", bg: "from-gray-700 via-slate-800 to-black", card: "bg-gray-800/70 text-white" },
  71: { icon: <WiSnow className="text-blue-200" />, label: "Snowfall", bg: "from-blue-200 via-sky-300 to-gray-400", card: "bg-white/80 text-gray-800" },
  95: { icon: <WiThunderstorm className="text-yellow-200" />, label: "Thunderstorm", bg: "from-purple-700 via-indigo-800 to-gray-900", card: "bg-gray-800/80 text-white" },
  99: { icon: <WiNightAltThunderstorm className="text-yellow-100" />, label: "Heavy storm", bg: "from-indigo-900 via-gray-900 to-black", card: "bg-black/70 text-white" },
};

const getWeatherStyle = (code) =>
  weatherStyles[code] || { icon: <WiDaySunny />, label: "Unknown", bg: "from-sky-400 via-blue-500 to-indigo-600", card: "bg-white/80 text-gray-800" };

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
      const res = await axios.get(`/api/weather?city=${encodeURIComponent(city)}`);
      if (res.data && typeof res.data.temperature !== "undefined") {
        setWeather(res.data);
      } else {
        setError("No valid data returned from server.");
      }
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Failed to fetch weather data.";
      setError(msg);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  // Dynamic gradient + card color
  const bg = weather ? getWeatherStyle(weather.weathercode).bg : "from-sky-400 via-blue-500 to-indigo-600";
  const cardStyle = weather ? getWeatherStyle(weather.weathercode).card : "bg-white/80 text-gray-800";

  // Update App background dynamically
  useEffect(() => {
    if (weather && weather.weathercode && onWeatherChange) {
      onWeatherChange(bg);
    }
  }, [weather]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full rounded-3xl p-6 sm:p-8 text-center text-white bg-gradient-to-br ${bg} transition-all duration-700 ease-in-out`}
    >
      <h1 className="text-3xl font-bold mb-6 drop-shadow-md flex justify-center items-center gap-2">
        🌦 Weather Now
      </h1>

      {/* Search Input */}
      <div className="flex gap-2 mb-6 justify-center">
        <input
          type="text"
          placeholder="Enter city..."
          className="flex-1 sm:w-1/2 px-4 py-3 rounded-xl border border-white/30 bg-white/80 text-gray-800 
                     placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-md transition-all active:scale-95"
        >
          Search
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="text-center text-white mt-6">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          Fetching weather...
        </div>
      )}

      {/* Error */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-200 font-semibold bg-red-500/30 px-4 py-3 rounded-lg mt-4 shadow-sm"
        >
          {error}
        </motion.p>
      )}

      {/* Weather Info */}
      {weather && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${cardStyle} rounded-2xl p-6 shadow-lg mt-6 backdrop-blur-md hover:scale-[1.02] transition-transform`}
        >
          <h2 className="text-2xl font-semibold mb-3">
            {weather.name}, {weather.country}
          </h2>

          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center mb-4"
          >
            <span className="text-6xl mb-2">{getWeatherStyle(weather.weathercode).icon}</span>
            <p className="text-lg opacity-90 mb-1">{getWeatherStyle(weather.weathercode).label}</p>
            <p className="text-4xl font-extrabold">{weather.temperature}°C</p>
          </motion.div>

          <div className="text-lg space-y-1">
            <p>💨 Wind Speed: <span className="font-semibold">{weather.windspeed} km/h</span></p>
            <p>🧭 Direction: <span className="font-semibold">{weather.winddirection}°</span></p>
          </div>

          <p className="text-gray-600 text-sm mt-3 italic">
            Updated: {new Date(weather.time).toLocaleString()}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
