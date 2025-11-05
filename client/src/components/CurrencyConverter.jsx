// client/src/components/CurrencyConverter.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../App.css";

export default function CurrencyConverter() {
  const [ratesLoaded, setRatesLoaded] = useState(false);
  const [baseRates, setBaseRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [inr, setInr] = useState(1);
  const [usd, setUsd] = useState("");
  const [eur, setEur] = useState("");

  const fetchRates = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/currency?amount=1");
      const br = {
        USD: parseFloat(res.data.baseRates.USD),
        EUR: parseFloat(res.data.baseRates.EUR),
      };
      setBaseRates(br);
      setInr(1);
      setUsd((1 * br.USD).toFixed(4));
      setEur((1 * br.EUR).toFixed(4));
      setRatesLoaded(true);
    } catch (err) {
      console.error("Failed to load rates:", err.message);
      setError("Unable to load currency rates.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRates();
  }, []);

  // Conversion logic
  const fromInr = (v) => ({
    u: (v * baseRates.USD).toFixed(4),
    e: (v * baseRates.EUR).toFixed(4),
  });
  const fromUsd = (v) => {
    const inrVal = v / baseRates.USD;
    return { r: inrVal.toFixed(4), e: (inrVal * baseRates.EUR).toFixed(4) };
  };
  const fromEur = (v) => {
    const inrVal = v / baseRates.EUR;
    return { r: inrVal.toFixed(4), u: (inrVal * baseRates.USD).toFixed(4) };
  };

  // Input change handlers
  const handleInrChange = (v) => {
    const val = parseFloat(v) || 0;
    setInr(v);
    const { u, e } = fromInr(val);
    setUsd(u);
    setEur(e);
  };
  const handleUsdChange = (v) => {
    const val = parseFloat(v) || 0;
    setUsd(v);
    const { r, e } = fromUsd(val);
    setInr(r);
    setEur(e);
  };
  const handleEurChange = (v) => {
    const val = parseFloat(v) || 0;
    setEur(v);
    const { r, u } = fromEur(val);
    setInr(r);
    setUsd(u);
  };

  return (
    <div className="w-full text-center text-gray-800 transition-all duration-700 ease-in-out">
      <motion.h1
        className="text-4xl font-extrabold text-white drop-shadow-md mb-8 flex justify-center items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        💱 Smart Currency Converter
      </motion.h1>

      {loading && <p className="text-white">Loading rates...</p>}
      {error && (
        <p className="text-red-300 bg-red-600/20 px-3 py-2 rounded mt-4">
          {error}
        </p>
      )}

      {ratesLoaded && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 rounded-2xl p-8 shadow-lg mt-6 backdrop-blur-md border border-white/30"
        >
          {/* INR */}
<div className="currency-input inr flex items-center justify-between bg-gradient-to-r from-green-100 to-teal-100 rounded-xl px-4 py-3 mb-4 shadow-sm">
  <span className="font-semibold text-lg">🇮🇳 INR</span>
  <input
    inputMode="decimal"
    type="number"
    className="no-spinner w-40 text-right bg-transparent border-none focus:outline-none font-medium text-gray-800"
    value={inr}
    onChange={(e) => handleInrChange(e.target.value)}
    onFocus={(e) => e.target.select()}
  />
</div>

{/* USD */}
<div className="currency-input usd flex items-center justify-between bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl px-4 py-3 mb-4 shadow-sm">
  <span className="font-semibold text-lg">🇺🇸 USD</span>
  <input
    inputMode="decimal"
    type="number"
    className="no-spinner w-40 text-right bg-transparent border-none focus:outline-none font-medium text-gray-800"
    value={usd}
    onChange={(e) => handleUsdChange(e.target.value)}
    onFocus={(e) => e.target.select()}
  />
</div>

{/* EUR */}
<div className="currency-input eur flex items-center justify-between bg-gradient-to-r from-purple-100 to-rose-100 rounded-xl px-4 py-3 shadow-sm">
  <span className="font-semibold text-lg">🇪🇺 EUR</span>
  <input
    inputMode="decimal"
    type="number"
    className="no-spinner w-40 text-right bg-transparent border-none focus:outline-none font-medium text-gray-800"
    value={eur}
    onChange={(e) => handleEurChange(e.target.value)}
    onFocus={(e) => e.target.select()}
  />
</div>



          
        </motion.div>
      )}
    </div>
  );
}
