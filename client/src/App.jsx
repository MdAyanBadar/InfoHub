import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WeatherModule from "./components/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter";
import QuoteGenerator from "./components/QuoteGenerator";

export default function App() {
  const [activeTab, setActiveTab] = useState("Weather");
  const [weatherBg, setWeatherBg] = useState("from-sky-400 via-blue-500 to-indigo-600");

  // 🌀 Handle dynamic weather background change
  const handleWeatherChange = (bgGradient) => {
    setWeatherBg(bgGradient);
  };

  // 🎛️ Render module based on active tab
  const renderModule = () => {
    switch (activeTab) {
      case "Weather":
        return <WeatherModule onWeatherChange={handleWeatherChange} />;
      case "Currency":
        return <CurrencyConverter />;
      case "Quote":
        return <QuoteGenerator />;
      default:
        return null;
    }
  };

  const tabs = ["Weather", "Currency", "Quote"];

  // 🎨 Default tab gradient colors
  const tabColors = {
    Weather: weatherBg,
    Currency: "from-green-400 via-emerald-500 to-teal-600",
    Quote: "from-pink-400 via-purple-500 to-rose-600",
  };

  const getTabGradient = () => {
    switch (activeTab) {
      case "Weather":
        return "from-sky-400 via-indigo-500 to-blue-600";
      case "Currency":
        return "from-green-400 via-emerald-500 to-teal-600";
      case "Quote":
        return "from-pink-400 via-purple-500 to-rose-500";
      default:
        return "from-indigo-400 via-blue-500 to-purple-600";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 via-sky-100 to-gray-200 text-gray-800 font-inter relative overflow-x-hidden">

      {/* 🌐 Header */}
      <header className="pt-28 text-center z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 tracking-tight drop-shadow-lg flex justify-center items-center gap-3">
          🌐 InfoHub
        </h1>
        <p className="text-gray-600 mt-2 text-lg font-medium">
          Your quick global info assistant
        </p>
      </header>

      {/* 🌈 Fixed Floating Navigation */}
      {/* 🌈 Fixed Floating Navigation */}
<motion.nav
  layout
  className="fixed top-6 left-0 right-0 z-50 flex justify-center"
>
  <div className="inline-flex items-center gap-3 bg-white/25 backdrop-blur-2xl border border-white/30 shadow-lg shadow-indigo-200/40 px-5 py-2 rounded-full transition-all duration-500 hover:shadow-2xl">
    {tabs.map((tab) => {
      const isActive = activeTab === tab;
      return (
        <motion.button
          key={tab}
          onClick={() => setActiveTab(tab)}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className={`relative px-6 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 flex items-center gap-1 ${
            isActive
              ? "text-white"
              : "text-gray-800 hover:text-indigo-700"
          }`}
        >
          {isActive && (
            <motion.div
              layoutId="activeTab"
              className={`absolute inset-0 bg-gradient-to-r ${getTabGradient()} rounded-full shadow-md`}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {tab === "Weather" && "☁️"}
            {tab === "Currency" && "💱"}
            {tab === "Quote" && "💬"}
            <span>{tab}</span>
          </span>
        </motion.button>
      );
    })}
  </div>
</motion.nav>


      {/* 💫 Morphing Card Area */}
      <main className="flex flex-1 justify-center items-start w-full px-4 py-32 relative z-10">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab}
            layoutId="morphing-card"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className={`relative w-full max-w-xl rounded-[2rem] shadow-2xl p-6 sm:p-8 bg-white/10 backdrop-blur-lg border border-white/20 overflow-hidden`}
          >
            {/* 🎨 Background transition */}
            <motion.div
              key={activeTab + "-bg"}
              className={`absolute inset-0 rounded-[2rem] -z-10 bg-gradient-to-br ${tabColors[activeTab]}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* 🧠 Content */}
            <motion.div
              key={activeTab + "-content"}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4 }}
            >
              {renderModule()}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ⚙️ Footer (Smooth Fade-In Animation) */}
      <motion.footer
        className="py-6 mt-8 mb-3 text-gray-700 text-sm opacity-80 z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-indigo-700">InfoHub</span> | Built by{" "}
        <span className="font-semibold">Ayan 💻</span>
      </motion.footer>
    </div>
  );
}
