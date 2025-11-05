import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "London";
    const geoRes = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);

    if (!geoRes.data.results || geoRes.data.results.length === 0) {
      return res.status(404).json({ error: "City not found" });
    }

    const { latitude, longitude, name, country } = geoRes.data.results[0];
    const weatherRes = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    const weather = {
      name,
      country,
      ...weatherRes.data.current_weather,
    };

    res.json(weather);
  } catch (error) {
    console.error("Weather error:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});


app.get("/api/currency", async (req, res) => {
    try {
      const amount = parseFloat(req.query.amount) || 1;
      const response = await axios.get("https://api.exchangerate-api.com/v4/latest/INR");
      const rates = response.data.rates; 
      
      res.json({
        inr: amount,
        usd: amount * rates.USD,
        eur: amount * rates.EUR,
        baseRates: {
          USD: rates.USD,
          EUR: rates.EUR
        }
      });
    } catch (error) {
      console.error("Currency error:", error.message);
      res.status(500).json({ error: "Failed to fetch currency data" });
    }
  });

app.get("/api/quote", async (req, res) => {
  try {
    const response = await axios.get("https://api.quotable.io/random");
    res.json({ quote: response.data.content, author: response.data.author });
  } catch (error) {
    console.error("Quote error:", error.message);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

// Only listen on a port if not in Vercel environment
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
}

// Export for Vercel serverless functions
export default app;
