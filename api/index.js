import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

// Weather API
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "London";
    const geo = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);

    if (!geo.data.results?.length) return res.status(404).json({ error: "City not found" });

    const { latitude, longitude, name, country } = geo.data.results[0];
    const weather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    res.json({ name, country, ...weather.data.current_weather });
  } catch (error) {
    console.error("Weather error:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Currency API
app.get("/api/currency", async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount) || 1;
    const response = await axios.get("https://api.exchangerate-api.com/v4/latest/INR");
    const rates = response.data.rates;
    res.json({
      inr: amount,
      usd: amount * rates.USD,
      eur: amount * rates.EUR,
      baseRates: { USD: rates.USD, EUR: rates.EUR }
    });
  } catch (error) {
    console.error("Currency error:", error.message);
    res.status(500).json({ error: "Failed to fetch currency data" });
  }
});

// Quote API
app.get("/api/quote", async (req, res) => {
  try {
    const q = await axios.get("https://api.quotable.io/random");
    res.json({ quote: q.data.content, author: q.data.author });
  } catch (error) {
    console.error("Quote error:", error.message);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

// Export Express for Vercel
export default app;
