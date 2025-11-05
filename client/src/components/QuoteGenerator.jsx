import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [auto, setAuto] = useState(false);

  const localQuotes = [
    { content: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
    { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { content: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { content: "Great things never come from comfort zones.", author: "Roy T. Bennett" },
    { content: "Your limitation—it’s only your imagination.", author: "Unknown" },
  ];

  const getMoodEmoji = (text) => {
    if (/success|achievement|win/i.test(text)) return "🏆";
    if (/believe|faith|hope/i.test(text)) return "🌈";
    if (/work|hard|push|effort/i.test(text)) return "💪";
    if (/imagination|creativity|dream/i.test(text)) return "🎨";
    return "✨";
  };

  const fetchQuote = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/api/quote");
      setQuote(response.data.quote);
      setAuthor(response.data.author);
    } catch (err) {
      console.error("Backend quote API failed, using fallback:", err.message);
      const random = localQuotes[Math.floor(Math.random() * localQuotes.length)];
      setQuote(random.content);
      setAuthor(random.author);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote(); // fetch a quote on first load
  }, []);

  useEffect(() => {
    if (auto) {
      const interval = setInterval(fetchQuote, 10000);
      return () => clearInterval(interval);
    }
  }, [auto]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg mx-auto rounded-3xl shadow-none p-8 text-center text-white backdrop-blur-lg"
    >
      {/* Header */}
      <h1 className="text-3xl font-bold mb-3 drop-shadow-sm flex justify-center items-center gap-2">
        💬 Daily Motivation
      </h1>

      <p className="text-white/85 text-sm mb-6 italic">
        “A little inspiration can change your day.” ✨
      </p>

      {/* Controls */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <motion.button
          onClick={fetchQuote}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/90 text-pink-700 hover:bg-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
        >
          Generate Quote
        </motion.button>

        <label className="flex items-center gap-2 text-sm text-white/90">
          <input
            type="checkbox"
            checked={auto}
            onChange={(e) => setAuto(e.target.checked)}
            className="w-4 h-4 accent-pink-500"
          />
          Auto Inspire ✨
        </label>
      </div>

      {/* Quote Display */}
      <AnimatePresence mode="wait">
        {quote && (
          <motion.div
            key={quote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-2xl p-5 shadow-md text-gray-800 bg-white/80 backdrop-blur-md"
          >
            <p className="text-lg font-medium mb-3 italic text-gray-700 leading-snug">
              {getMoodEmoji(quote)} “{quote}”
            </p>
            <p className="text-right font-semibold text-gray-600 text-sm">
              — {author}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
